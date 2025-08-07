import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, StatusBar } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { router } from "expo-router";
import { Audio } from 'expo-av';
import { useBackgroundSound } from "@/hooks/useBackground";

const { width, height } = Dimensions.get('window');

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
                            top: Math.random() * height,
                            left: Math.random() * width,
                            opacity: 0.1,
                            fontSize: Math.random() * 20 + 12,
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
    useBackgroundSound(backgroundMusic);

    const [index, setIndex] = useState(0);
    const [respostaSelecionada, setRespostaSelecionada] = useState(null);
    const [mostrarResposta, setMostrarResposta] = useState(false);
    const [pontuacao, setPontuacao] = useState(0);
    const [respostasCorretas, setRespostasCorretas] = useState(0);
    const [quizCompleto, setQuizCompleto] = useState(false);

    // Animações
    const slideAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const celebrationAnim = useRef(new Animated.Value(0)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

    // Sistema de som personalizado
    const playSound = async (soundType) => {
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
                sound.setOnPlaybackStatusUpdate((status) => {
                    if (status.didJustFinish) {
                        sound.unloadAsync();
                    }
                });
            }
        } catch (error) {
            console.log('Erro ao tocar som:', error);
        }
    };

    useEffect(() => {
        animateQuestionEntry();
        updateProgress();
    }, [index]);

    const animateQuestionEntry = () => {
        slideAnim.setValue(-width);
        Animated.spring(slideAnim, {
            toValue: 0,
            tension: 50,
            friction: 8,
            useNativeDriver: true
        }).start();
    };

    const updateProgress = () => {
        Animated.timing(progressAnim, {
            toValue: (index + 1) / perguntas.length,
            duration: 300,
            useNativeDriver: false
        }).start();
    };

    const animateCelebration = () => {
        Animated.sequence([
            Animated.timing(celebrationAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(celebrationAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            })
        ]).start();
    };

    const selecionarResposta = async (opcao) => {
        if (mostrarResposta) return;

        setRespostaSelecionada(opcao);
        setMostrarResposta(true);

        const isCorrect = opcao === perguntas[index].correta;

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
        if (index < perguntas.length - 1) {
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
        celebrationAnim.setValue(0);
        progressAnim.setValue(0);
    };

    if (quizCompleto) {
        return (
            <View style={styles.container}>
                <BackgroundSymbols />
                <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
                <View style={styles.completionContainer}>
                    <Animated.View style={[styles.completionCard, { transform: [{ scale: scaleAnim }] }]}>
                        <Text style={styles.completionTitle}>Quiz Completo! 🎉</Text>
                        <Text style={styles.completionScore}>
                            Pontuação Final: {pontuacao}/{perguntas.length * 10}
                        </Text>
                        <Text style={styles.completionPercentage}>
                            {Math.round((pontuacao / (perguntas.length * 10)) * 100)}% de acerto
                        </Text>
                        <TouchableOpacity style={styles.restartButton} onPress={reiniciarQuiz}>
                            <Text style={styles.restartButtonText}>🔄 Reiniciar Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backHomeButton} onPress={() => router.back()}>
                            <Text style={styles.backHomeButtonText}>← Voltar ao Menu</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <BackgroundSymbols />
            <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

            {/* Celebration Effect */}
            <Animated.View
                style={[
                    styles.celebrationOverlay,
                    {
                        opacity: celebrationAnim,
                        transform: [{ scale: celebrationAnim }]
                    }
                ]}
                pointerEvents="none"
            >
                <Text style={styles.celebrationText}>🎉 Excelente! 🎉</Text>
            </Animated.View>

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
                    {index + 1} de {perguntas.length}
                </Text>
            </View>

            {/* Score */}
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>Pontuação: {pontuacao}</Text>
                <Text style={styles.correctAnswersText}>Corretas: {respostasCorretas}</Text>
            </View>

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
                <Text style={styles.questionText}>{perguntas[index].pergunta}</Text>
            </Animated.View>

            {/* Options */}
            <View style={styles.optionsContainer}>
                {perguntas[index].opcoes.map((opcao, i) => {
                    let buttonStyle = [styles.optionButton];
                    let textStyle = [styles.optionText];

                    if (mostrarResposta) {
                        if (opcao === perguntas[index].correta) {
                            buttonStyle.push(styles.correctOption);
                            textStyle.push(styles.correctOptionText);
                        } else if (opcao === respostaSelecionada && opcao !== perguntas[index].correta) {
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
        paddingHorizontal: 20,
        paddingTop: 50,
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
    celebrationOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
        zIndex: 1000,
    },
    celebrationText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#ff6b35',
        textAlign: 'center',
    },
    progressContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    progressBar: {
        width: '100%',
        height: 8,
        backgroundColor: '#16213e',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 10,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#ff6b35',
        borderRadius: 4,
    },
    progressText: {
        color: '#e94560',
        fontSize: 16,
        fontWeight: '600',
    },
    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    scoreText: {
        color: '#0f3460',
        fontSize: 18,
        fontWeight: 'bold',
    },
    correctAnswersText: {
        color: '#ff6b35',
        fontSize: 18,
        fontWeight: 'bold',
    },
    questionContainer: {
        backgroundColor: '#16213e',
        borderRadius: 15,
        padding: 25,
        marginBottom: 30,
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
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    questionText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 28,
    },
    optionsContainer: {
        flex: 1,
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#ff6b35',
        borderRadius: 12,
        padding: 18,
        marginVertical: 8,
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
        fontSize: 16,
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
        paddingBottom: 20,
    },
    backButtonMain: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    backButtonMainText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    completionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completionCard: {
        backgroundColor: '#16213e',
        borderRadius: 20,
        padding: 40,
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
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    completionScore: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    completionPercentage: {
        color: '#e94560',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 30,
        textAlign: 'center',
    },
    restartButton: {
        backgroundColor: '#ff6b35',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    restartButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backHomeButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    backHomeButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});