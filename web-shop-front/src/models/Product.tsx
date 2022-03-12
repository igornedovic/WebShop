import { Characteristics } from "./Characteristics";
import { Manufacturer } from "./Manufacturer";
import { ProductType } from "./ProductType";

export class Product {
  id: number | undefined;
  name: string;
  price: number;
  characteristics: Characteristics[] = new Array(300);
  manufacturerId: number;
  productTypeId: number;

  constructor(
    name: string,
    price: number,
    characteristics: Characteristics[],
    manufacturer: number,
    productType: number
  ) {
    this.name = name;
    this.price = price;
    this.characteristics = characteristics;
    this.manufacturerId = manufacturer;
    this.productTypeId = productType;
  }
}
