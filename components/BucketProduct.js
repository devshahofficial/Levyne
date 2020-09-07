import React from 'react';
import {StyleSheet, Image, Dimensions, Platform} from 'react-native';
import { View,TouchableOpacity, Text, Colors} from 'react-native-ui-lib';
import {ArchiveIcon} from "../Icons/ArchiveIcon";
import ShadowView from "react-native-simple-shadow-view";

export default class BucketProduct extends React.PureComponent {
    render() {
        return (
            <ShadowView style={styles.View}>
                <View flex row centerH style={{height:150}}>
                    <View flex paddingH-10>
                        <Image
                            style={{flex:1}}
                            source={{uri: this.props.item.ProductImage}}
                        />
                    </View>
                    <View flex paddingH-10>
                        <View>
                            <Text hb1 secondary>Total Cost</Text>
                            <View row>
                                <Text hb1 primary>₹{this.props.item.DiscountPrice}</Text>
                                <Text marginL-10 h2 secondary style={{textDecorationLine: "line-through"}}>₹{this.props.item.ActualPrice}</Text>
                            </View>
                        </View>
                        <View marginT-10>
                            <Text hb1 secondary>Size</Text>
                            <View marginT-5 center style={{borderRadius:5,height:40,borderColor:Colors.shadow, borderWidth:1}}>
                                <Text hb1 primary>M</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View flex marginT-20 center>
                    <Image
                        style={{height: 50,width: Dimensions.get('window').width-20, borderRadius:5}}
                        source={{uri:"https://i.pinimg.com/originals/57/94/c0/5794c0fb7415d0143969add7a10735d1.png"}}
                    />
                </View>

                <View flex marginV-20>
                    <View row>
                        <Text flex hb2 secondary>Quantity</Text>
                        <Text flex-2 h1>1</Text>
                    </View>
                    <View row>
                        <Text flex hb2 secondary>Fabric used</Text>
                        <Text flex-2 h1>2 meters</Text>
                    </View>
                </View>

                <TouchableOpacity center marginB-5 style={styles.TouchableOpacity}>
                    <Text h2 secondary flex-15>Visit the product</Text>
                    <Text h2 secondary flex>{">"}</Text>
                </TouchableOpacity>
                <TouchableOpacity center marginT-5 marginB-15 style={styles.TouchableOpacity}>
                    <Text h2 secondary flex-15>Visit the Fabric</Text>
                    <Text h2 secondary flex>{">"}</Text>
                </TouchableOpacity>
                <View style={{justifyContent: "flex-end"}}>
                    <TouchableOpacity activeOpacity={0.8} center style={{width:35, height:35, backgroundColor:"#FF0000", borderRadius:5}}>
                        <ArchiveIcon Size={20} Color={Colors.white}/>
                    </TouchableOpacity>
                </View>
            </ShadowView>
        );
    }
}

const styles = StyleSheet.create({
    View: {
        borderRadius: 10,
        borderColor: Colors.shadow,
        borderWidth: 1,
        padding: 10,
        margin:10,
        marginTop:15,
        shadowColor: Colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {width: 0,height: 0},
        backgroundColor: Colors.white,
    },
    TouchableOpacity: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.shadow,
        flexDirection: "row",
        paddingHorizontal: 15
    }
});
