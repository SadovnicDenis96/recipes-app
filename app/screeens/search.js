import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const recentSearches = [
    {
      id: '1',
      title: 'Traditional spare ribs baked',
      author: 'Chef John',
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
    },
    {
      id: '2',
      title: 'Lamb chops with fruity couscous and mint...',
      author: 'Spicy Nelly',
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
    },
    {
      id: '3',
      title: 'spice roasted chicken with flavored rice',
      author: 'Mark Kelvin',
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400',
    },
    {
      id: '4',
      title: 'Chinese style Egg fried rice with sliced pork...',
      author: 'Laura Wilson',
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
    },
    {
      id: '5',
      title: 'Lamb chops with fruity couscous and mint...',
      author: 'Spicy Nelly',
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
    },
    {
      id: '6',
      title: 'Traditional spare ribs baked',
      author: 'Chef John',
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
    },
  ];

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity style={styles.recipeCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.ratingBadge}>
        <Ionicons name="star" size={12} color="#FFA500" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.recipeAuthor}>By {item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search recipes</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipe"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Recent Search Section */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Recent Search</Text>
        <FlatList
          data={recentSearches}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.recipesGrid}
          columnWrapperStyle={styles.row}
        />
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  recipesGrid: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  recipeCard: {
    width: (width - 72) / 2,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  recipeImage: {
    width: '100%',
    height: 140,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  recipeInfo: {
    padding: 12,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  recipeAuthor: {
    fontSize: 12,
    color: '#999999',
  },
});

export default SearchScreen;