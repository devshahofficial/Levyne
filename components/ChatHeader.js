import React from 'react';
import {StyleSheet,Dimensions} from 'react-native';
import {Avatar, Text, View, Colors, TouchableOpacity} from 'react-native-ui-lib';
import {BackArrowIcon} from "../Icons/BackArrowIcon";

export default class ChatHeader extends React.PureComponent {

    renderStatus(BucketStatus) {
        switch(BucketStatus) {
            case 0:
                return 'Added to cart, price not decided';
            case 1:
                return 'Price Decided, but order not placed';
            case 2:
                return 'Order Placed, Order Status available';
        }
    }

    render() {
        
        return (
            <>
                <View row center style={styles.container}>
                    <TouchableOpacity marginL-10 onPress={this.props.NavigateBack}><BackArrowIcon/></TouchableOpacity>
                    <TouchableOpacity style={styles.avatarView} onPress={this.props.NavigateBrandProfile}>
                        <Avatar
                            source={this.props.imageSource}
                            label={this.props.initials}
                            containerStyle={styles.avatar}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textView} onPress={this.props.NavigateBucket}>
                        <Text hb1>{this.props.Name}</Text>
                        <Text secondary h3>Bucket ID: {this.props.BucketID}</Text>
                    </TouchableOpacity>
                </View>
                <View center style={styles.Header}>
                    <Text hb2>{this.renderStatus(this.props.Status)}</Text>
                </View>

            </>
        )
    }
}

const deviceWidth = Dimensions.get("screen").width;
const styles = StyleSheet.create({
    container: {
        width: deviceWidth,
        height: 60,
    },
    avatarView: {
        flex: 0.2,
        marginLeft:5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textView:{
        flex:0.9,
        marginLeft:20,
    },
    Header: {
        backgroundColor: Colors.shadow,
        height: 40
    }
})

