import { ProductModel } from "./Product";

export class BasketModel{
  id:number;
  productId:number;
  quantity:number;
  product:ProductModel
}