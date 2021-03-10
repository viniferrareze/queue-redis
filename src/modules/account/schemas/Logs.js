import mongoose from "mongoose";
import schemaOptions from "../../../infra/utils/schemaOptions";

const LogsSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Types.ObjectId,
    },
    logName: {
      type: String,
    },
    dateTime: {
      type: String,
    },
  },
  schemaOptions
);

export default mongoose.model("Logs_REDIS", LogsSchema, 'Logs_REDIS');
