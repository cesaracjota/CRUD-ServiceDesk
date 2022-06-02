import http from "../http-common";

const getAll = () => {
  return http.get("/perfil");
};

const get = id => {
  return http.get(`/perfil/${id}`);
};

const create = data => {
  return http.post("/perfil", data);
};

const update = (data) => {
  return http.put("/perfil", data);
};

const remove = id => {
  return http.delete(`/perfil/${id}`);
};


const PerfilService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default PerfilService;