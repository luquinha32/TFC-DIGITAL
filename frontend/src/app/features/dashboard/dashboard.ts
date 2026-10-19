
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Atividade {
  icone: string;
  titulo: string;
  descricao: string;
  data: string;
}

interface Arquivo {
  tipo: string;
  nome: string;
  detalhes: string;
  conteudo?: string;
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

  aluno = 'Marina Silva';
  email = 'marina@tfcdigital.edu.br';
  curso = 'Arquitetura e Urbanismo';

  area = 'ARQUITETURA';
  tituloTcc =
    'Habitação social e o direito à cidade: novas perspectivas urbanas';
  orientador = 'Prof. Augusto Lima';

  progresso = 72;
  etapasConcluidas = 3;

  mensagem = '';
  arquivoSelecionado: File | null = null;

  etapas = [
    'Projeto',
    'Pesquisa',
    'Redação',
    'Revisão',
    'Entrega'
  ];

  atividades: Atividade[] = [
    {
      icone: '✓',
      titulo: 'Capítulo 3 aprovado',
      descricao: 'Seu orientador aprovou a última versão.',
      data: 'Hoje'
    },
    {
      icone: '▤',
      titulo: 'Comentário do orientador',
      descricao: 'Revise as referências da página 42.',
      data: 'Ontem'
    },
    {
      icone: '⇧',
      titulo: 'Arquivo enviado',
      descricao: 'Registro de demonstração do sistema.',
      data: 'Recentemente'
    }
  ];

  arquivos: Arquivo[] = [
    {
      tipo: 'PDF',
      nome: 'TCC_Marina_v4.pdf',
      detalhes: 'Documento de demonstração',
      conteudo: 'Exemplo de documento TFC Digital.'
    },
    {
      tipo: 'DOC',
      nome: 'Referencias_revisadas.docx',
      detalhes: 'Documento de demonstração',
      conteudo: 'Exemplo de referências do TCC.'
    }
  ];

  constructor(private router: Router) {
    // Recupera os dados do perfil salvos neste navegador.
    if (typeof localStorage !== 'undefined') {
      const dados = localStorage.getItem('tfc-perfil');

      if (dados) {
        try {
          const perfil = JSON.parse(dados);

          this.aluno = perfil.aluno ?? this.aluno;
          this.email = perfil.email ?? this.email;
          this.curso = perfil.curso ?? this.curso;
        } catch {
          localStorage.removeItem('tfc-perfil');
        }
      }
    }
  }

  get iniciais(): string {
    return this.aluno
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(nome => nome.charAt(0).toUpperCase())
      .join('');
  }

  abrirSecao(nome: string): void {
  this.secao = nome;
  this.mensagem = '';
}

  sair(event?: Event): void {
    event?.preventDefault();
    this.router.navigate(['/login']);
  }

  selecionarArquivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    const arquivo = input.files?.[0] ?? null;

    this.arquivoSelecionado = null;
    this.mensagem = '';

    if (!arquivo) {
      return;
    }

    if (!arquivo.name.toLowerCase().endsWith('.pdf')) {
      this.mensagem = 'Selecione um arquivo com extensão PDF.';
      input.value = '';
      return;
    }

    if (arquivo.size > 30 * 1024 * 1024) {
      this.mensagem = 'O arquivo deve ter no máximo 30 MB.';
      input.value = '';
      return;
    }

    this.arquivoSelecionado = arquivo;
    this.mensagem = 'PDF selecionado com sucesso.';
  }

  entregarTrabalho(): void {
    this.abrirSecao('entregar');
  }

  enviarTrabalho(): void {
    if (!this.arquivoSelecionado) {
      this.mensagem = 'Selecione um arquivo PDF primeiro.';
      return;
    }

    const arquivo = this.arquivoSelecionado;

    // Demonstração local: registra o arquivo na lista da tela.
    this.arquivos.unshift({
      tipo: 'PDF',
      nome: arquivo.name,
      detalhes: this.formatarTamanho(arquivo.size),
      conteudo: 'Arquivo selecionado: ' + arquivo.name
    });

    this.atividades.unshift({
      icone: '⇧',
      titulo: 'Trabalho selecionado',
      descricao: arquivo.name,
      data: 'Agora'
    });

    this.mensagem =
      'Arquivo adicionado à lista nesta demonstração. ' +
      'Ele ainda não foi enviado ao servidor.';

    this.arquivoSelecionado = null;
  }

  private formatarTamanho(bytes: number): string {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  verTodasAtividades(event: Event): void {
    event.preventDefault();
    this.abrirSecao('atividades');
  }

  verArquivos(event: Event): void {
    event.preventDefault();
    this.abrirSecao('arquivos');
  }

  baixarArquivo(arquivo: Arquivo): void {
    // Baixa o conteúdo real somente para arquivos de demonstração.
    // Arquivos enviados pelo usuário exigem armazenamento no servidor.
    if (arquivo.conteudo) {
      const blob = new Blob(
        [arquivo.conteudo],
        { type: 'text/plain;charset=utf-8' }
      );

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = arquivo.nome.endsWith('.pdf')
        ? 'documento-demonstracao.txt'
        : 'arquivo-demonstracao.txt';

      link.click();
      URL.revokeObjectURL(url);
      return;
    }

    window.alert(
      'O arquivo original precisa estar armazenado no servidor para download.'
    );
  }

  salvarPerfil(): void {
    if (!this.aluno.trim() || !this.email.trim() || !this.curso.trim()) {
      this.mensagem = 'Preencha nome, e-mail e curso.';
      return;
    }

    this.aluno = this.aluno.trim();
    this.email = this.email.trim();
    this.curso = this.curso.trim();

    const perfil = {
      aluno: this.aluno,
      email: this.email,
      curso: this.curso
    };

    try {
      localStorage.setItem('tfc-perfil', JSON.stringify(perfil));
      this.mensagem = 'Perfil salvo com sucesso neste navegador.';
    } catch {
      this.mensagem = 'Não foi possível salvar os dados neste navegador.';
    }
  }

  salvarConfiguracoes(): void {
    this.salvarPerfil();
  }
}
