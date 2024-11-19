import { WebView } from 'react-native-webview';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Importe useFocusEffect
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importe as fotos de perfil
import ProfilePic1 from '../../../assets/perfil/1.png';
import ProfilePic2 from '../../../assets/perfil/2.png';
import ProfilePic3 from '../../../assets/perfil/3.png';
import ProfilePic4 from '../../../assets/perfil/4.png';
import ProfilePic5 from '../../../assets/perfil/5.png';
import ProfilePic6 from '../../../assets/perfil/6.png';
import ProfilePic7 from '../../../assets/perfil/7.png';
import ProfilePic8 from '../../../assets/perfil/8.png';
import ProfilePic9 from '../../../assets/perfil/9.png';
import ProfilePic10 from '../../../assets/perfil/10.png';
import ProfilePic11 from '../../../assets/perfil/11.png';
import ProfilePic12 from '../../../assets/perfil/12.png';
import ProfilePic13 from '../../../assets/perfil/13.png';
import ProfilePic14 from '../../../assets/perfil/14.png';
import ProfilePic15 from '../../../assets/perfil/15.png';
import ProfilePic16 from '../../../assets/perfil/16.png';
import ProfilePic17 from '../../../assets/perfil/17.png';
import ProfilePic18 from '../../../assets/perfil/18.png';
import ProfilePic19 from '../../../assets/perfil/19.png';
import ProfilePic20 from '../../../assets/perfil/20.png';
import ProfilePic21 from '../../../assets/perfil/21.png';
import ProfilePic22 from '../../../assets/perfil/22.png';


const Perfil = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(ProfilePic1); // Defina um estado para a foto de perfil

  // Mapeamento das imagens
  const pictureMap = {
  '1': ProfilePic1,
'2': ProfilePic2,
'3': ProfilePic3,
'4': ProfilePic4,
'5': ProfilePic5,
'6': ProfilePic6,
'7': ProfilePic7,
'8': ProfilePic8,
'9': ProfilePic9,
'10': ProfilePic10,
'11': ProfilePic11,
'12': ProfilePic12,
'13': ProfilePic13,
'14': ProfilePic14,
'15': ProfilePic15,
'16': ProfilePic16,
'17': ProfilePic17,
'18': ProfilePic18,
'19': ProfilePic19,
'20': ProfilePic20,
'21': ProfilePic21,
'22': ProfilePic22,

  
};


  // Função para buscar os dados do usuário no AsyncStorage
  const getUserInfo = async () => {
    try {
      const userName = await AsyncStorage.getItem('userName');
      const userProfilePic = await AsyncStorage.getItem('profilePicture');

      if (userName) setName(userName);
      if (userProfilePic) setProfilePicture(pictureMap[userProfilePic] || ProfilePic1);
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário:", error);
    }
  };

  // useFocusEffect para garantir que os dados sejam atualizados ao voltar para a tela
  useFocusEffect(
    React.useCallback(() => {
      getUserInfo();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Inicial')} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={30} color="#586d5e" />
        </TouchableOpacity>

        <Image
          source={profilePicture} // Usa o estado da imagem de perfil
          style={styles.profilePicture}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {name}
          </Text>
          <Text style={styles.role}>Meu perfil</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="#586d5e" />
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('EditarPerfil')}
        >
          {/* <MaterialCommunityIcons name="account-circle" size={24} color="#586d5e" /> */}
          <MaterialCommunityIcons name="tools" size={24} color="#586d5e" />
          <Text style={styles.menuItemText}> Alterar meus Dados </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Relatorios')}
        >
          {/* <MaterialCommunityIcons name="account-circle" size={24} color="#586d5e" /> */}
          <MaterialCommunityIcons name="chart-line" size={24} color="#586d5e" />
          <Text style={styles.menuItemText}> Ver relatórios </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('favReceitas')}
        >
          <MaterialCommunityIcons name="heart" size={24} color="#586d5e" />
          <Text style={styles.menuItemText}>Receitas Favoritas</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="tools" size={24} color="#586d5e" />
          <Text style={styles.menuItemText}>Alterar Meus Dados</Text>
        </TouchableOpacity> */}
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebe1cf', // Cor de fundo do container
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ebe1cf', // Cor de fundo do cabeçalho
  },
  backButton: {
    marginRight: 15,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 10,
  },
  userInfo: {
    marginLeft: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#586d5e', // Cor do nome do usuário
  },
  role: {
    fontSize: 14,
    color: '#586d5e', // Cor do texto "Meu perfil"
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ebe1cf', // Cor da linha divisória entre itens
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#586d5e', // Cor do texto dos itens do menu
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginLeft: 'auto',
  },
  logoutButtonText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#586d5e', // Cor do texto de logout
  },
});

export default Perfil;
