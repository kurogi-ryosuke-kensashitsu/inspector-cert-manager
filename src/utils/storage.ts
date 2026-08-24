import type { CertificationRecord } from '../types'
import { createSampleCertifications } from './sampleData'

const AUTH_KEY = 'inspector-cert-manager-auth'
const CERTS_KEY = 'inspector-cert-manager-certs'
const MANAGER_NAME_KEY = 'inspector-cert-manager-manager-name'

export const getAuthState = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === 'true'
}

export const setAuthState = (isLoggedIn: boolean): void => {
  localStorage.setItem(AUTH_KEY, String(isLoggedIn))
}

export const getManagerName = (): string => {
  return localStorage.getItem(MANAGER_NAME_KEY) ?? ''
}

export const setManagerName = (name: string): void => {
  localStorage.setItem(MANAGER_NAME_KEY, name)
}

export const getCertifications = (): CertificationRecord[] => {
  const raw = localStorage.getItem(CERTS_KEY)
  if (!raw) {
    const samples = createSampleCertifications()
    localStorage.setItem(CERTS_KEY, JSON.stringify(samples))
    return samples
  }

  try {
    return JSON.parse(raw) as CertificationRecord[]
  } catch {
    const samples = createSampleCertifications()
    localStorage.setItem(CERTS_KEY, JSON.stringify(samples))
    return samples
  }
}

export const setCertifications = (records: CertificationRecord[]): void => {
  localStorage.setItem(CERTS_KEY, JSON.stringify(records))
}
