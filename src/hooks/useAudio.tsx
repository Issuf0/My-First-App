// hooks/useAudio.js
import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export const useAudio = () => {
    const [sounds, setSounds] = useState({
        correct: null,
        incorrect: null,
        celebration: null,
    });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        loadSounds();
        return () => {
            unloadSounds();
        };
    }, []);

    const loadSounds = async () => {
        try {
            // Configurar modo de áudio
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                staysActiveInBackground: false,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                shouldDuckAndroid: true,
                playThroughEarpieceAndroid: false,
            });

            // Carregar sons
            const { sound: correctSound } = await Audio.Sound.createAsync(
                require('@/assets/audio/coorect.wav'),
                { shouldPlay: false }
            );

            const { sound: incorrectSound } = await Audio.Sound.createAsync(
                require('@/assets/audio/wrong.wav'),
                { shouldPlay: false }
            );

            const { sound: celebrationSound } = await Audio.Sound.createAsync(
                require('@/assets/audio/sucess.wav'),
                { shouldPlay: false }
            );

            setSounds({
                correct: correctSound,
                incorrect: incorrectSound,
                celebration: celebrationSound,
            });

            setIsLoaded(true);
        } catch (error) {
            console.log('Erro ao carregar sons:', error);
        }
    };

    const unloadSounds = async () => {
        try {
            if (sounds.correct) await sounds.correct.unloadAsync();
            if (sounds.incorrect) await sounds.incorrect.unloadAsync();
            if (sounds.celebration) await sounds.celebration.unloadAsync();
        } catch (error) {
            console.log('Erro ao descarregar sons:', error);
        }
    };

    const playSound = async (soundType) => {
        if (!isLoaded || !sounds[soundType]) return;

        try {
            // Parar o som antes de tocar (caso já esteja tocando)
            await sounds[soundType].stopAsync();

            // Reposicionar para o início
            await sounds[soundType].setPositionAsync(0);

            // Tocar o som
            await sounds[soundType].playAsync();
        } catch (error) {
            console.log(`Erro ao tocar som ${soundType}:`, error);
        }
    };

    // Funções específicas para cada som
    const playCorrectSound = () => playSound('correct');
    const playIncorrectSound = () => playSound('incorrect');
    const playCelebrationSound = () => playSound('celebration');

    return {
        isLoaded,
        playCorrectSound,
        playIncorrectSound,
        playCelebrationSound,
        playSound,
    };
};