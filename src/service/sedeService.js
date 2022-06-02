import http from "../http-common";

const getAll = () => {
  return http.get("/sedes");
};

const get = id => {
  return http.get(`/sedes/${id}`);
};

const create = data => {
  return http.post("/sedes", data);
};

const update = (data) => {
  return http.put("/sedes", data);
};

const remove = id => {
  return http.delete(`/sedes/${id}`);
};


const SedeService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default SedeService;