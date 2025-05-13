import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, useDisclosure, Box } from "@chakra-ui/react"
import ModalCrud from "../../shared/components/ModalCrud"
import useApi from "../../shared/hooks/useApi"
import { useEffect, useState } from "react"
import { account, sessionvar } from "../../declarations/ApiDeclarations"

const CrudCuenta = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {crearCuenta, getAccounts} = useApi()
  const [cuentas, setCuentas] = useState<Array<account>>()

  const newAccount = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formulario = e.currentTarget

    if(formulario){

      const data = new FormData(formulario)
      const {cuenta, contraseña} = Object.fromEntries(data.entries()) as {
        [k: string]: string
      }
  
      await crearCuenta(cuenta, contraseña)

    }
  }

  const loadData = async() => {
    if(localStorage.getItem('session')){
            const sessionAPI: sessionvar = (JSON.parse(localStorage.getItem('session')!))
            const response = await getAccounts(sessionAPI.token)
            setCuentas(response)
            console.log(response)
          }
  }

  useEffect(()=>{
    loadData()
  },[])
  return (
    <>
      <ModalCrud isOpen={isOpen} onOpen={onOpen} onClose={onClose} title="cuenta" inputs={[
        { name: 'cuenta', label:'cuenta', type:'email'},
        { name: 'contraseña', label:'contraseña', type:'password'}
        ]}
        onSubmit={newAccount} 
       />
       <Box bgColor='white' p='2em' borderRadius='10px' mt='10px'>
        <TableContainer>
            <Table variant='simple'>
              <Thead bgColor='blackAlpha.800'>
                <Tr>
                  <Th color='white'>ID</Th>
                  <Th color='white'>Cuenta</Th>
                  <Th color='white'>Contraseña</Th>
                </Tr>
              </Thead>
              <Tbody>

                {
                  cuentas?.map(cuenta => (
                    <Tr key={cuenta.id}>
                      <Td>{cuenta.id}</Td>
                      <Td>{cuenta.login}</Td>
                      <Td>{cuenta.password}</Td>
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

export default CrudCuenta