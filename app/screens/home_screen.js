import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert, Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [logoutVisible, setLogoutVisible] = useState(false);
  const { user, logout } = useAuth();

  const categories = ['All', 'Indian', 'Italian', 'Asian', 'Chinese', 'Mexican'];

  const handleLogout = async () => {
    setLogoutVisible(false);
    const result = await logout();
    if (result.success) {
      Alert.alert('До свидания!', 'Вы вышли из аккаунта');
      // Navigation will automatically switch to Welcome screen
      // when user becomes null (handled by AppNavigation)
    } else {
      Alert.alert('Ошибка', result.error || 'Не удалось выйти');
    }
  };

  const featuredRecipes = [
    {
      id: '1',
      title: 'Classic Greek Salad',
      rating: 4.5,
      time: '15 Mins',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
    },
    {
      id: '2',
      title: 'Crunchy Nut Coleslaw',
      rating: 3.5,
      time: '10 Mins',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    },
  ];

  const newRecipes = [
    {
      id: '3',
      title: 'Steak with tomato...',
      author: 'James Milner',
      time: '20 mins',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    },
    {
      id: '4',
      title: 'Pilaf sweet rice',
      author: 'Laura Smith',
      time: '35 mins',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    },
    {
      id: '5',
      title: 'Chicken Curry',
      author: 'Mike Johnson',
      time: '45 mins',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1585937421612-70e008356f67?w=400',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    },
  ];

  const renderFeaturedCard = ({ item }) => (
    <TouchableOpacity style={styles.featuredCard}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={14} color="#FFA500" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <View style={styles.featuredInfo}>
        <Text style={styles.featuredTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.featuredMeta}>
          <Ionicons name="time-outline" size={14} color="#999" />
          <Text style={styles.featuredTime}>{item.time}</Text>
          <Ionicons name="bookmark-outline" size={18} color="#999" style={styles.bookmarkIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderNewRecipeCard = ({ item }) => (
    <TouchableOpacity style={styles.newRecipeCard}>
      <Image source={{ uri: item.image }} style={styles.newRecipeImage} />
      <View style={styles.newRecipeContent}>
        <Text style={styles.newRecipeTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.newRecipeRating}>
          {[...Array(5)].map((_, index) => (
            <Ionicons
              key={index}
              name={index < Math.floor(item.rating) ? 'star' : 'star-outline'}
              size={12}
              color="#FFA500"
            />
          ))}
        </View>
        <View style={styles.newRecipeMeta}>
          <Image source={{ uri: item.authorImage }} style={styles.authorImage} />
          <Text style={styles.authorName}>By {item.author}</Text>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={12} color="#999" />
            <Text style={styles.newRecipeTime}>{item.time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
{/* Header */}
<View style={styles.header}>
  <View>
    <Text style={styles.greeting}>Hello {user?.displayName || 'Chef'}</Text>
    <Text style={styles.subGreeting}>What are you cooking today?</Text>
  </View>
<TouchableOpacity
  style={styles.avatarButton}
  onPress={() => setLogoutVisible(true)}
>
  <Image
    source={{
      uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    }}
    style={styles.avatar}
  />
</TouchableOpacity>
</View>

{/* Search Bar */}
<View style={styles.searchContainer}>
  <TouchableOpacity
    style={styles.searchBar}
    onPress={() => navigation.navigate('Search')}
    activeOpacity={0.7}
  >
    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />

    <TextInput
      style={styles.searchInput}
      placeholder="Search recipe"
      placeholderTextColor="#999"
      editable={false}
    />
  </TouchableOpacity>

  <TouchableOpacity style={styles.filterButton}>
    <Ionicons name="options" size={20} color="white" />
  </TouchableOpacity>
</View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Recipes */}
        <View style={styles.section}>
          <FlatList
            data={featuredRecipes}
            renderItem={renderFeaturedCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* New Recipes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Recipes</Text>
          <FlatList
            data={newRecipes}
            renderItem={renderNewRecipeCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newRecipesList}
          />
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={24} color="#2DBD8C" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="bookmark-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="notifications-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person-outline" size={24} color="#999" />
        </TouchableOpacity>
      </View>
      <Modal
  transparent={true}
  visible={logoutVisible}
  animationType="fade"
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalBox}>

      <Text style={styles.modalTitle}>Account</Text>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setLogoutVisible(false)}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  subGreeting: {
    fontSize: 14,
    color: '#999999',
    marginTop: 4,
  },
  avatarButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFD700',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  filterButton: {
    width: 52,
    height: 52,
    backgroundColor: '#2DBD8C',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#2DBD8C',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999999',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  featuredList: {
    paddingRight: 24,
  },
  featuredCard: {
    width: width * 0.45,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
  },
  featuredImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  featuredInfo: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredTime: {
    fontSize: 12,
    color: '#999999',
  },
  bookmarkIcon: {
    marginLeft: 'auto',
  },
  newRecipesList: {
    paddingRight: 24,
  },
  newRecipeCard: {
    width: width * 0.65,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    alignItems: 'center',
  },
  newRecipeImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  newRecipeContent: {
    flex: 1,
    marginLeft: 12,
  },
  newRecipeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  newRecipeRating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  newRecipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorName: {
    fontSize: 12,
    color: '#999999',
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newRecipeTime: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    padding: 8,
  },
  addButton: {
    width: 56,
    height: 56,
    backgroundColor: '#2DBD8C',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default Home;