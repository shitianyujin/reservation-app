import { ProductService } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute,
    private productService: ProductService) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      console.log(params);
      // this.product = this.productService.getProductById(params.get('productId')!);
      const productObservable = this.productService.getProductById(params.get('productId')!);
      productObservable.subscribe(
        (data) => {
          console.log(data);
          this.product = data;
        },
        (err) => { console.log('エラー：' + err) }
      )
    })
  }

}
