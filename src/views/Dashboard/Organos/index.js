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
  
  import {useDispatch, useSelector} from 'react-redux'
  import React, { useState, useEffect } from "react";
  
  import OrganoAgregarModal from "./components/OrganoAgregarModal";
  
  import { listOrganos, deleteOrgano, updateOrgano } from "actions/organos";
  import { listSedes} from "actions/sedes";
  
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { tablesTableDataP } from "variables/general";
  
  const Organos = (props) => {
    
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");
  
    const [open, setOpen] = React.useState(false);
    const [openedit, setOpenEdit] = React.useState(false);
    const [opendelete, setOpenDelete] = React.useState(false);
  
    const [indice, setIndice] = useState({
        idOrgano: null,
        organo: "",
        activo: "",
        sede: {
            idSede: null,
        }
    });

    const initialOrgano = {
        idOrgano: null,
        organo: "",
        activo: "",
        sede: {
            idSede: null,
        }
      }

    const cancelRef = React.useRef()
  
    const organo = useSelector(store => store.organos);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(listOrganos());
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

    const handleClickOpenDelete = (index) => {
      setIndice(index);
      setOpenDelete(true);
    }

    const handleCloseDelete = (index) => {
      setOpenDelete(false);
    }
 
    const removeOrgano = () =>{
      dispatch(deleteOrgano(indice))
      .then(() =>{
        dispatch(listOrganos());
        console.log('Organo eliminada');
        handleCloseDelete(true)
      })
      .catch(e =>{
        console.log(e)
      });
    }

    const [userorgano, setOrgano] = useState(initialOrgano);
  
    const actualizarOrgano = () => {
    //  e.preventDefault()
    const { idOrgano, organo, activo, sede } = userorgano;
      dispatch(updateOrgano(idOrgano, organo, activo, sede))
      .then((data) =>{
          setOrgano({
            id: data.idOrgano,
            organo: data.organo,
            activo: data.activo,
            sede: data.sede.idSede,
          })
        dispatch(listOrganos());
        handleCloseEdit(true)
    })
      .catch(a => {
        console.log(a);
      });
      setOpenEdit(false);
    };
    
    const fields = ['Organo', 'Sede y Estado'];
    const data = organo.map((dato) => {
      return{
        idOrgano: dato.idOrgano,
        organo: dato.organo,
        activo: dato.activo,
        sede: dato.sede.idSede,
        nombreSede: dato.sede.sede
      }
    })

    //List sedes

    const sede = useSelector(store => store.sedes);

    useEffect(()=>{
      dispatch(listSedes());
    },[dispatch]);

    const data1 = sede.map((user) => {
      return{
        idSede: user.idSede,
        sede: user.sede,
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
                Organos Table
              </Text>
            </Box>
            <Box>
              <OrganoAgregarModal/>
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
                            {item.organo}
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
                      {item.nombreSede}
                    </Text>
                    <Text fontSize="sm" color="gray.400" fontWeight="normal">
                      {item.activo}
                    </Text>
                  </Flex>
              </Td>
              <Td>
              <Flex direction="column">
                  <Text fontSize="md" color={textColor} fontWeight="bold">
                  <Checkbox onChange={()=>handleClickOpenDelete(item.idOrgano)} colorScheme='green' isChecked={item.activo == "S"} >
                      { item.activo == "S" ? 'Activo' : 'Inactivo' }
                    </Checkbox>
                  {/* <Button leftIcon={<DeleteIcon />} colorScheme= {'red'} size={'md'} onClick={()=>handleClickOpen(item.idOrgano)}>
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
                              Actualizar el estado de Organo
                            </AlertDialogHeader>
  
                            <AlertDialogBody>
                              Está seguro de actualizarlo?
                            </AlertDialogBody>
  
                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={handleCloseDelete}>
                                Cancelar
                              </Button>
                              <Button onClick={()=>removeOrgano(item.idOrgano)} colorScheme='red' ml={3}>
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
                              <ModalHeader display={'flex'} justifyContent={'center'}>Editar Organo</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody pb={6}>
                              <FormControl>
                                  <Input
                                    value={indice ? (indice.idOrgano) : ("")}
                                    disabled={true}
                                    type="text"
                                    hidden={true}
                                    //defaultValue={indice ? (indice.nombre):("")}
                                  />
                                </FormControl>
                                <FormControl mt={4}>
                                  <FormLabel>Sede</FormLabel>
                                  <Select
                                    defaultValue={indice ? (indice.sede) : ("")}
                                    onChange={(e)=>setOrgano({...indice,sede:e.target.value})}
                                  >
                                      {data1.map((item, idx) => (
                                        <option value={item.idSede} key={idx}>{item.sede}</option>
                                      ))}
                                  </Select>
                                </FormControl>
                                <FormControl mt={4}>
                                  <FormLabel>Organo</FormLabel>
                                  <Input
                                    autoFocus
                                    defaultValue={indice ? (indice.organo) : ("")}
                                    type="text"
                                    //defaultValue={item ? (item.perfil):("")}
                                    //defaultValue={indice ? (indice.nombre):("")}
                                    onChange={(e)=>setOrgano({...indice,organo:e.target.value})}
                                  />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Estado</FormLabel>
                                    <Select
                                      defaultValue={indice ? (indice.activo) : ("")}
                                      onChange={(e)=>setOrgano({...indice,activo:e.target.value})}
                                      >
                                      <option value='S'>Activo</option>
                                      <option value='N'>Inactivo</option>
                                    </Select>
                                </FormControl>
                               
                              </ModalBody>
                              <ModalFooter>
                                <Button onClick={(e)=>actualizarOrgano(e)} colorScheme='green' mr={3}>
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
  
  export default Organos;
  