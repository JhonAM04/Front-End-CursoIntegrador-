import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Select } from "@chakra-ui/react"
import React from "react"

type InputField = {
    name: string
    label: string
    type?: string
    placeholder?: string
    options?: { value: string | number; label: string }[]
  }
  
  type ModalCrudProps = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    title: string
    inputs: InputField[]
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  }
  
  const ModalCrud = ({ isOpen, onOpen, onClose, title, inputs, onSubmit }: ModalCrudProps) => {
    const initialRef = React.useRef(null)
  
    return (
      <>
        <Button onClick={onOpen}>Crear {title}</Button>
  
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
            <ModalContent>
                    <form
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault()
                        onSubmit(e)
                        onClose()
                        }}
                    >
                        <ModalHeader>Creando {title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                        {inputs.map((input, index) => (
                            <FormControl mt={index !== 0 ? 4 : 0} key={input.name} isRequired>
                              <FormLabel htmlFor={input.name}>{input.label}</FormLabel>

                              {input.type === 'select' && input.options ? (
                                <Select
                                  id={input.name}
                                  name={input.name}
                                  placeholder={input.placeholder || `Selecciona ${input.label.toLowerCase()}`}
                                  ref={index === 0 ? initialRef : undefined}
                                >
                                  {input.options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  ))}
                                </Select>
                              ) : (
                                <Input
                                  ref={index === 0 ? initialRef : undefined}
                                  id={input.name}
                                  name={input.name}
                                  type={input.type || 'text'}
                                  placeholder={input.placeholder || input.label}
                                  required
                                />
                              )}
                            </FormControl>
                          ))}
                        </ModalBody>

                        <ModalFooter>
                        <Button colorScheme="blue" mr={3} type="submit">
                            Crear
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
        </Modal>
      </>
    )
  }

export default ModalCrud

