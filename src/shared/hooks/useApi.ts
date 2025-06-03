
import { toast } from "sonner"
import { profile } from "../../declarations/ApiDeclarations"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../router/Routes"

const useApi = () =>{

  const Navigate = useNavigate()

    const apiLogin = async (login:string, password:string) => {

        const bd = await fetch('http://localhost:8080/Login', {
            method: 'POST',
            headers:{'Content-type': 'application/json'} ,
            body: JSON.stringify({
              login: login,
              password: password
            })
          })
    
          const response = await bd.json().then((response)=>{
            if(response.message == 'Unknown user'){
              toast.error('Credenciales incorrectas')
            }if(response.message == 'Invalid password'){
              toast.error('Contraseña incorrecta')
            }else{
              toast.success('Iniciaste sesion con exito')
              localStorage.setItem('session', JSON.stringify(response))
              Navigate(Paths.Home)
            }
          })

          
          
          return response
    }
    

    const getProfileandAccount = async(id: number, token: string)=>{

      const bd = await fetch('http://localhost:8080/perfil/', {
        headers: {
          'Authorization': `Bearer ${token}`}
      })
      const data = await bd.json()
      
      const profile = data.find((profile: profile)=> profile.idPerfil == id)
      
      return profile
      
    }

    const getAllProfiles = async(token: string) => {
      const bd = await fetch('http://localhost:8080/perfil/', {
        headers: {
          'Authorization': `Bearer ${token}`}
      })
      const data = await bd.json()
      
      return data
    }

    const getAccounts = async(token: string) => {
      const bd = await fetch('http://localhost:8080/users', {
        headers: {
          'Authorization': `Bearer ${token}`}
      })
      const data = await bd.json()
      
      return data
    }

    const getEmail = async(emailForm: string)=>{

      const bd = await fetch('http://localhost:8080/perfil/correo')
      const data = await bd.json()
      
      const email = data.find((profile: profile) => profile.usuario.login == emailForm)
      const correo:profile =email


      if (correo) {
        try {

          console.log(correo.usuario.login)
          await fetch(`http://localhost:8080/api/password/request?email=${correo.usuario.login}`, {
            method: 'POST',
        headers:{'Content-type': 'application/json'} ,
        body: JSON.stringify({
          id: correo.usuario.id,
          

        })
          }).then(()=>{
            toast.success('Funciono el metodo')
          }).catch(()=>{toast.error("Fallo el metodo")})
          

          
        } catch (error) {
          toast.error('Hubo un error al enviar el correo');
          console.log(error);
        }
      } else {
        toast.error('Este correo electrÃ³nico no existe');
      }
      
      return email
      
    }

    const crearPerfil = async(token: string, nombre: string, apellido: string, dni: number, sexo: string, fechanac: Date, idCuenta: number, idRol: number) => {
      const bd = await fetch('http://localhost:8080/perfil/nuevo', {
        method: 'POST',
        headers:{'Content-type': 'application/json',
                  'Authorization': `Bearer ${token}`
        } ,
        body: JSON.stringify({
          nombre: nombre ,
          apellido: apellido ,
          dni: dni ,
          sexo: sexo ,
          fechanac: fechanac ,
          usuario: {
            id: idCuenta ,
          },
          rol: {
            idRol: idRol ,
          }
        })
      })

      const response = await bd.json().then(()=>{
        toast.success('Perfil creado con exito')
      }).catch(()=>{
        toast.error('Error al crear el perfil')
      })
      return response
    }

    const editarProfile = async(id: number, token: string , nombre: string, apellido: string, dni: number, sexo: string, fechanac: Date, idCuenta?: number, idRol?: number) => {
      const bd = await fetch(`http://localhost:8080/perfil/${id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          dni: dni,
          sexo: sexo,
          fechanac: fechanac,
          usuario: {
            id: idCuenta ,
          },
          rol: {
            idRol: idRol ,
          }
        })
      })
      const data = await bd.json()
      console.log(data)
      return data
    }

    const deleteProfile = async(id: number, token: string) => {
      await fetch(`http://localhost:8080/perfil/${id}`, {
        method:'DELETE',
        headers: {'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(()=>{
        toast.success('Perfil eliminado correctamente')
      }).catch(()=>{
        toast.error('Error al eliminar perfil')
      })
      
    }

    const crearCuenta = async(cuenta: string, password: string) =>{
      const bd = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers:{'Content-type': 'application/json'} ,
        body: JSON.stringify({
          login: cuenta,
          password: password
        })
      })
      const response = await bd.json().then(()=>{
        toast.success('Cuenta creada con exito')
      }).catch(()=>{
        toast.error('Error al crear la cuenta')
      })
      return response
    }

    const updatePassword = async(token:string,password:string) =>{
      const bd = await fetch(`http://localhost:8080/api/password/reset?token=${token}`, {
        method: 'POST',
        headers:{'Content-type': 'application/json'} ,
        body: JSON.stringify({
          newpassword: password,

        })
      })
      const response = await bd.json().then((respuesta)=>{
        toast.success('Contraseña restablecida con exito')
        console.log(respuesta)
      }).catch((respuesta)=>{
        toast.error('Hubo un error al restablecer contraseña ')
        console.log(respuesta)
      })
      return response
    }

    const getProfilesWhitoutAccount = async(token: string) => {
        const bd = await fetch('http://localhost:8080/usersperfil',{
          method: 'GET',
          headers:{'Authorization': `Bearer ${token}`}
        })
        const response = await bd.json()

        return response
    }

    const getActivities = async(token: string) => {
      const bd = await fetch('http://localhost:8080/actividad/',{
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
      })

      const response = await bd.json()
      return response
    }

    const getModules = async(token: string) => {
      const bd = await fetch('http://localhost:8080/modulo/',{
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
      })

      const response = await bd.json()
      return response
    }

    const getLessons = async(token: string) => {
      const bd = await fetch('http://localhost:8080/leccion/',{
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
      })

      const response = await bd.json()
      return response
    }



    return{
        apiLogin, getProfileandAccount, getEmail, editarProfile, crearCuenta, crearPerfil, getAllProfiles, getAccounts, deleteProfile, updatePassword, getProfilesWhitoutAccount, getActivities, getModules, getLessons
    }
}

export default useApi