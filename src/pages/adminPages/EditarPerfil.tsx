import { VStack, Box, FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react"
import useApi from "../../shared/hooks/useApi"
import { profile, sessionvar } from "../../declarations/ApiDeclarations"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Paths } from "../../router/Routes"

const EditarPerfil = () => {

    const {getProfileandAccount, editarProfile} = useApi()
    const { id } = useParams()
    const [perfil, setPerfil] = useState<profile>()
    const [session, setSession] = useState<sessionvar>()
    const [sex, setSex] = useState<'masculino'| 'femenino'>("masculino")
    const [rol, setRol]= useState<number>()
    const navigate = useNavigate()

    const loadPerfil = async() =>{
          if(localStorage.getItem('session')){
            const sessionAPI: sessionvar = (JSON.parse(localStorage.getItem('session')!))
            const response = await getProfileandAccount(Number(id), sessionAPI.token)
            setPerfil(response)
            setSex((response as profile).sexo)
            setRol((response as profile).rol.idRol)
          }
        }

        const edit = async(e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
        
            const formulario = e.currentTarget
        
            if(formulario){
              const data = new FormData(formulario)
              const {nombre, apellido, dni, sexo, fechanac, idCuenta, rolId} = Object.fromEntries(data.entries()) as {
                [k: string]: string
              }
              const fechaNacimiento = new Date(fechanac)
              const DNI = Number(dni)
              const idCuentaNumber = Number(idCuenta)
              const rolIdNumber = Number(rolId)
              await editarProfile(Number(id), session!.token , nombre, apellido, DNI, sexo, fechaNacimiento, idCuentaNumber, rolIdNumber).then(async()=>{
                await loadPerfil()
                toast.success('Datos actualizados correctamente')
                navigate(Paths.CrudPerfil)
              }).catch(()=>{
                toast.error('Hubo un error')
              })
              }
          }

    useEffect(()=>{
        setSession(JSON.parse(localStorage.getItem('session')!))
        loadPerfil()
    },[])
  return (
    <VStack justifyContent='center' alignItems='center' w='100%' h='100vh' >
              <Box as='form' onSubmit={edit}>
                  <FormControl>
                    <FormLabel>ID</FormLabel>
                    <Input type="number" name="idPerfil" defaultValue={perfil?.idPerfil} readOnly />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input type="text" name="nombre" defaultValue={perfil?.nombre} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Apellido</FormLabel>
                    <Input type="text" name="apellido" defaultValue={perfil?.apellido} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>DNI:</FormLabel>
                    <Input type="number" name="dni" defaultValue={perfil?.dni} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Sexo</FormLabel>
                    <Select name="sexo" placeholder="Seleccion sexo" value={sex} onChange={(e)=>setSex(e.target.value as "masculino"|"femenino")}>
                      <option value='masculino'>Masculino</option>
                      <option value='femenino'>Femenino</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <Input type="date" name="fechanac" defaultValue={perfil?.fechanac.toString()} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>ID de la Cuenta</FormLabel>
                    <Input type="number" name="idCuenta" defaultValue={perfil?.usuario.id} readOnly />
                  </FormControl>
                  <FormControl>
                  <FormLabel>ID del rol que tendra la cuenta</FormLabel>
                    {
                      perfil?.rol?.rol == 'admin' ?
                      <Input name="rolId" type="number" defaultValue={perfil.rol.idRol} readOnly />
                      :
                      <Select name="rolId" placeholder="Seleccione rol" value={rol} onChange={(e) => setRol(Number(e.target.value))}>
                        <option value= {1} >Docente</option>
                        <option value= {2}>Estudiante</option>
                        <option value= {3}>Administrador</option>
                      </Select> 
                    }
                  </FormControl>
                  <Button type="submit">Guardar cambios</Button>
                </Box>
        </VStack>
  )
}

export default EditarPerfil