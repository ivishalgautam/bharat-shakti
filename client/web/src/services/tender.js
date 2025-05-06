const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const getById = async (id) => {
  const { data } = await http().get(`${endpoints.tenders.getAll}/${id}`);
  return data;
};

const getBySlug = async (slug) => {
  const { data } = await http().get(`${endpoints.tenders.getBySlug}/${slug}`);
  return data;
};

const get = async (searchParams = "", user) => {
  console.log({ user });
  const { data } = await http().get(
    `${endpoints.tenders.getAll}?${searchParams}`,
  );
  return data;
};

const favourite = async (searchParams = "") => {
  const { data } = await http().get(
    `${endpoints.tenders.favourite}?${searchParams}`,
  );
  return data;
};

const tender = {
  getById: getById,
  get: get,
  favourite: favourite,
  getBySlug: getBySlug,
};

export default tender;
