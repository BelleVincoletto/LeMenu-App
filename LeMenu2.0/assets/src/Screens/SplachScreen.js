import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import Login from "./Login";

const {width, height} = Dimensions.get("screen")

const SplachScreen = () => {
    const navigation = useNavigation()

    const animacacao = () =>{
        navigation.navigate('Login')
    }

    return (
        <View style = {style.container}>
            <LottieView
                source={require("../../Animation/Flow 2.json")}
                style={{ width: 500, height: 900  }}
                autoPlay
                loop={false}
                onAnimationFinish={animacacao}
                
            />
        </View>
    )
}

export default SplachScreen

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        resizeMode:"contain"
    
    }
})