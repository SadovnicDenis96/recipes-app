import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screeens/welcome';


const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
}

export default AppNavigation;