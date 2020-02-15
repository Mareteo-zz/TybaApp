import React, { Component } from "react";
import { Text, View, SafeAreaView, AsyncStorage, StyleSheet } from "react-native";
//import AsyncStorage from '@react-native-community/async-storage';

//Custom Styles
import customStyles from "../Styles";
import THEME from "../Styles/theme";

class HistoryScreen extends Component {
  state = {
    history: [],
  }
  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('myHistory');
      if (value !== null) {
        this.setState({ history:  value.split(",")});
      }
    } catch (error) {
      console.log(error)
    }
  };

  render() {
    return (
      <SafeAreaView style={customStyles.safeAreaView}>
        <Text style={{fontSize: THEME.FONT_SIZE_EXTRA_LARGE, color: "white"}}> History </Text>
        {this.state.history.map(item => {
          return (
            <View style={styles.itemsContainer} key={item}>
              <Text styles={{color: "white"}}>{item}</Text>
            </View>
          );
        })}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  itemsContainer: {
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "white",
  }
})
 export default HistoryScreen;