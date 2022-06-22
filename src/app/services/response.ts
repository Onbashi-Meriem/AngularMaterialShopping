import { ProductModel } from "../models/Product";

export class ResponseModel{
    data:ProductModel[]
    message:string
    success:boolean
}