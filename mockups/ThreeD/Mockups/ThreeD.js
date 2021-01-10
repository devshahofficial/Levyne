import React, { Component } from 'react';
import {StyleSheet, FlatList, SafeAreaView, Linking} from 'react-native';
import {Colors, Text, TouchableOpacity, View, AvatarHelper} from "react-native-ui-lib";
import UpperComponent from '../Components/UpperComponent'
import NavBarBack from "../../../components/NavBarBack";
import WebView from "react-native-webview";
import Models from '../../../assets/3DModels';
import {CallIcon} from "../../../Icons/CallIcon";

export default class NewScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upperSelected: 0,
            lowerSelected: 0
        }

        this.Category = this.props.route.params.Category

        if(this.Category) {
            this.URL3DModelBase = `https://3d.levyne.com/${this.Category}/`;
            this.Model = Models[this.Category];
        } else {
            this.goBack();
        }
    }


    onUpperPressed = (selectedIndex) => {
        this.setState({ upperSelected: selectedIndex })
    }

    onLowerPressed = (selectedIndex) => {
        this.setState({ lowerSelected: selectedIndex })
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    renderItem = ({ item, index }) => (
        <UpperComponent
            item={item}
            index={index}
            selected={this.state.upperSelected}
            onUpperPressed={this.onUpperPressed}
        />
    )

    NavigateChat = () => {

        Linking.openURL('tel:+91 9819 077182').catch(err => {});

        /*
        this.props.navigation.push('ChatWhenNoBucketID', {
            Name: 'Levyne',
            Status: 0,
            BrandID: 331,
            OrderID: 0,
            imageSource: {uri: "https://d9n1pxcc9f1lk.cloudfront.net/2020-08-27-8644b95539d387260384ca234650829d12e87501a602b16a37a2f7d7258a2af0.webp"},
            initials: AvatarHelper.getInitials('Levyne')
        })
        */
    }

    render() {
        return (
            <>
                <NavBarBack Title={"Design 3D here!"} Navigation={this.goBack} />
                <SafeAreaView style={{flex: 1}}>
                    <View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            style={styles.FlatList}
                            data={this.Model.items}
                            horizontal={true}
                            renderItem={this.renderItem}
                            keyExtractor={item => item}
                        />
                    </View>

                    <WebView source={{ uri: this.URL3DModelBase + this.Model.items[this.state.upperSelected] }}/>
                    <TouchableOpacity
                        style={{height:50, backgroundColor: Colors.primary}} center
                        onPress={this.NavigateChat} row
                    >
                        <CallIcon Size={18} Color={Colors.white}/>
                        <Text h1 white marginL-20>Call us for product enquire</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </>
        )

    }
}

const styles = StyleSheet.create({
    FlatList: {
        marginTop: 10,
        paddingLeft: 20,
    },
})

