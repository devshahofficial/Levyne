import React from 'react';
import { Text, View, TouchableOpacity, Colors, Image } from 'react-native-ui-lib';

export default class BlogContent extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity marginR-20 marginV-20 activeOpacity={0.8} style={{ borderWidth: 1, borderColor: Colors.grey60 }}
                onPress={() => this.props.Navigation(this.props.PostID, this.props.Headline, this.props.Image, this.props.Timestamp)}
            >
                <Image style={{ width: 370, height: 250, alignSelf: 'center' }} source={{ uri: this.props.Image }} />
                <View spread paddingH-10>
                    <View flex spread>
                        <Text secondary hb1 marginT-5 marginH-5>{this.props.Headline}</Text>
                        <Text secondary h2 marginB-10 marginH-5>{this.props.Timestamp}</Text>
                    </View>
                    <Text h2 primary marginH-5 marginB-10 bottom>Read More {'>>>'}</Text>
                </View>
            </TouchableOpacity>
        );
    }

};
