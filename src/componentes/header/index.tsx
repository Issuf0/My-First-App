import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useAudio } from '../../contexts/AudioContext';
import { normalize } from '../../utils/responsive';
import { styles } from './styles';

type LevelHeaderProps = {
  difficulty: string;
  levelName: string;
};

export function LevelHeader({ difficulty, levelName }: LevelHeaderProps) {
  const { isBgmEnabled, toggleBgm, isSfxEnabled, toggleSfx } = useAudio();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <Text style={[styles.cupIcon, { fontSize: normalize(24), color: '#FFC107' }]}>☕</Text>
      </View>

      <View style={styles.centerSection}>
        <Text style={styles.difficultyText}>{difficulty}</Text>
        <Text style={styles.levelNameText}>{levelName}</Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity onPress={toggleBgm} style={styles.iconButton}>
          <Ionicons
            name={isBgmEnabled ? 'volume-high' : 'volume-mute'}
            size={normalize(24)}
            color="#B8D4FF"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSfx} style={styles.iconButton}>
          <Ionicons
            name={isSfxEnabled ? 'musical-notes' : 'musical-notes-outline'}
            size={normalize(24)}
            color="#B8D4FF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
