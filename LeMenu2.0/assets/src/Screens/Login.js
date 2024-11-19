import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
// const rota = "http://192.168.12.137:3000";
const rota = "http://10.111.9.84:3000";

const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('belle@gmail.com');
    const [senha, setSenha] = useState('#Belle_2006');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    

    const verificarLogin = async () => {
        if (!email || !senha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch(`${rota}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json(); // Verifica a resposta do servidor
            console.log('Resposta do servidor:', data);

            if (!response.ok) {
                throw new Error(data.msg || 'Credenciais inválidas');
            }

            

            console.log(`Dados do usuário: ${data.nome}`);

            // Armazenar o ID e o nome do usuário no AsyncStorage
            await AsyncStorage.setItem('userId', data.id.toString());
            await AsyncStorage.setItem('userName', data.nome);

            // Navegação após login bem-sucedido
            navigation.navigate('Inicial', { user: data.nome, userId:data.id });
        } catch (error) {
            console.log('Erro de login:', error.message); // Exibe o erro no console para debugar
            Alert.alert('Erro de Login', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Avatar.Image size={170} source={require('../../imgs/logo.png')} />
            <Text style={styles.title}>LOGIN</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Senha"
                    onChangeText={setSenha}
                    value={senha}
                    secureTextEntry={!mostrarSenha}
                />
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.iconContainer}>
                    <Icon
                        name={mostrarSenha ? "visibility" : "visibility-off"}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={verificarLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
                <Text onPress={() => navigation.navigate('cadastrar')} style={styles.linkText}>Não tem cadastro? Clique aqui.</Text>
            </Text>
            <Text style={styles.text}>
                <Text onPress={() => navigation.navigate('EsqueçeuSenha')} style={styles.linkText2}>Esqueçeu sua Senha.</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBE1CF',
    },
    title: {
        fontSize: 30,
        marginBottom: 25,
        marginTop: 15,
        color: "#917E63",
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#FFF9EE',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#FFF9EE',
        paddingHorizontal: 10,
        height: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    passwordInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#586D5E',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '80%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginTop: 5,
    },
    buttonText: {
        color: '#FFF9EE',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        width: '80%',
        lineHeight: 22,
        color: '#586D5E',
    },
    linkText: {
        color: '#917E63',
        fontWeight: 'bold',
    },
});

export default Login;
