import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';

const largura = Dimensions.get("screen").width

const TextoPadrao = ({ texto, tamanhoFonte, textcolor }) => {
    return (
        <Text style={[styles.texto, { fontSize: tamanhoFonte, color: textcolor }]}>{texto}</Text>
        )
}


const styles = StyleSheet.create({
    texto: {
        textAlign: 'center',
       
    }
})

export default TextoPadrao;