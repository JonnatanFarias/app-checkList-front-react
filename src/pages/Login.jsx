import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setAuth }) {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const url = `http://10.1.1.116:8081/api/login/usuario?usuario=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;
            const response = await fetch(url);

            if (!response.ok) {
                alert('Erro na comunicação com o servidor');
                return;
            }

            const data = await response.json();
            console.log(data);

            if (data && data.usuario === user && data.password === pass) {
                setAuth(true);
                navigate('/principal', { state: { usuario: data.usuario, id: data.id } });
            } else {
                alert('Usuário ou senha inválidos');
            }
        } catch (error) {
            alert('Erro na requisição: ' + error.message);
        }
    };
    return (
        <div style={{ padding: '2rem' }}>
            <h2>Entre</h2>
            <input
                type="text"
                placeholder="Usuário"
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Senha"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
            />
            <br />
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
}
