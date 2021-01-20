import React, { Component } from 'react';
import {StyleSheet, FlatList, SafeAreaView, Linking, ActivityIndicator} from 'react-native';
import {Colors, Text, TouchableOpacity, View, AvatarHelper} from "react-native-ui-lib";
import UpperComponent from '../Components/UpperComponent'
import NavBarBack from "../../../components/NavBarBack";
import WebView from "react-native-webview";
import {CallIcon} from "../../../Icons/CallIcon";
import Fetch3DModel from "../../../API/ThreeD/Fetch3DModel";
import { connect } from 'react-redux';

class ThreeD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upperSelected: 0,
            lowerSelected: 0,
            LoadingList: true,
            Models: []
        }

        this.CategoryID = this.props.route.params.CategoryID;
        this.Category = this.props.route.params.Category;

        this.URL3DModelBase = `https://3d.levyne.com/${this.Category}/`

        if(typeof this.CategoryID !== 'number') {
            this.goBack();
        }
    }

    componentDidMount() {
        Fetch3DModel(this.CategoryID).then(Models => {
            this.setState({
                Models,
                LoadingList: false
            });
        }).catch(console.log)
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

    Navigate3DCart = () => {

        if(this.props.AccessToken) {
            this.props.navigation.push('FabricsFor3DCart', {
                CategoryID: this.CategoryID,
                Category: this.Category,
                ThreeDModel: this.state.Models[this.state.upperSelected].ID
            })
        } else {
            this.props.navigation.push("Auth", {screen: 'Login'});
        }
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
                                data={this.state.Models}
                                horizontal={true}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.Model}
                            />
                        </View>

                        <WebView source={{ uri: this.URL3DModelBase + this.state.Models[this.state.upperSelected].Model }}/>
                        <TouchableOpacity
                            style={{height:50, backgroundColor: Colors.primary}} center
                            onPress={this.Navigate3DCart} row
                        >
                            <CallIcon Size={18} Color={Colors.white}/>
                            <Text h1 white marginL-20>Add to Cart</Text>
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

const mapsStateToProps = state => ({
	AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(ThreeD)
