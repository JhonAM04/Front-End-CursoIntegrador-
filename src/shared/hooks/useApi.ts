
import { toast } from "sonner"
import { profile } from "../../declarations/ApiDeclarations"
import emailjs from '@emailjs/browser'
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
      
      const profile = data.find((profile: profile)=> profile.usuario.id == id)
      
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

    const getEmail = async(emailForm: string, formulario: HTMLFormElement)=>{

      const bd = await fetch('http://localhost:8080/perfil/', {
        headers: {
          'Authorization': `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnYW1lcmpob25jZW5hMTY3QGdtYWlsLmNvbSIsImV4cCI6MTc0NDY5ODIxOCwiaWF0IjoxNzQ0Njk0NjE4fQ.knQjBHWhaHOKinT0eC7wRX6LcM7-6yeLQnHll6J3sUg"}`}
      })
      const data = await bd.json()
      
      const email = data.find((profile: profile) => profile.usuario.login == emailForm)

      if (email) {
        try {
          await emailjs.sendForm('service_p0q1ki3', 'template_eprvbdn', formulario, {
            publicKey: 'Pxpx4XuTKkaND45n1'
          });
          toast.success('Se envió el correo de recuperación exitosamente');
        } catch (error) {
          toast.error('Hubo un error al enviar el correo');
          console.log(error);
        }
      } else {
        toast.error('Este correo electrónico no existe');
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

    return{
        apiLogin, getProfileandAccount, getEmail, editarProfile, crearCuenta, crearPerfil, getAllProfiles
    }
}

export default useApi