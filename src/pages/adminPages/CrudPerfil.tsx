import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, useDisclosure, Button, Box } from "@chakra-ui/react"
import ModalCrud from "../../shared/components/ModalCrud"
import useApi from "../../shared/hooks/useApi"
import { useEffect, useState } from "react"
import { profile, sessionvar } from "../../declarations/ApiDeclarations"
import { Link } from "react-router-dom"


const CrudPerfil = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [session, setSession] = useState<sessionvar>()
    const [perfiles, setPerfiles] = useState<Array<profile>>()
    const [cuentasSP, setCuentasSP] = useState<{ value: number; label: string }[]>([])
    const {crearPerfil, getAllProfiles, deleteProfile, getProfilesWhitoutAccount} = useApi()
  
    const newPerfil = async(e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
  
      const formulario = e.currentTarget
  
      if(formulario){
  
        const data = new FormData(formulario)
        const {nombre, apellido, dni, sexo, fechanac, cuentaId, rolId} = Object.fromEntries(data.entries()) as {
          [k: string]: string
        }

        const dniNumber = Number(dni)
        const cuentaIDNumber = Number(cuentaId)
        const rolIdNumber = Number(rolId)
        const fechanacDate = new Date(fechanac)
    
        await crearPerfil(session!.token, nombre, apellido, dniNumber, sexo, fechanacDate, cuentaIDNumber, rolIdNumber)
        await loadPerfiles()
      }
    }

    const loadPerfiles = async() =>{
      if(localStorage.getItem('session')){
        const sessionAPI: sessionvar = (JSON.parse(localStorage.getItem('session')!))
        const response = await getAllProfiles(sessionAPI.token)
        setPerfiles(response)
        console.log(response)
        const response2: Array<sessionvar> = await getProfilesWhitoutAccount(sessionAPI.token)
        setCuentasSP(
          response2.map(c => ({
            value: c.id,
            label: `${c.id} - ${c.login}`
          }))
        )
        console.log(response2)
      }
    }

    const eliminarPerfil = async(id: number, token: string) => {
      await deleteProfile(id, token)
      loadPerfiles()
    }

    useEffect(()=>{
      setSession(JSON.parse(localStorage.getItem('session')!))
      loadPerfiles()
    },[])
  return (
    <>
      <ModalCrud isOpen={isOpen} onOpen={onOpen} onClose={onClose} title="Perfil" inputs={[
        {name:'nombre', label:'Nombre'},
        {name:'apellido', label:'Apellido'},
        {name:'dni', label:'DNI', type:'number'},
        {name:'sexo', label:'Sexo', type:'select', options:[
          {value: 'masculino', label:'masculino'},
          {value: 'femenino', label:'femenino'}
        ]},
        {name:'fechanac', label:'Fecha de nacimiento', type:'Date'},
        {name:'cuentaId', label:'Id de la cuenta', type:'select', options:cuentasSP},
        {name:'rolId', label:'Id del rol que tendra la cuenta', type:'select', options:[
          {value: 1 , label:'Docente'},
          {value: 2 , label:'Estudiante'},
          {value: 3 , label:'Administrador'}
        ]}
        ]}
        onSubmit={newPerfil}
       />
       <Box bgColor='white' p='2em' borderRadius='10px' mt='10px'>
        <TableContainer>
            <Table variant='simple'>
              <Thead bgColor='blackAlpha.800'>
                <Tr>
                  <Th color='white'>ID Perfil</Th>
                  <Th color='white'>Nombre</Th>
                  <Th color='white'>Apellido</Th>
                  <Th color='white'>DNI</Th>
                  <Th color='white'>Sexo</Th>
                  <Th color='white'>Fecha de nacimiento</Th>
                  <Th color='white'>ID de la cuenta</Th>
                  <Th color='white'>ID del rol</Th>
                  <Th color='white'>Editar</Th>
                  <Th color='white'>Eliminar</Th>
                </Tr>
              </Thead>
              <Tbody>
                  {
                    perfiles?.map(perfil => (
                      <Tr key={perfil.idPerfil}>
                        <Td>{perfil.idPerfil}</Td>
                        <Td>{perfil.nombre}</Td>
                        <Td >{perfil.apellido}</Td>
                        <Td >{perfil.dni}</Td>
                        <Td >{perfil.sexo}</Td>
                        <Td >{perfil.fechanac.toString()}</Td>
                        <Td >{perfil.usuario.id}</Td>
                        <Td >{perfil.rol.rol}</Td>
                        <Td ><Button as={Link} to={`perfil/${perfil.idPerfil}`} colorScheme="yellow">Editar</Button></Td>
                        <Td ><Button onClick={()=>{
                          eliminarPerfil(perfil.idPerfil, session?.token!)
                        }} colorScheme="red">Eliminar</Button></Td>
                      </Tr>
                    ))
                  }
              </Tbody>
            </Table>
          </TableContainer>
    </Box>
  </>
  )
}

export default CrudPerfil