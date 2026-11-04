import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aluno.html',
  styleUrl: './aluno.css'
})
export class AlunoComponent {

  nome = 'Marina Silva';
  semestre = '2026.2';
  secao = 'Início';

  arquivoSelecionado: File | null = null;
  mensagem = '';

  constructor(private router: Router) {}

  navegar(secao: string): void {
    this.secao = secao;
    this.mensagem = '';
  }

  selecionarArquivo(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.arquivoSelecionado = input.files[0];
      this.mensagem = 'Arquivo selecionado: ' + this.arquivoSelecionado.name;
    }
  }

  entregarTrabalho(): void {
    if (!this.arquivoSelecionado) {
      this.mensagem = 'Selecione um arquivo antes de entregar.';
      return;
    }

    this.mensagem = 'Arquivo preparado para entrega: ' +
      this.arquivoSelecionado.name;
  }

  sair(): void {
    this.router.navigate(['/login']);
  }
}