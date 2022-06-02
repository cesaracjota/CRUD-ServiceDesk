import { combineReducers } from "redux";

import personas from "./personas";
import perfiles from "./perfiles";
import cargos from "./cargos";
import sedes from "./sedes";
import oficinas from "./oficinas";
import organos from "./organos";

const initialState = {
  sidebarShow: 'responsive'
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}
export default combineReducers({
  nav: changeState,
  personas,
  perfiles,
  cargos,
  sedes,
  organos,
  oficinas,
});