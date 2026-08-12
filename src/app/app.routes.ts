import { Routes } from "@angular/router";
import { authGuard } from "./core/auth.guard";
import { Checkout } from "./features/checkout/checkout/checkout";

export const routes: Routes = [
   {
    path:'', //! router pare a raiz localhost:4200/
    loadComponent: () => 
        import('./features/home/home/home')
    .then((m) => m.Home),
   },
   {
    path:'produtos',
    loadComponent: () => 
        import('./features/produtos/lista-produtos/lista-produtos')
    .then((m) => m.ListaProdutos),
   },
   {
    path:'carrinho', 
    canActivate: [ authGuard ],
    loadComponent: () => 
        import('./features/carrinho/carrinho/carrinho')
    .then((m) => m.Carrinho),
   },
   {

    path:'checkout',
loadComponent:() =>
    import('./features/checkout/checkout/checkout').then((m)=>Checkout),


   },
   {
    path: '**',
    redirectTo: '',
   },
];