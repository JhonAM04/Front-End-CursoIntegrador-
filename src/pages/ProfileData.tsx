import { Box, Button, Divider, FormControl, FormLabel, Heading, HStack, Input, Select, VStack } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import useApi from "../shared/hooks/useApi"
import { toast } from "sonner"
import { UsuarioContext } from "../shared/contexts/UsuarioContext"
import { sessionvar } from "../declarations/ApiDeclarations"

const ProfileData = () => {

  const usuario = useContext(UsuarioContext)
  
  const [sex, setSex] = useState<'masculino'| 'femenino'>("masculino")
  const [session, setSession] = useState<sessionvar>()

  const { editarProfile  } = useApi()


  const edit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formulario = e.currentTarget

    if(formulario){
      const data = new FormData(formulario)
      const {nombre, apellido, dni, sexo, fechanac, idCuenta, idRol } = Object.fromEntries(data.entries()) as {
        [k: string]: string
      }
      const fechaNacimiento = new Date(fechanac)
      const DNI = Number(dni)
      const idCuentaNumber = Number(idCuenta)
      const idRolNumber = Number(idRol)
      await editarProfile(usuario?.profile?.idPerfil!, session!.token , nombre, apellido, DNI, sexo, fechaNacimiento, idCuentaNumber, idRolNumber).then(async()=>{
        await usuario?.getProfile(session!.id, session!.token)
        toast.success('Datos actualizados correctamente')
      }).catch(()=>{
        toast.error('Hubo un error')
      })
      }
  }

  useEffect(()=>{
    if(usuario?.profile){
      setSex(usuario.profile.sexo)
    }
  
    setSession(JSON.parse(localStorage.getItem('session')!))
  },[])

  return (
    <VStack justifyContent='center' alignItems='center' w='100%' h='100vh' >
      <HStack gap='2em' h='fit-content'>
        <Box h='100%' display='flex' gap='1em'>
          <Heading>PERFIL</Heading>
          <Divider orientation='vertical'/>
        </Box>
        <VStack>
          <Box as='form' onSubmit={edit}>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input type="text" name="nombre" defaultValue={usuario?.profile?.nombre} />
              </FormControl>
              <FormControl>
                <FormLabel>Apellido</FormLabel>
                <Input type="text" name="apellido" defaultValue={usuario?.profile?.apellido} />
              </FormControl>
              <FormControl>
                <FormLabel>DNI:</FormLabel>
                <Input type="number" name="dni" defaultValue={usuario?.profile?.dni} variant='filled' readOnly />
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
                <Input type="date" name="fechanac" defaultValue={usuario?.profile?.fechanac} />
              </FormControl>
              <FormControl hidden>
                    <FormLabel>ID de la Cuenta</FormLabel>
                    <Input type="number" name="idCuenta" defaultValue={usuario?.profile?.usuario?.id} readOnly />
              </FormControl>
              <FormControl hidden>
                <FormLabel>Id del Rol</FormLabel>
                <Input type="number" name="idRol" defaultValue={usuario?.profile?.rol.idRol} readOnly />
              </FormControl>
              <Button type="submit" colorScheme="teal">Guardar cambios</Button>
            </Box>
        </VStack>
      </HStack>
    </VStack>
  )
  }

export default ProfileData