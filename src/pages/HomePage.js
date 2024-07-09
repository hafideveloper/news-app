import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchNews, getCategory } from '../../helpers/NewsApi'; 
import Loading from '../components/Loading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
  const { data: news, isLoading, isError } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const navigation = useNavigation();

  const categories = ['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

  const handleNewsDetail = (item) => {
    navigation.navigate('NewsDetail', { newsItem: item });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.toLowerCase());
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
        formatDate(item.publishedAt).toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedCategory || getCategory(item).toLowerCase() === selectedCategory)
  );

  if (isLoading) return <Loading />;
  if (isError) return <Text>Error fetching news</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={hp('3%')} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search news..."
        />
      </View>
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryItem,
                selectedCategory === category.toLowerCase() && styles.selectedCategoryItem,
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.toLowerCase() && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={filteredNews}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.newsList}
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
    marginHorizontal: wp('2%'),
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
    marginBottom: hp('0.5%'),
  },
  description: {
    fontSize: hp('1.8%'),
    flexWrap: 'wrap',
    marginBottom: hp('0.5%'),
  },
  sourceName: {
    fontSize: hp('1.8%'),
    color: '#888',
  },
  publishedAt: {
    fontSize: hp('1.6%'),
    color: '#aaa',
    marginBottom: hp('0.5%'),
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
    marginTop: hp('3%'),  
  },
  searchIcon: {
    marginRight: wp('2%'),
  },
  searchInput: {
    flex: 1,
    height: hp('5%'),
    color: '#333',
  },
  categoryContainer: {
    marginHorizontal: wp('2%'), 
  },
  categoryScrollView: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('1%'), 
  },
  categoryItem: {
    paddingHorizontal: wp('3%'),
    borderRadius: wp('5%'),
    backgroundColor: '#e0e0e0',
    marginHorizontal: wp('1%'),
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategoryItem: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: hp('2%'),
    color: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  newsList: {
    paddingHorizontal: wp('2%'),
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
