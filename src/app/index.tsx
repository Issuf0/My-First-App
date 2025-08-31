import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { router } from "expo-router";
import { Button } from "@/componentes/button";
import { useBackgroundSound } from "@/hooks/useBackground";
import { useCallback, useEffect, useRef, useState } from 'react';
import { normalize, vh, vw } from "../utils/responsive";

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
                        Quiz Code! ☕
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
        fontSize: normalize(12),
        fontWeight: '600',
    },
    code1: { top: vh(10), left: vw(5), fontSize: normalize(14) },
    code2: { top: vh(25), right: vw(8), fontSize: normalize(11) },
    code3: { top: vh(40), left: vw(10), fontSize: normalize(13) },
    code4: { top: vh(60), right: vw(15), fontSize: normalize(12) },
    code5: { top: vh(75), left: vw(3), fontSize: normalize(10) },
    code6: { top: vh(15), right: vw(30), fontSize: normalize(11) },
    code7: { top: vh(85), right: vw(5), fontSize: normalize(12) },
    code8: { top: vh(5), left: vw(30), fontSize: normalize(13) },
    
    // Símbolos Java
    javaSymbol: {
        position: 'absolute',
        color: 'rgba(255, 193, 7, 0.2)',
        fontFamily: 'monospace',
        fontSize: normalize(24),
        fontWeight: 'bold',
    },
    symbol1: { top: vh(20), left: vw(70), fontSize: normalize(28) },
    symbol2: { top: vh(35), left: vw(20), fontSize: normalize(20) },
    symbol3: { top: vh(50), right: vw(25), fontSize: normalize(22) },
    symbol4: { top: vh(65), left: vw(60), fontSize: normalize(18) },
    symbol5: { top: vh(80), right: vw(40), fontSize: normalize(26) },
    symbol6: { top: vh(30), left: vw(85), fontSize: normalize(24) },
    
    // Ícones de café
    coffeeIcon: {
        position: 'absolute',
        fontSize: normalize(20),
        color: 'rgba(139, 69, 19, 0.3)',
    },
    coffee1: { top: vh(12), right: vw(10), fontSize: normalize(18) },
    coffee2: { top: vh(45), left: vw(75), fontSize: normalize(22) },
    coffee3: { top: vh(70), right: vw(70), fontSize: normalize(16) },
    
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
        width: vw(32),
        height: vw(32),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: vh(3),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: vw(16),
        borderWidth: 2,
        borderColor: 'rgba(255, 193, 7, 0.3)',
    },
    logo: {
        width: vw(21),
        height: vw(21),
    },
    brandName: {
        fontSize: normalize(32),
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
        padding: vw(5),
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
        width: vw(53),
        height: vw(53),
        borderRadius: vw(26.5),
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        top: vh(-10),
        right: vw(-10),
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.1)',
    },
    circle2: {
        position: 'absolute',
        width: vw(40),
        height: vw(40),
        borderRadius: vw(20),
        backgroundColor: 'rgba(255, 193, 7, 0.05)',
        bottom: vh(15),
        left: vw(-8),
        borderWidth: 1,
        borderColor: 'rgba(255, 193, 7, 0.1)',
    },
    circle3: {
        position: 'absolute',
        width: vw(26.5),
        height: vw(26.5),
        borderRadius: vw(13.25),
        backgroundColor: 'rgba(139, 69, 19, 0.08)',
        top: vh(30),
        left: vw(80),
        borderWidth: 1,
        borderColor: 'rgba(139, 69, 19, 0.1)',
    },
    title: {
        fontSize: normalize(32),
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        marginBottom: vh(1.5),
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: normalize(36),
        fontWeight: '900',
        color: '#FFC107', // Cor dourada como o logo Java
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
        marginBottom: vh(4),
        letterSpacing: 1.5,
    },
    description: {
        fontSize: normalize(18),
        color: '#B8D4FF', // Azul claro para contraste com o fundo escuro
        textAlign: 'center',
        marginBottom: vh(7),
        paddingHorizontal: vw(5),
        lineHeight: normalize(26),
        fontWeight: '400',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: vw(10),
        marginTop: vh(3),
    },
});