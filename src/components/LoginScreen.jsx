import { motion } from 'framer-motion'

export default function LoginScreen({ onLogin }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: '#0a1a0e',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
      gap: 0,
    }}>

      {/* Grille de fond subtile */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(57,255,110,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(57,255,110,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />

      {/* Heure fictive */}
      <div style={{
        position: 'absolute',
        top: 18, right: 22,
        fontSize: 11,
        color: 'rgba(77,216,104,0.35)',
        letterSpacing: 3,
      }}>
        03:47:22
      </div>

      {/* Logo / nom */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ textAlign: 'center', marginBottom: 40 }}
      >
        <div style={{
          fontSize: 11,
          letterSpacing: 8,
          color: 'rgba(77,216,104,0.5)',
          marginBottom: 10,
          textTransform: 'uppercase',
        }}>
          WART-OS v2.4.1
        </div>
        <div style={{
          fontSize: 28,
          letterSpacing: 6,
          color: '#7fff8f',
          textShadow: '0 0 20px rgba(57,255,110,0.6), 0 0 60px rgba(57,255,110,0.2)',
          textTransform: 'uppercase',
        }}>
          Marius Wartel
        </div>
        <div style={{
          fontSize: 11,
          letterSpacing: 4,
          color: 'rgba(77,216,104,0.4)',
          marginTop: 8,
        }}>
          ──────────────────────
        </div>
      </motion.div>

      {/* Avatar pixel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        style={{
          width: 64, height: 64,
          marginBottom: 32,
          position: 'relative',
        }}
      >
        {/* silhouette stylisée en CSS */}
        <div style={{
          width: 64, height: 64,
          borderRadius: '50%',
          border: '2px solid rgba(57,255,110,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(57,255,110,0.15)',
        }}>
          <div style={{
            fontSize: 28,
            color: 'rgba(57,255,110,0.5)',
            userSelect: 'none',
          }}>◈</div>
        </div>
      </motion.div>

      {/* Bouton login */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onLogin}
        style={{
          background: 'transparent',
          border: '1px solid rgba(57,255,110,0.5)',
          color: '#7fff8f',
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          letterSpacing: 5,
          padding: '10px 36px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          boxShadow: '0 0 16px rgba(57,255,110,0.15), inset 0 0 16px rgba(57,255,110,0.04)',
          transition: 'box-shadow 0.2s, border-color 0.2s',
          outline: 'none',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(57,255,110,0.9)'
          e.currentTarget.style.boxShadow   = '0 0 28px rgba(57,255,110,0.35), inset 0 0 20px rgba(57,255,110,0.08)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(57,255,110,0.5)'
          e.currentTarget.style.boxShadow   = '0 0 16px rgba(57,255,110,0.15), inset 0 0 16px rgba(57,255,110,0.04)'
        }}
      >
        [ ENTER ]
      </motion.button>

      {/* Hint clavier */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        style={{
          marginTop: 20,
          fontSize: 10,
          color: 'rgba(77,216,104,0.25)',
          letterSpacing: 3,
        }}
      >
        PRESS TO CONTINUE
      </motion.div>

      {/* Scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
