import React from 'react';
import {Image, StyleSheet} from 'react-native';
import colors from "../assets/colors";
import ShadowView from "react-native-simple-shadow-view";
import {View, Text} from 'react-native-ui-lib';

export default class ProductMessage extends React.PureComponent {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View marginL-10 marginR-10>
                <ShadowView style={styles.ShadowView}>
                    <Image style={styles.Image} source={{uri : this.props.ProductImage}}/>
                    <View flex marginL-10>
                        <Text hb1>
                             {this.props.ProductName}
                        </Text>
                        <Text h2 marginB-4 secondary>
                            {this.props.ProductShortDescription}
                        </Text>
                        <Text hb2 primary>${this.props.ProductPrice}</Text>
                    </View>
                </ShadowView>
                <Text h2 primary>
                    We are interested in this deal.
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    ShadowView:{
        width:280,
        marginTop:10,
        borderRadius:20,
        shadowColor: colors.trivisionShadow,
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {width: 0,height: 3},
        backgroundColor: colors.trivisionWhite,
        flexDirection:'row'
    },
    Image:{
        height:100,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        width:100,
        justifyContent:'flex-end'
    },
    Star: {
        flexDirection: 'row',
        marginRight: 15,
    },
})

