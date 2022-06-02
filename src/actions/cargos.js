import {
    CREATE_CARGO,
    LIST_CARGOS,
    UPDATE_CARGO,
    DELETE_CARGO,
  } from "./types";

  import Swal from 'sweetalert2'
  
  //import PersonaDataService from "../service/personaService";
  import CargoDataService from "../service/cargoService";
  
  export const createCargo = (cargo, activo) => async (dispatch) => {
    try {
      const res = await CargoDataService.create({ cargo, activo });
  
      dispatch({
        type: CREATE_CARGO,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Cargo creado correctamente.'
      });
      return Promise.resolve(res.data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear el cargos',
        footer: '<a>err</a>'
      });
      return Promise.reject(err);
    }
  };
  
  export const listCargos = () => async (dispatch) => {
    try {
      const res = await CargoDataService.getAll();
  
      dispatch({
        type: LIST_CARGOS,
        payload: res.data,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar los cargos'
      });
      console.log(err);
    }
  };
  
  export const updateCargo= (data) => async (dispatch) => {
    try {
      const res = await CargoDataService.update(data);
  
      dispatch({
        type: UPDATE_CARGO,
        payload: data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Cargo modificado correctamente.'
      });
      return Promise.resolve(res.data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo modificar el cargo'
      });
      return Promise.reject(err);
    }
  };
  
  export const deleteCargo = (id) => async (dispatch) => {
    try {
      await CargoDataService.remove(id);
  
      dispatch({
        type: DELETE_CARGO,
        payload: { id },
      });
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Cargo se ha actualizado correctamente.'
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el cargo'
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