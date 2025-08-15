import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Based on iPhone 8's scale
const scale = SCREEN_WIDTH / 375;

export function normalize(size: number) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const vw = (width: number) => {
  return (SCREEN_WIDTH * width) / 100;
};

export const vh = (height: number) => {
  return (SCREEN_HEIGHT * height) / 100;
};
