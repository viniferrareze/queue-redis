import Repository from "../../../infra/utils/Repository";
import Account from "../schemas/Account";

export default class AccountRepository extends Repository {
  constructor() {
    super(Account);
  }

  async findOneEmailPassword(email) {
    const where = Account.translateAliases({ normalizedEmail: email });
    const data = await Account.findOne(where).select("+Password");

    return data?.toObject();
  }

  async FindByIdPassword(id) {
    const where = Account.translateAliases({ _id: id });
    const data = await Account.findOne(where).select("+Password");

    return data?.toObject();
  }

  async FindByOneIdPassword(oneId) {
    const where = Account.translateAliases({ oneId });
    const data = await Account.findOne(where).select("+Password");

    return data?.toObject();
  }
}
