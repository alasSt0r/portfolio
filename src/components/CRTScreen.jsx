export default function CRTScreen({ children }) {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* ── Plastic bezel ── */}
      <div
        className="relative w-full h-full"
        style={{
          background: 'linear-gradient(145deg, #323232 0%, #222 45%, #1a1a1a 100%)',
          padding: '16px 20px 22px',
          boxShadow: `
            inset 0 2px 4px rgba(255,255,255,0.07),
            inset 0 -3px 6px rgba(0,0,0,0.5),
            0 0 0 2px #111,
            0 16px 60px rgba(0,0,0,0.9)
          `,
        }}
      >
        {/* Inner bezel recess */}
        <div
          className="relative w-full h-full"
          style={{
            background: '#111',
            padding: '5px',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
          }}
        >
          {/* ── The screen tube ── */}
          <div
            className="relative w-full h-full overflow-hidden crt-scanlines crt-vignette crt-flicker"
            style={{
              background: '#1a3a4a',   /* fond de bureau teal lisible */
              clipPath: 'inset(0% round 3px)',
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.25)',
            }}
          >
            {/* Ambient phosphor glow — très léger */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 70%)',
                zIndex: 0,
              }}
            />

            {/* Glass glare */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: '3%', left: '4%',
                width: '26%', height: '9%',
                background: 'linear-gradient(130deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
                borderRadius: '50%',
                transform: 'rotate(-5deg)',
                zIndex: 52,
              }}
            />

            {/* Content */}
            <div className="relative w-full h-full" style={{ zIndex: 10 }}>
              {children}
            </div>
          </div>
        </div>

        {/* Bezel label */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-1 select-none"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '7px',
            letterSpacing: '5px',
            color: 'rgba(255,255,255,0.06)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          MW·DISPLAY·PRO
        </div>
      </div>
    </div>
  )
}
