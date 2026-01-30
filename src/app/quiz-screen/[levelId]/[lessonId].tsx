import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { GlobalHeader } from '@/componentes/GlobalHeader';
import { normalize, vh, vw } from '@/utils/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBeginnerLessonById, Lesson } from '../../../services/lessonService';
import { useAudio } from '../../../contexts/AudioContext';
import Colors from '@/constants/Colors';
import { StoredQuestion } from '@/types';

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
    if (!levelId || !lesson) return;
    const progressKey = `@userProgress:${levelId}`;

    try {
      const existingProgressJSON = await AsyncStorage.getItem(progressKey);
      const existingProgress = existingProgressJSON ? JSON.parse(existingProgressJSON) : {};

      const currentStars = existingProgress[lesson.id]?.stars || 0;
      existingProgress[lesson.id] = {
        ...existingProgress[lesson.id],
        stars: Math.max(earnedStars, currentStars),
        isUnlocked: true,
      };
      
      await AsyncStorage.setItem(progressKey, JSON.stringify(existingProgress));
      console.log(`Progresso salvo para ${progressKey}:`, existingProgress);

    } catch (e) {
      console.error("Falha ao salvar o progresso.", e);
      Alert.alert("Erro", "Não foi possível salvar seu progresso.");
    }
  };

  const handleFinishQuiz = () => {
    router.replace(`/lessons/${levelId}`);
  };

  if (!lesson || questions.length === 0) {
    return (
      <View style={styles.container}>
        <GlobalHeader title="Carregando..." showBack />
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  if (quizCompleted) {
    return (
      <View style={styles.container}>
        <GlobalHeader title="Quiz Finalizado" showBack />
        <View style={styles.content}>
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
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <GlobalHeader 
        title={lesson.title}
        subtitle={lesson.levelId}
        currentStep={currentQuestionIndex + 1}
        totalSteps={questions.length}
        showBack
      />
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
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
          <Animatable.View animation="fadeIn" duration={300} style={styles.nextButtonContainer}>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Próxima'}
              </Text>
              <Ionicons name="arrow-forward" size={normalize(20)} color="#0D1B2A" />
            </TouchableOpacity>
          </Animatable.View>
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
    content: {
      flex: 1,
      paddingHorizontal: vw(5),
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: vh(4),
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: normalize(18),
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
    nextButtonContainer: {
      alignItems: 'center',
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