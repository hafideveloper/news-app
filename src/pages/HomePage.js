import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchNews } from '../../helpers/NewsApi';
import Loading from '../components/Loading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function HomePage() {
  const { data: news, isLoading, isError } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  });

  const handleNewsDetail = (item) => {
  };

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

  if (isLoading) return <Loading />;
  if (isError) return <Text>Error fetching news</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sortedNews}
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
