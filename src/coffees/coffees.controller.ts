import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiForbiddenResponse, ApiTags } from "@nestjs/swagger";
import { Protocol } from "src/common/decorators/protocol.decorator";
import { Public } from "src/common/decorators/public.decorator";
import { ParseIntPipe } from "src/common/pipes/parse-int/parse-int.pipe";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { CoffeesService } from "./coffees.service";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";

@ApiTags("coffees")
@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @ApiForbiddenResponse({ description: "Forbidden." })
  @Public()
  @Get()
  async findAll(
    @Protocol("https")
    protocol: string,
    @Query() paginationQuery: PaginationQueryDto
  ) {
    //Implementa interceptor de timeoutError await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(protocol);

    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    console.log(id);

    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateCoffeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.coffeesService.remove(id);
  }
}
