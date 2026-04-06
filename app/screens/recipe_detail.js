import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecipeDetail = ({ navigation, route }) => {
  const recipe = route.params?.recipe;

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recipe</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Recipe not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{recipe.title}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />

        <View style={styles.infoRow}>
          <View>
            <Text style={styles.recipeCategory}>{recipe.category || 'Featured'}</Text>
            <Text style={styles.recipeSubtitle}>{recipe.subtitle || 'Easy and delicious'}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFA500" />
            <Text style={styles.ratingText}>{recipe.rating}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{recipe.description}</Text>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients?.map((ingredient, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listBullet}>•</Text>
            <Text style={styles.listText}>{ingredient}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Preparation</Text>
        {recipe.steps?.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
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
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 24,
  },
  recipeImage: {
    width: '100%',
    height: 240,
    borderRadius: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  recipeCategory: {
    fontSize: 14,
    color: '#2DBD8C',
    fontWeight: '700',
    marginBottom: 6,
  },
  recipeSubtitle: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  listBullet: {
    fontSize: 16,
    marginRight: 10,
    color: '#2DBD8C',
    lineHeight: 20,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: '#444444',
    lineHeight: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2DBD8C',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '700',
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#444444',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
  },
});

export default RecipeDetail;
