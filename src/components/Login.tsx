import { useMemo, useState } from 'react'
import type { ManagerAccount } from '../types'

type LoginProps = {
  managers: ManagerAccount[]
  onLogin: (manager: ManagerAccount) => void
}

export function Login({ managers, onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const defaultHint = useMemo(() => managers[0], [managers])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const manager = managers.find(
      (item) => item.username === username.trim() && item.password === password,
    )

    if (!manager) {
      setError('ユーザー名またはパスワードが正しくありません。')
      return
    }

    setError('')
    onLogin(manager)
  }

  return (
    <div className="login-card">
      <h1>検査員認定 管理ログイン</h1>
      <p>テスト用アカウントでログインしてください。</p>
      <form onSubmit={submit} className="form-grid">
        <label>
          ユーザー名
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          パスワード
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <button type="submit">ログイン</button>
      </form>
      <small>
        例: {defaultHint.username} / {defaultHint.password}
      </small>
    </div>
  )
}
