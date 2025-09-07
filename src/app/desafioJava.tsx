import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    StatusBar,
    ActivityIndicator,
    Animated,
    Easing,
    Modal,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    Keyboard
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { router } from "expo-router";
import exercicios from "../database/desafioJava.json";
import { Exercicio } from "../types";
import { normalize, vh, vw } from "../utils/responsive";

// Componente de fundo com ícones Java
const JavaBackground = () => {
    const javaElements = [
        // Código Java
        'public class', 'private int', 'public static void', 'main(String[] args)',
        'System.out.println()', 'Scanner sc', 'new Scanner(System.in)', 'sc.nextInt()',
        'sc.nextLine()', 'sc.close()', 'if (condition)', 'else if', 'for (int i=0)',
        'while (true)', 'do { }', 'switch (opcao)', 'case 1:', 'break;', 'default:',
        'import java.util.*', 'extends Object', 'implements Interface', '@Override',
        'try { }', 'catch (Exception e)', 'throw new', 'finally { }',
        'int[] array', 'new int[5]', 'array.length', 'ArrayList<String>',
        'HashMap<K,V>', 'List<Integer>', 'Set<String>', 'Collections.sort()',

        // Símbolos e operadores
        '{ }', '( )', '[ ]', '< >', ';', '=', '==', '!=', '<=', '>=',
        '&&', '||', '!', '+', '-', '*', '/', '%', '++', '--', '+', '-=',

        // Ícones Java especiais
        '☕', '♨', '⚙', '🔧', '📝', '🔍', '⚡', '🚀', '💡',

        // Chavenas e símbolos
        '{', '}', '(', ')', '[', ']', '< ', '>', '"', "'",

        // Palavras-chave essenciais
        'class', 'public', 'private', 'static', 'void', 'int', 'String', 'boolean',
        'double', 'float', 'char', 'byte', 'short', 'long', 'final', 'abstract',
        'interface', 'extends', 'implements', 'super', 'this', 'new', 'return',
        'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
        'try', 'catch', 'throw', 'throws', 'finally', 'import', 'package'
    ];

    return (
        <View style={styles.backgroundContainer}>
            {Array.from({ length: 35 }, (_, index) => {
                const element = javaElements[index % javaElements.length];
                const isSymbol = ['{', '}', '(', ')', '[', ']', '< ', '>', ';', '=', '+', '-', '*', '/', '%'].includes(element);
                const isIcon = ['☕', '♨', '⚙', '🔧', '💻', '📝', '🔍', '⚡', '🚀', '💡'].includes(element);

                return (
                    <Text
                        key={index}
                        style={[
                            styles.backgroundElement,
                            {
                                top: (index * 2.5) + '%',
                                left: (index * 2.5) + '%',
                                opacity: isIcon ? 0.15 : (isSymbol ? 0.12 : 0.08),
                                fontSize: normalize(isIcon ? (20) :
                                    isSymbol ? (16) :
                                        (10)),
                                transform: [{ rotate: `${(index * 10)}deg` }],
                                color: isIcon
                                    ? '#ff6b35'
                                    : isSymbol
                                        ? '#e94560'
                                        : '#16213e',
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

const backgroundMusic = require('@/assets/audio/background.mp3');

export default function JavaCodeEditor() {
    const [exerciciosEmbaralhados, setExerciciosEmbaralhados] = useState<Exercicio[]>([]);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [exercicioAtual, setExercicioAtual] = useState<Exercicio | null>(null);
    const [userCode, setUserCode] = useState('');
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const exerciciosEmbaralhados = [...exercicios];
        setExerciciosEmbaralhados(exerciciosEmbaralhados);
        setExercicioAtual(exerciciosEmbaralhados[0]);
        setUserCode(exerciciosEmbaralhados[0].templateCodigo);

        // Listener para mudanças do teclado
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                setKeyboardHeight(e.endCoordinates.height);
                setIsKeyboardVisible(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
                setIsKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener?.remove();
            keyboardDidShowListener?.remove();
        };
    }, []);

    const [resultado, setResultado] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [showDicas, setShowDicas] = useState(false);
    const [showVariaveis, setShowVariaveis] = useState(false);
    const [pontuacao, setPontuacao] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });
    const scaleValue = useRef(new Animated.Value(1)).current;
    const spinValue = useRef(new Animated.Value(0)).current;

    const codeInputRef = useRef(null);
    const scrollViewRef = useRef<ScrollView>(null);

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

    // Função para focar no editor quando necessário
    const focusCodeEditor = () => {
        if (codeInputRef.current) {
            codeInputRef.current.focus();
            // Rolar para o editor após um pequeno delay
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 300);
        }
    };

    // Validação do código (simulada - integrar com API)
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

        // Simular delay da API
        setTimeout(() => {
            const codigoLimpo = userCode.replace(/\s/g, '').toLowerCase();
            let sucesso = false;
            let mensagem = '';

            // Validação específica por exercício
            switch (exercicioAtual.id) {
                case 1: // Olá Mundo
                    if (codigoLimpo.includes('system.out.println') &&
                        (codigoLimpo.includes('olá,mundo') || codigoLimpo.includes('"olá,mundo!"'))) {
                        sucesso = true;
                        mensagem = '🎉 Parabéns! Olá Mundo perfeito!\n+5 pontos';
                        setPontuacao(pontuacao + 5);
                    } else {
                        mensagem = '❌ Verifique: deve imprimir exatamente "Olá, Mundo!"';
                    }
                    break;

                case 2: // Soma
                    if (codigoLimpo.includes('inta=10') && codigoLimpo.includes('intb=5') &&
                        codigoLimpo.includes('soma') && codigoLimpo.includes('system.out.println')) {
                        sucesso = true;
                        mensagem = '🎉 Excelente! Soma calculada corretamente!\n+5 pontos';
                        setPontuacao(pontuacao + 5);
                    } else {
                        mensagem = '❌ Verifique: use int a=10, int b=5 e calcule a soma';
                    }
                    break;

                case 3: // Scanner Nome
                    if (codigoLimpo.includes('scannersc') && codigoLimpo.includes('sc.nextline') &&
                        codigoLimpo.includes('stringnome')) {
                        sucesso = true;
                        mensagem = '🎉 Perfeito! Scanner usado corretamente!\n+10 pontos';
                        setPontuacao(pontuacao + 10);
                    } else {
                        mensagem = '❌ Verifique: use Scanner sc, String nome e sc.nextLine()';
                    }
                    break;

                case 4: // Maior de Idade
                    if (codigoLimpo.includes('scannersc') && codigoLimpo.includes('intidade') &&
                        codigoLimpo.includes('if') && codigoLimpo.includes('else')) {
                        sucesso = true;
                        mensagem = '🎉 Muito bem! Condicionais aplicadas!\n+10 pontos';
                        setPontuacao(pontuacao + 10);
                    } else {
                        mensagem = '❌ Verifique: use Scanner sc, int idade, if/else';
                    }
                    break;

                case 5: // Tabuada
                    if (codigoLimpo.includes('scannersc') && codigoLimpo.includes('intnumero') &&
                        codigoLimpo.includes('for') && codigoLimpo.includes('inti')) {
                        sucesso = true;
                        mensagem = '🎉 Fantástico! Loop for dominado!\n+15 pontos';
                        setPontuacao(pontuacao + 15);
                    } else {
                        mensagem = '❌ Verifique: use Scanner sc, int numero, for com int i';
                    }
                    break;

                case 6: // Array
                    if (codigoLimpo.includes('int[]numeros') && codigoLimpo.includes('intmaior') &&
                        codigoLimpo.includes('for') && codigoLimpo.includes('inti')) {
                        sucesso = true;
                        mensagem = '🎉 Incrível! Arrays e loops dominados!\n+20 pontos';
                        setPontuacao(pontuacao + 20);
                    } else {
                        mensagem = '❌ Verifique: use int[] numeros, int maior, for com int i';
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
                }, 2000);
            }
        }, 1500);
    };

    const proximoExercicio = () => {
        const proximo = indiceAtual + 1;
        if (proximo < exerciciosEmbaralhados.length) {
            setIndiceAtual(proximo);
            const proximoEx = exerciciosEmbaralhados[proximo];
            setExercicioAtual(proximoEx);
            setUserCode(proximoEx.templateCodigo);
            setResultado('');
            setShowDicas(false);
            setShowVariaveis(false);
        } else {
            Alert.alert(
                "🏆 Parabéns!",
                `Você completou todos os exercícios!\nPontuação final: ${pontuacao} pontos`,
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
        // Focar no editor após inserir texto
        setTimeout(() => focusCodeEditor(), 100);
    };

    return (
        <View style={styles.container}>
            <JavaBackground />
            <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? keyboardHeight > 0 ? 90 : 0 : 0}
            >
                <ScrollView
                    ref={scrollViewRef}
                    style={[
                        styles.contentContainer,
                        isKeyboardVisible && { marginBottom: Platform.OS === 'android' ? keyboardHeight * 0.1 : 0 }
                    ]}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: isKeyboardVisible ? vh(5) : vh(2) }}
                    keyboardShouldPersistTaps="handled"
                >
                    {exercicioAtual && (
                        <>
                            {/* Header */}
                            <View style={styles.headerContainer}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>☕ Editor Java</Text>
                                    <Text style={styles.pontuacaoText}>🏆 {pontuacao} pts</Text>
                                </View>
                                <Text style={styles.exercicioNumero}>
                                    {exercicioAtual.titulo} ({exercicioAtual.nivel}) - {exercicioAtual.id}/{exercicios.length}
                                </Text>
                            </View>

                            {/* Card do Exercício Completo - Ocultar quando teclado visível */}
                            {!isKeyboardVisible && (
                                <View style={styles.exercicioCard}>
                                    <View style={styles.exercicioHeader}>
                                        <Text style={styles.exercicioTitulo}>{exercicioAtual.titulo}</Text>
                                        <View style={styles.categoriaTag}>
                                            <Text style={styles.categoriaText}>{exercicioAtual.categoria}</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.exercicioDescricao}>{exercicioAtual.descricao}</Text>

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
                                                📋 {showVariaveis ? 'Ocultar' : 'Ver'} Variáveis
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* Dicas */}
                                    {showDicas && (
                                        <View style={styles.infoContainer}>
                                            <Text style={styles.infoTitle}>💡 Dicas:</Text>
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
                                            <Text style={styles.infoTitle}>📋 Variáveis Obrigatórias:</Text>
                                            <Text style={styles.variaveisSubtitle}>
                                                ⚠ Use exatamente estas variáveis para compatibilidade:
                                            </Text>
                                            {exercicioAtual.variaveisObrigatorias.map((variavel: string, index: number) => (
                                                <View key={index} style={styles.variavelItem}>
                                                    <Text style={styles.variavelText}>{variavel}</Text>
                                                </View>
                                            ))}
                                            <Text style={styles.palavrasChaveTitle}>🔑 Palavras-chave esperadas:</Text>
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
                            )}
                            {/* Indicador compacto quando teclado visível */}
                            {isKeyboardVisible && (
                                <View style={styles.compactIndicator}>
                                    <Text style={styles.compactTitle}>{exercicioAtual.titulo}</Text>
                                    <Text style={styles.compactSubtitle}>Exercício {exercicioAtual.id}/{exercicios.length}</Text>
                                </View>
                            )}

                            {/* Barra de Ferramentas */}
                            <View style={styles.toolbarContainer}>
                                <Text style={styles.toolbarTitle}>⚡ Atalhos Rápidos:</Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.toolbarScrollView}
                                >
                                    <View style={styles.toolbarButtons}>
                                        <TouchableOpacity
                                            style={styles.toolButton}
                                            onPress={() => inserirTexto('System.out.println("");')}
                                        >
                                            <Text style={styles.toolButtonText}>println</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.toolButton}
                                            onPress={() => inserirTexto('Scanner sc = new Scanner(System.in);')}
                                        >
                                            <Text style={styles.toolButtonText}>Scanner</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.toolButton}
                                            onPress={() => inserirTexto('if () {\n    \n}')}
                                        >
                                            <Text style={styles.toolButtonText}>if</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.toolButton}
                                            onPress={() => inserirTexto('for (int i = 0; i < 10; i++) {\n    \n}')}
                                        >
                                            <Text style={styles.toolButtonText}>for</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.toolButton}
                                            onPress={() => inserirTexto('int[] array = new int[10];')}
                                        >
                                            <Text style={styles.toolButtonText}>array</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>

                            {/* Editor de Código */}
                            <View style={[
                                styles.editorContainer,
                                isKeyboardVisible && styles.editorContainerKeyboardVisible
                            ]}>
                                <View style={styles.editorHeader}>
                                    <Text style={styles.editorTitle}>📝 Seu Código Java:</Text>
                                    <TouchableOpacity style={styles.resetButton} onPress={resetarCodigo}>
                                        <Text style={styles.resetButtonText}>🔄 Reset</Text>
                                    </TouchableOpacity>
                                </View>

                                <TextInput
                                    ref={codeInputRef}
                                    multiline
                                    style={[
                                        styles.codeInput,
                                        isKeyboardVisible && styles.codeInputKeyboardVisible
                                    ]}
                                    value={userCode}
                                    onChangeText={setUserCode}
                                    placeholder="Digite seu código Java aqui..."
                                    placeholderTextColor="#666"
                                    textAlignVertical="top"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    spellCheck={false}
                                    onSelectionChange={(e) => setCursorPosition(e.nativeEvent.selection)}
                                    onFocus={focusCodeEditor}
                                    scrollEnabled={true}
                                />
                            </View>

                            {/* Botão Validar */}
                            <Animated.View style={{
                                transform: [{ scale: pulseAnim }],
                                marginBottom: isKeyboardVisible ? normalize(10) : normalize(20)
                            }}>
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
                                            <Text style={styles.validateButtonText}>Validando...</Text>
                                        </View>
                                    ) : (
                                        <Text style={styles.validateButtonText}>✅ Executar & Validar</Text>
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
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    keyboardAvoidingContainer: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: vw(5),
        paddingTop: vh(1),
    },
    contentWithKeyboard: {
        paddingBottom: normalize(10),
    },
    scrollContentContainer: {
        flexGrow: 1,
        paddingBottom: normalize(30),
    },
    headerContainer: {
        marginBottom: vh(0.2),
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
        color: '#ff6b35',
    },
    pontuacaoText: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: '#e94560',
    },
    exercicioNumero: {
        fontSize: normalize(11),
        color: '#ffffff',
        textAlign: 'center',
        opacity: 0.8,
    },
    // Indicador compacto para quando o teclado está visível
    compactIndicator: {
        backgroundColor: '#16213e',
        borderRadius: normalize(10),
        padding: normalize(12),
        marginBottom: vh(1),
        borderWidth: 1,
        borderColor: '#0f3460',
    },
    compactTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: '#ff6b35',
        textAlign: 'center',
    },
    compactSubtitle: {
        fontSize: normalize(12),
        color: '#ffffff',
        textAlign: 'center',
        opacity: 0.8,
        marginTop: vh(0.5),
    },
    exercicioCard: {
        backgroundColor: '#16213e',
        borderRadius: normalize(15),
        padding: normalize(20),
        marginBottom: vh(0.5),
        borderWidth: 1,
        borderColor: '#0f3460',
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
        color: '#ff6b35',
        flex: 1,
    },
    categoriaTag: {
        backgroundColor: 'rgba(233, 69, 96, 0.2)',
        borderRadius: normalize(8),
        paddingHorizontal: vw(2),
        paddingVertical: vh(0.5),
    },
    categoriaText: {
        color: '#e94560',
        fontSize: normalize(11),
        fontWeight: '600',
    },
    exercicioDescricao: {
        fontSize: normalize(14),
        color: '#ffffff',
        lineHeight: normalize(22),
        marginBottom: vh(0.5),
    },
    infoButtonsContainer: {
        flexDirection: 'row',
        gap: vw(2.5),
        marginBottom: vh(1),
    },
    infoButton: {
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderRadius: normalize(8),
        paddingVertical: vh(1),
        paddingHorizontal: vw(3),
        borderWidth: 1,
        borderColor: 'rgba(255, 107, 53, 0.3)',
        flex: 1,
    },
    infoButtonActive: {
        backgroundColor: 'rgba(255, 107, 53, 0.2)',
        borderColor: '#ff6b35',
    },
    infoButtonText: {
        color: '#ff6b35',
        fontSize: normalize(13),
        fontWeight: '600',
        textAlign: 'center',
    },
    infoContainer: {
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        borderRadius: normalize(8),
        padding: normalize(15),
        marginTop: vh(1),
        borderWidth: 1,
        borderColor: 'rgba(255, 193, 7, 0.3)',
    },
    variaveisContainer: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderRadius: normalize(8),
        padding: normalize(15),
        marginTop: vh(1),
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.3)',
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
        color: '#ff6b35',
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
        color: '#ff6b35',
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
        marginBottom: vh(0.2),
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
        backgroundColor: '#0f3460',
        borderRadius: normalize(8),
        paddingVertical: vh(1),
        paddingHorizontal: vw(3),
        borderWidth: 1,
        borderColor: '#ff6b35',
    },
    toolButtonText: {
        color: '#ff6b35',
        fontSize: normalize(11),
        fontWeight: '600',
    },
    editorContainer: {
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
        backgroundColor: 'rgba(233, 69, 96, 0.2)',
        borderRadius: normalize(6),
        paddingVertical: vh(0.8),
        paddingHorizontal: vw(2.5),
    },
    resetButtonText: {
        color: '#e94560',
        fontSize: normalize(11),
        fontWeight: '600',
    },
    codeInput: {
        backgroundColor: '#0f1419',
        borderRadius: normalize(12),
        padding: normalize(15),
        fontSize: normalize(13),
        fontFamily: 'monospace',
        color: '#ffffff',
        borderWidth: 2,
        borderColor: '#16213e',
        textAlignVertical: 'top',
        minHeight: vh(20),
        flex: 1,
    },
    editorContainerKeyboardVisible: {
        flex: 1,
    },
    codeInputKeyboardVisible: {
        height: vh(40),
    },
    validateButton: {
        backgroundColor: '#ff6b35',
        borderRadius: normalize(12),
        paddingVertical: vh(2),
        paddingHorizontal: vw(5),
        marginBottom: vh(0.5),
        borderWidth: 2,
        borderColor: '#e55a2b',
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
        backgroundColor: '#16213e',
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
        backgroundColor: '#ff6b35',
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