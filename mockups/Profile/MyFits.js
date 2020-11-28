import React, { Component } from 'react';
import { View, Text, Image, Carousel, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet, ScrollView } from "react-native";
import {connect} from 'react-redux';
import Input from "../../components/input"
import Colors from '../../Style/Colors';
import SearchBar from "../../components/SearchBar";
import CstmShadowView from "../../components/CstmShadowView";
import NavBarBack from '../../components/NavBarBack';
import {RightIcon} from "../../Icons/RightIcon";

class MyFits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProfileNotCompleted : false
        }

        switch(this.props.Gender) {
            case 0 :
                this.Fits = require('../../assets/FitsFemale').default;
                break;
            case 1 :
                this.Fits = require('../../assets/FitsMale').default;
                break;
            default :
                this.state.ProfileNotCompleted = true;
                this.Fits = {}
        }

        Object.keys(this.Fits).forEach(item => {
            this.Fits[item].items.forEach((Category) => {
                this.state[Category] = '';
            });
        });
        
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Fits and Sizes'} />
                <View row centerV paddingH-10>
                    <SearchBar flex={8}/>
                    <CstmShadowView style={styles.Submit}>
                        <TouchableOpacity flex cebn nter style={{borderRadius: 20}}>
                            <RightIcon size={20} Color={Colors.primary}/>
                        </TouchableOpacity>
                    </CstmShadowView>
                </View>
                {this.state.ProfileNotCompleted ? 
                    <View center>
                        <Text>Profile Incomplete</Text>
                    </View>
                    :
                    <Carousel containerStyle={{ flex: 1 }}>
                        {Object.keys(this.Fits).map((PageName) => {
                            return (
                                <ScrollView key={PageName}>
                                    <CstmShadowView style={{ height: 375, borderRadius: 20, margin: 15, padding: 0 }}>
                                        <Image
                                            source={{ uri: this.Fits[PageName].Image }}
                                            height={350}
                                            style={styles.ImageCSS}
                                        />
                                    </CstmShadowView>
                                    <View style={styles.Outer}>
                                        <Text style={styles.HeaderStyle}>
                                            {PageName}
                                        </Text>
                                        <View style={styles.InnerElementsContainer}>
                                            {this.Fits[PageName].items.map((FitName) => (
                                                <View row key={FitName}>
                                                    <View style={styles.InnerText}>
                                                        <Text style={styles.InnerElements}>{FitName}</Text>
                                                    </View>
                                                    <View style={styles.InputBox}>
                                                        <Input
                                                            placeholder={'Enter Size'}
                                                            maxLength={5}
                                                            textAlign={'center'} 
                                                            style={{ width: "60%", paddingLeft: 'auto', paddingTop: 5 }}
                                                            value={this.state[FitName]}
                                                            onChangeText={value => {
                                                                this.setState({[FitName]: value})
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                </ScrollView>
                            )
                        })}
                    </Carousel>
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    ImageCSS: {
        marginHorizontal: 15,
        marginTop: 12,
        borderRadius: 15
    },
    Outer:{
        flexDirection: "column",
        paddingLeft: 20
    },
    HeaderStyle:{
        margin: 10,
        paddingTop: 10,
        fontSize: 18,
        paddingLeft: 5,
        marginRight: "70%",
        borderColor: "white",
        borderBottomColor: Colors.primary,
        borderWidth: 2
    },
    InnerElementsContainer:{
        paddingBottom: 50
    },
    InnerElements:{
        padding: 25,
        fontSize: 15
    },
    InnerText:{
        width: "40%",
        marginRight:"10%"
    },
    InputBox: {
        width: "60%",
        justifyContent: "center"
    },
    Submit: {
        flex:1,
        height:"auto",
        width:"auto",
        margin:10,
        justifyContent: "center",
        alignContent: "center",
    }
})

const mapsStateToProps = state => ({
    Gender : state.Profile.Gender,
    AccessToken : state.Auth.AccessToken
})

export default connect(mapsStateToProps)(MyFits);
