import React, { Component } from 'react';
import { View, Text, Image, Toast } from 'react-native-ui-lib';
import { StyleSheet, SectionList, SafeAreaView } from "react-native";
import {connect} from 'react-redux';
import Input from "../../components/input"
import Colors from '../../Style/Colors';
import CstmShadowView from "../../components/CstmShadowView";
import NavBarBackWithEdit from '../../components/NavBarBackWithEdit';
import NavBarBack from '../../components/NavBarBack';
import FetchFitsAndSizes from '../../API/FetchFitsAndSizes';
import FitsFemale from '../../assets/FitsFemale';
import FitsMale from '../../assets/FitsMale';
import InsertFitsAndSizes from '../../API/InsertFitsAndSizes';
import Loader from '../../components/Loader';

class MyFits extends Component {
    constructor(props) {
        super(props);

        this.Fits = [{
            data: [],
            Title: '',
            Image: ''
        }];


        switch(+this.props.Gender) {
            case 0 :
                this.Fits = FitsFemale;
                break;
            case 1 :
                this.Fits = FitsMale;
                break;
            default :
                this.ProfileNotCompleted = true;
        }

        this.abortController = new AbortController();

        this.state = {
            Loading: true,
            ShowToast: false,
            ToastContent: '',
        }

        this.Fits.forEach(item => {
            item.data.forEach(item => {
                this.state[item] = '0'
            })
        })

        this.Timeout = []
    }

    componentDidMount = () => {
        FetchFitsAndSizes(this.props.AccessToken, this.abortController.signal).then(Fits => {

            Fits.forEach(item => {
                this.state[item.Key] = item.Value;
            });

            this.state.Loading = false;

            this.setState(this.state);

        }).catch(err => {
            console.log(err);
        })
    }

    componentWillUnmount = () => {
        this.abortController.abort();
        this.Timeout.forEach(clearTimeout);
    }

    setToastTimeout = () => {
        this.Timeout.push(setTimeout(() => {
            this.setState({
                ShowToast: false
            })
        }, 3000));
    }

    SubmitForm = async () => {
        const {Loading, ShowToast, ToastContent, ...Fits} = this.state;
        try {
            const data = Object.keys(Fits).map(item => {
                const value = parseFloat(Fits[item]);
                if(isNaN(value)) throw new Error(item + " Must be a number");
                return [item, value];
            });

            this.setState({ Loading: true });

            try {
                await InsertFitsAndSizes(data, this.props.AccessToken, this.abortController.signal);
                this.setState({Loading: false})
            } catch(err) {
                throw new Error("Something went wrong !");
            }
        } catch(err) {
            this.setState({
                ToastContent: err.message,
                ShowToast: true,
                Loading: false,
            })
            this.setToastTimeout()
        }
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
                        keyboardType="numeric"
                        textAlign={'center'}
                        style={{ paddingLeft: 0}}
                        value={this.state[item].toString()}
                        onChangeText={value => {
                            this.setState({[item]: value})
                        }}
                    />
                </View>
            </View>
        )
    }

    renderCustomContent = () => {
		const backgroundColor = undefined;

		return (
            <View flex padding-10 style={{backgroundColor}}>
                <Text white h1>{this.state.ToastContent}</Text>
            </View>
		);
    };

    render() {

        if(this.ProfileNotCompleted) {
            return (
                <>
                    <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Fits and Sizes'} />
                    <View center flex>
                        <Text>Profile Incomplete</Text>
                    </View>
                </>
            )
        } else if(this.state.Loading) {
            return (
                <>
                    <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Fits and Sizes'} />
                    <Loader />
                </>
            )
        } else {
            return (
                <>
                    <NavBarBackWithEdit
                        NavigateBack={this.props.navigation.goBack}
                        Title={'My Fits and Sizes'}
                        SubmitForm={this.SubmitForm}
                    />
                    <Toast
                        visible={this.state.ShowToast}
                        position={'bottom'}
                        backgroundColor={Colors.primary}
                    >
                        {this.renderCustomContent()}
                    </Toast>
                    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                        <SectionList
                            showsVerticalScrollIndicator ={false}
                            sections={this.Fits}
                            keyExtractor={(item) => item}
                            renderItem={this.SectionListRenderItem}
                            renderSectionHeader={this.SectionListHeader}
                            initialNumToRender={5}
                        />
                    </SafeAreaView>
                </>
            )
        }
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
