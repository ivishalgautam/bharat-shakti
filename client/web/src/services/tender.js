const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const getById = async (id) => {
  const { data } = await http().get(`${endpoints.tenders.getAll}/${id}`);
  return data;
};

const getBySimilarTenders = async (searchParams) => {
  const { data } = await http().get(
    `${endpoints.tenders.getAll}/get-similar-tenders?${searchParams}`,
  );
  return data;
};

const getBySlug = async (slug) => {
  const { data } = await http().get(`${endpoints.tenders.getBySlug}/${slug}`);
  return data;
};

const get = async (searchParams = "", user) => {
  const url = user
    ? `${endpoints.tenders.getAll}/all-tenders?${searchParams}`
    : `${endpoints.tenders.getAll}?${searchParams}`;

  const { data } = await http().get(url);
  return data;
};

const favourite = async (searchParams = "") => {
  const { data } = await http().get(
    `${endpoints.tenders.favourite}?${searchParams}`,
  );
  return data;
};

const addView = async (id) => {
  return await http().post(`${endpoints.tenders.getAll}/add-view/${id}`);
};

const tender = {
  getById: getById,
  get: get,
  favourite: favourite,
  getBySlug: getBySlug,
  getBySimilarTenders: getBySimilarTenders,
  addView: addView,
};

export default tender;
