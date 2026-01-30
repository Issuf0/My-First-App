import { Stack } from 'expo-router';
import { AudioProvider } from '@/contexts/AudioContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AudioProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AudioProvider>
    </SafeAreaProvider>
  );
}
