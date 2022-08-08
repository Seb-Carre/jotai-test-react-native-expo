import { StatusBar } from "expo-status-bar";
import { atom, useAtom } from "jotai";
import { focusAtom } from "jotai/optics";
import React, { useEffect } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import BigList from "react-native-big-list";

import { MyListItem } from "../../../components/MyListItem";
import initialState from "../../../Store/jotai";

export const dataAtom = atom(initialState);

const allDataWithParentID = focusAtom(dataAtom, (optic) =>
  optic.prop("data").filter((t) => t.parentFolderId === 0)
);

export default function HomeScreen({ navigation }: any) {
  const renderItem = ({ item, index }: any) => {
    return (
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          navigation.push("ExplorerFolder", { parentItem: item });
        }}
      >
        <MyListItem item={item} index={index} />
      </Pressable>
    );
  };
  const [data, setData] = useAtom(allDataWithParentID);
  useEffect(() => {
    console.log("data", data.length);
  }, [data]);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Add New Password"
          onPress={() => {
            setData((oldData) => [
              ...oldData,
              {
                id: data.length + 1,
                parentFolderId: 0,
                name: "Ciné Pass",
                type: "password",
                tags: ["cinema", "movies"],
                isSyncWithAPI: false,
                encrytedPassword: {
                  password: "",
                  iv: "",
                },
              },
            ]);
          }}
        ></Button>

        <Button
          title="Modify Password"
          onPress={() => {
            setData((oldData) => {
              const index = oldData.findIndex((t) => t.name === "Ciné Pass");
              oldData[index].name = "Ciné Pass Plus";
              return [...oldData];
            });
          }}
        ></Button>
      </View>

      <BigList
        style={{ flex: 1 }}
        data={data}
        renderItem={renderItem}
        itemHeight={100}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
