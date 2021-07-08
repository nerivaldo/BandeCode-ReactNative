import React, { Component, useState } from 'react';
import 'react-native-gesture-handler';
import { Button, Text, View,SafeAreaView,ScrollView, StatusBar,StyleSheet,LinearGradient } from 'react-native';
// import Estilos from './estilos/Estilos';



export default function App1() {
  return (         

      <View>
        <Text>Nada de mais</Text>
      </View>
 
  );
}


const esiloLogo = StyleSheet.create({
  logo:{
    width:250,
    resizeMode:'center'
  },
  imgFundo:{
    flex:1,
    resizeMode:"cover",
    width:"100%"
  }
})

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center'
	},
	iconTabRound: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#9C27B0',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    }
});
 