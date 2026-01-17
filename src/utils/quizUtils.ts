// src/utils/quizUtils.ts
import desafioJava from '../database/desafioJava.json';
import desafioJavaQuiz from '../database/desafioJavaQuiz.json';
import desafioPOO from '../database/desafioPOO.json';
import desafioPOOQuiz from '../database/desafioPOOQuiz.json';
import desafioJavaQuizIniciante from '../database/desafioJavaQuiz_iniciante.json';
import desafioJavaQuizIntermediario from '../database/desafioJavaQuiz_intermediario.json';
import desafioJavaQuizAvancado from '../database/desafioJavaQuiz_avancado.json';
import desafioPOOQuizIntermediario from '../database/desafioPOOQuiz_intermediario.json';
import desafioPOOQuizAvancado from '../database/desafioPOOQuiz_avancado.json';
import desafioPOOQuizMestre from '../database/desafioPOOQuiz_mestre.json';


type QuizQuestion = {
  pergunta: string;
  opcoes: string[];
  correta: string;
};

export const getQuizData = (quizFileName: string): QuizQuestion[] | null => {
  switch (quizFileName) {
    case 'desafioJava.json':
      return desafioJava;
    case 'desafioJavaQuiz.json':
      return desafioJavaQuiz;
    case 'desafioPOO.json':
      return desafioPOO;
    case 'desafioPOOQuiz.json':
      return desafioPOOQuiz;
    case 'desafioJavaQuiz_iniciante.json':
      return desafioJavaQuizIniciante;
    case 'desafioJavaQuiz_intermediario.json':
      return desafioJavaQuizIntermediario;
    case 'desafioJavaQuiz_avancado.json':
      return desafioJavaQuizAvancado;
    case 'desafioPOOQuiz_intermediario.json':
      return desafioPOOQuizIntermediario;
    case 'desafioPOOQuiz_avancado.json':
      return desafioPOOQuizAvancado;
    case 'desafioPOOQuiz_mestre.json':
      return desafioPOOQuizMestre;
    default:
      return null;
  }
};