import React, { Component } from 'react';
import {StyleSheet, Image,FlatList} from 'react-native';
import { View,Text,Colors } from 'react-native-ui-lib';


export default class TopDesigners extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View paddingL-15 marginT-25>
                <Text hb1 secondary marginB-15>Recent Uploads from your following</Text>
                <FlatList
                    data={this.props.Data} horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.View}>
                            <Image
                                id={item.id}
                                source={item.source}
                                style={styles.Image}
                            />
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    Image: {
        width:'80%',
        height:'80%',
        resizeMode:'cover',
        borderRadius:100,
        borderWidth:3,
        borderColor:Colors.shadow
    },
    View:{
        height:120,
        width:120,
    }

});
