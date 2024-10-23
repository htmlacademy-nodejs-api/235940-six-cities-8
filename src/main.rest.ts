import { PinoLogger } from './shared/libs/logger/index.js';
import { RestApplication } from './rest/rest-application.js';

async function bootstrap(): Promise<void> {
  const logger = new PinoLogger();
  const application = new RestApplication(logger);

  await application.init();
}

bootstrap();
