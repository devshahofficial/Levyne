import React, { useState } from 'react';
import { Image, StyleSheet, FlatList } from 'react-native'
import {View,Text,TouchableOpacity} from'react-native-ui-lib';
import StarIconsComponent from "./StarIconsComponent";

export const FashionDesignerlist = () => {
  const [data] = useState([{
    image: 'https://images-na.ssl-images-amazon.com/images/I/81TwqU4-ZdL._UL1500_.jpg',
    des: 'Louren nasfnononlmzcmvp kdsanoivnanpv oajvpob oanvnbam',
    prodname: 'Shoes',
    Heart:true
  },
  {
    image: 'https://images-na.ssl-images-amazon.com/images/I/81TwqU4-ZdL._UL1500_.jpg',
    des: 'Louren nasfnononlmzcmvp kdsanoivnanpv oajvpob oanvnbam',
    prodname: 'Shoes',
    Heart:true
  },
  {
    image: 'https://images-na.ssl-images-amazon.com/images/I/81TwqU4-ZdL._UL1500_.jpg',
    des: 'Louren nasfnononlmzcmvp kdsanoivnanpv oajvpob oanvnbam',
    prodname: 'Shoes',
    Heart:true
  }])

  return (

    <View marginB-10 flex>
      <FlatList
        data={data}
        renderItem={({ item }) =>
        <TouchableOpacity activeOpacity={0.6} row paddingL-10 marginB-10 flex>
            <View>
              <Image
                style={styles.headerImage}
                source={{ uri: item.image }}
              />
            </View>
            <View>
              <Text hb1 style={styles.headerText}>
                {item.prodname}
              </Text>
              <Text h2 grey40 marginL-10 marginR-200 left>{item.des}</Text>
              <View row flex marginT-10 paddingL-10>
                <StarIconsComponent BrandRating={Math.round(item.ratings)} />
              </View>
            </View>
        </TouchableOpacity>
        }
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    paddingTop: 20,
    marginLeft: 10,
    marginRight: 100,
  },
  headerImage: {
    height: 150,
    width: 150,
    flex:1
  },

});

