import { ProductService } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    const productObservable = this.productService.getProducts();
    productObservable.subscribe(
      (data) => {
        console.log('正常：' + data);
        this.products = data;
      },
      (err) => { console.log('エラー：' + err) },
      () => { console.log('完了') }
    )
  }




}
