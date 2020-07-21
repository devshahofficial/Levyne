import React from 'react';
import { StyleSheet,ScrollView} from 'react-native'
import {Button, Text, View,Colors } from 'react-native-ui-lib';
import CstmShadowView from '../components/CstmShadowView';
import NavBarBack from '../components/NavBarBack';
import {StarIcon} from '../Icons/StarIcon';

const Stars = (props) => {
    let i;
    const stars = [];
    for(i = 0; i<props.BrandRating; i++)
    {
        stars.push(true);
    }
    for(i = props.BrandRating; i<5; i++)
    {
        stars.push(false);
    }
    return (
        stars.map((name, i) => {
            return (<StarIcon Fill={name} height={15} width={15} Color={Colors.primary}/>);
        })
    );
}
export default ToBeDesignedDetailed = (props) => {
  return (
      <>
          <NavBarBack Title={'product'} Navigation={props.navigation.goBack}/>
          <ScrollView style={styles.CardStyle} showsVerticalScrollIndicator={false}>
              <View style={{backgroundColor:Colors.dark70,height:300}}></View>
              <View paddingH-10 marginT-10>
                  <Text hb1>Women's Cotton Shirt</Text>
                  <Text h2 secondary>Lorem ipsum dolor sit amet,consectetur</Text>
                  <View>
                      <Stars BrandRating={Math.round(this.props.BrandRating)} />
                      <Text h3 secondary marginL-15>500 ratings</Text>
                  </View>
                  <View marginT-10 row bottom>
                      <Text h1>$200</Text>
                      <Text h3 secondary marginL-5 style={{textDecorationLine:'line-through'}}>$500</Text>
                      <Text hb1 primary marginL-10>30%</Text>
                  </View>
                  <View row marginB-10 centerV>
                      <Text flex h1>Size : M</Text>
                      <CstmShadowView>
                          <Button
                              label='Guide'
                          />
                      </CstmShadowView>
                  </View>
                  <Text h1 marginT-20>Product Status</Text>
                  <CstmShadowView>
                      <Button
                          label='Production Started'
                      />
                  </CstmShadowView>
                  <CstmShadowView>
                      <Button
                          label='Production Completed'
                      />
                  </CstmShadowView>
                  <CstmShadowView style={{marginBottom:20}}>
                      <Button
                          label='Product Handed Over'
                      />
                  </CstmShadowView>
              </View>
          </ScrollView>
      </>
  );
}

const styles = StyleSheet.create({
  headerText: {
    paddingTop: 20,
    marginLeft: 10,
    marginRight: 100,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#06154C'
  },
  text: {
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: 25,
    color: '#A5B5C9',
    paddingBottom: 10,
  },
  button: {
    height: 40,
    width: 200,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    margin: 3,
    flex:1
  },
  AboutText: {
    marginLeft: 10,
    textAlign: 'left',
    marginRight: 150,
    paddingBottom: 10,
    fontSize: 15,
    color: '#06154C'

  },
  cardlayout: {
    paddingLeft: 10,
    shadowColor: '#E7EAF0',
    shadowOpacity: 1,
    backgroundColor: '#FFFFFF',
    shadowRadius: 6,
    margin:10,
    shadowOffset:{width:5 , height:5}
  },
  starlayout: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignContent:'center',
    alignItems:'center'
  },
  headerImage: {
    marginTop: 15,
    height: 150,
    width: 150,
    flex: 1
  },
  CardStyle: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    flex: 1
  },
  partfour: {
    backgroundColor: '#FFFFFF',
    height: 40,
    justifyContent: 'center',
    shadowColor: '#E7EAF0',
    shadowOpacity: 2,
    shadowRadius: 3,
    shadowOffset: { width: 3, height: 3 },
    marginLeft: 10,
    marginRight: 10,
    borderRadius:40,
    width:100,
    alignSelf:'flex-end'
  },
  partThree: {
    backgroundColor: '#FFFFFF',
    height: 60,
    justifyContent: 'center',
    shadowColor: '#E7EAF0',
    shadowOpacity: 2,
    shadowRadius: 3,
    shadowOffset: { width: 3, height: 3 },
    marginLeft: 10,
    marginRight: 10,
    borderRadius:40,
    marginBottom:15
  },

});



