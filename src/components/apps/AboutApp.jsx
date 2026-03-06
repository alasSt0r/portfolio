export default function AboutApp() {
  const skills = [
    { cat: 'Languages',  items: ['JavaScript', 'TypeScript', 'Python', 'C', 'Rust'] },
    { cat: 'Frontend',   items: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'] },
    { cat: 'Backend',    items: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL'] },
    { cat: 'Tools',      items: ['Git', 'Docker', 'Linux', 'Figma'] },
  ]

  return (
    <div style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-text)', overflowY: 'auto', height: '100%' }}>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div style={{
          width: 44, height: 44,
          background: 'linear-gradient(135deg, #3a6a3a 0%, #1a4a1a 100%)',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
          boxShadow: '0 2px 6px rgba(40,100,40,0.35)',
          flexShrink: 0,
        }}>
          👾
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.2 }}>
            Marius Wartel
          </div>
          <div style={{ fontSize: 12, color: '#777', marginTop: 2 }}>
            Software Developer
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: '#e0e0dc', marginBottom: 14 }} />

      {/* Bio */}
      <p style={{ fontSize: 13, color: '#333', lineHeight: 1.65, marginBottom: 16 }}>
        Passionné de développement logiciel et d'interfaces digitales.
        J'aime construire des expériences utilisateur soignées, explorer les nouvelles
        technologies et bricoler des projets créatifs. Toujours en train d'apprendre.
      </p>

      <div style={{ height: 1, background: '#e0e0dc', marginBottom: 14 }} />

      {/* Skills */}
      <div style={{ fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
        Skills
      </div>
      <div className="flex flex-col gap-3">
        {skills.map(({ cat, items }) => (
          <div key={cat} className="flex gap-3">
            <span style={{
              minWidth: 72,
              fontSize: 11,
              fontWeight: 600,
              color: '#888',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              paddingTop: 2,
            }}>
              {cat}
            </span>
            <span style={{ width: 1, background: '#ddd', flexShrink: 0 }} />
            <div className="flex flex-wrap gap-1">
              {items.map(skill => (
                <span key={skill} style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: '#2a5298',
                  background: 'rgba(42,82,152,0.08)',
                  border: '1px solid rgba(42,82,152,0.18)',
                  borderRadius: 3,
                  padding: '1px 6px',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
