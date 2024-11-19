import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

// const rota = "http://192.168.12.137:3000";
const rota = "http://10.111.9.84:3000";

const Cadastro = () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [dataNascimento, setDataNascimento] = useState('');
    const [emailRecuperacao, setEmailRecuperacao] = useState('');
    const [telefone, setTelefone] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            setNome('');
            setEmail('');
            setCpf('');
            setPassword('');
            setDataNascimento('');
            setEmailRecuperacao('');
            setTelefone('');
        }, [])
    );

    const handleLogin = async () => {
        if (!validateName(nome)) {
            Alert.alert('Erro', 'O nome não deve conter caracteres inválidos.');
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert('Erro', 'O email inserido não é válido.');
            return;
        }
        if (!validateCPF(cpf)) {
            Alert.alert('Erro', 'O CPF inserido não é válido.');
            return;
        }
        if (!validatePassword(password)) {
            Alert.alert('Erro', 'A senha deve ter no mínimo 8 caracteres e conter: letras, números e caracteres especiais');
            return;
        }
        if (!validatePhoneNumber(telefone)) {
            Alert.alert('Erro', 'O número de telefone não é válido.');
            return;
        }
        if (!validateDataNascimento(dataNascimento)) {
            Alert.alert('Erro', 'Por favor, preencha a data de nascimento corretamente.');
            return;
        }

        try {
            const response = await fetch(`${rota}/cadastrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, cpf, password, dataNascimento, emailRecuperacao, telefone }),
            });

            if (!response.ok) {
                throw new Error('Erro no cadastro. Verifique os dados inseridos.');
            }

            navigation.navigate('Login');
        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
        }
    };

    // Validation Functions
    const validateName = (name) => {
        const nameRegex = /^[\p{L}Çç~^´`\s]{1,150}$/u;
        return nameRegex.test(name);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateCPF = (cpf) => {
        return cpf.length === 14; // Verifica o comprimento do CPF formatado
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_]).{8,}$/;
        return passwordRegex.test(password);
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^\d{2}\s\d{5}-\d{4}$/;
        return phoneRegex.test(phone);
    };

    const validateDataNascimento = (data) => {
        // Verifica se a data está no formato dd/mm/yyyy
        const parts = data.split('/');
        if (parts.length !== 3) return false;

        const [day, month, year] = parts;
        return day.length === 2 && month.length === 2 && year.length === 4;
    };

    const formatPhoneNumber = (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return `${match[1]} ${match[2]}-${match[3]}`;
        }
        return phone;
    };

    const formatarDataNascimento = (data) => {
        const cleaned = data.replace(/\D/g, '');
        if (cleaned.length <= 2) {
            return cleaned;
        } else if (cleaned.length <= 4) {
            return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        } else {
            return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
        }
    };

    const formatarCPF = (cpf) => {
        const cleaned = cpf.replace(/\D/g, '');
        const match = cleaned.match(/(\d{3})(\d{3})(\d{3})(\d{2})/);
        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
        }
        return cpf;
    };

    const handleNomeChange = (text) => {
        const filteredText = text.replace(/[^A-Za-zÀ-ÿÇç~^´`\s]/g, '');
        setNome(filteredText);
    };

    // function para validar o e-mail no banco
    // f
    // function validarEmailExistente(email){
    //     //alert(`O e-mail inserido foi ${email}`)
    //     // fazer uma requisição p/ uma rota no Back

    //     //se der que existe um email, limpa a hook
    // }

    async function validarEmailExistente(email) {
        // Verifica se o email foi fornecido
        if (!email) {
            alert('Por favor, insira um e-mail.');
            return;
        }
    
        try {
            // Faz a requisição para a rota de validação do e-mail
            const response = await fetch(`${rota}/busca_email/?email=${email}`);
    
            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao verificar o e-mail');
            }
    
            const data = await response.json();
            console.log(`Retorno do back-end: ${data.resposta}`)
            // Se o e-mail já existir
            if (data.resposta) {
                alert('Já existe uma conta cadastrada com este e-mail.');
                setEmail('')
                // Limpa a hook (assumindo que você tenha uma hook de estado)
                // Exemplo: setEmail(''); ou whatever você esteja usando
            } 
            else {
                console.log("E-mail disponivel para cadastro")
                // alert('E-mail disponível para cadastro.');
                // Aqui você pode prosseguir com o cadastro
            }
        } catch (error) {
            console.error('Erro ao validar o e-mail:', error);
            alert('Erro ao validar o e-mail. Tente novamente mais tarde.');
        }
    }
    

    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={30} color="#000" />
                </TouchableOpacity>

                <Avatar.Image style={{ marginTop: 30 }} size={170} source={require('../../imgs/logo.png')} />
                <Text style={styles.title}>Faça seu cadastro</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    onChangeText={handleNomeChange}
                    value={nome}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    keyboardType="email-address"
                    onBlur={()=>validarEmailExistente(email)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="CPF"
                    onChangeText={text => setCpf(formatarCPF(text))}
                    value={cpf}
                    maxLength={14} // Ajustado para o CPF formatado
                    keyboardType="numeric"
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Senha"
                        onChangeText={text => setPassword(text)}
                        value={password}
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
                <TextInput
                    style={styles.input}
                    placeholder="Data de Nascimento"
                    onChangeText={text => setDataNascimento(formatarDataNascimento(text))}
                    value={dataNascimento}
                    keyboardType="numeric"
                    maxLength={10}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email de Recuperação"
                    onChangeText={text => setEmailRecuperacao(text)}
                    value={emailRecuperacao}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="(DDD)Telefone Celular"
                    onChangeText={text => setTelefone(formatPhoneNumber(text))}
                    value={telefone}
                    maxLength={15}
                    keyboardType="phone-pad"
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBE1CF',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
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
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#FFF9EE',
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
        marginBottom: 20,
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
        marginBottom: 20,
        backgroundColor: '#586D5E',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: "80%",
    },
    buttonText: {
        color: '#FFF9EE',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Cadastro;
