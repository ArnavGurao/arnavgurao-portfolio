import { ArrowUpRight, BookMarked, GitFork, RefreshCw, Star as StarIcon } from 'lucide-react'
import { useGitHubProfile } from '../hooks/useGitHubProfile'
import { profile } from '../data/profile'
import { Reveal, SectionTitle, Star, external } from './Shared'
import { TechIcon } from './TechIcon'

export function GitHubDashboard() {
  const { status, data, stale, retry } = useGitHubProfile()
  const repos = data?.repos.filter((repo) => !repo.fork).slice(0, 3) ?? []
  return (
    <section id="github" className="github-section">
      <div className="container section">
        <Reveal>
          <SectionTitle index="04" eyebrow="A WORK IN PROGRESS. ALWAYS.">
            MY GITHUB UNIVERSE <Star />
          </SectionTitle>
          <div className="github-panel">
            <div className="github-panel-header">
              <span>
                <TechIcon name="GitHub" size={22} /> github.com/ArnavGurao
              </span>
              <span className="github-header-note">SMALL COMMITS. BIG IDEAS.</span>
            </div>
            <div className="github-body">
              <div className="github-profile">
                <div className="github-avatar">
                  <TechIcon name="GitHub" size={52} />
                  <span className="avatar-star">✳</span>
                </div>
                <h3>@{profile.githubUsername}</h3>
                <p>Building, experimenting, and learning in public. See what's taking shape.</p>
                <a className="button lime" href={profile.github} {...external}>
                  EXPLORE MY GITHUB <ArrowUpRight size={18} />
                </a>
              </div>
              <div className="github-data" aria-live="polite" aria-busy={status === 'loading'}>
                {status === 'loading' ? (
                  <div className="github-state">
                    <RefreshCw className="loading-icon" size={27} />
                    <h4>Opening the workshop…</h4>
                    <p>Fetching public repositories from GitHub.</p>
                  </div>
                ) : status === 'error' ? (
                  <div className="github-state">
                    <GitFork size={40} />
                    <h4>The code's still there.</h4>
                    <p>
                      GitHub data couldn't load right now. You can explore the profile directly or
                      try again.
                    </p>
                    <button className="button paper button-small" onClick={retry}>
                      <RefreshCw size={16} /> TRY AGAIN
                    </button>
                  </div>
                ) : (
                  data && (
                    <>
                      <div className="github-stats">
                        <div>
                          <strong>{data.user.public_repos}</strong>
                          <span>PUBLIC REPOSITORIES</span>
                        </div>
                        <div>
                          <strong>{data.user.followers}</strong>
                          <span>FOLLOWERS</span>
                        </div>
                        <p>
                          {stale ? 'Last available snapshot' : 'Public GitHub data'}
                          <br />
                          <time dateTime={new Date(data.fetchedAt).toISOString()}>
                            {new Date(data.fetchedAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </time>
                          {stale && (
                            <button className="text-link" onClick={retry}>
                              REFRESH <RefreshCw size={13} />
                            </button>
                          )}
                        </p>
                      </div>
                      <div className="repo-list">
                        {repos.length ? (
                          repos.map((repo) => (
                            <a key={repo.id} href={repo.html_url} {...external} className="repo">
                              <BookMarked size={21} />
                              <div>
                                <h4>{repo.name}</h4>
                                <p>{repo.description || 'Explore the code on GitHub.'}</p>
                                <span>
                                  {repo.language || 'Repository'} <span aria-hidden="true">·</span>{' '}
                                  <StarIcon size={12} /> {repo.stargazers_count}
                                </span>
                              </div>
                              <ArrowUpRight size={19} />
                            </a>
                          ))
                        ) : (
                          <div className="github-state">
                            <h4>A fresh canvas.</h4>
                            <p>No original public repositories to show yet.</p>
                          </div>
                        )}
                      </div>
                    </>
                  )
                )}
              </div>
            </div>
            <div className="github-panel-footer">
              <span>
                <span className="status-dot" /> REAL REPOSITORIES. REAL PROGRESS.
              </span>
              <a href={`${profile.github}?tab=overview`} {...external}>
                CONTRIBUTIONS ON GITHUB <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
