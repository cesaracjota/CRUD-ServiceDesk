import {
    CREATE_SEDE,
    LIST_SEDES,
    UPDATE_SEDE,
    DELETE_SEDE,
  } from "../actions/types";
  
  const initialState = [];
  
  function sedeReducer(sedes = initialState,action ) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_SEDE:
        return [...sedes, payload];
  
      case LIST_SEDES:
        return payload;
  
      case UPDATE_SEDE:
        return sedes.map((sede) => {
          // perfil.id === payload.idPerfilPersona ? payload : perfil;
          if (sede.id === payload.idSede) {
            return {
              ...sede,
              ...payload,
            };
          } else {
            return sede;
          }
        });
  
      case DELETE_SEDE:
        return sedes.filter(({ id }) => id !== payload.id);
  
      default:
        return sedes;
    }
  };
  
  export default sedeReducer;