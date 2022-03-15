import { Characteristics } from "./Characteristics";
import { Manufacturer } from "./Manufacturer";
import { ProductType } from "./ProductType";

export class Product {
  id: number | null = null;
  name: string;
  price: number;
  characteristics: Characteristics[] = new Array(300);
  manufacturerId: number;
  manufacturer: Manufacturer | null = null;
  productTypeId: number;
  productType: ProductType | null = null;

  constructor(
    name: string,
    price: number,
    characteristics: Characteristics[],
    manufacturerId: number,
    productTypeId: number
  ) {
    this.name = name;
    this.price = price;
    this.characteristics = characteristics;
    this.manufacturerId = manufacturerId;
    this.productTypeId = productTypeId;
  }
}
