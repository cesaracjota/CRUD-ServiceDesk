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
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
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
  
  // Custom components
  import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
  
  const Perfil1 = (props) => {

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
    
    const fields = ['ID Perfil', 'Perfil y Descripcion'];

  
    //console.log(data);
  
    return (
      <Flex direction='column' pt={{ base: "120px", md: "75px" }}>

          <HStack spacing='24px' width={'100%'} justifyContent={'space-between'} verticalAlign={'center'}>
            <Box>
              <Text fontSize='xl' color={textColor} fontWeight='bold'>
                Perfiles Table
              </Text>
            </Box>
            <Box>
              agregar
            </Box>
          </HStack>
          <Table variant='simple' color={textColor} fields={fields}>
            <Thead>
              <Tr my='.8rem' pl='0px' color='gray.400'>
                {fields.map((field, idx) => {
                  return (
                    <Th color='gray.400'>
                      {field}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
            <Tr>
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
                           ID
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
                      perfil
                    </Text>
                    <Text fontSize="sm" color="gray.400" fontWeight="normal">
                     descripcion
                    </Text>
                  </Flex>
              </Td>
              <Td>
                    Hola
              </Td>
              <Td>
                    hola
              </Td>
            </Tr>
            </Tbody>
          </Table>
      </Flex>
    );
  }
  
  export default Perfil1;
  