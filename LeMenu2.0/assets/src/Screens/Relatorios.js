import { WebView } from 'react-native-webview';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Relatorios = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Perfil")} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={30} color="#586d5e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Relatórios</Text>
      </View>
      <WebView
      // style={styles.container}
      source={{ uri: 'https://app.powerbi.com/view?r=eyJrIjoiMjdlZjNlZTktMTc3Ni00ZDU4LWFmZGQtYzU2YTRkMWViNWE3IiwidCI6ImIxMDUxYzRiLTNiOTQtNDFhYi05NDQxLWU3M2E3MjM0MmZkZCJ9' }}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebe1cf',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6f4e37',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#6f4e37',
  },
});

export default Relatorios;
