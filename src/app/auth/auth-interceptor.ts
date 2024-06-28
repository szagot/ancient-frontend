import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authHeader = 'Basic ' + btoa(environment.user + ':' + environment.pass);
    req = req.clone({
        setHeaders: { 
            Authorization: authHeader
        },
        
    });

    return next(req);
}