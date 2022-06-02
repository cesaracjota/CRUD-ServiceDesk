import {
    CREATE_PERSONA,
    LIST_PERSONAS,
    UPDATE_PERSONA,
    DELETE_PERSONA,
  } from "../actions/types";

const initialState = [];

function personaReducer(personas = initialState,action ) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_PERSONA:
        return [...personas, payload];
  
      case LIST_PERSONAS:
        return payload;
  
      case UPDATE_PERSONA:
        return personas.map((persona) => {
          if (persona.id === payload.idpersona) {
            return {
              ...persona,
              ...payload,
            };
          } else {
            return persona;
          }
        });
  
      case DELETE_PERSONA:
        return personas.filter(({ id }) => id !== payload.id);
  
      default:
        return personas;
    }
  };
  
  export default personaReducer;