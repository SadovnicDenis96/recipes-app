import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const { signup, loading, error, user } = useAuth();

  // Navigate to Home once user is authenticated
  useEffect(() => {
    if (user && isSigningUp) {
      setIsSigningUp(false);
      Alert.alert('Успешно', 'Аккаунт создан! 🎉\nДобро пожаловать в Recipes App!', [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setEmail('');
            setPassword('');
            setConfirmPassword('');
          }
        }
      ]);
    }
  }, [user, isSigningUp]);

  const handleSignUp = async () => {
    if (!email.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, введите email');
      return;
    }

    if (!password) {
      Alert.alert('Ошибка', 'Пожалуйста, введите пароль');
      return;
    }

    if (!confirmPassword) {
      Alert.alert('Ошибка', 'Пожалуйста, подтвердите пароль');
      return;
    }

    if (!agreedToTerms) {
      Alert.alert('Ошибка', 'Пожалуйста, примите условия использования');
      return;
    }

    setIsSigningUp(true);
    const result = await signup(email, password, confirmPassword);

    if (!result.success) {
      setIsSigningUp(false);
      Alert.alert('Ошибка', result.error || 'Не удалось создать аккаунт');
    }
    // If success, wait for user state update from useEffect above
  };

  const handleGoogleSignUp = () => {
    Alert.alert('Скоро доступно', 'Регистрация через Google будет добавлена позже');
  };

  const handleFacebookSignUp = () => {
    Alert.alert('Скоро доступно', 'Регистрация через Facebook будет добавлена позже');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.helloText}>Create Account</Text>
              <Text style={styles.welcomeText}>Join our cooking community</Text>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.hint}>Минимум 6 символов</Text>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Error Message */}
            {error && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={16} color="#FF6B6B" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Terms and Conditions */}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                <Ionicons
                  name={agreedToTerms ? 'checkbox' : 'checkbox-outline'}
                  size={20}
                  color={agreedToTerms ? '#2DBD8C' : '#999'}
                />
              </TouchableOpacity>
              <View style={styles.termsText}>
                <Text style={styles.agreeText}>
                  Я согласен с{' '}
                  <Text style={styles.link}>условиями использования</Text> и{' '}
                  <Text style={styles.link}>политикой конфиденциальности</Text>
                </Text>
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.signUpButton, (loading || isSigningUp) && styles.signUpButtonDisabled]}
              onPress={handleSignUp}
              disabled={loading || isSigningUp || !agreedToTerms}
            >
              {loading || isSigningUp ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <>
                  <Text style={styles.signUpButtonText}>Create Account</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>Or Sign Up With</Text>
              <View style={styles.line} />
            </View>

            {/* Social SignUp Buttons */}
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignUp}>
                <Ionicons name="logo-google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignUp}>
                <Ionicons name="logo-facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
            </View>

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signInLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  content: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  helloText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666666',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  hint: {
    fontSize: 12,
    color: '#999999',
    marginTop: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: '#333333',
  },
  eyeIcon: {
    padding: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE8E8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 8,
    flex: 1,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30,
    paddingHorizontal: 8,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  termsText: {
    flex: 1,
  },
  agreeText: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },
  link: {
    color: '#2DBD8C',
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: '#2DBD8C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  signUpButtonDisabled: {
    opacity: 0.6,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    color: '#999999',
    fontSize: 14,
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 40,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: '#666666',
    fontSize: 14,
  },
  signInLink: {
    color: '#2DBD8C',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignUp;
