export default function ContactApp() {
  const rows = [
    { label: 'Name',     value: 'Marius Wartel' },
    { label: 'Email',    value: 'marius.wartel@gmail.com',         href: 'mailto:marius.wartel@gmail.com' },
    { label: 'GitHub',   value: 'github.com/alasSt0r',        href: 'https://github.com/alasSt0r' },
    { label: 'LinkedIn', value: 'linkedin.com/in/mwartel',   href: 'https://linkedin.com/in/mwartel' },
    { label: 'Location', value: 'France, Lille' },
  ]

  return (
    <div style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-text)' }}>

      {/* App header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          style={{
            width: 40, height: 40,
            background: 'linear-gradient(135deg, #2a5298 0%, #1a3a72 100%)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
            boxShadow: '0 2px 6px rgba(42,82,152,0.4)',
            flexShrink: 0,
          }}
        >
          ✉️
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.2 }}>
            Marius Wartel
          </div>
          <div style={{ fontSize: 12, color: '#777', marginTop: 2 }}>
            Contact Information
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#e0e0dc', marginBottom: 14 }} />

      {/* Rows */}
      <div className="flex flex-col gap-3">
        {rows.map(({ label, value, href }) => (
          <div key={label} className="flex items-center gap-3">
            <span
              style={{
                minWidth: 72,
                fontSize: 11,
                fontWeight: 600,
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {label}
            </span>
            <span style={{ width: 1, height: 12, background: '#ddd', flexShrink: 0 }} />
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: 13,
                  color: '#2a5298',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'color 0.1s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#1a3a72'; e.currentTarget.style.textDecoration = 'underline' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#2a5298'; e.currentTarget.style.textDecoration = 'none' }}
              >
                {value}
              </a>
            ) : (
              <span style={{ fontSize: 13, fontWeight: 500, color: '#222' }}>{value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
