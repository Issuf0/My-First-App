import { View, Text, StyleSheet, TouchableOpacity, Animated, StatusBar, Modal, ScrollView } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { Audio, AVPlaybackStatus } from 'expo-av';
import { useBackgroundSound } from "@/hooks/useBackground";
import { normalize, vh, vw, vmin } from "../utils/responsive";
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

import perguntas from "../database/desafioPOOQuiz.json";



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
    const [respostasErradas, setRespostasErradas] = useState(0);
    const [quizCompleto, setQuizCompleto] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [shuffledPerguntas, setShuffledPerguntas] = useState<any[]>([]);
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

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

            // Celebração a cada 5 respostas corretas consecutivas
            if ((respostasCorretas + 1) % 5 === 0) {
                animateCelebration();
                await playSound('celebration');
            }
        } else {
            await playSound('incorrect');
            setRespostasErradas(respostasErradas + 1);
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
        setRespostasErradas(0);
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={isSettingsModalVisible}
                onRequestClose={() => setIsSettingsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Configurações</Text>
                        <TouchableOpacity onPress={() => setIsMuted(!isMuted)} style={styles.modalButton}>
                            <Ionicons name={isMuted ? "volume-mute" : "volume-high"} size={normalize(24)} color="white" />
                            <Text style={styles.modalButtonText}>{isMuted ? 'Ativar Som' : 'Silenciar'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.back()} style={styles.modalButton}>
                            <Ionicons name="arrow-back" size={normalize(24)} color="white" />
                            <Text style={styles.modalButtonText}>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsSettingsModalVisible(false)} style={styles.modalCloseButton}>
                            <Text style={styles.modalCloseButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
                    <View style={{flex: 1}}>
                        <Text style={styles.correctAnswersText}><Ionicons name="checkmark-circle-outline" size={normalize(20)} color="#27ae60" /> {respostasCorretas}</Text>
                        <Text style={styles.scoreText}><Ionicons name="close-circle-outline" size={normalize(20)} color="#e74c3c" /> {respostasErradas}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <View style={styles.headerTitleContainer}>
                            <Text style={styles.headerTitle}>☕ Java POO</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={() => setIsSettingsModalVisible(true)} style={styles.settingsButton}>
                            <Ionicons name="build" size={normalize(24)} color="white" />
                        </TouchableOpacity>
                    </View>
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
                    <ScrollView style={styles.optionsContainer}>
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
                    </ScrollView>
                </>
            )}

            
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
        borderRadius: vmin(4),
        padding: vmin(2.5),
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
    settingsButton: {
        padding: vw(2),
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: vw(4),
        paddingVertical: vh(1.5),
        width: '90%',
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: vmin(5),
        fontWeight: 'bold',
        marginLeft: vw(2),
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
        fontSize: vmin(9),
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
        borderRadius: vmin(4),
        overflow: 'hidden',
        marginBottom: vh(1),
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#ff6b35',
        borderRadius: vmin(4),
    },
    progressText: {
        color: '#e94560',
        fontSize: vmin(4),
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
        fontSize: vmin(5),
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    correctAnswersText: {
        color: '#ff6b35',
        fontSize: vmin(5),
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    questionContainer: {
        backgroundColor: '#16213e',
        borderRadius: vmin(4),
        padding: vmin(6),
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
        fontSize: vmin(4),
        fontWeight: 'bold',
        marginBottom: vh(1.5),
        textAlign: 'center',
    },
    questionText: {
        color: '#ffffff',
        fontSize: vmin(5),
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: vmin(7),
    },
    optionsContainer: {
        flex: 1,
        marginBottom: vh(3),
    },
    optionButton: {
        backgroundColor: '#ff6b35',
        borderRadius: vmin(3),
        padding: vmin(4.5),
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
        fontSize: vmin(4),
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#16213e',
        borderRadius: vmin(4),
        padding: vmin(5),
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0f3460',
    },
    modalTitle: {
        fontSize: vmin(5),
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: vh(3),
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff6b35',
        borderRadius: vmin(3),
        padding: vmin(4),
        marginBottom: vh(2),
        width: '100%',
        justifyContent: 'center',
    },
    modalButtonText: {
        color: '#ffffff',
        fontSize: vmin(4),
        fontWeight: '600',
        marginLeft: vw(2),
    },
    modalCloseButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: vmin(3),
        padding: vmin(4),
        width: '100%',
        alignItems: 'center',
    },
    modalCloseButtonText: {
        color: '#ffffff',
        fontSize: vmin(4),
        fontWeight: '600',
    },
    completionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completionCard: {
        backgroundColor: '#16213e',
        borderRadius: vmin(5),
        padding: vmin(10),
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
        fontSize: vmin(7),
        fontWeight: 'bold',
        marginBottom: vh(3),
        textAlign: 'center',
    },
    completionScore: {
        color: '#ffffff',
        fontSize: vmin(6),
        fontWeight: '600',
        marginBottom: vh(1.5),
        textAlign: 'center',
    },
    completionPercentage: {
        color: '#e94560',
        fontSize: vmin(5),
        fontWeight: '600',
        marginBottom: vh(2),
        textAlign: 'center',
    },
    motivationalMessage: {
        color: '#FFD700',
        fontSize: vmin(4.5),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: vh(4),
    },
    restartButton: {
        backgroundColor: '#ff6b35',
        borderRadius: vmin(6),
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
        fontSize: vmin(4.5),
        fontWeight: 'bold',
    },
    backHomeButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: vmin(5),
        paddingVertical: vh(1.5),
        paddingHorizontal: vw(6),
        marginTop: vh(2),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    backHomeButtonText: {
        color: '#ffffff',
        fontSize: vmin(4),
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
        borderRadius: vmin(5),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    backButtonMainText: {
        color: '#ffffff',
        fontSize: vmin(4),
        fontWeight: '600',
    },
});