import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screeens/home_screen';
import Login from '../screeens/login';
import SearchScreen from '../screeens/search';
import Welcome from '../screeens/welcome';


const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator 
      initialRouteName="Welcome" 
      screenOptions={{ 
        headerShown: false 
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
     <Stack.Screen name="Home" component={Home} />
     <Stack.Screen name="Search" component={SearchScreen} />


    </Stack.Navigator>
  );
}

export default AppNavigation;