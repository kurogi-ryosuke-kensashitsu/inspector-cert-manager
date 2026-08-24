import { useMemo, useState } from 'react'
import './App.css'
import { CertificateLicense } from './components/CertificateLicense'
import { CertificationForm } from './components/CertificationForm'
import { CertificationList } from './components/CertificationList'
import { CsvImport } from './components/CsvImport'
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'
import type { CertificationRecord, ExpiryAlert, ManagerAccount } from './types'
import { exportCertificationExcel } from './utils/excel'
import {
  getAuthState,
  getCertifications,
  getManagerName,
  setAuthState,
  setCertifications,
  setManagerName,
} from './utils/storage'

const managers: ManagerAccount[] = [
  { username: 'manager1', password: 'test1234', displayName: '管理職1' },
  { username: 'manager2', password: 'test1234', displayName: '管理職2' },
  { username: 'manager3', password: 'test1234', displayName: '管理職3' },
  { username: 'manager4', password: 'test1234', displayName: '管理職4' },
  { username: 'manager5', password: 'test1234', displayName: '管理職5' },
]

const toStartOfDay = (date: string): number => {
  const time = new Date(`${date}T00:00:00`).getTime()
  return Number.isNaN(time) ? Number.POSITIVE_INFINITY : time
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getAuthState)
  const [managerName, setManagerNameState] = useState<string>(getManagerName)
  const [records, setRecords] = useState<CertificationRecord[]>(() => getCertifications())
  const [editingRecord, setEditingRecord] = useState<CertificationRecord | undefined>()
  const [selectedRecord, setSelectedRecord] = useState<CertificationRecord | undefined>()

  const alerts = useMemo<ExpiryAlert[]>(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    return records
      .map((record) => {
        const expiry = new Date(`${record.expiryDate}T00:00:00`)
        const remainingDays = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        if (remainingDays < 0) {
          return { record, level: 'expired' as const, remainingDays }
        }

        if (remainingDays <= 30) {
          return { record, level: 'expiring' as const, remainingDays }
        }

        return null
      })
      .filter((item): item is ExpiryAlert => item !== null)
      .sort((a, b) => a.remainingDays - b.remainingDays)
  }, [records])

  const saveRecords = (next: CertificationRecord[]) => {
    const sorted = [...next].sort((a, b) => toStartOfDay(a.expiryDate) - toStartOfDay(b.expiryDate))
    setRecords(sorted)
    setCertifications(sorted)
  }

  const handleSave = (record: CertificationRecord) => {
    const exists = records.some((item) => item.id === record.id)
    const next = exists
      ? records.map((item) => (item.id === record.id ? record : item))
      : [...records, record]

    saveRecords(next)
    setEditingRecord(undefined)
  }

  const handleDelete = (id: string) => {
    if (!window.confirm('この認定情報を削除しますか？')) {
      return
    }

    const next = records.filter((item) => item.id !== id)
    saveRecords(next)
    if (selectedRecord?.id === id) {
      setSelectedRecord(undefined)
    }
  }

  const handleImport = (imported: CertificationRecord[]) => {
    const merged = new Map(records.map((item) => [item.id, item]))
    imported.forEach((item) => merged.set(item.id, item))
    saveRecords(Array.from(merged.values()))
  }

  const handleLogin = (manager: ManagerAccount) => {
    setAuthState(true)
    setManagerName(manager.displayName)
    setIsLoggedIn(true)
    setManagerNameState(manager.displayName)
  }

  const handleLogout = () => {
    setAuthState(false)
    setManagerName('')
    setIsLoggedIn(false)
    setManagerNameState('')
  }

  if (!isLoggedIn) {
    return (
      <main className="app-shell">
        <Login managers={managers} onLogin={handleLogin} />
      </main>
    )
  }

  return (
    <main className="app-shell">
      <Dashboard
        managerName={managerName}
        records={records}
        alerts={alerts}
        onLogout={handleLogout}
        onExportExcel={() => exportCertificationExcel(records)}
      />
      <CsvImport onImport={handleImport} />
      <CertificationForm
        key={editingRecord?.id ?? 'new'}
        editingRecord={editingRecord}
        onSave={handleSave}
        onCancelEdit={() => setEditingRecord(undefined)}
      />
      <CertificationList
        records={records}
        onEdit={setEditingRecord}
        onDelete={handleDelete}
        onSelect={setSelectedRecord}
      />
      <CertificateLicense record={selectedRecord} />
    </main>
  )
}

export default App
