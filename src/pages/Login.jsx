import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login({ setAuth }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario: user, password: pass })
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('Usuário ou senha inválidos');
        } else {
          alert('Erro na comunicação com o servidor');
        }
        return;
      }

      const data = await response.json();
      console.log(data);

      setAuth(true);
      navigate('/principal', { state: { usuario: data.usuario, id: data.id } });

    } catch (error) {
      alert('Erro na requisição: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Entre</h2>
        <input
          className="login-input"
          type="text"
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Senha"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}
