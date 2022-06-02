import {
    CREATE_SEDE,
    LIST_SEDES,
    UPDATE_SEDE,
    DELETE_SEDE,
  } from "./types";
  
  import Swal from 'sweetalert2'
  
  //import PersonaDataService from "../service/personaService";
  import SedeDataService from "../service/sedeService";
  
  export const createSede = ( sede, direccion, activo ) => async (dispatch) => {
    try {
      const res = await SedeDataService.create({ sede, direccion, activo });
      dispatch({
        type: CREATE_SEDE,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Sede registrado correctamente.'
      });
      return Promise.resolve(res.data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el sede'
      });
      return Promise.reject(err);
    }
  };
  
  export const listSedes = () => async (dispatch) => {
    try {
      const res = await SedeDataService.getAll();
  
      dispatch({
        type: LIST_SEDES,
        payload: res.data,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar la lista de Sedes',
      });
      console.log(err);
    }
  };
  
  export const updateSede = (data) => async (dispatch) => {
    try {
      const res = await SedeDataService.update(data);
  
      dispatch({
        type: UPDATE_SEDE,
        payload: data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Sede modificado correctamente.',
      });
      return Promise.resolve(res.data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo modificar el sede',
      });
      return Promise.reject(err);
    }
  };
  
  export const deleteSede = (id) => async (dispatch) => {
    try {
      await SedeDataService.remove(id);
        dispatch({
        type: DELETE_SEDE,
        payload: { id },
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Sede actualizado correctamente.'
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el sede',
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