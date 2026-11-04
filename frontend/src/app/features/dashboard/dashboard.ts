
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Etapa {
  nome: string;
  concluida: boolean;
}

interface Arquivo {
  tipo: string;
  nome: string;
  detalhes: string;
  conteudo?: File;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {

  secao = 'visao-geral';

  aluno = {
    nome: 'Marina Silva',
    email: 'marina@tfcdigital.edu.br',
    curso: 'Arquitetura e Urbanismo'
  };

  nome = this.aluno.nome;
  email = this.aluno.email;
  curso = this.aluno.curso;

  area = 'ARQUITETURA';

  tituloTcc = 'Habitação social e o direito à cidade: novas perspectivas urbanas';

  orientador = 'Prof. Augusto Lima';

  progresso = 72;
  etapasConcluidas = 3;

  mensagem = '';

  arquivoSelecionado: File | null = null;

  etapas: Etapa[] = [
    { nome: 'Projeto', concluida: true },
    { nome: 'Pesquisa', concluida: true },
    { nome: 'Redação', concluida: true },
    { nome: 'Revisão', concluida: false },
    { nome: 'Entrega', concluida: false }
  ];

  arquivos: Arquivo[] = [
    {
      tipo: 'PDF',
      nome: 'Projeto_TCC.pdf',
      detalhes: 'Documento do projeto'
    },
    {
      tipo: 'DOCX',
      nome: 'Pesquisa_TCC.docx',
      detalhes: 'Documento de pesquisa'
    }
  ];

  configuracoes = {
    notificacoes: true,
    avisosEmail: true
  };

  constructor(private router: Router) {
    this.carregarPerfil();
  }

  get iniciais(): string {
    return this.aluno.nome
      .split(' ')
      .filter(parte => parte.length > 0)
      .map(parte => parte[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  abrirSecao(secao: string): void {
    this.secao = secao;
    this.mensagem = '';
  }

  sair(): void {
    this.router.navigate(['/login']);
  }

  selecionarArquivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    const arquivo = input.files?.[0];

    if (!arquivo) {
      this.arquivoSelecionado = null;
      return;
    }

    if (arquivo.type !== 'application/pdf' &&
        !arquivo.name.toLowerCase().endsWith('.pdf')) {
      this.mensagem = 'Selecione um arquivo PDF.';
      input.value = '';
      this.arquivoSelecionado = null;
      return;
    }

    if (arquivo.size > 30 * 1024 * 1024) {
      this.mensagem = 'O arquivo deve ter no máximo 30 MB.';
      input.value = '';
      this.arquivoSelecionado = null;
      return;
    }

    this.mensagem = '';
    this.arquivoSelecionado = arquivo;
  }

  entregarTrabalho(): void {
    this.abrirSecao('entregar');
  }

  enviarTrabalho(): void {
    if (!this.arquivoSelecionado) {
      this.mensagem = 'Selecione um arquivo antes de enviar.';
      return;
    }

    const arquivo = this.arquivoSelecionado;

    this.arquivos.unshift({
      tipo: 'PDF',
      nome: arquivo.name,
      detalhes: 'Documento enviado para avaliação',
      conteudo: arquivo
    });

    this.arquivoSelecionado = null;
    this.mensagem = 'Trabalho enviado com sucesso!';

    const input = document.getElementById('arquivoTcc') as HTMLInputElement | null;

    if (input) {
      input.value = '';
    }
  }

  verArquivos(): void {
    this.abrirSecao('arquivos');
  }

  baixarArquivo(arquivo: Arquivo): void {
    if (!arquivo.conteudo) {
      this.mensagem = 'O arquivo de exemplo não está disponível para download.';
      return;
    }

    const url = URL.createObjectURL(arquivo.conteudo);
    const link = document.createElement('a');

    link.href = url;
    link.download = arquivo.nome;
    link.click();

    URL.revokeObjectURL(url);
  }

  salvarPerfil(): void {
    this.atualizarDadosAluno();

    localStorage.setItem('tfc-perfil', JSON.stringify(this.aluno));

    this.mensagem = 'Perfil atualizado com sucesso!';
  }

  salvarConfiguracoes(): void {
    this.atualizarDadosAluno();

    localStorage.setItem('tfc-perfil', JSON.stringify(this.aluno));

    localStorage.setItem(
      'tfc-configuracoes',
      JSON.stringify(this.configuracoes)
    );

    this.mensagem = 'Configurações salvas com sucesso!';
  }

  private atualizarDadosAluno(): void {
    this.aluno.nome = this.nome;
    this.aluno.email = this.email;
    this.aluno.curso = this.curso;
  }

  private carregarPerfil(): void {
    const perfilSalvo = localStorage.getItem('tfc-perfil');

    if (perfilSalvo) {
      try {
        const perfil = JSON.parse(perfilSalvo);

        this.aluno = {
          ...this.aluno,
          ...perfil
        };

        this.nome = this.aluno.nome;
        this.email = this.aluno.email;
        this.curso = this.aluno.curso;

      } catch {
        console.error('Não foi possível carregar o perfil.');
      }
    }

    const configuracoesSalvas = localStorage.getItem('tfc-configuracoes');

    if (configuracoesSalvas) {
      try {
        this.configuracoes = {
          ...this.configuracoes,
          ...JSON.parse(configuracoesSalvas)
        };
      } catch {
        console.error('Não foi possível carregar as configurações.');
      }
    }
  }
}
