/* CRTScreen — toujours allumé, remplit son conteneur */
export default function CRTScreen({ children }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
    }}>
      {/* ── Plastic bezel ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(145deg, #383838 0%, #262626 45%, #1c1c1c 100%)',
        padding: '12px 16px 16px',
        boxShadow: `
          inset 0 2px 4px rgba(255,255,255,0.08),
          inset 0 -3px 6px rgba(0,0,0,0.6),
          inset 3px 0 5px rgba(0,0,0,0.3),
          inset -3px 0 5px rgba(0,0,0,0.3),
          0 0 0 1px #0a0a0a,
          0 10px 40px rgba(0,0,0,0.9)
        `,
        borderRadius: 4,
      }}>
        {/* Socle bas */}
        <div style={{
          position: 'absolute',
          bottom: -14, left: '30%', right: '30%',
          height: 14,
          background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
          borderRadius: '0 0 4px 4px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
          zIndex: 2,
        }} />
        {/* Pied */}
        <div style={{
          position: 'absolute',
          bottom: -26, left: '40%', right: '40%',
          height: 12,
          background: '#1a1a1a',
          borderRadius: '0 0 2px 2px',
          boxShadow: '0 3px 8px rgba(0,0,0,0.5)',
          zIndex: 2,
        }} />

        {/* ── Bezel inner lip ── */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: '#0e0e0e',
          padding: '4px',
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.9)',
        }}>
          {/* ── CRT tube ── */}
          <div
            className="crt-scanlines crt-vignette crt-flicker"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              background: '#1a3a4a',
              clipPath: 'inset(0% round 2px)',
              boxShadow: 'inset 0 0 50px rgba(0,0,0,0.2)',
            }}
          >
            {/* Phosphor ambient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.012) 0%, transparent 65%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            {/* Glass glare */}
            <div style={{
              position: 'absolute',
              top: '3%', left: '4%',
              width: '24%', height: '8%',
              background: 'linear-gradient(130deg, rgba(255,255,255,0.07) 0%, transparent 100%)',
              borderRadius: '50%',
              transform: 'rotate(-5deg)',
              pointerEvents: 'none',
              zIndex: 52,
            }} />
            {/* Content */}
            <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>
              {children}
            </div>
          </div>
        </div>

        {/* Bezel label */}
        <div style={{
          position: 'absolute',
          bottom: 4, left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: 7,
          letterSpacing: '4px',
          color: 'rgba(255,255,255,0.05)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}>
          MW·DISPLAY·PRO
        </div>

        {/* LED verte — décorative */}
        <div style={{
          position: 'absolute',
          bottom: 7, right: 12,
          width: 5, height: 5,
          borderRadius: '50%',
          background: '#00ff41',
          boxShadow: '0 0 6px rgba(0,255,65,0.8)',
        }} />
      </div>
    </div>
  )
}
