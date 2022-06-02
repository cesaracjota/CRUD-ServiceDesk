import {
  CREATE_PERFIL,
  LIST_PERFIL,
  UPDATE_PERFIL,
  DELETE_PERFIL,
} from "./types";

import Swal from 'sweetalert2'

//import PersonaDataService from "../service/personaService";
import PerfilDataService from "../service/perfilService";

export const createPerfil = ( perfil, descripcion, activo ) => async (dispatch) => {
  try {
    const res = await PerfilDataService.create({ perfil, descripcion, activo });
    dispatch({
      type: CREATE_PERFIL,
      payload: res.data,
    });
    Swal.fire({
      icon: 'success',
      title: 'Correcto',
      text: 'Cliente registrado correctamente.'
    });
    return Promise.resolve(res.data);
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo registrar el perfil'
    });
    return Promise.reject(err);
  }
};

export const listPerfil = () => async (dispatch) => {
  try {
    const res = await PerfilDataService.getAll();

    dispatch({
      type: LIST_PERFIL,
      payload: res.data,
    });
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo cargar la lista de Perfiles',
    });
    console.log(err);
  }
};

export const updatePerfil = (data) => async (dispatch) => {
  try {
    const res = await PerfilDataService.update(data);

    dispatch({
      type: UPDATE_PERFIL,
      payload: data,
    });
    Swal.fire({
      icon: 'success',
      title: 'Correcto',
      text: 'Perfil modificado correctamente.',
    });
    return Promise.resolve(res.data);
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo modificar el perfil',
    });
    return Promise.reject(err);
  }
};

export const deletePerfil = (id) => async (dispatch) => {
  try {
    await PerfilDataService.remove(id);

    dispatch({
      type: DELETE_PERFIL,
      payload: { id },
    });
    Swal.fire({
      icon: 'success',
      title: 'Correcto',
      text: 'Perfil actualizado correctamente.'
    });
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo actualizar el perfil',
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