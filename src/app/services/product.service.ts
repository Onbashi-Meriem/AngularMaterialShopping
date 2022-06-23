import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/Product';
import { ResponseModel } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: ProductModel[] = [];

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private httpClient: HttpClient
  ) {}

  getProducts(): Observable<ResponseModel<ProductModel>> {
    const api = this.apiUrl + 'products/getlist';
    console.log('apiUrl', this.apiUrl);
    console.log('api', api);
    return this.httpClient.get<ResponseModel<ProductModel>>(api);
  }
}
