import {
    CREATE_ORGANO,
    LIST_ORGANOS,
    UPDATE_ORGANO,
    DELETE_ORGANO,
  } from "../actions/types";

const initialState = [];

function organoReducer(organos = initialState,action ) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_ORGANO:
        return [...organos, payload];
  
      case LIST_ORGANOS:
        return payload;
  
      case UPDATE_ORGANO:
        return organos.map((organo) => {
          if (organo.id === payload.idOrgano) {
            return {
              ...organo,
              ...payload,
            };
          } else {
            return organo;
          }
        });
  
      case DELETE_ORGANO:
        return organos.filter(({ id }) => id !== payload.id);
  
      default:
        return organos;
    }
  };
  
  export default organoReducer;