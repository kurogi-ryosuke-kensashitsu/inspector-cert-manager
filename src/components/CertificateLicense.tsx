import type { CertificationRecord } from '../types'

type CertificateLicenseProps = {
  record?: CertificationRecord
}

export function CertificateLicense({ record }: CertificateLicenseProps) {
  if (!record) {
    return (
      <section className="panel">
        <h2>免許証風表示</h2>
        <p>一覧から「免許証表示」を選択してください。</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <div className="row-actions">
        <h2>免許証風表示</h2>
        <button type="button" onClick={() => window.print()}>
          PDF出力（印刷）
        </button>
      </div>
      <div className="license-card" aria-label="certification-license">
        <div className="license-title">検査員認定証</div>
        <div className="license-body">
          <p>
            <strong>氏名:</strong> {record.inspectorName}
          </p>
          <p>
            <strong>社員コード:</strong> {record.employeeCode}
          </p>
          <p>
            <strong>部署:</strong> {record.department}
          </p>
          <p>
            <strong>認定名:</strong> {record.certificationName}
          </p>
          <p>
            <strong>認定番号:</strong> {record.certificationCode}
          </p>
          <p>
            <strong>交付日:</strong> {record.issuedDate}
          </p>
          <p>
            <strong>有効期限:</strong> {record.expiryDate}
          </p>
        </div>
      </div>
    </section>
  )
}
