import { Box, Button, Divider, FormControl, FormLabel, Heading, HStack, Input, Select, VStack } from "@chakra-ui/react"
import { sessionvar, profile } from "../declarations/ApiDeclarations"
import { useEffect, useState } from "react"
import useApi from "../shared/hooks/useApi"
import { toast } from "sonner"

const ProfileData = () => {
  const apiAccount = localStorage.getItem('session')
  const [sex, setSex] = useState<'masculino'| 'femenino'>("masculino")
  if (!apiAccount) return

  const session: sessionvar = JSON.parse(apiAccount)

  const [profile, setProfile] = useState<profile>()
  
  

  const { getProfileandAccount, editarProfile  } = useApi()

  const Profile = async() => {
    const perfil = await getProfileandAccount(session.id, session.token) 
    setProfile(perfil)
    setSex((perfil as profile).sexo)
  }

  const edit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formulario = e.currentTarget

    if(formulario){
      const data = new FormData(formulario)
      const {nombre, apellido, dni, sexo, fechanac} = Object.fromEntries(data.entries()) as {
        [k: string]: string
      }
      const fechaNacimiento = new Date(fechanac)
      const DNI = Number(dni)
      await editarProfile(session.id, session.token , nombre, apellido, DNI, sexo, fechaNacimiento).then(()=>{
        toast.success('Datos actualizados correctamente')
      }).catch(()=>{
        toast.error('Hubo un error')
      })
      }
  }

  useEffect(()=>{
      Profile()
    },[])

  return (
    <VStack justifyContent='center' alignItems='center' w='100%' h='100vh' mt='100px'>
      <HStack gap='2em' h='fit-content'>
        <Box h='100%' display='flex' gap='1em'>
          <Heading>PERFIL</Heading>
          <Divider orientation='vertical'/>
        </Box>
        <VStack>
          <Box as='form' onSubmit={edit}>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input type="text" name="nombre" defaultValue={profile?.nombre} />
              </FormControl>
              <FormControl>
                <FormLabel>Apellido</FormLabel>
                <Input type="text" name="apellido" defaultValue={profile?.apellido} />
              </FormControl>
              <FormControl>
                <FormLabel>DNI:</FormLabel>
                <Input type="number" name="dni" defaultValue={profile?.dni} variant='filled' readOnly />
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
                <Input type="date" name="fechanac" defaultValue={profile?.fechanac} />
              </FormControl>
              <Button type="submit">Guardar cambios</Button>
            </Box>
        </VStack>
      </HStack>
    </VStack>
  )
  }

export default ProfileData