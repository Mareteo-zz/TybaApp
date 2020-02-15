import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Linking } from "react-native";

//Custom Styles
import THEME from "../../Styles/theme";

const DEFAULT_IMAGE = "https://vswga.org/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg";

const RestaurantCard = ({ name, address, city, thumb, phone, web }) => {
  handleClick = (link) => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    });
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => this.handleClick(web)}>
      <Image
        style={{ width: "100%", height: 150 }}
        source={{ uri: thumb || DEFAULT_IMAGE }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text>Direccion: {address}</Text>
        <Text>Ciudad: {city}</Text>
        <Text>Número de telefono: {phone}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginVertical: 12,
  },
  title: {
    fontSize: THEME.FONT_SIZE_MEDIUM__REGULAR,
  },
  infoContainer: {
    backgroundColor: "white",
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  }
});

export default RestaurantCard;