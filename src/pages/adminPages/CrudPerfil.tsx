import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, useDisclosure, Button } from "@chakra-ui/react"
import ModalCrud from "../../shared/components/ModalCrud"
import useApi from "../../shared/hooks/useApi"
import { useEffect, useState } from "react"
import { profile, sessionvar } from "../../declarations/ApiDeclarations"
import { Link } from "react-router-dom"


const CrudPerfil = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [session, setSession] = useState<sessionvar>()
    const [perfiles, setPerfiles] = useState<Array<profile>>()
    const {crearPerfil, getAllProfiles} = useApi()
  
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
      }
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
        {name:'cuentaId', label:'Id de la cuenta', type:'number'},
        {name:'rolId', label:'Id del rol que tendra la cuenta', type:'select', options:[
          {value: 1 , label:'Docente'},
          {value: 2 , label:'Estudiante'},
          {value: 3 , label:'Administrador'}
        ]}
        ]}
        onSubmit={newPerfil}
       />
        <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>ID Perfil</Th>
            <Th>Nombre</Th>
            <Th>Apellido</Th>
            <Th>DNI</Th>
            <Th>Sexo</Th>
            <Th>Fecha de nacimiento</Th>
            <Th>ID de la cuenta</Th>
            <Th>ID del rol</Th>
            <Th>Editar</Th>
            <Th>Eliminar</Th>
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
                  <Td ><Button as={Link} to={`perfil/${perfil.idPerfil}`}>Editar</Button></Td>
                  <Td >Eliminar</Td>
                </Tr>
              ))
            }
        </Tbody>
      </Table>
    </TableContainer>
  </>
  )
}

export default CrudPerfil