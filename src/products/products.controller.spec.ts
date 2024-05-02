import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CheesesRepository } from './cheeses.repository';
import { CheeseColor } from './cheese-color.enum';
import { Cheese } from './cheese.entity';

const mockCheesesRepository = () => ({
  createCheese: jest.fn(),
  find: jest.fn().mockReturnValueOnce([
    {
      id: 1,
      name: 'Cheddar',
      description: 'Pretty good',
      image: 'https://example.com/cheddar.jpg',
      price: 12.99,
      color: CheeseColor.PALE_YELLOW,
    },
    {
      id: 2,
      name: 'Gouda',
      description: "It's alright",
      image: 'https://example.com/gouda.jpg',
      price: 10.5,
      color: CheeseColor.ORANGE,
    },
  ]),
});

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  let repository: CheesesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        { provide: CheesesRepository, useFactory: mockCheesesRepository },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
    repository = module.get<CheesesRepository>(CheesesRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('/GET getAllCheeses', () => {
  //   it('GET /all returns all products', async () => {
  //     const expectedCheeses: Cheese[] = [
  //       {
  //         id: '1',
  //         name: 'Cheddar',
  //         description: 'Pretty good',
  //         image: 'https://example.com/cheddar.jpg',
  //         price: 12.99,
  //         color: CheeseColor.PALE_YELLOW,
  //       },
  //       {
  //         id: '2',
  //         name: 'Gouda',
  //         description: "It's alright",
  //         image: 'https://example.com/gouda.jpg',
  //         price: 10.5,
  //         color: CheeseColor.ORANGE,
  //       },
  //     ];

  //     (service.getAllCheeses as jest.Mock).mockReturnValue(expectedCheeses);

  //     const result = await controller.getAllCheeses();

  //     expect(result).toEqual(expectedCheeses);
  //     expect(service.getAllCheeses as jest.Mock).toHaveBeenCalled();
  //   });
  // });
});
