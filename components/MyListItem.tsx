import { Button, Image, StyleSheet, Text, View } from 'react-native';

export const MyListItem = (item: any, index: any ) => {
    return <View style={styles.container}>
      <Image style={styles.imageWrapper}
          source={{
            uri: 'https://picsum.photos/100',
          }}
        />
       <Text style={styles.textWrapper} key={item.index}>{item.item.name}</Text>
    </View>
}


const styles = StyleSheet.create({
    container: {flexDirection: "row", borderColor: "black", flex: 1, justifyContent: "center"},
    imageWrapper: {flex: 1},
    textWrapper: {flex: 2},
  });