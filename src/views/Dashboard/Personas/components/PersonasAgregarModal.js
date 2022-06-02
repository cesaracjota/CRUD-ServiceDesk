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
  Grid,
  GridItem,
  Select,
  HStack,
  Stack,
  RadioGroup,
  Radio,

} from "@chakra-ui/react";

// import actions
import { createPersona } from "../../../../actions/personas";
import { listPerfil } from "../../../../actions/perfiles";

import { FaFingerprint } from "react-icons/fa";

import {useDispatch, useSelector} from 'react-redux'
import React, { useState, useEffect } from "react";

const PersonasAgregarModal =(props) => {
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
  }

  const [perfiles, setPerfiles] = useState(initialPerfil);
  
  const initialPersona = {
    idpersona: null,
    nombre: "",
    apellido: "",
    usuario: "",
    dni: "",
    password: "",
    fecha: null,
    sexo: "",
    activo: "",
    perfilPersona: {
      idPerfilPersona: null,
    }
  }


  const [persona, setPersona] = useState(initialPersona);

  const savePersona = () => {
    const {nombre,apellido,usuario,dni,password,fecha,sexo,activo,perfilPersona} = persona
    const {idPerfilPersona} = perfiles

    dispatch(createPersona(nombre,apellido,usuario,dni,password,fecha,sexo,activo,perfilPersona))
    .then(data => {
      setPersona({
        idpersona: data.idpersona,
        nombre: data.nombre,
        apellido: data.apellido,
        usuario: data.usuario,
        dni: data.dni,
        password: data.password,
        fecha: data.fecha,
        sexo: data.sexo,
        activo: data.activo,
        perfilPersona: data.perfilPersona.idPerfilPersona,
      })
      handleCloseModal(true);
      // dispatch(listPersonas());
      //props.history.push('/personas')
      console.log(persona);
    }).catch(e => {
        console.log('No se pudo crear la Persona!', { variant: 'error' });
        handleCloseModal(true);
        console.log(e);
      });

  }

  useEffect(() => {
    dispatch(listPerfil());
  },[dispatch]);

  const perfil = useSelector(store => store.perfiles);

  const data1 = perfil.map((user) => {
    return{
      idPerfilPersona: user.idPerfilPersona,
      perfil: user.perfil,
      descripcion: user.descripcion,
    }
  })
  //console.log(data1);

  return (
    <>
      <Button colorScheme={'blue'} onClick={handleClickOpenCreate}>Agregar</Button>

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nueva Persona</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            <Grid templateColumns='repeat(5, 1fr)' gap={4}>
              <GridItem h='10' colSpan={4}>
              <Input 
                onChange={(e)=> setPersona({ ...persona, dni: e.target.value})}
                placeholder='DNI'
                type={'text'} />
              </GridItem>
              <GridItem h='10' colSpan={1}>
                <Button colorScheme='teal' variant='solid'> <FaFingerprint /> </Button>
              </GridItem>
            </Grid>
            <HStack spacing={'10px'} mt={5}>
              <FormControl>
                <FormLabel>Nombres</FormLabel>
                <Input 
                onChange={(e)=> setPersona({ ...persona, nombre: e.target.value})}
                placeholder='Nombres'
                type={'text'} required/>
              </FormControl>
              <FormControl>
                <FormLabel>Apellidos</FormLabel>
                <Input 
                onChange={(e)=> setPersona({ ...persona, apellido: e.target.value})}
                placeholder='Apellidos'
                type={'text'} />
              </FormControl>
            </HStack>
            <HStack spacing={'10px'} mt={'20px'}>

            <FormControl>
                <FormLabel>Usuario</FormLabel>
                <Input 
                onChange={(e)=> setPersona({ ...persona, usuario: e.target.value})}
                type={'text'}
                placeholder='deve tener 8 caracteres' />
            </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input 
                onChange={(e)=> setPersona({ ...persona, password: e.target.value})}
                type={'password'}
                placeholder='minimo 8 caracteres' />
              </FormControl>
            </HStack>
          
            <FormControl mt={4}>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <Input
                    placeholder='Fecha de Nacimiento'
                    type={'date'}
                    onChange={(e)=> setPersona({ ...persona, fecha: e.target.value})} />
                    {/* onChange={(e)=> {setPersona({ ...persona, fecha: (e.target.value) }); setValidation(false)}}  /> */}
            </FormControl>

            <HStack spacing={'10px'} mt={'20px'}>
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <Select placeholder='Select option'  onChange={(e)=> setPersona({ ...persona, activo: e.target.value})}>
                  <option value='S'>Activo</option>
                  <option value='N'>Inactivo</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Sexo</FormLabel>
                <Select placeholder='Select option'  onChange={(e)=> setPersona({ ...persona, sexo: e.target.value})}>
                  <option value='M'>Masculino</option>
                  <option value='F'>Femenino</option>
                </Select>
                {/* <Input 
                onChange={(e)=> setPersona({ ...persona, sexo: e.target.value})}
                type={'text'}
                placeholder='M o F' />      */}
              </FormControl>
            </HStack>
            
            <FormControl mt={4}>
              <FormLabel>Perfil Persona</FormLabel>
              <Select placeholder='Select option' onChange={(e)=> setPersona({...persona, perfilPersona: e.target.value})}>
                  {data1.map((item, idx) => (
                    <option value={item.idPerfilPersona} key={idx}>{item.perfil}</option>
                  ))}
              </Select>
              {/* <Input
              onChange={(e)=> setPersona({ ...persona, perfilPersona : e.target.value})}
              placeholder='ID'
              type={'number'}/> */}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=>savePersona()} colorScheme={'blue'} mr={3}>
              Guardar
            </Button>
            <Button onClick={handleCloseModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PersonasAgregarModal;
