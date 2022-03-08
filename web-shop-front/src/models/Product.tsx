import { Characteristics } from "./Characteristics";
import { Manufacturer } from "./Manufacturer";
import { ProductType } from "./ProductType";

export class Product {
  id: number | undefined;
  name: string;
  price: number;
  characteristics: Characteristics[] = new Array(300);
  manufacturer: Manufacturer;
  productType: ProductType;

  constructor(
    name: string,
    price: number,
    characteristics: Characteristics[],
    manufacturer: Manufacturer,
    productType: ProductType
  ) {
    this.name = name;
    this.price = price;
    this.characteristics = characteristics;
    this.manufacturer = manufacturer;
    this.productType = productType;
  }
}
