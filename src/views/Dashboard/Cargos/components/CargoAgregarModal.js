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
  Select,
  useColorModeValue,Stack,
  Textarea, Radio, RadioGroup,
} from "@chakra-ui/react";

import {useDispatch, useSelector} from 'react-redux'
import React, { useState, useEffect } from "react";
import CargoDataService from "../../../../service/cargoService";
import { createCargo } from "../../../../actions/cargos";

const CargoAgregarModal = (props) => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  }

  const handleCloseModal = () => {
    setOpenCreate(false);
  };

  const initialCargo = {
    idCargo: null,
    cargo: "",
    activo: "",
  }

  const [usercargo, setCargo] = useState(initialCargo);

  const saveCargo = () => {
    const { cargo, activo} = usercargo;
    dispatch(createCargo(cargo, activo))
    .then((data) => {
      setCargo({
        id: data.idCargo,
        cargo: data.cargo,
        activo: data.activo
      })
      handleCloseModal(true);
    // props.history.push('/perfiles');
    })
    .catch(e => {
      console.log(e);
      console.log('No se pudo crear la Perfil', { variant: 'error' });
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
          <ModalHeader>Agregar Nuevo Cargo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Cargo</FormLabel>
              <Input 
              onChange={(e)=> {setCargo({ ...usercargo, cargo: (e.target.value).toUpperCase() })}}
              placeholder='Cargo'
              type={'text'} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Descripcion</FormLabel>
              <Textarea 
              onChange={(e)=> {setCargo({ ...usercargo, descripcion: (e.target.value) }); setValidation(false)}} 
              placeholder='ingrese la descripcion'
              type={'text'} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Estado</FormLabel>
              <Select
              onChange={(e)=> {setCargo({ ...usersede, activo: (e.target.value).toUpperCase() })}}
              >
                <option value='S'>Activo</option>
                <option value='N'>Inactivo</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=>saveCargo()} colorScheme={'blue'} autoFocus mr={3}>
              Guardar
            </Button>
            <Button onClick={handleCloseModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CargoAgregarModal;
