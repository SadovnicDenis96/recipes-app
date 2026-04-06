import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const FavoritesScreen = ({ navigation }) => {
  const { favorites, toggleFavorite } = useAuth();

  const renderFavoriteCard = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item)}
      >
        <Ionicons name="heart" size={20} color="#FF6B6B" />
      </TouchableOpacity>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle} numberOfLines={2}>
          {item.title}
        </Text>
        {item.author ? <Text style={styles.recipeAuthor}>By {item.author}</Text> : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={styles.placeholder} />
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite recipes yet.</Text>
          <Text style={styles.emptySubtext}>Tap the heart icon on a recipe to save it here.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  recipeCard: {
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: 180,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  recipeInfo: {
    padding: 16,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  recipeAuthor: {
    fontSize: 14,
    color: '#777777',
  },
});

export default FavoritesScreen;
