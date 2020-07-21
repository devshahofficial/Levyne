import React from 'react';
import { Text, View, StyleSheet, LayoutAnimation, Platform, UIManager, TouchableOpacity, FlatList } from 'react-native';
import {Icon} from '@ui-kitten/components';
import colors from "../assets/colors";
import RatingComponent from '../components/RatingComponent';
import getReviews from '../API/GetReviews';

export default class RatingsAndReviews extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            RatingList : []
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if(!this.state.expanded)
        {
            getReviews(this.props.productID, 1, this.props.Token).then((resp) => {
                this.setState({
                    expanded: true,
                    RatingList: resp
                });
            }).catch(() => {
                this.setState({
                    expanded: true,
                    RatingList: []
                });
            });
        }
        else
        {
            this.setState({
                expanded: false
            });
        }
    }

    _listEmptyComponent = () => {
        return (
            <View>
                <Text style={{paddingLeft:10}}>No Ratings</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.btnTextHolder}>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={styles.Btn}>
                        <View style={{justifyContent: 'center',flexDirection:'row'}}>
                            <Text style={{fontSize:16, color:colors.trivisionBlue, flex:9}}>
                                Ratings And Reviews
                            </Text>
                            <Icon
                                name={this.state.expanded ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'}
                                width={24} height={24}
                                fill={colors.trivisionBlue}
                                style={{flex:1}}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.expanded ? null : 0, overflow: 'hidden' }}>
                        <FlatList
                            ref={(ref) => { this.flatListRef = ref; }}
                            data={this.state.RatingList}
                            ListEmptyComponent = {this._listEmptyComponent}
                            renderItem={({ item }) => (
                                <RatingComponent
                                    Name = {item.Name}
                                    Ratings = {item.Ratings}
                                    Review = {item.Review}
                                    Timestamp = {item.Timestamp}
                                />
                            )}
                            initialNumToRender={5}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        marginTop:50
    },

    text: {
        fontSize: 17,
        color: 'black',
        padding: 10
    },

    btnText: {
        textAlign: 'center',
        color: colors.trivisionWhite,
        fontSize: 20
    },

    btnTextHolder: {
        borderWidth: 1,
        borderColor:colors.trivisionWhite,
    },

    Btn: {
        padding: 10,
        backgroundColor: colors.trivisionWhite,
        elevation:1,
        borderColor: colors.trivisionWhite
    }
});
