
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Trabalho {
  titulo: string;
  aluno: string;
  curso: string;
  categoria: string;
  descricao: string;
  data: string;
  palavrasChave: string;
}

@Component({
  selector: 'app-visitante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visitante.html',
  styleUrl: './visitante.css'
})
export class VisitanteComponent {

  pesquisa = '';
  categoriaSelecionada = 'Todos';
  trabalhoSelecionado: Trabalho | null = null;

  categorias = [
    'Todos',
    'Arquitetura',
    'Tecnologia',
    'Administração',
    'Saúde',
    'Educação'
  ];

  trabalhos: Trabalho[] = [
    {
      titulo: 'Habitação social e o direito à cidade',
      aluno: 'Marina Silva',
      curso: 'Arquitetura e Urbanismo',
      categoria: 'Arquitetura',
      descricao: 'Estudo sobre habitação social, planejamento urbano e o direito à moradia nas cidades brasileiras.',
      data: '10/10/2026',
      palavrasChave: 'moradia urbanismo cidade habitação'
    },
    {
      titulo: 'Desenvolvimento de um sistema de gestão escolar',
      aluno: 'Lucas Santos',
      curso: 'Desenvolvimento de Sistemas',
      categoria: 'Tecnologia',
      descricao: 'Projeto de desenvolvimento de uma plataforma digital para gerenciamento de informações escolares.',
      data: '05/10/2026',
      palavrasChave: 'sistema software tecnologia programação escola'
    },
    {
      titulo: 'Gestão financeira para pequenas empresas',
      aluno: 'Ana Oliveira',
      curso: 'Administração',
      categoria: 'Administração',
      descricao: 'Pesquisa sobre organização financeira e estratégias para pequenos empreendedores.',
      data: '02/10/2026',
      palavrasChave: 'finanças empresas gestão empreendedorismo'
    },
    {
      titulo: 'A importância da tecnologia na educação',
      aluno: 'Pedro Costa',
      curso: 'Pedagogia',
      categoria: 'Educação',
      descricao: 'Análise do uso de ferramentas digitais no processo de ensino e aprendizagem.',
      data: '28/09/2026',
      palavrasChave: 'educação ensino aprendizagem tecnologia'
    },
    {
      titulo: 'Qualidade de vida e saúde preventiva',
      aluno: 'Juliana Mendes',
      curso: 'Enfermagem',
      categoria: 'Saúde',
      descricao: 'Estudo sobre hábitos saudáveis e a importância da prevenção de doenças.',
      data: '20/09/2026',
      palavrasChave: 'saúde prevenção qualidade de vida'
    }
  ];

  constructor(private router: Router) {}

  get trabalhosFiltrados(): Trabalho[] {
    const termo = this.pesquisa.trim().toLowerCase();

    return this.trabalhos.filter(trabalho => {
      const correspondePesquisa =
        !termo ||
        trabalho.titulo.toLowerCase().includes(termo) ||
        trabalho.aluno.toLowerCase().includes(termo) ||
        trabalho.curso.toLowerCase().includes(termo) ||
        trabalho.categoria.toLowerCase().includes(termo) ||
        trabalho.descricao.toLowerCase().includes(termo) ||
        trabalho.palavrasChave.toLowerCase().includes(termo);

      const correspondeCategoria =
        this.categoriaSelecionada === 'Todos' ||
        trabalho.categoria === this.categoriaSelecionada;

      return correspondePesquisa && correspondeCategoria;
    });
  }

  pesquisar(): void {
    this.trabalhoSelecionado = null;
  }

  limparPesquisa(): void {
    this.pesquisa = '';
    this.categoriaSelecionada = 'Todos';
    this.trabalhoSelecionado = null;
  }

  selecionarCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;
    this.trabalhoSelecionado = null;
  }

  selecionarTrabalho(trabalho: Trabalho): void {
    this.trabalhoSelecionado = trabalho;
  }

  fecharDetalhes(): void {
    this.trabalhoSelecionado = null;
  }

  visualizarTurmas(): void {
    document.getElementById('lista-turmas')?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  visualizarAtividades(): void {
    document.getElementById('lista-atividades')?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  visualizarCalendario(): void {
    document.getElementById('lista-calendario')?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  consultarNotas(): void {
    alert(
      'As notas individuais só podem ser consultadas quando o acesso estiver autorizado.'
    );
  }

  bloquearEnvio(): void {
    alert(
      'Para enviar materiais, atividades ou arquivos, é necessário realizar seu cadastro e acessar sua conta.'
    );
  }

  entrar(): void {
    this.router.navigate(['/login']);
  }

  cadastrar(): void {
    this.router.navigate(['/login']);
  }

}
