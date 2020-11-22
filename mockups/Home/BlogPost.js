import React from 'react';
import {Text, View, AnimatedImage, Colors} from 'react-native-ui-lib';
import { StyleSheet, Dimensions, ScrollView} from 'react-native';
import NavBarBack from "../../components/NavBarBack";
const deviceHeight = Dimensions.get("window").height;

export default class BlogPost extends React.PureComponent {
    constructor(props){
        super(props);
        this.Time = new Date(this.props.route.params.Published);
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={"The trendiest topics"}/>
                <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                    <AnimatedImage
                        style={styles.pic}
                        source={{uri:this.props.route.params.Image}}
                    />
                    <View paddingH-20>
                        <Text style={styles.heading}>
                            {this.props.route.params.Title}
                        </Text>
                        <Text style={styles.time}>
                            {this.Time.toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true })}
                        </Text>
                    </View>
                    <View padding-20>
                        {this.props.route.params.Content.map((item, index) =>
                            <Text key={index.toString()} h1 style={styles.text}>{item}</Text>
                        )}
                    </View>
                    {/* </ScrollView> */}
                </ScrollView>
            </>
        );
    }

};

const styles = StyleSheet.create({
    pic: {
        padding:0,
        margin:0,
        height: deviceHeight/3,
    },
    heading: {
        paddingTop:15,
        fontSize: 27,
        textAlign: 'left',
        lineHeight: 37,
    },
    time:{
        paddingTop:15,
        paddingBottom:5,
        fontSize:15,
        color:Colors.primary,
    },
    date:{
        color:Colors.primary
    },
    text: {
        color: Colors.secondary,
        textAlign: 'justify',
        lineHeight: 30,
        marginBottom: 20
    },

});

