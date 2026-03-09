import { useState, useCallback } from 'react'
import CRTScreen from './components/CRTScreen'
import BootScreen from './components/BootScreen'
import LoginScreen from './components/LoginScreen'
import Desktop from './components/Desktop'
import RoomScene from './components/RoomScene'

export default function App() {
  const [phase, setPhase] = useState('boot')

  const handleBootDone      = useCallback(() => setPhase('login'), [])
  const handleLogin         = useCallback(() => setPhase('zooming'), [])
  const handleZoomDone      = useCallback(() => setPhase('desktop'), [])

  const zoomedIn = phase === 'zooming'

  if (phase === 'desktop') {
    return <Desktop />
  }

  return (
    <RoomScene zoomedIn={zoomedIn} onZoomDone={handleZoomDone}>
      <CRTScreen>
        {phase === 'boot'                          && <BootScreen onDone={handleBootDone} />}
        {(phase === 'login' || phase === 'zooming') && <LoginScreen onLogin={handleLogin} />}
      </CRTScreen>
    </RoomScene>
  )
}
