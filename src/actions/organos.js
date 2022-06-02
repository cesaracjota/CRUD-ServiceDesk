import {
    CREATE_ORGANO,
    LIST_ORGANOS,
    UPDATE_ORGANO,
    DELETE_ORGANO,
  } from "./types";
  
import OrganoDataService from "../service/organoService";

import Swal from 'sweetalert2'

const idSede = {
    idSede: null
};
  
  export const createOrgano = (organo,activo, idSede) => async (dispatch) => {
    try {
      const res = await OrganoDataService.create({
        organo,activo, sede: {idSede}
      });
  
      dispatch({
        type: CREATE_ORGANO,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Organo registrado correctamente.'
      });
      return Promise.resolve(res.data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el Organo'
      });
      return Promise.reject(err);
    }
  };
  
  export const listOrganos = () => async (dispatch) => {
    try {
      const res = await OrganoDataService.getAll();
  
      dispatch({
        type: LIST_ORGANOS,
        payload: res.data,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al cargar la lista de Organos'
      });
      console.log(err);
    }
  };
  
  export const updateOrgano = (idOrgano,organo,activo, idSede) => async (dispatch) => {
    try {
      const res = await OrganoDataService.update({idOrgano,organo,activo, sede: {idSede}});
      dispatch({
        type: UPDATE_ORGANO,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Organo actualizado correctamente.'
      });
      return Promise.resolve(res.data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar la Organo'
      });
      return Promise.reject(err);
    }
  };
  
  export const deleteOrgano = (id) => async (dispatch) => {
    try {
      await OrganoDataService.remove(id);
      dispatch({
        type: DELETE_ORGANO,
        payload: { id },
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Organo actualizado correctamente.'
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar la Organo'
      });
      console.log(err);
    }
  };
  
  
//   export const findPersonByName = (name) => async (dispatch) => {
//     try {
//       const res = await OrganoDataService.findByName(name);
  
//       dispatch({
//         type: LIST_PERSONAS,
//         payload: res.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };