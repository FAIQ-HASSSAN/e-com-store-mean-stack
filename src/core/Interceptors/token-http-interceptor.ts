import { HttpInterceptorFn } from "@angular/common/http"

export const authenticationInterceptor:HttpInterceptorFn =(req,next)=>{

      const token = localStorage.getItem('user_token');
      if(token){
        const modifiedReq = req.clone({
            headers : req.headers.set('authorization',token)
          });
          return next(modifiedReq);
      }else{
          return next(req);
      }
}