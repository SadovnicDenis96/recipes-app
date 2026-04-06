import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FilterScreen from '../screens/filter_screen';
import Home from '../screens/home_screen';          
import Login from '../screens/login';
import SearchScreen from '../screens/search';
import SignUp from '../screens/signup';
import Welcome from '../screens/welcome';

const Stack = createNativeStackNavigator();

function AppNavigation({ user }) {
  if (user) {
    // User is logged in, show main app screens
    return (
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{ 
          headerShown: false 
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
      </Stack.Navigator>
    );
  }

  // User not logged in, show auth screens
  return (
    <Stack.Navigator 
      initialRouteName="Welcome" 
      screenOptions={{ 
        headerShown: false 
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default AppNavigation;