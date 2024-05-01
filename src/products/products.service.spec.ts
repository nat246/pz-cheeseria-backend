import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CheesesRepository } from './cheeses.repository';
import { CheeseColor } from './cheese-color.enum';
import { CreateCheeseDto } from './dto/create-cheese.dto';

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

describe('ProductsService', () => {
  let service: ProductsService;
  let cheesesRepository: CheesesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: CheesesRepository, useFactory: mockCheesesRepository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    cheesesRepository = module.get<CheesesRepository>(CheesesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCheese', () => {
    it('creates a cheese object and returns it', async () => {
      const createCheeseDto: CreateCheeseDto = {
        name: 'Cheddar',
        description: 'Pretty good',
        image: 'https://example.com/cheddar.jpg',
        price: 10.5,
        color: CheeseColor.PALE_YELLOW,
      };

      const expectedCheese = { id: 1, ...createCheeseDto };
      (cheesesRepository.createCheese as jest.Mock).mockReturnValueOnce(
        expectedCheese,
      );

      const cheese = await service.createCheese(createCheeseDto);

      expect(cheesesRepository.createCheese).toHaveBeenCalledWith(
        createCheeseDto,
      );
      expect(cheese).toEqual(expectedCheese);
    });

    // creates cheese with null name and returns bad request HTTP 400
    // creates cheese with null description and returns bad request HTTP 400
    // creates cheese with null image and returns bad request HTTP 400
    // creates cheese with null price and returns bad request HTTP 400
    // creates cheese with null color and returns bad request HTTP 400

    // creates cheese with non-number price and returns bad request HTTP 400
    // creates cheese with more than 2 digit number on price and returns bad request HTTP 400
    // creates cheese with color and returns bad request HTTP 400
  });

  describe('getAllCheeses', () => {
    it('calls CheesesRepository.find and returns the result', async () => {
      const cheeses = await service.getAllCheeses();

      expect(cheesesRepository.find).toHaveBeenCalled();
      expect(cheeses).toEqual([
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
      ]);
    });
  });
});
