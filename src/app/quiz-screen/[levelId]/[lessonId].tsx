import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LevelHeader } from '@/componentes/header';
import { normalize, vh, vw } from '@/utils/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBeginnerLessonById, Lesson } from '../../../services/lessonService';
import { useAudio } from '../../../contexts/AudioContext';
import Colors from '@/constants/Colors';
import { StoredQuestion } from '@/types';

// O QuizScreen foi refatorado para usar o novo lessonService,
// garantindo que as perguntas são específicas para cada lição do nível iniciante.

export default function QuizScreen() {
  const router = useRouter();
  const { levelId, lessonId: lessonIdParam } = useLocalSearchParams<{ levelId: string; lessonId: string }>();
  const lessonId = parseInt(lessonIdParam, 10);

  const { playSfx } = useAudio();
  const animationRef = useRef<Animatable.Text & View>(null);

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [questions, setQuestions] = useState<StoredQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [stars, setStars] = useState(0);
  const [consecutiveCorrectAnswers, setConsecutiveCorrectAnswers] = useState(0);

  useEffect(() => {
    if (levelId === 'beginner' && lessonId) {
      const lessonData = getBeginnerLessonById(lessonId);
      if (lessonData) {
        setLesson(lessonData);
        setQuestions(lessonData.questions);
      } else {
        Alert.alert("Erro", "Lição de iniciante não encontrada.");
        router.back();
      }
    } else {
      // Lógica para outros níveis pode ser adicionada aqui no futuro
      Alert.alert("Erro", "Nível não suportado ou ID da lição ausente.");
      router.back();
    }
  }, [levelId, lessonId]);

  const handleOptionSelect = (option: string) => {
    if (showCorrectAnswer) return;

    setSelectedOption(option);
    setShowCorrectAnswer(true);

    if (option === questions[currentQuestionIndex].correta) {
      setScore(prev => prev + 1);
      playSfx('success');
      const newConsecutive = consecutiveCorrectAnswers + 1;
      setConsecutiveCorrectAnswers(newConsecutive);

      if (newConsecutive > 0 && newConsecutive % 5 === 0) {
        playSfx('pass5Question');
        animationRef.current?.bounceIn?.(1000);
      }
    } else {
      playSfx('wrong');
      setConsecutiveCorrectAnswers(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowCorrectAnswer(false);
    } else {
      setQuizCompleted(true);
      const calculatedStars = calculateStars(score, questions.length);
      setStars(calculatedStars);
      updateLessonProgress(calculatedStars);
    }
  };

  const calculateStars = (currentScore: number, totalQuestions: number) => {
    if (totalQuestions === 0) return 0;
    const percentage = (currentScore / totalQuestions) * 100;
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    if (percentage >= 40) return 1;
    return 0;
  };

  const updateLessonProgress = async (earnedStars: number) => {
    if (!lesson) return;
    // A lógica de progresso pode ser expandida no futuro.
    // Por agora, apenas exibimos o resultado.
    console.log(`Progresso salvo: Nível ${levelId}, Lição ${lesson.id}, Estrelas: ${earnedStars}`);
  };

  const handleFinishQuiz = () => {
    Alert.alert("Quiz Concluído", `Você ganhou ${stars} estrela(s)!`);
    router.replace(`/lessons/${levelId}`);
  };

  if (!lesson || questions.length === 0) {
    return <ActivityIndicator size="large" color={Colors.light.tint} style={styles.container} />;
  }

  if (quizCompleted) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Animatable.Text animation="zoomIn" duration={500} style={styles.quizCompletedTitle}>
          Quiz Concluído!
        </Animatable.Text>
        <Text style={styles.quizCompletedText}>Sua pontuação: {score} de {questions.length}</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3].map((s) => (
            <Ionicons
              key={s}
              name={s <= stars ? 'star' : 'star-outline'}
              size={normalize(40)}
              color={s <= stars ? '#FFD700' : '#888'}
              style={styles.starIcon}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.finishButton} onPress={handleFinishQuiz}>
          <Text style={styles.finishButtonText}>Voltar para Lições</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <LevelHeader difficulty={`Lição ${lesson.id}`} levelName={lesson.levelId} />
      <Text style={styles.questionNumber}>Questão {currentQuestionIndex + 1} de {questions.length}</Text>
      <Text style={styles.questionText}>{currentQuestion.pergunta}</Text>

      <View style={styles.optionsContainer}>
        {currentQuestion.opcoes.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && (option === currentQuestion.correta ? styles.correctOption : styles.wrongOption),
              showCorrectAnswer && option === currentQuestion.correta && styles.correctOption,
            ]}
            onPress={() => handleOptionSelect(option)}
            disabled={showCorrectAnswer}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {showCorrectAnswer && (
        <Animatable.View animation="fadeIn" duration={300}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Próxima'}
            </Text>
            <Ionicons name="arrow-forward" size={normalize(20)} color="#0D1B2A" />
          </TouchableOpacity>
        </Animatable.View>
      )}
    </View>
  );
}

// Estilos (mantidos e ajustados conforme necessário)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1B2A',
        padding: vw(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: normalize(18),
    },
    questionNumber: {
        fontSize: normalize(16),
        color: '#B8D4FF',
        marginBottom: vh(2),
    },
    questionText: {
        fontSize: normalize(22),
        fontWeight: 'bold',
        color: '#FFC107',
        textAlign: 'center',
        marginBottom: vh(4),
    },
    optionsContainer: {
        width: '100%',
        gap: vh(1.5),
        marginBottom: vh(4),
    },
    optionButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: normalize(10),
        paddingVertical: vh(1.8),
        paddingHorizontal: vw(4),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    optionText: {
        color: '#FFFFFF',
        fontSize: normalize(16),
        textAlign: 'center',
    },
    correctOption: {
        backgroundColor: '#3CB371',
        borderColor: '#2E8B57',
    },
    wrongOption: {
        backgroundColor: '#DC143C',
        borderColor: '#B22222',
    },
    nextButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFC107',
        borderRadius: normalize(10),
        paddingVertical: vh(1.5),
        paddingHorizontal: vw(6),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    nextButtonText: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: '#0D1B2A',
        marginRight: vw(2),
    },
    quizCompletedTitle: {
        fontSize: normalize(30),
        fontWeight: 'bold',
        color: '#FFC107',
        marginBottom: vh(2),
        textAlign: 'center',
    },
    quizCompletedText: {
        fontSize: normalize(18),
        color: '#FFFFFF',
        marginBottom: vh(3),
        textAlign: 'center',
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: vh(4),
    },
    starIcon: {
        marginHorizontal: vw(1),
    },
    finishButton: {
        backgroundColor: '#1E90FF',
        borderRadius: normalize(10),
        paddingVertical: vh(1.5),
        paddingHorizontal: vw(6),
    },
    finishButtonText: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});