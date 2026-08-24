import { useState } from 'react'
import type { CertificationRecord } from '../types'

type FormProps = {
  editingRecord?: CertificationRecord
  onSave: (record: CertificationRecord) => void
  onCancelEdit: () => void
}

const empty: CertificationRecord = {
  id: '',
  inspectorName: '',
  employeeCode: '',
  department: '',
  certificationName: '社内検査員認定',
  certificationCode: '',
  issuedDate: '',
  expiryDate: '',
  note: '',
  updatedAt: '',
}

export function CertificationForm({ editingRecord, onSave, onCancelEdit }: FormProps) {
  const [form, setForm] = useState<CertificationRecord>(editingRecord ?? empty)
  const isEdit = Boolean(editingRecord)

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const id = form.id || `cert-${Date.now()}`
    onSave({
      ...form,
      id,
      updatedAt: new Date().toISOString(),
    })
    if (!isEdit) {
      setForm(empty)
    }
  }

  return (
    <section className="panel">
      <h2>{isEdit ? '認定情報を編集' : '認定情報を登録'}</h2>
      <form onSubmit={submit} className="form-grid cols-2">
        <label>
          検査員名
          <input
            value={form.inspectorName}
            onChange={(e) => setForm((prev) => ({ ...prev, inspectorName: e.target.value }))}
            required
          />
        </label>
        <label>
          社員コード
          <input
            value={form.employeeCode}
            onChange={(e) => setForm((prev) => ({ ...prev, employeeCode: e.target.value }))}
            required
          />
        </label>
        <label>
          部署
          <input
            value={form.department}
            onChange={(e) => setForm((prev) => ({ ...prev, department: e.target.value }))}
            required
          />
        </label>
        <label>
          認定名
          <input
            value={form.certificationName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, certificationName: e.target.value }))
            }
            required
          />
        </label>
        <label>
          認定番号
          <input
            value={form.certificationCode}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, certificationCode: e.target.value }))
            }
            required
          />
        </label>
        <label>
          交付日
          <input
            type="date"
            value={form.issuedDate}
            onChange={(e) => setForm((prev) => ({ ...prev, issuedDate: e.target.value }))}
            required
          />
        </label>
        <label>
          有効期限
          <input
            type="date"
            value={form.expiryDate}
            onChange={(e) => setForm((prev) => ({ ...prev, expiryDate: e.target.value }))}
            required
          />
        </label>
        <label>
          備考
          <input
            value={form.note}
            onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
          />
        </label>
        <div className="row-actions full-width">
          <button type="submit">{isEdit ? '更新' : '登録'}</button>
          {isEdit ? (
            <button type="button" onClick={onCancelEdit}>
              編集をキャンセル
            </button>
          ) : null}
        </div>
      </form>
    </section>
  )
}
