import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet, SectionList, SafeAreaView } from "react-native";
import {connect} from 'react-redux';
import Input from "../../components/input"
import Colors from '../../Style/Colors';
import SearchBar from "../../components/SearchBar";
import CstmShadowView from "../../components/CstmShadowView";
import NavBarBack from '../../components/NavBarBack';
import {RightIcon} from "../../Icons/RightIcon";
import FetchFitsAndSizes from '../../API/FetchFitsAndSizes';
import FitsFemale from '../../assets/FitsFemale';
import FitsMale from '../../assets/FitsMale';

class MyFits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProfileNotCompleted : false
        }

        switch(this.props.Gender) {
            case 0 :
                this.Fits = FitsFemale;
                break;
            case 1 :
                this.Fits = FitsMale;
                break;
            default :
                this.state.ProfileNotCompleted = true;
                this.Fits = {}
        }

    }

    componentDidMount = () => {
        FetchFitsAndSizes(this.props.AccessToken).then(Fits => {

            /*
            Fits.forEach(item => {
                this.state[item[0]] = item[1];
            });

            this.setState(this.state);
            */

            //console.log(Fits);

        }).catch(err => {
            console.log(err);
        })
    }

    SubmitForm = () => {

    }

    SectionListHeader = ({section}) => (
        <View flex>
            <CstmShadowView style={{ height:375, borderRadius:20, margin:15, padding:0 }}>
                <Image
                    source={{ uri: section.Image }}
                    height={350}
                    style={styles.ImageCSS}
                />
            </CstmShadowView>
            <View paddingH-20 paddingT-20>
                <Text hb1>
                    {section.Title}
                </Text>
            </View>
        </View>
    )

    SectionListRenderItem = ({item}) => {
        return(
            <View row margin-10 centerV key={item}>
                <View flex-2 marginR-10>
                    <Text h1 secondary>{item}</Text>
                </View>
                <View flex>
                    <Input
                        placeholder={'Enter Size'}
                        maxLength={5}
                        textAlign={'center'}
                        style={{ paddingLeft: 0}}
                        value={this.state[item]}
                        onChangeText={value => {
                            this.setState({[item]: value})
                        }}
                    />
                </View>
            </View>
        )
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
                    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                        <View row centerV paddingH-10>
                            <SearchBar flex={8}/>
                            <CstmShadowView style={styles.Submit}>
                                <TouchableOpacity onPress={this.SubmitForm} flex center style={{borderRadius: 20}}>
                                    <RightIcon size={20} Color={Colors.primary}/>
                                </TouchableOpacity>
                            </CstmShadowView>
                        </View>
                        {/*
                        <Carousel containerStyle={{ flex: 1 }}>
                            {Object.keys(this.Fits).map((PageName) => {
                                return (
                                    <View paddingH-20 marginB-25 flex>
                                        <FlatList
                                            ListHeaderComponent={() => this.FlatlistHeader(PageName)}
                                            key={PageName}
                                            data={this.Fits[PageName].items}
                                            keyExtractor={item => item}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={this.FlatListRenderItem}
                                        />
                                    </View>
                                )
                            })}
                        </Carousel>
                        */}
                        <SectionList
                            sections={this.Fits}
                            keyExtractor={(item) => item}
                            renderItem={this.SectionListRenderItem}
                            renderSectionHeader={this.SectionListHeader}
                            initialNumToRender={5}
                        />
                    </SafeAreaView>
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
