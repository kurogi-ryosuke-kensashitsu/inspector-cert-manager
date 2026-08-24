import type { CertificationRecord } from '../types'

const headers = [
  'id',
  'inspectorName',
  'employeeCode',
  'department',
  'certificationName',
  'certificationCode',
  'issuedDate',
  'expiryDate',
  'note',
]

const parseCsvLine = (line: string): string[] => {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]

    if (char === '"') {
      const next = line[i + 1]
      if (inQuotes && next === '"') {
        current += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

export const parseCertificationCsv = async (file: File): Promise<CertificationRecord[]> => {
  const text = await file.text()
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length < 2) {
    throw new Error('CSVにデータがありません。')
  }

  const csvHeaders = parseCsvLine(lines[0])
  const missing = headers.filter((header) => !csvHeaders.includes(header))
  if (missing.length > 0) {
    throw new Error(`CSVヘッダーが不足しています: ${missing.join(', ')}`)
  }

  const headerIndex = new Map(csvHeaders.map((h, i) => [h, i]))

  return lines.slice(1).map((line, rowIndex) => {
    const values = parseCsvLine(line)
    const read = (key: string): string => values[headerIndex.get(key) ?? -1] ?? ''

    const id = read('id') || `csv-${Date.now()}-${rowIndex}`

    return {
      id,
      inspectorName: read('inspectorName'),
      employeeCode: read('employeeCode'),
      department: read('department'),
      certificationName: read('certificationName'),
      certificationCode: read('certificationCode'),
      issuedDate: read('issuedDate'),
      expiryDate: read('expiryDate'),
      note: read('note'),
      updatedAt: new Date().toISOString(),
    }
  })
}

export const getCsvTemplate = (): string => {
  return `${headers.join(',')}\n`
}
