import React from 'react';
import { StyleSheet, ScrollView, Dimensions} from 'react-native';
import {View, Text, TouchableOpacity, Colors, Button, Image} from 'react-native-ui-lib';
import TextNavBar from "../components/TextNavBar";
import Logout from '../API/Logout';
import CstmShadowView from "../components/CstmShadowView";
import {connect} from 'react-redux';

class ProfileTopSection extends React.PureComponent {

    constructor(props){
        super(props);
        this.state= {
            ProfileCompleted: this.props.Profile.ProfileStatus === 2
        }
    }

    NavigateEditProfile = () => {
        this.props.navigation.navigate("EditProfile");
    }

    NavigateLogin = () => {
        this.props.navigation.navigate("Login");
    }

    LogoutOnPress = () => {
        Logout(this.props.access_token).then(() => {
            this.props.navigation.navigate('Login');
        }).catch(() => {})  
    }

    LoggedInScreen = () => {
        return (
            <View>
                <View style={styles.ImageView}>
                    <Image source={{uri:'https://image.cnbcfm.com/api/v1/image/105189375-_Y2A2493c.jpg?v=1525701183'}} style={{width:120,height:120, borderRadius: 80}}/>
                </View>
                <Text marginH-15 marginT-20 b1 black>Welcome, Name</Text>

                <View marginT-30 paddingH-15>
                    <TouchableOpacity>
                        <View centerV style={styles.Tab}>
                            <Text secondary hb1>
                                My fits and Sizes
                            </Text>
                            <Text h2 grey40>
                                Check and alter your sizes here.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity marginT-5>
                        <View centerV style={styles.Tab}>
                            <Text secondary hb1>
                                My fashion designers and tailors.
                            </Text>
                            <Text h2 grey40>
                                Designers and tailors you follow.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity marginT-5>
                        <View centerV style={styles.Tab}>
                            <Text secondary hb1>
                                Orders
                            </Text>
                            <Text h2 grey40>
                                We keep a track of all your orders.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View marginT-30 paddingH-15>
                    <TouchableOpacity
                        onPress={this.NavigateEditProfile}
                    >
                        <View centerV style={styles.Tab}>
                            <Text secondary hb1>
                                Edit profile
                            </Text>
                            <Text h2 grey40>
                                Keep your profile updates.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity marginT-5>
                        <View centerV style={styles.Tab}>
                            <Text secondary hb1>
                                Visit partner store
                            </Text>
                            <Text h2 grey40>
                                Find our partners around you.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View marginT-30 paddingH-15>
                    <TouchableOpacity>
                        <View centerV style={styles.Tab}>
                            <Text secondary hb1>
                                Help Center
                            </Text>
                            <Text h2 grey40>
                                We are always here to help you.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity marginT-5>
                        <View centerV style={styles.Tab}>
                            <Text secondary hb1>
                                FAQs
                            </Text>
                            <Text h2 grey40>
                                Frequently asked questions.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity marginT-5>
                        <View centerV style={styles.Tab}>
                            <Text secondary hb1>
                                T & C
                            </Text>
                            <Text h2 grey40>
                                Terms And Condition.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View centerV style={styles.Tab}>
                            <Text secondary hb1>
                                About Us
                            </Text>
                            <Text h2 grey40>
                                Know us better!
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <CstmShadowView style={{marginTop:40,marginBottom:20}}>
                        <Button
                            onPress={this.LogoutOnPress}
                            hb1 flex
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

                <CstmShadowView style={{marginTop:40, marginHorizontal:40}}>
                    {
                        this.props.SkipLogin ? <Button
                            onPress={this.NavigateLogin}
                            hb1 flex
                            label="Log In"
                        /> :
                        <Button
                            onPress={this.navigateEditProfile}
                            hb1 flex
                            label="Complete Profile"
                        />
                    }
                </CstmShadowView>

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
                    <TouchableOpacity>
                        <View centerV style={styles.Tab}>
                            <Text h1>
                                About Us
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Text marginT-30 marginH-15 grey40 h3 center>APP VERSION 1.0.0</Text>
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
                        this.state.ProfileCompleted ? this.LoggedInScreen() : this.UnloggedScreen()
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
        backgroundColor: Colors.secondary,
        height: 120,
        width: 120,
        borderRadius: 80,
        marginLeft: 20,
        marginTop:-60
    },
    Tab :{
        height:80,
        borderBottomWidth:0.5,
        borderBottomColor:Colors.grey50
    }

})

const mapsStateToProps = state => ({
    SkipLogin: state.Auth.SkipLogin,
    Profile: state.Profile,
});

export default connect(mapsStateToProps)(ProfileTopSection);