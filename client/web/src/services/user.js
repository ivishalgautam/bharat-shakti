const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const update = async (id, data) => {
  return await http().put(`${endpoints.users.getAll}/${id}`, data);
};

const user = {
  update: update,
};

export default user;
