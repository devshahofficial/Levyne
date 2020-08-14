import React from 'react';
import { StyleSheet, ScrollView, Dimensions} from 'react-native';
import {View, Text, Avatar, TouchableOpacity, Colors, Button, Image} from 'react-native-ui-lib';
import TextNavBar from "../components/TextNavBar";
import CstmShadowView from "../components/CstmShadowView";

export default class ProfileTopSection extends React.PureComponent {

    constructor(props){
        super(props);
        this.state= {
            LoggedIn: true
        }
    }


    LoggedInScreen = () => {
        return (
            <View>
                <View style={styles.ImageView}>
                    <Image source={{uri:'https://image.cnbcfm.com/api/v1/image/105189375-_Y2A2493c.jpg?v=1525701183'}} style={{width:120,height:120, borderRadius: 80}}/>
                </View>

                <View paddingH-15 marginT-20>
                    <Text b1 secondary>Name</Text>
                    <View row>
                        <View>
                            <Text h2 secondary>Contact:</Text>
                            <Text h2 secondary>Email:</Text>
                            <Text h2 secondary>Address:</Text>
                        </View>
                        <View marginL-20>
                            <Text hb2 secondary>9819077182</Text>
                            <Text hb2 secondary>devshahofficial001@gmail.com</Text>
                            <Text hb2 secondary>Girgaon, Mumbai-04</Text>
                        </View>
                    </View>
                </View>

                <View marginT-30 paddingH-15>
                    <TouchableOpacity>
                        <View centerV style={styles.Tab}>
                            <Text h1>
                                My fits and Sizes
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity marginT-5>
                        <View centerV style={styles.Tab}>
                            <Text h1>
                                My Tailors and Fashion Designers
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity marginT-5>
                        <View centerV style={styles.Tab}>
                            <Text h1>
                                Orders
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View marginT-30 paddingH-15>
                    <TouchableOpacity>
                        <View centerV style={styles.Tab}>
                            <Text h1>
                                Edit Profile
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity marginT-5>
                        <View centerV style={styles.Tab}>
                            <Text h1>
                                Visit partner store
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View marginT-30 paddingH-15>
                    <TouchableOpacity>
                        <View centerV style={styles.Tab}>
                            <Text h1>
                                Help Center
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity marginT-5>
                        <View centerV style={styles.Tab}>
                            <Text h1>
                                FAQS
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity marginT-5>
                        <View centerV style={styles.Tab}>
                            <Text h1>
                                Terms and Conditions
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View centerV style={styles.Tab}>
                            <Text h1>
                                About Us
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <CstmShadowView style={{marginTop:40,marginBottom:20}}>
                        <Button
                            onPress={this.LogoutOnPress}
                            h1
                            label="Log Out"
                        />
                    </CstmShadowView>
                    <Text marginT-20 marginB-40 grey40 h3 center>APP VERSION 1.0.0</Text>
                </View>
            </View>
        )
    }

    UnloggedScreen = () => {
        return (
            <View>
                <View style={styles.ImageView}>
                </View>

                <View marginT-50 paddingH-15>
                    <TouchableOpacity>
                        <View centerV style={styles.Tab}>
                            <Text h1>
                                Help Center
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity marginT-5>
                        <View centerV style={styles.Tab}>
                            <Text h1>
                                FAQS
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity marginT-5>
                        <View centerV style={styles.Tab}>
                            <Text h1>
                                Terms and Conditions
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View marginT-30 paddingH-15>
                    <TouchableOpacity>
                        <View centerV style={styles.Tab}>
                            <Text h1>
                                About Us
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <CstmShadowView style={{marginTop:40,marginBottom:20}}>
                        <Button
                            onPress={this.LogoutOnPress}
                            h1
                            label="Log In"
                        />
                    </CstmShadowView>
                    <Text marginT-20 grey40 h3 center>APP VERSION 1.0.0</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <>
                <TextNavBar Title={"My Profile"}/>
                <ScrollView
                    style={{flex:1, backgroundColor: Colors.white}}
                >
                    <View style={styles.View}>

                    </View>
                    {
                        this.state.LoggedIn === true ? this.LoggedInScreen() : this.UnloggedScreen()
                    }
                </ScrollView>
            </>
        )
    }
}


const styles = StyleSheet.create({
    View: {
        backgroundColor: Colors.shadow,
        width:Dimensions.get('window').width,
        height:120
    },
    ImageView: {
        backgroundColor: Colors.primary,
        height: 120,
        width: 120,
        borderRadius: 80,
        marginLeft: 20,
        marginTop:-60
    },
    Tab :{
        height:50,
        borderBottomWidth:0.5,
        borderBottomColor:Colors.grey50
    }

})

