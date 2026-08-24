import writeXlsxFile from 'write-excel-file/browser'
import type { CertificationRecord } from '../types'

export const exportCertificationExcel = async (records: CertificationRecord[]): Promise<void> => {
  const header = [
    { value: 'ID', fontWeight: 'bold' as const },
    { value: '検査員名', fontWeight: 'bold' as const },
    { value: '社員コード', fontWeight: 'bold' as const },
    { value: '部署', fontWeight: 'bold' as const },
    { value: '認定名', fontWeight: 'bold' as const },
    { value: '認定番号', fontWeight: 'bold' as const },
    { value: '交付日', fontWeight: 'bold' as const },
    { value: '有効期限', fontWeight: 'bold' as const },
    { value: '備考', fontWeight: 'bold' as const },
  ]

  const rows = records.map((record) => [
    { value: record.id },
    { value: record.inspectorName },
    { value: record.employeeCode },
    { value: record.department },
    { value: record.certificationName },
    { value: record.certificationCode },
    { value: record.issuedDate },
    { value: record.expiryDate },
    { value: record.note },
  ])

  const workbook = writeXlsxFile(
    [header, ...rows],
    {
      columns: [
      { width: 14 },
      { width: 16 },
      { width: 14 },
      { width: 16 },
      { width: 20 },
      { width: 16 },
      { width: 12 },
      { width: 12 },
      { width: 24 },
      ],
    },
  )
  await workbook.toFile(`inspector-certifications-${new Date().toISOString().slice(0, 10)}.xlsx`)
}
