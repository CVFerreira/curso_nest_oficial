import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpsExceptionFilter } from "./common/filters/https-exception/https-exception.filter";
import { TimeoutInterceptor } from "./common/interceptors/timeout/timeout.interceptor";
import { WrapResponseInterceptor } from "./common/interceptors/wrap-response/wrap-response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  app.useGlobalFilters(new HttpsExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor()
  );
  await app.listen(3000);
}
bootstrap();
