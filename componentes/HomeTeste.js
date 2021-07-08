
import React, { useState } from 'react';
import { View,StyleSheet,TextInput,ScrollView,Clipboard,Share, Modal,Text ,TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons,MaterialIcons,Feather} from '@expo/vector-icons';
import MenuTop from '../componentes/MenuTop';
import Historico from '../componentes/Historico';
import { List, RadioButton } from 'react-native-paper';
import { Provider as PaperProvider ,Appbar } from 'react-native-paper';
// --------------- SQLITE ----------------//
import * as SQLite from 'expo-sqlite'
// const db = SQLite.openDatabase('db.BandeCode') // returns Database object

  
  // async function openDatabase(pathToDatabaseFile: string): SQLite.WebSQLDatabase {
  //   if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
  //     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  //   }
  //   await FileSystem.downloadAsync(
  //     Asset.fromModule(require(pathToDatabaseFile)).uri,
  //     FileSystem.documentDirectory + 'SQLite/myDatabaseName.db'
  //   );
  //   return SQLite.openDatabase('myDatabaseName.db');
  // }
  



export default ()=>{   

  const [data,setData]=useState(null)


  const fetchData = () => {
    db.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql('SELECT * FROM favoritos', null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => setData(_array), 
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
        ) // end executeSQL
    }) // end transaction
  }
  
  fetchData()

  const newItem = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO favoritos (TextNormal , TextCodificado ,tipo ) values (?, ?,?)', ['TextNormal', 'TextCodificado','tipo'],
        (txObj, resultSet) => setData(()=>data.concat( )),
        (txObj, error) => console.log('Error', error))
    })
  }
  
  

    return (
      <View style={estilo.conteiner}>
        <TouchableOpacity onPress={()=>newItem()} >
          <Text style={{backgroundColor:"blue",color:"white",padding:10}}>Add New Item</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>fetchData()} >
          <Text style={{backgroundColor:"red",color:"white",padding:10}}>Add New Item</Text>
        </TouchableOpacity>
         <ScrollView>
        {
            data && data.map(data =>
            (
                <View key={data.id}>
                  <Text >Normal: {data.TextNormal } - Codificado: {data.TextCodificado } - tipo:{data.tipo } </Text>
                </View>
            )
        )}
        </ScrollView>
      </View>
    )


}







const estilo=StyleSheet.create({
  conteiner:{
    marginTop:150,
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    width:"90%",
    // backgroundColor:"blue"
  },
  textEntrada:{
      padding:7, 
      backgroundColor:"white",
      borderRadius:12,
      maxWidth:"80%",
      alignItems:"flex-end",
      height:130
    

  },
  containerTextEntrada:{
    width:"80%"
  },
  textosNormal:{
    color:"#8B8989",
    marginBottom:3
    
  },
  viewTextEntrada:{
    
  }
  
});

