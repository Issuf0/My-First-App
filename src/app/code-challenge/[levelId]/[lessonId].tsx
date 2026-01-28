import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { normalize, vh, vw } from '../../../utils/responsive';
import { getBeginnerLessonById, Lesson } from '../../../services/lessonService';
import Colors from '@/constants/Colors';

export default function CodeChallengeScreen() {
  const { levelId, lessonId: lessonIdParam } = useLocalSearchParams<{ levelId: string, lessonId: string }>();
  const lessonId = parseInt(lessonIdParam, 10);

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [userCode, setUserCode] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lessonData = getBeginnerLessonById(lessonId);
    if (lessonData && lessonData.isChallenge && lessonData.challenge) {
      setLesson(lessonData);
      setUserCode(lessonData.challenge.initialCode);
    }
    setLoading(false);
  }, [lessonId]);

  const handleVerifyCode = () => {
    if (!lesson || !lesson.challenge) return;

    const { solutionKeywords } = lesson.challenge;
    let foundKeywords = 0;
    
    solutionKeywords.forEach(keyword => {
      // Regex para encontrar a palavra-chave como uma palavra inteira, ignorando o caso
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(userCode)) {
        foundKeywords++;
      }
    });

    let stars = 0;
    let feedbackTitle = 'Continue tentando!';
    let feedbackMessage = 'Parece que você ainda não acertou todos os pontos. Revise a lição e tente novamente!';

    if (foundKeywords === solutionKeywords.length) {
      stars = 3;
      feedbackTitle = 'Excelente!';
      feedbackMessage = 'Você usou todos os conceitos importantes e resolveu o desafio. Você ganhou 3 estrelas! ⭐⭐⭐';
    } else if (foundKeywords >= solutionKeywords.length / 2) {
      stars = 2;
      feedbackTitle = 'Muito bom!';
      feedbackMessage = 'Você está no caminho certo, mas faltam alguns detalhes. Você ganhou 2 estrelas! ⭐⭐';
    } else if (foundKeywords > 0) {
      stars = 1;
      feedbackTitle = 'Bom começo!';
      feedbackMessage = 'Você começou bem, mas ainda faltam alguns conceitos-chave. Você ganhou 1 estrela! ⭐';
    }
    
    // TODO: Salvar o progresso (estrelas)
    
    Alert.alert(feedbackTitle, feedbackMessage, [
      { text: 'OK', onPress: () => router.replace(`/lessons/${levelId}`) },
    ]);
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.light.tint} style={styles.container} />;
  }

  if (!lesson || !lesson.isChallenge || !lesson.challenge) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Desafio de código não encontrado.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <Stack.Screen options={{ title: lesson.title }} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Ionicons name="flame" size={normalize(30)} color={Colors.light.tint} />
          <Text style={styles.challengeTitle}>{lesson.title}</Text>
        </View>

        <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>🎯 Objetivo</Text>
            <Text style={styles.contentText}>{lesson.challenge.objective}</Text>
            <Text style={styles.sectionTitle}>🤔 Problema</Text>
            <Text style={styles.contentText}>{lesson.challenge.problem}</Text>
        </View>

        <Text style={styles.editorLabel}>Seu Código:</Text>
        <TextInput
          style={styles.codeEditor}
          multiline
          value={userCode}
          onChangeText={setUserCode}
          placeholder="Escreva seu código Java aqui..."
          placeholderTextColor="#888"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
          <Ionicons name="checkmark-circle-outline" size={normalize(24)} color="#0D1B2A" />
          <Text style={styles.verifyButtonText}>Verificar Solução</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  scrollViewContent: {
    padding: vw(5),
    paddingBottom: vh(5),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vh(2),
  },
  challengeTitle: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    color: '#FFC107',
    textAlign: 'center',
    marginLeft: vw(2),
  },
  contentSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: normalize(12),
    padding: normalize(15),
    marginBottom: vh(3),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  sectionTitle: {
      fontSize: normalize(18),
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: vh(1),
  },
  contentText: {
    fontSize: normalize(15),
    color: '#E0E0E0',
    lineHeight: normalize(22),
    marginBottom: vh(1.5),
  },
  editorLabel: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: vh(1),
  },
  codeEditor: {
    backgroundColor: '#1C2A3A',
    borderRadius: normalize(8),
    padding: normalize(15),
    minHeight: vh(30),
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Regular' : 'monospace',
    fontSize: normalize(14),
    color: '#A0E0FF',
    borderWidth: 1,
    borderColor: 'rgba(255, 193, 7, 0.3)',
    marginBottom: vh(3),
    textAlignVertical: 'top',
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3CB371',
    borderRadius: normalize(10),
    paddingVertical: vh(2),
    paddingHorizontal: vw(5),
    elevation: 5,
  },
  verifyButtonText: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: '#0D1B2A',
    marginLeft: vw(2),
  },
  loadingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: vh(10),
    fontSize: normalize(18),
  },
});
