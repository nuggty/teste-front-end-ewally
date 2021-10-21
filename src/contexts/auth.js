import { useState, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    // Vendo se eu podia pegar algum dado importante com o token do usuário para poder
    // fazer mais coisas dentro das páginas
    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token) {
            axios.get('https://apidev.ewally.com.br/user/login/key', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((json) => {
                saveUserGet(json)
                console.log(json)
                setLoading(false)
            })
                .catch((err) => {
                    console.log(err)
                    logout()
                })
        }
    }, [isLogged])

    // Salvando os dados do usuário no state user

    const saveUserGet = ({ data }) => {
        setUser(data);
        setIsLogged(true)
    }

    // Salvando os dados do login aqui, para botar como usuário logado

    const saveUserLogged = ({ data }, token = true) => {
        logout();
        if (token) setUser(data)
        setIsLogged(true)
    }

    // Fazendo o login com username e password, salvando o token que acha no post e salvando os dados do usuário na function saveUserLogged

    const login = async (username, password) => {
        setLoadingAuth(true)
        try {
            let data = await axios.post('https://apidev.ewally.com.br/user/login', {
                username,
                password
            })
            toast.success('Bem vindo de volta!')
            saveUserLogged(data)
            localStorage.setItem("token", data.data.token)
        }
        catch (error) {
            console.log(error)
        }
    }

    // Função que talvez eu coloque na dashboard, remove o token e botando o usuário como null, se for null, retorna pra page login

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }


    return (

        < AuthContext.Provider
            value={{
                signed: !!user,
                login,
                isLogged,
                user,
                logout,
                loadingAuth
            }}
        >
            {children}
        </AuthContext.Provider >
    )
}
export default AuthProvider