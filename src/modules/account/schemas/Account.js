import mongoose from "mongoose";
import schemaOptions from "../../../infra/utils/schemaOptions";

const AccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  schemaOptions
);

export default mongoose.model("Account_TEST_REDIS", AccountSchema, "Account_TEST_REDIS");
