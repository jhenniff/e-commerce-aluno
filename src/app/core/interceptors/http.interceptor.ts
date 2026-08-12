import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs' ;
import {catchError, filter} from 'rxjs';
import {throwError} from 'rxjs';


export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  console.log('Interceptando requisição:', req.url);
  
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
        console.warn('Usuário nao autorizado!', error);   
      }
     if(error.status === 500){
        console.warn('Erro interno do servidor!', error);
     }
     return throwError(() =>error);
 

 } ),
  );

}; 
