import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { normalize, vh, vw } from '../../../utils/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import levels, { Level, Lesson, LessonContent } from '../../../../constants/Levels';

export default function CodeChallengeScreen() {
  const { levelId, lessonId } = useLocalSearchParams();
  const parsedLessonId = parseInt(lessonId as string, 10);

  const [level, setLevel] = useState<Level | undefined>(undefined);
  const [lesson, setLesson] = useState<Lesson | undefined>(undefined);
  const [userCode, setUserCode] = useState('');
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const foundLevel = levels.find(l => l.id === levelId);
    const foundLesson = foundLevel?.lessons.find(l => l.id === parsedLessonId);
    setLevel(foundLevel);
    setLesson(foundLesson);

    if (foundLesson) {
      // Pré-preenche o editor com o conteúdo de código se existir
      const codeContent = foundLesson.content.find(item => item.type === 'code');
      if (codeContent) {
        setUserCode(codeContent.value);
      }
    }
  }, [levelId, lessonId]);

  const handleVerifyCode = async () => {
    // Lógica de verificação simulada
    // Para a demonstração, vamos simular que qualquer código não vazio é "correto"
    // Em uma implementação real, haveria uma lógica de validação de código mais complexa
    if (userCode.trim().length > 0) {
      setIsCorrect(true);
      setChallengeCompleted(true);
      await updateLessonProgress(3); // Ganha 3 estrelas ao resolver o desafio de código
      Alert.alert('Sucesso!', 'Seu código parece correto! Você ganhou 3 estrelas.', [
        { text: 'OK', onPress: () => router.replace(`/lessons/${levelId}`) },
      ]);
    } else {
      setIsCorrect(false);
      setChallengeCompleted(false);
      Alert.alert('Tente Novamente', 'Por favor, escreva algum código para verificar.', [
        { text: 'OK' },
      ]);
    }
  };

  const updateLessonProgress = async (earnedStars: number) => {
    if (!level || !lesson) return;

    try {
      const storedProgress = await AsyncStorage.getItem('userProgress');
      let userProgress = storedProgress ? JSON.parse(storedProgress) : {};

      if (!userProgress[level.id]) {
        userProgress[level.id] = {};
      }
      userProgress[level.id][lesson.id] = {
        ...userProgress[level.id][lesson.id],
        stars: earnedStars,
        isUnlocked: true,
      };

      // Desbloquear a próxima lição se 3 estrelas foram obtidas
      if (earnedStars === 3 && lesson.id < level.lessons.length) {
        const nextLessonId = lesson.id + 1;
        if (!userProgress[level.id][nextLessonId]) {
          userProgress[level.id][nextLessonId] = {};
        }
        userProgress[level.id][nextLessonId].isUnlocked = true;
      }

      await AsyncStorage.setItem('userProgress', JSON.stringify(userProgress));
    } catch (error) {
      console.error("Erro ao salvar o progresso:", error);
    }
  };

  const renderContent = (content: LessonContent[]) => {
    return content.map((item, index) => {
      if (item.type === 'text') {
        return <Text key={index} style={styles.contentText}>{item.value}</Text>;
      }
      // Não renderiza o tipo 'code' aqui, pois ele é para o editor
      return null;
    });
  };

  if (!level || !lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Desafio de código não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Desafio: ${lesson.title}` }} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.challengeTitle}>Desafio de Código: {lesson.title}</Text>
        <Text style={styles.challengeDescription}>
          Resolva o desafio abaixo escrevendo o código.
        </Text>

        <View style={styles.contentSection}>
          {renderContent(lesson.content)}
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
          editable={!challengeCompleted} // Desabilita edição após conclusão
        />

        {!challengeCompleted ? (
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
            <Ionicons name="checkmark-circle-outline" size={normalize(24)} color="#0D1B2A" />
            <Text style={styles.verifyButtonText}>Verificar Solução</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.feedbackContainer}>
            <Text style={[styles.feedbackText, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
              {isCorrect ? 'Solução Correta!' : 'Solução Incorreta.'}
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={() => router.replace(`/lessons/${levelId}`)}>
              <Text style={styles.backButtonText}>Voltar para Lições</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  scrollViewContent: {
    padding: vw(5),
    paddingBottom: vh(10),
  },
  challengeTitle: {
    fontSize: normalize(26),
    fontWeight: 'bold',
    color: '#FFC107',
    textAlign: 'center',
    marginBottom: vh(2),
  },
  challengeDescription: {
    fontSize: normalize(16),
    color: '#B8D4FF',
    textAlign: 'center',
    marginBottom: vh(4),
    paddingHorizontal: vw(2),
  },
  contentSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: normalize(12),
    padding: normalize(15),
    marginBottom: vh(4),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  contentText: {
    fontSize: normalize(15),
    color: '#FFFFFF',
    lineHeight: normalize(24),
    marginBottom: vh(1.5),
  },
  editorLabel: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: vh(1),
  },
  codeEditor: {
    backgroundColor: '#1C2A3A', // Fundo mais escuro para o editor
    borderRadius: normalize(8),
    padding: normalize(15),
    minHeight: vh(25),
    fontFamily: 'monospace',
    fontSize: normalize(14),
    color: '#A0E0FF',
    borderWidth: 1,
    borderColor: 'rgba(255, 193, 7, 0.3)',
    marginBottom: vh(3),
    textAlignVertical: 'top', // Para placeholder ficar no topo em multiline
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3CB371', // Verde para verificar
    borderRadius: normalize(10),
    paddingVertical: vh(2),
    paddingHorizontal: vw(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  verifyButtonText: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: '#0D1B2A',
    marginLeft: vw(2),
  },
  feedbackContainer: {
    alignItems: 'center',
    marginTop: vh(3),
  },
  feedbackText: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    marginBottom: vh(2),
  },
  feedbackCorrect: {
    color: '#3CB371',
  },
  feedbackWrong: {
    color: '#DC143C',
  },
  backButton: {
    backgroundColor: '#1E90FF',
    borderRadius: normalize(10),
    paddingVertical: vh(1.5),
    paddingHorizontal: vw(6),
  },
  backButtonText: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loadingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: vh(10),
    fontSize: normalize(18),
  },
});
