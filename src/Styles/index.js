import { StyleSheet } from "react-native";
import THEME from './theme';

export default StyleSheet.create({
  //Common
  safeAreaView: {
    backgroundColor: THEME.BASE_DARK,
    padding: 20,
    flex: 1,
  },
  //Button
  btn: {
    borderRadius: 10,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: THEME.ORANGE,
  },
  tiny: {
    paddingBottom: 8,
    paddingTop: 8,
  }
});
