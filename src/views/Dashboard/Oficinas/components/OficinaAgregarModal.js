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
  } from "@chakra-ui/react";
  
  import {useDispatch, useSelector} from 'react-redux'
  import React, { useState, useEffect } from "react";
  import { createOficina } from "../../../../actions/oficinas";
  import { listOrganos } from "../../../../actions/organos";
  
  const OficinaAgregarModal = (props) => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch();
  
    const handleClickOpenCreate = () => {
      setOpenCreate(true);
    }
  
    const handleCloseModal = () => {
      setOpenCreate(false);
    };
  
    const initialOficina = {
      idOficina: null,
      oficina: "",
      activo: "",
      organo: {
          idOrgano: null,
      }
    }

    //cargo
  
    const [useroficina, setOficina] = useState(initialOficina);
  
    const saveOficina = () => {
      const { oficina, activo, organo} = useroficina;
      dispatch(createOficina(oficina, activo, organo))
      .then((data) => {
        setOficina({
          id: data.idOficina,
          oficina: data.oficina,
          activo: data.activo,
          organo: data.organo.idOrgano,
        })
        handleCloseModal(true);
      // props.history.push('/perfiles');
      })
      .catch(e => {
        console.log(e);
        console.log('No se pudo crear la Oficina', { variant: 'error' });
        handleCloseModal(true);
      });
    }

    // listar organos

    const organo = useSelector(store => store.organos);

    useEffect(()=>{
      dispatch(listOrganos());
    },[dispatch]);

    const data1 = organo.map((user) => {
      return{
        idOrgano: user.idOrgano,
        organo: user.organo,
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
            <ModalHeader>Agregar Nueva Oficina</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Oficina</FormLabel>
                <Input 
                onChange={(e)=> {setOficina({ ...useroficina, oficina: (e.target.value).toUpperCase() })}}
                placeholder='Oficina'
                type={'text'} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Activo</FormLabel>
                <Select
                    placeholder='Seleccione Estado'
                    onChange={(e)=> {setOficina({ ...useroficina, activo: (e.target.value) }); setValidation(false)}} 
                    >
                      <option value='S'>Activo</option>
                      <option value='N'>Inactivo</option>
                  </Select>
              </FormControl>
              <FormControl mt={4}>
              <FormLabel>Organo</FormLabel>
                <Select
                  placeholder='Seleccione Organo'
                  onChange={(e)=> setOficina({ ...useroficina, organo : e.target.value})}
                >
                  {data1.map((item, idx) => (
                    <option value={item.idOrgano} key={idx}>{item.organo}</option>
                  ))}
                </Select>
            </FormControl>

            </ModalBody>
            <ModalFooter>
              <Button onClick={()=>saveOficina()} colorScheme={'blue'} autoFocus mr={3}>
                Guardar
              </Button>
              <Button onClick={handleCloseModal}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  export default OficinaAgregarModal;
  