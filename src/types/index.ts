export interface Exercicio {
    id: number;
    nivel: string;
    categoria: string;
    titulo: string;
    descricao: string;
    dicas: string[];
    variaveisObrigatorias: string[];
    palavrasChave: string[];
    templateCodigo: string;
    pontos: number;
}
