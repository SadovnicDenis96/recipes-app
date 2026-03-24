import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screeens/home_screen';
import Login from '../screeens/login';
import SearchScreen from '../screeens/search';
import SignUp from '../screeens/signup';
import Welcome from '../screeens/welcome';


const Stack = createNativeStackNavigator();

function AppNavigation({ user }) {
  return (
    <Stack.Navigator 
      initialRouteName={user ? "Home" : "Welcome"} 
      screenOptions={{ 
        headerShown: false 
      }}
    >
      {!user ? (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AppNavigation;