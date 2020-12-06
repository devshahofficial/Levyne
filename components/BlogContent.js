import React from 'react';
import { Text, View, TouchableOpacity, Colors, Image } from 'react-native-ui-lib';
import CstmShadowView from "./CstmShadowView";

export default class BlogContent extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CstmShadowView style={{height:'auto', width:'auto', borderRadius:10, padding:10, margin:10}}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.props.Navigation(this.props.PostID, this.props.Headline, this.props.Image, this.props.Timestamp)}
                >
                    <Image
                        style={{ width: 370, height: 250, alignSelf: 'center', marginTop:10, borderTopLeftRadius:10, borderTopRightRadius:10 }}
                        source={{ uri: this.props.Image }}
                    />
                    <Text secondary hb1 marginT-5>{this.props.Headline}</Text>
                    <Text secondary h2 marginB-10>{this.props.Timestamp}</Text>
                    <Text h2 primary marginB-10 bottom>Read More {'>>>'}</Text>
                </TouchableOpacity>
            </CstmShadowView>
        );
    }

};
