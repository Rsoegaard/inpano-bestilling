import React, { useState } from "react";

const varer = [
  "DAO MINI (200x100x50)",
  "DAO HJEM (300x235x210)",
  "DAO SHOP (500x300x300)",
  "Lille autobund hvid (235x115x100)",
  "Salon autobund hvid (300x120x120)",
  "Joint autobund hvid (310x230x128)"
];

export default function Varebestilling() {
  const [navn, setNavn] = useState("");
  const [afdeling, setAfdeling] = useState("");
  const [valg, setValg] = useState([]);
  const [vare, setVare] = useState(varer[0]);
  const [antal, setAntal] = useState("");

  const tilføjVare = () => {
    if (!antal) return;
    setValg([...valg, { vare, antal }]);
    setAntal("");
  };

  const fjernVare = (index) => {
    const nyListe = [...valg];
    nyListe.splice(index, 1);
    setValg(nyListe);
  };

  const sendBestilling = () => {
    const mailBody = \`Navn: \${navn}\nAfdeling: \${afdeling}\n\nBestilte varer:\n\` +
      valg.map(v => \`- \${v.vare}: \${v.antal} stk\`).join("\n");

    const mailto = \`mailto:RSP@inventnord.dk?subject=Ny varebestilling fra \${encodeURIComponent(navn)}&body=\${encodeURIComponent(mailBody)}\`;
    window.location.href = mailto;
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>INPANO Varebestilling</h1>
      <input placeholder="Navn" value={navn} onChange={e => setNavn(e.target.value)} style={{ width: '100%', marginBottom: 10 }} />
      <input placeholder="Afdeling" value={afdeling} onChange={e => setAfdeling(e.target.value)} style={{ width: '100%', marginBottom: 10 }} />
      
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <select value={vare} onChange={e => setVare(e.target.value)} style={{ flex: 1 }}>
          {varer.map((v, i) => <option key={i}>{v}</option>)}
        </select>
        <input
          placeholder="Antal"
          type="number"
          value={antal}
          onChange={e => setAntal(e.target.value)}
          style={{ width: 80 }}
        />
        <button onClick={tilføjVare}>Tilføj</button>
      </div>

      {valg.map((v, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span>{v.vare} ({v.antal} stk)</span>
          <button onClick={() => fjernVare(i)}>Fjern</button>
        </div>
      ))}

      <button
        onClick={sendBestilling}
        disabled={!navn || !afdeling || valg.length === 0}
        style={{ marginTop: 20, width: '100%' }}
      >
        Send bestilling
      </button>
    </div>
  );
}