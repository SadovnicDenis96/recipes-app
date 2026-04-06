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
  const { user, logout, toggleFavorite, isFavorite } = useAuth();

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
      subtitle: 'Fresh Mediterranean recipe',
      category: 'Salad',
      rating: 4.5,
      time: '15 Mins',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
      description:
        'A bright and flavorful salad made with juicy tomatoes, crisp cucumbers, tangy feta, olives, and a lemon-oregano dressing.',
      ingredients: [
        '2 cups chopped tomatoes',
        '1 cucumber, sliced',
        '1/2 red onion, thinly sliced',
        '100g feta cheese',
        '10 Kalamata olives',
        '2 tbsp olive oil',
        '1 tbsp lemon juice',
        '1 tsp dried oregano',
      ],
      steps: [
        'Cut tomatoes, cucumber, and red onion into bite-size pieces.',
        'Combine vegetables in a large bowl and add olives and feta.',
        'Whisk olive oil, lemon juice, oregano, salt, and pepper.',
        'Pour dressing over salad and gently toss to coat.',
        'Serve immediately or chill for 10 minutes before serving.',
      ],
    },
    {
      id: '2',
      title: 'Crunchy Nut Coleslaw',
      subtitle: 'Creamy side dish',
      category: 'Salad',
      rating: 3.5,
      time: '10 Mins',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      description:
        'A creamy, crunchy coleslaw made with fresh cabbage, carrots, and a nutty dressing for a satisfying side dish.',
      ingredients: [
        '3 cups shredded cabbage',
        '1 carrot, grated',
        '1/4 cup chopped nuts',
        '3 tbsp mayonnaise',
        '1 tbsp apple cider vinegar',
        '1 tsp honey',
      ],
      steps: [
        'Mix cabbage, carrot, and nuts in a bowl.',
        'Whisk mayonnaise, vinegar, honey, salt, and pepper.',
        'Pour dressing over vegetables and toss well.',
        'Refrigerate for 10 minutes before serving.',
      ],
    },
  ];

  const newRecipes = [
    {
      id: '3',
      title: 'Steak with Tomato',
      subtitle: 'Juicy seared steak',
      category: 'Dinner',
      author: 'James Milner',
      time: '20 mins',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      description:
        'A quick steak dinner with roasted tomatoes, garlic, and herbs, perfect for a flavorful weeknight meal.',
      ingredients: [
        '2 sirloin steaks',
        '1 cup cherry tomatoes',
        '2 cloves garlic, minced',
        '1 tbsp olive oil',
        '1 tsp dried rosemary',
        'Salt and pepper',
      ],
      steps: [
        'Season steaks with salt, pepper, and rosemary.',
        'Heat oil in a pan over medium-high heat and sear steaks 3-4 minutes each side.',
        'Remove steaks and set aside to rest.',
        'Add garlic and tomatoes to the same pan, cook until tomatoes soften.',
        'Serve steaks topped with roasted tomatoes and garlic.',
      ],
    },
    {
      id: '4',
      title: 'Pilaf Sweet Rice',
      subtitle: 'Comforting rice dish',
      category: 'Dinner',
      author: 'Laura Smith',
      time: '35 mins',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      description:
        'A rich and aromatic rice pilaf made with spices, vegetables, and buttery rice for a warm, comforting meal.',
      ingredients: [
        '1 cup basmati rice',
        '1 small onion, chopped',
        '1 carrot, diced',
        '2 cups vegetable broth',
        '1 tbsp butter',
        '1 tsp cumin',
        'Salt to taste',
      ],
      steps: [
        'Rinse rice and set aside.',
        'Sauté onion and carrot in butter until soft.',
        'Add rice, cumin, and broth, then bring to a boil.',
        'Reduce heat, cover and simmer 15-20 minutes.',
        'Fluff rice with a fork and serve warm.',
      ],
    },
    {
      id: '5',
      title: 'Chocolate Cookies',
      subtitle: 'Sweet baked treats',
      category: 'Dessert',
      author: 'Mike Johnson',
      time: '45 mins',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=640&q=80',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      description:
        'Soft and chewy chocolate cookies with rich cocoa flavor and crisp edges, perfect for a cozy dessert.',
      ingredients: [
        '1 1/4 cups flour',
        '1/2 cup cocoa powder',
        '1/2 cup sugar',
        '1/2 cup brown sugar',
        '1/2 cup butter',
        '1 egg',
        '1 tsp vanilla extract',
      ],
      steps: [
        'Preheat oven to 180°C and line a baking sheet.',
        'Cream butter with sugars until smooth.',
        'Add egg and vanilla, then mix in dry ingredients.',
        'Fold in chocolate chips if desired.',
        'Spoon dough on sheet and bake 10-12 minutes.',
      ],
    },
  ];

  const renderFeaturedCard = ({ item }) => (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item)}
      >
        <Ionicons
          name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
          size={18}
          color={isFavorite(item.id) ? '#FF6B6B' : '#333333'}
        />
      </TouchableOpacity>
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
    <TouchableOpacity
      style={styles.newRecipeCard}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image source={{ uri: item.image }} style={styles.newRecipeImage} resizeMode="cover" />
      <TouchableOpacity
        style={styles.favoriteButtonSmall}
        onPress={() => toggleFavorite(item)}
      >
        <Ionicons
          name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
          size={18}
          color={isFavorite(item.id) ? '#FF6B6B' : '#333333'}
        />
      </TouchableOpacity>
      <View style={styles.newRecipeContent}>
        <Text style={styles.newRecipeTitle} numberOfLines={2}>
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
        <View style={styles.newRecipeMetaRow}>
          <View style={styles.newRecipeAuthorRow}>
            <Image source={{ uri: item.authorImage }} style={styles.authorImage} />
            <Text style={styles.authorName} numberOfLines={1}>
              By {item.author}
            </Text>
          </View>
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

  <TouchableOpacity
    style={styles.filterButton}
    onPress={() => navigation.navigate('Filter')}
  >
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
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Favorites')}
        >
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
            <Text style={styles.modalMessage}>Do you want to log out?</Text>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setLogoutVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
  },
  newRecipeImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
  },
  newRecipeContent: {
    flex: 1,
  },
  newRecipeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  newRecipeRating: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  newRecipeMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  newRecipeAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
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
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  favoriteButtonSmall: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2DBD8C',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#2DBD8C',
    fontWeight: '700',
  },
  logoutButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#2DBD8C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default Home;