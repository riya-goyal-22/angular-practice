import 
    { ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot
    }
from "@angular/router";
import { inject } from "@angular/core";

import { StoreService } from "../services/products";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const service = inject(StoreService);
    if (service.isAdmin()) {
        return true;
    }
    router.navigate(['']);
    return false;
}