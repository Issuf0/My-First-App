
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
  isChallenge?: boolean;
  challenge?: {
    objective: string;
    problem: string;
    initialCode: string;
    solutionKeywords: string[];
  };
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
    title: 'Desafio: Múltiplas Escolhas com switch',
    introduction: 'Aplique seu conhecimento sobre a estrutura switch para resolver um problema prático.',
    topics: ['Estrutura switch', 'case', 'break', 'default'],
    theory: [],
    questions: [],
    isChallenge: true,
    challenge: {
      objective: 'Usar a estrutura `switch` para associar um número ao nome de um dia da semana.',
      problem: 'Complete o código para que, dado um número inteiro `dia`, a variável `nomeDoDia` receba o nome do dia correspondente (1 para "Domingo", 2 para "Segunda", etc.). Se o número não for válido, atribua "Dia inválido".',
      initialCode: 
`public class DiaDaSemana {
    public static void main(String[] args) {
        int dia = 4; // Tente mudar este valor
        String nomeDoDia;

        // SEU CÓDIGO AQUI

        System.out.println("O dia é: " + nomeDoDia);
    }
}`,
      solutionKeywords: ['switch', 'case', 'break', 'default']
    }
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
  {
    id: 7,
    levelId: 'beginner',
    title: 'Lição 7: Laço do-while',
    introduction: 'Explore o laço do-while, uma variação que garante a execução do bloco de código pelo menos uma vez.',
    topics: ['Sintaxe do do-while', 'Diferença entre while e do-while', 'Casos de Uso'],
    theory: [
      {
        title: "Execução Mínima Garantida com 'do-while'",
        explanation: "O laço 'do-while' é semelhante ao 'while', mas com uma diferença crucial: o bloco de código é executado PRIMEIRO, e SÓ DEPOIS a condição é verificada. Isso significa que o bloco de código dentro de um 'do-while' sempre será executado pelo menos uma vez, mesmo que a condição seja falsa desde o início.",
        example: "int i = 0;\ndo {\n    System.out.println(\"O valor de i é: \" + i);\n    i++;\n} while (i < 0); // Condição é falsa, mas o bloco executa uma vez",
        observation: "O 'do-while' é útil para situações onde você precisa que uma ação ocorra ao menos uma vez, como pedir uma entrada válida ao usuário."
      },
      {
        title: "Comparando 'while' e 'do-while'",
        explanation: "A principal distinção reside no momento da verificação da condição. No 'while', a condição é verificada antes da primeira execução. No 'do-while', a condição é verificada após a primeira execução. Se a condição inicial for falsa, o 'while' pode não executar nenhuma vez, enquanto o 'do-while' executará uma vez.",
        example: "// Exemplo 'while' (não executa nenhuma vez):\nint a = 10;\nwhile (a < 5) {\n    System.out.println(\"Isso nunca será impresso com 'while'.\");\n}\n\n// Exemplo 'do-while' (executa uma vez):\nint b = 10;\ndo {\n    System.out.println(\"Isso será impresso uma vez com 'do-while'.\");\n} while (b < 5);",
        observation: "Escolha o laço adequado à sua necessidade: 'while' para zero ou mais execuções, 'do-while' para uma ou mais."
      },
      {
        title: "Quando Usar o 'do-while'",
        explanation: "O 'do-while' é ideal para cenários onde a lógica de negócio exige que um conjunto de instruções seja executado pelo menos uma vez. Um uso comum é para validação de entrada de usuário, onde você precisa pedir uma informação e só parar de pedir quando a entrada for válida.",
        example: "import java.util.Scanner;\n\npublic class ValidacaoEntrada {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int numero;\n        do {\n            System.out.print(\"Digite um número positivo: \");\n            numero = scanner.nextInt();\n        } while (numero <= 0);\n        System.out.println(\"Você digitou: \" + numero);\n        scanner.close();\n    }\n}",
        observation: "Sempre garanta que a condição do 'do-while' eventualmente se torne falsa para evitar loops infinitos."
      }
    ],
    codeExample:
`public class ExemploDoWhile {
    public static void main(String[] args) {
        int contador = 0;
        do {
            System.out.println("Contador: " + contador);
            contador++;
        } while (contador < 3);

        int outroContador = 5;
        do {
            System.out.println("Este será impresso uma vez, pois a condição é falsa: " + outroContador);
            outroContador++;
        } while (outroContador < 5);
    }
}`,
    exampleExplanation: [
      "Define a classe principal.",
      "Ponto de entrada do programa.",
      "Inicializa 'contador' com 0.",
      "Inicia o laço 'do-while'. O bloco executa.",
      "Imprime 'Contador: 0'.",
      "Incrementa 'contador' para 1.",
      "Verifica a condição (1 < 3), que é verdadeira. Repete o bloco.",
      "Imprime 'Contador: 1'. Incrementa para 2.",
      "Verifica a condição (2 < 3), que é verdadeira. Repete o bloco.",
      "Imprime 'Contador: 2'. Incrementa para 3.",
      "Verifica a condição (3 < 3), que é falsa. O laço termina.",
      "Inicializa 'outroContador' com 5.",
      "Inicia o segundo laço 'do-while'. O bloco executa uma vez.",
      "Imprime a mensagem, mostrando que 'outroContador' é 5.",
      "Incrementa 'outroContador' para 6.",
      "Verifica a condição (6 < 5), que é falsa. O laço termina."
    ],
    questions: allQuestions.slice(30, 35)
  },
  {
    id: 8,
    levelId: 'beginner',
    title: 'Lição 8: Laço for',
    introduction: 'Domine o laço for, a estrutura de repetição mais comum e estruturada para iterar um número conhecido de vezes.',
    topics: ['Sintaxe do for', 'Inicialização, Condição e Incremento', 'Uso com Arrays'],
    theory: [
      {
        title: "A Estrutura Clássica do 'for'",
        explanation: "O laço 'for' é projetado para repetir um bloco de código um número específico de vezes. Sua sintaxe é mais compacta que a do 'while', pois une a inicialização de uma variável de controle, a condição de continuação e o passo de incremento em uma única linha.",
        example: "for (int i = 0; i < 5; i++) {\n    System.out.println(\"Repetição número: \" + i);\n}",
        observation: "Esta estrutura é extremamente comum para percorrer listas de itens ou simplesmente repetir uma ação N vezes."
      },
      {
        title: "As Três Partes do 'for'",
        explanation: "O cabeçalho do 'for' tem três partes, separadas por ponto e vírgula:\n1.  **Inicialização:** `int i = 0;` - Executada uma única vez, antes de tudo. Geralmente, cria e inicializa a variável de controle.\n2.  **Condição:** `i < 5;` - Verificada antes de cada repetição. Se for 'true', o bloco executa. Se for 'false', o laço termina.\n3.  **Incremento/Decremento:** `i++` - Executado ao final de cada repetição. Geralmente, atualiza a variável de controle.",
        example: "// Contando de 10 até 1\nfor (int i = 10; i > 0; i--) {\n    System.out.println(i);\n}",
        observation: "Qualquer uma das três partes pode ser omitida, mas os ponto e vírgulas são obrigatórios. No entanto, a estrutura completa é a mais usada."
      },
      {
        title: "Percorrendo Listas (Arrays)",
        explanation: "O laço 'for' é a ferramenta perfeita para percorrer os elementos de um array. A variável de controle ('i') é usada como índice para acessar cada elemento do array em sequência, do primeiro (índice 0) ao último.",
        example: "String[] nomes = {\"Ana\", \"João\", \"Carlos\"};\n// O laço vai de i = 0 até i < 3\nfor (int i = 0; i < nomes.length; i++) {\n    System.out.println(\"Olá, \" + nomes[i]);\n}",
        observation: "Usar `.length` na condição do laço garante que ele funcione para arrays de qualquer tamanho, tornando o código mais robusto e flexível."
      }
    ],
    codeExample:
`public class Tabuada {
    public static void main(String[] args) {
        int numero = 7;
        System.out.println("Tabuada do " + numero + ":");

        for (int i = 1; i <= 10; i++) {
            int resultado = numero * i;
            System.out.println(numero + " x " + i + " = " + resultado);
        }
    }
}`,
    exampleExplanation: [
      "Define a classe principal.",
      "Ponto de entrada do programa.",
      "Define o número para o qual a tabuada será gerada.",
      "Imprime um cabeçalho para a tabuada.",
      "Inicia o laço 'for'. A variável 'i' começa em 1, o laço continua enquanto 'i' for menor ou igual a 10, e 'i' é incrementado a cada volta.",
      "A cada repetição, calcula o produto de 'numero' pelo valor atual de 'i'.",
      "Imprime a linha da tabuada, por exemplo, '7 x 1 = 7'.",
      "O laço termina quando 'i' se torna 11."
    ],
    questions: allQuestions.slice(35, 40)
  },
  {
    id: 9,
    levelId: 'beginner',
    title: 'Lição 9: Controle de Laços com break e continue',
    introduction: 'Aprenda a manipular o fluxo de seus laços de repetição, forçando paradas ou pulando repetições específicas.',
    topics: ['Interrompendo laços com break', 'Pulando repetições com continue', 'Diferença e Casos de Uso'],
    theory: [
      {
        title: "Interrupção Forçada com 'break'",
        explanation: "A palavra-chave 'break' permite sair imediatamente de um laço ('for', 'while', 'do-while'), independentemente da condição do laço. A execução do programa continua na primeira linha de código após o laço.",
        example: "for (int i = 0; i < 10; i++) {\n    if (i == 5) {\n        break; // Para o laço quando i for 5\n    }\n    System.out.println(i); // Imprime de 0 a 4\n}",
        observation: "O 'break' é muito usado para parar um laço quando um objetivo específico é alcançado, como encontrar um item em uma lista."
      },
      {
        title: "Pulando uma Repetição com 'continue'",
        explanation: "A palavra-chave 'continue' encerra a repetição ATUAL e pula para a próxima iteração do laço. O código dentro do laço que estiver abaixo do 'continue' não será executado naquela iteração específica.",
        example: "for (int i = 0; i < 5; i++) {\n    if (i == 2) {\n        continue; // Pula a repetição quando i for 2\n    }\n    System.out.println(i); // Imprime 0, 1, 3, 4\n}",
        observation: "'continue' é útil para ignorar certos elementos ou condições dentro de um laço sem terminá-lo completamente."
      },
      {
        title: "'break' vs 'continue'",
        explanation: "A diferença é fundamental: 'break' sai do laço para sempre. 'continue' apenas pula para a próxima volta do mesmo laço.\n- Use 'break' quando a tarefa do laço estiver concluída.\n- Use 'continue' quando você quiser apenas ignorar a iteração atual e seguir em frente com as próximas.",
        example: "// Procurando o primeiro número par\nint[] numeros = {1, 3, 5, 6, 7, 9};\nfor (int n : numeros) {\n    if (n % 2 == 0) {\n        System.out.println(\"Primeiro par encontrado: \" + n);\n        break; // Encontrou, pode parar.\n    }\n}\n\n// Imprimindo apenas os números ímpares\nfor (int n : numeros) {\n    if (n % 2 == 0) {\n        continue; // Se for par, ignora e vai para o próximo.\n    }\n    System.out.println(\"Ímpar: \" + n);\n}",
        observation: "Ambos 'break' e 'continue' podem deixar o código mais difícil de ler se usados em excesso. Use-os para tornar a lógica mais clara, não mais complexa."
      }
    ],
    codeExample:
`public class ControleDeLaco {
    public static void main(String[] args) {
        System.out.println("Exemplo com break:");
        for (int i = 1; i <= 10; i++) {
            if (i > 5) {
                break; // Para o laço se i for maior que 5
            }
            System.out.print(i + " "); // Imprime: 1 2 3 4 5
        }

        System.out.println("\n\nExemplo com continue:");
        for (int i = 1; i <= 5; i++) {
            if (i % 2 == 0) {
                continue; // Pula para a próxima iteração se i for par
            }
            System.out.print(i + " "); // Imprime: 1 3 5
        }
    }
}`,
    exampleExplanation: [
      "Define a classe principal.",
      "Ponto de entrada do programa.",
      "Imprime um título para o primeiro exemplo.",
      "Inicia um laço 'for' de 1 a 10.",
      "Verifica se 'i' já é maior que 5.",
      "Se a condição for verdadeira, o 'break' é acionado, terminando o laço imediatamente.",
      "Imprime o valor de 'i' se o 'break' não for acionado.",
      "Imprime títulos para o segundo exemplo.",
      "Inicia um segundo laço 'for' de 1 a 5.",
      "Verifica se 'i' é um número par (resto da divisão por 2 é zero).",
      "Se for par, 'continue' pula o resto do código e vai para a próxima iteração (ex: quando i é 2 e 4).",
      "Imprime o valor de 'i' apenas se ele não for par."
    ],
    questions: allQuestions.slice(40, 45)
  },
  {
    id: 10,
    levelId: 'beginner',
    title: 'Desafio: Introdução a Arrays',
    introduction: 'Aplique seu conhecimento sobre declaração e acesso de arrays.',
    topics: ['O que são arrays', 'Declarando e Inicializando Arrays', 'Acessando Elementos'],
    theory: [],
    questions: [],
    isChallenge: true,
    challenge: {
      objective: 'Declarar um array de strings e acessar um de seus elementos.',
      problem: 'Declare um array de strings chamado `frutas` contendo "Maçã", "Banana" e "Laranja". Em seguida, acesse o segundo elemento ("Banana") e armazene-o em uma variável chamada `segundaFruta`.',
      initialCode:
`public class DesafioArray {
    public static void main(String[] args) {
        // SEU CÓDIGO AQUI
        
        // System.out.println("A segunda fruta é: " + segundaFruta);
    }
}`,
      solutionKeywords: ['String[]', 'frutas', 'frutas[1]']
    }
  },
  {
    id: 11,
    levelId: 'beginner',
    title: 'Lição 11: Manipulando Arrays',
    introduction: 'Descubra como percorrer arrays e usar a propriedade length.',
    topics: ['Propriedade length', 'Percorrendo arrays com o laço for', 'Laço for-each'],
    theory: [
      {
        title: "Descobrindo o Tamanho: .length",
        explanation: "Todo array em Java tem uma propriedade (uma variável interna) chamada `length`, que informa quantos elementos o array pode conter. Isso é extremamente útil para evitar erros e para usar em laços de repetição.",
        example: "String[] paises = {\"Brasil\", \"Portugal\", \"Japão\"};\nint quantidade = paises.length; // quantidade será 3",
        observation: "Note que `length` é uma propriedade, não um método. Portanto, você a acessa diretamente, sem parênteses: `meuArray.length`."
      },
      {
        title: "Percorrendo com o Laço 'for' Clássico",
        explanation: "A combinação do laço `for` com a propriedade `length` é a maneira padrão de percorrer todos os elementos de um array. O laço começa no índice 0 e continua até o último índice, que é `length - 1`.",
        example: "int[] notas = {10, 8, 7, 9};\nfor (int i = 0; i < notas.length; i++) {\n    System.out.println(\"Nota no índice \" + i + \": \" + notas[i]);\n}",
        observation: "A condição `i < notas.length` é crucial para garantir que você não tente acessar um índice que não existe."
      },
      {
        title: "O Laço 'for-each' (Enhanced for)",
        explanation: "Java oferece uma sintaxe de laço mais simples e legível, chamada 'for-each', para quando você só precisa acessar cada elemento de um array (ou outra coleção) em sequência, sem se preocupar com o índice.",
        example: "char[] vogais = {'a', 'e', 'i', 'o', 'u'};\n// Para cada 'vogal' no array 'vogais'\nfor (char vogal : vogais) {\n    System.out.print(vogal + \" \"); // Imprime: a e i o u\n}",
        observation: "O 'for-each' é menos flexível (você não tem acesso fácil ao índice e não pode modificar o array enquanto o percorre), mas é muito mais limpo e seguro para tarefas de apenas leitura."
      }
    ],
    codeExample:
`public class SomaArray {
    public static void main(String[] args) {
        double[] numeros = {10.5, 20.0, 5.5, 14.0};
        double soma = 0.0;

        // Usando o laço for-each para somar os elementos
        for (double numero : numeros) {
            soma = soma + numero;
        }

        System.out.println("A soma de todos os números é: " + soma);
        
        double media = soma / numeros.length;
        System.out.println("A média dos números é: " + media);
    }
}`,
    exampleExplanation: [
      "Define a classe principal.",
      "Ponto de entrada do programa.",
      "Cria um array de `double` chamado `numeros`.",
      "Inicializa uma variável `soma` para acumular o total.",
      "Inicia o laço 'for-each'. A cada volta, a variável `numero` receberá um dos elementos do array `numeros`.",
      "Adiciona o valor do elemento atual à variável `soma`.",
      "Após o laço terminar, imprime a soma total.",
      "Calcula a média dividindo a soma pelo número de elementos do array (usando `numeros.length`).",
      "Imprime a média calculada."
    ],
    questions: allQuestions.slice(50, 55)
  },
  {
    id: 12,
    levelId: 'beginner',
    title: 'Lição 12: Criando seus Primeiros Métodos',
    introduction: 'Aprenda a organizar seu código em blocos reutilizáveis chamados métodos, tornando seus programas mais limpos e eficientes.',
    topics: ['O que são métodos', 'Declarando métodos', 'Chamando métodos', 'Reutilização de Código'],
    theory: [
      {
        title: "O que é um Método?",
        explanation: "Um método é um bloco de código que realiza uma tarefa específica e só é executado quando chamado. Pense nele como uma 'sub-rotina' ou uma 'função'. Agrupar código em métodos ajuda a organizar, reutilizar e simplificar seus programas.",
        example: "// O método 'main' é o principal, mas podemos criar outros.\npublic static void saudar() {\n    System.out.println(\"Olá! Bem-vindo ao método!\");\n}",
        observation: "Ao invés de escrever o mesmo código várias vezes, você escreve um método uma vez e o chama quantas vezes precisar."
      },
      {
        title: "Declarando um Método",
        explanation: "A declaração de um método tem uma estrutura básica: `modificadores tipoDeRetorno nomeDoMetodo() { ... }`.\n- `public static`: Por enquanto, vamos usar esses modificadores. 'public' significa que ele pode ser acessado de qualquer lugar, e 'static' significa que o método pertence à classe, não a um objeto específico.\n- `void`: Este é o tipo de retorno. `void` significa que o método executa uma ação mas não retorna (devolve) nenhum valor.\n- `nomeDoMetodo()`: O nome que você dá ao seu método, seguido por parênteses.",
        example: "public class MeuPrograma {\n    // Método principal\n    public static void main(String[] args) {\n        // ...\n    }\n\n    // Nosso novo método\n    public static void exibirMensagem() {\n        System.out.println(\"Esta é uma mensagem do nosso método.\");\n    }\n}",
        observation: "Nomes de métodos geralmente começam com letra minúscula e seguem o padrão camelCase, como `exibirMensagem`."
      },
      {
        title: "Chamando um Método",
        explanation: "Declarar um método não o executa. Para que o código dentro do método seja executado, você precisa 'chamá-lo'. Para chamar um método estático de dentro da mesma classe, basta usar seu nome seguido de parênteses e ponto e vírgula.",
        example: "public static void main(String[] args) {\n    System.out.println(\"Antes de chamar o método.\");\n    exibirMensagem(); // Aqui estamos chamando o método\n    System.out.println(\"Depois de chamar o método.\");\n}",
        observation: "O fluxo do programa salta para o método `exibirMensagem`, executa todo o código dentro dele, e depois retorna para continuar de onde parou no `main`."
      }
    ],
    codeExample:
`public class ExemploMetodos {
    // O programa começa aqui, no método main
    public static void main(String[] args) {
        System.out.println("Iniciando o programa principal.");
        
        // Chamando nosso método pela primeira vez
        imprimirSaudacao();
        
        System.out.println("Voltamos ao main.");

        // Chamando o mesmo método novamente
        imprimirSaudacao();
        
        System.out.println("Fim do programa.");
    }

    // Nosso método personalizado
    public static void imprimirSaudacao() {
        System.out.println("-------------------------");
        System.out.println("Olá! Este é nosso método!");
        System.out.println("-------------------------");
    }
}`,
    exampleExplanation: [
      "Define a classe principal do nosso programa.",
      "O método `main`, ponto de entrada da execução.",
      "Imprime uma mensagem inicial do `main`.",
      "Faz a primeira chamada ao método `imprimirSaudacao()`. O controle do programa pula para a linha 15.",
      "Imprime uma mensagem no `main` após o método ter sido executado.",
      "Chama o mesmo método `imprimirSaudacao()` uma segunda vez, reutilizando o código.",
      "Imprime a mensagem final do programa.",
      "Declaração do nosso método. Ele é `public`, `static` e não retorna nenhum valor (`void`).",
      "O corpo do método começa aqui.",
      "Imprime uma linha de traços.",
      "Imprime a saudação principal do método.",
      "Imprime outra linha de traços.",
      "Fim do método. O controle do programa volta para o ponto de onde foi chamado (linha 6 ou 11)."
    ],
    questions: allQuestions.slice(55, 60)
  },
  {
    id: 13,
    levelId: 'beginner',
    title: 'Lição 13: Métodos com Parâmetros',
    introduction: 'Torne seus métodos mais flexíveis e poderosos aprendendo a passar informações para eles através de parâmetros.',
    topics: ['O que são parâmetros', 'Declarando métodos com parâmetros', 'Passando argumentos', 'Múltiplos parâmetros'],
    theory: [
      {
        title: "O que são Parâmetros?",
        explanation: "Parâmetros são variáveis especiais que um método usa para receber informações de quem o chamou. Eles permitem que o método se comporte de maneira diferente dependendo dos dados que recebe, tornando-o muito mais flexível e reutilizável.",
        example: "// Este método recebe uma informação (um nome) para usar.\npublic static void saudarPessoa(String nome) {\n    System.out.println(\"Olá, \" + nome + \"!\");\n}",
        observation: "A variável 'nome' só existe dentro do método 'saudarPessoa'. Ela funciona como um placeholder para o valor que será fornecido quando o método for chamado."
      },
      {
        title: "Declarando e Usando Parâmetros",
        explanation: "Você declara os parâmetros dentro dos parênteses na assinatura do método, especificando o tipo e um nome para cada um. Dentro do método, você pode usar a variável de parâmetro como qualquer outra variável local.",
        example: "public static void verificarIdade(int idade) {\n    if (idade >= 18) {\n        System.out.println(\"É maior de idade.\");\n    } else {\n        System.out.println(\"É menor de idade.\");\n    }\n}",
        observation: "O nome do parâmetro (`idade` no exemplo) serve para dar clareza ao código e documentar que tipo de informação o método espera receber."
      },
      {
        title: "Passando Argumentos",
        explanation: "Quando você chama um método que tem parâmetros, você precisa fornecer valores para eles. Esses valores são chamados de 'argumentos'. A ordem e o tipo dos argumentos devem corresponder à ordem e ao tipo dos parâmetros declarados no método.",
        example: "// Chamando o método e passando o argumento 25\nverificarIdade(25); // Imprime 'É maior de idade.'\n\n// Chamando com um argumento diferente\nverificarIdade(15); // Imprime 'É menor de idade.'",
        observation: "Você pode passar tanto valores literais (como 25) quanto variáveis como argumentos."
      },
      {
        title: "Múltiplos Parâmetros",
        explanation: "Um método pode ter quantos parâmetros você precisar. Basta separá-los por vírgula na declaração. Ao chamar o método, você deve fornecer o mesmo número de argumentos na mesma ordem.",
        example: "public static void apresentar(String nome, int idade) {\n    System.out.println(\"Nome: \" + nome + \", Idade: \" + idade);\n}\n\n// Chamando o método com dois argumentos\napresentar(\"Carlos\", 30); // Imprime 'Nome: Carlos, Idade: 30'",
        observation: "A ordem importa! Chamar `apresentar(30, \"Carlos\")` daria um erro, pois os tipos dos argumentos não correspondem aos tipos dos parâmetros."
      }
    ],
    codeExample:
`public class MetodosComParametros {
    public static void main(String[] args) {
        // Chamando o método com diferentes argumentos
        somar(5, 3);
        somar(10, 20);
        
        int a = 15;
        int b = 7;
        somar(a, b); // Usando variáveis como argumentos
    }

    // Método que recebe dois números inteiros como parâmetros
    public static void somar(int numero1, int numero2) {
        int resultado = numero1 + numero2;
        System.out.println("A soma de " + numero1 + " e " + numero2 + " é: " + resultado);
    }
}`,
    exampleExplanation: [
      "Define a classe principal.",
      "Ponto de entrada do programa.",
      "Chama o método 'somar' passando os valores literais 5 e 3 como argumentos.",
      "Chama o mesmo método com diferentes argumentos: 10 e 20.",
      "Declara uma variável 'a' com valor 15.",
      "Declara uma variável 'b' com valor 7.",
      "Chama o método 'somar' passando as variáveis 'a' e 'b' como argumentos. Seus valores são copiados para os parâmetros 'numero1' e 'numero2'.",
      "Declaração do método 'somar'. Ele aceita dois parâmetros do tipo 'int': 'numero1' e 'numero2'.",
      "Soma os valores recebidos nos parâmetros e armazena em 'resultado'.",
      "Imprime uma mensagem mostrando os números originais e o resultado da soma."
    ],
    questions: allQuestions.slice(60, 65)
  },
  {
    id: 14,
    levelId: 'beginner',
    title: 'Lição 14: Retorno de Valores e Sobrecarga',
    introduction: 'Vá além com métodos que calculam e devolvem valores. Aprenda também a criar métodos com o mesmo nome mas com comportamentos diferentes.',
    topics: ['Métodos com tipo de retorno', 'A palavra-chave return', 'Sobrecarga de método (Overloading)', 'Regras da sobrecarga'],
    theory: [
      {
        title: "Métodos que Retornam Valores",
        explanation: "Até agora, nossos métodos usavam 'void', significando que eles não devolviam nenhuma informação. Mas métodos podem calcular algo e retornar um resultado. Para isso, em vez de 'void', especificamos o tipo de dado que o método vai retornar (ex: 'int', 'String', 'double').",
        example: "// Este método promete retornar um valor do tipo 'int'\npublic static int somar(int a, int b) {\n    // ...\n}",
        observation: "Um método que promete retornar um valor deve ter uma instrução 'return' para cada caminho possível de execução."
      },
      {
        title: "A Palavra-chave 'return'",
        explanation: "A instrução 'return' faz duas coisas: 1) termina imediatamente a execução do método e 2) devolve um valor para quem o chamou. O valor retornado deve ser do mesmo tipo que o declarado no método.",
        example: "public static int somar(int a, int b) {\n    int resultado = a + b;\n    return resultado; // Devolve o valor da variável 'resultado'\n}\n\n// No main, podemos guardar o valor retornado:\nint valorSoma = somar(5, 10); // valorSoma agora é 15",
        observation: "Depois que um 'return' é executado, nenhum outro código dentro do método é alcançado."
      },
      {
        title: "Sobrecarga de Métodos (Overloading)",
        explanation: "Sobrecarga (overloading) é a capacidade de ter dois ou mais métodos com o mesmo nome dentro da mesma classe, desde que suas listas de parâmetros sejam diferentes. Isso permite criar variações de um método para lidar com diferentes tipos ou quantidades de dados.",
        example: "// Um método que soma dois inteiros\npublic static int somar(int a, int b) { ... }\n\n// Um método com o mesmo nome que soma dois doubles\npublic static double somar(double a, double b) { ... }",
        observation: "O Java decide qual versão do método chamar com base nos argumentos que você passa na chamada."
      },
      {
        title: "Regras da Sobrecarga",
        explanation: "Para sobrecarregar um método, você DEVE mudar a lista de parâmetros. Isso pode ser feito de três maneiras:\n1. Mudar o número de parâmetros.\n2. Mudar o tipo dos parâmetros.\n3. Mudar a ordem dos tipos dos parâmetros.\nAtenção: Mudar apenas o tipo de retorno NÃO é suficiente para sobrecarregar um método e causará um erro de compilação.",
        example: "public static void exibir(String s) { ... }\npublic static void exibir(String s, int n) { ... } // Válido (número diferente)\npublic static void exibir(int n) { ... } // Válido (tipo diferente)\n\n// public static int exibir(String s) { ... } // INVÁLIDO se já existe um 'void exibir(String s)'",
        observation: "Use a sobrecarga para fornecer maneiras mais intuitivas e convenientes de chamar uma mesma operação."
      }
    ],
    codeExample:
`public class Calculadora {
    public static void main(String[] args) {
        int somaInt = somar(10, 20);
        System.out.println("Soma dos inteiros: " + somaInt);

        double somaDouble = somar(5.5, 4.5);
        System.out.println("Soma dos doubles: " + somaDouble);
        
        System.out.println("Soma de 3 números: " + somar(1, 2, 3));
    }

    // Método que retorna a soma de dois inteiros
    public static int somar(int a, int b) {
        return a + b;
    }

    // Sobrecarga: mesmo nome, mas com parâmetros double
    public static double somar(double a, double b) {
        return a + b;
    }
    
    // Sobrecarga: mesmo nome, mas com três parâmetros
    public static int somar(int a, int b, int c) {
        return a + b + c;
    }
}`,
    exampleExplanation: [
      "Define a classe Calculadora.",
      "Método principal onde a execução começa.",
      "Chama o método 'somar' com dois inteiros. O valor retornado é guardado na variável 'somaInt'.",
      "Imprime o resultado da soma dos inteiros.",
      "Chama a versão sobrecarregada de 'somar' com dois doubles. O valor retornado é guardado em 'somaDouble'.",
      "Imprime o resultado da soma dos doubles.",
      "Chama a segunda versão sobrecarregada de 'somar' com três inteiros.",
      "Declaração do método 'somar' que aceita dois 'int' e retorna um 'int'.",
      "Retorna a soma dos dois parâmetros.",
      "Declaração da primeira sobrecarga do método 'somar'. Aceita dois 'double' e retorna um 'double'.",
      "Retorna a soma dos dois parâmetros double.",
      "Declaração da segunda sobrecarga. Aceita três 'int' e retorna um 'int'.",
      "Retorna a soma dos três parâmetros."
    ],
    questions: allQuestions.slice(65, 70)
  },
  {
    id: 15,
    levelId: 'beginner',
    title: 'Desafio: Fundamentos de Strings',
    introduction: 'Aplique seu conhecimento sobre manipulação de strings.',
    topics: ['Strings são objetos', 'Imutabilidade de Strings', 'Concatenação', 'Obtendo o tamanho com .length()'],
    theory: [],
    questions: [],
    isChallenge: true,
    challenge: {
        objective: 'Manipular strings usando concatenação e métodos.',
        problem: 'Crie uma string `nomeCompleto` que junte `primeiroNome` e `segundoNome` com um espaço entre eles. Depois, crie uma string `nomeMaiusculo` que seja a versão em maiúsculas do `nomeCompleto`.',
        initialCode:
`public class DesafioStrings {
    public static void main(String[] args) {
        String primeiroNome = "ada";
        String segundoNome = "lovelace";
        
        // SEU CÓDIGO AQUI

        // System.out.println("Nome Completo: " + nomeCompleto);
        // System.out.println("Nome Maiúsculo: " + nomeMaiusculo);
    }
}`,
        solutionKeywords: ['+', '.toUpperCase()']
    }
  },
  {
    id: 16,
    levelId: 'beginner',
    title: 'Lição 16: Métodos Úteis de Strings',
    introduction: 'Explore métodos poderosos da classe String para manipular textos, como converter, comparar e verificar conteúdo.',
    topics: ['equals() vs ==', 'equalsIgnoreCase()', 'toUpperCase() e toLowerCase()', 'contains()', 'substring()'],
    theory: [
      {
        title: "Comparando Strings: equals() vs ==",
        explanation: "Para comparar o conteúdo de duas Strings, você DEVE usar o método `equals()`. O operador `==` compara se duas variáveis apontam para o mesmo objeto em memória, não se o conteúdo delas é o mesmo. Isso pode levar a resultados inesperados.",
        example: "String s1 = \"Java\";\nString s2 = new String(\"Java\");\n\nSystem.out.println(s1 == s2); // false (objetos diferentes)\nSystem.out.println(s1.equals(s2)); // true (conteúdo igual)",
        observation: "Sempre use `.equals()` para comparar se duas strings são textualmente idênticas."
      },
      {
        title: "Comparando sem Diferenciar Maiúsculas/Minúsculas",
        explanation: "Se você precisa comparar duas strings ignorando se os caracteres são maiúsculos ou minúsculos, use o método `equalsIgnoreCase()`.",
        example: "String s1 = \"Olá\";\nString s2 = \"olá\";\nSystem.out.println(s1.equals(s2)); // false\nSystem.out.println(s1.equalsIgnoreCase(s2)); // true",
        observation: "É muito útil para validar entradas de usuário, onde a capitalização pode variar."
      },
      {
        title: "Alterando a Caixa do Texto",
        explanation: "Os métodos `toUpperCase()` e `toLowerCase()` retornam uma NOVA string com todos os seus caracteres convertidos para maiúsculas ou minúsculas, respectivamente.",
        example: "String texto = \"PrOgRaMaÇãO\";\nSystem.out.println(texto.toUpperCase()); // Imprime \"PROGRAMAÇÃO\"\nSystem.out.println(texto.toLowerCase()); // Imprime \"programação\"",
        observation: "Lembre-se da imutabilidade: esses métodos não alteram a string original."
      },
      {
        title: "Verificando Conteúdo: contains()",
        explanation: "O método `contains()` verifica se uma sequência de caracteres (outra string) existe dentro da string principal. Ele retorna `true` ou `false`.",
        example: "String frase = \"Eu amo programar em Java\";\nSystem.out.println(frase.contains(\"Java\")); // true\nSystem.out.println(frase.contains(\"Python\")); // false",
        observation: "Este método é sensível a maiúsculas e minúsculas."
      },
      {
        title: "Extraindo Pedaços: substring()",
        explanation: "O método `substring()` retorna uma nova string que é uma parte da string original. Ele pode receber um ou dois argumentos inteiros (índices). `substring(inicio)` pega do início até o final. `substring(inicio, fim)` pega do início até o índice `fim - 1`.",
        example: "String data = \"2024-07-31\";\nString ano = data.substring(0, 4); // \"2024\"\nString dia = data.substring(8); // \"31\"",
        observation: "Assim como em arrays, os índices de Strings começam em 0."
      }
    ],
    codeExample:
`public class MetodosString {
    public static void main(String[] args) {
        String nome1 = "Ana";
        String nome2 = "ana";

        // Comparação
        System.out.println("equals: " + nome1.equals(nome2));
        System.out.println("equalsIgnoreCase: " + nome1.equalsIgnoreCase(nome2));

        String frase = "O Java é divertido!";
        
        // Conversão de caixa
        System.out.println("Maiúsculas: " + frase.toUpperCase());

        // Verificação de conteúdo
        System.out.println("Contém 'Java'? " + frase.contains("Java"));
        
        // Extração de substring
        String palavra = frase.substring(2, 6); // Pega do índice 2 ao 5
        System.out.println("Substring(2, 6): " + palavra); // Imprime "Java"
    }
}`,
    exampleExplanation: [
      "Define a classe principal.",
      "Método de entrada.",
      "Cria duas strings com conteúdo similar, mas caixas diferentes.",
      "Compara 'nome1' e 'nome2' de forma sensível à caixa (retorna false).",
      "Compara 'nome1' e 'nome2' ignorando a caixa (retorna true).",
      "Cria uma frase para os próximos exemplos.",
      "Converte a frase para maiúsculas e a imprime. A variável 'frase' original não é alterada.",
      "Verifica se a string 'frase' contém a substring \"Java\" (retorna true).",
      "Extrai uma parte da string 'frase'. Os caracteres nos índices 2, 3, 4 e 5 são \"Java\".",
      "Imprime a substring extraída."
    ],
    questions: allQuestions.slice(75, 80)
  },
  {
    id: 17,
    levelId: 'beginner',
    title: 'Lição 17: POO - Classes e Objetos',
    introduction: 'Entre no mundo da Programação Orientada a Objetos (POO). Aprenda a criar seus próprios tipos de dados usando classes para modelar o mundo real.',
    topics: ['O que é uma Classe?', 'O que é um Objeto?', 'Criando uma Classe', 'Instanciando um Objeto', 'Acessando Atributos'],
    theory: [
      {
        title: "O que é uma Classe?",
        explanation: "Uma classe é um 'molde' ou 'planta' para criar objetos. Ela define um conjunto de características (atributos) e comportamentos (métodos) que os objetos criados a partir dela terão. Por exemplo, uma classe `Carro` poderia definir que todo carro tem uma `cor` e uma `velocidade`, e que todo carro pode `acelerar()`.",
        example: "// A definição do molde\npublic class Carro {\n    String cor;\n    int ano;\n    double velocidade;\n\n    void acelerar() {\n        // ...\n    }\n}",
        observation: "Uma classe é um conceito abstrato. Ela define a estrutura, mas não é um carro de verdade; é apenas a ideia de um carro."
      },
      {
        title: "O que é um Objeto?",
        explanation: "Um objeto é uma 'instância' de uma classe. É a coisa real, concreta, criada a partir do molde. Se `Carro` é a planta, um objeto carro específico seria 'um carro vermelho, ano 2023' e outro objeto seria 'um carro azul, ano 2020'. Cada objeto tem seus próprios valores para os atributos definidos na classe.",
        example: "// Criando objetos reais a partir do molde Carro\nCarro meuCarro = new Carro();\nCarro carroDoVizinho = new Carro();",
        observation: "Você pode criar quantos objetos quiser a partir de uma única classe."
      },
      {
        title: "Atributos: As Características",
        explanation: "Atributos são as variáveis declaradas dentro de uma classe (mas fora de qualquer método). Eles representam o estado ou as características de um objeto. Cada objeto criado a partir da classe terá sua própria cópia desses atributos.",
        example: "public class Pessoa {\n    String nome; // Atributo\n    int idade; // Atributo\n}",
        observation: "Atributos também são conhecidos como 'campos' ou 'variáveis de instância'."
      },
      {
        title: "Instanciando um Objeto e Acessando Atributos",
        explanation: "Para criar um objeto, usamos a palavra-chave `new`, seguida pelo nome da classe e parênteses. Para acessar ou modificar os atributos de um objeto, usamos o nome da variável do objeto, um ponto (.), e o nome do atributo.",
        example: "Pessoa p1 = new Pessoa(); // Instanciação\n\n// Acessando e modificando atributos\np1.nome = \"João\";\np1.idade = 25;\n\nSystem.out.println(\"Nome: \" + p1.nome); // Imprime \"Nome: João\"",
        observation: "Acessar atributos diretamente assim é comum em exemplos iniciais, mas em POO avançada, usamos métodos para isso (veremos em lições futuras)."
      }
    ],
    codeExample:
`// 1. Definição da Classe (o molde)
class Produto {
    String nome;
    double preco;
    int quantidade;
}

// Classe principal para executar o programa
public class Loja {
    public static void main(String[] args) {
        // 2. Instanciação de Objetos (criando os produtos reais)
        Produto produto1 = new Produto();
        produto1.nome = "Caderno";
        produto1.preco = 15.50;
        produto1.quantidade = 10;

        Produto produto2 = new Produto();
        produto2.nome = "Caneta";
        produto2.preco = 3.20;
        
        System.out.println("Produto 1: " + produto1.nome);
        System.out.println("Preço: R$ " + produto1.preco);
    }
}`,
    exampleExplanation: [
      "Define a classe 'Produto', que servirá como um molde.",
      "Atributo para armazenar o nome do produto.",
      "Atributo para o preço.",
      "Atributo para a quantidade em estoque.",
      "Define a classe que conterá o método main.",
      "Ponto de entrada do programa.",
      "Cria um novo objeto (instância) da classe Produto e o armazena na variável 'produto1'.",
      "Define o atributo 'nome' do objeto 'produto1'.",
      "Define o preço do objeto 'produto1'.",
      "Define a quantidade do objeto 'produto1'.",
      "Cria um segundo objeto da classe Produto.",
      "Define o nome do objeto 'produto2'.",
      "Define o preço do objeto 'produto2'. O atributo 'quantidade' deste objeto terá seu valor padrão (0 para int).",
      "Acessa e imprime o nome do 'produto1'.",
      "Acessa e imprime o preço do 'produto1'."
    ],
    questions: allQuestions.slice(80, 85)
  },
  {
    id: 18,
    levelId: 'beginner',
    title: 'Lição 18: Construtores e a Palavra-chave `this`',
    introduction: 'Aprenda a inicializar seus objetos de forma eficiente com construtores e a desambiguar variáveis com a palavra-chave `this`.',
    topics: ['O que é um Construtor?', 'Construtor Padrão vs. Personalizado', 'A palavra-chave `this`'],
    theory: [
      {
        title: "O que é um Construtor?",
        explanation: "Um construtor é um método especial que é chamado automaticamente quando um objeto de uma classe é criado (instanciado). Sua principal função é inicializar os atributos do objeto, garantindo que ele nasça em um estado válido e consistente. Um construtor tem o mesmo nome da classe e não possui tipo de retorno, nem mesmo `void`.",
        example: "public class Carro {\n    String modelo;\n\n    // Este é o construtor da classe Carro\n    public Carro(String modeloInicial) {\n        System.out.println(\"Construtor foi chamado!\");\n        modelo = modeloInicial;\n    }\n}\n\n// Ao criar o objeto, o construtor é executado:\nCarro meuCarro = new Carro(\"Fusca\"); // Imprime \"Construtor foi chamado!\"",
        observation: "O construtor nos permite obrigar que certos dados sejam fornecidos no momento da criação do objeto."
      },
      {
        title: "Construtor Padrão vs. Personalizado",
        explanation: "Se você não definir nenhum construtor em sua classe, o Java fornece um 'construtor padrão' invisível. Ele não recebe parâmetros e não faz nada, apenas cria o objeto com os valores padrão dos atributos (0, null, false). No momento em que você define QUALQUER construtor, o construtor padrão deixa de existir.",
        example: "class Livro {\n    String titulo;\n    // Sem construtor aqui, então o padrão existe\n}\nLivro l1 = new Livro(); // Funciona\n\nclass Autor {\n    String nome;\n    public Autor(String n) { nome = n; }\n}\n// Autor a1 = new Autor(); // ERRO! O construtor padrão não existe mais.",
        observation: "É uma boa prática sempre definir um construtor para suas classes para garantir a inicialização correta dos dados."
      },
      {
        title: "Desambiguação com 'this'",
        explanation: "Frequentemente, os nomes dos parâmetros do construtor são os mesmos que os nomes dos atributos da classe. Para diferenciar o atributo do parâmetro, usamos a palavra-chave `this`. `this` é uma referência para o próprio objeto atual. `this.atributo` se refere ao atributo do objeto, enquanto `atributo` sozinho se refere ao parâmetro do método.",
        example: "public class Pessoa {\n    String nome;\n\n    public Pessoa(String nome) {\n        // this.nome é o atributo da classe\n        // nome é o parâmetro recebido\n        this.nome = nome;\n    }\n}",
        observation: "O uso do 'this' é uma convenção muito forte e torna o código mais claro e legível, evitando confusão."
      }
    ],
    codeExample:
`class Aluno {
    String nome;
    int matricula;

    // Construtor da classe Aluno
    public Aluno(String nome, int matricula) {
        System.out.println("Criando um novo aluno...");
        this.nome = nome;
        this.matricula = matricula;
    }

    public void exibirInfo() {
        System.out.println("Aluno: " + this.nome + " | Matrícula: " + this.matricula);
    }
}

public class Escola {
    public static void main(String[] args) {
        // Criando objetos usando o construtor
        Aluno aluno1 = new Aluno("João", 12345);
        Aluno aluno2 = new Aluno("Maria", 54321);

        aluno1.exibirInfo();
        aluno2.exibirInfo();
    }
}`,
    exampleExplanation: [
      "Define a classe Aluno.",
      "Atributo para o nome.",
      "Atributo para a matrícula.",
      "Define o construtor, que recebe um nome e uma matrícula como parâmetros.",
      "Imprime uma mensagem para indicar que o construtor está sendo executado.",
      "Usa 'this.nome' para atribuir o valor do parâmetro 'nome' ao atributo 'nome' do objeto.",
      "Usa 'this.matricula' para atribuir o valor do parâmetro 'matricula' ao atributo 'matricula' do objeto.",
      "Define um método para exibir as informações do aluno.",
      "Imprime os atributos do objeto atual, usando 'this' para clareza (embora não seja estritamente necessário aqui).",
      "Define a classe principal do programa.",
      "Ponto de entrada.",
      "Cria o 'aluno1', chamando o construtor com os valores \"João\" e 12345.",
      "Cria o 'aluno2', chamando o construtor com os valores \"Maria\" e 54321.",
      "Chama o método 'exibirInfo' do objeto 'aluno1'.",
      "Chama o método 'exibirInfo' do objeto 'aluno2'."
    ],
    questions: allQuestions.slice(85, 90)
  },
  {
    id: 19,
    levelId: 'beginner',
    title: 'Lição 19: Encapsulamento e Modificadores de Acesso',
    introduction: 'Descubra um dos pilares da POO, o encapsulamento. Aprenda a proteger os dados do seu objeto usando modificadores de acesso.',
    topics: ['O que é Encapsulamento?', 'Modificador de Acesso `private`', 'Por que proteger os dados?'],
    theory: [
      {
        title: "O que é Encapsulamento?",
        explanation: "Encapsulamento é o princípio de agrupar os dados (atributos) e os métodos que operam nesses dados dentro de uma única unidade (a classe), e esconder os detalhes internos do objeto do mundo exterior. A ideia é proteger os dados de acessos e modificações indevidas, expondo apenas uma interface segura e controlada.",
        example: "// Em vez de acessar o saldo diretamente...\n// conta.saldo = -1000; (RUIM!)\n\n// ...usamos um método que valida a operação.\n// conta.sacar(100); (BOM!)",
        observation: "Pense em uma cápsula de remédio: você não precisa saber a fórmula exata dentro dela, apenas como e quando tomá-la. O encapsulamento funciona de forma parecida."
      },
      {
        title: "Escondendo com 'private'",
        explanation: "O modificador de acesso `private` é a principal ferramenta para o encapsulamento. Um atributo ou método declarado como `private` só pode ser acessado de dentro da própria classe. Nenhuma outra classe, nem mesmo a `main`, pode ver ou modificar um membro `private` diretamente.",
        example: "public class ContaBancaria {\n    private double saldo;\n    // Agora o saldo não pode ser acessado de fora.\n}",
        observation: "Em contraste, `public` significa que o membro pode ser acessado de qualquer lugar. É a ausência de encapsulamento."
      },
      {
        title: "Por que Proteger os Dados?",
        explanation: "Proteger os dados (torná-los `private`) nos dá controle total sobre eles. Impede que valores inválidos sejam atribuídos (ex: um saldo negativo, uma idade negativa). Permite que a classe mantenha um estado interno consistente e nos dá a liberdade de mudar a implementação interna da classe sem quebrar o código que a utiliza.",
        example: "public class Pessoa {\n    private int idade;\n\n    public void setIdade(int novaIdade) {\n        if (novaIdade > 0) { // Validação\n            this.idade = novaIdade;\n        }\n    }\n}",
        observation: "A regra geral da POO é: comece com todos os atributos `private` e libere o acesso de forma controlada apenas quando necessário."
      }
    ],
    codeExample:
`class Conta {
    private double saldo;

    public Conta(double saldoInicial) {
        if (saldoInicial > 0) {
            this.saldo = saldoInicial;
        } else {
            this.saldo = 0;
        }
    }

    public void depositar(double valor) {
        if (valor > 0) {
            this.saldo = this.saldo + valor;
            System.out.println("Depósito realizado com sucesso.");
        }
    }
    
    public double getSaldo() {
        return this.saldo;
    }
}

public class Banco {
    public static void main(String[] args) {
        Conta minhaConta = new Conta(100.0);
        
        // minhaConta.saldo = -500; // ERRO! 'saldo' é privado.
        
        minhaConta.depositar(50.0);
        
        System.out.println("Saldo atual: " + minhaConta.getSaldo());
    }
}`,
    exampleExplanation: [
      "Define a classe Conta.",
      "Declara o atributo 'saldo' como 'private'. Ele só pode ser acessado dentro desta classe.",
      "Construtor que inicializa a conta com um valor.",
      "Garante que a conta não comece com saldo negativo.",
      "Método público para depositar. Qualquer um pode chamar este método.",
      "Valida se o valor do depósito é positivo.",
      "Modifica o 'saldo' de forma segura.",
      "Método público para consultar o saldo. Ele permite a leitura do valor, mas não a modificação.",
      "Retorna o valor do atributo privado 'saldo'.",
      "Classe principal para testar.",
      "Ponto de entrada.",
      "Cria uma instância de Conta.",
      "Esta linha, se descomentada, causaria um erro de compilação, pois 'saldo' tem acesso privado.",
      "Chama o método público 'depositar' para alterar o saldo de forma controlada.",
      "Chama o método público 'getSaldo' para ler o valor do saldo."
    ],
    questions: allQuestions.slice(90, 95)
  },
  {
    id: 20,
    levelId: 'beginner',
    title: 'Desafio: Acesso Controlado com Getters e Setters',
    introduction: 'Aplique seu conhecimento sobre encapsulamento para criar uma classe segura.',
    topics: ['Métodos Getters (Acessores)', 'Métodos Setters (Modificadores)', 'Validação em Setters', 'Encapsulamento na Prática'],
    theory: [],
    questions: [],
    isChallenge: true,
    challenge: {
        objective: 'Criar uma classe com atributos privados e métodos de acesso (getters) e modificação (setters) públicos.',
        problem: 'Crie uma classe `Produto` com os atributos privados `nome` (String) e `preco` (double). Implemente um getter e um setter para cada atributo. O setter do `preco` deve garantir que o novo preço seja maior que zero.',
        initialCode: 
`class Produto {
    // SEUS ATRIBUTOS E MÉTODOS AQUI
}

public class Main {
    public static void main(String[] args) {
        Produto p = new Produto();
        p.setNome("Laptop");
        p.setPreco(4500.00);
        p.setPreco(-100.00); // Isso não deve alterar o preço

        System.out.println(p.getNome() + ": R$ " + p.getPreco());
    }
}`,
        solutionKeywords: ['private', 'public', 'String', 'double', 'getNome', 'setNome', 'getPreco', 'setPreco', 'if']
    }
  },
];

export const getBeginnerLessons = (): Lesson[] => {
  return beginnerLessons;
};

export const getBeginnerLessonById = (lessonId: number): Lesson | undefined => {
  return beginnerLessons.find(lesson => lesson.id === lessonId);
};
