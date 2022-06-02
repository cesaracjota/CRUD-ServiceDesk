// Chakra imports
import {
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
  Textarea,
  Select,
} from "@chakra-ui/react";

import {useDispatch, useSelector} from 'react-redux'
import React, { useState, useEffect } from "react";
import { createPerfil } from "../../../../actions/perfiles";

const PerfilAgregarModal = (props) => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  }

  const handleCloseModal = () => {
    setOpenCreate(false);
  };

  const initialPerfil = {
    idPerfilPersona: null,
    perfil: "",
    descripcion: "",
    activo: "",
  }

  const [userperfil, setPerfil] = useState(initialPerfil);

  const savePerfil = () => {
    const { perfil, descripcion, activo} = userperfil;
    dispatch(createPerfil(perfil, descripcion, activo))
    .then((data) => {
      setPerfil({
        id: data.idPerfilPersona,
        perfil: data.perfil,
        descripcion: data.descripcion,
        activo: data.activo
      })
     handleCloseModal(true);
    // props.history.push('/perfiles');
    })
    .catch(e => {
      console.log(e);
      handleCloseModal(true);
    });
  }

  return (
    <>
      <Button onClick={handleClickOpenCreate} colorScheme={'blue'}>Agregar</Button>

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nuevo Perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Perfil</FormLabel>
              <Input 
              onChange={(e)=> {setPerfil({ ...userperfil, perfil: (e.target.value).toUpperCase() })}}
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
            <FormControl mt={4}>
              <FormLabel>Estado</FormLabel>
              <Select
                onChange={(e)=>setPerfil({...userperfil,activo:e.target.value})}
                >
                <option value='S'>Activo</option>
                <option value='N'>Inactivo</option>
              </Select>
              {/* <Input 
              onChange={(e)=> {setPerfil({ ...userperfil, activo: (e.target.value).toUpperCase() })}}
              placeholder='S / N'
              type={'text'} /> */}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=>savePerfil()} colorScheme={'blue'} autoFocus mr={3}>
              Guardar
            </Button>
            <Button onClick={handleCloseModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PerfilAgregarModal;
