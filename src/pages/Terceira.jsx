import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Terceira.css';

export default function Terceira() {
  const location = useLocation();
  const userId = location.state?.id;
  const usuario = location.state?.usuario;
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/checklist/${userId}`);
        const data = await res.json();
        const pendentes = data.filter(c => !c.statuschecklist?.trim() || c.statuschecklist === "PENDENTE");
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
    const updatedChecklist = { ...checklist, statuschecklist: "CONCLUIDO" };

    try {
      const res = await fetch(`http://localhost:8080/api/checklist/${checklist.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedChecklist),
      });

      if (!res.ok) {
        alert('Erro ao atualizar checklist');
        return;
      }

      alert('Checklist atualizado com sucesso!');

      // Atualiza o estado local com o novo status
      setChecklists(prev =>
        prev.map(c =>
          c.id === checklist.id ? { ...c, statuschecklist: "CONCLUIDO" } : c
        )
      );
    } catch (err) {
      alert('Erro na requisição: ' + err.message);
    }
  };


  return (
    <div className="principal-container">
      <h2>Checklists Pendentes - {usuario}</h2>

      {checklists.length === 0 ? (
        <p className="no-checklists-message">Nenhum checklist pendente encontrado.</p>
      ) : (
        <table className="checklist-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Pneus</th>
              <th>Freios</th>
              <th>Luzes</th>
              <th>Nível Óleo</th>
              <th>Status Checklist</th>
              <th>Relato</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {checklists.map((c, index) => (
              <tr key={c.id}>
                <td data-label="Data">{c.dtchecklist}</td>
                <td data-label="Pneus">{c.pneus}</td>
                <td data-label="Freios">{c.freios}</td>
                <td data-label="Luzes">{c.luzes}</td>
                <td data-label="Nível Óleo">{c.nivelOleo}</td>
                <td data-label="Status Checklist">
                  <input
                    type="text"
                    value={c.statuschecklist}
                    onChange={(e) => handleChange(index, 'statuschecklist', e.target.value)}
                    className="table-input"
                    disabled
                  />
                </td>
                <td data-label="Relato">
                  <textarea
                    rows="2"
                    value={c.relato || ''}
                    onChange={(e) => handleChange(index, 'relato', e.target.value)}
                    className="table-textarea"
                  />
                </td>
                <td data-label="Ações">
                  <button
                    className="btn-save"
                    onClick={() => handleUpdate(c)}
                    disabled={c.statuschecklist === "CONCLUIDO"}
                  >
                    {c.statuschecklist === "CONCLUIDO" ? "Concluído" : "Salvar"}
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );

}
