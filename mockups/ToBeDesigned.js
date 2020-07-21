import React from 'react';
import { FlatList, StyleSheet } from 'react-native'
import {View, TouchableOpacity,Text, Colors, Button} from 'react-native-ui-lib';
import CstmShadowView from '../components/CstmShadowView';
import TextNavBar from '../components/TextNavBar';

const data = [];

export default class ToBeDesigned extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BackgroundColor : Colors.white,
      TextColor : Colors.primary,
      Close : false,
    }
  }

  render() {
    return (
        <>
          <TextNavBar Title={'Orders'}/>
          <TouchableOpacity
              style={[styles.button, {backgroundColor : this.state.BackgroundColor}]}
              onPress = {() => {
                this.setState({
                  BackgroundColor : this.state.TextColor,
                  TextColor : this.state.BackgroundColor,
                  Close : !this.state.Close
                })
              }}
          >
            <Text h1 style={{color : this.state.TextColor}}>{this.state.Close === true ? 'Start taking orders.' : 'Stop taking orders.'}</Text>
          </TouchableOpacity>
          <View flex>
            <FlatList
                data = {data}
                renderItem = { ({item , index}) =>
                    <CstmShadowView style={{marginBottom: 10, borderRadius: 10, marginHorizontal:10, justifyContent: 'center'}}>
                      <TouchableOpacity
                          row paddingL-10 centerV
                          onPress={() => this.props.navigation.navigate('ToBeDesignedDetailed')}
                      >
                        <Text b2>Order ID : {item.orderId}</Text>
                      </TouchableOpacity>
                    </CstmShadowView>

                }
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                  <View flex centerV centerH style={{height:630}} paddingH-40>
                    <Text center b1 grey40>No orders received.</Text>
                  </View>
                }
            />
          </View>
        </>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
})
