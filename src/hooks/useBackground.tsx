
import { useEffect } from 'react';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

export function useBackgroundSound(soundFile: any, isPlaying: boolean) {
    const player = useAudioPlayer(soundFile);
    const status = useAudioPlayerStatus(player);

    useEffect(() => {
        const manageSound = async () => {
            if (player && status.isLoaded) {
                if (isPlaying) {
                    await player.play();
                } else {
                    await player.pause();
                }
            }
        };

        manageSound();
    }, [isPlaying, player, status.isLoaded]);

    useEffect(() => {
        if (status.isLoaded && !status.playing && status.currentTime > 0 && status.currentTime >= status.duration) {
            // Sound finished, so restart to loop
            player.seekTo(0);
            player.play();
        }
    }, [status, player]);
}

