import { QueryTypes } from "sequelize";

export const enableExtensions = async (sequelize) => {
  try {
    // Enable unaccent extension
    await sequelize.query("CREATE EXTENSION IF NOT EXISTS unaccent;", {
      type: QueryTypes.RAW,
    });
    console.log("Unaccent extension enabled.");
  } catch (error) {
    console.error("Error enabling extensions:", error);
  }
};
