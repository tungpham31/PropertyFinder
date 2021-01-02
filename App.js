/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

'use strict';

import React, {useState} from 'react';
//import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchResults from './SearchResults.js'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  Button,
  ActivityIndicator,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();

function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber,
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'http://facebook.github.io/react-native/movies.json';
 // return 'http://api.nestoria.co.uk/api?' + querystring;
 // return 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=metadata&place_name=Clapham&price_type=fixed&encoding=json';
}

const SearchPage = ({ navigation }) => {
  const [searchText, setSearchText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let textInput;

  const onTextInputSubmitted = (textInput) => {
    const query = urlForQueryAndPage('place_name', searchText, 1);
    const successCallback = response => {
      const listings = [
        {price: '3,000,000', address: 'Nile Street, London N1'},
        {price: '575,000', address: 'Milner Square, London N1'},
      ];
      navigation.navigate('SearchResults', {listings: listings});
    }
    setIsLoading(true);
    fetch(query)
      .then(successCallback)
      .catch(error => console.error(error))
      .then(() => setIsLoading(false));
    textInput.clear();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Search for houses to buy!
      </Text>
      <Text style={styles.description}>
        Search by place-name or postal code
      </Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.textInput}
          returnKeyType="go"
          placeholder="Search via name or postal code"
          ref={input => { textInput = input }}
          onChangeText = {text => setSearchText(text)}
          onSubmitEditing={() => onTextInputSubmitted(textInput)}
        />
        <Button
          title="Go"
          color="#48BBEC"
          onPress={() => onTextInputSubmitted(textInput)}
        />
      </View>
      <Image source={require('./Resources/house.png')} style={styles.image}/>
      {isLoading && <ActivityIndicator size='large'/>}
    </View>
  );
}

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={SearchPage}
          options={{ title: 'Property Finder' }}
        />
        <Stack.Screen
          name="SearchResults"
          component={SearchResults}
          options={{ title: 'Search Results'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  textInput: {
    width: 320,
    height: 40,
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 5,
  }
});

export default App;
