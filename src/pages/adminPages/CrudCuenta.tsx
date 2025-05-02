import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, useDisclosure } from "@chakra-ui/react"
import ModalCrud from "../../shared/components/ModalCrud"
import useApi from "../../shared/hooks/useApi"

const CrudCuenta = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {crearCuenta} = useApi()

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
  return (
    <>
      <ModalCrud isOpen={isOpen} onOpen={onOpen} onClose={onClose} title="cuenta" inputs={[
        { name: 'cuenta', label:'cuenta', type:'email'},
        { name: 'contraseña', label:'contraseña', type:'password'}
        ]}
        onSubmit={newAccount}
       />
        <TableContainer>
      <Table variant='simple'>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  </>
  )
}

export default CrudCuenta