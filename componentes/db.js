import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import '../componentes/db'

import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.testDb') // returns Database object

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
    // Check if the items table exists if not create it
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)'
      )
    })


    this.fetchData() // ignore it for now
  }
  render() {
    return (
        <View style={{backgroundColor: "#ddd",marginTop: 100,}}>
        <Text>Add Random Name with Counts</Text>
        <TouchableOpacity onPress={this.newItem} >
          <Text>Add New Item</Text>
        </TouchableOpacity>

        <ScrollView>
        {
            this.state.data && this.state.data.map(data =>
            (
                <View key={data.id}>
                  <Text >{data.text} - {data.count}</Text>
                  <TouchableOpacity onPress={() => this.increment(data.id)}>
                      <Text style={{fontSize:30, backgroundColor:"red", color:"white"}} > Mais </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.delet(data.id)}>
                      <Text> DEL </Text>
                  </TouchableOpacity>
                </View>
            )
        )}
        </ScrollView>
      </View >
    )
  }

  
 fetchData = () => {
  db.transaction(tx => {
    // sending 4 arguments in executeSql
    tx.executeSql('SELECT * FROM items', null, // passing sql query and parameters:null
      // success callback which sends two things Transaction object and ResultSet Object
      (txObj, { rows: { _array } }) => this.setState({ data: _array }), 
      // failure callback which sends two things Transaction object and Error
      (txObj, error) => console.log('Error ', error)
      ) // end executeSQL
  }) // end transaction
}

// event handler for new item creation
 newItem = () => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO items (text, count) values (?, ?)', ['gibberish', 0],
      (txObj, resultSet) => this.setState({ data: this.state.data.concat(
          { id: resultSet.insertId, text: 'gibberish', count: 0 }) }),
      (txObj, error) => console.log('Error', error))
  })
}

 increment = (id) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE items SET count = count + 1 WHERE id = ?', [id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          let newList = this.state.data.map(data => {
            if (data.id === id)
              return { ...data, count: data.count + 1 }
            else
              return data
          })
          this.setState({ data: newList })
        }
      })
  })
}

 delet = (id) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM items WHERE id = ? ', [id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          let newList = this.state.data.filter(data => {
            if (data.id === id)
              return false
            else
              return true
          })
          this.setState({ data: newList })
        }
      })
  })
}

}



export default App


