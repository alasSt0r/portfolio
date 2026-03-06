import { useState, useCallback } from 'react'
import CRTScreen from './components/CRTScreen'
import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'

export default function App() {
  const [booted, setBooted] = useState(false)
  const handleBootDone = useCallback(() => setBooted(true), [])

  return (
    <CRTScreen>
      {!booted && <BootScreen onDone={handleBootDone} />}
      {booted && <Desktop />}
    </CRTScreen>
  )
}
