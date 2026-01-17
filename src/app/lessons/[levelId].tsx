import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import levels, { Level, Lesson } from '@/constants/Levels';
import { Ionicons } from '@expo/vector-icons';
import { normalize } from '../../utils/responsive';
import { useEffect, useState } from 'react';
import { styles } from '../../styles/lessons.styles';

// Mock de dados de progresso do usuário para demonstração
// Em um aplicativo real, isso viria de AsyncStorage ou um backend
const mockUserProgress = {
  beginner: {
    1: { stars: 3, isUnlocked: true },
    2: { stars: 2, isUnlocked: true },
    3: { stars: 0, isUnlocked: true },
    4: { stars: 0, isUnlocked: false },
    // ... e assim por diante para todas as lições
  },
  intermediate: {},
  advanced: {},
};

export default function LessonsList() {
  const { levelId } = useLocalSearchParams();
  const [currentLevel, setCurrentLevel] = useState<Level | undefined>(undefined);
  const [lessonsWithProgress, setLessonsWithProgress] = useState<Lesson[]>([]);

  useEffect(() => {
    const foundLevel = levels.find(level => level.id === levelId);
    if (foundLevel) {
      setCurrentLevel(foundLevel);
      // Simula a aplicação do progresso do usuário às lições
      const updatedLessons = foundLevel.lessons.map(lesson => {
        const progress = mockUserProgress[levelId as keyof typeof mockUserProgress]?.[lesson.id];
        return {
          ...lesson,
          stars: progress?.stars || lesson.stars,
          isUnlocked: progress?.isUnlocked || lesson.isUnlocked,
        };
      });
      setLessonsWithProgress(updatedLessons);
    }
  }, [levelId]);

  const renderLessonItem = ({ item }: { item: Lesson }) => (
    <TouchableOpacity
      style={[styles.lessonItem, !item.isUnlocked && styles.lessonLocked]}
      onPress={() => item.isUnlocked && router.navigate(`/lesson-detail/${levelId}/${item.id}`)} // Nova rota para detalhe da lição
      disabled={!item.isUnlocked}
    >
      <View style={styles.lessonHeader}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        {!item.isUnlocked && <Ionicons name="lock-closed" size={normalize(18)} color="#888" />}
      </View>
      <Text style={styles.lessonDescription}>{item.description}</Text>
      <View style={styles.starsContainer}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Ionicons
            key={i}
            name={item.stars && item.stars > i ? 'star' : 'star-outline'}
            size={normalize(16)}
            color={item.stars && item.stars > i ? '#FFD700' : '#888'}
            style={styles.starIcon}
          />
        ))}
      </View>
    </TouchableOpacity>
  );

  if (!currentLevel) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Nível não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: currentLevel.name }} />
      <Text style={styles.levelTitle}>{currentLevel.name}</Text>
      <FlatList
        data={lessonsWithProgress}
        renderItem={renderLessonItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
