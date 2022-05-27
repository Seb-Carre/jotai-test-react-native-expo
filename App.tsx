import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { atom, useAtom } from 'jotai';

import BigList from "react-native-big-list";
import { StatusBar } from 'expo-status-bar';
import { focusAtom } from 'jotai/optics'

const initialState = {
  id: 0,
  name: "",
  level: 0,
  data: [
    {
      id: 1,
      name: "Documents",
      isSyncWithAPI: false,
      type: "folder",
      data: {
        
      }
    },
    {
      id: 2,
      name: "Dropbox Password",
      type: "password",
      encrytedPassword: "",
    }
  ]
}


var newItems = new Array(1000000);
for(var i = 0; i < newItems.length; i++){
  initialState.data.push({
    id: 1,
    name: "Document " + i,
    isSyncWithAPI: false,
    type: "folder",
    data: {
      
    }
  });
}

const dataAtom = atom(initialState)

const dataLevel = focusAtom(dataAtom, (optic) => optic.prop("data"))

const MyListItem = (item, index) => {
  return <View style={{flexDirection: "row", borderColor: "black", flex: 1}}>
    <Image style={{flex:1}}
        source={{
          uri: 'https://picsum.photos/100',
        }}
      />
     <Text style={{flex: 2}} key={item.index}>{item.item.name}</Text>
  </View>
}

export default function App() {

  const [data, setData] = useAtom(dataLevel)

  const renderItem = ({ item, index }) => <MyListItem item={item} index={index}/>;
  useEffect(() => {
    console.log("data", data.length);
  }, [data])
  return (
    <View style={styles.container}>
      <View style={{flex: 1,alignItems: 'center',
    justifyContent: 'center', }}>

      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title='Add New Password' onPress={() => {
        setData((oldData) => [...oldData, {
          id: 3,
          name: "Ciné Pass",
          type: "password",
          encrytedPassword: "",
        }])
      }}></Button>

<Button title='Modify Password' onPress={() => {
        const obj = {
          id: 3,
          name: "Ciné Pass",
          type: "password",
          encrytedPassword: "",
        }

        setData((oldData) => {
          const index = oldData.findIndex(t => t.name === "Ciné Pass")
          oldData[index].name = "Ciné Pass Plus"
          return [...oldData]
        })
      }}></Button>
      </View>

      <BigList style={{flex: 1}} data={data} renderItem={renderItem} itemHeight={100} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
