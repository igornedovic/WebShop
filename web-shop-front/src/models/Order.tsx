import { User } from "./User";
import { OrderItem } from "./OrderItem";

export class Order {
  id: number;
  dateOfMaking: Date;
  deadine: Date;
  sumPrice: number;
  user: User | null;
  orderItems: OrderItem[] = new Array(300);
  status: string;

  constructor(
    id: number,
    dateOfMaking: Date,
    deadine: Date,
    sumPrice: number,
    user: User | null,
    orderItems: OrderItem[],
    status: string
  ) {
    this.id = id;
    this.dateOfMaking = dateOfMaking;
    this.deadine = deadine;
    this.sumPrice = sumPrice;
    this.user = user;
    this.orderItems = orderItems;
    this.status = status;
  }
}
