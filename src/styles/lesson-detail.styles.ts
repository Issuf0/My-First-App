import { StyleSheet } from 'react-native';
import { normalize, vh, vw } from '@/utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A', // Azul escuro profundo
  },
  scrollViewContent: {
    padding: vw(5),
    paddingBottom: vh(10),
  },
  lessonTitle: {
    fontSize: normalize(26),
    fontWeight: 'bold',
    color: '#FFC107',
    textAlign: 'center',
    marginBottom: vh(2),
  },
  lessonDescription: {
    fontSize: normalize(16),
    color: '#B8D4FF',
    textAlign: 'center',
    marginBottom: vh(4),
    paddingHorizontal: vw(2),
  },
  contentSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: normalize(12),
    padding: normalize(15),
    marginBottom: vh(4),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  contentText: {
    fontSize: normalize(15),
    color: '#FFFFFF',
    lineHeight: normalize(24),
    marginBottom: vh(1.5),
  },
  codeBlock: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: normalize(8),
    padding: normalize(10),
    marginTop: vh(1),
    marginBottom: vh(1.5),
    borderWidth: 1,
    borderColor: 'rgba(255, 193, 7, 0.3)',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: normalize(14),
    color: '#A0E0FF', // Azul claro para código
  },
  buttonGroup: {
    marginTop: vh(3),
    gap: vh(2),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC107',
    borderRadius: normalize(10),
    paddingVertical: vh(2),
    paddingHorizontal: vw(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  codeChallengeButton: {
    backgroundColor: '#1E90FF', // Azul diferente para o desafio de código
  },
  buttonText: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: '#0D1B2A',
    marginLeft: vw(2),
  },
  loadingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: vh(10),
    fontSize: normalize(18),
  },
});
