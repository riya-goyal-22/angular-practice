import 
    { HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest
    }
from "@angular/common/http";
import { Observable, tap } from "rxjs";


export const ResponseInterceptor: HttpInterceptorFn =
(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    console.log("request arrived");
    return next(req).pipe(
        tap((event: HttpEvent<any>) => {
            if(event) {
                console.log("response caught");
                console.log("event:",event);
            }
        })
    );
}

