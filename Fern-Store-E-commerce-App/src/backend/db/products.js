import { v4 as uuid } from "uuid";
import {
  ArecaPalm,
  Alovera,
  BetelLeaf,
  CalatheaFreddie,
  Leafy,
  MoneyPlant,
  RubberPlant,
  FiddleLeaf,
  SnakePlant,
  JadePlant,
  ChineseMoneyPlant,
  ZZ
} from '../../assets/index'; 

export const products = [
  {
    _id: uuid(),
    title: "Betel Leaf Plant",
    productType: "Indoor",
    rating: 4,
    price: 299,
    img: BetelLeaf,
    discount: 49,
    discountPercentage: 20,
    categoryName: "Indoor",
    productDescription: "Betel leaf has shiny heart-shaped leaves with small white flower spikes. It prefers a rich, well-drained soil with partial shade"
  },
  {
    _id: uuid(),
    title: "Calathea Freddie",
    productType: "Indoor",
    rating: 2,
    price: 499,
    img: CalatheaFreddie,
    discount: 29,
    discountPercentage: 10,
    categoryName: "Indoor",
    productDescription: 'As for its leaves, Calathea Freddie boast of a shiny, elongated, and light green color with zebra stripes and borders in darker shades of green.'
  },
  {
    _id: uuid(),
    title: "Leafy Plant",
    productType: "Indoor",
    rating: 3,
    price: 399,
    img: Leafy,
    discount: 129,
    discountPercentage: 35,
    categoryName: "Indoor",
  },
  {
    _id: uuid(),
    title: "ZZ Plant - Medium",
    productType: "Air Purifier",
    rating: 2,
    price: 599,
    img: ZZ,
    discount: 99,
    discountPercentage: 7,
    categoryName: "Air Purifier",
    productDescription: "The ZZ plant is an easy to grow and care for air purifier plant that displays small glossy leaves on stems which can grow up to 3 ft long indoors."
  },
  {
    _id: uuid(),
    title: "Money Plant",
    productType: "Air Purifier",
    rating: 3,
    price: 299,
    img: MoneyPlant,
    discount: 29,
    discountPercentage: 10,
    categoryName: "Air Purifier",
    productDescription: "Epipremnum aureum is the scientific name of this plant. The species is a popular houseplant in temperate regions. The plant has a multiple common names including golden pothos, money plant, silver vine."
  }, 
  
  {
    _id: uuid(),
    title: "Rubber Plant",
    productType: "Air Purifier",
    rating: 4,
    price: 840,
    img: RubberPlant,
    discount: 19,
    discountPercentage: 4,
    categoryName: "Air Purifier",
    productDescription: "The broad and shiny green leaves of a Rubber Plant are a head turner. The Rubber Plant looks stunning when used as a centre piece on your living room table, on a windowsill or on a shelf for home decor"
  },
  {
    _id: uuid(),
    title: "Fiddle Leaf Fig Plant",
    productType: "Low Maintenance",
    rating: 5,
    price: 1299,
    img: FiddleLeaf,
    discount: 99,
    discountPercentage: 20,
    categoryName: "Low Maintenance",
    productDescription: "The fiddle-leaf fig (Ficus lyrata) is a popular indoor famous for it's very large, dark green heavily veined and glossy leaves that grow upright on a sleek trunk. The leaves resemble the shape of a violin (fiddle)."
  },
  {
    _id: uuid(),
    title: "Aloe Blizzard Plant",
    productType:"Low Maintenance",
    rating: 2,
    price: 399,
    img: Alovera,
    discount: 19,
    discountPercentage: 12,
    categoryName: "Low Maintenance",
    productDescription: "If you are planning to add this wonderful, multitasking succulent to your indoor jungle, we suggest teaming it up with the. The erect, dense, and fleshy leaves of the Aloe Blizzard can enhance home decor of your living room, balcony, shelf or your centre table. The Aloe Vera is also a great bedroom plant!"
  },
  {
    _id: uuid(),
    title: "Snake Plant",
    productType: "Low Maintenance",
    rating: 3,
    price: 599,
    img: SnakePlant,
    discount: 49,
    discountPercentage: 20,
    categoryName: "Low Maintenance",
    productDescription: 'EASY TO GROW: Snake plants are one of the simplest plants to grow in an indoor setting. The snake plant tolerates any light level or inconsistent watering - it practically thrives on neglect! Freshen up your space by planting this sansevieria plant live indoors. Comes in a 6" pot.'
  },
  {
    _id: uuid(),
    title: "Jade Plant",
    productType: "Low Maintenance",
    rating: 4,
    price: 450,
    img: JadePlant,
    discount: 50,
    discountPercentage: 22,
    categoryName: "Low Maintenance",
    productDescription: "Crassula green mini or Jade Plant is easy to care for and can survive extended periods of neglect making it a perfect plant for home decor."
  },
  {
    _id: uuid(),
    title: "Chinese Money Plant",
    productType: "Indoor",
    rating: 2,
    price: 320,
    img: ChineseMoneyPlant,
    discount: 20,
    discountPercentage: 20,
    categoryName: "Indoor",
    productDescription: "Chinese money plant requires bright light, with no direct sunlight,Scientific name of Pilea peperomioides."
  },
  {
    _id: uuid(),
    title: "Areca Palm Plant",
    productType: "Indoor",
    rating: 5,
    price: 690,
    img: ArecaPalm,
    discount: 20,
    discountPercentage: 18,
    categoryName: "Indoor",
    productDescription: "Air Purifier, Low Maintenance and easy to grow plant. These are one of the most attractive, durable and tolerant houseplants."
  },
  
];
