import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, throwError } from 'rxjs'

import { NewProduct, Product } from "../models/models";
import 
    {
        DeleteError,
        GetError,
        PostError,
        PutError,
        Url
    }
from "../ui-messages/ui.messages";

@Injectable({
    providedIn:'root'
})

export class StoreService {
    httpClient = inject(HttpClient);
    isAdmin = signal<boolean>(false);
    isAlert = signal<boolean>(false);
    isConfirm = signal<boolean>(false);
    products = signal<Product[]|undefined>(undefined)

    ngAfterViewInit() {
        console.log(this.products())
    }

    getAllProducts() {
        return this.getMethod(Url, GetError)
    }

    updateProductById(id: number, body: NewProduct) {
        return this.updateMethod(`${Url}/${id}`, PutError, body)
    }

    getProductById(id: number): Product|null {
        console.log(this.products())
        let products = this.products()?.filter((product) => {
            return product.id===id
        })
        if (products) {
            return products[0]
        }
        return null
    }

    createProduct(body: NewProduct) {
        return this.postMethod(Url, PostError, body)
    }

    deleteProductById(id: number) {
        return this.deleteMethod(`${Url}/${id}`, DeleteError)
    }

    getMethod(url: string, errorMessage: string) {
        return this.httpClient
        .get<Product[]>(url)
        .pipe(
            catchError((error)=>
                throwError(()=>new Error(errorMessage)
            ))
        )
    }

    private deleteMethod(url: string, errorMessage: string) {
        return this.httpClient
        .delete<Boolean>(url)
        .pipe(
            catchError((error)=>
                throwError(() => new Error(errorMessage)
            ))
        )
    }

    private postMethod(url: string, errorMessage: string, body: NewProduct) {
        return this.httpClient
        .post<Boolean>(url,body)
        .pipe(
            catchError((error: Error)=>
                throwError(() => new Error(errorMessage)
            ))
        )
    }

    private updateMethod(url: string, errorMessage: string, body: NewProduct) {
        return this.httpClient
        .put<Boolean>(url,body)
        .pipe(
            catchError((error: Error)=>
                throwError(() => new Error(errorMessage)
            ))
        )
    }
} 