import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'js-yaml';
import { join } from 'path';
import { readFile } from 'node:fs/promises';

const SWAGGER_ENDPOINT = 'doc';
const YAML_CONFIG_FILENAME = '../doc/api.yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const file = await readFile(join(__dirname, YAML_CONFIG_FILENAME), 'utf8');
  const swaggerDocument: OpenAPIObject = YAML.load(file) as OpenAPIObject;

  SwaggerModule.setup(SWAGGER_ENDPOINT, app, swaggerDocument);

  const port = app.get(ConfigService).get<number>('PORT') || 4000;
  await app.listen(port, () => {
    console.log(`Application is listening on port: ${port}`);
    console.log(
      `Swagger is accessible at: http://localhost:${port}/${SWAGGER_ENDPOINT}`,
    );
  });
}
bootstrap();
