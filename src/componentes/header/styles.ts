import { StyleSheet } from 'react-native';
import { normalize, vw, vh } from '../../utils/responsive';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: vw(5),
    paddingVertical: vh(2),
    backgroundColor: '#1E2A3A',
    borderBottomWidth: 1,
    borderBottomColor: '#34495E',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cupIcon: {
    marginRight: vw(3),
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultyText: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: '#FFC107',
  },
  levelNameText: {
    fontSize: normalize(14),
    color: '#B8D4FF',
    textTransform: 'lowercase',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(4),
  },
  iconButton: {
    padding: vw(1),
  },
});
