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
  import { createOrgano } from "../../../../actions/organos";
  import { listSedes } from "../../../../actions/sedes";
  
  const OrganoAgregarModal = (props) => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch();
  
    const handleClickOpenCreate = () => {
      setOpenCreate(true);
    }
  
    const handleCloseModal = () => {
      setOpenCreate(false);
    };
  
    const initialOrgano = {
      idOrgano: null,
      organo: "",
      activo: "",
      sede: {
          idSede: null,
      }
    }

    //cargo
  
    const [userorgano, setOrgano] = useState(initialOrgano);
  
    const saveOrgano = () => {
      const { organo, activo, sede} = userorgano;
      dispatch(createOrgano(organo, activo, sede))
      .then((data) => {
        setOrgano({
          id: data.idOrgano,
          organo: data.organo,
          activo: data.activo,
          sede: data.sede.idSede,
        })
        handleCloseModal(true);
      // props.history.push('/perfiles');
      })
      .catch(e => {
        console.log(e);
        console.log('No se pudo crear el Organo', { variant: 'error' });
        handleCloseModal(true);
      });
    }

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
            <ModalHeader>Agregar Nuevo Organo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Sede</FormLabel>
              <Select placeholder='Selecciones Sede'
                  onChange={(e)=> setOrgano({ ...userorgano, sede : e.target.value})}
                >
                    {data1.map((item, idx) => (
                      <option value={item.idSede} key={idx}>{item.sede}</option>
                    ))}
                </Select>
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Estado</FormLabel>
                  <Select
                    defaultValue='S'
                    onChange={(e)=> {setOrgano({ ...userorgano, activo: (e.target.value) }); setValidation(false)}} 
                    >
                      <option value='S'>Activo</option>
                      <option value='N'>Inactivo</option>
                  </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Organo</FormLabel>
                <Input 
                onChange={(e)=> {setOrgano({ ...userorgano, organo: (e.target.value).toUpperCase() })}}
                placeholder='Organo'
                type={'text'} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={()=>saveOrgano()} colorScheme={'blue'} autoFocus mr={3}>
                Guardar
              </Button>
              <Button onClick={handleCloseModal}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  export default OrganoAgregarModal;
  