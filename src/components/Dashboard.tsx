import type { CertificationRecord, ExpiryAlert } from '../types'

type DashboardProps = {
  records: CertificationRecord[]
  alerts: ExpiryAlert[]
  managerName: string
  onLogout: () => void
  onExportExcel: () => void
}

export function Dashboard({
  records,
  alerts,
  managerName,
  onLogout,
  onExportExcel,
}: DashboardProps) {
  const expired = alerts.filter((a) => a.level === 'expired').length
  const expiring = alerts.filter((a) => a.level === 'expiring').length

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>ダッシュボード</h2>
          <p>ログイン中: {managerName}</p>
        </div>
        <div className="row-actions">
          <button type="button" onClick={onExportExcel}>
            Excel出力
          </button>
          <button type="button" onClick={onLogout}>
            ログアウト
          </button>
        </div>
      </div>
      <div className="stats-grid">
        <article>
          <strong>{records.length}</strong>
          <span>登録件数</span>
        </article>
        <article>
          <strong>{expired}</strong>
          <span>期限切れ</span>
        </article>
        <article>
          <strong>{expiring}</strong>
          <span>30日以内に期限</span>
        </article>
      </div>
      <div>
        <h3>有効期限アラート</h3>
        {alerts.length === 0 ? (
          <p>アラートはありません。</p>
        ) : (
          <ul className="alert-list">
            {alerts.map(({ record, level, remainingDays }) => (
              <li key={record.id} className={level === 'expired' ? 'alert-expired' : 'alert-expiring'}>
                {record.inspectorName} ({record.certificationCode}) -{' '}
                {level === 'expired'
                  ? `期限切れ (${Math.abs(remainingDays)}日経過)`
                  : `期限まで ${remainingDays} 日`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
