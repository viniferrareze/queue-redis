import Repository from "../../../infra/utils/Repository";
import Logs from "../schemas/Logs";

export default class AccountRepository extends Repository {
  constructor() {
    super(Logs);
  }
}
