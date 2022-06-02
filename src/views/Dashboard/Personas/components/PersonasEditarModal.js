// Chakra imports
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useDisclosure } from '@chakra-ui/react'

function PersonasEditarModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  return (
    <>
      <Button size={'sm'} onClick={onOpen}>EDITAR</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} justifyContent={'center'}>Editar Persona</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombres</FormLabel>
              <Input ref={initialRef} placeholder='Nombres' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Apellidos</FormLabel>
              <Input placeholder='Apellidos' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>DNI</FormLabel>
              <Input placeholder='DNI' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Fecha de Nacimiento</FormLabel>
              <Input type={'date'} placeholder='Fecha de Nacimiento' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Estado</FormLabel>
              <Input placeholder='A o I' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Perfil</FormLabel>
              <Input placeholder='perfil' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Actualizar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PersonasEditarModal;
