import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authHeader = 'Basic ' + btoa(environment.user + ':' + environment.pass);
    req = req.clone({
        setHeaders: { 
            AncientAuth: 'YW5jaWVudDo0bkMxM250ITIwMjQ',
        },
        
    });

    return next(req);
}