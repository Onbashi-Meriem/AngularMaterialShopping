import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { BasketModel } from 'src/app/models/basket';
import { ProductModel } from 'src/app/models/Product';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productName: string = '';
  productList: ProductModel[] = [];
  basketList: BasketModel[] = [];
  total:number;

  displayedColumns: string[] = ['id', 'name', 'quantity', 'sum', 'islemler'];

  animal: string;
  name: string;

 

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private snackBarService: SnackBarService,
    private spinner:NgxSpinnerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProductList();
    this.getBasketList();
  }

  getProductList() {
    this.spinner.show();
    this.productService.getProducts().subscribe((res) => {
      this.productList = res.data;
      // console.log(res.data);
      this.spinner.hide();
    },(err)=>{
      this.spinner.hide();
    });
  }

  getBasketList() {
    this.total=0
    this.spinner.show();
    this.basketService.getList().subscribe(
      (res) => {
        this.basketList = res.data;
        this.spinner.hide();
        this.basketList.forEach((basket)=>{
          this.total+=basket.product.price*basket.quantity;
        })
      },
      (err) => {
        this.snackBarService.openSnackBar(err.message);
        this.spinner.hide();
      }
    );
  }

  addBasket(product: ProductModel, inputQuantity: HTMLInputElement) {
    if(product.inventoryQuantity<+inputQuantity.value){
      this.snackBarService.openSnackBar('Sepete eklenecek ürün adeti stoktan fazla olamaz')

      return
    }
    if(+inputQuantity.value<0){
      this.snackBarService.openSnackBar('Sepete eklenecek ürün adeti eksi bir deger olamaz')

      return
    }
    this.spinner.show();
    const basket = new BasketModel();
    basket.quantity = parseInt(inputQuantity.value);
    basket.productId = product.id;
    basket.product = product;
    this.basketService.addToBasket(basket).subscribe(
      (res) => {
        this.snackBarService.openSnackBar(res.message);
        this.getBasketList();
        this.getProductList();
        this.spinner.hide();
      },
      (err) => {
        this.snackBarService.openSnackBar(err.message);
        this.spinner.hide();
      }
    );
  }

  deleteBasket(basket: BasketModel) {
    this.spinner.show();
    this.basketService.deleteBasket(basket).subscribe(
      (res) => {
        this.snackBarService.openSnackBar(res.message);
        this.getBasketList();
        this.getProductList();
        this.spinner.hide();
      },
      (err) => {
        this.snackBarService.openSnackBar(err.message);
        this.spinner.hide();
      }
    );
  }

  updateBasket(basket:BasketModel,quantity:number){
   
    if(basket.quantity<1){
      this.deleteBasket(basket)
      return;
    }
    if(basket.product.inventoryQuantity-quantity<0){
      this.snackBarService.openSnackBar('Sepete eklenecek ürün adeti, ürünün stok adedinden fazla olamaz')
      return 
    }

    basket.quantity += quantity;
  
    this.spinner.show();
    this.basketService.updateBasket(basket).subscribe(
      (res) => {
        this.snackBarService.openSnackBar(res.message);
        this.getBasketList();
        this.getProductList();
        this.spinner.hide();
      },
      (err) => {
        this.snackBarService.openSnackBar(err.message);
        this.spinner.hide();
      }
    );

  }

  openDeleteDialog(basket: BasketModel): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '50%',
      data: basket
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result',result)
      if(result !==undefined){
        console.log("delete",result)
        this.deleteBasket(result)
      }
    });
  }

  openPaymentDialog(): void {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '50%',
      data: this.total
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result',result)
      if(result !==undefined){
        console.log("delete",result)
        this.deleteBasket(result)
      }
    });
  }

}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './deleteDialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(data:BasketModel){
    this.dialogRef.close(data);
  }
}

@Component({
  selector: 'dialog-payment-component',
  templateUrl: './paymentDialog.html',
})
export class PaymentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(){
    this.dialogRef.close();
  }
}