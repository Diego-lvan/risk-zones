import { StyleSheet } from 'react-native';

import { RiskAreasScreen } from '@/src/risk_zones_map/ui/screens/risk_areas_screen';

export default function TabOneScreen() {
  return (
    <RiskAreasScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
