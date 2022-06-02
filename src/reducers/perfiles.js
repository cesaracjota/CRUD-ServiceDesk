import {
  CREATE_PERFIL,
  LIST_PERFIL,
  UPDATE_PERFIL,
  DELETE_PERFIL,
} from "../actions/types";

const initialState = [];

function perfilReducer(perfiles = initialState,action ) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PERFIL:
      return [...perfiles, payload];

    case LIST_PERFIL:
      return payload;

    case UPDATE_PERFIL:
      return perfiles.map((perfil) => {
        // perfil.id === payload.idPerfilPersona ? payload : perfil;
        if (perfil.id === payload.idPerfilPersona) {
          return {
            ...perfil,
            ...payload,
          };
        } else {
          return perfil;
        }
      });

    case DELETE_PERFIL:
      return perfiles.filter(({ id }) => id !== payload.id);

    default:
      return perfiles;
  }
};

export default perfilReducer;