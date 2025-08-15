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
        pergunta: "Qual é o tipo de dado usado para armanezar números inteiros em Java?",
        opcoes: ["float", "int", "boolean", "char"],
        correta: "int"
    },
    {
        pergunta: "Qual palavra-chave é usada para criar uma classe em Java?",
        opcoes: ["class", "object", "new", "package"],
        correta: "class"
    },
    {
        pergunta: "O que acontece quando usamos um new em Java?",
        opcoes: ["Um novo objecto é criado e o construtor da classe é executado", "Um novo pacote é iniciado", "Uma nova variável global é declarada", "A função main é encerrada"],
        correta: "Um novo objecto é criado e o construtor da classe é executado"
    },
    {
        pergunta: "O que é um metódo em Java?",
        opcoes: ["Um operador lógico usado em expressões", "Um tipo de classe abastrata", "Uma variável que armazena dados temporários", "Um conjunto de instruções que podem ser executadas várias vezes"],
        correta: "Um conjunto de instruções que podem ser executadas várias vezes"
    },
    {
        pergunta: "Qual é o operador de adição em Java?",
        opcoes: ["++", "+", "+=", "add"],
        correta: "+"
    },
    {
        pergunta: "Qual destes é usado para guardar texto em Java?",
        opcoes: ["char", "String", "int", "boolean"],
        correta: "String"
    },
    {
        pergunta: "Como se escreve uma variável inteira chamada idade?",
        opcoes: ["int idade", "integer idade", "idade int", "num idade"],
        correta: "int idade"
    },
    {
        pergunta: "Qual estrutura de controlo é usada para repetições?",
        opcoes: ["if", "switch", "loop", "for"],
        correta: "for"
    },
    {
        pergunta: "Qual palavra-chave serve para criar um objecto?",
        opcoes: ["init", "new", "make", "create"],
        correta: "new"
    },
    {
        pergunta: "Como começa a execução de um programa em Java?",
        opcoes: ["Pela função start()", "Pelo método main()", "Pela classe program()", "Pelo construtor de classe pai"],
        correta: "Pelo método main()"
    },
    {
        pergunta: "Qual destes é um tipo de dado primitivo em Java?",
        opcoes: ["String", "Array", "int", "Scanner"],
        correta: "int"
    },
    {
        pergunta: "Qual símbolo é usado para comentários de uma linha em Java?",
        opcoes: ["#", "//", "/*", "<!-- -->"],
        correta: "//"
    },
    {
        pergunta: "O que System.out.println() faz?",
        opcoes: ["Lê dados do utilizador", "Compila o código", "Imprime algo no ecrã", "Cria uma nova nova variável"],
        correta: "Imprime algo no ecrã"
    },
    {
        pergunta: "Qual é o modificador de acesso mais restritivo em Java?",
        opcoes: ["protected", "public", "default(sem modificador)", "private"],
        correta: "private"
    },
    {
        pergunta: "Qual é a diferença entre == e .equals() em Java?",
        opcoes: ["== compara valores, .equals() compara referências", ".equals() é apenas usado para tipos primitivos", "Ambos comparam valores de forma idêntica, sempre.", "== compara referências, .equals() compara valores"],
        correta: "== compara referências, .equals() compara valores"
    },
    {
        pergunta: "O que o operador '&&' representa em Java?",
        opcoes: ["E lógico (AND)", "OU lógico (OR)", "Negação lógica (NOT)", "OU exclusivo (XOR)"],
        correta: "E lógico (AND)"
    },
    {
        pergunta: "Qual é a sintaxe correta para um loop 'while' em Java?",
        opcoes: ["while (condição) { ... }", "while { ... } (condição)", "loop (condição) { ... }", "while.loop (condição) { ... }"],
        correta: "while (condição) { ... }"
    },
    {
        pergunta: "Como se declara um array de inteiros com 5 elementos em Java?",
        opcoes: ["int[] meuArray = new int[5];", "int meuArray[5];", "array<int> meuArray = new array<int>(5);", "int meuArray = {0, 0, 0, 0, 0};"],
        correta: "int[] meuArray = new int[5];"
    },
    {
        pergunta: "O que o método 'length()' faz em uma String Java?",
        opcoes: ["Retorna o número de caracteres na String", "Retorna a capacidade da String", "Define o tamanho da String", "Remove espaços em branco da String"],
        correta: "Retorna o número de caracteres na String"
    },
    {
        pergunta: "Qual é a saída de 'System.out.println(10 / 3);' em Java?",
        opcoes: ["3", "3.33", "3.0", "1"],
        correta: "3"
    },
    {
        pergunta: "Como se chama o processo de converter um tipo de dado para outro em Java?",
        opcoes: ["Casting", "Parsing", "Boxing", "Formatting"],
        correta: "Casting"
    },
    {
        pergunta: "Qual é a palavra-chave usada para sair de um loop prematuramente?",
        opcoes: ["break", "continue", "return", "exit"],
        correta: "break"
    },
    {
        pergunta: "O que o operador '%' faz em Java?",
        opcoes: ["Retorna o resto de uma divisão", "Calcula a porcentagem", "Define um comentário", "Compara dois valores"],
        correta: "Retorna o resto de uma divisão"
    },
    {
        pergunta: "Qual é o valor padrão de uma variável booleana não inicializada em Java?",
        opcoes: ["false", "true", "0", "null"],
        correta: "false"
    },
    {
        pergunta: "Como se compara se duas Strings são iguais em valor em Java?",
        opcoes: ["usando o método .equals()", "usando o operador ==", "usando o método .compare()", "usando o operador ==="],
        correta: "usando o método .equals()"
    }
];

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

export default function Main() {
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

    // Sistema de som personalizado
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

            // Tocar som de resposta correta
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
            // Tocar som de resposta errada
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
            return "Excelente! Você é um mestre em Java!";
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
        marginBottom: vh(1.5),
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
        paddingHorizontal: vw(7.5),
        marginBottom: vh(2),
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
        textAlign: 'center',
    },
    backHomeButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: normalize(20),
        paddingVertical: vh(1.5),
        paddingHorizontal: vw(6),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    backHomeButtonText: {
        color: '#ffffff',
        fontSize: normalize(16),
        fontWeight: '600',
        textAlign: 'center',
    },
});