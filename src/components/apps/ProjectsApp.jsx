const PROJECTS = [
    {
    id: 1,
    name: 'HEROAD',
    desc: 'My most developped project with a real backend, login system and github CI/CD. A web application for playing a geoguessr-like game, where users guess roads risk.',
    tags: ['Mobile First', 'React', 'TypeScript', 'Framer Motion', 'Tailwind'],
    status: 'Done',
    statusColor: '#1b7a0e',
    url: 'https://heroad-dev.assetmapper.com/auth',
  },
    {
    id: 2,
    name: 'Appointment Manager',
    desc: 'A web application to manage appointments, allowing users to create, view, and organize their schedules efficiently.',
    tags: ['PHP', 'Symfony', 'MySQL'],
    status: 'Done',
    statusColor: '#1b7a0e',
    url: 'https://github.com/yasminehz/gestionRDV',
  },
  {
    id: 3,
    name: 'Portfolio CRT',
    desc: 'You are currently viewing it. A personal portfolio website showcasing my projects, skills, and experience in a clean and interactive design.',
    tags: ['React', 'Framer Motion', 'Tailwind'],
    status: 'Done',
    statusColor: '#1b7a0e',
    url: 'https://github.com/alasSt0r/portfolio',
  },
  {
    id: 4,
    name: 'Car Rental Service',
    desc: 'A fully functional e-commerce website with product listings, shopping cart, and checkout process, built using modern web technologies.',
    tags: ['Java', 'PostgreSQL'],
    status: 'Done',
    statusColor: '#1b7a0e',
    url: 'https://github.com/alasSt0r/reservation-vehicule',
  }
]

export default function ProjectsApp() {
  const openProject = (url) => {
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-text)', overflowY: 'auto', height: '100%' }}>

      
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

      
      <div className="flex flex-col gap-3">
        {PROJECTS.map(p => (
          <div
            key={p.id}
            role="button"
            tabIndex={0}
            onClick={() => openProject(p.url)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                openProject(p.url)
              }
            }}
            className="transition-all duration-150"
            style={{
            padding: '10px 12px',
            background: '#f8f8f6',
            border: '1px solid #e0e0dc',
            borderRadius: 4,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            cursor: p.url ? 'pointer' : 'default',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.10)'
              e.currentTarget.style.borderColor = '#d0d0cb'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'
              e.currentTarget.style.borderColor = '#e0e0dc'
            }}
          >
            
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

            
            <p style={{ fontSize: 12, color: '#555', lineHeight: 1.5, marginBottom: 8 }}>
              {p.desc}
            </p>

            
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
                <span
                  style={{
                    fontSize: 11,
                    color: 'rgba(42,82,152,0.55)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    flexShrink: 0,
                    letterSpacing: '0.01em',
                  }}
                >
                  Open link →
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
