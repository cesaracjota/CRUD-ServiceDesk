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
  Textarea,
} from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react';

import {useDispatch, useSelector} from 'react-redux'
import React, { useState, useEffect } from "react";
import PerfilDataService from "service/perfilService";
import { listPerfil, updatePerfil } from "actions/perfiles";

const PerfilEditarModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [openedit, setOpenEdit] = React.useState(false);
  const [openupdate, setOpenUpdate] = React.useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [indice, setIndice] = useState({
    idPerfilPersona: null,
    perfil: "",
    descripcion: "",
});
const perfil = useSelector(store => store.perfiles);
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listPerfil());
  },[dispatch]);

  const handleClickOpen = (index) => {
    setIndice(index);
    setOpen(true);
  };
  const handleClickOpenUpdate = (e) => {
    
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenEdit = () => {
    setIndice();
    setOpenEdit(true);
    
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const updatePerfiles = (e) => {
    e.preventDefault();
    dispatch(updatePerfil(indice.idPerfilPersona,indice))
    .then(() =>{
      dispatch(listPerfil());
    })
    .catch(a => {
      console.log(a);
    });
    setOpenUpdate(false)
    setOpenEdit(false);
  };

  return (
    <>
      <Button  onClick={()=>handleClickOpenEdit()}>Editar Perfil</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Perfil</ModalHeader>
          <ModalCloseButton />
          <form noValidate autoComplete="off">
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Perfil</FormLabel>
              <Input 
              onChange={(e)=> {setPerfil({ ...userperfil, perfil: (e.target.value).toUpperCase() }); setValidation(false)}} 
              placeholder='Perfil'
              type={'text'} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Descripcion</FormLabel>
              <Textarea
                onChange={(e)=> {setPerfil({ ...userperfil, descripcion: (e.target.value) })}} 
                placeholder='Descripcion'
              />
            </FormControl>
          </ModalBody>
          </form>
          <ModalFooter>
            <Button onClick={()=>savePerfil()} colorScheme={'blue'} autoFocus mr={3}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PerfilEditarModal;
