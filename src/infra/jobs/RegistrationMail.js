 class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { account } = data;

    // await Mail.sendMail({
    //   from: "Queue Test <queue@queuetest.com.br>",
    //   to: `${account.name} <${account.email}>`,
    //   subject: "Cadastro de Usuário",
    //   html: `Olá, ${account.name}, bem-vindo ao sistema de fila do Vizpert!`,
    // });

    console.log('JOB Registration...');
    console.log(account);
    console.log('');
  }
};

export default new RegistrationMail();