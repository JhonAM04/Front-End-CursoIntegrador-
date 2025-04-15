
import { toast } from "sonner"
import { profile } from "../../declarations/ApiDeclarations"
import emailjs from '@emailjs/browser'

const useApi = () =>{

    const apiLogin = async (login:string, password:string) => {
      
        const bd = await fetch('http://localhost:8080/Login', {
            method: 'POST',
            headers:{'Content-type': 'application/json'} ,
            body: JSON.stringify({
              login: login,
              password: password
            })
          })
    
          const response = await bd.json()
          
          return response
    }
    

    const getProfileandAccount = async(id: number)=>{

      const bd = await fetch('http://localhost:8080/perfil/', {
        headers: {
          'Authorization': `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnYW1lcmpob25jZW5hMTY3QGdtYWlsLmNvbSIsImV4cCI6MTc0NDY5MDYzMCwiaWF0IjoxNzQ0Njg3MDMwfQ.W5MAXZMOTr-vPJRUsHI8WusDO1fDpnqs_6jjoxy_CLA"}`}
      })
      const data = await bd.json()
      
      const profile = data.find((profile: profile)=> profile.usuario.id == id)
      
      return profile
      
    }

    const getEmail = async(emailForm: string, formulario: HTMLFormElement)=>{

      const bd = await fetch('http://localhost:8080/perfil/', {
        headers: {
          'Authorization': `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnYW1lcmpob25jZW5hMTY3QGdtYWlsLmNvbSIsImV4cCI6MTc0NDY5MDYzMCwiaWF0IjoxNzQ0Njg3MDMwfQ.W5MAXZMOTr-vPJRUsHI8WusDO1fDpnqs_6jjoxy_CLA"}`}
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

    return{
        apiLogin, getProfileandAccount, getEmail
    }
}

export default useApi