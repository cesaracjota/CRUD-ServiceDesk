import {
    CREATE_OFICINA,
    LIST_OFICINAS,
    UPDATE_OFICINA,
    DELETE_OFICINA,
  } from "../actions/types";

const initialState = [];

function oficinaReducer(oficinas = initialState,action ) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_OFICINA:
        return [...oficinas, payload];
  
      case LIST_OFICINAS:
        return payload;
  
      case UPDATE_OFICINA:
        return oficinas.map((oficina) => {
          if (oficina.id === payload.idOficina) {
            return {
              ...oficina,
              ...payload,
            };
          } else {
            return oficina;
          }
        });
  
      case DELETE_OFICINA:
        return oficinas.filter(({ id }) => id !== payload.id);
  
      default:
        return oficinas;
    }
  };
  
  export default oficinaReducer;