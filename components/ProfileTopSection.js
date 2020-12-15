import React from 'react';
import { StyleSheet} from 'react-native';
import {View,Text,Avatar,TouchableOpacity} from 'react-native-ui-lib';

export default class ProfileTopSection extends React.PureComponent {

    constructor(props){
        super(props);
    }
    render() {
        return (

            <View row marginT-15>
                <View marginL-5 center style={styles.avatarView}>
                    <Avatar
                        size={100}
                        source={{uri : this.props.ProfileImage}}
                    />
                </View>

                <View style={styles.threeBoxes} margin-4 center>
                    <Text f1 paddingV-4 center style={{lineHeight:22}}>{this.props.TotalProducts}</Text>
                    <Text h3 paddingV-4 center grey30>Products</Text>
                </View>

                <TouchableOpacity style={styles.threeBoxes} margin-4 center onPress={this.props.navigateFollowings}>
                    <Text f1 paddingV-4 center style={{lineHeight:22}}>{this.props.Followings}</Text>
                    <Text h3 paddingV-4 center grey30>Following</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.threeBoxes} margin-4 center>
                    <Text f1 paddingV-4 center style={{lineHeight:22}}>{this.props.Followers}</Text>
                    <Text h3 paddingV-4 center grey30>Followers</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    avatarView:{
        flex: 0.35,
        justifyContent:'center',
    },
    threeBoxes: {
        flex: 0.2,
    },

})

