
import { StyleSheet } from 'react-native';
import { normalize, vh, vw } from '../utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: vw(5),
  },
  title: {
    fontSize: normalize(28),
    fontWeight: 'bold',
    marginBottom: vh(2),
    color: '#FFC107',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: normalize(22),
    fontWeight: 'bold',
    marginTop: vh(3),
    marginBottom: vh(1.5),
    color: '#E0E0E0',
    borderBottomWidth: 1,
    borderBottomColor: '#FFC107',
    paddingBottom: vh(0.5),
  },
  introductionText: {
    fontSize: normalize(16),
    lineHeight: normalize(24),
    color: '#B8D4FF',
    marginBottom: vh(2),
  },
  theoryBlock: {
    marginBottom: vh(3),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: normalize(8),
    padding: normalize(15),
  },
  explanationText: {
    fontSize: normalize(15),
    lineHeight: normalize(22),
    color: '#D0D0D0',
  },
  observationText: {
    fontSize: normalize(14),
    lineHeight: normalize(20),
    color: '#A0D4FF',
    marginTop: vh(1),
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: normalize(10),
    borderRadius: normalize(6),
    fontStyle: 'italic',
  },
  topicItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#B8D4FF',
    marginBottom: 5,
    marginLeft: 10,
  },
  codeBlock: {
    backgroundColor: '#1E2A3A',
    padding: normalize(15),
    borderRadius: 8,
    marginTop: vh(1.5),
  },
  codeText: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: normalize(14),
    color: '#A0E0FF',
    lineHeight: normalize(21),
  },
  buttonContainer: {
    marginTop: vh(4),
    marginBottom: vh(3),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D1B2A',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
