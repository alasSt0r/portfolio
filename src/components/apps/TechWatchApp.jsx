import { useState, useEffect } from 'react'

const TABS = [
  { id: 'tool', label: 'A.I AS A TOOL', file: '/ia-tool.txt' },
  { id: 'dev',  label: 'A.I AS A DEV',  file: '/ia-dev.txt' },
]

// Fonction pour parser le texte et rendre les liens cliquables
function parseTextWithLinks(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = urlRegex.exec(text)) !== null) {
    // Texte avant le lien
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    // Le lien
    parts.push(
      <a
        key={match.index}
        href={match[0]}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#2a5298',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#1a3a72'}
        onMouseLeave={e => e.currentTarget.style.color = '#2a5298'}
      >
        {match[0]}
      </a>
    )
    lastIndex = urlRegex.lastIndex
  }

  // Texte restant après le dernier lien
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

export default function TechWatchApp() {
  const [activeTab, setActiveTab] = useState('tool')
  const [contents, setContents]   = useState({
    tool: 'Chargement...',
    dev:  'Chargement...',
  })

  useEffect(() => {
    // Charger les deux fichiers au mount
    TABS.forEach(tab => {
      fetch(tab.file)
        .then(res => {
          if (!res.ok) throw new Error('Fichier introuvable')
          return res.text()
        })
        .then(text => {
          setContents(prev => ({ ...prev, [tab.id]: text }))
        })
        .catch(err => {
          setContents(prev => ({
            ...prev,
            [tab.id]: `❌ Impossible de charger ${tab.file}\n\nAssurez-vous que le fichier existe dans /public/`
          }))
        })
    })
  }, [])

  const activeContent = contents[activeTab] || ''

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
        marginBottom: 0,
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
            Veille Technologique
          </div>
        </div>
      </div>

      {/* ── Onglets ── */}
      <div style={{
        display: 'flex',
        gap: 0,
        borderBottom: '1px solid #d0d0cc',
        background: '#e8e8e4',
        flexShrink: 0,
      }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                height: 32,
                fontSize: 12,
                fontWeight: isActive ? 700 : 500,
                fontFamily: 'var(--font-ui)',
                cursor: 'pointer',
                background: isActive ? '#ffffff' : '#c0c0c0',
                color: isActive ? '#1a1a1a' : '#555',
                border: 'none',
                borderRight: '1px solid #999',
                borderTop: isActive ? '2px solid #2a5298' : '2px solid transparent',
                transition: 'all 0.15s',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.background = '#d0d0d0'
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.background = '#c0c0c0'
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ── Contenu ── */}
      <div
        className="sunken"
        style={{
          flex: 1,
          overflowY: 'auto',
          background: '#ffffff',
          padding: '18px 20px',
          fontFamily: 'var(--font-ui)',
          fontSize: 13,
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap',
          color: '#1a1a1a',
          letterSpacing: '0.01em',
        }}
      >
        {parseTextWithLinks(activeContent)}
      </div>
    </div>
  )
}
