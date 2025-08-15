import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Button } from "../componentes/button";
import { useBackgroundSound } from "@/hooks/useBackground";
import { normalize, vh, vw } from "../utils/responsive";

const backgroundMusic = require('../assets/audio/background.mp3');

export default function Home() {
    useBackgroundSound(backgroundMusic);
    
    function handleNext() {
        router.navigate("/dashboard");
    }

    function nextPage() {
        router.navigate("/main");
    }

    function desafioJava() {
        router.navigate("/desafioJava");
    }

    function desafioPOO() {
        router.navigate("/desafioPOO");
    }

    return (
        <View style={styles.container}>
            {/* Fundo com elementos Java */}
            <View style={styles.javaBackground}>
                {/* Elementos flutuantes Java */}
                <Text style={[styles.floatingCode, styles.code1]}>public static void</Text>
                <Text style={[styles.floatingCode, styles.code2]}>main(String[] args)</Text>
                <Text style={[styles.floatingCode, styles.code3]}>class MyClass</Text>
                <Text style={[styles.floatingCode, styles.code4]}>extends Object</Text>
                <Text style={[styles.floatingCode, styles.code5]}>implements Interface</Text>
                <Text style={[styles.floatingCode, styles.code6]}>private int value;</Text>
                <Text style={[styles.floatingCode, styles.code7]}>public void method()</Text>
                <Text style={[styles.floatingCode, styles.code8]}>try {} catch</Text>
                <Text style={[styles.floatingCode, styles.code10]}>@Override</Text>
                
                {/* Símbolos Java */}
                <Text style={[styles.javaSymbol, styles.symbol1]}>{}</Text>
                <Text style={[styles.javaSymbol, styles.symbol2]}>;</Text>
                <Text style={[styles.javaSymbol, styles.symbol3]}>()</Text>
                <Text style={[styles.javaSymbol, styles.symbol4]}>[]</Text>
                <Text style={[styles.javaSymbol, styles.symbol7]}>=</Text>
                <Text style={[styles.javaSymbol, styles.symbol8]}>!=</Text>
                
                {/* Logo Java (café) */}
                <Text style={[styles.coffeeIcon, styles.coffee1]}>☕</Text>
                <Text style={[styles.coffeeIcon, styles.coffee2]}>☕</Text>
                <Text style={[styles.coffeeIcon, styles.coffee3]}>☕</Text>
                <Text style={[styles.coffeeIcon, styles.coffee4]}>☕</Text>
            </View>

            <View style={styles.content}>
                {/* Elementos decorativos */}
                <View style={styles.decorativeElements}>
                    <View style={styles.circle1} />
                    <View style={styles.circle2} />
                    <View style={styles.circle3} />
                </View>

                <Text style={styles.mainTitle}>Learn Java</Text>
                <Text style={styles.subtitle}>Escolha seu desafio</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🧩 Parte do Quiz</Text>
                    <View style={styles.buttonGroup}>
                        <Button title="📚 Java Básico" onPress={nextPage} />
                        <Button title="🎯 Java POO" onPress={handleNext} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>💻 Parte do Código</Text>
                    <View style={styles.buttonGroup}>
                        <Button title="⚡ Desafio Java" onPress={desafioJava} />
                        <Button title="🚀 Desafio POO" onPress={desafioPOO} />
                    </View>
                </View>
            </View>
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
        color: 'rgba(100, 200, 255, 0.12)',
        fontFamily: 'monospace',
        fontSize: normalize(11),
        fontWeight: '600',
    },
    code1: { top: vh(8), left: vw(3), fontSize: normalize(12) },
    code2: { top: vh(15), right: vw(5), fontSize: normalize(10) },
    code3: { top: vh(25), left: vw(8), fontSize: normalize(13) },
    code4: { top: vh(35), right: vw(10), fontSize: normalize(11) },
    code5: { top: vh(45), left: vw(2), fontSize: normalize(10) },
    code6: { top: vh(55), right: vw(8), fontSize: normalize(12) },
    code7: { top: vh(65), left: vw(5), fontSize: normalize(11) },
    code8: { top: vh(75), right: vw(3), fontSize: normalize(10) },
    code9: { top: vh(85), left: vw(10), fontSize: normalize(12) },
    code10: { top: vh(5), right: vw(25), fontSize: normalize(13) },
    
    // Símbolos Java
    javaSymbol: {
        position: 'absolute',
        color: 'rgba(255, 193, 7, 0.15)',
        fontFamily: 'monospace',
        fontSize: normalize(20),
        fontWeight: 'bold',
    },
    symbol1: { top: vh(12), left: vw(75), fontSize: normalize(24) },
    symbol2: { top: vh(28), left: vw(80), fontSize: normalize(18) },
    symbol3: { top: vh(42), right: vw(30), fontSize: normalize(20) },
    symbol4: { top: vh(58), left: vw(85), fontSize: normalize(16) },
    symbol5: { top: vh(72), right: vw(25), fontSize: normalize(22) },
    symbol6: { top: vh(18), left: vw(90), fontSize: normalize(20) },
    symbol7: { top: vh(88), right: vw(20), fontSize: normalize(18) },
    symbol8: { top: vh(32), left: vw(2), fontSize: normalize(16) },
    
    // Ícones de café
    coffeeIcon: {
        position: 'absolute',
        fontSize: normalize(18),
        color: 'rgba(139, 69, 19, 0.25)',
    },
    coffee1: { top: vh(10), right: vw(15), fontSize: normalize(16) },
    coffee2: { top: vh(40), left: vw(85), fontSize: normalize(20) },
    coffee3: { top: vh(70), right: vw(75), fontSize: normalize(14) },
    coffee4: { top: vh(90), left: vw(80), fontSize: normalize(18) },
    
    // Elementos decorativos
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
        width: vw(40),
        height: vw(40),
        borderRadius: vw(20),
        backgroundColor: 'rgba(59, 130, 246, 0.06)',
        top: vh(-5),
        right: vw(-10),
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.08)',
    },
    circle2: {
        position: 'absolute',
        width: vw(32),
        height: vw(32),
        borderRadius: vw(16),
        backgroundColor: 'rgba(255, 193, 7, 0.04)',
        bottom: vh(10),
        left: vw(-5),
        borderWidth: 1,
        borderColor: 'rgba(255, 193, 7, 0.08)',
    },
    circle3: {
        position: 'absolute',
        width: vw(21),
        height: vw(21),
        borderRadius: vw(10.5),
        backgroundColor: 'rgba(139, 69, 19, 0.06)',
        top: vh(45),
        right: vw(5),
        borderWidth: 1,
        borderColor: 'rgba(139, 69, 19, 0.08)',
    },
    
    content: {
        flex: 1,
        padding: normalize(32),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    mainTitle: {
        fontSize: normalize(36),
        fontWeight: '900',
        color: '#FFC107', // Cor dourada Java
        textAlign: 'center',
        marginBottom: vh(1),
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
        letterSpacing: 1.5,
    },
    subtitle: {
        fontSize: normalize(18),
        color: '#B8D4FF', // Azul claro
        textAlign: 'center',
        marginBottom: vh(5),
        fontWeight: '400',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    section: {
        width: '100%',
        marginBottom: vh(4),
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: normalize(16),
        padding: normalize(20),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    sectionTitle: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: vh(2),
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    buttonGroup: {
        gap: vh(1.5),
    },
});