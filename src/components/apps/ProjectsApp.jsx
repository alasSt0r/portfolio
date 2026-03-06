const PROJECTS = [
  {
    id: 1,
    name: 'Portfolio CRT',
    desc: 'Ce portfolio — scène rétro CSS, écran CRT, bureau Windows 95.',
    tags: ['React', 'Framer Motion', 'Tailwind'],
    status: 'WIP',
    statusColor: '#c08020',
    url: null,
  },
  {
    id: 2,
    name: 'Projet 2',
    desc: 'Description courte du projet à venir.',
    tags: ['TypeScript', 'Node.js'],
    status: 'Soon',
    statusColor: '#555',
    url: null,
  },
  {
    id: 3,
    name: 'Projet 3',
    desc: 'Description courte du projet à venir.',
    tags: ['Python', 'FastAPI'],
    status: 'Soon',
    statusColor: '#555',
    url: null,
  },
]

export default function ProjectsApp() {
  return (
    <div style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-text)', overflowY: 'auto', height: '100%' }}>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div style={{
          width: 44, height: 44,
          background: 'linear-gradient(135deg, #5a2a7a 0%, #3a1a5a 100%)',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
          boxShadow: '0 2px 6px rgba(90,40,120,0.35)',
          flexShrink: 0,
        }}>
          🗂️
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.2 }}>
            Projects
          </div>
          <div style={{ fontSize: 12, color: '#777', marginTop: 2 }}>
            {PROJECTS.length} entries
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: '#e0e0dc', marginBottom: 14 }} />

      {/* Project list */}
      <div className="flex flex-col gap-3">
        {PROJECTS.map(p => (
          <div key={p.id} style={{
            padding: '10px 12px',
            background: '#f8f8f6',
            border: '1px solid #e0e0dc',
            borderRadius: 4,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}>
            {/* Row 1: name + status */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                {p.name}
              </span>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: p.statusColor,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                background: `${p.statusColor}18`,
                border: `1px solid ${p.statusColor}44`,
                borderRadius: 3,
                padding: '1px 6px',
                flexShrink: 0,
              }}>
                {p.status}
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: 12, color: '#555', lineHeight: 1.5, marginBottom: 8 }}>
              {p.desc}
            </p>

            {/* Tags + link */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1">
                {p.tags.map(t => (
                  <span key={t} style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: '#666',
                    background: '#ebebeb',
                    border: '1px solid #d8d8d8',
                    borderRadius: 3,
                    padding: '1px 5px',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: 11,
                    color: '#2a5298',
                    textDecoration: 'none',
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline' }}
                  onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none' }}
                >
                  View →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
