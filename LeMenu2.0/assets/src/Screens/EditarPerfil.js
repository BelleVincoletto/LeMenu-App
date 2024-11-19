import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal, FlatList, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/MaterialIcons';


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
import { Icon } from 'react-native-paper';

const rota = "http://10.111.9.84:3000";

const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{2}\s\d{5}-\d{4}$/;
    return phoneRegex.test(phone);
};

const validateName = (name) => {
    const nameRegex = /^[\p{L}Çç~^´`\s]{1,150}$/u;
    return nameRegex.test(name);
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

const EditarPerfil = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [userId, setUserId] = useState(null);
    const [profilePicture, setProfilePicture] = useState(ProfilePic1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [dataNascimento, setDataNascimento] = useState('');


    const profilePictures = [
        ProfilePic1, ProfilePic2, ProfilePic3, ProfilePic4, ProfilePic5,
        ProfilePic6, ProfilePic7, ProfilePic8, ProfilePic9, ProfilePic10,
        ProfilePic11, ProfilePic12, ProfilePic13, ProfilePic14, ProfilePic15,
        ProfilePic16, ProfilePic17, ProfilePic18, ProfilePic19, ProfilePic20,
        ProfilePic21, ProfilePic22
        
    ];
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

    // const formatPhoneNumber = (phone) => {
    //     const cleaned = phone.replace(/\D/g, '');
    //     const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    //     if (match) {
    //         return `${match[1]} ${match[2]}-${match[3]}`;
    //     }
    //     return phone;
    // };

    const formatPhoneNumber = (phone) => {
        // Remove todos os caracteres não numéricos
        const match = phone.replace(/\D/g, '').match(/^(\d{2})(\d{5})(\d{4})$/);
    
        // Se a correspondência for bem-sucedida, formata o número de telefone
        if (match) {
            return `${match[1]} ${match[2]}-${match[3]}`;
        }
    
        // Caso não corresponda ao padrão, retorna o número original
        return phone;
    };

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id) {
                    setUserId(id);
                    const resposta = await fetch(`${rota}/buscar/?id=${id}`);
                    if (resposta.ok) {
                        const dados = await resposta.json();
                        setName(dados.nome);
                        setBirthdate(
                            `${dados.data_nascimento.substr(8, 2)}/${dados.data_nascimento.substr(5, 2)}/${dados.data_nascimento.substr(0, 4)}`
                        );
                        setPhone(formatPhoneNumber(dados.telefone)); // Formatação ao carregar o telefone
                        setEmail(dados.email);
                        setProfilePicture(pictureMap[dados.profilePicture] || ProfilePic1);
                    } else {
                        Alert.alert('Erro', 'Usuário não encontrado');
                    }
                } else {
                    Alert.alert('Erro', 'ID do usuário não encontrado');
                }
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
                console.error('Erro ao carregar os dados do usuário:', error);
            }
        };
        getUserInfo();
    }, []);

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSave = async () => {
        if (!validateName(name)) {
            Alert.alert('Erro', 'Nome inválido. Use apenas letras e espaços.');
            return;
        }

        if (!validatePhoneNumber(phone)) {
            Alert.alert('Erro', 'O número de telefone não é válido.');
            return;
        }

        if (isChecked) {
            if (!newPassword || !confirmPassword) {
                Alert.alert('Erro', 'Por favor, preencha todos os campos de senha');
                return;
            }

            if (!validatePassword(newPassword)) {
                Alert.alert(
                    'Erro',
                    'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
                );
                return;
            }

            if (newPassword !== confirmPassword) {
                Alert.alert('Erro', 'As senhas não coincidem');
                return;
            }

            if (!validateDataNascimento(dataNascimento)) {
                Alert.alert('Erro', 'Por favor, preencha a data de nascimento corretamente.');
                return;
            }
        }

        try {
            const body = {
                id: userId,
                nome: name,
                data_nascimento: birthdate,
                telefone: phone,
                email: email,
                senha: isChecked ? newPassword : senha,
                flag: isChecked,
            };

            const response = await fetch(`${rota}/atualizarDados`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Erro ao atualizar o perfil');
            }

            Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
            navigation.navigate("Perfil");
        } catch (error) {
            Alert.alert('Erro', `Erro ao salvar os dados: ${error.message}`);
        }
    };

    const handleNomeChange = (text) => {
        if (validateName(text)) {
            setName(text);
        } else {
            Alert.alert('Erro', 'Nome inválido. Use apenas letras e espaços.');
        }
    };

    const handlePhoneChange = (text) => {
        const formattedPhone = formatPhoneNumber(text);
        setPhone(formattedPhone);
    };
    
    const validateDataNascimento = (data) => {
        // Verifica se a data está no formato dd/mm/yyyy
        const parts = data.split('/');
        if (parts.length !== 3) return false;

        const [day, month, year] = parts;
        return day.length === 2 && month.length === 2 && year.length === 4;
    };


  
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Perfil")} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={30} color="#586d5e" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <Image source={profilePicture} style={styles.profilePicture} />
                    <View style={styles.cameraIcon}>
                        <MaterialCommunityIcons name="camera" size={24} color="white" />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nome"
                    value={name}
                    onChangeText={handleNomeChange}
                    style={styles.input}
                />
                <TextInput
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    editable={false}
                />
                <TextInput
                    placeholder="Data de Nascimento"
                    value={birthdate}
                    onChangeText={setDataNascimento}
                    style={styles.input}
                />
                
                <TextInput
                    placeholder="Telefone"
                    value={phone}
                    onChangeText={handlePhoneChange}
                    style={styles.input}
                />
            </View>

            {/* Checkbox para alterar senha */}
            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setIsChecked(!isChecked);
                        setShowPasswordFields(!showPasswordFields);
                    }}
                    style={styles.customCheckbox}
                >
                    <MaterialCommunityIcons
                        name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
                        size={24}
                        color="#6f4e37"
                    />
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Alterar Senha</Text>
            </View>

            {/* Campos de Senha */}
            {showPasswordFields && (
    <>
        <View style={styles.viewsenha}>
            <TextInput 
                placeholder="Nova Senha"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                style={styles.passwordInput}
            />
            <TouchableOpacity 
                onPress={() => setShowNewPassword(!showNewPassword)} 
                style={styles.iconContainer}
            >
                <MaterialCommunityIcons
                    name={showNewPassword ? "eye" : "eye-off"}
                    size={24}
                    color="gray"
                />
            </TouchableOpacity>
        </View>
        
        <View style={styles.viewsenha2}>
            <TextInput
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={styles.passwordInput}
            />
            <TouchableOpacity 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)} 
                style={styles.iconContainer}
            >
                <MaterialCommunityIcons
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={24}
                    color="gray"
                />
            </TouchableOpacity>
        </View>
    </>
            )}

            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>

            {/* Modal para selecionar imagem de perfil */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <FlatList
                        data={profilePictures}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setProfilePicture(item);
                                    setIsModalVisible(false);
                                }}
                            >
                                <Image source={item} style={styles.modalImage} />
                            </TouchableOpacity>
                        )}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.flatListContent}
                    />
                </View>
            </Modal>
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
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginHorizontal: 15,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#586d5e',
        borderRadius: 20,
        padding: 5,
    },
    inputContainer: {
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#fff',
        // backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        paddingRight: 40, 
        
    },
    viewsenha:{
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        marginBottom: 5
     
    },
    viewsenha2:{
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        marginBottom: 5
     
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    customCheckbox: {
        padding: 5,
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#6f4e37',
    },
    saveButton: {
        backgroundColor: '#6f4e37',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    flatListContent: {
        paddingHorizontal: 10,
    },
    modalImage: {
        width: 80,
        height: 80,
        margin: 10,
        borderRadius: 10,
    }

});

export default EditarPerfil;
