export default function BtsSkillsApp() {
  // ⚠️ IMPORTANT : Remplacez cette URL par votre lien Google Sheets
  // 
  // Pour obtenir le lien :
  // 1. Ouvrez votre Google Sheet
  // 2. Fichier → Partager → Publier sur le Web
  // 3. Choisissez "Intégrer" et copiez l'URL de l'iframe
  // 4. Collez-la ci-dessous en remplacement de VOTRE_SHEET_URL
  
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vReP2GYYda0yak2gxDtQifgglinSO9ffEozkkZAjCGIPcaM3_rFfb4H6NOVhRa4xw/pubhtml?gid=1952801044&amp;single=true&amp;widget=true&amp;headers=false"
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
        gap: 10,
        paddingBottom: 10,
        borderBottom: '1px solid #d0d0cc',
        marginBottom: 0,
        flexShrink: 0,
      }}>
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

      {/* ── Google Sheets Iframe ── */}
      <div
        className="sunken"
        style={{
          flex: 1,
          overflow: 'hidden',
          background: '#fafaf8',
          position: 'relative',
        }}
      >
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
  )
}
