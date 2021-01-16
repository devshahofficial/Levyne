import React, { Component } from 'react';
import {StyleSheet, FlatList, SafeAreaView, Linking, ActivityIndicator} from 'react-native';
import {Colors, Text, TouchableOpacity, View, AvatarHelper} from "react-native-ui-lib";
import UpperComponent from '../Components/UpperComponent'
import NavBarBack from "../../../components/NavBarBack";
import WebView from "react-native-webview";
import {CallIcon} from "../../../Icons/CallIcon";

export default class NewScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upperSelected: 0,
            lowerSelected: 0,
            LoadingList: true
        }

        this.Category = this.props.route.params.Category

        if(this.Category) {
            this.URL3DModelBase = `https://3d.levyne.com/${this.Category}/`;
            //this.Model = Models[this.Category];
        } else {
            this.goBack();
        }
    }

    componentDidMount() {
        fetch(`https://d32kprqn8e36ns.cloudfront.net/3DModelList/${this.Category}.json`).then(resp => resp.json()).then(Model => {
            this.Model = Model;
            this.setState({ LoadingList: false })
        }).catch(() => {});
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

        //Linking.openURL('tel:+91 9819 077182').catch(err => {});

        this.props.navigation.push('FashionDesignerList')
    }

    render() {
        return (
            <>
                <NavBarBack Title={"Design 3D here!"} Navigation={this.goBack} />
                {this.state.LoadingList ?
                    <View flex center>
                        <ActivityIndicator color={Colors.primary} />
                    </View>
                    :
                    <SafeAreaView style={{flex: 1}}>
                        <View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                style={styles.FlatList}
                                data={this.Model}
                                horizontal={true}
                                renderItem={this.renderItem}
                                keyExtractor={item => item}
                            />
                        </View>

                        <WebView source={{ uri: this.URL3DModelBase + this.Model[this.state.upperSelected] }}/>
                        <TouchableOpacity
                            style={{height:50, backgroundColor: Colors.primary}} center
                            onPress={this.NavigateChat} row
                        >
                            <CallIcon Size={18} Color={Colors.white}/>
                            <Text h1 white marginL-20>Call us for product enquire</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                }
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

