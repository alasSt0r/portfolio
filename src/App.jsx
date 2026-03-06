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
  // clic login → on lance le zoom, mais on garde LoginScreen affiché
  const handleLogin         = useCallback(() => setPhase('zooming'), [])
  // zoom terminé → on switche vers le desktop
  const handleZoomDone      = useCallback(() => setPhase('desktop'), [])

  const zoomedIn = phase === 'zooming' || phase === 'desktop'

  return (
    <RoomScene zoomedIn={zoomedIn} onZoomDone={handleZoomDone}>
      <CRTScreen>
        {phase === 'boot'                      && <BootScreen onDone={handleBootDone} />}
        {(phase === 'login' || phase === 'zooming') && <LoginScreen onLogin={handleLogin} />}
        {phase === 'desktop'                   && <Desktop />}
      </CRTScreen>
    </RoomScene>
  )
}
