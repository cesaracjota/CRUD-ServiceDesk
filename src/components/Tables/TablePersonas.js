import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogOverlay,AlertDialogContent,AlertDialogHeader,AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  useRef,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { getPersonas } from "../../views/Dashboard/Personas/services";
import URL from '../../http-common'
import Persona from "views/Dashboard/Personas/components/Personas";
import PersonasAgregarModal from "views/Dashboard/Personas/components/PersonasAgregarModal";
import PersonasEditarModal from "views/Dashboard/Personas/components/PersonasEditarModal";



function TablePersona(props) {
  const { nombre, apellido, dni, fecha, sexo, activo } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const [personas, setPersonas] = useState([])

  useEffect(() => {
    async function loadPersonas (){
      const res = await getPersonas()

      if (res.status === 200) {
        setPersonas(res.data.personas)
        console.log(res)
      }

    }
    loadPersonas()
  },[])

  return (
    <Tr>
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
              {nombre}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {apellido}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {dni}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {fecha}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Badge
          bg={activo === "a" ? "green.400" : bgStatus || activo === "i" ? "gray.400" : bgStatus}
          color={'white'}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {activo}
        </Badge>
      </Td>
      <Td>
        <Badge
          bg={sexo === "m" ? "red.400" : bgStatus || sexo === "f" ? "blue.400" : bgStatus}
          color={'white'}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >{sexo}</Badge>
      </Td>
      <Td>
          <Menu>
            <MenuButton bg={'transparent'} _hover={'none'} as={Button}> 
              <TriangleDownIcon />     
            </MenuButton>
            <MenuList>
              <MenuItem>
                <PersonasEditarModal/>
              </MenuItem>
              <MenuItem>
              <Button size={'sm'} onClick={onOpen}>
                  Eliminar
              </Button>
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      Eliminar Persona
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Está seguro de eliminar?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancelar
                      </Button>
                      <Button colorScheme='red' onClick={onClose} ml={3}>
                        Si
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
              </MenuItem>
            </MenuList>
          </Menu>
      </Td>
    </Tr>
  );
}

export default TablePersona;
