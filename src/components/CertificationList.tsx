import type { CertificationRecord } from '../types'

type ListProps = {
  records: CertificationRecord[]
  onEdit: (record: CertificationRecord) => void
  onDelete: (id: string) => void
  onSelect: (record: CertificationRecord) => void
}

export function CertificationList({ records, onEdit, onDelete, onSelect }: ListProps) {
  return (
    <section className="panel">
      <h2>検査員認定一覧</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>検査員名</th>
              <th>社員コード</th>
              <th>部署</th>
              <th>認定番号</th>
              <th>有効期限</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.inspectorName}</td>
                <td>{record.employeeCode}</td>
                <td>{record.department}</td>
                <td>{record.certificationCode}</td>
                <td>{record.expiryDate}</td>
                <td>
                  <div className="row-actions">
                    <button type="button" onClick={() => onEdit(record)}>
                      編集
                    </button>
                    <button type="button" onClick={() => onDelete(record.id)}>
                      削除
                    </button>
                    <button type="button" onClick={() => onSelect(record)}>
                      免許証表示
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
