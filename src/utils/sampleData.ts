import type { CertificationRecord } from '../types'

const departments = ['品質保証課', '生産技術課', '製造課', '設備管理課', '検査課']

const pad = (num: number): string => String(num).padStart(2, '0')

const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export const createSampleCertifications = (): CertificationRecord[] => {
  const now = new Date()

  return Array.from({ length: 30 }, (_, i) => {
    const index = i + 1
    const issueDate = new Date(now)
    issueDate.setMonth(issueDate.getMonth() - (index % 18) - 1)

    const expiryDate = new Date(issueDate)
    expiryDate.setFullYear(expiryDate.getFullYear() + 1)
    expiryDate.setDate(expiryDate.getDate() + ((index % 5) - 2) * 15)

    return {
      id: `cert-${index}`,
      inspectorName: `検査員${pad(index)}`,
      employeeCode: `EMP${pad(index)}`,
      department: departments[i % departments.length],
      certificationName: '社内検査員認定',
      certificationCode: `IC-${new Date().getFullYear()}-${pad(index)}`,
      issuedDate: formatDate(issueDate),
      expiryDate: formatDate(expiryDate),
      note: index % 4 === 0 ? '再講習予定' : '',
      updatedAt: new Date().toISOString(),
    }
  })
}
