import { Component, inject } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

// import { AuthService } from '../../../core/services/auth.service';
import{AuthFacade} from '../../../core/facades/auth.facade';
import{CarrinhoFacade} from '../../../core/facades/carrinho.facade';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'Mercado Liso'
  private carrinhoFacade = inject(CarrinhoFacade);
  quantidadeCarrinho = this.carrinhoFacade.quantidadeCarrinho;

  private authFacade = inject(AuthFacade);
  usuarioLogado = this.authFacade.usuarioLogado;
  usuarioAtual = this.authFacade.usuarioAtual;

  private router = inject(Router)

   

  sair() {
    this.authFacade.sair();
    this.router.navigateByUrl('/login');


  }
}
