import { Text, View } from '../../../components/Themed';

import { StyleSheet } from 'react-native';

export default function AuthScreen({ navigation } : any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auth</Text>
    </View>
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
});
