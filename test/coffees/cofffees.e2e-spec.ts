import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import * as request from "supertest";
import { CoffeesModule } from "../../src/coffees/coffees.module";
import { CreateCoffeeDto } from "../../src/coffees/dto/create-coffee.dto";
import { UpdateCoffeeDto } from "../../src/coffees/dto/update-coffee.dto";

describe("[Feature] Coffees - /coffees", () => {
  const coffee = {
    title: "coffee",
    brand: "buddy brew",
    flavors: ["chocolat", "roses"],
    price: 25,
  };
  const itemId = 1;

  dotenv.config({ path: ".env.test" });
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: "postgres",
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT),
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_DATABASE,
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
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
    await app.init();
  });

  it("Create [POST /]", () => {
    return request(app.getHttpServer())
      .post("/coffees")
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedCoffee = expect.objectContaining({
          ...coffee,
          flavors: expect.arrayContaining(
            coffee.flavors.map((name) => expect.objectContaining({ name }))
          ),
        });

        expect(body).toEqual(expectedCoffee);
      });
  });

  it("Get all [GET /]", () => {
    return request(app.getHttpServer())
      .get("/coffees")
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
      });
  });

  it("Get one [GET /:id]", () => {
    return request(app.getHttpServer())
      .get(`/coffees/${itemId}`)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        const expectedCoffee = expect.objectContaining({
          ...coffee,
          flavors: expect.arrayContaining(
            coffee.flavors.map((name) => expect.objectContaining({ name }))
          ),
        });
        expect(body).toEqual(expectedCoffee);
        expect(body.id).toBe(itemId);
      });
  });
  it("Update one [PATCH /:id]", () => {
    const coffeeUpdate = {
      title: "coffee",
      brand: "buddy brew",
      flavors: ["rum", "oak", "vanilla"],
      price: 50,
    };
    return request(app.getHttpServer())
      .patch(`/coffees/${itemId}`)
      .send(coffeeUpdate as UpdateCoffeeDto)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        const expectedCoffee = expect.objectContaining({
          ...coffeeUpdate,
          flavors: expect.arrayContaining(
            coffeeUpdate.flavors.map((name) =>
              expect.objectContaining({ name })
            )
          ),
        });
        expect(body).toEqual(expectedCoffee);
        expect(body.id).toBe(itemId);
      });
  });
  it("Delete one [DELETE /:id]", () => {
    return request(app.getHttpServer())
      .delete(`/coffees/${itemId}`)
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
