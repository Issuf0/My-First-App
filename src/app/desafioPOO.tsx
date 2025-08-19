import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    StatusBar,
    Animated,
    Easing,
    Modal
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { router } from "expo-router";
import exerciciosPOO from "../database/desafioPOO.json";
import { Exercicio } from "../types";
import { normalize, vh, vw } from "../utils/responsive";

// Componente de fundo com ícones POO
const POOBackground = () => {
    const pooElements = [
        // Conceitos POO
        'class', 'object', 'extends', 'implements', 'super', 'this', '@Override',
        'private', 'protected', 'public', 'static', 'final', 'abstract',
        'interface', 'inheritance', 'polimorphism', 'encapsulation',

        // Estruturas de classe
        'constructor', 'method', 'attribute', 'getter', 'setter',
        'new ClassName()', 'instanceof', 'super()', 'this.field',

        // Ícones POO
        '☕', '🏗', '🔒', '🔓', '⚙', '🧩', '📦', '🔗', '🎭', '🏭', '🛠',
        '👥', '📚', '💼', '🎯', '🔄', '⭐', '🎨', '🔧', '💡', '🚀', '☕',

        // Símbolos
        '{', '}', '(', ')', '[', ']', '< ', '>', '.', ';', ':', '=',

        // Palavras-chave específicas POO
        'class Person', 'extends Object', 'implements Interface',
        'private String name', 'public void method()', 'new Object()',
        'super.method()', 'this.attribute', '@Override toString()'
    ];

    return (
        <View style={styles.backgroundContainer}>
            {Array.from({ length: 45 }, (_, index) => {
                const element = pooElements[Math.floor(Math.random() * pooElements.length)];
                const isSymbol = ['{', '}', '(', ')', '[', ']', '< ', '>', '.', ';', ':', '='].includes(element);
                const isIcon = ['☕', '🏗', '🔒', '🔓', '⚙', '🧩', '📦', '🔗', '🎭', '🏭', '🛠', '👥', '📚', '💼', '🎯', '🔄', '⭐', '🎨', '🔧', '💡', '🚀'].includes(element);
                const isPOOConcept = ['class', 'object', 'extends', 'implements', 'inheritance', 'polymorphism', 'encapsulation'].includes(element);
                const isMethodStructure = element.includes('()') || element.includes('new ') || element.includes('@Override');

                return (
                    <Text
                        key={index}
                        style={[
                            styles.backgroundElement,
                            {
                                top: Math.random() * vh(100),
                                left: Math.random() * vw(100),
                                opacity: isIcon ? 0.25 :
                                    isPOOConcept ? 0.18 :
                                        isMethodStructure ? 0.15 :
                                            isSymbol ? 0.12 : 0.08,
                                fontSize: normalize(isIcon ? (Math.random() * 15 + 20) :
                                    isSymbol ? (Math.random() * 8 + 16) :
                                        (Math.random() * 6 + 10)),
                                transform: [{ rotate: `${ Math.random() * 360 }deg` }],
                            color: isIcon 
                                    ? '#FF8C42' 
                                    : isPOOConcept 
                                    ? '#6C63FF' 
                                    : isMethodStructure 
                                    ? '#4ECDC4' 
                                    : isSymbol 
                                    ? '#45B7D1' 
                                    : '#2C3E50',
                            }
                        ]}
                    >
            {element}
        </Text>
    );
})}
        </View >
    );
};


export default function JavaPOOEditor() {
    const [exerciciosEmbaralhados, setExerciciosEmbaralhados] = useState<Exercicio[]>([]);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [exercicioAtual, setExercicioAtual] = useState<Exercicio | null>(null);
    const [userCode, setUserCode] = useState('');
    const [resultado, setResultado] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [showDicas, setShowDicas] = useState(false);
    const [showVariaveis, setShowVariaveis] = useState(false);
    const [pontuacao, setPontuacao] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });

    useEffect(() => {
        const exerciciosEmbaralhados = [...exerciciosPOO].sort(() => Math.random() - 0.5);
        setExerciciosEmbaralhados(exerciciosEmbaralhados);
        setExercicioAtual(exerciciosEmbaralhados[0]);
        setUserCode(exerciciosEmbaralhados[0].templateCodigo);
    }, []);

    const codeInputRef = useRef(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const spinAnim = useRef(new Animated.Value(0)).current;

    const startValidationAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.05, duration: 500, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
            ])
        ).start();

        Animated.loop(
            Animated.timing(spinAnim, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    const stopValidationAnimation = () => {
        pulseAnim.stopAnimation();
        pulseAnim.setValue(1);
        spinAnim.stopAnimation();
        spinAnim.setValue(0);
    };

    const validarCodigo = async () => {
        if (!userCode.trim()) {
            Alert.alert("❌ Erro", "Por favor, escreva algum código!");
            return;
        }

        if (!exercicioAtual) {
            return;
        }

        setIsValidating(true);
        setResultado('');
        startValidationAnimation();

        setTimeout(() => {
            const codigoLimpo = userCode.replace(/\s/g, '').toLowerCase();
            let sucesso = false;
            let mensagem = '';

            switch (exercicioAtual.id) {
                case 1: // Classe e Objeto
                    if (codigoLimpo.includes('classcarro') && codigoLimpo.includes('newcarro(')) {
                        sucesso = true;
                        mensagem = '🎉 Classe e objeto criados corretamente!\n+50 pontos';
                        setPontuacao(pontuacao + 50);
                    } else {
                        mensagem = '❌ Verifique a criação da classe Carro e a instanciação do objeto.';
                    }
                    break;
                case 2: // Herança
                     if (codigoLimpo.includes('classcachorroextendscanimal') && codigoLimpo.includes('@override') && codigoLimpo.includes('super(')) {
                        sucesso = true;
                        mensagem = '🎉 Herança implementada com sucesso!\n+65 pontos';
                        setPontuacao(pontuacao + 65);
                    } else {
                        mensagem = '❌ Confira a sintaxe de herança, o uso de @Override e a chamada super().';
                    }
                    break;
                case 3: // Encapsulamento
                    if (codigoLimpo.includes('private') && codigoLimpo.includes('getsaldo()') && codigoLimpo.includes('depositar(')) {
                        sucesso = true;
                        mensagem = '🎉 Encapsulamento aplicado corretamente!\n+75 pontos';
                        setPontuacao(pontuacao + 75);
                    } else {
                        mensagem = '❌ Verifique o uso de private e dos métodos get/set.';
                    }
                    break;
                case 4: // Polimorfismo
                    if (codigoLimpo.includes('interfaceforma') && codigoLimpo.includes('implementsforma') && codigoLimpo.includes('calculararea()')) {
                        sucesso = true;
                        mensagem = '🎉 Polimorfismo demonstrado com sucesso!\n+85 pontos';
                        setPontuacao(pontuacao + 85);
                    } else {
                        mensagem = '❌ Verifique a implementação da interface e a sobrescrita dos métodos.';
                    }
                    break;
                default:
                    mensagem = '❌ Exercício não implementado ainda.';
            }

            setResultado(mensagem);
            setIsValidating(false);
            stopValidationAnimation();
            setIsModalVisible(true);

            if (sucesso) {
                setTimeout(() => {
                    setIsModalVisible(false);
                    proximoExercicio();
                }, 2500);
            }
        }, 2000);
    };

    const proximoExercicio = () => {
        if (!exercicioAtual) {
            return;
        }
        const proximoIndex = exerciciosPOO.findIndex(ex => ex.id === exercicioAtual.id) + 1;
        if (proximoIndex < exerciciosPOO.length) {
            const proximoEx = exerciciosPOO[proximoIndex];
            setExercicioAtual(proximoEx);
            setUserCode(proximoEx.templateCodigo);
            setResultado('');
            setShowDicas(false);
            setShowVariaveis(false);
        } else {
            Alert.alert(
                "🏆 Mestre em POO!",
                `Parabéns! Você dominou a Programação Orientada a Objetos!\nPontuação final: ${ pontuacao } pontos\n\nVocê agora entende: Classes, Objetos, Herança, Polimorfismo e Encapsulamento!`,
                [
                    { text: "Voltar ao Menu", onPress: () => router.back() }
                ]
            );
        }
    };

    const resetarCodigo = () => {
        if (!exercicioAtual) {
            return;
        }
        Alert.alert(
            "🔄 Resetar Código",
            "Tem certeza que deseja voltar ao template inicial?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sim", onPress: () => {
                        setUserCode(exercicioAtual.templateCodigo);
                        setResultado('');
                    }
                }
            ]
        );
    };

    const inserirTexto = (texto: string) => {
        const newCode = userCode.slice(0, cursorPosition.start) + texto + userCode.slice(cursorPosition.end);
        setUserCode(newCode);
    };

    return (
        <View style={styles.container}>
            <POOBackground />
            <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {exercicioAtual && (
                    <>
                        {/* Header */}
                <View style={styles.headerContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>☕ Java POO Master</Text>
                        <Text style={styles.pontuacaoText}>🏆 {pontuacao} pts</Text>
                    </View>
                    <Text style={styles.exercicioNumero}>
                        {exercicioAtual.titulo} ({exercicioAtual.nivel}) - {exercicioAtual.id}/{exerciciosPOO.length}
                    </Text>
                </View>

                {/* Card do Exercício Completo */}
                <View style={styles.exercicioCard}>
                    <View style={styles.exercicioHeader}>
                        <Text style={styles.exercicioTitulo}>{exercicioAtual.titulo}</Text>
                        <View style={styles.categoriaTag}>
                            <Text style={styles.categoriaText}>{exercicioAtual.categoria}</Text>
                        </View>
                    </View>

                    <Text style={styles.exercicioDescricao}>{exercicioAtual.descricao}</Text>

                    <View style={styles.pontosContainer}>
                        <Text style={styles.pontosText}>💎 Pontos: {exercicioAtual.pontos}</Text>
                    </View>

                    {/* Botões de Informação */}
                    <View style={styles.infoButtonsContainer}>
                        <TouchableOpacity
                            style={[styles.infoButton, showDicas && styles.infoButtonActive]}
                            onPress={() => setShowDicas(!showDicas)}
                        >
                            <Text style={styles.infoButtonText}>
                                💡 {showDicas ? 'Ocultar' : 'Ver'} Dicas
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.infoButton, showVariaveis && styles.infoButtonActive]}
                            onPress={() => setShowVariaveis(!showVariaveis)}
                        >
                            <Text style={styles.infoButtonText}>
                                📋 {showVariaveis ? 'Ocultar' : 'Ver'} Requisitos
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Dicas */}
                    {showDicas && (
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>💡 Dicas POO:</Text>
                            {exercicioAtual.dicas.map((dica: string, index: number) => (
                                <Text key={index} style={styles.infoText}>
                                    • {dica}
                                </Text>
                            ))}
                        </View>
                    )}

                    {/* Variáveis Obrigatórias */}
                    {showVariaveis && (
                        <View style={styles.variaveisContainer}>
                            <Text style={styles.infoTitle}>📋 Elementos Obrigatórios:</Text>
                            <Text style={styles.variaveisSubtitle}>
                                ⚠ Inclua exatamente estes elementos para validação:
                            </Text>
                            {exercicioAtual.variaveisObrigatorias.map((variavel: string, index: number) => (
                                <View key={index} style={styles.variavelItem}>
                                    <Text style={styles.variavelText}>{variavel}</Text>
                                </View>
                            ))}
                            <Text style={styles.palavrasChaveTitle}>🔑 Conceitos POO esperados:</Text>
                            <View style={styles.palavrasChaveContainer}>
                                {exercicioAtual.palavrasChave.map((palavra: string, index: number) => (
                                    <View key={index} style={styles.palavraChaveTag}>
                                        <Text style={styles.palavraChaveText}>{palavra}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                {/* Barra de Ferramentas POO */}
                <View style={styles.toolbarContainer}>
                    <Text style={styles.toolbarTitle}>⚡ Atalhos POO:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.toolbarButtons}>
                            <TouchableOpacity
                                style={styles.toolButton}
                                onPress={() => inserirTexto('public class ClassName {\n    \n}')}
                            >
                                <Text style={styles.toolButtonText}>class</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.toolButton}
                                onPress={() => inserirTexto('private String attribute;')}
                            >
                                <Text style={styles.toolButtonText}>private</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.toolButton}
                                onPress={() => inserirTexto('public ClassName() {\n    \n}')}
                            >
                                <Text style={styles.toolButtonText}>constructor</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.toolButton}
                                onPress={() => inserirTexto('public void method() {\n    \n}')}
                            >
                                <Text style={styles.toolButtonText}>method</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.toolButton}
                                onPress={() => inserirTexto('extends SuperClass')}
                            >
                                <Text style={styles.toolButtonText}>extends</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.toolButton}
                                onPress={() => inserirTexto('@Override\npublic void method() {\n    \n}')}
                            >
                                <Text style={styles.toolButtonText}>@Override</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

                {/* Editor de Código */}
                <View style={styles.editorContainer}>
                    <View style={styles.editorHeader}>
                        <Text style={styles.editorTitle}>📝 Seu Código Java POO:</Text>
                        <TouchableOpacity style={styles.resetButton} onPress={resetarCodigo}>
                            <Text style={styles.resetButtonText}>🔄 Reset</Text>
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        ref={codeInputRef}
                        multiline
                        style={styles.codeInput}
                        value={userCode}
                        onChangeText={setUserCode}
                        placeholder="Digite seu código Java POO aqui..."
                        placeholderTextColor="#666"
                        textAlignVertical="top"
                        autoCapitalize="none"
                        autoCorrect={false}
                        spellCheck={false}
                        onSelectionChange={(e) => setCursorPosition(e.nativeEvent.selection)}
                            />
                </View>

                {/* Botão Validar */}
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <TouchableOpacity
                        style={[styles.validateButton, isValidating && styles.validateButtonDisabled]}
                        onPress={validarCodigo}
                        disabled={isValidating}
                    >
                        {isValidating ? (
                            <View style={styles.loadingContainer}>
                                <Animated.View style={{ transform: [{ rotate: spinAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }}>
                                    <Text style={{ fontSize: normalize(24) }}>⚙️</Text>
                                </Animated.View>
                                <Text style={styles.validateButtonText}>Compilando Java POO...</Text>
                            </View>
                        ) : (
                            <Text style={styles.validateButtonText}>☕ Compilar & Validar POO</Text>
                        )}
                    </TouchableOpacity>
                </Animated.View>

                {/* Resultado Modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={[
                            styles.modalContent,
                            resultado.includes('🎉') ? styles.resultadoSucesso : styles.resultadoErro
                        ]}>
                            <Text style={styles.resultadoText}>{resultado}</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>
        )}
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1117',
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    backgroundElement: {
        position: 'absolute',
        fontFamily: 'monospace',
        fontWeight: '300',
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: vw(5),
        paddingTop: vh(2),
    },
    headerContainer: {
        marginBottom: vh(0.5),
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: vh(0.5),
    },
    title: {
        fontSize: normalize(22),
        fontWeight: 'bold',
        color: '#FF8C42',
    },
    pontuacaoText: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: '#6C63FF',
    },
    exercicioNumero: {
        fontSize: normalize(11),
        color: '#ffffff',
        textAlign: 'center',
        opacity: 0.8,
    },
    exercicioCard: {
        backgroundColor: '#161B22',
        borderRadius: normalize(15),
        padding: normalize(20),
        marginBottom: vh(0.5),
        borderWidth: 1,
        borderColor: '#21262D',
    },
    exercicioHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: vh(1),
    },
    exercicioTitulo: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: '#FF8C42',
        flex: 1,
    },
    categoriaTag: {
        backgroundColor: 'rgba(108, 99, 255, 0.2)',
        borderRadius: normalize(8),
        paddingHorizontal: vw(2),
        paddingVertical: vh(0.5),
    },
    categoriaText: {
        color: '#6C63FF',
        fontSize: normalize(11),
        fontWeight: '600',
    },
    exercicioDescricao: {
        fontSize: normalize(14),
        color: '#ffffff',
        lineHeight: normalize(22),
        marginBottom: vh(0.5),
    },
    pontosContainer: {
        backgroundColor: 'rgba(255, 140, 66, 0.15)',
        borderRadius: normalize(8),
        paddingHorizontal: vw(3),
        paddingVertical: vh(1),
        alignSelf: 'flex-start',
        marginBottom: vh(1),
    },
    pontosText: {
        color: '#FF8C42',
        fontSize: normalize(13),
        fontWeight: 'bold',
    },
    infoButtonsContainer: {
        flexDirection: 'row',
        gap: vw(2.5),
        marginBottom: vh(1),
    },
    infoButton: {
        backgroundColor: 'rgba(255, 140, 66, 0.12)',
        borderRadius: normalize(8),
        paddingVertical: vh(1),
        paddingHorizontal: vw(3),
        borderWidth: 1,
        borderColor: 'rgba(255, 140, 66, 0.3)',
        flex: 1,
    },
    infoButtonActive: {
        backgroundColor: 'rgba(255, 140, 66, 0.25)',
        borderColor: '#FF8C42',
    },
    infoButtonText: {
        color: '#FF8C42',
        fontSize: normalize(13),
        fontWeight: '600',
        textAlign: 'center',
    },
    infoContainer: {
        backgroundColor: 'rgba(78, 205, 196, 0.12)',
        borderRadius: normalize(8),
        padding: normalize(15),
        marginTop: vh(1),
        borderWidth: 1,
        borderColor: 'rgba(78, 205, 196, 0.3)',
    },
    variaveisContainer: {
        backgroundColor: 'rgba(108, 99, 255, 0.12)',
        borderRadius: normalize(8),
        padding: normalize(15),
        marginTop: vh(1),
        borderWidth: 1,
        borderColor: 'rgba(108, 99, 255, 0.3)',
    },
    infoTitle: {
        color: '#ffffff',
        fontSize: normalize(15),
        fontWeight: 'bold',
        marginBottom: vh(1),
    },
    infoText: {
        color: '#ffffff',
        fontSize: normalize(13),
        marginBottom: vh(0.5),
        lineHeight: normalize(20),
    },
    variaveisSubtitle: {
        color: '#FF8C42',
        fontSize: normalize(12),
        fontWeight: '600',
        marginBottom: vh(1),
    },
    variavelItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: normalize(6),
        padding: normalize(8),
        marginBottom: vh(0.5),
    },
    variavelText: {
        fontFamily: 'monospace',
        color: '#FF8C42',
        fontSize: normalize(13),
        fontWeight: 'bold',
    },
    palavrasChaveTitle: {
        color: '#ffffff',
        fontSize: normalize(13),
        fontWeight: 'bold',
        marginTop: vh(1.5),
        marginBottom: vh(0.5),
    },
    palavrasChaveContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: vw(1.5),
    },
    palavraChaveTag: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: normalize(4),
        paddingHorizontal: vw(1.5),
        paddingVertical: vh(0.5),
    },
    palavraChaveText: {
        color: '#ffffff',
        fontSize: normalize(10),
        fontWeight: '500',
    },
    toolbarContainer: {
        marginBottom: vh(0.5),
    },
    toolbarTitle: {
        color: '#ffffff',
        fontSize: normalize(13),
        fontWeight: '600',
        marginBottom: vh(0.5),
    },
    toolbarButtons: {
        flexDirection: 'row',
        gap: vw(2),
    },
    toolButton: {
        backgroundColor: '#21262D',
        borderRadius: normalize(8),
        paddingVertical: vh(1),
        paddingHorizontal: vw(3),
        borderWidth: 1,
        borderColor: '#4ECDC4',
    },
    toolButtonText: {
        color: '#4ECDC4',
        fontSize: normalize(11),
        fontWeight: '600',
    },
    editorContainer: {
        flex: 1,
        marginBottom: vh(1),
    },
    editorHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: vh(1),
    },
    editorTitle: {
        color: '#ffffff',
        fontSize: normalize(15),
        fontWeight: '600',
    },
    resetButton: {
        backgroundColor: 'rgba(108, 99, 255, 0.2)',
        borderRadius: normalize(6),
        paddingVertical: vh(0.8),
        paddingHorizontal: vw(2.5),
    },
    resetButtonText: {
        color: '#6C63FF',
        fontSize: normalize(11),
        fontWeight: '600',
    },
    codeInput: {
        backgroundColor: '#0D1117',
        borderRadius: normalize(12),
        padding: normalize(15),
        fontSize: normalize(13),
        fontFamily: 'monospace',
        color: '#ffffff',
        borderWidth: 2,
        borderColor: '#21262D',
        textAlignVertical: 'top',
        flex: 1,
    },
    validateButton: {
        backgroundColor: '#FF8C42',
        borderRadius: normalize(12),
        paddingVertical: vh(2),
        paddingHorizontal: vw(5),
        marginBottom: vh(0.5),
        borderWidth: 2,
        borderColor: '#E67E22',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    validateButtonDisabled: {
        opacity: 0.7,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: vw(2.5),
    },
    validateButtonText: {
        color: '#ffffff',
        fontSize: normalize(15),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#161B22',
        borderRadius: normalize(15),
        padding: normalize(25),
        alignItems: 'center',
        borderWidth: 2,
    },
    resultadoSucesso: {
        borderColor: '#10b981',
    },
    resultadoErro: {
        borderColor: '#ef4444',
    },
    resultadoText: {
        color: '#ffffff',
        fontSize: normalize(16),
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: normalize(26),
        marginBottom: vh(1.5),
    },
    closeButton: {
        backgroundColor: '#FF8C42',
        borderRadius: normalize(10),
        paddingVertical: vh(1.5),
        paddingHorizontal: vw(7.5),
        elevation: 2,
    },
    closeButtonText: {
        color: '#ffffff',
        fontSize: normalize(15),
        fontWeight: 'bold',
    },
    });