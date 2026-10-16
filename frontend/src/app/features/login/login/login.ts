
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
  perfil: 'aluno' | 'professor' = 'aluno';

  email = '';
  senha = '';
  mostrarSenha = false;
  lembrarDeMim = false;
  mensagem = '';

  constructor(private router: Router) {}

  atualizarPerfil(): void {
    this.mensagem = '';
  }

  alternarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }

  entrar(): void {
    this.mensagem = '';

    if (!this.email.trim() || !this.senha) {
      this.mensagem = 'Preencha seu e-mail e sua senha.';
      return;
    }

    // Demonstração de navegação.
    // Em produção, valide as credenciais no backend primeiro.
    this.router.navigate(['/dashboard']);
  }

  esqueciSenha(event: Event): void {
    event.preventDefault();

    const email = window.prompt(
      'Digite seu e-mail para solicitar a recuperação da senha:'
    );

    if (email && email.trim()) {
      window.alert(
        'Solicitação registrada apenas para demonstração. ' +
        'A recuperação real precisa ser conectada ao backend.'
      );
    }
  }

  abrirAjuda(): void {
    window.alert(
      'Precisa de ajuda? Entre em contato com o suporte acadêmico.'
    );
  }
}
