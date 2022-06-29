import nodemailer from "nodemailer";
import config from "../config";

export default nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.nodemailerID,
    pass: config.nodemailerPW,
  },
});
