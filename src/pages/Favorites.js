import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

export default function Favorites() {
  const navigation = useNavigation(); 

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false }); 
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Favorites</Text>
    </View>
  );
}
