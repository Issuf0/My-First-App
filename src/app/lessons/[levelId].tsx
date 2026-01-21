import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import levels, { Level } from '@/constants/Levels'; // Manter para outros níveis
import { getBeginnerLessons, Lesson as BeginnerLesson } from '../../services/lessonService';
import { Ionicons } from '@expo/vector-icons';
import { normalize } from '../../utils/responsive';
import { useEffect, useState } from 'react';
import { styles } from '../../styles/lessons.styles';
import Colors from '@/constants/Colors';

// Mock de dados de progresso do usuário para demonstração
const mockUserProgress = {
  beginner: {
    1: { stars: 3, isUnlocked: true },
    2: { stars: 2, isUnlocked: true },
    3: { stars: 0, isUnlocked: true },
    4: { stars: 0, isUnlocked: false },
    5: { stars: 0, isUnlocked: false },
    6: { stars: 0, isUnlocked: false },
    7: { stars: 0, isUnlocked: false },
    8: { stars: 0, isUnlocked: false },
    9: { stars: 0, isUnlocked: false },
    10: { stars: 0, isUnlocked: false },
    11: { stars: 0, isUnlocked: false },
    12: { stars: 0, isUnlocked: false },
    13: { stars: 0, isUnlocked: false },
    14: { stars: 0, isUnlocked: false },
    15: { stars: 0, isUnlocked: false },
    16: { stars: 0, isUnlocked: false },
    17: { stars: 0, isUnlocked: false },
    18: { stars: 0, isUnlocked: false },
    19: { stars: 0, isUnlocked: false },
    20: { stars: 0, isUnlocked: false },
  },
  intermediate: {},
  advanced: {},
};

// Interface unificada para lições, compatível com ambas as fontes
type DisplayLesson = {
  id: number;
  title: string;
  description?: string; // Opcional para manter compatibilidade
  stars?: number;
  isUnlocked?: boolean;
};

export default function LessonsList() {
  const router = useRouter();
  const { levelId } = useLocalSearchParams<{ levelId: 'beginner' | 'intermediate' | 'advanced' }>();
  
  const [levelName, setLevelName] = useState('');
  const [lessons, setLessons] = useState<DisplayLesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let displayLessons: DisplayLesson[] = [];
    let name = '';

    if (levelId === 'beginner') {
      const beginnerLessons = getBeginnerLessons();
      name = 'Iniciante';
      // Mapeia as lições do serviço para o formato de exibição, aplicando o progresso
      displayLessons = beginnerLessons.map(lesson => {
        const progress = mockUserProgress.beginner[lesson.id as keyof typeof mockUserProgress.beginner];
        return {
          id: lesson.id,
          title: lesson.title,
          description: lesson.introduction, // Usar a introdução como descrição
          stars: progress?.stars || 0,
          isUnlocked: progress?.isUnlocked !== undefined ? progress.isUnlocked : (lesson.id === 1), // Desbloia a primeira por padrão
        };
      });
    } else {
      // Lógica para outros níveis (mantida por enquanto)
      const foundLevel = levels.find(level => level.id === levelId);
      if (foundLevel) {
        name = foundLevel.name;
        displayLessons = foundLevel.lessons.map(lesson => {
            const progress = mockUserProgress[levelId as keyof typeof mockUserProgress]?.[lesson.id];
            return {
              ...lesson,
              stars: progress?.stars || lesson.stars,
              isUnlocked: progress?.isUnlocked || lesson.isUnlocked,
            };
        });
      }
    }

    setLessons(displayLessons);
    setLevelName(name);
    setLoading(false);
  }, [levelId]);

  const handleLessonPress = (lesson: DisplayLesson) => {
    if (!lesson.isUnlocked) return;

    if (levelId === 'beginner') {
      // Navega para a nova tela de introdução para o nível iniciante
      router.push(`/lesson-intro/${lesson.id}`);
    } else {
      // Mantém a navegação antiga para outros níveis
      router.push(`/lesson-detail/${levelId}/${lesson.id}`);
    }
  };

  const renderLessonItem = ({ item }: { item: DisplayLesson }) => (
    <TouchableOpacity
      style={[styles.lessonItem, !item.isUnlocked && styles.lessonLocked]}
      onPress={() => handleLessonPress(item)}
      disabled={!item.isUnlocked}
    >
      <View style={styles.lessonHeader}>
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
        <Text style={styles.loadingText}>Nível não encontrado ou sem lições.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: levelName }} />
      <Text style={styles.levelTitle}>{levelName}</Text>
      <FlatList
        data={lessons}
        renderItem={renderLessonItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}