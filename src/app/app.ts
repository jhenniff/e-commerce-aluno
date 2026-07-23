import { UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LowerCasePipe } from '@angular/common'; 
import { usuarioLogado, login, logout } from './core/auth';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, UpperCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce-aluno');
  nomeLoja ='Mercado Liso';
  usuarioLogado = usuarioLogado;
  login = login;
  logout = logout;
}
