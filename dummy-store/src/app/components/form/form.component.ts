import { Component, output, inject, OnInit } from '@angular/core';
import 
{ FormGroup,
  FormControl,
  Validators,
  FormArray
}from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { NewProduct } from '../../shared/models/models';
import { StoreService } from '../../shared/services/products';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule]
})

export class FormComponent implements OnInit {
  formData = output<NewProduct | undefined>();
  service = inject(StoreService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  currentId: number = 0;
  isEdit: boolean = false;
  newProduct: NewProduct = {}
  editedProduct: NewProduct = {}

  form = new FormGroup({
    title: new FormControl <string>('',
    {
      validators: [Validators.required]
    }
   ),
    price: new FormControl <number>(0, {
      validators: [Validators.required]
    }),
    description: new FormControl <string>('', {
      validators: [Validators.required]
    }),
    categoryId: new FormControl <number>(1, {
      validators: [Validators.required]
    }),
    images: new FormArray([
      new FormControl("https://placeimg.com/640/480/any"),
      new FormControl("https://placeimg.com/640/480/any"),
      new FormControl("https://placeimg.com/640/480/any")
    ],
    {
      validators: [Validators.required]
    })
  })

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.currentId = Number(params.get('id'));
        if (params.has('id')) {
          this.isEdit = true;
          this.form.controls.description.disable();
          this.form.controls.images.disable();
          this.form.controls.categoryId.disable();
          const product = this.service.getProductById(this.currentId);
          if (product) {
            this.form.setValue(
              {
                title: product.title,
                price: product.price,
                description: product.description,
                categoryId: 1,
                images: product.images,
              }
            )
          }
        }else {
          this.isEdit = false;
        }
      }
    })
  }


  onSubmit() {
    if (this.form.valid){
      if (this.isEdit) {
        this.editedProduct.title = this.form.controls.title.value;
        this.editedProduct.price = this.form.controls.price.value;
        this.service.updateProductById(this.currentId,this.editedProduct).subscribe({
        complete:() => {
          console.log("succesfully updated product");
          this.router.navigate(['']);
        }
      })
      }else {
        this.newProduct.title = this.form.controls.title.value;
        this.newProduct.categoryId = this.form.controls.categoryId.value;
        this.newProduct.description = this.form.controls.description.value;
        this.newProduct.price = this.form.controls.price.value;
        this.newProduct.images = this.form.controls.images.value;
        this.service.createProduct(this.newProduct).subscribe({
        complete: ()=> {
          console.log("succesfully added product");
          this.router.navigate(['']);
        }
      })
      }
    }else {
      alert("Form Invalid");
    }
  }
}
