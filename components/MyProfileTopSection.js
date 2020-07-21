import React from 'react';
import { StyleSheet} from 'react-native';
import {View,Text,Avatar,TouchableOpacity} from 'react-native-ui-lib';

export default class ProfileTopSection extends React.PureComponent {

    constructor(props){
        super(props);
    }
    render() {
        return (

            <View style={{ flexDirection: 'row' }}>
                <View marginL-5 center style={styles.avatarView}>
                    <Avatar
                        size={100}
                        source={{uri : this.props.ProfileImage}}
                    />
                </View>

                <View style={styles.threeBoxes} margin-4 center>
                    <Text f1 paddingV-4 center>{parseFloat(this.props.BrokerRating).toFixed(1)}</Text>
                    <Text h3 paddingV-4 center grey30>Ratings</Text>
                </View>

                <TouchableOpacity style={styles.threeBoxes} margin-4 center>
                    <Text f1 paddingV-4 center>{this.props.Clients}</Text>
                    <Text h3 paddingV-4 center grey30>Clients</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.threeBoxes} margin-4 center>
                    <Text f1 paddingV-4 center>{this.props.Followings}</Text>
                    <Text h3 paddingV-4 center grey30>Following</Text>
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

