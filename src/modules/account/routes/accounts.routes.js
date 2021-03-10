import { Router } from "express";
import AccountRepository from "../repositories/AccountRepository";
import LogsRepository from "../repositories/LogsRepository";
import { format } from "date-fns";
import Mail from "../../../infra/lib/Mail";
import Queue from "../../../infra/lib/Queue";

const accountsRoutes = Router();

accountsRoutes.post("/old", async (req, res) => {
  const { name, email, password } = req.body;
  const accountRepository = new AccountRepository();
  const logsRepository = new LogsRepository();
  const account = await accountRepository.create({ name, email, password });
  const dateNow = Date.now();
  const date = format(dateNow, "PPpp");
  await logsRepository.create({
    accountId: account.id,
    logName: "CreatedAccount",
    dateTime: date,
  });

  await Mail.sendMail({
    from: "Queue Test <queue@queuetest.com.br>",
    to: `${name} <${email}>`,
    subject: "Cadastro de Usuário",
    html: `Olá, ${name}, bem-vindo ao sistema de fila do Vizpert!`,
  });

  res.status(200).json(account);
});

accountsRoutes.post("/new", async (req, res) => {
  const { name, email, password } = req.body;
  const accountRepository = new AccountRepository();
  const account = await accountRepository.create({ name, email, password });

  await Queue.add("RegistrationMail", { account });
  await Queue.add("AccountLogs", { account });

  res.status(200).json(account);
});

export default accountsRoutes;
