import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import levels from '@/constants/Levels';
import { getBeginnerLessons } from '../../services/lessonService';
import { Ionicons } from '@expo/vector-icons';
import { normalize } from '../../utils/responsive';
import React, { useState, useCallback } from 'react';
import { styles } from '../../styles/lessons.styles';
import Colors from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalHeader } from '@/componentes/GlobalHeader';

type DisplayLesson = {
  id: number;
  title: string;
  description?: string;
  stars?: number;
  isUnlocked?: boolean;
  isChallenge?: boolean;
};

type UserProgress = {
  [key: number]: {
    stars: number;
    isUnlocked: boolean;
  };
};

export default function LessonsList() {
  const router = useRouter();
  const { levelId } = useLocalSearchParams<{ levelId: 'beginner' | 'intermediate' | 'advanced' }>();
  
  const [levelName, setLevelName] = useState('');
  const [lessons, setLessons] = useState<DisplayLesson[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLessonData = useCallback(async () => {
    setLoading(true);
    let displayLessons: DisplayLesson[] = [];
    let name = '';
    
    try {
      if (levelId === 'beginner') {
        const beginnerLessons = getBeginnerLessons();
        name = 'Iniciante';

        const progressKey = `@userProgress:${levelId}`;
        const existingProgressJSON = await AsyncStorage.getItem(progressKey);
        const userProgress: UserProgress = existingProgressJSON ? JSON.parse(existingProgressJSON) : {};

        displayLessons = beginnerLessons.map((lesson, index, allLessons) => {
          const progress = userProgress[lesson.id];
          const stars = progress?.stars || 0;

          let isUnlocked = false;
          if (index === 0) {
            isUnlocked = true;
          } else {
            const previousLessonId = allLessons[index - 1].id;
            const previousLessonProgress = userProgress[previousLessonId];
            const previousLessonStars = previousLessonProgress?.stars || 0;
            if (previousLessonStars >= 2) {
              isUnlocked = true;
            }
          }

          return {
            id: lesson.id,
            title: lesson.title,
            description: lesson.introduction,
            stars: stars,
            isUnlocked: isUnlocked,
            isChallenge: lesson.isChallenge,
          };
        });
      } else {
        const foundLevel = levels.find(level => level.id === levelId);
        if (foundLevel) {
          name = foundLevel.name;
          displayLessons = foundLevel.lessons.map(lesson => ({
            ...lesson,
            stars: lesson.stars || 0,
            isUnlocked: lesson.isUnlocked,
          }));
        }
      }
      setLessons(displayLessons);
      setLevelName(name);
    } catch (e) {
      console.error("Falha ao carregar dados das lições.", e);
    } finally {
      setLoading(false);
    }
  }, [levelId]);

  useFocusEffect(
    useCallback(() => {
      loadLessonData();
    }, [loadLessonData])
  );

  const handleLessonPress = (lesson: DisplayLesson) => {
    if (!lesson.isUnlocked) return;

    if (levelId === 'beginner') {
      router.push(`/lesson-intro/${lesson.id}`);
    } else {
        // Futura navegação para outros níveis
      router.push(`/quiz-screen/${levelId}/${lesson.id}`);
    }
  };

  const renderLessonItem = ({ item }: { item: DisplayLesson }) => (
    <TouchableOpacity
      style={[styles.lessonItem, !item.isUnlocked && styles.lessonLocked, item.isChallenge && styles.challengeItem]}
      onPress={() => handleLessonPress(item)}
      disabled={!item.isUnlocked}
    >
      <View style={styles.lessonHeader}>
        {item.isChallenge && <Ionicons name="flame" size={normalize(18)} color={Colors.light.tint} style={{marginRight: 8}} />}
        <Text style={styles.lessonTitle}>{item.title}</Text>
        {!item.isUnlocked && <Ionicons name="lock-closed" size={normalize(18)} color="#888" />}
      </View>
      <Text style={styles.lessonDescription} numberOfLines={2}>
        {item.description || 'Descrição não disponível.'}
      </Text>
      <View style={styles.starsContainer}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Ionicons
            key={i}
            name={item.stars && item.stars > i ? 'star' : 'star-outline'}
            size={normalize(16)}
            color={item.stars && item.stars > i ? '#FFD700' : '#888'}
          />
        ))}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.light.tint} />
        </View>
    );
  }

  if (lessons.length === 0) {
    return (
      <View style={styles.container}>
        <GlobalHeader title="Erro" showBack />
        <Text style={styles.loadingText}>Nível não encontrado ou sem lições.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.dark.background }}>
      <GlobalHeader title={levelName} showBack showSoundControls />
      <FlatList
        data={lessons}
        renderItem={renderLessonItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}