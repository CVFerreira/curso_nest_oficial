import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "db/data-source";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoffeesModule } from "./coffees/coffees.module";

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), CoffeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
