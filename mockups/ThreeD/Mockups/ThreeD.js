import React, { Component } from 'react';
import {StyleSheet, FlatList, SafeAreaView, Linking, ActivityIndicator} from 'react-native';
import {Colors, Text, TouchableOpacity, View, AvatarHelper, Button} from "react-native-ui-lib";
import UpperComponent from '../Components/UpperComponent'
import NavBarBack from "../../../components/NavBarBack";
import WebView from "react-native-webview";
import {CallIcon} from "../../../Icons/CallIcon";
import Fetch3DModel from "../../../API/ThreeD/Fetch3DModel";
import { connect } from 'react-redux';
import BottomButton from "../../../components/BottomButtons";
import ShadowView from "react-native-simple-shadow-view/src/ShadowView";

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
                        <View style={styles.Main}>
                            <ShadowView style={styles.ShadowView}>
                                <Button
                                    onPress={() => Linking.openURL('tel:+91 9819 077182')}
                                    style={[styles.Button,{borderColor: Colors.white}]}
                                    h1 label={"Enquire"}
                                />
                            </ShadowView>
                            <ShadowView style={styles.ShadowView}>
                                <Button
                                    onPress={this.Navigate3DCart}
                                    style={[styles.Button,{backgroundColor: Colors.primary}]}
                                    h1 label={"Add to Cart"} color={Colors.white}
                                />
                            </ShadowView>
                        </View>
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
    Main: {
        flexDirection:'row',
        backgroundColor:Colors.white
    },
    ShadowView: {
        flex:1,
        shadowColor: Colors.grey50,
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {width: 0,height: -0.5},
        backgroundColor:Colors.white,
    },
    Button: {
        height:50,
        borderRadius:0,
        backgroundColor:Colors.white,
        borderColor: Colors.white
    }
})

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(ThreeD)
