import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Dimensions} from 'react-native';
import {View, Text, Image, TouchableOpacity, Button} from 'react-native-ui-lib';
import {FlatList} from 'react-native';
import {StarIcon} from '../Icons/StarIcon';

export default class BucketComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        width={Dimensions.get('window').width}
        style={{flexDirection: 'column'}}>
        <TouchableOpacity>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', padding: 10}}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 70 / 2,
                }}
                blurRadius={3}
                source={{
                  uri:
                    'https://bamfstyle.files.wordpress.com/2017/11/scarf32fancy-main.jpg',
                }}></Image>
              <View style={{flexDirection: 'row', padding: 10}}>
                <Text>Name</Text>
              </View>
              <View style={{flexDirection: 'row', padding: 25}}>
                <Text>Stars</Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', padding: 15}}>
            <Image
              style={{
                width: 140,
                height: 140,
              }}
              blurRadius={2}
              source={{
                uri:
                  'https://bamfstyle.files.wordpress.com/2017/11/scarf32fancy-main.jpg',
              }}></Image>
            <View style={{padding: 10}}>
              <Text> Total</Text>
              <Text> Discount</Text>
              <View style={{padding: 10}}></View>
              <View style={{padding: 10}}></View>
              <Button label="Checkout" enableShadow={true}></Button>
            </View>
          </View>
        </TouchableOpacity>
        <View backgroundColor="grey" style={{padding: 10}}></View>
        <View backgroundColor="grey">
          <Text center>Free Delivery</Text>
        </View>
        <View backgroundColor="grey" style={{padding: 10}}></View>
      </View>
    );
  }
}
