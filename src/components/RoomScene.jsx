/* ─────────────────────────────────────────────
   ROOM SCENE — chambre rétro en CSS
   Vue de face, écran CRT au centre sur un bureau
───────────────────────────────────────────── */
import { useRef, useState, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'

/* Hauteur du sol en % du bas */
const SOL = 8

export default function RoomScene({ children, zoomedIn, onZoomDone }) {
  const screenRef  = useRef(null)
  const [zoomScale, setZoomScale]   = useState(1)
  const [origin,    setOrigin]      = useState('50% 50%')

  useLayoutEffect(() => {
    if (!screenRef.current) return
    const rect   = screenRef.current.getBoundingClientRect()
    // Max pour que les deux axes couvrent entièrement le viewport
    // + 10% de marge pour éliminer tout fond résiduel
    const scaleX = (window.innerWidth  / rect.width)  * 1.1
    const scaleY = (window.innerHeight / rect.height) * 1.1
    setZoomScale(Math.max(scaleX, scaleY))

    // Centre du moniteur en coordonnées viewport
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    setOrigin(`${cx}px ${cy}px`)
  }, [])

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: '#1a1208',
        transformOrigin: origin,
      }}
      animate={zoomedIn ? {
        scale: zoomScale,
      } : {
        scale: 1,
      }}
      initial={false}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => { if (zoomedIn) onZoomDone?.() }}
    >
      {/* ══ MUR DU FOND ══ */}
      <div style={{
        position: 'absolute',
        inset: 0,
        bottom: `${SOL}%`,
        background: '#5a4830',
        backgroundImage: `
          repeating-linear-gradient(
            90deg,
            transparent 0px, transparent 58px,
            rgba(0,0,0,0.07) 58px, rgba(0,0,0,0.07) 60px
          )
        `,
      }} />

      {/* ══ LUMIÈRE LAMPE — cône chaud large ══ */}
      <div style={{
        position: 'absolute',
        right: '2%',
        bottom: `calc(${SOL}% + 60px)`,
        width: '75%',
        height: '90%',
        background: `radial-gradient(
          ellipse at 92% 95%,
          rgba(255,210,100,0.52) 0%,
          rgba(255,180,60,0.28) 22%,
          rgba(220,150,40,0.10) 48%,
          transparent 68%
        )`,
        pointerEvents: 'none',
        zIndex: 3,
      }} />

      {/* ══ SOL ══ */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        height: `${SOL}%`,
        background: 'linear-gradient(180deg, #3a2e1e 0%, #2a2010 100%)',
        backgroundImage: `
          repeating-linear-gradient(
            90deg,
            transparent 0px, transparent 59px,
            rgba(0,0,0,0.10) 59px, rgba(0,0,0,0.10) 60px
          )
        `,
      }} />

      {/* Plinthe */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        bottom: `${SOL}%`,
        height: 12,
        background: 'linear-gradient(180deg, #7a6448 0%, #5a4838 100%)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
      }} />

      {/* ══ BUREAU ══ */}
      <DeskFurniture />

      {/* ══ DÉCO CHAMBRE ══ */}
      <RoomDecor />

      {/* ══ LUEUR ÉCRAN CRT sur le mur ══ */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: `calc(${SOL}% + 60px)`,
        width: '80%',
        height: '70%',
        background: 'radial-gradient(ellipse at 50% 80%, rgba(40,160,200,0.20) 0%, rgba(20,100,140,0.07) 40%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 4,
      }} />

      {/* ══ VIGNETTE légère ══ */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 45%, transparent 58%, rgba(0,0,0,0.22) 88%, rgba(0,0,0,0.42) 100%)',
        pointerEvents: 'none',
        zIndex: 6,
      }} />

      {/* ══ L'ÉCRAN CRT ══ */}
      <div
        ref={screenRef}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: `calc(${SOL}% + 60px)`,
          width: 'min(72vw, 960px)',
          height: 'min(72vh, 620px)',
          zIndex: 10,
          filter: 'drop-shadow(0 8px 40px rgba(0,0,0,0.85))',
        }}>
        {children}
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════
   BUREAU
════════════════════════════════════════════ */
function DeskFurniture() {
  return (
    <>
      {/* Surface du bureau */}
      <div style={{
        position: 'absolute',
        left: '2%', right: '2%',
        bottom: `${SOL}%`,
        height: 60,
        background: 'linear-gradient(180deg, #5a4030 0%, #3e2c1c 100%)',
        boxShadow: '0 6px 28px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,200,100,0.18)',
        zIndex: 8,
      }} />

      {/* Rebord avant */}
      <div style={{
        position: 'absolute',
        left: '2%', right: '2%',
        bottom: `calc(${SOL}% - 14px)`,
        height: 14,
        background: '#2a1a10',
        boxShadow: '0 5px 14px rgba(0,0,0,0.6)',
        zIndex: 8,
      }} />

      {/* Pied gauche */}
      <div style={{
        position: 'absolute',
        left: '4%',
        bottom: 0,
        width: 32,
        height: `${SOL}%`,
        background: 'linear-gradient(90deg, #1e1208 0%, #140e06 100%)',
        borderRadius: '0 0 4px 4px',
        zIndex: 7,
      }} />
      {/* Pied droit */}
      <div style={{
        position: 'absolute',
        right: '4%',
        bottom: 0,
        width: 32,
        height: `${SOL}%`,
        background: 'linear-gradient(90deg, #140e06 0%, #1e1208 100%)',
        borderRadius: '0 0 4px 4px',
        zIndex: 7,
      }} />

      <MinecraftFigure />
      <Mug2 />
    </>
  )
}

/* ─── Câble ─── */
function Cable({ x, delay = '0s' }) {
  return (
    <svg
      style={{
        position: 'absolute',
        left: x,
        bottom: `calc(${SOL}% + 60px)`,
        width: 5,
        height: 120,
        zIndex: 9,
        opacity: 0.75,
        animation: `cableSway 4s ease-in-out infinite ${delay}`,
      }}
      viewBox="0 0 5 120"
    >
      <path d="M2.5,0 C1.5,30 3.5,60 2.5,90 C1.5,105 2.5,120 2.5,120"
        stroke="#3a2a10" strokeWidth="3.5" fill="none" />
    </svg>
  )
}

/* ─── Tasse 2 (remplace la Gameboy sur le bureau) ─── */
function Mug2() {
  return (
    <div style={{
      position: 'absolute',
      left: 'calc(7% + 10px)',
      bottom: `calc(${SOL}% + 50px)`,
      zIndex: 12,
    }}>
      {/* Vapeur pixel-art animée */}
      {[0, 1, 2].map(col => (
        <div key={col} style={{
          position: 'absolute',
          top: -20 - col * 2,
          left: 8 + col * 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          animation: `steamRise ${1.4 + col * 0.3}s ease-out infinite`,
          animationDelay: `${col * 0.45}s`,
        }}>
          {[
            [0,1,0],
            [1,0,1],
            [0,1,0],
            [1,0,0],
          ].map((row, ri) => (
            <div key={ri} style={{ display: 'flex' }}>
              {row.map((px, ci) => (
                <div key={ci} style={{
                  width: 3, height: 3,
                  background: px ? `rgba(200,220,255,0.55)` : 'transparent',
                }} />
              ))}
            </div>
          ))}
        </div>
      ))}
      {/* Corps */}
      <div style={{
        width: 44,
        height: 50,
        background: 'linear-gradient(180deg, #2e3a4a 0%, #1a2230 100%)',
        borderRadius: '4px 4px 8px 8px',
        position: 'relative',
        boxShadow: '0 4px 14px rgba(0,0,0,0.55), inset 2px 0 0 rgba(255,255,255,0.05)',
      }}>
        {/* Anse */}
        <div style={{
          position: 'absolute',
          left: -16, top: 10,
          width: 16, height: 22,
          border: '4px solid #1a2230',
          borderRadius: '10px 0 0 10px',
          borderRight: 'none',
        }} />
        {/* Rim */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 6,
          background: 'rgba(255,255,255,0.07)',
          borderRadius: '4px 4px 0 0',
        }} />
        {/* Café */}
        <div style={{
          position: 'absolute',
          top: 6, left: 3, right: 3,
          height: 8,
          background: '#0e1218',
          borderRadius: 2,
          opacity: 0.8,
        }} />
        {/* Petit logo */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -30%)',
          fontSize: 9,
          color: 'rgba(100,160,220,0.45)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: 1,
        }}>{'</>'}</div>
      </div>
    </div>
  )
}

/* ─── Grille pixel-art réutilisable ─── */
function PixelGrid({ grid, px }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, imageRendering: 'pixelated' }}>
      {grid.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 0 }}>
          {row.map((col, ci) => (
            <div key={ci} style={{ width: px, height: px, background: col ?? 'transparent' }} />
          ))}
        </div>
      ))}
    </div>
  )
}

/* ─── Figurine Minecraft Creeper ─── */
function MinecraftFigure() {
  const G  = '#3a9a2a'
  const GD = '#2a7018'
  const B  = '#111'
  const W  = null

  const head = [
    [W,W,G,G,G,G,W,W],
    [W,G,G,G,G,G,G,W],
    [G,G,B,G,G,B,G,G],
    [G,G,B,G,G,B,G,G],
    [G,G,G,B,B,G,G,G],
    [G,G,B,B,B,B,G,G],
    [G,G,B,G,G,B,G,G],
    [W,G,G,G,G,G,G,W],
  ]
  const body = [
    [GD,G,G,GD],
    [GD,G,G,GD],
    [G,GD,GD,G],
    [G,GD,GD,G],
    [GD,G,G,GD],
    [GD,G,G,GD],
    [GD,G,G,GD],
    [GD,G,G,GD],
  ]
  const feet = [
    [GD,G,W,GD,G,W],
    [G,GD,W,G,GD,W],
    [G,GD,W,G,GD,W],
    [GD,G,W,GD,G,W],
    [GD,G,W,GD,G,W],
  ]

  const PX = 7

  return (
    <div style={{
      position: 'absolute',
      left: 'calc(36% + 10px)',
      bottom: `calc(${SOL}% + 60px)`,
      zIndex: 9,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.7))',
    }}>
      <PixelGrid grid={head} px={PX} />
      <PixelGrid grid={body} px={PX} />
      <PixelGrid grid={feet} px={PX} />
    </div>
  )
}

/* ─── Lampe sur pied (floor lamp) ─── */
function FloorLamp() {
  const LAMP_HEIGHT = 320

  return (
    <div style={{
      position: 'absolute',
      right: '6%',
      bottom: `${SOL}%`,
      zIndex: 7,
      width: 80,
      height: LAMP_HEIGHT,
      pointerEvents: 'none',
      transform: 'scale(0.78)',
      transformOrigin: 'bottom center',
    }}>
      {/* Halo de lumière au sol */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 180, height: 40,
        background: 'radial-gradient(ellipse, rgba(255,215,100,0.28) 0%, transparent 72%)',
      }} />

      {/* Base lourde */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 50, height: 14,
        background: 'linear-gradient(180deg, #3a3a3a 0%, #181818 100%)',
        borderRadius: '6px 6px 3px 3px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
      }} />

      {/* Tige principale — du sol jusqu'à l'abat-jour */}
      <div style={{
        position: 'absolute',
        bottom: 12, left: '50%',
        transform: 'translateX(-50%)',
        width: 8,
        height: LAMP_HEIGHT - 58,
        background: 'linear-gradient(90deg, #4e4e4e 0%, #2a2a2a 60%, #3e3e3e 100%)',
        borderRadius: '4px 4px 0 0',
        boxShadow: '2px 0 4px rgba(0,0,0,0.35)',
      }} />

      {/* Abat-jour trapézoïdal posé directement en haut de la tige */}
      <div style={{
        position: 'absolute',
        top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 80, height: 50,
        background: 'linear-gradient(180deg, #c8940e 0%, #8a6206 100%)',
        clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
        boxShadow: '0 0 30px rgba(255,195,70,0.55)',
        zIndex: 2,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 110%, rgba(255,245,190,0.75) 0%, transparent 60%)',
        }} />
      </div>

      {/* Bouton on/off */}
      <div style={{
        position: 'absolute',
        bottom: LAMP_HEIGHT * 0.38,
        left: 'calc(50% + 6px)',
        width: 8, height: 8,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #d4a010, #6a5008)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
      }} />
    </div>
  )
}

/* ─── Gameboy ─── */
function Gameboy() {
  return (
    <div style={{
      position: 'absolute',
      left: 'calc(7% + 10px)',
      bottom: `calc(${SOL}% + 56px)`,
      zIndex: 12,
      transform: 'scale(1.18)',
      transformOrigin: 'bottom left',
    }}>
      <div style={{
        width: 58,
        height: 92,
        background: 'linear-gradient(160deg, #8a8a9a 0%, #4e4e60 100%)',
        borderRadius: '8px 8px 14px 14px',
        position: 'relative',
        boxShadow: '0 6px 20px rgba(0,0,0,0.65), inset 0 2px 0 rgba(255,255,255,0.12)',
      }}>
        {/* Bezel écran */}
        <div style={{
          position: 'absolute',
          top: 10, left: 7, right: 7,
          height: 38,
          background: '#2a2a3a',
          borderRadius: 4,
          border: '2px solid #1a1a2a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Écran */}
          <div style={{
            width: '80%', height: '76%',
            background: 'linear-gradient(135deg, #3a5a3a 0%, #1e3a1e 100%)',
            borderRadius: 2,
            boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.5)',
          }} />
        </div>
        {/* Label "GAME BOY" */}
        <div style={{
          position: 'absolute',
          top: 52, left: 0, right: 0,
          textAlign: 'center',
          fontSize: 6,
          fontFamily: 'var(--font-mono)',
          color: 'rgba(200,190,220,0.5)',
          letterSpacing: 2,
        }}>GAME BOY</div>
        {/* Croix directionnelle */}
        <div style={{
          position: 'absolute',
          bottom: 22, left: 8,
          width: 22, height: 22,
        }}>
          <div style={{ position: 'absolute', top: '33%', left: 0, width: '100%', height: '34%', background: '#2a2a3a', borderRadius: 2 }} />
          <div style={{ position: 'absolute', left: '33%', top: 0, width: '34%', height: '100%', background: '#2a2a3a', borderRadius: 2 }} />
        </div>
        {/* Boutons A/B */}
        <div style={{
          position: 'absolute',
          bottom: 24, right: 6,
          display: 'flex', gap: 5,
          alignItems: 'center',
        }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#c0303a', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#2a3ab0', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }} />
        </div>
        {/* Start/Select */}
        <div style={{
          position: 'absolute',
          bottom: 10, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: 8,
        }}>
          {['SEL','STA'].map(l => (
            <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 14, height: 4, background: '#3a3a4a', borderRadius: 2 }} />
              <span style={{ fontSize: 4, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', letterSpacing: 0.5 }}>{l}</span>
            </div>
          ))}
        </div>
        {/* Speaker grille */}
        <div style={{
          position: 'absolute',
          bottom: 8, right: 6,
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ width: 14, height: 2, background: 'rgba(0,0,0,0.35)', borderRadius: 1 }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════
   DÉCO CHAMBRE
════════════════════════════════════════════ */
function RoomDecor() {
  return (
    <>
      <Shelf side="left" />
      <Shelf side="right" />
      <FloorLamp />
      <Poster x="9%" y="10%" w={140} h={190} hue="240" label="SYS" variant="code" />
      <WindowFrame />
    </>
  )
}

/* ─── Étagère ─── */
function Shelf({ side }) {
  const isLeft = side === 'left'

  const leftItems = [
    { type: 'book',   w: 22, h: 72, color: '#1a3a5a' },
    { type: 'book',   w: 20, h: 80, color: '#3a1a5a' },
    { type: 'book',   w: 18, h: 60, color: '#5a2a1a' },
    { type: 'figure', w: 28, h: 52 },
    { type: 'book',   w: 22, h: 76, color: '#1a4a2a' },
    { type: 'book',   w: 16, h: 64, color: '#4a3a1a' },
  ]

  // Creeper pixel data pour l'étagère droite
  const G  = '#3a9a2a'
  const GD = '#2a7018'
  const B  = '#111'
  const W  = null
  const creeperHead = [
    [W,W,G,G,G,G,W,W],
    [W,G,G,G,G,G,G,W],
    [G,G,B,G,G,B,G,G],
    [G,G,B,G,G,B,G,G],
    [G,G,G,B,B,G,G,G],
    [G,G,B,B,B,B,G,G],
    [G,G,B,G,G,B,G,G],
    [W,G,G,G,G,G,G,W],
  ]
  const creeperBody = [
    [GD,G,G,GD],
    [GD,G,G,GD],
    [G,GD,GD,G],
    [G,GD,GD,G],
    [GD,G,G,GD],
    [GD,G,G,GD],
  ]
  const creeperFeet = [
    [GD,G,W,GD,G,W],
    [G,GD,W,G,GD,W],
    [G,GD,W,G,GD,W],
    [GD,G,W,GD,G,W],
  ]
  const PX = 5 // plus petit pour tenir sur l'étagère

  return (
    <div style={{
      position: 'absolute',
      [isLeft ? 'left' : 'right']: '3%',
      bottom: `calc(${SOL}% + 200px)`,
      zIndex: 5,
    }}>
      {/* Planche */}
      <div style={{
        width: 240,
        height: 16,
        background: 'linear-gradient(180deg, #7a5c34 0%, #5a4224 100%)',
        boxShadow: '0 6px 16px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,220,140,0.25)',
        borderRadius: '2px 2px 0 0',
      }} />
      {/* Fixation murale */}
      <div style={{
        position: 'absolute',
        top: 16,
        [isLeft ? 'left' : 'right']: 14,
        width: 10, height: 48,
        background: 'linear-gradient(180deg, #4a3820 0%, #3a2810 100%)',
        borderRadius: '0 0 4px 4px',
      }} />

      {isLeft ? (
        /* Étagère gauche — livres + figurine générique */
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 3,
          padding: '0 6px',
          height: 90,
          position: 'absolute',
          bottom: 16,
          left: 0, right: 0,
        }}>
          {leftItems.map((item, i) => (
            <div key={i} style={{
              width: item.w,
              height: item.h,
              background: item.type === 'figure'
                ? 'linear-gradient(180deg, rgba(180,140,90,0.95) 0%, rgba(110,78,42,0.95) 100%)'
                : item.color,
              borderRadius: item.type === 'figure' ? '3px 3px 0 0' : '1px 1px 0 0',
              boxShadow: '2px 0 0 rgba(0,0,0,0.25), inset 1px 0 0 rgba(255,255,255,0.1)',
              flexShrink: 0,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {item.type === 'book' && (
                <div style={{
                  position: 'absolute',
                  top: 0, bottom: 0, left: 3,
                  width: 2,
                  background: 'rgba(255,255,255,0.06)',
                }} />
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Étagère droite — Gameboy + Creeper pixel-art */
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: 0, right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: 14,
          height: 90,
          paddingBottom: 2,
        }}>
          {/* Gameboy miniature */}
          <div style={{
            transform: 'scale(0.72)',
            transformOrigin: 'bottom center',
            filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.7))',
          }}>
            <div style={{
              width: 58,
              height: 92,
              background: 'linear-gradient(160deg, #8a8a9a 0%, #4e4e60 100%)',
              borderRadius: '8px 8px 14px 14px',
              position: 'relative',
              boxShadow: '0 6px 20px rgba(0,0,0,0.65), inset 0 2px 0 rgba(255,255,255,0.12)',
            }}>
              <div style={{
                position: 'absolute',
                top: 10, left: 7, right: 7,
                height: 38,
                background: '#2a2a3a',
                borderRadius: 4,
                border: '2px solid #1a1a2a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: '80%', height: '76%',
                  background: 'linear-gradient(135deg, #3a5a3a 0%, #1e3a1e 100%)',
                  borderRadius: 2,
                  boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.5)',
                }} />
              </div>
              <div style={{
                position: 'absolute',
                top: 52, left: 0, right: 0,
                textAlign: 'center',
                fontSize: 6,
                fontFamily: 'var(--font-mono)',
                color: 'rgba(200,190,220,0.5)',
                letterSpacing: 2,
              }}>GAME BOY</div>
              <div style={{ position: 'absolute', bottom: 22, left: 8, width: 22, height: 22 }}>
                <div style={{ position: 'absolute', top: '33%', left: 0, width: '100%', height: '34%', background: '#2a2a3a', borderRadius: 2 }} />
                <div style={{ position: 'absolute', left: '33%', top: 0, width: '34%', height: '100%', background: '#2a2a3a', borderRadius: 2 }} />
              </div>
              <div style={{ position: 'absolute', bottom: 24, right: 6, display: 'flex', gap: 5, alignItems: 'center' }}>
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#c0303a', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }} />
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#2a3ab0', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }} />
              </div>
              <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
                {['SEL','STA'].map(l => (
                  <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{ width: 14, height: 4, background: '#3a3a4a', borderRadius: 2 }} />
                    <span style={{ fontSize: 4, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', letterSpacing: 0.5 }}>{l}</span>
                  </div>
                ))}
              </div>
              <div style={{ position: 'absolute', bottom: 8, right: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{ width: 14, height: 2, background: 'rgba(0,0,0,0.35)', borderRadius: 1 }} />
                ))}
              </div>
            </div>
          </div>

          {/* Creeper pixel-art */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.65))',
            marginLeft: 30,
          }}>
            <PixelGrid grid={creeperHead} px={PX} />
            <PixelGrid grid={creeperBody} px={PX} />
            <PixelGrid grid={creeperFeet} px={PX} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Poster ─── */
function Poster({ x, y, w, h, hue, label, variant = 'code' }) {
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width: w, height: h,
      background: `hsla(${hue}, 35%, 10%, 0.94)`,
      border: '3px solid rgba(255,255,255,0.08)',
      boxShadow: '0 6px 24px rgba(0,0,0,0.6), inset 0 0 30px rgba(0,0,0,0.2)',
      zIndex: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Accent top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, transparent, hsla(${hue},70%,50%,0.55), transparent)`,
      }} />

      {variant === 'code' && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          lineHeight: 1.8,
          color: `hsla(${hue}, 60%, 62%, 0.78)`,
          textAlign: 'left',
          padding: '0 14px',
          width: '100%',
          userSelect: 'none',
        }}>
          {[
            'fn main() {',
            '  let x = 42;',
            '  let y = vec![];',
            '  loop {',
            '    render(&y);',
            '    sleep(16);',
            '  }',
            '}',
          ].map((ln, i) => (
            <div key={i} style={{ opacity: 0.55 + (i % 3) * 0.14 }}>{ln}</div>
          ))}
        </div>
      )}

      {variant === 'grid' && (
        <div style={{ padding: '14px 12px', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 5,
          }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} style={{
                height: 8,
                background: `hsla(${hue}, 55%, 45%, ${0.12 + (i * 7 % 5) * 0.14})`,
                borderRadius: 2,
              }} />
            ))}
          </div>
        </div>
      )}

      {/* Label */}
      <div style={{
        position: 'absolute',
        bottom: 10,
        fontSize: 11,
        fontFamily: 'var(--font-mono)',
        color: `hsla(${hue}, 50%, 60%, 0.5)`,
        letterSpacing: 5,
        textTransform: 'uppercase',
        userSelect: 'none',
      }}>
        {label}
      </div>
    </div>
  )
}

/* ─── Fenêtre murale ─── */
function WindowFrame() {
  return (
    <div style={{
      position: 'absolute',
      right: '5%',
      top: '7%',
      width: 180, height: 230,
      zIndex: 4,
    }}>
      {/* Cadre bois */}
      <div style={{
        position: 'absolute', inset: 0,
        border: '10px solid #2a1e10',
        background: 'transparent',
        zIndex: 2,
        boxShadow: 'inset 0 0 0 2px rgba(255,200,100,0.08)',
      }} />
      {/* Rebord intérieur */}
      <div style={{
        position: 'absolute', inset: 10,
        border: '3px solid #1a1208',
        zIndex: 2,
        pointerEvents: 'none',
      }} />
      {/* Croisillon H */}
      <div style={{
        position: 'absolute',
        left: 10, right: 10, top: '48%',
        height: 8, background: '#2a1e10', zIndex: 3,
      }} />
      {/* Croisillon V */}
      <div style={{
        position: 'absolute',
        top: 10, bottom: 10, left: '50%',
        width: 8, background: '#2a1e10', zIndex: 3,
        marginLeft: -4,
      }} />
      {/* Ciel */}
      <div style={{
        position: 'absolute', inset: 10,
        background: 'linear-gradient(180deg, #060818 0%, #090d22 55%, #0c1130 100%)',
        zIndex: 1,
      }} />
      {/* Lune pleine */}
      <div style={{
        position: 'absolute',
        left: '55%', top: '12%',
        width: 30, height: 30,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 36% 36%, #f8f2de 0%, #e0d4a8 55%, #c0a870 100%)',
        boxShadow: '0 0 14px rgba(240,225,170,0.65), 0 0 32px rgba(240,225,170,0.25)',
        zIndex: 4,
      }} />
      {/* Ombre croissant */}
      <div style={{
        position: 'absolute',
        left: 'calc(55% + 10px)', top: 'calc(12% + 2px)',
        width: 26, height: 26,
        borderRadius: '50%',
        background: '#070a1c',
        zIndex: 5,
        opacity: 0.62,
      }} />
      {/* Étoiles */}
      {[
        [18,16],[62,28],[38,54],[70,46],[12,68],[80,18],
        [44,10],[8,42],[55,72],[28,80],[90,60],[35,36],
      ].map(([lx, ly], i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${lx}%`, top: `${ly}%`,
          width: i % 4 === 0 ? 3 : 2,
          height: i % 4 === 0 ? 3 : 2,
          borderRadius: '50%',
          background: `rgba(210,225,255,${0.35 + (i % 5) * 0.1})`,
          boxShadow: i % 4 === 0 ? '0 0 3px rgba(200,220,255,0.5)' : 'none',
          zIndex: 2,
          animation: `starTwinkle ${1.8 + (i * 0.37) % 2.2}s ease-in-out infinite`,
          animationDelay: `${(i * 0.43) % 2.5}s`,
        }} />
      ))}
      {/* Lueur lunaire diffuse */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: 260, height: 320,
        transform: 'translate(-18%, -12%)',
        background: 'radial-gradient(ellipse at 72% 18%, rgba(170,190,255,0.09) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
    </div>
  )
}
