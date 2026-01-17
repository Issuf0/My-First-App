import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import levels, { Level, Lesson, LessonContent } from '@/constants/Levels'; // Ajuste o caminho
import { Ionicons } from '@expo/vector-icons';
import { normalize } from '@/utils/responsive';
import { styles } from '../../../styles/lesson-detail.styles';

export default function LessonDetail() {
  const { levelId, lessonId } = useLocalSearchParams();
  const parsedLessonId = parseInt(lessonId as string, 10);

  const level = levels.find(l => l.id === levelId);
  const lesson = level?.lessons.find(l => l.id === parsedLessonId);

  if (!level || !lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Lição não encontrada.</Text>
      </View>
    );
  }

  const handleStartQuiz = () => {
    // Navegar para a tela do quiz, passando o quizFileName
    router.navigate({
      pathname: `/quiz-screen/${levelId}/${lessonId}`,
      params: { quizFileName: lesson.quiz.quizFileName },
    });
  };

  const handleCodeChallenge = () => {
    // Navegar para a tela do desafio de código (ainda a ser criada)
    router.navigate(`/code-challenge/${levelId}/${lessonId}`);
  };

  const renderContent = (content: LessonContent[]) => {
    return content.map((item, index) => {
      if (item.type === 'text') {
        return <Text key={index} style={styles.contentText}>{item.value}</Text>;
      }
      if (item.type === 'code') {
        return (
          <View key={index} style={styles.codeBlock}>
            <Text style={styles.codeText}>{item.value}</Text>
          </View>
        );
      }
      return null;
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: lesson.title }} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        <Text style={styles.lessonDescription}>{lesson.description}</Text>

        <View style={styles.contentSection}>
          {renderContent(lesson.content)}
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={handleStartQuiz}>
            <Ionicons name="play-circle" size={normalize(24)} color="#0D1B2A" />
            <Text style={styles.buttonText}>Iniciar Quiz</Text>
          </TouchableOpacity>

          {lesson.isHard && (
            <TouchableOpacity style={[styles.button, styles.codeChallengeButton]} onPress={handleCodeChallenge}>
              <Ionicons name="terminal" size={normalize(24)} color="#0D1B2A" />
              <Text style={styles.buttonText}>Desafio com Código (Opcional)</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
