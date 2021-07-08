import React,{useState} from 'react';
import { List } from 'react-native-paper';
import { View,ScrollView,SafeAreaView,RefreshControl,TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.BandeCode') // returns Database object



// const [actualizando,setActualizando]=useState(false);
// const aoActualizar=()=>{
//     setActualizando(true);

//     /// Codigo de Actualizar
//     setTimeout(()=>{setActualizando(false)},3000)
// }

export default class App extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
          data: null,
          actualizando: null,
          
        }    
    
        this.fetchData() // ignore it for now
      }

    aoActualizar=()=>{

        // this.setState({actualizando: false})
        // /// Codigo de Actualizar
        // setTimeout(()=> this.setState({actualizando:true}),3000)
        // this.fetchData()
        
    }


render(){
    return (
      <SafeAreaView  style={{justifyContent:"flex-end", borderColor:"#eee",borderWidth:1}}>
         <ScrollView             
            refreshControl={
                <RefreshControl
                    refreshing={this.state.actualizando}
                    onRefresh={this.aoActualizar()}
                />
            }
         >
              <List.Section>
                {/* <List.Subheader>
                <FontAwesome name="history" size={24} color="#777"  />                 
                </List.Subheader> */}
        {
            this.state.data && this.state.data.map(data =>(
                <List.Item
                    style={{backgroundColor:"white",padding:13,marginTop:5}}
                    title={data.TextNormal}
                    description={data.TextCodificado }
                    right=
                    {()=>(
                            <View >
                                <FontAwesome name="share" style={{padding:5}} size={20} color="#777" />
                                <AntDesign name="delete" style={{padding:5}} size={20} color="orange" />
                            </View>
                            
                    )}              
               ></List.Item>
               ))
        }
          </List.Section>
      </ScrollView>
     </SafeAreaView >
    );
 }


 fetchData = () => {
    db.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql('SELECT * FROM favoritos', null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => this.setState({ data: _array }), 
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
        ) // end executeSQL
    }) // end transaction
  }
  


}


