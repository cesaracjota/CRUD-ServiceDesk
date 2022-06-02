import {
    CREATE_PERSONA,
    LIST_PERSONAS,
    UPDATE_PERSONA,
    DELETE_PERSONA,
  } from "./types";
  
import PersonaDataService from "../service/personaService";

import Swal from 'sweetalert2'

const idPerfilPersona = {
    idPerfilPersona: null
};
  
  export const createPersona = (nombre,apellido,usuario,dni,password,fecha,sexo,activo, idPerfilPersona) => async (dispatch) => {
    try {
      const res = await PersonaDataService.create({
        nombre,apellido,usuario,dni,password,fecha,sexo,activo, perfilPersona: {idPerfilPersona}
      });
  
      dispatch({
        type: CREATE_PERSONA,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Persona registrado correctamente.'
      });
      return Promise.resolve(res.data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar la Persona'
      });
      return Promise.reject(err);
    }
  };
  
  export const listPersonas = () => async (dispatch) => {
    try {
      const res = await PersonaDataService.getAll();
  
      dispatch({
        type: LIST_PERSONAS,
        payload: res.data,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al cargar la lista de Personas'
      });
      console.log(err);
    }
  };
  
  export const updatePersona = (idpersona,nombre,apellido,usuario,dni,password,fecha,sexo,activo, idPerfilPersona) => async (dispatch) => {
    try {
      const res = await PersonaDataService.update({
        idpersona,nombre,apellido,usuario,dni,password,fecha,sexo,activo, perfilPersona: {idPerfilPersona}
    });
      dispatch({
        type: UPDATE_PERSONA,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Persona actualizado correctamente.'
      });
      return Promise.resolve(res.data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar la Persona'
      });
      return Promise.reject(err);
    }
  };
  
  export const deletePersona = (id) => async (dispatch) => {
    try {
      await PersonaDataService.remove(id);
      dispatch({
        type: DELETE_PERSONA,
        payload: { id },
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Persona actualizado correctamente.'
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar la Persona'
      });
      console.log(err);
    }
  };
  
  
//   export const findPersonByName = (name) => async (dispatch) => {
//     try {
//       const res = await PersonaDataService.findByName(name);
  
//       dispatch({
//         type: LIST_PERSONAS,
//         payload: res.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };