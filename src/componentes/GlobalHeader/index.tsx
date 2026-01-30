import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAudio } from '@/contexts/AudioContext';
import { styles } from './styles';
import Colors from '@/constants/Colors';
import { normalize } from '@/utils/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';

type GlobalHeaderProps = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  currentStep?: number;
  totalSteps?: number;
  showSoundControls?: boolean;
};

export function GlobalHeader({
  title,
  subtitle,
  showBack = false,
  currentStep,
  totalSteps,
  showSoundControls = false,
}: GlobalHeaderProps) {
  const router = useRouter();
  const { isBgmEnabled, toggleBgm, isSfxEnabled, toggleSfx } = useAudio();

  const canGoBack = router.canGoBack();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {showBack && canGoBack && (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={normalize(24)} color={Colors.dark.text} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {currentStep !== undefined && totalSteps !== undefined && (
            <Text style={styles.progressText}>
              {currentStep} de {totalSteps}
            </Text>
          )}
        </View>

        <View style={styles.rightContainer}>
          {showSoundControls && (
            <>
              <TouchableOpacity onPress={toggleBgm} style={styles.icon}>
                <Ionicons
                  name={isBgmEnabled ? 'musical-notes' : 'musical-notes-outline'}
                  size={normalize(22)}
                  color={Colors.dark.text}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleSfx} style={styles.icon}>
                <Ionicons
                  name={isSfxEnabled ? 'volume-medium' : 'volume-mute-outline'}
                  size={normalize(22)}
                  color={Colors.dark.text}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
