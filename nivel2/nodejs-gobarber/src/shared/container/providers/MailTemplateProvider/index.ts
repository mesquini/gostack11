import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';
import HandlebarsMailTempalteProvider from './implementations/HandlebarsMailTempalteProvider';

const providers = {
  handlebars: HandlebarsMailTempalteProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
