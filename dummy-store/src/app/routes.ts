import { Routes } from "@angular/router";

import { FormComponent } from "./components/form/form.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { AuthGuard } from "./shared/route.guards/auth.guard";
import { ExitGuard } from "./shared/route.guards/exit.guard";

export const routes:Routes=[
    {
        path: '',
        component: ProductListComponent
    },
    {
        path: 'product/add',
        component: FormComponent,
        canActivate: [AuthGuard],
        canDeactivate: [ExitGuard],
    },
    {
        path: 'product/edit/:id',
        component: FormComponent,
        canActivate: [AuthGuard]
    }
]