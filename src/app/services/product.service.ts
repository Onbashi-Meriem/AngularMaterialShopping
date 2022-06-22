import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/Product';
import { ResponseModel } from './response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: ProductModel[] = [];

  constructor(private httpClient: HttpClient) {}

  getProducts():Observable<ResponseModel> {
    const api = 'https://webapi.angulareducation.com/api/products/getlist';
    return this.httpClient.get<ResponseModel>(api)
  }
}
