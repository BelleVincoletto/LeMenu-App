import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import Fuse from 'fuse.js'; // Importando Fuse.js

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const rota = "http://10.111.9.84:3000";

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

const addToFavorites = async (recipeId) => {
  try {
    const response = await fetch(`${rota}/addFavorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: '1', // Substitua com o ID do usuário logado
        recipeId: recipeId,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar receita aos favoritos');
    }

    console.log('Receita adicionada aos favoritos com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar receita aos favoritos:', error);
  }
};



// Função que retorna o Card de cada receita com os ingredientes faltantes
const Card = ({ recipe, navigation, searchQuery, userId }) => (
  
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={() => navigation.navigate('receita', { recipe, userId })}
  >
    <View style={styles.card}>
      <View style={{ alignItems: 'center', top: -40 }}>
        <Image source={{ uri: recipe.url }} style={styles.cardImage} />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{recipe.nome}</Text>
        <Text style={styles.cardSubTitle}>{recipe.sabor_tipo}</Text>

        {/* Verifica se a pesquisa foi feita e não é pelo nome da receita */}
        {searchQuery !== '' && !recipe.matchesName && (
          <>
            {recipe.missingIngredients > 0 ? (
              <Text style={styles.missingIngredients}>
                {recipe.missingIngredients} ingredientes faltando
              </Text>
            ) : (
              <View style={styles.allIngredientsPresent}>
                <Text style={styles.allIngredientsText}>Receita completa! </Text>
                <Ionicons name="checkmark-circle" size={15} color="white" />
              </View>
            )}
          </>
        )}
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.cardCalories}>{recipe.caloria} Kcal</Text>
        <View style={styles.addToCartBtn}>
          <Ionicons name="add" size={14} color="#FFF" />
        </View>
      </View>
    </View>
  </TouchableOpacity>
);


const cleanIngredient = (ingredient) => {
  // Remove os textos entre parênteses usando uma expressão regular
  return ingredient.replace(/\([^)]*\)/g, '').trim();
};

const Inicial = ({ route, navigation }) => {
  const { user = 'Visitante' } = route.params || {};
  const { userId } = route.params;

  const [usuario_id, setUsuario_id] = useState(userId);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const onChangeSearch = (query) => setSearchQuery(query);

 // Lógica de busca aprimorada
const filteredRecipes = recipes
.map((recipe) => {
  // Limpa cada ingrediente da receita removendo textos entre parênteses
  const recipeIngredients = recipe.ingredientes
    .toLowerCase()
    .split(',')
    .map((ing) => cleanIngredient(ing.trim()));

  const searchWords = searchQuery
    .toLowerCase()
    .split(/\s*,\s*|\s+/) // Divide por vírgulas ou espaços
    .filter((word) => word.length > 0);

  // Verificação flexível para ingredientes
  const matchingIngredientsCount = searchWords.reduce((count, word) => {
    return recipeIngredients.some((ingredient) =>
      ingredient.includes(word)
    ) ? count + 1 : count;
  }, 0);

  // Verificação flexível para nome da receita
  const matchesName = searchQuery !== '' && recipe.nome.toLowerCase().includes(searchQuery.toLowerCase());

  const missingIngredients = recipeIngredients.length - matchingIngredientsCount;

  return {
    ...recipe,
    matchingIngredientsCount,
    missingIngredients, // Ingredientes faltantes calculados
    matchesName,
  };
})
.filter((recipe) =>
  (searchQuery === '' || recipe.matchingIngredientsCount > 0 || recipe.matchesName) &&
  (selectedCategory === 'Todos' || recipe.sabor_tipo.toLowerCase() === selectedCategory.toLowerCase())
)
.sort((a, b) => b.matchingIngredientsCount - a.matchingIngredientsCount);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${rota}/receitas`);
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      const data = await response.json();
      // console.log(data)

      
      

      setRecipes(data);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    }
  };

  useEffect(() => {
    setIsModalVisible(true);
    fetchRecipes();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalVisible(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchRecipes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Seja bem-vindo(a), {user}!</Text>
            <Image
              source={require('../../imgs/bem_vindo_LM.png')}
              style={styles.welcomeImage}
            />
          </View>
        </View>
      </Modal>

      <Searchbar
        placeholder="Pesquisar receitas"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />

      <FlatList
        data={filteredRecipes}
        renderItem={({ item }) => <Card recipe={item} navigation={navigation} searchQuery={searchQuery} onAddToFavorites={addToFavorites} userId={userId} />}
        keyExtractor={(item) => item.id_receita.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.recipeList}
        ListHeaderComponent={
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
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#EBE1CF',
  },
  card: {
    height: 260,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: '#FFF',
  },
  cardImage: {
    height: 120,
    width: 120,
    borderRadius: 40,
  },
  cardInfo: {
    marginHorizontal: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubTitle: {
    fontSize: 14,
    color: '#A9A9A9',
    marginTop: 2,
  },
  missingIngredients: {
    fontSize: 14,
    color: '#FF6347',
    marginTop: 5,
  },
  allIngredientsPresent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8eb59a',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginTop: 5,
  },
  allIngredientsText: {
    fontSize: 12,
    color: 'white',
    marginLeft: 5,
  },
  cardFooter: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardCalories: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: '#8eb59a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
  }, categoryContainer: {
    marginBottom: 10,
  },
  categoryButton: {
    marginRight: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: '#FFF',
  },
  selectedCategory: {
    backgroundColor: '#8eb59a',
  },
  categoryText: {
    fontSize: 14,
    // fontWeight: 'bold',
    // color: '#8eb59a',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  welcomeImage: {
    width: 100,
    height: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  recipeList: {
    paddingBottom: 10,
  },
});

export default Inicial;  