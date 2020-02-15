import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView
} from "react-native";
import { Button, SearchBar } from "react-native-elements";

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
    search: "",
    restaurants: [],
    isLoading: false
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
      })
      .catch(err => {
        console.err(err);
      });
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
              onPress={this.searchRestaurant}
            />
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
  listContainer: {},
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
