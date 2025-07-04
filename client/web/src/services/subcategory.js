const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const get = async () => {
  const { data } = await http().get(`${endpoints.subcategories.getAll}`);
  return data?.subcategories ?? [];
};

const getByCategoryIds = async (categoryIds) => {
  const { data } = await http().get(
    `${endpoints.subcategories.getByCategory}?category_ids=${categoryIds}`,
  );
  return data?.subcategories ?? [];
};

const subcategory = {
  get: get,
  getByCategoryIds: getByCategoryIds,
};

export default subcategory;
