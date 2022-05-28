import { Button, Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { atom, useAtom } from 'jotai';

import BigList from "react-native-big-list";
import { MyListItem } from '../../../components/MyListItem';
import { StatusBar } from 'expo-status-bar';
import { dataAtom } from './HomeScreen';
import { focusAtom } from 'jotai/optics';

const dataFocus = focusAtom(dataAtom, (optic) => optic.prop("data")) // récupération des données nécessaires

export default function ExplorerFolderScreen({navigation, route}: any) {
  const parentId = route.params.parentItem.id
  const [data, setData] = useAtom(dataFocus) // utilisation de l'atom comme un useState Global
  const allDataWithParentID = data.filter(t => t.parentFolderId === parentId) // filtrage des données nécessaires, utilisé dans BigList.
  const renderItem = ({ item, index }: any) => {
    return <Pressable style={{flex: 1}} onPress={() => {
        if(item.type == "password") {
            navigation.push("RevealPassword", {item: item})
        } else {
            navigation.push("ExplorerFolder", {parentItem: item})
        }
    }}><MyListItem item={item} index={index}/></Pressable>
  };


  useEffect(() => {
    console.log("data", data.length);
  }, [data])
  return (
    <View style={styles.container}>
      <View style={{flex: 1,alignItems: 'center',
    justifyContent: 'center', }}>
      <Button title='Move First Password to Parent Folder' onPress={() => {
        setData((oldData) => {
          navigation.navigate("Home")
          const index = oldData.findIndex(t => t.name === "Password 4") // Comme exemple ici, je souhaite que Password 4 change de parent et soit directement placé dans un autre dossier.
          oldData[index].parentFolderId = 0 // déplacé au dossier principal
          return [...oldData]
        })
      }}></Button>

<Button title='Move Password to First Folder ' onPress={() => {
        setData((oldData) => {
          const index = oldData.findIndex(t => t.name === "Password 6")
          oldData[index].parentFolderId = 5 // password 6 sera déplacé dans un folder qui a comme id 5
          return [...oldData]
        })
      }}></Button>
      </View>

      <BigList style={{flex: 1}} data={allDataWithParentID} renderItem={renderItem} itemHeight={100} /> 
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
