import { useState, useCallback } from 'react'
import CRTScreen from './components/CRTScreen'
import BootScreen from './components/BootScreen'
import LoginScreen from './components/LoginScreen'
import Desktop from './components/Desktop'
import RoomScene from './components/RoomScene'

export default function App() {
  // 'boot' | 'login' | 'zooming' | 'desktop'
  const [phase, setPhase] = useState('boot')

  const handleBootDone      = useCallback(() => setPhase('login'), [])
  // clic login → on lance le flash CRT, mais on garde LoginScreen affiché
  const handleLogin         = useCallback(() => setPhase('zooming'), [])
  // flash terminé → on switche vers le desktop plein écran
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
