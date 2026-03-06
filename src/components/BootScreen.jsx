import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LINES = [
  { text: 'WART-OS v2.4.1 — BIOS Rev 3.07', delay: 0, bright: true },
  { text: 'Copyright (C) 2026 Marius Wartel. All rights reserved.', delay: 180 },
  { text: '', delay: 320 },
  { text: 'Detecting hardware...', delay: 420 },
  { text: '  CPU: MW-6502 @ 3.58 MHz            [OK]', delay: 620 },
  { text: '  RAM: 640K conventional memory       [OK]', delay: 780 },
  { text: '  VGA: Phosphor Green CRT 80x25       [OK]', delay: 940 },
  { text: '', delay: 1050 },
  { text: 'Loading kernel modules...', delay: 1150 },
  { text: '  portfolio.sys                       [OK]', delay: 1350 },
  { text: '  creativity.drv                      [OK]', delay: 1510 },
  { text: '  ALOTOFAI.dll                        [OK]', delay: 1660 },
  { text: '', delay: 1780 },
  { text: 'Mounting filesystem...                [OK]', delay: 1900 },
  { text: 'Starting window manager...            [OK]', delay: 2100 },
  { text: '', delay: 2250 },
  { text: 'Welcome, user.', delay: 2380, bright: true },
]

export default function BootScreen({ onDone }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
      }, line.delay)
    )

    const finishTimer = setTimeout(() => {
      setDone(true)
      setTimeout(onDone, 600)
    }, 3200)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(finishTimer)
    }
  }, [onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          className="absolute inset-0 flex flex-col justify-start items-start p-6 z-50"
          style={{ background: '#0a1a0e', fontFamily: 'var(--font-mono)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {BOOT_LINES.map((line, i) =>
            visibleLines.includes(i) ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.08 }}
                className={`text-[13px] leading-[1.75] whitespace-pre ${line.bright ? 'glow' : ''}`}
                style={{
                  color: line.bright ? '#7fff8f' : '#4dd868',
                  fontFamily: 'var(--font-mono)',
                  textShadow: line.bright
                    ? '0 0 10px rgba(57,255,110,0.7), 0 0 24px rgba(57,255,110,0.3)'
                    : '0 0 6px rgba(57,255,110,0.35)',
                }}
              >
                {line.text}
              </motion.div>
            ) : null
          )}

          {/* Blinking cursor at end */}
          {visibleLines.length >= BOOT_LINES.length && (
            <div className="mt-1 flex items-center gap-1">
              <span style={{ color: '#4dd868', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
                ›
              </span>
              <span
                className="inline-block w-[9px] h-[15px]"
                style={{
                  background: '#7fff8f',
                  boxShadow: '0 0 8px rgba(57,255,110,0.9), 0 0 16px rgba(57,255,110,0.4)',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
