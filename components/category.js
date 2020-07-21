import React from 'react';
import { ImageBackground, StyleSheet,TouchableWithoutFeedback } from 'react-native';
import {View,Text} from 'react-native-ui-lib';

export default class Category extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.categoryContainer} centerV centerH>
                <TouchableWithoutFeedback onPress={() => {
                    this.props.NavigateCategorySearch(this.props.CategoryID);
                }}>
                    <View style={styles.shadow} centerH centerV>
                        <ImageBackground
                            opacity={1}
                            style={styles.ImageContainer}
                            imageStyle={styles.Image}
                            level={2}
                            source={{uri:this.props.source}}
                        >
                            <Text style={styles.Text} level={1} white b1>{this.props.CategoryTitle} </Text>
                        </ImageBackground>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    categoryContainer: {
        marginHorizontal:10,
        marginTop: 10,
        width:210,
        height:85,
        borderRadius:15,
        flex:1
    },
    Text: {
        zIndex: 1,
        alignSelf: 'center'
    },
    shadow: {
        borderRadius: 20,
        height:'85%',
        width:'95%',
    },
    ImageContainer: {
        width: '100%',
        height: '100%',
        flex:1,
        zIndex:2,
        justifyContent:'center',
    },
    Image: {
        borderRadius:10
    },
});
