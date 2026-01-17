export type LessonContent = {
  type: 'text' | 'code';
  value: string;
};

export type QuizReference = {
  quizFileName: string; // e.g., 'desafioJavaQuiz.json'
};

export type Lesson = {
  id: number;
  title: string;
  description: string;
  content: LessonContent[]; // Conteúdo teórico
  quiz: QuizReference;
  isHard?: boolean; // True para levels 5, 10, 15, 20
  stars?: number; // 0 a 3 estrelas, para controle de progresso
  isUnlocked?: boolean; // Para controle de desbloqueio
};

export type Level = {
  id: 'beginner' | 'intermediate' | 'advanced';
  name: string;
  lessons: Lesson[];
};

const levels: Level[] = [
  {
    id: 'beginner',
    name: 'Iniciante',
    lessons: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Lição ${i + 1}: Tópico Básico`,
      description: `Introdução ao tópico ${i + 1} de Java.`,
      content: [{ type: 'text', value: `Conteúdo teórico da lição ${i + 1} para iniciantes...` }],
      quiz: { quizFileName: 'desafioJavaQuiz_iniciante.json' }, // Exemplo, pode ser adaptado
      isHard: (i + 1) % 5 === 0,
      stars: 0,
      isUnlocked: i === 0, // Apenas a primeira lição desbloqueada inicialmente
    })),
  },
  {
    id: 'intermediate',
    name: 'Intermediário',
    lessons: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Lição ${i + 1}: Tópico Intermediário`,
      description: `Aprofundando no tópico ${i + 1} de Java.`,
      content: [{ type: 'text', value: `Conteúdo teórico da lição ${i + 1} para intermediários...` }],
      quiz: { quizFileName: 'desafioJavaQuiz_intermediario.json' }, // Exemplo, pode ser adaptado
      isHard: (i + 1) % 5 === 0,
      stars: 0,
      isUnlocked: i === 0,
    })),
  },
  {
    id: 'advanced',
    name: 'Avançado',
    lessons: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Lição ${i + 1}: Tópico Avançado`,
      description: `Dominando o tópico ${i + 1} de Java.`,
      content: [{ type: 'text', value: `Conteúdo teórico da lição ${i + 1} para avançados...` }],
      quiz: { quizFileName: 'desafioJavaQuiz_avancado.json' }, // Exemplo, pode ser adaptado
      isHard: (i + 1) % 5 === 0,
      stars: 0,
      isUnlocked: i === 0,
    })),
  },
];

export default levels;
