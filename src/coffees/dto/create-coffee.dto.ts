import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCoffeeDto {
  @ApiProperty({ description: "The name of a coffee" })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: "The brand of a coffee" })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flavors: string[];

  @IsNumber()
  readonly price: number;
}
