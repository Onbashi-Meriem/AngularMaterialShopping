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
import { NgxSpinnerService } from 'ngx-spinner';

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
    private _snackBar: MatSnackBar,
    private spinner:NgxSpinnerService
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
    this.spinner.show();
    this.productService.getProducts().subscribe((res) => {
      this.productList = res.data;
      console.log(res.data);
      this.spinner.hide();
    });
  }

  getBasketList() {
    this.spinner.show();
    this.basketService.getList().subscribe(
      (res) => {
        this.basketList = res.data;
        this.spinner.hide();
      },
      (err) => {
        this.openSnackBar(err.message);
        this.spinner.hide();
      }
    );
  }

  addBasket(product: ProductModel, inputQuantity: HTMLInputElement) {
    this.spinner.show();
    const basket = new BasketModel();
    basket.quantity = parseInt(inputQuantity.value);
    basket.productId = product.id;
    basket.product = product;
    this.basketService.addToBasket(basket).subscribe(
      (res) => {
        this.openSnackBar(res.message);
        this.getBasketList();
        this.getProductList();
        this.spinner.hide();
      },
      (err) => {
        this.openSnackBar(err.message);
        this.spinner.hide();
      }
    );
  }

  deleteBasket(basket: BasketModel) {
    this.spinner.show();
    this.basketService.deleteBasket(basket).subscribe(
      (res) => {
        this.openSnackBar(res.message);
        this.getBasketList();
        this.spinner.hide();
      },
      (err) => {
        this.openSnackBar(err.message);
        this.spinner.hide();
      }
    );
  }
}
