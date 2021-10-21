import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { AuthContext } from '../contexts/auth'

const Login = () => {

    const { login, loadingAuth, isLogged } = useContext(AuthContext);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            setLoading(false)
        }
    }, [])

    // Pegando os valores dos states com essa function e jogando na function login que está no authContext
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username !== '' && password !== '') {
            login(username, password)
        }
    }

    return (
        <>
            {loading ? 
            <Loading />
                :
                <>
                    <div className="container">
                        <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
                            <div className="col-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="justify-content-center d-flex mb-3">
                                            <img src="https://www.ewally.com.br/wp-content/uploads/2020/06/logotipo-1.svg" alt="Logotipo" />
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group mb-4">
                                                <input type="text" className="form-control" placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} />
                                            </div>
                                            <div className="form-group mb-4">
                                                <input type="password" className="form-control" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                                            </div>
                                            <div className="d-grid gap-2">
                                                <button type="submit" className="btn btn-primary" style={{
                                                    backgroundColor: "#00B4BC",
                                                    border: "none"
                                                }}>Entrar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Login