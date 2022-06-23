import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketModel } from '../models/basket';
import { ResponseModel, ResponseWithoutData } from '../models/response';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(@Inject('apiUrl') private apiUrl: string, private httpClient: HttpClient) { }

  getList():Observable<ResponseModel<BasketModel>>{
    const api=this. apiUrl+"baskets/getlist"

    return this.httpClient.get<ResponseModel<BasketModel>>(api)
  }

  addToBasket(basket: BasketModel):Observable<ResponseWithoutData>{
    const api=this.apiUrl+"baskets/add"

    return this.httpClient.post<ResponseWithoutData>(api,basket)
  }

  deleteBasket(basket: BasketModel):Observable<ResponseWithoutData>{
    const api=this.apiUrl+'baskets/delete'

    return this.httpClient.post<ResponseWithoutData>(api,basket)
  }
}
