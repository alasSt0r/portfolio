import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function Window({
  id,
  title,
  icon,
  children,
  defaultPosition = { x: 80, y: 60 },
  defaultSize = { width: 480, height: 320 },
  onClose,
  onFocus,
  isFocused,
  zIndex,
}) {
  const [pos, setPos]         = useState(defaultPosition)
  const [size, setSize]       = useState(defaultSize)
  const [minimized, setMin]   = useState(false)

  // ── Drag ──
  const onDragStart = useCallback((e) => {
    if (e.target.closest('[data-nodrag]')) return
    e.preventDefault()
    onFocus(id)
    const ox = e.clientX - pos.x
    const oy = e.clientY - pos.y
    const move = (ev) => setPos({ x: ev.clientX - ox, y: ev.clientY - oy })
    const up   = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }, [pos, id, onFocus])

  // ── Resize ──
  const onResizeStart = useCallback((e) => {
    e.stopPropagation(); e.preventDefault()
    const sx = e.clientX, sy = e.clientY
    const sw = size.width, sh = size.height
    const move = (ev) => setSize({ width: Math.max(300, sw + ev.clientX - sx), height: Math.max(180, sh + ev.clientY - sy) })
    const up   = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }, [size])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93, y: 10 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      exit={{    opacity: 0, scale: 0.95,  y: 6  }}
      transition={{ duration: 0.14, ease: [0.2, 0, 0.2, 1] }}
      className="absolute flex flex-col"
      style={{
        left: pos.x, top: pos.y,
        width:  size.width,
        height: minimized ? 28 : size.height,
        zIndex,
        /* Fenêtre avec look OS rétro — fond gris clair */
        background: isFocused
          ? 'linear-gradient(180deg, #f0f0ec 0%, #e4e4e0 100%)'
          : '#dcdcd8',
        border: '2px solid',
        borderColor: '#888 #fff #fff #888',   /* relief Win95 */
        boxShadow: isFocused
          ? '2px 2px 0 #555, 4px 6px 20px rgba(0,0,0,0.45)'
          : '1px 1px 0 #555, 2px 3px 10px rgba(0,0,0,0.3)',
        overflow: 'hidden',
      }}
      onMouseDown={() => onFocus(id)}
    >
      {/* ── Title bar ── */}
      <div
        onMouseDown={onDragStart}
        className="flex items-center gap-1.5 shrink-0 cursor-move select-none px-2"
        style={{
          height: 28,
          background: isFocused
            ? 'linear-gradient(90deg, #2a5298 0%, #1e3c72 100%)'
            : 'linear-gradient(90deg, #808080 0%, #606060 100%)',
          borderBottom: '1px solid rgba(0,0,0,0.25)',
        }}
      >
        {/* Icon */}
        {icon && (
          <span style={{ fontSize: 14, lineHeight: 1, flexShrink: 0 }}>{icon}</span>
        )}

        {/* Title */}
        <span
          className="flex-1 truncate"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 12,
            fontWeight: 600,
            color: isFocused ? '#fff' : '#ccc',
            letterSpacing: '0.02em',
            textShadow: isFocused ? '0 1px 2px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          {title}
        </span>

        {/* Controls */}
        <div className="flex gap-1" data-nodrag="true">
          <TitleBtn onClick={() => setMin(v => !v)} title="Minimize">
            <span style={{ display: 'block', width: 8, height: 2, background: '#333', marginTop: 'auto', marginBottom: 1 }} />
          </TitleBtn>
          <TitleBtn onClick={() => onClose(id)} title="Close" isClose>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <line x1="1" y1="1" x2="7" y2="7" stroke="#333" strokeWidth="1.5"/>
              <line x1="7" y1="1" x2="1" y2="7" stroke="#333" strokeWidth="1.5"/>
            </svg>
          </TitleBtn>
        </div>
      </div>

      {/* ── Body ── */}
      {!minimized && (
        <div
          className="flex-1 overflow-auto"
          style={{
            background: '#fafaf8',
            padding: '16px 18px',
          }}
        >
          {children}
        </div>
      )}

      {/* ── Status bar ── */}
      {!minimized && (
        <div
          style={{
            height: 18,
            background: '#d4d4d0',
            borderTop: '1px solid #b0b0ac',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 8,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 10, color: '#666', fontFamily: 'var(--font-ui)' }}>
            Ready
          </span>
        </div>
      )}

      {/* ── Resize ── */}
      {!minimized && (
        <div
          onMouseDown={onResizeStart}
          data-nodrag="true"
          className="absolute bottom-0 right-0 cursor-se-resize"
          style={{ width: 18, height: 18, zIndex: 20 }}
        >
          <svg width="18" height="18" style={{ position:'absolute', bottom:0, right:0 }}>
            <line x1="18" y1="6"  x2="6"  y2="18" stroke="#aaa" strokeWidth="1"/>
            <line x1="18" y1="11" x2="11" y2="18" stroke="#aaa" strokeWidth="1"/>
            <line x1="18" y1="16" x2="16" y2="18" stroke="#aaa" strokeWidth="1"/>
          </svg>
        </div>
      )}
    </motion.div>
  )
}

function TitleBtn({ onClick, children, title, isClose }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 16, height: 16,
        background: hov
          ? (isClose ? '#e05050' : '#b0b0b0')
          : '#c8c8c4',
        border: '1px solid',
        borderColor: '#fff #888 #888 #fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', padding: 0, flexShrink: 0,
        transition: 'background 0.1s',
      }}
    >
      {children}
    </button>
  )
}
