import nodeMailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

export default class EherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodeMailer.createTestAccount().then(account => {
      const transporter = nodeMailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log(message.messageId);
    console.log(nodeMailer.getTestMessageUrl(message));
  }
}
