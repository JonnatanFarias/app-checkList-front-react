import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Principal.css';

export default function Principal() {
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = location.state?.usuario || 'Usuário';
  const userId = location.state?.id;

  const [form, setForm] = useState({
    pneus: '',
    freios: '',
    luzes: '',
    nivelOleo: '',
    statuschecklist: 'PENDENTE',
    dtchecklist: '',
    relato: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...form,
      dtchecklist: formatDate(form.dtchecklist),
      usuario: { id: userId },
    };

    try {
      const response = await fetch('http://localhost:8080/api/checklist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        alert('Erro ao enviar checklist');
        return;
      }

      alert('Checklist enviado com sucesso!');
      setForm({
        pneus: '',
        freios: '',
        luzes: '',
        nivelOleo: '',
        statuschecklist: 'PENDENTE',
        dtchecklist: '',
        relato: '',
      });
    } catch (error) {
      alert('Erro na requisição: ' + error.message);
    }
  };

  return (
    <div className="principal-container">
      <div className="principal-card">
        <h2 className="principal-title">Bem-vindo, {usuario}!</h2>
        <form onSubmit={handleSubmit} className="checklist-form">
          <div className="form-group">
            <label>Pneus:</label>
            <input
              type="text"
              name="pneus"
              maxLength={5}
              value={form.pneus}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Freios:</label>
            <input
              type="text"
              name="freios"
              maxLength={5}
              value={form.freios}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Luzes:</label>
            <input
              type="text"
              name="luzes"
              maxLength={5}
              value={form.luzes}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Nível de Óleo:</label>
            <input
              type="text"
              name="nivelOleo"
              maxLength={5}
              value={form.nivelOleo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Data do Checklist:</label>
            <input
              type="date"
              name="dtchecklist"
              value={form.dtchecklist}
              onChange={handleChange}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn primary">Inserir Checklist</button>
            <button
              type="button"
              className="btn secondary"
              onClick={() =>
                navigate('/terceira', {
                  state: {
                    id: userId,
                    usuario,
                  },
                })
              }
            >
              Ver Checklists Pendentes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

