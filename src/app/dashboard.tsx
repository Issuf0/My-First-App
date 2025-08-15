import { View, Text, StyleSheet, TouchableOpacity, Animated, StatusBar } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { Audio, AVPlaybackStatus } from 'expo-av';
import { useBackgroundSound } from "@/hooks/useBackground";
import { normalize, vh, vw } from "../utils/responsive";
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

const perguntas = [
    {
        pergunta: "O que significa POO?",
        opcoes: ["Programação Orientada a Objectos", "Programa Original de Operações", "Plano Operações Online"],
        correta: "Programação Orientada a Objectos"
    },
    {
        pergunta: "É correcto afirmar que Java é...",
        opcoes: ["Linguagem de programação de alto nível", "Linguagem de programação de baixo nível", "Linguagem usado no front-end", "Não sei"],
        correta: "Linguagem de programação de alto nível"
    },
    {
        pergunta: "Qual é a palavra-chave usado para herança no Java ?",
        opcoes: ["inherits", "extends", "implements", "super"],
        correta: "extends"
    },
    {
        pergunta: "Qual é o papel dos métodos get e set?",
        opcoes: ["Permitir leitura e modificação controlada de atributos private", "Declarar atributos como públicos", "Definir o tipo de herança da classe", "Criar construtores automaticos"],
        correta: "Permitir leitura e modificação controlada de atributos private"
    },
    {
        pergunta: "O que é encapsulamento em Java?",
        opcoes: ["Ocultar detalhes internos de uma classe e controlar o acesso aos seus dados", "Compartilhar todas as variáveis com outras classes", "Criar métodos públicos apenas para leitura", "Armanezar todas as variáveis num ficheiro externo"],
        correta: "Ocultar detalhes internos de uma classe e controlar o acesso aos seus dados"
    },
    {
        pergunta: "Quando usamos herança em Java, o que acontece com a superclasse?",
        opcoes: ["Torna-se uma classe abstrata", "Perde o acesso a seus próprios métodos", "Gera automaticamente novos pacotes", "Herda os atributos e métodos da superclasse"],
        correta: "Herda os atributos e métodos da superclasse"
    },
    {
        pergunta: "O que define a relação entre Funcionario e chefe numa herança?",
        opcoes: ["Funcionario é um pacote que contém Chefe", "Chefe e Funcionario não podem coexistir numa classe", "Chefe herda características da classe Funcionario", "Funconario é uma interface de Chefe"],
        correta: "Chefe herda características da classe Funcionario"
    },
    {
        pergunta: "Qual é a principal função do modificador private em Java?",
        opcoes: ["Permitir o acesso global a todas as classes", "Restringir o acesso directo a atributos e métodos", "Compartilhar métodos com outros pacotes", "Executar o método principal"],
        correta: "Restringir o acesso directo a atributos e métodos"
    },
    {
        pergunta: "Qual destas é uma vantagem da programação modular?",
        opcoes: ["Exige menos classes e mais variáveis globais", "Elimina o uso de métodos", "Facilita a manunteção e reutilização de código", "Impede a criação de objectos"],
        correta: "Facilita a manunteção e reutilização de código"
    },
    {
        pergunta: "Qual é a função principal de um package em Java?",
        opcoes: ["Agrupar classes e interfaces relacionadas", "Impedir a modularização do código", "Aumentar o tempo de execução", "Eliminar a necessidade de construtores"],
        correta: "Agrupar classes e interfaces relacionadas"
    },
    {
        pergunta: "O que é modularização em Java?",
        opcoes: ["É o processo de compilar métodos em classes aleatórias", "É a criação de um único ficheiro com todas as funções", "É a duplicação código para facilitar a execução", "É dividir programa em partes independentes com responsabilidades específicas"],
        correta: "É dividir programa em partes independentes com responsabilidades específicas"
    },
    {
        pergunta: "Qual das seguintes opções representa um método que não retorno valor?",
        opcoes: ["void imprimirMensagem()", "int calcularSoma()", "String obterNome()", "boolean validarSenha()"],
        correta: "void imprimirMensagem()"
    },
    {
        pergunta: "Onde devem ser definidos os parâmetros de um método?",
        opcoes: ["Na sua declaração, entre parênteses", "Fora da classe principal", "Apenas dentro de blocos if", "No final do programa, fora da mim"],
        correta: "Na sua declaração, entre parênteses"
    },
    {
        pergunta: "Qual destas regras é correcta sobre nomes de métodos em Java?",
        opcoes: ["Devem terminar com ponto e vírgula", "Devem smepre começar com 'main'", "Podem conter espaços em branco", "Devem começar com letra mainúscula e ser um verbo"],
        correta: "Devem começar com letra mainúscula e ser um verbo"
    },
    {
        pergunta: "O que significa o modificador static em um método?",
        opcoes: ["O método pertence à classe e não à instância", "O método pode ser executado apenas uma vez", "O método é protegido por uma senha", "O método só pode ser chamado de fora da classe"],
        correta: "O método pertence à classe e não à instância"
    },
    {
        pergunta: "O que é um objeto em POO?",
        opcoes: ["Uma instância de uma classe", "Um tipo de dado primitivo", "Uma variável de classe", "Uma anotação para documentação"],
        correta: "Uma instância de uma classe"
    },
    {
        pergunta: "Qual a finalidade de um método 'setter'?",
        opcoes: ["Modificar o valor de um atributo privado", "Retornar o valor de um atributo privado", "Criar uma nova instância da classe", "Destruir um objeto"],
        correta: "Modificar o valor de um atributo privado"
    },
    {
        pergunta: "O que a palavra-chave 'instanceof' faz?",
        opcoes: ["Verifica se um objeto é uma instância de uma classe específica", "Cria uma nova instância de uma classe", "Compara dois objetos", "Retorna o tipo de um objeto"],
        correta: "Verifica se um objeto é uma instância de uma classe específica"
    },
    {
        pergunta: "Qual é a principal vantagem do encapsulamento?",
        opcoes: ["Ocultar a complexidade e proteger os dados", "Permitir o acesso direto aos atributos", "Aumentar o acoplamento entre as classes", "Reduzir o número de métodos"],
        correta: "Ocultar a complexidade e proteger os dados"
    },
    {
        pergunta: "O que é uma exceção em Java?",
        opcoes: ["Um evento que interrompe o fluxo normal do programa", "Um tipo de erro de sintaxe", "Uma classe que não pode ser instanciada", "Um método que não retorna valor"],
        correta: "Um evento que interrompe o fluxo normal do programa"
    },
    {
        pergunta: "Qual a diferença entre 'throw' e 'throws' em Java?",
        opcoes: ["'throw' é usado para lançar uma exceção, 'throws' é usado na assinatura de um método para indicar que ele pode lançar exceções", "'throws' é usado para lançar uma exceção, 'throw' é usado na assinatura de um método", "Não há diferença", "'throw' é usado para tratar exceções, 'throws' é usado para lançá-las"],
        correta: "'throw' é usado para lançar uma exceção, 'throws' é usado na assinatura de um método para indicar que ele pode lançar exceções"
    },
    {
        pergunta: "O que é o 'garbage collector' em Java?",
        opcoes: ["Um processo que libera memória de objetos não utilizados", "Uma ferramenta para depurar código", "Um tipo de exceção", "Uma classe para formatar strings"],
        correta: "Um processo que libera memória de objetos não utilizados"
    },
    {
        pergunta: "Qual a finalidade da anotação '@Override'?",
        opcoes: ["Indicar que um método está sobrescrevendo um método da superclasse", "Indicar que um método está obsoleto", "Indicar que um método é privado", "Indicar que um método é estático"],
        correta: "Indicar que um método está sobrescrevendo um método da superclasse"
    },
    {
        pergunta: "O que é uma classe aninhada (nested class) em Java?",
        opcoes: ["Uma classe definida dentro de outra classe", "Uma classe que herda de outra classe", "Uma classe que não pode ser instanciada", "Uma classe que contém apenas métodos estáticos"],
        correta: "Uma classe definida dentro de outra classe"
    },
    {
        pergunta: "Qual a diferença entre 'ArrayList' e 'LinkedList' em Java?",
        opcoes: ["'ArrayList' usa um array dinâmico, 'LinkedList' usa uma lista duplamente encadeada", "'LinkedList' é mais rápido para acessar elementos por índice", "'ArrayList' é mais eficiente para inserção e remoção de elementos no meio da lista", "Não há diferença de desempenho"],
        correta: "'ArrayList' usa um array dinâmico, 'LinkedList' usa uma lista duplamente encadeada"
    }
];

// Componente para símbolos de fundo
const BackgroundSymbols = () => {
    const symbols = [
        'public class {}', 'int main()', 'System.out.println()', 'new Object()',
        'if (condition)', 'for (int i=0)', 'String text', 'boolean flag',
        'try { }', 'catch (e)', 'import java.*', 'extends Object',
        'private void', 'static final', 'ArrayList<>', 'HashMap<>',
        'interface {}', 'abstract class', '@Override', 'throws Exception'
    ];

    return (
        <View style={styles.backgroundContainer}>
            {Array.from({ length: 15 }, (_, index) => (
                <Text
                    key={index}
                    style={[
                        styles.backgroundSymbol,
                        {
                            top: Math.random() * vh(100),
                            left: Math.random() * vw(100),
                            opacity: 0.1,
                            fontSize: normalize(Math.random() * 20 + 12),
                            transform: [{ rotate: `${ Math.random() * 360 }deg` }]
                    }
                    ]}
                >
            {symbols[Math.floor(Math.random() * symbols.length)]}
        </Text>
    ))
}
        </View >
    );
};

const backgroundMusic = require('@/assets/audio/background.mp3');

export default function Dashboard() {
    const [isMuted, setIsMuted] = useState(false);
    useBackgroundSound(backgroundMusic, !isMuted);

    const [index, setIndex] = useState(0);
    const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
    const [mostrarResposta, setMostrarResposta] = useState(false);
    const [pontuacao, setPontuacao] = useState(0);
    const [respostasCorretas, setRespostasCorretas] = useState(0);
    const [quizCompleto, setQuizCompleto] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [shuffledPerguntas, setShuffledPerguntas] = useState<any[]>([]);

    // Animações
    const slideAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

    const shufflePerguntas = () => {
        const shuffled = [...perguntas].sort(() => Math.random() - 0.5);
        setShuffledPerguntas(shuffled);
    };

    const playSound = async (soundType: 'correct' | 'incorrect' | 'celebration' | 'finish') => {
        try {
            let soundFile;
            if (soundType === 'correct') {
                soundFile = require('@/assets/audio/success.wav');
            } else if (soundType === 'incorrect') {
                soundFile = require('@/assets/audio/wrong.wav');
            } else if (soundType === 'celebration') {
                soundFile = require('@/assets/audio/coorect.wav');
            } else if (soundType === 'finish') {
                soundFile = require('@/assets/audio/fim.wav');
            }

            if (soundFile) {
                const { sound } = await Audio.Sound.createAsync(soundFile);
                await sound.playAsync();
                sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
                    if ((status as any).didJustFinish) {
                        sound.unloadAsync();
                    }
                });
            }
        } catch (error) {
            console.log('Erro ao tocar som:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            shufflePerguntas();
            animateQuestionEntry();
            updateProgress();
        }, [])
    );

    const animateQuestionEntry = () => {
        slideAnim.setValue(-vw(100));
        Animated.spring(slideAnim, {
            toValue: 0,
            tension: 50,
            friction: 8,
            useNativeDriver: true
        }).start();
    };

    const updateProgress = () => {
        Animated.timing(progressAnim, {
            toValue: (index + 1) / shuffledPerguntas.length,
            duration: 300,
            useNativeDriver: false
        }).start();
    };

    const animateCelebration = () => {
        setShowCelebration(true);
    };

    const selecionarResposta = async (opcao: string) => {
        if (mostrarResposta) return;

        setRespostaSelecionada(opcao);
        setMostrarResposta(true);

        const isCorrect = opcao === shuffledPerguntas[index].correta;

        if (isCorrect) {
            setPontuacao(pontuacao + 10);
            setRespostasCorretas(respostasCorretas + 1);

            await playSound('correct');

            // Animação de escala para resposta correta
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1,
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                })
            ]).start();

            // Celebração a cada 3 respostas corretas
            if ((respostasCorretas + 1) % 3 === 0) {
                animateCelebration();
                await playSound('celebration');
            }
        } else {
            await playSound('incorrect');
        }

        setTimeout(() => {
            proximaPergunta();
        }, 2000);
    };

    const proximaPergunta = () => {
        if (index < shuffledPerguntas.length - 1) {
            setIndex(index + 1);
            setRespostaSelecionada(null);
            setMostrarResposta(false);
        } else {
            setQuizCompleto(true);
            // Som específico de finalização do quiz
            setTimeout(() => {
                playSound('finish');
            }, 500);
        }
    };

    const reiniciarQuiz = () => {
        setIndex(0);
        setRespostaSelecionada(null);
        setMostrarResposta(false);
        setPontuacao(0);
        setRespostasCorretas(0);
        setQuizCompleto(false);
        slideAnim.setValue(0);
        scaleAnim.setValue(1);
        progressAnim.setValue(0);
        shufflePerguntas();
    };

    const getMotivationalMessage = () => {
        const percentage = (pontuacao / (shuffledPerguntas.length * 10)) * 100;
        if (percentage >= 80) {
            return "Excelente! Você é um mestre em Java POO!";
        } else if (percentage >= 50) {
            return "Muito bom! Continue praticando para se tornar um mestre!";
        } else {
            return "Não desista! A prática leva à perfeição!";
        }
    };

    if (quizCompleto) {
        return (
            <View style={styles.container}>
                <BackgroundSymbols />
                <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
                <View style={styles.completionContainer}>
                    <Animatable.View animation="bounceInUp" duration={1500} style={styles.completionCard}>
                        <Text style={styles.completionTitle}>Quiz Completo! 🎉</Text>
                        <Text style={styles.completionScore}>
                            Pontuação Final: {pontuacao}/{shuffledPerguntas.length * 10}
                        </Text>
                        <Text style={styles.completionPercentage}>
                            {Math.round((pontuacao / (shuffledPerguntas.length * 10)) * 100)}% de acerto
                        </Text>
                        <Text style={styles.motivationalMessage}>{getMotivationalMessage()}</Text>
                        <TouchableOpacity style={styles.restartButton} onPress={reiniciarQuiz}>
                            <Text style={styles.restartButtonText}>🔄 Reiniciar Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backHomeButton} onPress={() => router.back()}>
                            <Text style={styles.backHomeButtonText}>← Voltar ao Menu</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <BackgroundSymbols />
            <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

            {showCelebration && (
                <Animatable.View
                    animation="tada"
                    duration={1500}
                    style={styles.celebrationOverlay}
                    onAnimationEnd={() => setShowCelebration(false)}
                >
                    <Text style={styles.celebrationText}>Você está indo muito bem! Continue assim!</Text>
                </Animatable.View>
            )}

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreText}>Pontuação: {pontuacao}</Text>
                        <Text style={styles.correctAnswersText}>Corretas: {respostasCorretas}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setIsMuted(!isMuted)} style={styles.muteButton}>
                        <Ionicons name={isMuted ? "volume-mute" : "volume-high"} size={normalize(24)} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <Animated.View
                        style={[
                            styles.progressFill,
                            {
                                width: progressAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%']
                                })
                            }
                        ]}
                    />
                </View>
                <Text style={styles.progressText}>
                    {index + 1} de {shuffledPerguntas.length}
                </Text>
            </View>

            {shuffledPerguntas.length > 0 && (
                <>
                    {/* Question Container */}
                    <Animated.View
                        style={[
                            styles.questionContainer,
                            {
                                transform: [
                                    { translateX: slideAnim },
                                    { scale: scaleAnim }
                                ]
                            }
                        ]}
                    >
                        <Text style={styles.questionNumber}>Pergunta {index + 1}</Text>
                        <Text style={styles.questionText}>{shuffledPerguntas[index].pergunta}</Text>
                    </Animated.View>

                    {/* Options */}
                    <View style={styles.optionsContainer}>
                        {shuffledPerguntas[index].opcoes.map((opcao: string, i: number) => {
                            let buttonStyle: any[] = [styles.optionButton];
                            let textStyle: any[] = [styles.optionText];

                            if (mostrarResposta) {
                                if (opcao === shuffledPerguntas[index].correta) {
                                    buttonStyle.push(styles.correctOption);
                                    textStyle.push(styles.correctOptionText);
                                } else if (opcao === respostaSelecionada && opcao !== shuffledPerguntas[index].correta) {
                                    buttonStyle.push(styles.incorrectOption);
                                    textStyle.push(styles.incorrectOptionText);
                                }
                            }

                            return (
                                <TouchableOpacity
                                    key={i}
                                    style={buttonStyle}
                                    onPress={() => selecionarResposta(opcao)}
                                    disabled={mostrarResposta}
                                >
                                    <Text style={textStyle}>{opcao}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </>
            )}

            {/* Botão Voltar */}
            <View style={styles.backContainer}>
                <TouchableOpacity style={styles.backButtonMain} onPress={() => router.back()}>
                    <Text style={styles.backButtonMainText}>← Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
        paddingHorizontal: vw(5),
        paddingTop: vh(7),
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    backgroundSymbol: {
        position: 'absolute',
        color: '#16213e',
        fontFamily: 'monospace',
        fontWeight: '300',
    },
    header: {
        backgroundColor: '#16213e',
        borderRadius: normalize(15),
        padding: normalize(10),
        marginBottom: vh(2),
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    muteButton: {
        padding: vw(2),
    },
    celebrationOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    celebrationText: {
        fontSize: normalize(36),
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'center',
        marginHorizontal: vw(10),
    },
    progressContainer: {
        marginBottom: vh(3),
        alignItems: 'center',
    },
    progressBar: {
        width: '100%',
        height: vh(1),
        backgroundColor: '#16213e',
        borderRadius: normalize(4),
        overflow: 'hidden',
        marginBottom: vh(1),
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#ff6b35',
        borderRadius: normalize(4),
    },
    progressText: {
        color: '#e94560',
        fontSize: normalize(16),
        fontWeight: '600',
    },
    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: vw(4),
    },
    scoreText: {
        color: '#FFD700',
        fontSize: normalize(20),
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    correctAnswersText: {
        color: '#ff6b35',
        fontSize: normalize(20),
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    questionContainer: {
        backgroundColor: '#16213e',
        borderRadius: normalize(15),
        padding: normalize(25),
        marginBottom: vh(4),
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#0f3460',
    },
    questionNumber: {
        color: '#ff6b35',
        fontSize: normalize(16),
        fontWeight: 'bold',
        marginBottom: vh(1.5),
        textAlign: 'center',
    },
    questionText: {
        color: '#ffffff',
        fontSize: normalize(20),
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: normalize(28),
    },
    optionsContainer: {
        flex: 1,
        marginBottom: vh(3),
    },
    optionButton: {
        backgroundColor: '#ff6b35',
        borderRadius: normalize(12),
        padding: normalize(18),
        marginVertical: vh(1),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderWidth: 2,
        borderColor: '#e55a2b',
    },
    optionText: {
        color: '#ffffff',
        fontSize: normalize(16),
        fontWeight: '600',
        textAlign: 'center',
    },
    correctOption: {
        backgroundColor: '#27ae60',
        borderColor: '#229954',
    },
    correctOptionText: {
        color: '#ffffff',
    },
    incorrectOption: {
        backgroundColor: '#e74c3c',
        borderColor: '#c0392b',
    },
    incorrectOptionText: {
        color: '#ffffff',
    },
    completionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completionCard: {
        backgroundColor: '#16213e',
        borderRadius: normalize(20),
        padding: normalize(40),
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        borderWidth: 2,
        borderColor: '#0f3460',
        width: '90%',
    },
    completionTitle: {
        color: '#ff6b35',
        fontSize: normalize(28),
        fontWeight: 'bold',
        marginBottom: vh(3),
        textAlign: 'center',
    },
    completionScore: {
        color: '#ffffff',
        fontSize: normalize(24),
        fontWeight: '600',
        marginBottom: vh(1.5),
        textAlign: 'center',
    },
    completionPercentage: {
        color: '#e94560',
        fontSize: normalize(20),
        fontWeight: '600',
        marginBottom: vh(2),
        textAlign: 'center',
    },
    motivationalMessage: {
        color: '#FFD700',
        fontSize: normalize(18),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: vh(4),
    },
    restartButton: {
        backgroundColor: '#ff6b35',
        borderRadius: normalize(25),
        paddingVertical: vh(2),
        paddingHorizontal: vw(7),
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    restartButtonText: {
        color: '#ffffff',
        fontSize: normalize(18),
        fontWeight: 'bold',
    },
    backHomeButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: normalize(20),
        paddingVertical: vh(1.5),
        paddingHorizontal: vw(6),
        marginTop: vh(2),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    backHomeButtonText: {
        color: '#ffffff',
        fontSize: normalize(16),
        fontWeight: '600',
        textAlign: 'center',
    },
    backContainer: {
        alignItems: 'center',
        paddingBottom: vh(3),
    },
    backButtonMain: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: vw(6),
        paddingVertical: vh(1.5),
        borderRadius: normalize(20),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    backButtonMainText: {
        color: '#ffffff',
        fontSize: normalize(16),
        fontWeight: '600',
    },
});