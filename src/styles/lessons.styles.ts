import { StyleSheet } from 'react-native';
import { normalize, vh, vw } from '@/utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    padding: vw(5),
  },
  levelTitle: {
    fontSize: normalize(28),
    fontWeight: 'bold',
    color: '#FFC107',
    textAlign: 'center',
    marginBottom: vh(3),
  },
  listContent: {
    paddingBottom: vh(5),
  },
  lessonItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: normalize(12),
    padding: normalize(15),
    marginBottom: vh(2),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  lessonLocked: {
    opacity: 0.6,
    borderColor: 'rgba(255, 193, 7, 0.2)',
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vh(0.5),
  },
  lessonTitle: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  lessonDescription: {
    fontSize: normalize(14),
    color: '#B8D4FF',
    marginBottom: vh(1),
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: vh(1),
  },
  starIcon: {
    marginRight: vw(1),
  },
  loadingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: vh(10),
    fontSize: normalize(18),
  },
});
