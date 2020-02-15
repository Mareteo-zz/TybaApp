import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { Button } from "react-native-elements";

//Custom Styles
import customStyles from "../Styles";
import THEME from "../Styles/theme";

class HomeScreen extends Component {
  state = {
    email: "",
    password: ""
  };

  inputHandler = (fieldname, value) => {
    this.setState(prevState => {
      return {
        ...prevState,
        [fieldname]: value
      };
    });
  };

  render() {
    const { email, password } = this.state;
    const { navigation } = this.props;
    return (
      <SafeAreaView style={customStyles.safeAreaView}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tyba App</Text>
        </View>
        <KeyboardAvoidingView style={styles.inputsContainer} behavior="padding">
          <TextInput
            style={styles.textInput}
            autoCompleteType="email"
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={text => this.inputHandler("email", text)}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCompleteType="password"
            placeholder="Password"
            placeholderTextColor="white"
            value={password}
            onChangeText={text => this.inputHandler("password", text)}
          />
          <Button
						//disabled={email === '' || password === ''}
            title="Log In"
            titleStyle={{ color: "white" }}
            buttonStyle={[customStyles.btn, { marginTop: 12 }]}
            onPress={() => navigation.navigate("Restaurants")}
          />
          <TouchableOpacity style={styles.registerContainer} onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: "white" }}>Register</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
    color: THEME.ORANGE,
    fontWeight: "bold"
  },
  inputsContainer: {
    marginVertical: 80
  },
  textInput: {
    backgroundColor: THEME.BASE_DARK,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 12,
    padding: 12,
    color: "white",
    marginVertical: 12
  },
  registerContainer: {
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default HomeScreen;
