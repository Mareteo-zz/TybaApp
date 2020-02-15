import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Button } from "react-native-elements";
import GetLocation from "react-native-get-location";
//import AsyncStorage from '@react-native-community/async-storage';

//Components
import RestaurantCard from "../Components/RestaurantCard";
import Loading from "../Components/Common/Loading";

//API
import { getRestaurantsBySearch } from "../Api/Restaurants";

//Custom Styles
import customStyles from "../Styles";
import THEME from "../Styles/theme";

export default class RestaurantsScreen extends Component {
  state = {
    isLoading: false,
    longitude: '',
    latitude: '',
    restaurants: [],
    search: "",
    history: [],
  };

  componentDidMount = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000
    })
      .then(location => {
        this.setState({
          longitude: location.longitude,
          latitude: location.latitude
        })
        console.log(location);
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };

  updateSearch = search => {
    this.setState({ search });
  };

  searchRestaurant = () => {
    this.setState({ isLoading: true });
    getRestaurantsBySearch(this.state.search)
      .then(({ data }) => {
        console.log(data.restaurants);
        this.setState({ restaurants: data.restaurants, isLoading: false });
        this.addSearchToHistory();
      })
      .catch(err => {
        console.err(err);
      });
  };

  searchRestaurantByLocation = () => {
    const {search, longitude, latitude} = this.state;
    this.setState({ isLoading: true });
    getRestaurantsBySearch(search, longitude, latitude)
      .then(({ data }) => {
        console.log(data.restaurants);
        this.setState({ restaurants: data.restaurants, isLoading: false });
        this.addSearchToHistory();
      })
      .catch(err => {
        console.err(err);
      });
  }

  addSearchToHistory = () => {
    this.setState(prevState => {
      const history = prevState.history.concat(prevState.search);
      return {
        ...prevState,
        history
      }
    });
    console.log(this.state)
    this.saveToHistory();
  };

  saveToHistory = async () => {
    try {
      await AsyncStorage.setItem('myHistory', this.state.history.toString());
    } catch (err) {
      console.log(err)
    }
  };

  render() {
    const { restaurants, isLoading } = this.state;
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <SafeAreaView style={customStyles.safeAreaView}>
            <TextInput
              style={styles.textInput}
              placeholder="Busca aquí..."
              placeholderTextColor="white"
              onChangeText={this.updateSearch}
              value={this.state.search}
            />
            <Button
              title="Buscar"
              titleStyle={{ color: "white" }}
              buttonStyle={[
                customStyles.btn,
                customStyles.tiny,
                { marginTop: 12 }
              ]}
              onPress={this.searchRestaurantByLocation}
            />
            <Button
              title="Buscar cerca a mi"
              titleStyle={{ color: "white" }}
              buttonStyle={[
                customStyles.btn,
                customStyles.tiny,
                { marginTop: 12 }
              ]}
              onPress={this.searchRestaurant}
            />
            <TouchableOpacity style={styles.historyContainer} onPress={() => this.props.navigation.navigate('History')}>
              <Text style={{color: "white"}}>Historial</Text>
            </TouchableOpacity>
            <ScrollView style={styles.listContainer}>
              {restaurants.map(({ restaurant }) => {
                return (
                  <RestaurantCard
                    key={restaurant.url}
                    name={restaurant.name}
                    address={restaurant.location.address}
                    city={restaurant.location.city}
                    thumb={restaurant.thumb}
                    phone={restaurant.phone_numbers}
                    web={restaurant.url}
                  />
                );
              })}
            </ScrollView>
          </SafeAreaView>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  historyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: THEME.BASE_DARK,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 12,
    padding: 12,
    color: "white",
    marginVertical: 12
  }
});
