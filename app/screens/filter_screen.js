import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FilterScreen = ({ navigation, route }) => {
  const [selectedTime, setSelectedTime] = useState('Newest');
  const [selectedRate, setSelectedRate] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState('Local Dish');

  const timeOptions = ['All', 'Newest', 'Oldest', 'Popularity'];
  const rateOptions = [5, 4, 3, 2, 1];
  const categoryOptions = [
    'All',
    'Cereal',
    'Vegetables',
    'Dinner',
    'Chinese',
    'Local Dish',
    'Fruit',
    'Breakfast',
    'Spanish',
    'Lunch',
  ];

  const handleApplyFilter = () => {
    // Trimite filtrele înapoi la ecranul anterior
    if (route.params?.onApplyFilter) {
      route.params.onApplyFilter({
        time: selectedTime,
        rate: selectedRate,
        category: selectedCategory,
      });
    }
    navigation.goBack();
  };

  const renderStarRating = (rating) => {
    return (
      <View style={styles.starContainer}>
        {[...Array(rating)].map((_, index) => (
          <Ionicons key={index} name="star" size={16} color="#2DBD8C" />
        ))}
      </View>
    );
  };

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
        <Text style={styles.headerTitle}>Filter Search</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Time Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time</Text>
          <View style={styles.optionsRow}>
            {timeOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedTime === option && styles.optionButtonActive,
                ]}
                onPress={() => setSelectedTime(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedTime === option && styles.optionTextActive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rate Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rate</Text>
          <View style={styles.rateRow}>
            {rateOptions.map((rating) => (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.rateButton,
                  selectedRate === rating && styles.rateButtonActive,
                ]}
                onPress={() => setSelectedRate(rating)}
              >
                <View style={styles.rateContent}>
                  <Text
                    style={[
                      styles.rateNumber,
                      selectedRate === rating && styles.rateNumberActive,
                    ]}
                  >
                    {rating}
                  </Text>
                  <Ionicons
                    name="star"
                    size={16}
                    color={selectedRate === rating ? '#FFFFFF' : '#2DBD8C'}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Category Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoryGrid}>
            {categoryOptions.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category &&
                    styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category &&
                      styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
                {category === 'Dinner' && (
                  <Ionicons
                    name="star"
                    size={12}
                    color={
                      selectedCategory === 'Dinner' ? '#FFFFFF' : '#2DBD8C'
                    }
                    style={styles.categoryStar}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Apply Filter Button */}
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApplyFilter}
        >
          <Text style={styles.applyButtonText}>Filter</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
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
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2DBD8C',
    backgroundColor: '#FFFFFF',
  },
  optionButtonActive: {
    backgroundColor: '#2DBD8C',
  },
  optionText: {
    fontSize: 14,
    color: '#2DBD8C',
    fontWeight: '600',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  rateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  rateButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2DBD8C',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateButtonActive: {
    backgroundColor: '#2DBD8C',
  },
  rateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rateNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2DBD8C',
  },
  rateNumberActive: {
    color: '#FFFFFF',
  },
  starContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2DBD8C',
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: '#2DBD8C',
  },
  categoryText: {
    fontSize: 14,
    color: '#2DBD8C',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  categoryStar: {
    marginLeft: 2,
  },
  applyButton: {
    backgroundColor: '#2DBD8C',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FilterScreen;