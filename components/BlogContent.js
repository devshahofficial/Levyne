import React from 'react';
import {Text,View,TouchableOpacity,Colors, Image} from 'react-native-ui-lib';

export default class BlogContent extends React.PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <TouchableOpacity marginR-20 marginV-20 activeOpacity={0.8} style={{borderWidth:1,borderColor:Colors.grey60}}
                onPress={() => this.props.Navigation(this.props.Headline, this.props.Content, this.props.ImageBig, this.props.Published)}
            >
                <Image style={{width:370,height:250,alignSelf:'center'}} source={{uri:this.props.Image}}/>
                <View spread paddingH-10>
                     <Text secondary h1 marginV-10 marginH-5>{this.props.Headline}</Text>
                     <Text h3 primary marginB-10 bottom>Read More {'>>>'}</Text>
                 </View>
            </TouchableOpacity>
        );
    }

};
