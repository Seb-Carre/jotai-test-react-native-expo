import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { atom, useAtom } from 'jotai';

import BigList from "react-native-big-list";
import { MyListItem } from '../../../components/MyListItem';
import { StatusBar } from 'expo-status-bar';
import { focusAtom } from 'jotai/optics'

type Folder = {
  id: number,
  parentFolderId: number,
  name: string,
  isSyncWithAPI: boolean,
  type: string,
}

type Password = {
  id: number,
  parentFolderId: number,
  name: string,
  isSyncWithAPI: boolean,
  type: string,
  tags: string[],
  password: { encrytedPassword: string, iv: Buffer},
}

const initialState = {
  data: [
    {
      id: 1,
      parentFolderId: 0,
      name: "Documents",
      isSyncWithAPI: false,
      type: "folder",
    },
    {
      id: 2,
      parentFolderId: 0,
      name: "Dropbox Password",
      isSyncWithAPI: false,
      type: "password",
      tags: ["cloud", "data"],
      encrytedPassword: {
        password: "",
        iv: ""
      },
    }
  ]
}


var newItems = new Array(1000000);
for(var i = 3; i < newItems.length; i++){
  const isOdd = i % 2 == 1;
  if(isOdd) {
    initialState.data.push({
      id: i,
      parentFolderId: 1,
      name: "Document " + i,
      isSyncWithAPI: false,
      type: "folder",
    });
  }
  else {
    initialState.data.push({
      id: i,
      parentFolderId: 1,
      name: "Password " + i,
      isSyncWithAPI: false,
      type: "password",
      tags: ["cloud", "data"],
      encrytedPassword: {
        password: "",
        iv: ""
      },
    });
  }
}

export const dataAtom = atom(initialState) // il y a 1 000 000 de données dans cet atome !

type NetworkInfo = {
  isInternetReachable: boolean | null
}

export const internetConnectionAtom = atom<NetworkInfo| undefined>(undefined)

const allDataWithParentID = focusAtom(dataAtom, (optic) => optic.prop("data").filter(t => t.parentFolderId === 0))


export default function HomeScreen({navigation}: any) {

  const renderItem = ({ item, index }: any) => {
    return <Pressable style={{flex: 1}} onPress={() => {
      navigation.push("ExplorerFolder", {parentItem: item})
    }}><MyListItem item={item} index={index}/></Pressable>
  };
  const [data, setData] = useAtom(allDataWithParentID)
  useEffect(() => {
    console.log("data", data.length);
  }, [data])
  return (
    <View style={styles.container}>
      <View style={{flex: 1,alignItems: 'center',
    justifyContent: 'center', }}>
      <Button title='Add New Password' onPress={() => {
        setData((oldData) => [...oldData, {
          id: data.length + 1,
          parentFolderId: 0,
          name: "Ciné Pass",
          type: "password",
          tags: ["cinema", "movies"],
          isSyncWithAPI: false,
          encrytedPassword: {
            password: "",
            iv: ""
          },
        }])
      }}></Button>

<Button title='Modify Password' onPress={() => {
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
