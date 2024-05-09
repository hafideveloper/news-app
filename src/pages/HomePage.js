import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchNews } from '../../helpers/NewsApi';
import Loading from '../components/Loading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

export default function HomePage() {
  const { data: news, isLoading, isError } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleNewsDetail = (item) => {
    navigation.navigate('NewsDetail', { newsItem: item });
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleNewsDetail(item)} style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {item.title.length > 45 ? item.title.slice(0, 45) + '...' : item.title}
          </Text>
          <Text style={styles.description}>
            {item.description && item.description.length > 50
              ? item.description.slice(0, 50) + '...'
              : item.description}
          </Text>
          <Text style={styles.publishedAt}>{formatDate(item.publishedAt)}</Text>
          <Text style={styles.sourceName}>{item.source.name}</Text>
        </View>
        <Image source={{ uri: item.urlToImage || 'https://picsum.photos/150' }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  const sortedNews = news ? news.slice().sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)) : [];

  const filteredNews = sortedNews.filter(
  (item) =>
    item &&
    item.title &&
    item.source.name && 
    item.publishedAt &&
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formatDate(item.publishedAt).toLowerCase().includes(searchQuery.toLowerCase()))
);

  if (isLoading) return <Loading />;
  if (isError) return <Text>Error fetching news</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <Icon name="search" size={hp('3%')} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search news..."
        />
      </View>
      <FlatList 
      data={filteredNews} 
      renderItem={renderNewsItem} 
      keyExtractor={(item, index) => index.toString()} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: wp('4%'), 
    marginVertical: hp('1%'), 
    padding: wp('3%'), 
    borderRadius: wp('5%'), 
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, 
  },
  image: {
    width: wp('30%'),
    height: hp('15%'),
    borderRadius: wp('3%'),
    marginLeft: wp('1%'), 
  },
  textContainer: {
    flex: 1, 
    marginRight: wp('1%'), 
  },
  title: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    flexWrap: 'wrap',
    marginBottom: hp('0.5%') 
  },
  description: {
    fontSize: hp('1.8%'),
    flexWrap: 'wrap', 
    marginBottom: hp('0.5%') 
  },
  sourceName: {
    fontSize: hp('1.8%'),
    color: '#888',
  },
  publishedAt: {
    fontSize: hp('1.6%'),
    color: '#aaa',
    marginBottom: hp('0.5%') 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: wp('2%'), 
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: wp('10%'), 
    paddingHorizontal: wp('2%'), 
    marginHorizontal: wp('4%'), 
  },
  searchIcon: {
    marginRight: wp('2%'),
  },
  searchInput: {
    flex: 1,
    height: hp('5%'),
    color: '#333',
  },
});

function formatDate(isoDate) {
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, options);
}
