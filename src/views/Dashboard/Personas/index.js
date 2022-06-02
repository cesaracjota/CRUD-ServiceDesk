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
  Grid,
  GridItem,
  Select,
  Checkbox,
} from "@chakra-ui/react";

import {useDispatch, useSelector} from 'react-redux'
import React, { useState, useEffect } from "react";

import PersonasAgregarModal from "./components/PersonasAgregarModal";
// import PersonasEditarModal from "./components/PersonasEditarModal";

import { listPersonas, deletePersona, updatePersona } from "actions/personas";
import { listPerfil } from "actions/perfiles";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { FaFingerprint } from "react-icons/fa";

const Personas = (props) => {
  
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  
  const [open, setOpen] = React.useState(false);
  const [openedit, setOpenEdit] = React.useState(false);
  const [openupdate, setOpenUpdate] = React.useState(false);

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  const [indice, setIndice] = useState({
    idpersona: null,
    nombre: "",
    apellido: "",
    usuario: "",
    dni: "",
    password: "",
    fecha: "",
    sexo: "",
    activo: "",
    perfilPersona: {
      idPerfilPersona: null
  }
  });

  const initialPersona = {
    idpersona: null,
    nombre: "",
    apellido: "",
    usuario: "",
    dni: "",
    password: "",
    fecha: "",
    sexo: "",
    activo: "",
    perfilPersona: {
      idPerfilPersona: null,
    }
  }

  //const { nombre, apellido, dni, fecha, sexo, activo } = props;

  const cancelRef = React.useRef()

  const persona = useSelector(store => store.personas);
  const perfil = useSelector(store => store.perfiles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listPersonas());
  },[dispatch]);

  const handleClickOpen = (index) => {
    setIndice(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEdit = (index) => {
    setIndice(index);
    setOpenEdit(true);
  };

  const handleClickOpenUpdate = (e) => {
    setOpenUpdate(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const removePersona = () =>{
    dispatch(deletePersona(indice))
    .then(() =>{
      // props.history.push('/personas');
      handleClose(true);
      dispatch(listPersonas()); // para actualizar la tabla
      console.log('Persona eliminada');
    })
    .catch(e =>{
      console.log(e)
    });
  }

  const [userpersona, setPerson] = useState(initialPersona);

  const actualizarPersona = () => {
    //  console.log(indice);
    // e.preventDefault();
    const {idpersona,nombre,apellido,usuario,dni,password,fecha,sexo,activo,perfilPersona} = userpersona;

    dispatch(updatePersona(idpersona,nombre,apellido,usuario,dni,password,fecha,sexo,activo,perfilPersona))
    .then((data) => {
      setPerson({
        id: data.idpersona,
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
      dispatch(listPersonas());
      handleCloseEdit(true);
    })
    .catch(a => {
      console.log(a);
      handleCloseEdit(true)
    });
  };

  //mostar los datos
  const fields = ['Nombre y Apellidos', 'dni y fecha cumpl.', 'estado','perfil'];
  const data = persona.map((user) => {
    return{
      idpersona: user.idpersona,
      nombre: user.nombre,
      apellido: user.apellido,
      dni: user.dni,
      usuario: user.usuario,
      password: user.password,
      fecha: user.fecha,
      sexo: user.sexo,
      activo: user.activo,
      perfilPersona: user.perfilPersona.idPerfilPersona
    }
  })

  // jalar datos del perfil

  useEffect(() => {
    dispatch(listPerfil());
  },[dispatch]);

  const data1 = perfil.map((user) => {
    return{
      idPerfilPersona: user.idPerfilPersona,
      perfil: user.perfil,
      descripcion: user.descripcion,
    }
  })

  //console.log(data);

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>

    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='6px 0px 22px 0px'>
        <HStack spacing='24px' width={'100%'} justifyContent={'space-between'} verticalAlign={'center'}>
          <Box>
            <Text fontSize='xl' color={textColor} fontWeight='bold'>
              Personas Table
            </Text>
          </Box>
          <Box>
            <PersonasAgregarModal/>
          </Box>
        </HStack>        
      </CardHeader>
      <CardBody>
        <Table variant='simple' color={textColor} fields={fields} items={data}>
          <Thead>
            <Tr my='.8rem' pl='0px' color='gray.400'>
              {fields.map((field, idx) => {
                return (
                  <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                    {field}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
          {data.map((item, idx) => {
            return (
          <Tr key={idx} ps={idx === 0 ? "0px" : null}>
            <Td minWidth={{ sm: "250px" }} pl="0px">
              <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                {/* <Avatar src={logo} w="50px" borderRadius="12px" me="18px" /> */}
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    minWidth="100%"
                  >
                    {item.nombre}
                  </Text>
                  <Text fontSize="sm" color="gray.400" fontWeight="normal">
                    {item.apellido}
                  </Text>
                </Flex>
              </Flex>
            </Td>

            <Td>
              <Flex direction="column">
                <Text fontSize="md" color={textColor} fontWeight="bold">
                  {item.dni}
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {item.fecha}
                </Text>
              </Flex>
            </Td>
            {/* <Td>
              <Badge
                bg={item.sexo === "f" ? "green.400" : bgStatus || item.sexo === "m" ? "gray.400" : bgStatus}
                color={'white'}
                fontSize="16px"
                p="3px 10px"
                borderRadius="8px"
              >
                {item.sexo}
              </Badge>
            </Td> */}
            <Td>
              <Badge
                bg={item.activo === "n" ? "red.400" : bgStatus || item.activo === "f" ? "blue.900" : bgStatus}
                color={'white'}
                fontSize="16px"
                p="3px 10px"
                borderRadius="8px"
              >{item.activo}</Badge>
            </Td>
            <Td>
            	  <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {item.perfilPersona}
                </Text>
            </Td>
            <Td>
            <Checkbox onChange={()=>handleClickOpen(item.idpersona)} colorScheme='green' isChecked={item.activo == "S"} >
              { item.activo == "S" ? 'Activo' : 'Inactivo' }
            </Checkbox>
            {/* <Button leftIcon={<DeleteIcon />} colorScheme= {'red'} size={'md'} onClick={()=>handleClickOpen(item.id)}>
                ELIMINAR
            </Button> */}
              
            <AlertDialog
              isOpen={open}
              leastDestructiveRef={cancelRef}
              onClose={handleClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Actualizar estado de Persona
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Está seguro de actualizarlo?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={handleClose}>
                      Cancelar
                    </Button>
                    <Button onClick={()=>removePersona(item.id)} colorScheme='red' ml={3}>
                      Si
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
            </Td>
            <Td>
                    {/* Editar */}
                      {/* <PersonasEditarModal/> */}
                      <Button leftIcon={<EditIcon />}  colorScheme={'yellow'}  size={'md'} onClick={()=>handleClickOpenEdit(item)}>EDITAR</Button>
                      <Modal
                            initialFocusRef={initialRef}
                            finalFocusRef={finalRef}
                            isOpen={openedit}
                            onClose={handleCloseEdit}
                          >
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>Editar Persona</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody pb={2}>
                                <FormControl>
                                  <FormLabel>ID</FormLabel>
                                  <Input
                                    value={indice ? (indice.idpersona) : ("")}
                                    disabled={true}
                                    type="text"
                                    //defaultValue={indice ? (indice.nombre):("")}
                                  />
                                </FormControl>
                                <Grid templateColumns='repeat(5, 1fr)' gap={4} mt={3}>
                                  <GridItem h='10' colSpan={4}>
                                  <Input 
                                    defaultValue={indice ? (indice.dni):("")}
                                    onChange={(e) => setPerson({...indice,dni:e.target.value})}
                                    placeholder='ingrese su DNI'
                                    type={'text'} />
                                  </GridItem>
                                  <GridItem h='10' colSpan={1}>
                                    <Button colorScheme='teal' variant='solid'> <FaFingerprint /> </Button>
                                  </GridItem>
                                </Grid>
                                <HStack spacing={'10px'} mt={3}>
                                  <FormControl>
                                    <FormLabel>Nombres</FormLabel>
                                    <Input 
                                    defaultValue={indice ? (indice.nombre):("")}
                                    onChange={(e)=> setPerson({ ...indice, nombre: e.target.value})}
                                    placeholder='Nombres'
                                    type={'text'} />
                                  </FormControl>
                                  <FormControl>
                                    <FormLabel>Apellidos</FormLabel>
                                    <Input 
                                    defaultValue={indice ? (indice.apellido):("")}
                                    onChange={(e) => setPerson({...indice,apellido:e.target.value})}
                                    placeholder='Apellidos'
                                    type={'text'} />
                                  </FormControl>
                                </HStack>
                                <HStack spacing={'10px'} mt={'20px'}>
                                  <FormControl>
                                  <FormLabel>Usuario</FormLabel>
                                    <Input 
                                    defaultValue={indice ? (indice.usuario):("")}
                                    onChange={(e) => setPerson({...indice,usuario:e.target.value})}
                                    placeholder='USUARIO'
                                    type={'text'} />
                                  </FormControl>
                                  <FormControl>
                                    <FormLabel>Password</FormLabel>
                                    <Input 
                                    defaultValue={indice ? (indice.password):("")}
                                    onChange={(e) => setPerson({...indice,password:e.target.value})}
                                    type={'password'}
                                    placeholder='minimo 8 caracteres' />
                                  </FormControl>
                                </HStack>
                              
                                
                                <FormControl mt={4}>
                                    <FormLabel>Fecha de Nacimiento</FormLabel>
                                    {/* <DatePicker
                                        placeholder='Fecha de Nacimiento'
                                        value={indice ? (indice.fecha):("")}
                                        onChange={(e) => setPerson({...indice,fecha:e.target.value})}
                                         /> */}
                                    <Input
                                    defaultValue={indice ? (indice.fecha):("")}
                                    onChange={(e) => setPerson({...indice,fecha:(e.target.value)})}
                                    type={'date'}/>
                                        {/* onChange={(e)=> {setPerson({ ...persona, fecha: (e.target.value) }); setValidation(false)}}  /> */}
                                </FormControl>

                                <HStack spacing={'10px'} mt={'20px'}>
                                  <FormControl>
                                    <FormLabel>Estado</FormLabel>
                                    <Select
                                    defaultValue={indice ? (indice.activo):("")} 
                                    onChange={(e) => setPerson({...indice,activo:e.target.value})}
                                    >
                                      <option value='S'>Activo</option>
                                      <option value='N'>Inactivo</option>
                                    </Select>
                                    {/* <Input 
                                    defaultValue={indice ? (indice.activo):("")}
                                    onChange={(e) => setPerson({...indice,activo:e.target.value})}
                                    type={'text'}
                                    placeholder='A o I' />               */}
                                  </FormControl>
                                  <FormControl>
                                    <FormLabel>Sexo</FormLabel>
                                    <Select 
                                      defaultValue={indice ? (indice.sexo):("")}
                                      onChange={(e) => setPerson({...indice,sexo:e.target.value})}
                                    >
                                      <option value='M'>Masculino</option>
                                      <option value='F'>Femenino</option>
                                    </Select>
                                  </FormControl>
                                </HStack>
                                
                                <FormControl mt={4}>
                                  <FormLabel>Perfil</FormLabel>
                                  <Select
                                    defaultValue={indice ? (indice.perfilPersona):("")}
                                    onChange={(e) => setPerson({...indice,perfilPersona:e.target.value}).toInt()}
                                  >
                                      {data1.map((item, idx) => (
                                        <option value={item.idPerfilPersona} key={idx}>{item.perfil}</option>
                                      ))}
                                  </Select>
                                </FormControl>
                              </ModalBody>
                              <ModalFooter>
                                <Button onClick={(e)=>actualizarPersona(e)} colorScheme={'green'} mr={3}>
                                  Actualizar
                                </Button>
                                <Button ref={cancelRef} onClick={handleCloseEdit}>Cancelar</Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
            </Td>
            
          </Tr>
            )})}
          </Tbody>
        </Table>
      </CardBody>
    </Card>

    </Flex>
  );
}

export default Personas;
