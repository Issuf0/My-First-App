
import allQuestions from '../database/desafioJavaQuiz_iniciante.json';
import { StoredQuestion } from '../types';

export interface TheoryBlock {
  title: string;
  explanation: string;
  example?: string;
  observation?: string;
}

export interface Lesson {
  id: number;
  levelId: 'beginner';
  title: string;
  introduction: string;
  topics: string[];
  theory: TheoryBlock[];
  codeExample?: string;
  exampleExplanation?: string[];
  questions: StoredQuestion[];
}

const beginnerLessons: Lesson[] = [
  // Lição 1: Fundamentos
  {
    id: 1,
    levelId: 'beginner',
    title: 'Lição 1: Fundamentos de Java',
    introduction: 'Uma breve introdução aos conceitos mais básicos da programação em Java que você precisa para começar.',
    topics: ['Variáveis', 'Tipos de Dados', 'Estrutura de Classe', 'Saída de Dados'],
    theory: [
      {
        title: "O que é uma Classe?",
        explanation: "Em Java, todo o código vive dentro de 'classes'. Pense numa classe como um projeto ou um molde para criar algo. Por enquanto, o mais importante é saber que todo programa Java precisa de pelo menos uma classe.",
        example: "public class MeuPrograma {\n    // todo o seu código vai aqui dentro\n}",
        observation: "O nome do arquivo .java deve ser exatamente o mesmo nome da classe pública. Neste caso, seria 'MeuPrograma.java'."
      },
      {
        title: "O Ponto de Partida: Método main",
        explanation: "Dentro da classe, precisamos de um ponto de partida. Esse é o trabalho do método 'main'. Quando você executa seu programa, é o código dentro do 'main' que roda primeiro. Sua declaração é sempre a mesma: 'public static void main(String[] args)'.",
        example: "public class MeuPrograma {\n    public static void main(String[] args) {\n        // O programa começa a executar aqui\n    }\n}",
        observation: "Não se preocupe em entender o que 'public', 'static' e 'void' significam agora. Apenas lembre-se que este é o ponto de entrada padrão."
      },
      {
        title: "Guardando Informações: Variáveis",
        explanation: "Uma variável é como uma caixa etiquetada onde você pode guardar informações. Cada 'caixa' tem um tipo, que diz o que ela pode guardar. Para guardar um número inteiro, usamos 'int'. Para guardar texto, usamos 'String'.",
        example: "// Criando uma variável inteira chamada 'idade' e guardando o valor 30\nint idade = 30;\n\n// Criando uma variável de texto chamada 'nome' e guardando 'Maria'\nString nome = \"Maria\";",
        observation: "Note que textos (Strings) são colocados entre aspas duplas. Linhas que começam com '//' são comentários e são ignoradas pelo computador."
      },
      {
        title: "Mostrando Coisas na Tela",
        explanation: "Para ver o resultado do seu código ou mostrar mensagens para o usuário, usamos 'System.out.println()'. Tudo que você colocar dentro dos parênteses será impresso no console, seguido por uma quebra de linha.",
        example: "System.out.println(\"Olá, mundo!\"); // Imprime o texto 'Olá, mundo!'\n\nint numero = 5;\nSystem.out.println(numero); // Imprime o valor da variável, que é 5",
        observation: "Você pode unir texto e variáveis usando o sinal de '+' para formar mensagens mais complexas."
      }
    ],
    codeExample: 
`public class HelloWorld {
    public static void main(String[] args) {
        String saudacao = "Olá, Mundo!";
        int numero = 10;
        System.out.println(saudacao);
        System.out.println("O seu número é: " + numero);
    }
}`,
    exampleExplanation: [
      "Define a classe principal do nosso programa.",
      "Este é o método main, o ponto de entrada para a execução.",
      "Declara uma variável 'saudacao' do tipo String e armazena o texto \"Olá, Mundo!\".",
      "Declara uma variável 'numero' do tipo int e armazena o valor 10.",
      "Imprime o conteúdo da variável 'saudacao' no console.",
      "Concatena (une) o texto \"O seu número é: \" com o valor da variável 'numero' e imprime o resultado."
    ],
    questions: allQuestions.slice(0, 5),
  },
  // Lição 2: Operadores
  {
    id: 2,
    levelId: 'beginner',
    title: 'Lição 2: Operadores',
    introduction: 'Aprenda a manipular dados com operadores aritméticos, relacionais e lógicos.',
    topics: ['Operadores Aritméticos', 'Operadores Relacionais', 'Operadores Lógicos'],
    theory: [
        {
            title: "Operadores Aritméticos",
            explanation: "São os símbolos que usamos para fazer contas: soma (+), subtração (-), multiplicação (*) e divisão (/). Existe também o operador de módulo (%), que nos dá o resto de uma divisão.",
            example: "int soma = 10 + 5; // resultado é 15\nint resto = 10 % 3; // resultado é 1, porque 10 dividido por 3 é 3 e sobra 1",
            observation: "A divisão de dois números inteiros em Java sempre resultará em um número inteiro. A parte decimal é descartada."
        },
        {
            title: "Operadores Relacionais",
            explanation: "São usados para comparar valores. O resultado de uma comparação é sempre um valor booleano: 'true' (verdadeiro) ou 'false' (falso). Os operadores são: igual a (==), diferente de (!=), maior que (>), menor que (<), maior ou igual a (>=) e menor ou igual a (<=).",
            example: "int a = 5;\nint b = 10;\nboolean ehMaior = b > a; // true\nboolean ehIgual = a == b; // false",
            observation: "Cuidado para não confundir o operador de atribuição (=) com o de comparação (==)!"
        },
        {
            title: "Operadores Lógicos",
            explanation: "Permitem combinar múltiplas condições booleanas. Os principais são: '&&' (E lógico), que só é verdadeiro se AMBAS as condições forem verdadeiras, e '||' (OU lógico), que é verdadeiro se PELO MENOS UMA das condições for verdadeira.",
            example: "int idade = 20;\nboolean temCarteira = true;\n\n// A pessoa pode dirigir? (idade maior que 18 E tem carteira)\nboolean podeDirigir = (idade >= 18) && (temCarteira == true); // true",
            observation: "Use parênteses para agrupar condições e deixar seu código mais claro."
        }
    ],
    codeExample: 
`public class Operadores {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;
        System.out.println("Soma: " + (a + b));
        System.out.println("Resto da divisão: " + (a % b));
        
        boolean isMaior = a > b;
        System.out.println("A é maior que B? " + isMaior);
    }
}`,
    exampleExplanation: [
        "Define a classe principal.",
        "Ponto de entrada do programa.",
        "Declara uma variável inteira 'a' com valor 10.",
        "Declara uma variável inteira 'b' com valor 3.",
        "Soma 'a' e 'b' e imprime o resultado (13).",
        "Calcula o resto da divisão de 'a' por 'b' e imprime (1).",
        "Compara se 'a' é maior que 'b'. A variável booleana 'isMaior' guarda 'true'.",
        "Imprime o resultado da comparação."
    ],
    questions: allQuestions.slice(5, 10)
  },
  {
    id: 3,
    levelId: 'beginner',
    title: 'Lição 3: Entrada do Usuário',
    introduction: 'Torne seus programas interativos aprendendo a ler dados do teclado com a classe Scanner.',
    topics: ['Importando classes', 'Classe Scanner', 'Lendo diferentes tipos de dados'],
    theory: [
      {
        title: "Importando o que você precisa",
        explanation: "Muitas funcionalidades do Java estão organizadas em 'pacotes'. Para usar uma funcionalidade que não é padrão, como a classe `Scanner`, você precisa primeiro 'importá-la' para o seu código. Fazemos isso no topo do arquivo.",
        example: "import java.util.Scanner;",
        observation: "O pacote `java.util` contém muitas classes úteis para o dia a dia. `Scanner` é uma delas."
      },
      {
        title: "Criando um Leitor (Scanner)",
        explanation: "Depois de importar, você precisa criar um objeto `Scanner`. Pense nisso como ligar o aparelho que vai ler o que o usuário digita. A forma padrão de fazer isso é associá-lo à entrada do sistema, 'System.in'.",
        example: "Scanner leitor = new Scanner(System.in);",
        observation: "'leitor' é o nome que demos à nossa variável Scanner. Você poderia escolher outro nome."
      },
      {
        title: "Lendo Dados",
        explanation: "O objeto Scanner tem vários métodos para ler diferentes tipos de dados. Para ler um número inteiro, usamos `nextInt()`. Para ler uma palavra, `next()`. Para ler uma linha inteira de texto, usamos `nextLine()`.",
        example: "System.out.print(\"Digite sua idade: \");\nint idade = leitor.nextInt();\n\nSystem.out.print(\"Digite seu primeiro nome: \");\nString nome = leitor.next();",
        observation: "Um problema comum: após usar `nextInt()`, a 'quebra de linha' que você aperta no teclado fica na memória. Se você tentar ler um texto com `nextLine()` logo depois, ele pode ler essa quebra de linha vazia. Uma solução é consumir essa linha extra com um `leitor.nextLine();`."
      }
    ],
    codeExample:
`import java.util.Scanner;

public class InteracaoUsuario {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite seu nome: ");
        String nome = scanner.nextLine();

        System.out.print("Digite sua idade: ");
        int idade = scanner.nextInt();

        System.out.println("Olá, " + nome + "! Você tem " + idade + " anos.");
        
        scanner.close();
    }
}`,
    exampleExplanation: [
      "Importa a classe Scanner do pacote java.util.",
      "Define a classe principal.",
      "Ponto de entrada do programa.",
      "Cria um novo objeto Scanner chamado 'scanner' para ler a entrada do sistema.",
      "Pede para o usuário digitar o nome.",
      "Lê a linha inteira de texto digitada e a armazena na variável 'nome'.",
      "Pede para o usuário digitar a idade.",
      "Lê o número inteiro digitado e o armazena na variável 'idade'.",
      "Imprime uma saudação personalizada usando os dados lidos.",
      "Fecha o scanner para liberar recursos. É uma boa prática!"
    ],
    questions: allQuestions.slice(10, 15)
  },
  {
    id: 4,
    levelId: 'beginner',
    title: 'Lição 4: Decisões com if/else',
    introduction: 'Aprenda a controlar o fluxo do seu programa, fazendo com que ele tome decisões.',
    topics: ['Estrutura if', 'Estrutura if-else', 'Estrutura if-else-if'],
    theory: [
      {
        title: "A Estrutura 'if'",
        explanation: "O 'if' (se) é a forma mais simples de tomar uma decisão. Ele verifica uma condição booleana. Se a condição for 'true', o bloco de código dentro do 'if' é executado. Se for 'false', o bloco é ignorado.",
        example: "int nota = 7;\nif (nota >= 7) {\n    System.out.println(\"Aprovado!\");\n}",
        observation: "A condição a ser testada sempre vai dentro de parênteses."
      },
      {
        title: "O 'else': O Caminho Alternativo",
        explanation: "O 'else' (senão) oferece um caminho alternativo. Ele é executado somente se a condição do 'if' for 'false'. Isso garante que um, e apenas um, dos dois blocos de código seja sempre executado.",
        example: "int idade = 15;\nif (idade >= 18) {\n    System.out.println(\"Pode entrar.\");\n} else {\n    System.out.println(\"Não pode entrar.\");\n}",
        observation: "Um 'else' nunca pode existir sem um 'if' antes dele."
      },
      {
        title: "Múltiplas Condições com 'else if'",
        explanation: "E se você tiver mais de duas possibilidades? Você pode encadear várias verificações usando 'else if'. O programa testará as condições em ordem. Assim que encontrar uma que seja 'true', ele executa o bloco correspondente e ignora todo o resto.",
        example: "int nota = 8;\nif (nota >= 9) {\n    System.out.println(\"Ótimo\");\n} else if (nota >= 7) {\n    System.out.println(\"Bom\");\n} else {\n    System.out.println(\"Precisa melhorar\");\n}",
        observation: "Você pode ter quantos 'else if' precisar, mas apenas um 'else' no final, que é opcional."
      }
    ],
    codeExample:
`public class VerificadorDeIdade {
    public static void main(String[] args) {
        int idade = 18;

        if (idade >= 18) {
            System.out.println("Você é maior de idade.");
        } else {
            System.out.println("Você é menor de idade.");
        }
    }
}`,
    exampleExplanation: [
      "Define a classe principal.",
      "Ponto de entrada do programa.",
      "Declara uma variável 'idade' com o valor 18.",
      "Inicia a verificação condicional.",
      "Testa se o valor de 'idade' é maior ou igual a 18. Como é, este bloco é executado.",
      "Imprime a mensagem para maiores de idade.",
      "O bloco 'else' é ignorado, pois a condição do 'if' foi verdadeira."
    ],
    questions: allQuestions.slice(15, 20)
  },
  {
    id: 5,
    levelId: 'beginner',
    title: 'Lição 5: Múltiplas Escolhas com switch',
    introduction: 'Uma alternativa ao if-else para testar uma variável contra múltiplos valores.',
    topics: ['Estrutura switch', 'case', 'break', 'default'],
    theory: [
      {
        title: "A Estrutura 'switch'",
        explanation: "O 'switch' é uma estrutura de decisão que funciona como uma série de 'if-else-if', mas de forma mais organizada. Ele pega o valor de uma variável e o compara com diferentes 'casos' (case).",
        example: "int dia = 2;\nswitch (dia) {\n    // casos aqui\n}",
        observation: "É ideal para quando você tem uma única variável para comparar com vários valores exatos."
      },
      {
        title: "Os Casos: 'case'",
        explanation: "Cada 'case' representa um valor que a variável pode ter. Se o valor da variável do 'switch' corresponder ao valor de um 'case', o código a partir daquele ponto é executado.",
        example: "switch (dia) {\n    case 1:\n        System.out.println(\"Domingo\");\n    case 2:\n        System.out.println(\"Segunda\");\n}",
        observation: "Os valores do 'case' devem ser constantes e do mesmo tipo da variável do 'switch'."
      },
      {
        title: "Parando a Execução: 'break'",
        explanation: "Um detalhe importante do 'switch' é que ele continua executando todos os 'cases' abaixo do que correspondeu. Para evitar isso, usamos a palavra 'break' no final de cada bloco 'case'. Ela força a saída imediata do 'switch'.",
        example: "case 1:\n    System.out.println(\"Domingo\");\n    break; // Sai do switch",
        observation: "Esquecer o 'break' é um erro muito comum e pode levar a resultados inesperados."
      },
      {
        title: "O Caso Padrão: 'default'",
        explanation: "O bloco 'default' é opcional e funciona como o 'else' final. Ele é executado se nenhum dos 'cases' corresponder ao valor da variável.",
        example: "default:\n    System.out.println(\"Dia inválido\");\n    break;",
        observation: "É uma boa prática sempre incluir um 'default' para tratar valores inesperados."
      }
    ],
    codeExample: 
`public class DiaDaSemana {
    public static void main(String[] args) {
        int dia = 3;
        String nomeDoDia;

        switch (dia) {
            case 1:
                nomeDoDia = "Domingo";
                break;
            case 2:
                nomeDoDia = "Segunda";
                break;
            case 3:
                nomeDoDia = "Terça";
                break;
            default:
                nomeDoDia = "Dia inválido";
                break;
        }
        System.out.println("Hoje é: " + nomeDoDia);
    }
}`,
    exampleExplanation: [
      "Define a classe principal.",
      "Ponto de entrada do programa.",
      "Declara uma variável inteira 'dia' com valor 3.",
      "Declara uma String para guardar o nome do dia.",
      "Inicia a estrutura switch, que vai testar o valor da variável 'dia'.",
      "Testa se 'dia' é 1. Não é.",
      "Testa se 'dia' é 2. Não é.",
      "Testa se 'dia' é 3. É! O código deste case é executado.",
      "A variável 'nomeDoDia' recebe o valor \"Terça\".",
      "O comando 'break' interrompe a execução do switch.",
      "O bloco 'default' é ignorado.",
      "Imprime a mensagem final com o valor de 'nomeDoDia'."
    ],
    questions: allQuestions.slice(20, 25)
  },
  {
    id: 6,
    levelId: 'beginner',
    title: 'Lição 6: Laço while',
    introduction: 'Aprenda a repetir blocos de código enquanto uma condição for verdadeira.',
    topics: ['Sintaxe do while', 'Contadores', 'Loops Infinitos'],
    theory: [
      {
        title: "Repetindo com 'while'",
        explanation: "O laço 'while' (enquanto) é uma estrutura de repetição. Ele executa um bloco de código repetidamente, enquanto uma condição booleana for verdadeira. A condição é verificada ANTES de cada execução do bloco.",
        example: "int contador = 0;\nwhile (contador < 5) {\n    System.out.println(\"Olá\");\n    contador = contador + 1;\n}",
        observation: "Se a condição for falsa desde o início, o bloco de código dentro do 'while' nunca será executado."
      },
      {
        title: "A Importância do Contador",
        explanation: "Para que um laço 'while' termine, algo dentro dele precisa alterar a condição. Geralmente, isso é feito com uma variável 'contadora' que é incrementada (ou decrementada) a cada repetição, até que a condição não seja mais satisfeita.",
        example: "contador++; // Forma curta de escrever contador = contador + 1;",
        observation: "Sem uma alteração que torne a condição falsa, você cria um 'loop infinito'."
      },
      {
        title: "Cuidado com o Loop Infinito!",
        explanation: "Um loop infinito acontece quando a condição do laço 'while' nunca se torna falsa. O programa fica 'preso' executando o mesmo bloco de código para sempre e pode travar. Sempre garanta que existe uma saída!",
        example: "// Exemplo de loop infinito (NÃO FAÇA ISSO):\nwhile (true) {\n    System.out.println(\"Preso para sempre!\");\n}",
        observation: "Se seu programa parece não responder, verifique seus laços. Você pode ter criado um loop infinito sem querer."
      }
    ],
    codeExample:
`public class Contador {
    public static void main(String[] args) {
        int contador = 1;
        while (contador <= 5) {
            System.out.println("Número: " + contador);
            contador++;
        }
        System.out.println("Fim do laço!");
    }
}`,
    exampleExplanation: [
      "Define a classe principal.",
      "Ponto de entrada do programa.",
      "Inicializa a variável contadora com 1.",
      "Inicia o laço 'while'. A condição (contador <= 5) é verificada.",
      "O bloco é executado: imprime 'Número: 1'.",
      "O contador é incrementado para 2. O bloco termina, volta para o 'while'.",
      "A condição é verificada (2<=5), o bloco executa... e assim por diante até o contador ser 6.",
      "Quando o contador é 6, a condição (6<=5) é falsa. O laço termina.",
      "O programa continua e imprime 'Fim do laço!'."
    ],
    questions: allQuestions.slice(25, 30)
  },
];

export const getBeginnerLessons = (): Lesson[] => {
  return beginnerLessons;
};

export const getBeginnerLessonById = (lessonId: number): Lesson | undefined => {
  return beginnerLessons.find(lesson => lesson.id === lessonId);
};
