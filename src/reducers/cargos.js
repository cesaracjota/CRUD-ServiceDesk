import {
    CREATE_CARGO,
    LIST_CARGOS,
    UPDATE_CARGO,
    DELETE_CARGO,
  } from "../actions/types";
  
  const initialState = [];
  
  function cargoReducer(cargos = initialState,action ) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_CARGO:
        return [...cargos, payload];
  
      case LIST_CARGOS:
        return payload;
  
      case UPDATE_CARGO:
        return cargos.map((cargo) => {
          // perfil.id === payload.idPerfilPersona ? payload : perfil;
          if (cargo.id === payload.idCargo) {
            return {
              ...cargo,
              ...payload,
            };
          } else {
            return cargo;
          }
        });
  
      case DELETE_CARGO:
        return cargos.filter(({ id }) => id !== payload.id);
  
      default:
        return cargos;
    }
  };
  
  export default cargoReducer;