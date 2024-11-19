import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  Image, 
  Dimensions, 
  Animated 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const receitasFavoritas = [
  { id: '1', nome: 'Cappuccino', sabor_tipo: 'Bebida', imagem: 'https://via.placeholder.com/150', calorias: 160 },
  { id: '2', nome: 'Latte', sabor_tipo: 'Bebida', imagem: 'https://via.placeholder.com/150', calorias: 150 },
  { id: '3', nome: 'Espresso', sabor_tipo: 'Bebida', imagem: 'https://via.placeholder.com/150', calorias: 50 },
];

const categories = [
  { id: '1', name: 'Todos' },
  { id: '2', name: 'Doce' },
  { id: '3', name: 'Frutas' },
  { id: '4', name: 'Salgado' },
  { id: '5', name: 'Fast Food' },
  { id: '6', name: 'Bebida' },
  { id: '7', name: 'Cremes' },
  { id: '8', name: 'Molhos' },
];

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;
const CARD_SPACING = 15;
const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;

const FavReceitas = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState(receitasFavoritas);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredRecipes = favorites.filter(recipe =>
    selectedCategory === 'Todos' || recipe.sabor_tipo.toLowerCase() === selectedCategory.toLowerCase()
  );

  const handleAddToFavorites = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    );
    console.log(`Receita ${id} removida dos favoritos`);
  };

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * SNAP_INTERVAL,
      index * SNAP_INTERVAL,
      (index + 1) * SNAP_INTERVAL,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Image source={{ uri: item.imagem }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <Text style={styles.cardSubTitle}>{item.sabor_tipo}</Text>
        <Text style={styles.cardCalories}>{item.calorias} ml</Text>
        <TouchableOpacity 
          style={styles.addToCartBtn} 
          onPress={() => handleAddToFavorites(item.id)}
        >
          <Ionicons name="heart" size={18} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Inicial')} 
        style={styles.backButton}
      >
        <MaterialCommunityIcons name="arrow-left" size={30}  />
      </TouchableOpacity>

      <Text style={styles.title}>Receitas Favoritas</Text>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item.name && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(item.name)}
          >
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.categoryContainer}
      />

      <Animated.FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: (width - CARD_WIDTH) / 2,
        }}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBE1CF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 5,
    borderRadius: 50,
  },
  title: {
    fontSize: 26,
    marginBottom: 15,
    color: '#917E63',
    textAlign: 'center',
  },
  categoryContainer: {
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 45,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#8eb59a',
  },
  categoryText: {
    fontSize: 16,
    color: '#000',
  },
  card: {
    width: CARD_WIDTH,
    height: height * 0.5,
    marginHorizontal: CARD_SPACING / 2,
    backgroundColor: '#FFF9EE',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 60
  },
  cardImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardSubTitle: {
    fontSize: 16,
    color: '#6A6A6A',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardCalories: {
    fontSize: 16,
    color: '#6A6A6A',
  },
  addToCartBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
});

export default FavReceitas;
