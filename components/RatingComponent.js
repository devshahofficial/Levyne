import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { Icon } from '@ui-kitten/components';
import colors from "../assets/colors";
import Stars from '../components/StarIconsComponent';

export default class RatingComponent extends React.PureComponent{
    constructor(props) {
        super(props);
        var d = new Date(this.props.Timestamp);
        const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
        this.date = d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
    }
    
    render() {
        return (
            <View style={styles.Main}>
                <View style={styles.Ratings}>
                    <View style={styles.ImageView}>
                        <Icon name='person' width={50} height={50} fill={colors.trivisionPink}/>
                        {/*<Image source={require('../assets/images/img3.jpg')} style={styles.ImageStyle}
                        />*/}
                    </View>
                    <View style={styles.Text}>
                        <Text style={styles.name}>
                            {this.props.Name}
                        </Text>
                        <Text style={styles.date}>
                            {this.date}
                        </Text>
                    </View>
                    <View style={styles.Star}>
                        <Stars rating={this.props.Ratings} />
                    </View>
                </View>
                <View style={styles.Review}>
                    <Text style={styles.ReviewText}>
                        {this.props.Review}
                    </Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    Main:{
        marginTop:20,
        marginLeft:10,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    ImageView:{
        flex:2
    },
    ImageStyle: {
        height: 50,
        width: 50,
        borderRadius: 80
    },
    Text:{
        flexDirection: 'column',
        flex:6,

    },
    name:{
        color:colors.trivisionBlue,
        fontWeight:'bold',
        fontSize:14
    },
    date:{
        color:colors.trivisionGrey,
        fontSize:12
    },
    Star:{
        flexDirection:'row',
        flex:2
    },
    Review:{
        flex:1,
        justifyContent:'center',
        marginTop:10,
        paddingRight:10,
    },
    Ratings:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    ReviewText:{
        alignSelf:'center'
    }
})
