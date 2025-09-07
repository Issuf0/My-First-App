import { useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';

export function useBackgroundSound(soundFile: any, isPlaying = true) {
    const sound = useRef<Audio.Sound | null>(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const manageSound = async () => {
            if (isPlaying) {
                if (!sound.current) {
                    try {
                        sound.current = new Audio.Sound();
                        await sound.current.loadAsync(soundFile);
                        await sound.current.setIsLoopingAsync(true);
                        await sound.current.playAsync();
                    } catch (error) {
                        console.log('Erro ao carregar som:', error);
                    }
                }
            } else {
                if (sound.current) {
                    await sound.current.unloadAsync();
                    sound.current = null;
                }
            }
        };

        manageSound();

        return () => {
            if (sound.current) {
                sound.current.unloadAsync().catch(console.error);
                sound.current = null;
            }
        };
    }, [soundFile, isPlaying]);

    const toggleMute = async () => {
        if (sound.current) {
            const newMuteState = !isMuted;
            await sound.current.setIsMutedAsync(newMuteState);
            setIsMuted(newMuteState);
        }
    };

    return { isMuted, toggleMute };
}