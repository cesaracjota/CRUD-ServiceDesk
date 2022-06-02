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
    Select,
    Checkbox,
  } from "@chakra-ui/react";
  
  import {useDispatch, useSelector} from 'react-redux';
  import React, { useState, useEffect } from "react";
  
  import PersonasAgregarModal from "./components/PerfilAgregarModal";
  import PerfilEditarModal from "./components/PerfilEditarModal";
  
  import { listPerfil, deletePerfil, updatePerfil } from "actions/perfiles";
  
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
  
  const Perfil = (props) => {

    const [openedit, setOpenEdit] = React.useState(false);
    const [opendelete, setOpenDelete] = React.useState(false);
  
    const [indice, setIndice] = useState({
        idPerfilPersona: null,
        perfil: "",
        descripcion: "",
        activo: "",
    });
  
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");
  
    const cancelRef = React.useRef()
  
    const perfil = useSelector(store => store.perfiles);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(listPerfil());
    },[dispatch]);
  
    const handleClickOpenEdit = (index) => {
      setIndice(index);
      setOpenEdit(true);
    };
  
    const handleCloseEdit = () => {
      setOpenEdit(false);
    };

    const handleClickOpenDelete = (index) => {
      setIndice(index);
      setOpenDelete(true);
    }

    const handleCloseDelete = () => {
      setOpenDelete(false);
    }
 
    const removePerfil= () =>{
      dispatch(deletePerfil(indice))
      .then(() =>{
        // props.history.push('/perfiles');
        handleCloseDelete(true);
        dispatch(listPerfil());
        console.log('Perfil eliminada');
      })
      .catch(e =>{
        console.log(e)
      });
    }
  
    const actualizarPerfil = (e) => {
     e.preventDefault()
      dispatch(updatePerfil(indice))
      .then(() =>{
        dispatch(listPerfil());
        handleCloseEdit(true)
    })
      .catch(a => {
        console.log(a);
      });
      setOpenEdit(false);
    };
    
    const fields = ['ID Perfil', 'Perfil y Descripcion'];
    const data = perfil.map((user) => {
      return{
        idPerfilPersona: user.idPerfilPersona,
        perfil: user.perfil,
        descripcion: user.descripcion,
        activo: user.activo,
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
                Perfiles Table
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
              <Td minWidth={{ sm: "250px" }} pl="0px" >
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                  {/* <Avatar src={logo} w="50px" borderRadius="12px" me="18px" /> */}
                  <Td>
                      <Flex direction="column">
                          <Text
                                fontSize="md"
                                color={textColor}
                                fontWeight="bold"
                                minWidth="100%"
                              >
                            {item.idPerfilPersona}
                          </Text>
                      </Flex>
                  </Td>
                </Flex>
                </Td>
                <Td minWidth={{ sm: "250px" }} pl="0px" >
                  <Flex direction="column">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      minWidth="100%"
                    >
                      {item.perfil}
                    </Text>
                    <Text fontSize="sm" color="gray.400" fontWeight="normal">
                      {item.descripcion}
                    </Text>
                  </Flex>
              </Td>
              <Td>
              <Flex direction="column">
                  <Text fontSize="md" color={textColor} fontWeight="bold">
                  <Checkbox onChange={()=>handleClickOpenDelete(item.idPerfilPersona)} colorScheme='green' isChecked={item.activo == "S"} >
                      { item.activo == "S" ? 'Activo' : 'Inactivo' }
                    </Checkbox>
                  {/* <Button leftIcon={<DeleteIcon />} colorScheme= {'red'} size={'md'} onClick={()=>handleClickOpenDelete(item.idPerfilPersona)}>
                          Eliminar
                  </Button> */}
                        
                      <AlertDialog
                        isOpen={opendelete}
                        leastDestructiveRef={cancelRef}
                        onClose={handleCloseDelete}
                      > 
                      <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                              Actualizar el estado de Perfil Persona
                            </AlertDialogHeader>
  
                            <AlertDialogBody>
                              Está seguro de actualizarlo?
                            </AlertDialogBody>
  
                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={handleCloseDelete}>
                                Cancelar
                              </Button>
                              <Button onClick={()=>removePerfil(item.idPerfilPersona)} colorScheme='red' ml={3}>
                                Si
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                          </AlertDialogOverlay>
                      </AlertDialog>
                  </Text>
                </Flex>              
              </Td>
              <Td>
              <Flex direction="column">
                  <Button leftIcon={<EditIcon />}  colorScheme={'yellow'} size={'md'} onClick={()=>handleClickOpenEdit(item)}>Editar</Button>
                          <Modal
                            isOpen={openedit}
                            onClose={handleCloseEdit}
                          >
                          <ModalOverlay />
                            <ModalContent>
                              <ModalHeader display={'flex'} justifyContent={'center'}>Editar Perfil</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody pb={6}>
                              <FormControl>
                                  <FormLabel>Perfil</FormLabel>
                                  <Input
                                    value={indice ? (indice.idPerfilPersona) : ("")}
                                    disabled={true}
                                    type="text"
                                    //defaultValue={indice ? (indice.nombre):("")}
                                  />
                                </FormControl>
                                <FormControl>
                                  <FormLabel>Perfil</FormLabel>
                                  <Input
                                    autoFocus
                                    defaultValue={indice ? (indice.perfil) : ("")}
                                    type="text"
                                    //defaultValue={item ? (item.perfil):("")}
                                    //defaultValue={indice ? (indice.nombre):("")}
                                    onChange={(e)=>setIndice({...indice,perfil:e.target.value})}
                                  />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Descripcion</FormLabel>
                                    <Textarea
                                        autoFocus
                                        defaultValue={indice ? (indice.descripcion):("")}
                                        // defaultValue={item ? (item.descripcion):("")}
                                        onChange={(e)=>setIndice({...indice,descripcion:e.target.value})}
                                        placeholder='Descripcion'
                                        type="text"
                                    />
                                </FormControl>
                                <FormControl mt={4}>
                                  <FormLabel>Estado</FormLabel>
                                  <Select
                                  defaultValue={indice ? (indice.activo):("")}
                                  onChange={(e)=> setIndice({ ...indice, activo: e.target.value })}
                                  >
                                    <option value='S'>Activo</option>
                                    <option value='N'>Inactivo</option>
                                  </Select>
                                </FormControl>
                              </ModalBody>
                              <ModalFooter>
                                <Button onClick={(e)=>actualizarPerfil(e)} colorScheme='green' mr={3}>
                                  Actualizar
                                </Button>
                                <Button ref={cancelRef} onClick={handleCloseEdit}>Cancelar</Button>
                              </ModalFooter>
                            </ModalContent>
                      </Modal>
                </Flex>
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
  
  export default Perfil;
  