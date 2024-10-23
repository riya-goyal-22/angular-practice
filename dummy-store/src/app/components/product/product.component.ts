import { Component,inject,input,output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { StoreService } from '../../shared/services/products';
import { CustomPipe } from '../../shared/pipes/pipes'
import { CustomDirective } from '../../shared/directives/custom-directive.directive';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  standalone: true,
  imports: [RouterLink, CustomPipe, CustomDirective]
})

export class ProductComponent {
  title = input.required<string>();
  price = input.required<number>();
  image = input.required<string>();
  id = input.required<number>();
  service = inject(StoreService);
  router = inject(Router);

  
  onDelete() {
    this.service.deleteProductById(this.id()).subscribe({
      next: () => {
        const confirmation = window.confirm('Are you sure you want to delete')
        // this.service.isAlert.set(true);
        if (confirmation){
          let newProducts = this.service.products()?.filter((product) => {
            return product.id != this.id();
          })
          this.service.products.update((current)=>newProducts)
        } else {
          return
        }
      },
      error: (error:Error) => console.log(error),
    });
  }
}
