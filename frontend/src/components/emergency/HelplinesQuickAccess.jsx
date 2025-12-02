import React, { useEffect, useState } from 'react';
import Card from '../common/Card/Card.jsx';

export const HelplinesQuickAccess = () => {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    // Try API, fallback to static if offline
    const fetchLines = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/helplines/`);
        const data = await res.json();
        setLines((data || []).slice(0, 3));
      } catch {
        setLines([
          { id: 'local1', name: 'Local Hotline', phone_number: '123-456-7890' },
          { id: 'clinic', name: 'Nearby Clinic', phone_number: '555-000-0000' },
          { id: 'community', name: 'Community Center', phone_number: '555-111-2222' },
        ]);
      }
    };
    fetchLines();
  }, []);

  return (
    <Card padding="md" shadow="sm" className="helplines-quick-access">
      <h2 className="hqa__title">Quick Support</h2>
      <ul className="hqa__list">
        {lines.map(l => (
          <li key={l.id}><strong>{l.name}</strong> — {l.phone_number}</li>
        ))}
      </ul>
    </Card>
  );
};
