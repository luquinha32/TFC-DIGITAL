
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professor.html',
  styleUrl: './professor.css'
})
export class ProfessorComponent {

  professor = 'Ana Silva';
  secao = 'Painel';

  notificacoes = 3;
  mostrarNotificacoes = false;

  mensagem = '';

  constructor(private router: Router) {}

  navegar(secao: string): void {
    this.secao = secao;
    this.mensagem = '';
    this.mostrarNotificacoes = false;
  }

  abrirNotificacoes(): void {
    this.mostrarNotificacoes = !this.mostrarNotificacoes;
  }

  marcarNotificacoesLidas(): void {
    this.notificacoes = 0;
    this.mostrarNotificacoes = false;
  }

  verTrabalho(aluno: string): void {
    this.secao = 'Trabalhos acadêmicos';
    this.mensagem = `Consultando trabalho de ${aluno}.`;
  }

  salvarConfiguracoes(): void {
    this.mensagem = 'Configurações salvas com sucesso!';
  }

  sair(): void {
    localStorage.removeItem('tfc-perfil-acesso');
    this.router.navigate(['/login']);
  }

}
