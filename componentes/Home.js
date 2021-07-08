import React, { useState } from 'react';
import { View,StyleSheet,TextInput,ScrollView,Clipboard,Share, Modal,Text ,TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons,MaterialIcons,Feather} from '@expo/vector-icons';
import MenuTop from '../componentes/MenuTop';
import Historico from '../componentes/Historico';
import { List, RadioButton } from 'react-native-paper';
import { Provider as PaperProvider ,Appbar } from 'react-native-paper';
// --------------- SQLITE ----------------//
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.BandeCode') // returns Database object





// --------------------- INICIO ----------------------//


export default function TelaHome(){

  const [textoNormal, setTextoNormal]=useState("");
  const [textoCodificado, setTextoCodificado]=useState("");
  const [show, setShow]=useState(false);
  const [inverterCodType, setInverterCodType]=useState(false);
  const [data,setData]=useState(null)

// -------------------- Inserir Favoritos -------------------
const newItem = () => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO favoritos (TextNormal , TextCodificado ,tipo ) values (?, ?,?)', ['TextNormal', 'TextCodificado','Tipo'],
      (txObj, resultSet) => setData(data.concat(
          { id: resultSet.insertId, TextNormal: 'TextNormal',TextCodificado : 'TextCodificado',tipo : 'tipo' })),
      (txObj, error) => console.log('Error', error))
  })
}
// --- FIM Inserir Favoritos ---//

  const [value, setCodificacaoValue] = React.useState('numeric');

  const [] = useState('')
  const textoNormalColar = async () => {
    const text = await Clipboard.getString()

    if(text !=null || text !=""){ setTextoNormal(text)}
   
  }
  const textoCodificadoColar = async () => {
    const text = await Clipboard.getString()
    setTextoCodificado(text)
  }

  //.........................
  //***************************** */
  //------------------------------------------------

  // Bande Code Codificação

  let abc = {" ":"0","a":"1","b":"2","c":"3","d":"4","e":"5","f":"6","g":"7","h":"8","i":"9","j":".10","k":".11","l":".12","m":".13","n":".14","o":".15","p":".16","q":".17","r":".18","s":".19","t":".20","u":".21","v":".22","w":".23","x":".24","y":".25","z":".26","undefined":""};
  var saida1=""
  let saidaMinisculo=""

  const codificar=()=>{
    if(value=="numeric")
    {
      saidaMinisculo=textoNormal.toLowerCase()
      
      for(var i = 0; i<saidaMinisculo.length;i++){   


        if(abc[saidaMinisculo[i]] !== undefined) 
        {
          saida1 += abc[saidaMinisculo[i]]; 
        }
      }
      setTextoCodificado(saida1);
      saida1=""

    }else{     


      for(var i = textoNormal.length-1; i >= 0;i--){           
          if (textoNormal[i]==" ") {
              saida1 += "-"; 
             
          }else{
              saida1 += textoNormal[i]; //escrever[i]
          }
          
      }
      setTextoCodificado(saida1);
      saida1=""

    }
    
  }

// Comartilhar texto codificado -----------------
const onShare = async () => {
  try {
      const result = await Share.share({
        message: textoCodificado,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
      
    }
  };



  return(
    
  <View style={{flex:1}}>

  <ScrollView style={{backgroundColor:"#f9f8f8"}}>    

     {/* ----------------- Menu do Topo ---------------  */}

  <PaperProvider style={{ flex:1}}>                
      <Appbar.Header>
          <Appbar.Content
          title="Bande Code"
          subtitle="Codifica os seus textos"
          />
          <Appbar.Action icon={()=>(<MaterialCommunityIcons name="heart" size={24} color="white" />)} onPress={()=>newItem()} />
          <Appbar.Action icon={()=>(<MaterialCommunityIcons name="share" size={24} color="white" />)} onPress={()=>{onShare()}} />
          <Appbar.Action icon={()=>(<Feather name="more-vertical" size={24} color="white" />)} onPress={()=>setShow(true)} />
      </Appbar.Header>
  </PaperProvider>    
  <TouchableOpacity onPress={()=>newItem()} >
          <Text style={{backgroundColor:"blue",color:"white",padding:10}}>Add New Item</Text>
        </TouchableOpacity>
  {/* -----------------------------Fim Menu do Topo */}

        <View style={{flex:1,flexDirection:"column",alignItems:"center",justifyContent:"center", marginTop:30}}>
          <View style={{width:"90%"}}>
          
          <View 
            style={{
              flex:1,
              flexDirection:"row",
              borderWidth:1,
              borderColor:"#eee",
              borderRadius:10,
              padding:5,
              backgroundColor:"white"
            }}
            >    

            <View style={{alignItems:"center"}}>
              <TextInput
                value={textoNormal}
                placeholder="Textos normais Aqui"  
                style={estilo.textEntrada}
                multiline={true}
                onChangeText={text=>setTextoNormal(text)}

              />  
            </View>

            <View style={{flex:1 ,alignItems:"flex-end"}}>
              <MaterialIcons.Button name="clear" size={24} backgroundColor="transparent" color="#fb3" 
                onPress={
                ()=>{setTextoNormal("") 
                setTextoCodificado("")}}
              />
              <MaterialIcons.Button name="content-paste" backgroundColor="transparent"  size={24} color="blue" 
                onPress={()=>textoNormalColar()}
              />
              <MaterialCommunityIcons.Button name="send" backgroundColor="transparent"  size={30} color="blue"
                onPress={()=>codificar()}
              />


            </View>

          </View>

          <View 
            style={{
              flex:1,
              flexDirection:"row",
              borderWidth:1,
              borderColor:"#eee",
              borderRadius:10,
              padding:5,
              paddingLeft:14,
              marginTop:6,
              backgroundColor:"white"

            }}
            >    
                      
            <View> 
              <TextInput
                placeholder="Textos Codificados Aqui"  
                style={estilo.textEntrada}
                multiline={true}
                value={textoCodificado}
                onChangeText={text=>setTextoCodificado(text)}

              />  
            </View>

            <View style={{flex:1 ,alignItems:"flex-end"}}>
            <MaterialIcons.Button name="clear" size={24} backgroundColor="transparent" color="#fb3" 
                onPress={()=>setTextoCodificado("")}
              />
              <MaterialIcons.Button name="content-paste"backgroundColor="transparent"  size={24} color="blue"
                onPress={()=>textoCodificadoColar()}
              />
              <MaterialCommunityIcons.Button name="send" backgroundColor="transparent"  size={30} color="blue"
                onPress={()=>setShow(true)}
              />
            </View>

            

          </View>
         {/* Historico */}
            <View style={{flex:2,borderRadius:20,marginTop:10}}>              
              <Historico/>
           </View>


          </View>

          
         

        

        </View>

        {/* --------------------------------Modal Escolher tipo de codificação----------------- */}
        <Modal
            transparent={true}
            visible={show}   
        >
             <View  style={{flex:1 ,backgroundColor:"#000000aa"}}
              onPress={()=>setShow(false)} >
                
               <View style={{backgroundColor:"#eee",margin:50,marginBottom:20,padding:40,borderRadius:10  }}> 
                  <Text style={{fontSize:20}}>Tipo de Codificação</Text>

                  {/* <RadioButton
                    value="first"                    
                    status={ checked === 'first' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('first')}
                  
                  />
                  <RadioButton
                    value="second"
                    name="Nada"
                    status={ checked === 'second' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('second')}
                  /> */}

                <RadioButton.Group onValueChange={value => setCodificacaoValue(value)} value={value}>
                      <RadioButton.Item label="Numérico" value="numeric" />
                      <RadioButton.Item label="Inversão" value="inverco" />
                </RadioButton.Group>
                   

                  <TouchableOpacity  onPress={()=>setShow(false)}>
                    <Text style={{color:"blue", marginTop:100}}>Sair</Text>
                  </TouchableOpacity>

               </View>
             
             </View>
            
           </Modal>

  </ScrollView>
  </View>
  );

 
}



const increment = (id) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE favoritos SET tipo  = tipo WHERE id = ?', [id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          let newList = data.map(data => {
            if (data.id === id)
              return { data, count: data.count + 1 }
            else
              return data
          })
          setDate(newList)
        }
      })
  })
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

