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
    AlertDialog,
    AlertDialogOverlay,AlertDialogContent,AlertDialogHeader,AlertDialogBody,
    AlertDialogFooter,
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
    Textarea,
    Checkbox,
  } from "@chakra-ui/react";
  
  import {useDispatch, useSelector} from 'react-redux'
  import React, { useState, useEffect } from "react";
  
  import PersonasAgregarModal from "./components/CargoAgregarModal";
  
  import { listCargos, deleteCargo, updateCargo } from "actions/cargos";
  
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
  
  const Cargos = (props) => {
    
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");
  
    const [open, setOpen] = React.useState(false);
    const [openedit, setOpenEdit] = React.useState(false);
  
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
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleClickOpenEdit = (index) => {
      setIndice(index);
      setOpenEdit(true);
    };
  
    const handleCloseEdit = () => {
      setOpenEdit(false);
    };
 
    const removeCargo= () =>{
      dispatch(deleteCargo(indice))
      .then(() =>{
        dispatch(listCargos());
        handleClose(true);
        console.log('Cargo eliminada');
      })
      .catch(e =>{
        console.log(e)
      });
    }
  
    const actualizarCargo = (e) => {
     e.preventDefault()
      dispatch(updateCargo(indice))
      .then(() =>{
        handleCloseEdit(true);
        dispatch(listCargos());
    })
      .catch(a => {
        console.log(a);
      });
      setOpenEdit(false);
    };
    
    const fields = ['ID Cargo', 'Cargo y Estado'];
    const data = cargo.map((user) => {
      return{
        idCargo: user.idCargo,
        cargo: user.cargo,
        activo: user.activo,
      }
    })
  
    //console.log(data);
  
    return (
      <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
  
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p='6px 0px 22px 0px'>
          <HStack spacing='24px' width={'100%'} justifyContent={'space-between'} mr={5} verticalAlign={'center'}>
            <Box>
              <Text fontSize='xl' color={textColor} fontWeight='bold'>
                Cargos Table
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
                            {item.idCargo}
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
                      {item.cargo}
                    </Text>
                    <Text fontSize="sm" color="gray.400" fontWeight="normal">
                      {item.activo}
                    </Text>
                  </Flex>
              </Td>
              <Td>
              <Flex direction="column">
                  <Checkbox onChange={()=>handleClickOpen(item.idCargo)} colorScheme='green' isChecked={item.activo == "S"} >
                    { item.activo == "S" ? 'Activo' : 'Inactivo' }
                  </Checkbox>
                  {/* <Button colorScheme= {'red'} size={'md'} onClick={()=>handleClickOpen(item.idCargo)}>
                  </Button> */}
                        
                      <AlertDialog
                        isOpen={open}
                        leastDestructiveRef={cancelRef}
                        onClose={handleClose}
                      > 
                      <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                             Actualizar el estado de Cargos
                            </AlertDialogHeader>

                            <AlertDialogBody>
                            Está seguro de actualizarlo?
                            </AlertDialogBody>
  
                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={handleClose}>
                                Cancelar
                              </Button>
                              <Button onClick={()=>removeCargo(item.idCargo)} colorScheme='red' ml={3}>
                                Si
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                          </AlertDialogOverlay>
                      </AlertDialog>
                </Flex>
              </Td>
              <Td>
              <Flex direction="column">
                  <Button leftIcon={<EditIcon />}  colorScheme={'yellow'} size='md' maxW={'100px'} onClick={()=>handleClickOpenEdit(item)}>Editar</Button>
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
                                    onChange={(e)=>setIndice({...indice,cargo:e.target.value})}
                                    type="text"
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
                                <FormControl mt={4}>
                                  <FormLabel>Estado</FormLabel>
                                  <Select
                                  defaultValue={indice ? (indice.activo) : ("")}
                                  onChange={(e)=>setIndice({...indice,activo:e.target.value})}
                                  >
                                    <option value='S'>Activo</option>
                                    <option value='N'>Inactivo</option>
                                  </Select>
                                </FormControl>
                              </ModalBody>
                              <ModalFooter>
                                <Button onClick={(e)=>actualizarCargo(e)} colorScheme='green' mr={3}>
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
  
  export default Cargos;
  