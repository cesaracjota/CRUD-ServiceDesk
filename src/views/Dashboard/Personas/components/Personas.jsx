// Chakra imports
// import {
//   Button,
//   Table,
//   Tbody,
//   Text,
//   Th,
//   Thead,
//   Tr,
//   HStack,
//   Box,
//   useColorModeValue,
//   Avatar,
//   Badge,
//   Flex,
//   Td,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   AlertDialog,
//   AlertDialogOverlay,AlertDialogContent,AlertDialogHeader,AlertDialogBody,
//   AlertDialogFooter,
//   useDisclosure,
//   useRef,
// } from "@chakra-ui/react";

// import React, { useEffect, useState } from "react";
// import { ChevronDownIcon, TriangleDownIcon } from '@chakra-ui/icons';
// import { getPersonas } from "../services";
// import Persona from "./Personas";
// import PersonasAgregarModal from "./PersonasAgregarModal";
// import PersonasEditarModal from "./PersonasEditarModal";

// Custom components
// import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import CardHeader from "components/Card/CardHeader.js";
// import TablePersona from "./TablePersonas";

// import { PersonaContext } from "../context/PersonaContext";

// const Persona = ({ title, captions, data }) => {

//   const { nombre, apellido, dni, fecha, sexo, activo } = props;
//   const textColor = useColorModeValue("gray.700", "white");
//   const bgStatus = useColorModeValue("gray.400", "#1a202c");
//   const colorStatus = useColorModeValue("white", "gray.400");

//   const { isOpen, onOpen, onClose } = useDisclosure()
//   const cancelRef = React.useRef()

//   return (
//     <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
//       <CardHeader p='6px 0px 22px 0px'>
//         <HStack spacing='24px' width={'100%'} justifyContent={'space-between'} verticalAlign={'center'}>
//           <Box>
//             <Text fontSize='xl' color={textColor} fontWeight='bold'>
//               {title}
//             </Text>
//           </Box>
//           <Box>
//             <PersonasAgregarModal/>
//           </Box>
//         </HStack>        
//       </CardHeader>
//       <CardBody>
//         <Table variant='simple' color={textColor}>
//           <Thead>
//             <Tr my='.8rem' pl='0px' color='gray.400'>
//               {captions.map((caption, idx) => {
//                 return (
//                   <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
//                     {caption}
//                   </Th>
//                 );
//               })}
//             </Tr>
//           </Thead>
//           <Tbody>

//           <Tr>
//             <Td minWidth={{ sm: "250px" }} pl="0px">
//               <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
//                 {/* <Avatar src={logo} w="50px" borderRadius="12px" me="18px" /> */}
//                 <Flex direction="column">
//                   <Text
//                     fontSize="md"
//                     color={textColor}
//                     fontWeight="bold"
//                     minWidth="100%"
//                   >
//                     {nombre}
//                   </Text>
//                   <Text fontSize="sm" color="gray.400" fontWeight="normal">
//                     {apellido}
//                   </Text>
//                 </Flex>
//               </Flex>
//             </Td>

//             <Td>
//               <Flex direction="column">
//                 <Text fontSize="md" color={textColor} fontWeight="bold">
//                   {dni}
//                 </Text>
//                 <Text fontSize="sm" color="gray.400" fontWeight="normal">
//                   {fecha}
//                 </Text>
//               </Flex>
//             </Td>
//             <Td>
//               <Badge
//                 bg={sexo === "f" ? "green.400" : bgStatus || sexo === "m" ? "gray.400" : bgStatus}
//                 color={'white'}
//                 fontSize="16px"
//                 p="3px 10px"
//                 borderRadius="8px"
//               >
//                 {sexo}
//               </Badge>
//             </Td>
//             <Td>
//               <Badge
//                 bg={activo === "n" ? "red.400" : bgStatus || activo === "f" ? "blue.900" : bgStatus}
//                 color={'white'}
//                 fontSize="16px"
//                 p="3px 10px"
//                 borderRadius="8px"
//               >{activo}</Badge>
//             </Td>
//             <Td>
//                 <Menu>
//                   <MenuButton bg={'transparent'} _hover={'none'} as={Button}> 
//                     <TriangleDownIcon />     
//                   </MenuButton>
//                   <MenuList>
//                     <MenuItem>
//                       <PersonasEditarModal/>
//                     </MenuItem>
//                     <MenuItem>
//                     <div>
//                       <Button size={'sm'} onClick={onOpen}>
//                           Eliminar
//                       </Button>
//                     </div>
                      
//                     <AlertDialog
//                       isOpen={isOpen}
//                       leastDestructiveRef={cancelRef}
//                       onClose={onClose}
//                     >
//                       <AlertDialogOverlay>
//                         <AlertDialogContent>
//                           <AlertDialogHeader fontSize='lg' fontWeight='bold'>
//                             Eliminar Persona
//                           </AlertDialogHeader>

//                           <AlertDialogBody>
//                             Está seguro de eliminar?
//                           </AlertDialogBody>

//                           <AlertDialogFooter>
//                             <Button ref={cancelRef} onClick={onClose}>
//                               Cancelar
//                             </Button>
//                             <Button onClick={()=>removePersona()} colorScheme='red' ml={3}>
//                               Si
//                             </Button>
//                           </AlertDialogFooter>
//                         </AlertDialogContent>
//                       </AlertDialogOverlay>
//                     </AlertDialog>
//                     </MenuItem>
//                   </MenuList>
//                 </Menu>
//             </Td>
//           </Tr>


//             {/* {data.map((row) => {
//               return (
//                 <TablePersona
//                   key={`${row.id}`}
//                   nombre={row.nombre}
//                   apellido={row.apellido}
//                   dni={row.dni}
//                   sexo={row.sexo}
//                   fecha={row.fecha}
//                   estado={row.activo}
//                 />
//               );
//               })} */}
//           </Tbody>
//         </Table>
//       </CardBody>
//     </Card>
//   );
// };

//export default Persona;
