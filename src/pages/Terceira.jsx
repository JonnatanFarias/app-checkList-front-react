import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Terceira() {
  const location = useLocation();
  const userId = location.state?.id;
  const usuario = location.state?.usuario;
  const [checklists, setChecklists] = useState([]);

 useEffect(() => {
  const fetchChecklists = async () => {
    try {
      const res = await fetch(`http://10.1.1.116:8081/api/checklist/${userId}`);
      const data = await res.json();
      const pendentes = data.filter(c => !c.statuschecklist?.trim());
      setChecklists(pendentes);
    } catch (err) {
      alert('Erro ao buscar checklists: ' + err.message);
    }
  };

  if (userId) fetchChecklists();
}, [userId]);

  const handleChange = (index, field, value) => {
    const updated = [...checklists];
    updated[index][field] = value;
    setChecklists(updated);
  };

  const handleUpdate = async (checklist) => {
    try {
      const res = await fetch(`http://10.1.1.116:8081/api/checklist/${checklist.id}`, {
        method: 'PATCH', // ou 'POST' dependendo da API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checklist),
      });

      if (!res.ok) {
        alert('Erro ao atualizar checklist');
        return;
      }

      alert('Checklist atualizado com sucesso!');
    } catch (err) {
      alert('Erro na requisição: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Checklists Pendentes - {usuario}</h2>

      {checklists.length === 0 ? (
        <p>Nenhum checklist pendente encontrado.</p>
      ) : (
        checklists.map((c, index) => (
          <div key={c.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <p><strong>Data:</strong> {c.dtchecklist}</p>
            <p><strong>Pneus:</strong> {c.pneus}</p>
            <p><strong>Freios:</strong> {c.freios}</p>
            <p><strong>Luzes:</strong> {c.luzes}</p>
            <p><strong>Nível Óleo:</strong> {c.nivelOleo}</p>

            <div>
              <label>Status Checklist:</label>
              <input
                type="text"
                value={c.statuschecklist}
                onChange={(e) => handleChange(index, 'statuschecklist', e.target.value)}
              />
            </div>

            <div>
              <label>Relato:</label>
              <textarea
                rows="2"
                value={c.relato || ''}
                onChange={(e) => handleChange(index, 'relato', e.target.value)}
              />
            </div>

            <button onClick={() => handleUpdate(c)}>Salvar</button>
          </div>
        ))
      )}
    </div>
  );
}
