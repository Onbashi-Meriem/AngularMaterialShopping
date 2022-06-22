import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productName: string = '';
  productList: ProductModel[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getList()
  }

  getList(){
    this.productService.getProducts().subscribe(res=>{
      this.productList=res.data
    })
    
  }
}
