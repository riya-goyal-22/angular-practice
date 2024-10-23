import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { StoreService } from '../../shared/services/products';
import { Product } from '../../shared/models/models';
import { ProductComponent } from '../product/product.component'
import { CustomDirective } from '../../shared/directives/custom-directive.directive';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  standalone: true,
  imports: [RouterLink, ProductComponent, CustomDirective],
})

export class ProductListComponent implements OnInit {

  service = inject(StoreService);
  currentProductId?: number;

  
  ngOnInit() {
    this.service.getAllProducts().subscribe({
      next: (response: Product[])=> 
        this.service.products.set(response),
      error: (error: Error)=>
        console.log(error)
    })
  }

  toggle() {
    console.log("toggle clicked");
    this.service.isAdmin.set(!this.service.isAdmin())
  }
}





  

