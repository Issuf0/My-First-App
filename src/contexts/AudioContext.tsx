
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio'; // Removed useAudioPlayerStatus

interface AudioContextType {
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  playSfx: (sound: 'correct' | 'wrong' | 'next' | 'fim' | 'pass5Question' | 'success') => void;
  toggleBgm: () => void;
  toggleSfx: () => void;
  isBgmEnabled: boolean;
  isSfxEnabled: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const soundFiles = {
  background: require('../assets/audio/background.mp3'),
  correct: require('../assets/audio/coorect.wav'),
  wrong: require('../assets/audio/wrong.wav'),
  next: require('../assets/audio/next.mp3'),
  fim: require('../assets/audio/fim.wav'),
  pass5Question: require('../assets/audio/pass5Question.wav'),
  success: require('../assets/audio/success.wav'),
};

// AudioStatusHandler component removed as its functionality is now integrated
// directly into playBackgroundMusic for more robust looping.

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bgm, setBgm] = useState<AudioPlayer | null>(null);
  const [isBgmEnabled, setIsBgmEnabled] = useState(true);
  const [isSfxEnabled, setIsSfxEnabled] = useState(true);

  const playBackgroundMusic = async () => {
    // If player exists, just resume it.
    if (bgm) {
      try {
        await bgm.play();
      } catch (error) {
        console.error("Error resuming background music:", error);
      }
      return;
    }
    
    // If player doesn't exist, create it.
    if (isBgmEnabled) {
      try {
        const player = await createAudioPlayer(soundFiles.background /* Removed { loop: true } */);
        // Add listener for looping
        player.addListener('playbackStatusUpdate', (status) => {
          if (status.didJustFinish) {
            player.seekTo(0);
            player.play();
          }
        });
        setBgm(player);
        await player.play();
      } catch (error) {
        console.error("Error creating/playing background music:", error);
      }
    }
  };

  const pauseBackgroundMusic = async () => {
    if (bgm) {
      try {
        await bgm.pause();
      } catch (error) {
        console.error("Error pausing background music:", error);
      }
    }
  };

  const playSfx = async (sound: 'correct' | 'wrong' | 'next' | 'fim' | 'pass5Question' | 'success') => {
    if (isSfxEnabled) {
      try {
        const player = await createAudioPlayer(soundFiles[sound]);
        const subscription = player.addListener('playbackStatusUpdate', (status) => {
          if (status.didJustFinish) {
            player.remove();
            subscription.remove();
          }
        });
        await player.play();
      } catch (error) {
        console.error("Error playing SFX:", error);
      }
    }
  };

  const toggleBgm = () => {
    const willBeEnabled = !isBgmEnabled;
    setIsBgmEnabled(willBeEnabled);
    if (willBeEnabled) {
      playBackgroundMusic();
    } else {
      pauseBackgroundMusic();
    }
  };

  const toggleSfx = () => {
    setIsSfxEnabled(prev => !prev);
  };

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: false,
      interruptionMode: 'duckOthers',
      shouldPlayInBackground: true,
    });

    if (isBgmEnabled) {
        playBackgroundMusic();
    }

    return () => {
      if (bgm) {
        bgm.remove();
      }
    };
  }, []);

  // Manual looping logic from AudioStatusHandler is now integrated into playBackgroundMusic.

  return (
    <AudioContext.Provider value={{ playBackgroundMusic, stopBackgroundMusic: pauseBackgroundMusic, playSfx, toggleBgm, toggleSfx, isBgmEnabled, isSfxEnabled }}>
      {/* AudioStatusHandler removed */}
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
