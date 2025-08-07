import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { router } from "expo-router";
import { Button } from "@/componentes/button";
import { useBackgroundSound } from "@/hooks/useBackground";
import { useCallback, useEffect, useRef, useState } from 'react';

const backgroundMusic = require('../assets/audio/background.mp3');
const logoImage = require('../assets/images/marca.jpg');

export default function Index() {
    useBackgroundSound(backgroundMusic);
    
    const [showSplash, setShowSplash] = useState(true);
    const [showContent, setShowContent] = useState(false);
    
    // Animações para o splash screen
    const logoScale = useRef(new Animated.Value(0)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const splashOpacity = useRef(new Animated.Value(1)).current;
    
    // Animações para o conteúdo principal
    const contentOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslateY = useRef(new Animated.Value(50)).current;
    const subtitleTranslateY = useRef(new Animated.Value(50)).current;
    const descriptionTranslateY = useRef(new Animated.Value(50)).current;
    const buttonTranslateY = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        // Sequência de animações do splash screen
        const splashSequence = Animated.sequence([
            // Logo aparece com escala
            Animated.parallel([
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.spring(logoScale, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
            ]),
            // Texto da empresa aparece
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            // Aguarda um pouco
            Animated.delay(1200),
            // Fade out do splash
            Animated.timing(splashOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]);

        splashSequence.start(() => {
            setShowSplash(false);
            setShowContent(true);
            
            // Inicia animações do conteúdo principal
            const contentSequence = Animated.sequence([
                Animated.timing(contentOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.stagger(150, [
                    Animated.parallel([
                        Animated.timing(titleTranslateY, {
                            toValue: 0,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.parallel([
                        Animated.timing(subtitleTranslateY, {
                            toValue: 0,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.parallel([
                        Animated.timing(descriptionTranslateY, {
                            toValue: 0,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.parallel([
                        Animated.timing(buttonTranslateY, {
                            toValue: 0,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                    ]),
                ]),
            ]);

            contentSequence.start();
        });
    }, []);

    const handleNext = useCallback(() => {
        router.navigate("/home");
    }, []);

    return (
        <View style={styles.container}>
            {/* Fundo com elementos Java */}
            <View style={styles.javaBackground}>
                {/* Elementos flutuantes Java */}
                <Text style={[styles.floatingCode, styles.code1]}>public class</Text>
                <Text style={[styles.floatingCode, styles.code2]}>System.out.println();</Text>
                <Text style={[styles.floatingCode, styles.code3]}>int x = 10;</Text>
                <Text style={[styles.floatingCode, styles.code4]}>if (condition)</Text>
                <Text style={[styles.floatingCode, styles.code5]}>for (int i = 0;</Text>
                <Text style={[styles.floatingCode, styles.code6]}>String name;</Text>
                <Text style={[styles.floatingCode, styles.code7]}>void method()</Text>
                <Text style={[styles.floatingCode, styles.code8]}>import java.util.*;</Text>
                
                {/* Símbolos Java */}
                <Text style={[styles.javaSymbol, styles.symbol1]}>{}</Text>
                <Text style={[styles.javaSymbol, styles.symbol2]}>;</Text>
                <Text style={[styles.javaSymbol, styles.symbol3]}>()</Text>
                <Text style={[styles.javaSymbol, styles.symbol4]}>[]</Text>
            
                
                {/* Logo Java (café) */}
                <Text style={[styles.coffeeIcon, styles.coffee1]}>☕</Text>
                <Text style={[styles.coffeeIcon, styles.coffee2]}>☕</Text>
                <Text style={[styles.coffeeIcon, styles.coffee3]}>☕</Text>
            </View>

            {/* Splash Screen */}
            {showSplash && (
                <Animated.View 
                    style={[
                        styles.splashContainer, 
                        { opacity: splashOpacity }
                    ]}
                >
                    <Animated.View
                        style={[
                            styles.logoContainer,
                            {
                                opacity: logoOpacity,
                                transform: [{ scale: logoScale }]
                            }
                        ]}
                    >
                        <Image 
                            source={logoImage} 
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </Animated.View>
                    
                    <Animated.Text 
                        style={[
                            styles.brandName, 
                            { opacity: textOpacity }
                        ]}
                    >
                        Learn Code
                    </Animated.Text>
                </Animated.View>
            )}

            {/* Conteúdo Principal */}
            {showContent && (
                <Animated.View 
                    style={[
                        styles.content, 
                        { opacity: contentOpacity }
                    ]}
                >
                    <View style={styles.decorativeElements}>
                        <View style={styles.circle1} />
                        <View style={styles.circle2} />
                        <View style={styles.circle3} />
                    </View>
                    
                    <Animated.Text 
                        style={[
                            styles.title,
                            {
                                transform: [{ translateY: titleTranslateY }]
                            }
                        ]}
                    >
                        Bem-vindo ao jogo
                    </Animated.Text>
                    
                    <Animated.Text 
                        style={[
                            styles.subtitle,
                            {
                                transform: [{ translateY: subtitleTranslateY }]
                            }
                        ]}
                    >
                        Learn Java! ☕
                    </Animated.Text>
                    
                    <Animated.Text 
                        style={[
                            styles.description,
                            {
                                transform: [{ translateY: descriptionTranslateY }]
                            }
                        ]}
                    >
                        Aprenda Java de forma divertida e interativa através de desafios e jogos educativos
                    </Animated.Text>
                    
                    <Animated.View 
                        style={[
                            styles.buttonContainer,
                            {
                                transform: [{ translateY: buttonTranslateY }]
                            }
                        ]}
                    >
                        <Button title="🎮 Começar Jornada" onPress={handleNext} />
                    </Animated.View>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1B2A', // Azul escuro profundo
    },
    
    // Fundo com elementos Java
    javaBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#0D1B2A',
    },
    
    // Código flutuante
    floatingCode: {
        position: 'absolute',
        color: 'rgba(100, 200, 255, 0.15)',
        fontFamily: 'monospace',
        fontSize: 12,
        fontWeight: '600',
    },
    code1: { top: '10%', left: '5%', fontSize: 14 },
    code2: { top: '25%', right: '8%', fontSize: 11 },
    code3: { top: '40%', left: '10%', fontSize: 13 },
    code4: { top: '60%', right: '15%', fontSize: 12 },
    code5: { top: '75%', left: '3%', fontSize: 10 },
    code6: { top: '15%', right: '30%', fontSize: 11 },
    code7: { top: '85%', right: '5%', fontSize: 12 },
    code8: { top: '5%', left: '30%', fontSize: 13 },
    
    // Símbolos Java
    javaSymbol: {
        position: 'absolute',
        color: 'rgba(255, 193, 7, 0.2)',
        fontFamily: 'monospace',
        fontSize: 24,
        fontWeight: 'bold',
    },
    symbol1: { top: '20%', left: '70%', fontSize: 28 },
    symbol2: { top: '35%', left: '20%', fontSize: 20 },
    symbol3: { top: '50%', right: '25%', fontSize: 22 },
    symbol4: { top: '65%', left: '60%', fontSize: 18 },
    symbol5: { top: '80%', right: '40%', fontSize: 26 },
    symbol6: { top: '30%', left: '85%', fontSize: 24 },
    
    // Ícones de café
    coffeeIcon: {
        position: 'absolute',
        fontSize: 20,
        color: 'rgba(139, 69, 19, 0.3)',
    },
    coffee1: { top: '12%', right: '10%', fontSize: 18 },
    coffee2: { top: '45%', left: '75%', fontSize: 22 },
    coffee3: { top: '70%', right: '70%', fontSize: 16 },
    
    // Estilos do Splash Screen
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: '#0D1B2A',
    },
    logoContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'rgba(255, 193, 7, 0.3)',
    },
    logo: {
        width: 80,
        height: 80,
    },
    brandName: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFC107',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
        letterSpacing: 2,
    },
    
    // Estilos do Conteúdo Principal
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        position: 'relative',
    },
    decorativeElements: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    circle1: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        top: -50,
        right: -50,
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.1)',
    },
    circle2: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 193, 7, 0.05)',
        bottom: 100,
        left: -30,
        borderWidth: 1,
        borderColor: 'rgba(255, 193, 7, 0.1)',
    },
    circle3: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(139, 69, 19, 0.08)',
        top: '30%',
        left: '80%',
        borderWidth: 1,
        borderColor: 'rgba(139, 69, 19, 0.1)',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 36,
        fontWeight: '900',
        color: '#FFC107', // Cor dourada como o logo Java
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
        marginBottom: 25,
        letterSpacing: 1.5,
    },
    description: {
        fontSize: 18,
        color: '#B8D4FF', // Azul claro para contraste com o fundo escuro
        textAlign: 'center',
        marginBottom: 50,
        paddingHorizontal: 20,
        lineHeight: 26,
        fontWeight: '400',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 40,
        marginTop: 20,
    },
});