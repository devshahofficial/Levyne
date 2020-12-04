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
import FetchFitsAndSizes from '../../API/FetchFitsAndSizes';
import InsertFitsAndSizes from '../../API/InsertFitsAndSizes';
import FitsFemale from '../../assets/FitsFemale';
import FitsForSearchFemale from '../../assets/FitsFemaleArray';
import FitsMale from '../../assets/FitsMale';
import FitsForSearchMale from '../../assets/FitsMaleArray';


class MyFits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProfileNotCompleted : false
        }

        switch(this.props.Gender) {
            case 0 :
                this.Fits = FitsFemale;
                this.FitsForSearch = FitsForSearchFemale
                break;
            case 1 :
                this.Fits = FitsMale
                this.FitsForSearch = FitsForSearchMale
                break;
            default :
                this.state.ProfileNotCompleted = true;
                this.Fits = {}
        }

        this.FitsForSearch.forEach(item => {
            this.state[item[0]] = '';
        })
    }

    componentDidMount = () => {
        FetchFitsAndSizes(this.props.AccessToken).then(resp => {
            console.log(resp);
        }).catch(err => {
            console.log(err);
        })
    }

    SubmitForm = () => {
        const FitsAndSizes = [];
        Object.keys(this.state).forEach(item => {
            if(this.state[item]) {
                FitsAndSizes.push([item, this.state[item]])
            }
        })

        console.log(FitsAndSizes);
        InsertFitsAndSizes(FitsAndSizes, this.props.AccessToken).then(item => {
            console.log(item);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Fits and Sizes'} />
                {this.state.ProfileNotCompleted ?
                    <View center>
                        <Text>Profile Incomplete</Text>
                    </View>
                    :
                    <>
                        <View row centerV paddingH-10>
                            <SearchBar flex={8}/>
                            <CstmShadowView style={styles.Submit}>
                                <TouchableOpacity onPress={this.SubmitForm} flex center style={{borderRadius: 20}}>
                                    <RightIcon size={20} Color={Colors.primary}/>
                                </TouchableOpacity>
                            </CstmShadowView>
                        </View>
                        <Carousel containerStyle={{ flex: 1 }}>
                            {Object.keys(this.Fits).map((PageName) => {
                                return (
                                    <ScrollView
                                        key={PageName}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        <CstmShadowView style={{ height: 375, borderRadius: 20, margin: 15, padding: 0 }}>
                                            <Image
                                                source={{ uri: this.Fits[PageName].Image }}
                                                height={350}
                                                style={styles.ImageCSS}
                                            />
                                        </CstmShadowView>
                                        <View padding-20>
                                            <Text hb1>
                                                {PageName}
                                            </Text>
                                            <View style={styles.InnerElementsContainer}>
                                                {this.Fits[PageName].items.map((FitName) => (
                                                    <View row marginV-5 centerV key={FitName}>
                                                        <View flex-2 marginR-10>
                                                            <Text h1 secondary>{FitName}</Text>
                                                        </View>
                                                        <View flex>
                                                            <Input
                                                                placeholder={'Enter Size'}
                                                                maxLength={5}
                                                                textAlign={'center'}
                                                                style={{ paddingLeft: 0}}
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
                    </>
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
        backgroundColor: Colors.primary
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
