import React, { Component, useState } from 'react';
import { View } from 'react-native';
// import { FlatList, StyleSheet, Text, View,ScrollView,RefreshControl } from 'react-native';
import { Provider as PaperProvider ,Appbar,Text } from 'react-native-paper';
// import { List } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Ionicons,Feather,MaterialCommunityIcons } from '@expo/vector-icons';

export default class App extends Component{
    
    render(props) {
        return (
            <PaperProvider style={{ flex:1}}>                
                <Appbar.Header>
                    <Appbar.Content
                    title="Bande Code"
                    subtitle="Codifica os seus textos"
                    />

                    <Appbar.Action icon={()=>(<MaterialCommunityIcons name="heart" size={24} color="white" />)} onPress={()=>{alert("Teste")}} />
                    <Appbar.Action icon={()=>(<MaterialCommunityIcons name="share" size={24} color="white" />)} onPress={this._onMore} />
                    <Appbar.Action icon={()=>(<Feather name="more-vertical" size={24} color="white" />)} onPress={()=>{alert(this.props.show)}} />
                </Appbar.Header>
            </PaperProvider>
        );
    }
}

const styles = StyleSheet.create({
    bottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
  });