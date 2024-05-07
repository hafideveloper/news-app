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

  const handleNewsDetail = (item) => {};

  const renderNewsItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleNewsDetail(item)} style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {item.title.length > 50 ? item.title.slice(0, 50) + '...' : item.title}
          </Text>
          <Text style={styles.publishedAt}>{formatDate(item.publishedAt)}</Text>
          <Text style={styles.author}>{item.author}</Text>
        </View>
        <Image 
        source={{ uri: item.urlToImage || 'https://picsum.photos/150' }} 
        style={styles.image} 
        />
      </View>
    </TouchableOpacity>
  );

  const sortedNews = news ? news.slice().sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)) : [];

  const filteredNews = sortedNews.filter(item => 
  item &&
  item.title &&
  item.author &&
  item.publishedAt &&
  (
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    formatDate(item.publishedAt).toLowerCase().includes(searchQuery.toLowerCase())
  )
);


  if (isLoading) return <Loading />;
  if (isError) return <Text>Error fetching news</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
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
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: wp('45%'),
    height: hp('15%'),
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  author: {
    fontSize: hp('1.8%'),
    color: '#888',
    marginBottom: hp('1%'),
  },
  publishedAt: {
    fontSize: hp('1.6%'),
    color: '#aaa',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
});

function formatDate(isoDate) {
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, options);
}
