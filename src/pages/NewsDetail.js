import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function NewsDetail({ route }) {
  const { newsItem } = route.params;
  const navigation = useNavigation();
  const [isFavorited, setIsFavorited] = useState(false);

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }

  const handleFavoritePress = () => {
    setIsFavorited(!isFavorited);
  };

  const handleSharePress = () => {
  };

  const handleGoToSource = () => {
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-undo-sharp" size={wp('7%')} color="black" />
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSharePress} style={styles.button}>
              <Icon name="share-social-sharp" size={wp('7%')} color="black" />
            </TouchableOpacity>
            <View style={{ width: wp('3%') }} />
            <TouchableOpacity onPress={handleFavoritePress} style={styles.button}>
              <Icon name={isFavorited ? "star" : "star-outline"} size={wp('7%')} color={isFavorited ? "gold" : "black"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: newsItem.urlToImage || 'https://picsum.photos/200' }} style={styles.image} />
        <Text style={styles.publishedAt}>{formatDate(newsItem.publishedAt)}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{newsItem.title}</Text>
        <Text style={styles.description}>{newsItem.description}</Text>
      </View>
      <View style={styles.sourceInfo}>
        <Text style={styles.sourceText}>{newsItem.author}</Text>
      </View>
      <TouchableOpacity onPress={handleGoToSource} style={styles.sourceButton}>
        <Text style={styles.sourceButtonText}>Go to News Source</Text>
      </TouchableOpacity>      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginTop: hp('5%'), 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: wp('2%'),
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: wp('2%'),
  },
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: wp('4%'),
    marginVertical: hp('1%')
  },
  image: {
    width: wp('91%'), 
    height: hp('33%'),
    resizeMode: 'cover',
    borderRadius: 8,
  },
  publishedAt: {
    color: '#888',
    fontSize: wp('4%'),
    position: 'absolute',
    top: hp('34%'),
    right: wp('1%'),
  },
  content: {
    paddingHorizontal: wp('4%'), 
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginTop: hp('5%'),
  },
  description: {
    marginTop: hp('2%'),
    fontSize: wp('4%'),
    lineHeight: hp('3%'),
  },
  sourceButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    marginHorizontal: wp('27%'),
    borderRadius: wp('4%'),
    marginTop: 'auto',
    marginBottom: hp('3%'),
    borderWidth: wp('0.1%'),
    borderColor: 'black',
    borderRadius: wp('10%'),
  },
  sourceButtonText: {
    color: 'black',
    fontSize: wp('3.5%'),
    textDecorationLine: 'underline',
  },
  sourceInfo: {
    paddingHorizontal: wp('4%'),
    paddingTop: hp('3%'),
  },
  sourceText: {
    fontSize: wp('4%'),
    color: '#888',
    marginBottom: hp('1%'),
  },
});
