import { SafeAreaView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

export default function NewsSource({ route, navigation }) {
  const { url } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-undo-sharp" size={wp('7%')} color="black" /> 
      </TouchableOpacity>
      <WebView
        source={{ uri: url }}
        style={[styles.webview, { height: hp('98%') }]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  backButton: {
    marginRight: wp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    marginVertical: hp('1%'), 
  },
});
