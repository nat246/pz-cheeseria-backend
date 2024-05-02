import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheeseColor } from 'src/products/cheese-color.enum';
import { Cheese } from 'src/products/cheese.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheeseSeederService {
  constructor(
    @InjectRepository(Cheese)
    private cheeseRepository: Repository<Cheese>,
  ) {}

  async seedData(): Promise<void> {
    const cheeses: Cheese[] = [
      {
        id: 'adelost',
        name: 'Adelost',
        description:
          "Adelost is a Swedish blue cheese made from pasteurized cow's milk. The blue-grey veins running throughout are a distinctive feature of the cheese. It has a sharp, salty and tangy flavour. The ripening process is for two to three months. The cheese comes in a drum shape with a rind of pale cream, which is lightly dotted with moulds.",
        image: 'https://www.cheese.com/media/img/cheese/Adelost_QnxYLx6.jpg',
        price: 58.46,
        color: CheeseColor.BLUE,
      },
      {
        id: 'blue-castello',
        name: 'Blue Castello',
        description:
          "In the 1960s, one of the oldest cheese producing companies in Denmark - Tholstrup Cheese Company, initially prepared Castello Blue cheese. This soft cheese made from cow's milk has a mild spicy flavour and smooth and rich texture.",
        image: 'https://www.cheese.com/media/img/cheese/CastelloBlueCheese.jpg',
        price: 68.99,
        color: CheeseColor.BLUE,
      },
      {
        id: 'barricato-al-pepe',
        name: 'Barricato al Pepe',
        description: `Barricato al Pepe cheese is produced by Sergio, the renowned maker of Sottocenere®. This pasteurized cow's milk cheese hails from Veneto, Italy. The term "Barricato" refers to the unique ageing process involving barrels. After 90-day ageing, the wheels are encrusted with black pepper and carefully stored in wine barrels for the final maturation phase. The addition of black peppercorns imparts a lively kick to the cheese without overshadowing its buttery texture. The traces of wine residue from the barrels contribute a subtle fruity note, resulting in a well-rounded and full flavour profile.`,
        image: 'https://www.cheese.com/media/img/cheese/Barricato_al_Pepe.jpg',
        price: 33.77,
        color: CheeseColor.IVORY,
      },
      {
        id: 'geitost',
        name: 'Geitost',
        description: `Geitost, also known as Brunost or Gjetost, is a cheese typically made with whey, milk, and/or cream. The cheese stands out due to its unique caramelized flavour. Geitost is made from a combination of cow's milk and goat's milk, or purely from goat's milk. The production process involves slowly simmering the milk, which causes the sugars to caramelize, giving the cheese its distinctive sweet and slightly tangy taste. The result is a dense, fudgy texture with pale caramel to deep brown colour. This cheese can be eaten on bread or crackers. It can also be paired with apples or pears.`,
        image: 'https://www.cheese.com/media/img/cheese/Geitost.jpg',
        price: 95.36,
        color: CheeseColor.BROWN,
      },
      {
        id: 'cheshire',
        name: 'Cheshire',
        description: `Cheshire (Appleby's Cheshire), a British cheese hailing from the English county of Cheshire and its neighbouring regions  - Denbighshire, Flintshire, Shropshire, and Staffordshire - is made using raw cow's milk and animal rennet. The addition of Annatto imparts a warm sunrise colour to the cheese. The maturation process takes approximately 12 weeks, resulting in a cheese with delightful, grassy, and piquant flavours. This traditional British cheese offers an earthy complexity and a lingering subtleness. For a perfect pairing, enjoy it with fresh fruit or a crisp sparkling cider.`,
        image:
          'https://www.cheese.com/media/img/cheese-suggestion/applebyscheshire.jpg',
        price: 1,
        color: CheeseColor.ORANGE,
      },
    ];

    for (const cheese of cheeses) {
      await this.cheeseRepository.save(cheese);
    }
  }
}
