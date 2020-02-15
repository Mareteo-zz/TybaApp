import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

//Styles
import THEME from '../../../Styles/theme';

class Loading extends Component {
  render() {
    return (
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={THEME.ORANGE} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: THEME.BASE_DARK,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
})
 export default Loading;