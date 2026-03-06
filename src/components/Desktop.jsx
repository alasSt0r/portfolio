import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Window from './Window'
import ContactApp from './apps/ContactApp'

const APPS = [
  {
    id: 'contact',
    label: 'Contact',
    icon: '✉️',
    title: 'Contact',
    component: ContactApp,
    defaultSize: { width: 420, height: 310 },
    defaultPosition: { x: 100, y: 70 },
  },
]

// ── Icône de bureau ──
function DesktopIcon({ app, onOpen, isSelected, onSelect }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 cursor-pointer select-none"
      style={{ width: 72, padding: '6px 4px' }}
      onClick={(e) => { e.stopPropagation(); onSelect(app.id) }}
      onDoubleClick={(e) => { e.stopPropagation(); onOpen(app.id) }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Icon container */}
      <div
        style={{
          width: 48, height: 48,
          background: isSelected
            ? 'rgba(255,255,255,0.25)'
            : 'rgba(255,255,255,0.10)',
          border: isSelected
            ? '1px solid rgba(255,255,255,0.6)'
            : '1px solid rgba(255,255,255,0.15)',
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26,
          backdropFilter: 'blur(2px)',
          boxShadow: isSelected ? '0 0 0 1px rgba(255,255,255,0.3)' : 'none',
          transition: 'all 0.12s',
        }}
      >
        {app.icon}
      </div>
      {/* Label */}
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 11,
          fontWeight: 500,
          color: '#fff',
          textAlign: 'center',
          textShadow: '0 1px 3px rgba(0,0,0,0.7)',
          background: isSelected ? 'rgba(42,82,152,0.7)' : 'transparent',
          padding: '1px 4px',
          borderRadius: 2,
          lineHeight: 1.3,
          letterSpacing: '0.01em',
        }}
      >
        {app.label}
      </span>
    </motion.div>
  )
}

// ── Horloge ──
function Clock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const pad = n => String(n).padStart(2, '0')
  return (
    <span style={{
      fontFamily: 'var(--font-ui)',
      fontSize: 12,
      fontWeight: 500,
      color: '#222',
      letterSpacing: '0.05em',
    }}>
      {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
    </span>
  )
}

export default function Desktop() {
  const [windows,     setWindows]     = useState([])
  const [focusedId,   setFocusedId]   = useState(null)
  const [topZ,        setTopZ]        = useState(10)
  const [selectedIcon,setSelectedIcon]= useState(null)

  const openApp = (appId) => {
    const existing = windows.find(w => w.id === appId)
    if (existing) {
      // Déjà ouvert : restaure si minimisé, sinon focus
      if (existing.minimized) {
        restoreWindow(appId)
      } else {
        focusWindow(appId)
      }
      return
    }
    const app = APPS.find(a => a.id === appId)
    if (!app) return
    const nextZ = topZ + 1
    setTopZ(nextZ)
    setWindows(prev => [...prev, { ...app, zIndex: nextZ, minimized: false }])
    setFocusedId(appId)
  }

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id))
    setFocusedId(null)
  }

  const minimizeWindow = (id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w))
    setFocusedId(null)
  }

  const restoreWindow = (id) => {
    const nextZ = topZ + 1
    setTopZ(nextZ)
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: false, zIndex: nextZ } : w))
    setFocusedId(id)
  }

  const focusWindow = (id) => {
    const nextZ = topZ + 1
    setTopZ(nextZ)
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZ } : w))
    setFocusedId(id)
  }

  // Clic sur un onglet de la taskbar
  const handleTaskbarClick = (id) => {
    const win = windows.find(w => w.id === id)
    if (!win) return
    if (win.minimized) {
      restoreWindow(id)
    } else if (focusedId === id) {
      // Déjà au premier plan → minimise
      minimizeWindow(id)
    } else {
      focusWindow(id)
    }
  }

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{
        background: 'linear-gradient(160deg, #1e4a5c 0%, #1a3a4a 50%, #142e3c 100%)',
      }}
      onClick={() => setSelectedIcon(null)}
    >
      {/* ── Desktop area ── */}
      <div className="flex-1 relative overflow-hidden">

        {/* Desktop icons — colonne gauche */}
        <div
          className="absolute top-4 left-4 flex flex-col gap-2"
          style={{ zIndex: 5 }}
          onClick={e => e.stopPropagation()}
        >
          {APPS.map(app => (
            <DesktopIcon
              key={app.id}
              app={app}
              onOpen={openApp}
              isSelected={selectedIcon === app.id}
              onSelect={setSelectedIcon}
            />
          ))}
        </div>

        {/* Windows */}
        <AnimatePresence>
          {windows.map(win => {
            const AppComponent = win.component
            return (
              <Window
                key={win.id}
                id={win.id}
                title={win.title}
                icon={win.icon}
                defaultPosition={win.defaultPosition}
                defaultSize={win.defaultSize}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                onFocus={focusWindow}
                isFocused={focusedId === win.id}
                isMinimized={win.minimized}
                zIndex={win.zIndex}
              >
                <AppComponent />
              </Window>
            )
          })}
        </AnimatePresence>
      </div>

      {/* ── Taskbar style Win95/98 ── */}
      <div
        className="shrink-0 flex items-center px-2 gap-2"
        style={{
          height: 34,
          background: '#c0c0c0',
          borderTop: '2px solid #fff',
          boxShadow: '0 -1px 0 #888',
        }}
      >
        {/* Start button */}
        <button
          className="raised flex items-center gap-1.5"
          style={{
            height: 26,
            padding: '0 10px',
            background: '#c0c0c0',
            fontFamily: 'var(--font-ui)',
            fontSize: 12,
            fontWeight: 700,
            color: '#111',
            cursor: 'pointer',
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: 14 }}>⊞</span>
          Start
        </button>

        {/* Separator */}
        <div style={{ width: 1, height: 22, background: '#888', borderRight: '1px solid #fff', marginRight: 2 }} />

        {/* Open app tabs */}
        <div className="flex gap-1 flex-1">
          {windows.map(win => (
            <button
              key={win.id}
              onClick={() => handleTaskbarClick(win.id)}
              style={{
                height: 24,
                padding: '0 10px',
                fontFamily: 'var(--font-ui)',
                fontSize: 11,
                fontWeight: focusedId === win.id && !win.minimized ? 700 : 500,
                color: '#111',
                cursor: 'pointer',
                background: '#c0c0c0',
                border: '1px solid',
                borderColor: focusedId === win.id && !win.minimized
                  ? '#888 #fff #fff #888'
                  : '#fff #888 #888 #fff',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                minWidth: 100,
                maxWidth: 160,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                opacity: win.minimized ? 0.7 : 1,
              }}
            >
              <span style={{ fontSize: 13, flexShrink: 0 }}>{win.icon}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{win.title}</span>
            </button>
          ))}
        </div>

        {/* System tray */}
        <div
          className="sunken flex items-center gap-2 px-2"
          style={{ height: 24, marginLeft: 'auto', flexShrink: 0 }}
        >
          <span style={{ fontSize: 12 }}>🔊</span>
          <Clock />
        </div>
      </div>
    </div>
  )
}
