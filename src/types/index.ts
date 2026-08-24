export type ManagerAccount = {
  username: string
  password: string
  displayName: string
}

export type CertificationRecord = {
  id: string
  inspectorName: string
  employeeCode: string
  department: string
  certificationName: string
  certificationCode: string
  issuedDate: string
  expiryDate: string
  note: string
  updatedAt: string
}

export type AlertLevel = 'expired' | 'expiring'

export type ExpiryAlert = {
  record: CertificationRecord
  level: AlertLevel
  remainingDays: number
}
