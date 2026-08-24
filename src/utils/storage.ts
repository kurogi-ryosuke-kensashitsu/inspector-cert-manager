import type { CertificationRecord } from '../types'
import { createSampleCertifications } from './sampleData'

const AUTH_KEY = 'inspector-cert-manager-auth'
const CERTS_KEY = 'inspector-cert-manager-certs'
const MANAGER_NAME_KEY = 'inspector-cert-manager-manager-name'

const encodeValue = (value: string): string => {
  const bytes = new TextEncoder().encode(value)
  return btoa(String.fromCharCode(...bytes))
}

const decodeValue = (value: string): string => {
  const binary = atob(value)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export const getAuthState = (): boolean => {
  const raw = localStorage.getItem(AUTH_KEY)
  if (!raw) {
    return false
  }

  try {
    return decodeValue(raw) === 'true'
  } catch {
    return raw === 'true'
  }
}

export const setAuthState = (isLoggedIn: boolean): void => {
  localStorage.setItem(AUTH_KEY, encodeValue(String(isLoggedIn)))
}

export const getManagerName = (): string => {
  const raw = localStorage.getItem(MANAGER_NAME_KEY)
  if (!raw) {
    return ''
  }

  try {
    return decodeValue(raw)
  } catch {
    return raw
  }
}

export const setManagerName = (name: string): void => {
  localStorage.setItem(MANAGER_NAME_KEY, encodeValue(name))
}

export const getCertifications = (): CertificationRecord[] => {
  const raw = localStorage.getItem(CERTS_KEY)
  if (!raw) {
    const samples = createSampleCertifications()
    localStorage.setItem(CERTS_KEY, encodeValue(JSON.stringify(samples)))
    return samples
  }

  try {
    return JSON.parse(decodeValue(raw)) as CertificationRecord[]
  } catch {
    try {
      return JSON.parse(raw) as CertificationRecord[]
    } catch {
      const samples = createSampleCertifications()
      localStorage.setItem(CERTS_KEY, encodeValue(JSON.stringify(samples)))
      return samples
    }
  }
}

export const setCertifications = (records: CertificationRecord[]): void => {
  localStorage.setItem(CERTS_KEY, encodeValue(JSON.stringify(records)))
}
