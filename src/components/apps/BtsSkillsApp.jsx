import { useState } from 'react'

export default function BtsSkillsApp() {
  // Pour obtenir le lien :
  // 1. Ouvrez votre Google Sheet
  // 2. Fichier → Partager → Publier sur le Web
  // 3. Choisissez "Intégrer" et copiez l'URL de l'iframe
  // 4. Collez-la ci-dessous en remplacement de VOTRE_SHEET_URL
  
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSESXgs_HFnl8a2WbGDKjoqF-Xj2soCudhldsXqDTA7bsHHxv-mPkA93WSlokP52g/pubhtml?gid=1952801044&amp;single=true&amp;widget=true&amp;headers=false"

  const [zoom, setZoom] = useState(0.7) // Démarrage à 70% pour voir plus de contenu

  const zoomIn  = () => setZoom(z => Math.min(z + 0.1, 2))
  const zoomOut = () => setZoom(z => Math.max(z - 0.1, 0.3))
  const resetZoom = () => setZoom(0.7)

  return (
    <div style={{
      fontFamily: 'var(--font-ui)',
      color: 'var(--color-text)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>

      {/* ── Header ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottom: '1px solid #d0d0cc',
        marginBottom: 0,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38,
            background: 'linear-gradient(135deg, #2a7a4a 0%, #1a5a3a 100%)',
            borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
            boxShadow: '0 2px 6px rgba(42,122,74,0.30)',
            flexShrink: 0,
          }}>
            📊
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>
              Tableau Compétences BTS
            </div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>
              Référentiel de compétences
            </div>
          </div>
        </div>

        {/* Contrôles de zoom */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={zoomOut}
            className="raised"
            style={{
              width: 26, height: 26,
              background: '#c0c0c0',
              fontFamily: 'var(--font-ui)',
              fontSize: 16,
              fontWeight: 700,
              color: '#111',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Dézoomer"
          >
            −
          </button>
          <button
            onClick={resetZoom}
            className="raised"
            style={{
              height: 26,
              padding: '0 10px',
              background: '#c0c0c0',
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              fontWeight: 600,
              color: '#111',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            title="Réinitialiser"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={zoomIn}
            className="raised"
            style={{
              width: 26, height: 26,
              background: '#c0c0c0',
              fontFamily: 'var(--font-ui)',
              fontSize: 16,
              fontWeight: 700,
              color: '#111',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Zoomer"
          >
            +
          </button>
        </div>
      </div>

      {/* ── Google Sheets Iframe avec zoom ── */}
      <div
        className="sunken"
        style={{
          flex: 1,
          overflow: 'auto',
          background: '#fafaf8',
          position: 'relative',
        }}
      >
        <div style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
          width: `${100 / zoom}%`,
          height: `${100 / zoom}%`,
        }}>
          <iframe
            src={SHEET_URL}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
            }}
            title="Tableau Compétences BTS"
          />
        </div>
      </div>
    </div>
  )
}
