import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    Dimensions,
    StatusBar,
    ActivityIndicator,
    Animated,
    Easing,
    Modal
} from "react-native";
import React, { useState, useRef } from "react";
import { router } from "expo-router";
import exercicios from "../database/desafioJava.json";

const { width, height } = Dimensions.get('window');

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
        '&&', '||', '!', '+', '-', '*', '/', '%', '++', '--', '+=', '-=',

        // Ícones Java especiais
        '☕', '♨', '⚙', '🔧', '💻', '📝', '🔍', '⚡', '🚀', '💡',

        // Chavenas e símbolos
        '{', '}', '(', ')', '[', ']', '<', '>', '"', "'",

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
                const element = javaElements[Math.floor(Math.random() * javaElements.length)];
                const isSymbol = ['{', '}', '(', ')', '[', ']', '<', '>', ';', '=', '+', '-', '*', '/', '%'].includes(element);
                const isIcon = ['☕', '♨', '⚙', '🔧', '💻', '📝', '🔍', '⚡', '🚀', '💡'].includes(element);

                return (
                    <Text
                        key={index}
                        style={[
                            styles.backgroundElement,
                            {
                                top: Math.random() * height,
                                left: Math.random() * width,
                                opacity: isIcon ? 0.15 : (isSymbol ? 0.12 : 0.08),
                                fontSize: isIcon ? (Math.random() * 10 + 20) :
                                    isSymbol ? (Math.random() * 8 + 16) :
                                        (Math.random() * 6 + 10),
                                transform: [{ rotate: `${ Math.random() * 360 }deg` }],
                            color: isIcon ? '#ff6b35' :
            isSymbol ? '#e94560' :
            '#16213e'
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
   ;

    const [exercicioAtual, setExercicioAtual] = useState(exercicios[0]);
    const [userCode, setUserCode] = useState(exercicioAtual.templateCodigo);
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

    // Validação do código (simulada - integrar com API)
    const validarCodigo = async () => {
        if (!userCode.trim()) {
            Alert.alert("❌ Erro", "Por favor, escreva algum código!");
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
        const proximoIndex = exercicios.findIndex(ex => ex.id === exercicioAtual.id) + 1;
        if (proximoIndex < exercicios.length) {
            const proximoEx = exercicios[proximoIndex];
            setExercicioAtual(proximoEx);
            setUserCode(proximoEx.templateCodigo);
            setResultado('');
            setShowDicas(false);
            setShowVariaveis(false);
        } else {
            Alert.alert(
                "🏆 Parabéns!",
                `Você completou todos os exercícios!\nPontuação final: ${ pontuacao } pontos`,
                [
                    { text: "Voltar ao Menu", onPress: () => router.back() }
                ]
            );
        }
    };

    const resetarCodigo = () => {
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

    const inserirTexto = (texto) => {
        const newCode = userCode.slice(0, cursorPosition.start) + texto + userCode.slice(cursorPosition.end);
        setUserCode(newCode);
    };

    return (
        <View style={styles.container}>
            <JavaBackground />
            <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>💻 Editor Java</Text>
                        <Text style={styles.pontuacaoText}>🏆 {pontuacao} pts</Text>
                    </View>
                    <Text style={styles.exercicioNumero}>
                        {exercicioAtual.titulo} ({exercicioAtual.nivel}) - {exercicioAtual.id}/{exercicios.length}
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
                                📋 {showVariaveis ? 'Ocultar' : 'Ver'} Variáveis
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Dicas */}
                    {showDicas && (
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>💡 Dicas:</Text>
                            {exercicioAtual.dicas.map((dica, index) => (
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
                            {exercicioAtual.variaveisObrigatorias.map((variavel, index) => (
                                <View key={index} style={styles.variavelItem}>
                                    <Text style={styles.variavelText}>{variavel}</Text>
                                </View>
                            ))}
                            <Text style={styles.palavrasChaveTitle}>🔑 Palavras-chave esperadas:</Text>
                            <View style={styles.palavrasChaveContainer}>
                                {exercicioAtual.palavrasChave.map((palavra, index) => (
                                    <View key={index} style={styles.palavraChaveTag}>
                                        <Text style={styles.palavraChaveText}>{palavra}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                {/* Barra de Ferramentas */}
                <View style={styles.toolbarContainer}>
                    <Text style={styles.toolbarTitle}>⚡ Atalhos Rápidos:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                                onPress={() => inserirTexto('for (int i = 0; i < ; i++) {\n    \n}')}
                            >
                                <Text style={styles.toolButtonText}>for</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.toolButton}
                                onPress={() => inserirTexto('int[] array = new int[];')}
                            >
                                <Text style={styles.toolButtonText}>array</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

                {/* Editor de Código */}
                <View style={styles.editorContainer}>
                    <View style={styles.editorHeader}>
                        <Text style={styles.editorTitle}>📝 Seu Código Java:</Text>
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
                        placeholder="Digite seu código Java aqui..."
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
                                    <Text style={{ fontSize: 24 }}>⚙️</Text>
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

                {/* Botão Voltar */}
                <View style={styles.backContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Text style={styles.backButtonText}>← Voltar ao Menu</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
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
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    headerContainer: {
        marginBottom: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff6b35',
    },
    pontuacaoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e94560',
    },
    exercicioNumero: {
        fontSize: 12,
        color: '#ffffff',
        textAlign: 'center',
        opacity: 0.8,
    },
    exercicioCard: {
        backgroundColor: '#16213e',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#0f3460',
    },
    exercicioHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    exercicioTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ff6b35',
        flex: 1,
    },
    categoriaTag: {
        backgroundColor: 'rgba(233, 69, 96, 0.2)',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    categoriaText: {
        color: '#e94560',
        fontSize: 12,
        fontWeight: '600',
    },
    exercicioDescricao: {
        fontSize: 16,
        color: '#ffffff',
        lineHeight: 22,
        marginBottom: 15,
    },
    pontosContainer: {
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        alignSelf: 'flex-start',
        marginBottom: 15,
    },
    pontosText: {
        color: '#ff6b35',
        fontSize: 14,
        fontWeight: 'bold',
    },
    infoButtonsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    infoButton: {
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
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
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    infoContainer: {
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 193, 7, 0.3)',
    },
    variaveisContainer: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.3)',
    },
    infoTitle: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoText: {
        color: '#ffffff',
        fontSize: 14,
        marginBottom: 5,
        lineHeight: 20,
    },
    variaveisSubtitle: {
        color: '#ff6b35',
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 10,
    },
    variavelItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 6,
        padding: 8,
        marginBottom: 6,
    },
    variavelText: {
        fontFamily: 'monospace',
        color: '#ff6b35',
        fontSize: 14,
        fontWeight: 'bold',
    },
    palavrasChaveTitle: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 8,
    },
    palavrasChaveContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    palavraChaveTag: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 3,
    },
    palavraChaveText: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: '500',
    },
    toolbarContainer: {
        marginBottom: 15,
    },
    toolbarTitle: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    toolbarButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    toolButton: {
        backgroundColor: '#0f3460',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ff6b35',
    },
    toolButtonText: {
        color: '#ff6b35',
        fontSize: 12,
        fontWeight: '600',
    },
    editorContainer: {
        marginBottom: 20,
    },
    editorHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    editorTitle: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    resetButton: {
        backgroundColor: 'rgba(233, 69, 96, 0.2)',
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    resetButtonText: {
        color: '#e94560',
        fontSize: 12,
        fontWeight: '600',
    },
    codeInput: {
        backgroundColor: '#0f1419',
        borderRadius: 12,
        padding: 15,
        fontSize: 14,
        fontFamily: 'monospace',
        color: '#ffffff',
        minHeight: 200,
        maxHeight: 350,
        borderWidth: 2,
        borderColor: '#16213e',
        textAlignVertical: 'top',
    },
    validateButton: {
        backgroundColor: '#ff6b35',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
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
        gap: 10,
    },
    validateButtonText: {
        color: '#ffffff',
        fontSize: 16,
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
        borderRadius: 15,
        padding: 25,
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
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#ff6b35',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 30,
        elevation: 2,
    },
    closeButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backContainer: {
        alignItems: 'center',
        paddingBottom: 30,
    },
    backButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    backButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});