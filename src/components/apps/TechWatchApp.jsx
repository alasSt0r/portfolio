import { useState, useMemo } from 'react'
import { articles } from '../../data/techwatch'

const TAG_COLORS = [
  { bg: 'rgba(42,82,152,0.10)',  border: 'rgba(42,82,152,0.25)',  text: '#2a5298' },
  { bg: 'rgba(100,60,160,0.10)', border: 'rgba(100,60,160,0.25)', text: '#643ca0' },
  { bg: 'rgba(20,120,80,0.10)',  border: 'rgba(20,120,80,0.25)',  text: '#147850' },
  { bg: 'rgba(180,80,20,0.10)',  border: 'rgba(180,80,20,0.25)',  text: '#b45014' },
  { bg: 'rgba(160,20,60,0.10)',  border: 'rgba(160,20,60,0.25)',  text: '#a0143c' },
  { bg: 'rgba(20,100,140,0.10)', border: 'rgba(20,100,140,0.25)', text: '#14648c' },
]

function tagColor(tag, allTags) {
  const idx = allTags.indexOf(tag)
  return TAG_COLORS[idx % TAG_COLORS.length]
}

function formatDate(iso) {
  const [y, m, d] = iso.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`
}

export default function TechWatchApp() {
  const sortedArticles = useMemo(
    () => [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)),
    []
  )

  const [activeTag, setActiveTag]     = useState('All')
  const [selectedId, setSelectedId]   = useState(sortedArticles[0]?.id ?? null)

  const allTags = useMemo(() => {
    const set = new Set()
    articles.forEach(a => a.tags.forEach(t => set.add(t)))
    return Array.from(set).sort()
  }, [])

  const filtered = useMemo(() =>
    activeTag === 'All'
      ? sortedArticles
      : sortedArticles.filter(a => a.tags.includes(activeTag)),
    [activeTag, sortedArticles]
  )

  const selected = sortedArticles.find(a => a.id === selectedId) ?? filtered[0] ?? null

  // If selected article is not in filtered list, reset selection
  const displaySelected = filtered.find(a => a.id === selectedId)
    ? selected
    : filtered[0] ?? null

  return (
    <div style={{
      fontFamily: 'var(--font-ui)',
      color: 'var(--color-text)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>

      {/* ── Header ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        paddingBottom: 10,
        borderBottom: '1px solid #d0d0cc',
        marginBottom: 8,
        flexShrink: 0,
      }}>
        <div style={{
          width: 38, height: 38,
          background: 'linear-gradient(135deg, #1a3a72 0%, #2a5298 100%)',
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
          boxShadow: '0 2px 6px rgba(42,82,152,0.30)',
          flexShrink: 0,
        }}>
          📡
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>
            Tech Watch
          </div>
          <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>
            {articles.length} article{articles.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* ── Tag filters ── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
        marginBottom: 8,
        flexShrink: 0,
      }}>
        {['All', ...allTags].map(tag => {
          const isActive = activeTag === tag
          const color = tag === 'All' ? null : tagColor(tag, allTags)
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                height: 22,
                padding: '0 8px',
                fontSize: 11,
                fontWeight: isActive ? 700 : 500,
                fontFamily: 'var(--font-ui)',
                cursor: 'pointer',
                background: isActive
                  ? (color ? color.bg : 'rgba(42,82,152,0.12)')
                  : '#c0c0c0',
                color: isActive
                  ? (color ? color.text : '#2a5298')
                  : '#333',
                border: '1px solid',
                borderColor: isActive
                  ? (color ? color.border : 'rgba(42,82,152,0.35)')
                  : '#888 #fff #fff #888',
                borderRadius: 2,
                transition: 'all 0.1s',
              }}
            >
              {tag}
            </button>
          )
        })}
      </div>

      {/* ── Split layout ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        gap: 0,
        overflow: 'hidden',
        minHeight: 0,
      }}>

        {/* Left panel — article list */}
        <div
          className="sunken"
          style={{
            width: 190,
            flexShrink: 0,
            overflowY: 'auto',
            background: '#f4f4f0',
            marginRight: 6,
          }}
        >
          {filtered.length === 0 && (
            <div style={{
              padding: '12px 8px',
              fontSize: 12,
              color: '#999',
              textAlign: 'center',
            }}>
              No articles
            </div>
          )}
          {filtered.map(article => {
            const isActive = displaySelected?.id === article.id
            return (
              <div
                key={article.id}
                onClick={() => setSelectedId(article.id)}
                style={{
                  padding: '7px 9px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #ddd',
                  background: isActive
                    ? 'linear-gradient(90deg, #2a5298 0%, #1a3a72 100%)'
                    : 'transparent',
                  transition: 'background 0.1s',
                  userSelect: 'none',
                }}
              >
                <div style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: isActive ? '#fff' : '#1a1a1a',
                  lineHeight: 1.3,
                  marginBottom: 3,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {article.title}
                </div>
                <div style={{
                  fontSize: 10,
                  color: isActive ? 'rgba(255,255,255,0.7)' : '#999',
                }}>
                  {formatDate(article.date)}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right panel — article detail */}
        <div
          className="sunken"
          style={{
            flex: 1,
            overflowY: 'auto',
            background: '#fafaf8',
            padding: '10px 12px',
            minWidth: 0,
          }}
        >
          {!displaySelected ? (
            <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              color: '#aaa',
            }}>
              Select an article
            </div>
          ) : (
            <>
              {/* Title */}
              <div style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#1a1a1a',
                lineHeight: 1.4,
                marginBottom: 6,
              }}>
                {displaySelected.title}
              </div>

              {/* Meta row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8,
                flexWrap: 'wrap',
              }}>
                <span style={{ fontSize: 11, color: '#888' }}>
                  📅 {formatDate(displaySelected.date)}
                </span>
                {displaySelected.source && (
                  <span style={{ fontSize: 11, color: '#888' }}>
                    · {displaySelected.source}
                  </span>
                )}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                {displaySelected.tags.map(tag => {
                  const c = tagColor(tag, allTags)
                  return (
                    <span key={tag} style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: c.text,
                      background: c.bg,
                      border: `1px solid ${c.border}`,
                      borderRadius: 3,
                      padding: '1px 6px',
                      letterSpacing: '0.03em',
                      textTransform: 'uppercase',
                    }}>
                      {tag}
                    </span>
                  )
                })}
              </div>

              {/* Separator */}
              <div style={{ height: 1, background: '#e0e0dc', marginBottom: 10 }} />

              {/* Summary */}
              <div style={{
                fontSize: 12,
                color: '#333',
                lineHeight: 1.7,
                marginBottom: 16,
                whiteSpace: 'pre-wrap',
              }}>
                {displaySelected.summary}
              </div>

              {/* Open link button */}
              {displaySelected.url && (
                <a
                  href={displaySelected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <button
                    className="raised"
                    style={{
                      height: 26,
                      padding: '0 14px',
                      background: '#c0c0c0',
                      fontFamily: 'var(--font-ui)',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#111',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span style={{ fontSize: 13 }}>↗</span>
                    Open article
                  </button>
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
