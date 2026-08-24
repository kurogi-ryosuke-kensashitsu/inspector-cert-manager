import { getCsvTemplate, parseCertificationCsv } from '../utils/csv'
import type { CertificationRecord } from '../types'

type CsvImportProps = {
  onImport: (records: CertificationRecord[]) => void
}

export function CsvImport({ onImport }: CsvImportProps) {
  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    try {
      const records = await parseCertificationCsv(file)
      onImport(records)
      alert(`${records.length}件を読み込みました。`)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'CSV読み込みに失敗しました。')
    } finally {
      event.target.value = ''
    }
  }

  const downloadTemplate = () => {
    const blob = new Blob([getCsvTemplate()], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'certification-template.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="panel">
      <h2>CSV一括更新</h2>
      <p>既存IDが一致した行は更新、新規IDは追加されます。</p>
      <div className="row-actions">
        <label className="file-input">
          CSVファイルを選択
          <input type="file" accept=".csv" onChange={onFileChange} />
        </label>
        <button type="button" onClick={downloadTemplate}>
          テンプレートCSV出力
        </button>
      </div>
    </section>
  )
}
