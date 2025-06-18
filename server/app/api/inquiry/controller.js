"use strict";
import { Brevo } from "../../services/mailer.js";
import { inquirySchema } from "../../utils/schema/inquiry.schema.js";

const create = async (req, res) => {
  try {
    const validateData = inquirySchema.parse(req.body);
    await Brevo.sendInquiryEmail("vishal.gautam.5812@gmail.com", validateData);

    res.code(201).send({ status: true, message: "Inquiry sent successfully." });
  } catch (error) {
    throw error;
  }
};

export default {
  create: create,
};
