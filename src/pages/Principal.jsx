import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';



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
    statuschecklist: '',
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
      autenticacao: { id: userId }, // adiciona o ID do usuário logado
    };

    try {
      const response = await fetch('http://10.1.1.116:8081/api/checklist', {
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
        statuschecklist: '',
        dtchecklist: '',
        relato: '',
      });
    } catch (error) {
      alert('Erro na requisição: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h2>Bem-vindo, {usuario}!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pneus:</label>
          <input
            type="text"
            name="pneus"
            maxLength={5}
            value={form.pneus}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Freios:</label>
          <input
            type="text"
            name="freios"
            maxLength={5}
            value={form.freios}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Luzes:</label>
          <input
            type="text"
            name="luzes"
            maxLength={5}
            value={form.luzes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nível de Óleo:</label>
          <input
            type="text"
            name="nivelOleo"
            maxLength={5}
            value={form.nivelOleo}
            onChange={handleChange}
          />
        </div>
        {/* <div>
          <label>Status Checklist:</label>
          <input
            type="text"
            name="statuschecklist"
            maxLength={5}
            value={form.statuschecklist}
            onChange={handleChange}
          />
        </div> */}
        <div>
          <label>Data do Checklist:</label>
          <input
            type="date"
            name="dtchecklist"
            value={form.dtchecklist}
            onChange={handleChange}
          />
        </div>
        {/* <div>
          <label>Relato:</label>
          <textarea
            name="relato"
            value={form.relato}
            onChange={handleChange}
            rows="3"
          />
        </div> */}
        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Inserir Checklist</button>
        </div>

        <button
            type="button"
            onClick={() =>
                navigate('/terceira', {
                state: {
                    id: location.state?.id, // ou o ID real do usuário
                    usuario: location.state?.usuario,
                },
                })
            }
            >
            Ver Checklists Pendentes
            </button>


      </form>
    </div>
  );
}
