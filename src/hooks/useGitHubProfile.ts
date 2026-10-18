import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

interface GitHubUser {
  login: string
  public_repos: number
  followers: number
  bio: string | null
}
export interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  fork: boolean
}
interface Snapshot {
  user: GitHubUser
  repos: GitHubRepo[]
  fetchedAt: number
}
type State = { status: 'loading' | 'ready' | 'error'; data: Snapshot | null; stale: boolean }
const CACHE_KEY = `portfolio:github:${profile.githubUsername}:v1`
const TTL = 15 * 60 * 1000

function validSnapshot(value: unknown): value is Snapshot {
  if (!value || typeof value !== 'object') return false
  const d = value as Snapshot
  return (
    typeof d.fetchedAt === 'number' &&
    d.user?.login?.toLowerCase() === profile.githubUsername.toLowerCase() &&
    Number.isInteger(d.user.public_repos) &&
    Number.isInteger(d.user.followers) &&
    Array.isArray(d.repos) &&
    d.repos.every(
      (r) =>
        typeof r.name === 'string' &&
        typeof r.id === 'number' &&
        typeof r.html_url === 'string' &&
        r.html_url.startsWith(`https://github.com/${profile.githubUsername}/`),
    )
  )
}
function cached(): Snapshot | null {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(CACHE_KEY) ?? 'null')
    return validSnapshot(value) ? value : null
  } catch {
    return null
  }
}

export function useGitHubProfile() {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<State>({ status: 'loading', data: null, stale: false })
  useEffect(() => {
    const controller = new AbortController()
    let disposed = false
    const timeout = window.setTimeout(() => controller.abort(), 10_000)
    async function fetchData() {
      const previous = cached()
      if (previous && Date.now() - previous.fetchedAt < TTL) {
        setState({ status: 'ready', data: previous, stale: false })
        return
      }
      setState({ status: previous ? 'ready' : 'loading', data: previous, stale: Boolean(previous) })
      try {
        const base = `https://api.github.com/users/${profile.githubUsername}`
        const options = {
          signal: controller.signal,
          headers: { Accept: 'application/vnd.github+json' },
        }
        const responses = await Promise.all([
          fetch(base, options),
          fetch(`${base}/repos?sort=updated&per_page=100`, options),
        ])
        if (responses.some((r) => !r.ok)) throw new Error('GitHub is temporarily unavailable')
        const [user, repos] = await Promise.all(responses.map((r) => r.json()))
        const data = { user, repos, fetchedAt: Date.now() }
        if (!validSnapshot(data)) throw new Error('Unexpected GitHub response')
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(data))
        } catch {
          /* Storage is optional. */
        }
        if (!disposed) setState({ status: 'ready', data, stale: false })
      } catch {
        if (!disposed)
          setState({
            status: previous ? 'ready' : 'error',
            data: previous,
            stale: Boolean(previous),
          })
      } finally {
        window.clearTimeout(timeout)
      }
    }
    void fetchData()
    return () => {
      disposed = true
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [attempt])
  return { ...state, retry: () => setAttempt((value) => value + 1) }
}
