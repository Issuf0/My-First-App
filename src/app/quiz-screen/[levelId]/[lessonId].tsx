import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LevelHeader } from '@/componentes/header';
import { normalize, vh, vw } from '@/utils/responsive'; // Ajuste o caminho
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para persistir o progresso
import { getQuizData } from '../../../utils/quizUtils';
import levels from '@/constants/Levels'; // Importar levels
import { useAudio } from '../../../contexts/AudioContext';

// Tipo para uma única pergunta do quiz
type QuizQuestion = {
  pergunta: string;
  opcoes: string[];
  correta: string;
};

export default function QuizScreen() {
  const { levelId, lessonId } = useLocalSearchParams();
  const quizFileName = (useLocalSearchParams().quizFileName as string);
  const parsedLessonId = parseInt(lessonId as string, 10);
  const { playSfx } = useAudio();
  const animationRef = useRef<Animatable.Text & View>(null);

  const [quizData, setQuizData] = useState<QuizQuestion[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [stars, setStars] = useState(0);
  const [consecutiveCorrectAnswers, setConsecutiveCorrectAnswers] = useState(0);

  const level = levels.find(l => l.id === levelId);
  const lesson = level?.lessons.find(l => l.id === parsedLessonId);

  useEffect(() => {
    function loadQuizData() {
      if (quizFileName) {
        const data = getQuizData(quizFileName as string);
        if (data && data.length > 0) {
          // Algoritmo de shuffle Fisher-Yates para aleatorizar as questões
          for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
          }
          // Pega as primeiras 15 questões após o shuffle
          setQuizData(data.slice(0, 15));
        } else {
          console.error(`Quiz "${quizFileName}" não encontrado ou está vazio.`);
          Alert.alert("Erro", "Não foi possível carregar o quiz.");
          router.back();
        }
      }
    }
    loadQuizData();
  }, [quizFileName]);

  const handleOptionSelect = (option: string) => {
    if (!showCorrectAnswer) {
      setSelectedOption(option);
      setShowCorrectAnswer(true);
      if (option === quizData?.[currentQuestionIndex].correta) {
        setScore(prevScore => prevScore + 1);
        playSfx('success');
        const newConsecutive = consecutiveCorrectAnswers + 1;
        setConsecutiveCorrectAnswers(newConsecutive);

        if (newConsecutive > 0 && newConsecutive % 5 === 0) {
          playSfx('pass5Question');
          if (animationRef.current) {
            animationRef.current.transitionTo({ opacity: 1 }, 200);
            animationRef.current.bounceIn?.(1000).then(() => {
              setTimeout(() => {
                animationRef.current?.transitionTo({ opacity: 0 }, 1000);
              }, 1500);
            });
          }
        }
      } else {
        playSfx('wrong');
        setConsecutiveCorrectAnswers(0);
      }
    }
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < (quizData?.length || 0) - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setShowCorrectAnswer(false);
    } else {
      // Quiz completo
      setQuizCompleted(true);
      const calculatedStars = calculateStars(score, quizData?.length || 0);
      setStars(calculatedStars);
      await updateLessonProgress(calculatedStars);
    }
  };

  const calculateStars = (currentScore: number, totalQuestions: number) => {
    if (totalQuestions === 0) return 0;
    const percentage = (currentScore / totalQuestions) * 100;
    if (percentage >= 90) return 3;
    if (percentage >= 60) return 2;
    if (percentage >= 30) return 1;
    return 0;
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

      if (earnedStars === 3 && lesson.id < level.lessons.length) {
        const nextLessonId = lesson.id + 1;
        if (!userProgress[level.id][nextLessonId]) {
          userProgress[level.id][nextLessonId] = {};
        }
        userProgress[level.id][nextLessonId].isUnlocked = true;
      }

      await AsyncStorage.setItem('userProgress', JSON.stringify(userProgress));
      Alert.alert("Quiz Concluído", `Você ganhou ${earnedStars} estrela(s)!`);
      router.replace(`/lessons/${levelId}`);
    } catch (error) {
      console.error("Erro ao salvar o progresso:", error);
      Alert.alert("Erro", "Não foi possível salvar o progresso.");
    }
  };

  if (!quizData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando quiz...</Text>
      </View>
    );
  }

  if (quizCompleted) {
    // ... (rest of the component remains the same)
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} /> {/* Hide the default header */}
      {level && <LevelHeader difficulty={`Lição ${parsedLessonId}`} levelName={level.id} />}
      <Text style={styles.questionNumber}>Questão {currentQuestionIndex + 1} de {quizData.length}</Text>
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
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Text style={styles.nextButtonText}>Próxima Questão</Text>
          <Ionicons name="arrow-forward" size={normalize(20)} color="#0D1B2A" style={styles.nextButtonIcon} />
        </TouchableOpacity>
      )}

      <View style={styles.animationContainer}>
        <Animatable.Text ref={animationRef} style={styles.encouragementText}>
          Excelente!
        </Animatable.Text>
      </View>
    </View>
  );
}

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
    backgroundColor: '#3CB371', // Verde para resposta correta
    borderColor: '#2E8B57',
  },
  wrongOption: {
    backgroundColor: '#DC143C', // Vermelho para resposta incorreta
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
  nextButtonIcon: {
    color: '#0D1B2A',
  },
  quizCompletedTitle: {
    fontSize: normalize(30),
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: vh(2),
  },
  quizCompletedText: {
    fontSize: normalize(18),
    color: '#FFFFFF',
    marginBottom: vh(3),
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
  animationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    pointerEvents: 'none',
  },
  encouragementText: {
    fontSize: normalize(50),
    fontWeight: 'bold',
    color: '#FFD700',
    opacity: 0,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
