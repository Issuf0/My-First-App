
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getBeginnerLessonById, Lesson } from '../../services/lessonService';
import { styles } from '../../styles/lesson-intro.styles';
import { Button } from '../../componentes/button';
import Colors from '../../constants/Colors';

const LessonLearningScreen = () => {
  const router = useRouter();
  const { lessonId: lessonIdParam } = useLocalSearchParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  
  const lessonId = Number(lessonIdParam);

  useEffect(() => {
    if (lessonId) {
      const lessonData = getBeginnerLessonById(lessonId);
      setLesson(lessonData || null);
    }
    setLoading(false);
  }, [lessonId]);

  const handleStart = () => {
    if (lesson) {
      if (lesson.isChallenge) {
        router.push(`/code-challenge/${lesson.levelId}/${lesson.id}`);
      } else {
        router.push(`/quiz-screen/${lesson.levelId}/${lesson.id}`);
      }
    }
  };

  const renderExplainedCode = () => {
    if (!lesson?.codeExample || !lesson.exampleExplanation) {
      return null;
    }
    const codeLines = lesson.codeExample.split('\n');
    return (
      <View style={styles.codeBlock}>
        {codeLines.map((line, index) => (
          <View key={index}>
            <Text style={styles.codeText}>{line}</Text>
            {lesson.exampleExplanation?.[index] && (
              <Text style={styles.explanationText}>
                // {lesson.exampleExplanation[index]}
              </Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.light.tint} style={{ flex: 1, backgroundColor: styles.container.backgroundColor }} />;
  }

  if (!lesson) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Lição não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.introductionText}>{lesson.introduction}</Text>
        
        {lesson.isChallenge && lesson.challenge ? (
          <View>
            <Text style={styles.sectionTitle}>Objetivo</Text>
            <Text style={styles.explanationText}>{lesson.challenge.objective}</Text>
            <Text style={styles.sectionTitle}>Problema</Text>
            <Text style={styles.explanationText}>{lesson.challenge.problem}</Text>
          </View>
        ) : (
          <>
            {lesson.theory.map((block, index) => (
              <View key={index} style={styles.theoryBlock}>
                <Text style={styles.sectionTitle}>{block.title}</Text>
                <Text style={styles.explanationText}>{block.explanation}</Text>
                {block.example && (
                  <View style={styles.codeBlock}>
                    <Text style={styles.codeText}>{block.example}</Text>
                  </View>
                )}
                {block.observation && (
                  <Text style={styles.observationText}>💡 {block.observation}</Text>
                )}
              </View>
            ))}
            
            {lesson.codeExample && (
              <>
                <Text style={styles.sectionTitle}>Exemplo Prático Detalhado</Text>
                {renderExplainedCode()}
              </>
            )}
          </>
        )}

        <View style={styles.buttonContainer}>
          <Button title={lesson.isChallenge ? "Começar Desafio" : "Começar Quiz"} onPress={handleStart} />
        </View>
      </ScrollView>
    </View>
  );
};

export default LessonLearningScreen;
