import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';



const { width, height } = Dimensions.get('window');


const Welcome = ({ navigation }) => {
  const handleStartCooking = () => {
    // Navigate to next screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Background Image with Overlay */}
      <ImageBackground
        source={require('../assets/food/backround/vegetables-backround.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0, 50, 30, 0.7)', 'rgba(0, 30, 20, 0.9)']}
          style={styles.gradient}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
              {/* Chef Hat Icon */}
              <View style={styles.iconWrapper}>
                <Ionicons name="restaurant" size={80} color="white" />
                <Text style={styles.recipeCount}>100K+ Premium Recipe</Text>
              </View>

              {/* Main Content */}
              <View style={styles.mainContent}>
                <Text style={styles.title}>Get Cooking</Text>
                <Text style={styles.subtitle}>
                  Simple way to find Tasty Recipe
                </Text>
              </View>

              {/* Start Button */}
              <TouchableOpacity
                style={styles.startButton}
                onPress={handleStartCooking}
                activeOpacity={0.8}
              >
                <Text style={styles.startButtonText}>Start Cooking</Text>
                <Text style={styles.arrow}>→</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: height * 0.15,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  recipeCount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  mainContent: {
    alignItems: 'center',
    marginBottom: height * 0.1,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: '#2DBD8C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '80%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default Welcome;