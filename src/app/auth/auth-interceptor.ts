import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    req = req.clone({
        setHeaders: { 
            "Ancient-Auth": environment.auth,
        },
        
    });

    return next(req);
}