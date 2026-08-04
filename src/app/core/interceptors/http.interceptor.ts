import {HttpInterceptorFn} from "@angular/common/http";
import {tap} from "rxjs" ;
import {catchError} from "rxjs";
import {throwError} from "rxjs";


export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  console.log('Interceptando requisição HTTP:', req.url);
  
  const token = 'fake-token-jwt'; 
  
  const novaReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(novaReq).pipe(
    tap({
      next: (event) => console.log('Responde: ', event),
      error: (error) => console.error('Erro na requisição:', error),
    }),
     catchError((error) => {
    
        console.error('Erro de requisição global:', error);
    if (error.status === 401) {
        console.error('Erro de autenticação de usuário!', error);   
      }
     if(error.status === 500){
        console.warn('Erro interno do servidor!');
     }
     return throwError(() => new error);
 

 } )
  );

}; 
