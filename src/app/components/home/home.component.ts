import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BasketModel } from 'src/app/models/basket';
import { ProductModel } from 'src/app/models/Product';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productName: string = '';
  productList: ProductModel[] = [];
  basketList: BasketModel[] = [];

  displayedColumns: string[] = ['id', 'name', 'quantity', 'sum', 'islemler'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProductList();
    this.getBasketList();
  }

  openSnackBar(message: string ) {
    this._snackBar.open(message, 'Kapat', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:2000,
    });
  }

  getProductList() {
    this.productService.getProducts().subscribe((res) => {
      this.productList = res.data;
      console.log(res.data);
    });
  }

  getBasketList() {
    this.basketService.getList().subscribe(
      (res) => {
        this.basketList = res.data;
      },
      (err) => {
        this.openSnackBar(err.message);
      }
    );
  }

  addBasket(product: ProductModel, inputQuantity: HTMLInputElement) {
    const basket = new BasketModel();
    basket.quantity = parseInt(inputQuantity.value);
    basket.productId = product.id;
    basket.product = product;
    this.basketService.addToBasket(basket).subscribe(
      (res) => {
        this.openSnackBar(res.message);
        this.getBasketList();
        this.getProductList();
      },
      (err) => {
        this.openSnackBar(err.message);
      }
    );
  }

  deleteBasket(basket: BasketModel) {
    this.basketService.deleteBasket(basket).subscribe(
      (res) => {
        this.openSnackBar(res.message);
        this.getBasketList();
      },
      (err) => {
        this.openSnackBar(err.message);
      }
    );
  }
}
