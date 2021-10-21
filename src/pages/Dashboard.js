import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Loading from "../components/Loading";
import { AuthContext } from "../contexts/auth";

const Dashboard = () => {


    const { logout } = useContext(AuthContext);
    const [balance, setBalance] = useState();
    const [statements, setStatements] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')

        //Dando get nos saldos do account/balance

        const getBalance = async () => {
            await axios.get('https://apidev.ewally.com.br/account/balance', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log('balance ', res)
                    setBalance(res.data)
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })
        }

        /* 
        Tentei de várias formas pegar os dados deste caminho, porém não consegui infelizmente, adoraria se tivesse algum profissional
        para me explicar o porquê e o que fiz de errado, porém deu em nada nos meus testes, essa data de fato existe?
        */

        const getStatements = async () => {
            await axios.get('https://apidev.ewally.com.br/account/statements', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                initialDate: new Date("2019-01-01").toISOString(), finalDate: new Date("2019-01-31").toISOString()
            })
                .then(res => {
                    console.log('statements ', res)
                    setStatements(res)
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })
        }

        getBalance()
        getStatements()

    }, [])

    return (
        <>
            {loading ?
                <Loading />
                :
                <>
                    <div className="container">
                        <div className="justify-content-center d-flex mb-3 mt-5">
                            <img src="https://www.ewally.com.br/wp-content/uploads/2020/06/logotipo-1.svg" alt="Logotipo" /> <br />
                        </div>
                        <div className="justify-content-center d-flex mb-5">
                            <span style={{ fontSize: "26px", fontWeight: 600, color: "#00B4BC" }}>Teste Front-End Ewally</span>
                        </div>
                        <div className="row mb-4">
                            <div className="mb-3">
                                <button className="btn btn-danger float-end" onClick={logout}>Sair</button>
                            </div>
                            <div className="col col-md-3">
                                <div className="card" style={{
                                    backgroundColor: "#00B4BC",
                                    color: "#FFF",
                                    fontWeight: 600,
                                    fontSize: "18px"
                                }}>
                                    <div className="card-body pt-4 pb-4">
                                        Meu saldo: {balance.balance.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card" style={{
                            backgroundColor: "#00B4BC",
                            color: "#FFF",
                            fontWeight: 600,
                            fontSize: "18px"
                        }}>
                            <div className="card-body">
                                Queria fazer uma lista aqui, mas infelizmente o account/statements me retornou nada, então incompleto
                            </div>
                        </div>
                    </div>
                </>

            }
        </>
    )
}

export default Dashboard