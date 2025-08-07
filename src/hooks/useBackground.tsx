import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
export function useBackgroundSound(soundFile: any, loop = true) {
    const sound = useRef<Audio.Sound | null>(null);

    useEffect(() => {
        // Verificar se soundFile existe antes de criar a função
        if (!soundFile) return;

        const loadSound = async () => {
            try {
                // Cleanup anterior
                if (sound.current) {
                    await sound.current.unloadAsync();
                }

                sound.current = new Audio.Sound();
                await sound.current.loadAsync(soundFile);
                await sound.current.setIsLoopingAsync(loop);
                await sound.current.playAsync();
            } catch (error) {
                console.log('Erro ao carregar som:', error);
            }
        };

        loadSound();

        return () => {
            if (sound.current) {
                sound.current.unloadAsync().catch(console.error);
                sound.current = null;
            }
        };
    }, [soundFile, loop]);
}