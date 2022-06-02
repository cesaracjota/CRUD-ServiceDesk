import http from "../http-common";

const getAll = () => {
  return http.get("/cargos");
};

const get = id => {
  return http.get(`/cargos/${id}`);
};

const create = data => {
  return http.post("/cargos", data);
};

const update = (data) => {
  return http.put("/cargos", data);
};

const remove = id => {
  return http.delete(`/cargos/${id}`);
};


const CargoService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default CargoService;