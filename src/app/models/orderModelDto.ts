import { OrderModel } from "./order";
import { PaymentModel } from "./payment";

export class OrderModelDto{
    payment:PaymentModel
    order:OrderModel
    total:number
}