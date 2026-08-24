import { inject} from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthFacade } from '../facades/auth.facade';
import { Router } from "@angular/router";

export const adminGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authFacade = inject(AuthFacade);

    if(!authFacade.usuarioLogado()){
        return router.createUrlTree(['/login']);
    }

    if(!authFacade.admin()){
        return router.createUrlTree(['/acesso-negado']);
}
return true;
};
