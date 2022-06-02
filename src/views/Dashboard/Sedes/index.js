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
  
  import SedeAgregarModal from "./components/SedeAgregarModal";
  
  // import actions 
  import { listSedes, deleteSede, updateSede } from "actions/sedes";
  
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
  
  const Sedes = (props) => {

    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");

    const [openedit, setOpenEdit] = React.useState(false);
    const [opendelete, setOpenDelete] = React.useState(false);
  
    const [indice, setIndice] = useState({
        idSede: null,
        sede: "",
        direccion: "",
        activo: ""
    });
  
    const cancelRef = React.useRef()
  
    const sede = useSelector(store => store.sedes);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(listSedes());
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
 
    const removeSede= () =>{
      dispatch(deleteSede(indice))
      .then(() =>{
        // props.history.push('/perfiles');
        handleCloseDelete(true);
        dispatch(listSedes());
        console.log('Sede eliminada');
      })
      .catch(e =>{
        console.log(e)
      });
    }
  
    const actualizarSede = (e) => {
     e.preventDefault()
      dispatch(updateSede(indice))
      .then(() =>{
        dispatch(listSedes());
        handleCloseEdit(true)
    })
      .catch(a => {
        console.log(a);
      });
      setOpenEdit(false);
    };
    
    const fields = ['ID Sede', 'Sede y Ubicacion', 'Estado'];
    const data = sede.map((dato) => {
      return{
        idSede: dato.idSede,
        sede: dato.sede,
        direccion: dato.direccion,
        activo: dato.activo,
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
                Sede Table
              </Text>
            </Box>
            <Box>
              <SedeAgregarModal/>
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
                            {item.idSede}
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
                      {item.sede}
                    </Text>
                    <Text fontSize="sm" color="gray.400" fontWeight="normal">
                      {item.direccion}
                    </Text>
                  </Flex>
              </Td>
              <Td>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {item.activo}
                </Text>
              </Td>
              <Td>
              <Flex direction="column">
                    <Checkbox onChange={()=>handleClickOpenDelete(item.idSede)} colorScheme='green' isChecked={item.activo == "S"} >
                      { item.activo == "S" ? 'Activo' : 'Inactivo' }
                    </Checkbox>
                        
                      <AlertDialog
                        isOpen={opendelete}
                        leastDestructiveRef={cancelRef}
                        onClose={handleCloseDelete}
                      > 
                      <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                              Actualizar estado de Sede
                            </AlertDialogHeader>
  
                            <AlertDialogBody>
                              Está seguro de actualizarlo??
                            </AlertDialogBody>
  
                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={handleCloseDelete}>
                                Cancelar
                              </Button>
                              <Button onClick={()=>removeSede(item.idSede)} colorScheme='red' ml={3}>
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
                  <Button leftIcon={<EditIcon />}  colorScheme={'yellow'} size={'md'} onClick={()=>handleClickOpenEdit(item)}>Editar</Button>
                          <Modal
                            isOpen={openedit}
                            onClose={handleCloseEdit}
                          >
                          <ModalOverlay />
                          <form onSubmit={(e)=>updateSede(e)}>
                            <ModalContent>
                              <ModalHeader display={'flex'} justifyContent={'center'}>Editar Sede</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody pb={6}>
                              <FormControl>
                                  <FormLabel>ID Sede</FormLabel>
                                  <Input
                                    value={indice ? (indice.idSede) : ("")}
                                    disabled={true}
                                    type="text"
                                    //defaultValue={indice ? (indice.nombre):("")}
                                  />
                                </FormControl>
                                <FormControl mt={4}>
                                  <FormLabel>Sede</FormLabel>
                                  <Input
                                    autoFocus
                                    defaultValue={indice ? (indice.sede) : ("")}
                                    type="text"
                                    onChange={(e)=>{setIndice({...indice,sede:(e.target.value).toUpperCase()})}}
                                  />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Direccion</FormLabel>
                                     <Input
                                      autoFocus
                                      defaultValue={indice ? (indice.direccion):("")}
                                      onChange={(e)=>setIndice({...indice,direccion:e.target.value})}
                                      type="text"
                                      placeholder='Indica la direccion'
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
                                  {/* <Input
                                    autoFocus
                                    defaultValue={indice ? (indice.activo) : ("")}
                                    type="text"
                                    onChange={(e)=>setIndice({...indice,activo:e.target.value})}
                                  /> */}
                                </FormControl>
                              </ModalBody>
                              <ModalFooter>
                                <Button onClick={(e)=>actualizarSede(e)} colorScheme='green' mr={3}>
                                  Actualizar
                                </Button>
                                <Button ref={cancelRef} onClick={handleCloseEdit}>Cancelar</Button>
                              </ModalFooter>
                            </ModalContent>
                        </form>
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
  
  export default Sedes;
  