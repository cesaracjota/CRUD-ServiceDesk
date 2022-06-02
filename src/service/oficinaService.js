import http from "../http-common";

const getAll = () => {
  return http.get("/oficinas");
};

const get = id => {
  return http.get(`/oficinas/${id}`);
};

const create = data => {
  return http.post("/oficinas", data);
};

const update = (data) => {
  return http.put("/oficinas", data);
};

const remove = id => {
  return http.delete(`/oficinas/${id}`);
};


const OficinaService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default OficinaService;