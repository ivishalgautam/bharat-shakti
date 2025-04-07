import http from "@/utils/http";
const { endpoints } = require("@/utils/endpoints");

const update = async (data) => {
  return await http().put(endpoints.companyProfiles.getAll, data);
};

const get = async () => {
  const { data } = await http().get(
    `${endpoints.companyProfiles.getAll}/get-by-user`,
  );
  return data;
};

const companyProfile = {
  update: update,
  get: get,
};

export default companyProfile;
