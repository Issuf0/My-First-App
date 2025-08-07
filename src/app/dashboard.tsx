import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, StatusBar } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { router } from "expo-router";
import { Audio } from 'expo-av';
import { useBackgroundSound } from "@/hooks/useBackground";

const { width, height } = Dimensions.get('window');

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

export default function Dashboard() {
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
    },
    backHomeButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 25,
        marginTop: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    backHomeButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
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
});