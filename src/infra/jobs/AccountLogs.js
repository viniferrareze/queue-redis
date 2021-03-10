import { format } from "date-fns";
import LogsRepository from "../../modules/account/repositories/LogsRepository";

class AccountLogs {
  get key() {
    return 'AccountLogs';
  }

  async handle({ data }) {
    const { account } = data;
    const dateNow = Date.now();
    const date = format(dateNow, "PPpp");
    const logsRepository = new LogsRepository();

    await logsRepository.create({
      accountId: account.id,
      logName: "CreatedAccount",
      dateTime: date,
    });
  };
};

export default new AccountLogs();