import { createContext, ReactNode, useEffect, useState } from "react";
import { profile, sessionvar } from "../../declarations/ApiDeclarations";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Paths } from "../../router/Routes";


type UsuarioContexto = {
profile: profile
Login: (login:string, password:string)=> void
getProfile: (id: number, token: string)=>void
}



export const UsuarioContext = createContext<UsuarioContexto | null>(null)

export const UsuarioProvider = ({children}: {children: ReactNode}) => {
    const Navigate = useNavigate()
    const [profile, setProfile] = useState<profile>()


    const getProfile = async(id: number, token: string)=>{

        const bd = await fetch('http://localhost:8080/perfil/', {
          headers: {
            'Authorization': `Bearer ${token}`}
        })
        const data = await bd.json()
        
        const profile = data.find((profile: profile)=> profile.usuario.id == id)

        localStorage.setItem('perfil', JSON.stringify(profile))
        const profileData = JSON.parse(localStorage.getItem('perfil') || '{}')
        setProfile(profileData)
      
        return profile
        
      }

    
      const Login = async (login:string, password:string) => {

        const bd = await fetch('http://localhost:8080/Login', {
            method: 'POST',
            headers:{'Content-type': 'application/json'} ,
            body: JSON.stringify({
              login: login,
              password: password
            })
          })
    
          const response = await bd.json().then(async(response)=>{
            if(response.message == 'Unknown user'){
              toast.error('Credenciales incorrectas')
              return
            }if(response.message == 'Invalid password'){
              toast.error('Contraseña incorrecta')
              return
            }else{
                localStorage.setItem('session', JSON.stringify(response))
                toast.success('Iniciaste sesion con exito')
                await loadData()
                Navigate(Paths.Home)
            }
          })
          return response
    }

    const loadData = async() => {
        
      if(localStorage.getItem('session')){
        const account: sessionvar = JSON.parse(localStorage.getItem('session')!)
          if(localStorage.getItem('perfil')){
            setProfile(JSON.parse(localStorage.getItem('perfil')!))
            console.log('error1')
          }else{
            await getProfile(account.id, account.token)
            console.log('error2')
          }
        }
  }
  
    useEffect(()=>{
      loadData()
    },[])


    return(
        <UsuarioContext.Provider value={{Login, profile, getProfile}}>
            {children}
        </UsuarioContext.Provider>
    )

}