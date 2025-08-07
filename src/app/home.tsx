import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Button } from "../componentes/button";
import { useBackgroundSound } from "@/hooks/useBackground";

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
        fontSize: 11,
        fontWeight: '600',
    },
    code1: { top: '8%', left: '3%', fontSize: 12 },
    code2: { top: '15%', right: '5%', fontSize: 10 },
    code3: { top: '25%', left: '8%', fontSize: 13 },
    code4: { top: '35%', right: '10%', fontSize: 11 },
    code5: { top: '45%', left: '2%', fontSize: 10 },
    code6: { top: '55%', right: '8%', fontSize: 12 },
    code7: { top: '65%', left: '5%', fontSize: 11 },
    code8: { top: '75%', right: '3%', fontSize: 10 },
    code9: { top: '85%', left: '10%', fontSize: 12 },
    code10: { top: '5%', right: '25%', fontSize: 13 },
    
    // Símbolos Java
    javaSymbol: {
        position: 'absolute',
        color: 'rgba(255, 193, 7, 0.15)',
        fontFamily: 'monospace',
        fontSize: 20,
        fontWeight: 'bold',
    },
    symbol1: { top: '12%', left: '75%', fontSize: 24 },
    symbol2: { top: '28%', left: '80%', fontSize: 18 },
    symbol3: { top: '42%', right: '30%', fontSize: 20 },
    symbol4: { top: '58%', left: '85%', fontSize: 16 },
    symbol5: { top: '72%', right: '25%', fontSize: 22 },
    symbol6: { top: '18%', left: '90%', fontSize: 20 },
    symbol7: { top: '88%', right: '20%', fontSize: 18 },
    symbol8: { top: '32%', left: '2%', fontSize: 16 },
    
    // Ícones de café
    coffeeIcon: {
        position: 'absolute',
        fontSize: 18,
        color: 'rgba(139, 69, 19, 0.25)',
    },
    coffee1: { top: '10%', right: '15%', fontSize: 16 },
    coffee2: { top: '40%', left: '85%', fontSize: 20 },
    coffee3: { top: '70%', right: '75%', fontSize: 14 },
    coffee4: { top: '90%', left: '80%', fontSize: 18 },
    
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
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(59, 130, 246, 0.06)',
        top: -20,
        right: -30,
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.08)',
    },
    circle2: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 193, 7, 0.04)',
        bottom: 80,
        left: -20,
        borderWidth: 1,
        borderColor: 'rgba(255, 193, 7, 0.08)',
    },
    circle3: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(139, 69, 19, 0.06)',
        top: '45%',
        right: '5%',
        borderWidth: 1,
        borderColor: 'rgba(139, 69, 19, 0.08)',
    },
    
    content: {
        flex: 1,
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    mainTitle: {
        fontSize: 36,
        fontWeight: '900',
        color: '#FFC107', // Cor dourada Java
        textAlign: 'center',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
        letterSpacing: 1.5,
    },
    subtitle: {
        fontSize: 18,
        color: '#B8D4FF', // Azul claro
        textAlign: 'center',
        marginBottom: 40,
        fontWeight: '400',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    section: {
        width: '100%',
        marginBottom: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 16,
        padding: 20,
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    buttonGroup: {
        gap: 12,
    },
});