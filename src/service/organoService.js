import http from "../http-common";

const getAll = () => {
  return http.get("/organos");
};

const get = id => {
  return http.get(`/organos/${id}`);
};

const create = data => {
  return http.post("/organos", data);
};

const update = data => {
  return http.put("/organos", data);
};

const remove = id => {
  return http.delete(`/organos/${id}`);
};


const OrganoService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default OrganoService;