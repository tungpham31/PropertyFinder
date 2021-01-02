import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const SearchResults = ({navigation, route}) => {
    const listings = route.params.listings;
    const onItemPress = (index) => {
        console.log('index = ' + index);
    };
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
                data={listings}
                keyExtractor={(item, index) => {return index.toString()}}
                renderItem={({item, index}) => {
                    return (
                        <TouchableHighlight
                            underlayColor='#dddddd'
                            onPress={() => onItemPress(index)}>
                            <View style={styles.itemContainer}>
                                <Image source={require('./Resources/house.png')} style={styles.image}/>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.price}>${item.price}</Text>
                                    <Text style={styles.address}>{item.address}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    );
                }}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  descriptionContainer: {
    flex: 1,
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  address: {
    fontSize: 20,
    color: '#656565'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
  }
});

export default SearchResults;
