import { StyleSheet } from 'react-native';
import { normalize, vh, vw } from '@/utils/responsive';
import Colors from '@/constants/Colors';
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.dark.background,
  },
  container: {
    width: '100%',
    paddingTop: Platform.OS === 'android' ? vh(2) : 0,
    paddingHorizontal: vw(4),
    paddingBottom: vh(1.5),
    backgroundColor: Colors.dark.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerContainer: {
    flex: 3,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: vw(4),
  },
  backButton: {
    padding: normalize(5),
  },
  title: {
    color: Colors.dark.text,
    fontSize: normalize(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: Colors.dark.textMuted,
    fontSize: normalize(12),
    textAlign: 'center',
    marginTop: vh(0.5),
  },
  progressText: {
    color: Colors.dark.tint,
    fontSize: normalize(14),
    fontWeight: '600',
  },
  icon: {
    padding: normalize(5),
  },
});
