
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  telaInicial = true;

  perfil: 'aluno' | 'professor' = 'aluno';
  email = '';
  senha = '';
  mostrarSenha = false;
  lembrarDeMim = false;
  mensagem = '';

  constructor(private router: Router) {}

  abrirAcesso(perfil: 'aluno' | 'professor'): void {
    this.perfil = perfil;
    this.mensagem = '';
    this.telaInicial = false;
  }

  voltarInicio(): void {
    this.telaInicial = true;
    this.mensagem = '';
    this.senha = '';
  }

  alternarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }

  atualizarPerfil(): void {
    this.mensagem = '';
  }

  entrar(): void {
    this.mensagem = '';

    if (!this.email.trim() || !this.senha.trim()) {
      this.mensagem = 'Preencha seu e-mail e sua senha.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.mensagem = 'Digite um e-mail válido.';
      return;
    }

    localStorage.setItem('tfc-perfil-acesso', this.perfil);

    if (this.lembrarDeMim) {
      localStorage.setItem('tfc-email', this.email);
    } else {
      localStorage.removeItem('tfc-email');
    }

    if (this.perfil === 'professor') {
      this.router.navigate(['/professor']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  esqueciSenha(event: Event): void {
    event.preventDefault();

    const email = window.prompt('Digite seu e-mail institucional:');

    if (email && email.trim()) {
      window.alert(
        'Entre em contato com o suporte acadêmico para recuperar sua senha.'
      );
    }
  }

  abrirAjuda(): void {
    window.alert('Suporte acadêmico: suporte@tfcdigital.edu.br');
  }
}
