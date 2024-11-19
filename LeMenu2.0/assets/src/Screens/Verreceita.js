import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, Animated } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import YoutubePlayer, {YoutubeIframeRef} from "react-native-youtube-iframe";

const rota = "http://10.111.9.84:3000";

// Obtendo dimensões da tela
const { width } = Dimensions.get("screen");

const Verreceita = ({ route, navigation }) => {

  const playerRef = useRef();
  const { recipe, userId } = route.params || {}; // Desestruturando diretamente userId

  console.log(`ID do usuário: ${userId}`);

  // Array de cores para o fundo
  const colors = ["#586d5e", "#8eb59a", "#c5edc8"];

  // Estado para controlar a cor atual do fundo
  const [currentColor, setCurrentColor] = useState(colors[0]);

  // Estado para animação de curtida
  const [likeAnimation] = useState(new Animated.Value(1));

  // Estado para controlar a curtida da receita
  const [isLiked, setIsLiked] = useState(false); // Inicia como não curtido

  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    // Reagindo a mudanças na receita
    console.log(`Receita atual: ${recipe?.nome}`);
    console.log(`ID do usuário atualizado: ${userId}`);
  }, [recipe, userId]); // Adicionando userId ao array de dependências

  const handleLikePress = () => {
    Animated.sequence([
      Animated.timing(likeAnimation, {
        toValue: 1.5, // Aumentar o tamanho
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnimation, {
        toValue: 1, // Retornar ao tamanho original
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Alternar o estado de curtida
    setIsLiked(prev => !prev);

    const addToFavorites = async (recipeId) => {
      try {
        const response = await fetch(`${rota}/addFavorite`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId, // Substitua com o ID do usuário logado
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

    // Chame essa função passando o ID da receita atual
    addToFavorites(recipe.id);
  };

  if (!recipe) {
    return (
      <View style={styles.notFoundContainer}>
        <MaterialCommunityIcons name="emoticon-sad-outline" size={80} color="#fff9ee" />
        <Text style={styles.notFoundText}>Receita não encontrada!</Text>
        <Text style={styles.notFoundSubText}>
          Não conseguimos encontrar a receita que você está procurando.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Inicial')} style={styles.goBackButton}>
          <Text style={styles.goBackButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Validando se 'ingredientes' existe e é uma string válida
  const ingredientesList = recipe.ingredientes ? recipe.ingredientes.split(',').map(item => item.trim()) : [];

  // Validando se 'preparo' existe e é uma string válida
  const preparoList = recipe.preparo ? recipe.preparo.split(',').map(item => item.trim()) : [];

  const handleCardPress = () => {
    setPlayVideo(true); // Define playVideo como true ao clicar no card
  };

  return (
    <View style={{ backgroundColor: currentColor, flex: 1 }}>
      <SafeAreaView style={{ flexDirection: "row", marginTop: 25, marginHorizontal: 15, justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Inicial")} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={30} color="#000" />
        </TouchableOpacity>
        <Animated.View style={{ transform: [{ scale: likeAnimation }] }}>
          <TouchableOpacity onPress={handleLikePress}>
            <FontAwesome name={isLiked ? "heart" : "heart-o"} size={28} color={isLiked ? "red" : "black"} />
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ alignItems: "center", paddingHorizontal: 16 }}>
        <View
          style={{
            backgroundColor: "#fff",
            flex: 1,
            marginTop: 200,
            borderTopLeftRadius: 56,
            borderTopRightRadius: 56,
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 10,
            width: width - 5, // Ajustando a largura para o tamanho da tela
          }}
        >
          <View
            style={{
              height: 300,
              width: 300,
              position: "absolute",
              top: -150,
            }}
          >
            <Image
              source={{ uri: recipe.url }}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </View>

          <Text style={{ marginTop: 140, fontSize: 28, fontWeight: "bold", textTransform: "uppercase" }}>
            {recipe.nome.toUpperCase()}
          </Text>


          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 16 }}>
            <View style={styles.infoBoxRed}>
              <Text style={styles.icon}>⏰</Text>
              <Text style={styles.infoText}>{recipe.tempo} Min</Text>
            </View>

            <View style={styles.infoBoxOrange}>
              <Text style={styles.icon}>🔥</Text>
              <Text style={styles.infoText}>{recipe.caloria} Kcal</Text>
            </View>

            <View style={styles.infoBoxBlue}>
              <Text style={styles.icon}>🍽️</Text>
              <Text style={styles.infoText}>{recipe.porcoes} pessoas</Text>
            </View>
          </View>

          <View style={{ alignSelf: "flex-start", marginVertical: 22, paddingHorizontal: 16 }}>
            <Text style={{ fontSize: 22, fontWeight: "600" }}>Ingredientes</Text>
            {ingredientesList.map((ingrediente, index) => (
              <View key={index} style={styles.ingredienteContainer}>
                <View style={styles.bolinha} />
                <Text style={styles.ingredienteText}>{ingrediente}</Text>
              </View>
            ))}
          </View>

          <View style={{ alignSelf: "flex-start", marginVertical: 22, paddingHorizontal: 16 }}>
            <Text style={{ fontSize: 22, fontWeight: "600" }}>Modo de Preparo</Text>
            {preparoList.map((preparo, index) => (
              <View key={index} style={styles.preparoContainer}>
                <Text style={styles.ingredienteText}>{preparo}</Text>
              </View>
            ))}
          </View>

          <View style={{ width: '100%', alignItems: 'center'  }}>
            <Text style={{ fontSize: 22, fontWeight: "600" }}>Tutorial</Text>
            <YoutubePlayer
              ref={playerRef}
              height={390}
              width={390}
              videoId={'ut_wROjLrig'}
            />
          </View>


        </View>
      </ScrollView>
    </View>
  );
};


export default Verreceita;

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#917e63', // Cor de fundo atualizada
    padding: 20,
  },
  notFoundText: {
    fontSize: 28,
    color: '#fff9ee', // Cor do texto atualizada
    fontWeight: 'bold',
    marginTop: 20,
  },
  notFoundSubText: {
    fontSize: 18,
    color: '#fff9ee', // Cor do texto atualizada
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  goBackButton: {
    marginTop: 30,
    backgroundColor: '#fff9ee', // Cor do botão atualizada
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  goBackButtonText: {
    color: '#917e63', // Cor do texto do botão atualizada
    fontSize: 18,
  },
  backButton: {
    // Adicione estilos se necessário
  },
  infoBoxRed: {
    backgroundColor: "rgba(255,0,0,0.5)", // Ajuste a cor conforme necessário
    paddingHorizontal: 16,
    paddingVertical: 26,
    borderRadius: 8,
    alignItems: "center",
  },
  infoBoxOrange: {
    backgroundColor: "rgba(255,165,0,0.5)", // Ajuste a cor conforme necessário
    paddingHorizontal: 16,
    paddingVertical: 26,
    borderRadius: 8,
    alignItems: "center",
  },
  infoBoxBlue: {
    backgroundColor: "rgba(135,206,235,0.5)", // Ajuste a cor conforme necessário
    paddingHorizontal: 16,
    paddingVertical: 26,
    borderRadius: 8,
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
  },
  infoText: {
    fontSize: 20,
    fontWeight: "400",
  },
  ingredienteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  preparoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bolinha: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red', // Cor da bolinha antes dos ingredientes
    marginRight: 8,
  },
  ingredienteText: {
    fontSize: 18,
  },
});