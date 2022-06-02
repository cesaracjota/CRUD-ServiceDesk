import {
    CREATE_OFICINA,
    LIST_OFICINAS,
    UPDATE_OFICINA,
    DELETE_OFICINA,
  } from "./types";
  
import OficinaDataService from "../service/oficinaService";

import Swal from 'sweetalert2';

const idOrgano = {
    idOrgano: null
};
  
  export const createOficina = (oficina, activo, idOrgano) => async (dispatch) => {
    try {
      const res = await OficinaDataService.create({
        oficina, activo, organo: {idOrgano}
      });
  
      dispatch({
        type: CREATE_OFICINA,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Oficina registrado correctamente.'
      });
      return Promise.resolve(res.data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el Oficina'
      });
      return Promise.reject(err);
    }
  };
  
  export const listOficinas = () => async (dispatch) => {
    try {
      const res = await OficinaDataService.getAll();
  
      dispatch({
        type: LIST_OFICINAS,
        payload: res.data,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al cargar la lista de Oficinas'
      });
      console.log(err);
    }
  };
  
  export const updateOficina = (idOficina, oficina, activo, idOrgano) => async (dispatch) => {
    try {
      const res = await OficinaDataService.update({idOficina, oficina, activo, organo: {idOrgano}});
      dispatch({
        type: UPDATE_OFICINA,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Oficina actualizado correctamente.'
      });
      return Promise.resolve(res.data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar la Oficina'
      });
      return Promise.reject(err);
    }
  };
  
  export const deleteOficina = (id) => async (dispatch) => {
    try {
      await OficinaDataService.remove(id);
      dispatch({
        type: DELETE_OFICINA,
        payload: { id },
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Oficina actualizado correctamente.'
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al eliminar la Oficina'
      });
      console.log(err);
    }
  };
  
  
//   export const findPersonByName = (name) => async (dispatch) => {
//     try {
//       const res = await OficinaDataService.findByName(name);
  
//       dispatch({
//         type: LIST_PERSONAS,
//         payload: res.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };