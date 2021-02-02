import React from 'react';
import {StyleSheet} from "react-native";
import {View,Text,Colors, Picker, Switch} from 'react-native-ui-lib';
import NavBarBack from '../../components/NavBarBack';
import CstmInput from "../../components/input";
import {ScrollView} from "react-native";


export default class ChatToOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Gender: false,
            ProductsData: {
                Category: [],
                Style: [],
                Fabric: [],
                WashType: []
            },
        };

    }

    componentDidMount() {
        fetch(global.URL + 'ProductData.json').then(resp => resp.json()).then(ProductsData => {
            this.setState({ProductsData})
        }).catch(err => {
            //console.log(err);
        })
    }

    switchGender = () => {
        this.setState({ Gender: !this.state.Gender });
    }


    render() {
        const {color, alpha, sliderValue} = this.state;
        return (
            <>
                <NavBarBack Title={'Tell us more about your taste'} Navigation={this.props.navigation.goBack}/>

                <View flex>
                    <ScrollView
                        contentContainerStyle={{backgroundColor:Colors.white, paddingHorizontal:20}}
                    >
                        <View marginV-30 row center>
                            <Text marginH-20 secondary hb1>Male</Text>
                            <Switch
                                onColor={Colors.primary}
                                offColor={Colors.shadow}
                                height={30} width={60} thumbSize={20}
                                value={this.state.Gender}
                                onValueChange={this.switchGender}
                            />
                            <Text marginH-20 secondary hb1>Female</Text>
                        </View>

                        <Picker
                            titleStyle={styles.titleStyle}
                            placeholder="None"
                            title="Budget"
                            value={this.state.Category}
                            enableModalBlur={false}
                            onChange={(item) => this.setState({Category: item})}
                            topBarProps={{
                                title: 'Budget  ',
                                titleStyle: {fontFamily: 'Mulish-Regular', lineHeight:18, fontSize: 16}
                            }}
                        >
                            {this.state.ProductsData.Category.map((item, index) => (
                                <Picker.Item
                                    key={index.toString()}
                                    value={index}
                                    label={item}
                                />
                            ))}
                        </Picker>

                        <Picker
                            titleStyle={styles.titleStyle}
                            placeholder="None"
                            title="Occasion"
                            value={this.state.Category}
                            enableModalBlur={false}
                            onChange={(item) => this.setState({Category: item})}
                            topBarProps={{
                                title: 'Occasion',
                                titleStyle: {fontFamily: 'Mulish-Regular', lineHeight:18, fontSize: 16}
                            }}
                        >
                            {this.state.ProductsData.Category.map((item, index) => (
                                <Picker.Item
                                    key={index.toString()}
                                    value={index}
                                    label={item}
                                />
                            ))}
                        </Picker>

                        <Text marginT-20 h1 secondary>
                            Please describe the outfit in a few words:
                        </Text>
                        <CstmInput
                            placeholder="Tell us something about the outfit!"
                            placeholderTextColor={Colors.grey50}
                            style={{height:150, borderRadius:20, marginBottom:20}}
                        />
                        <View paddingR-50>
                            <Text h3 padding-50 secondary>**Let us know about the colours, embroideries, fabric you are looking for, etc...**</Text>
                        </View>

                    </ScrollView>
                </View>
            </>
        );
    }

};

const styles = StyleSheet.create({
    titleStyle:{
        fontFamily: 'Mulish-Regular',
        lineHeight:15,
        fontSize: 14
    },
    slider: {
        marginVertical: 6
    },
    group: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 6
    }
});

