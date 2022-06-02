// Chakra imports
import {
  Button,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  HStack,
  Box,
  useColorModeValue,
  Avatar,
  Badge,
  Flex,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogOverlay,AlertDialogContent,AlertDialogHeader,AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  useRef,
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
  Textarea,
} from "@chakra-ui/react";

import {useDispatch, useSelector} from 'react-redux'
import React, { useState, useEffect } from "react";
import PerfilDataService from "service/perfilService";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { listCargos, updateCargo } from "actions/cargos";

const CargoEditarModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [openedit, setOpenEdit] = React.useState(false);
  const [openupdate, setOpenUpdate] = React.useState(false);

  const [indice, setIndice] = useState({
    idCargo: null,
    cargo: "",
    activo: "",
  });

  const cancelRef = React.useRef()


const cargo = useSelector(store => store.cargos);
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCargos());
  },[dispatch]);

  const handleClickOpen = (index) => {
    setIndice(index);
    setOpen(true);
  };

  const handleClickOpenEdit = (index) => {
    setIndice(index);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const actualizarCargo = (e) => {
     e.preventDefault()
      dispatch(updateCargo(indice))
      .then(() =>{
        dispatch(listCargos());
        handleCloseEdit(true)
    })
      .catch(a => {
        console.log(a);
      });
      setOpenEdit(false);
  };

  return (
    <>
      <Modal
        isOpen={openedit}
        onClose={handleCloseEdit}
      >
          <ModalOverlay />
            <ModalContent>
              <ModalHeader display={'flex'} justifyContent={'center'}>Editar Cargo</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
              <FormControl>
                  <FormLabel>Cargo</FormLabel>
                  <Input
                    value={indice ? (indice.idCargo) : ("")}
                    disabled={true}
                    type="text"
                    //defaultValue={indice ? (indice.nombre):("")}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Cargo</FormLabel>
                  <Input
                    autoFocus
                    defaultValue={indice ? (indice.cargo) : ("")}
                    type="text"
                    //defaultValue={item ? (item.perfil):("")}
                    //defaultValue={indice ? (indice.nombre):("")}
                    onChange={(e)=>setIndice({...indice,cargo:e.target.value})}
                  />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Descripcion</FormLabel>
                    <Textarea
                        autoFocus
                        defaultValue={indice ? (indice.activo):("")}
                        // defaultValue={item ? (item.descripcion):("")}
                        onChange={(e)=>setIndice({...indice,activo:e.target.value})}
                        placeholder='Descripcion'
                        type="text"
                    />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button onClick={(e)=>actualizarCargo(e)} colorScheme='blue' mr={3}>
                  Actualizar
                </Button>
                <Button ref={cancelRef} onClick={handleCloseEdit}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
      </Modal>
    </>
  )
}

export default CargoEditarModal;
