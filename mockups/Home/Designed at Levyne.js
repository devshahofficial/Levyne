import React, { Component } from 'react'
import {FlatList, SafeAreaView} from "react-native";
import {Text, Colors, View} from 'react-native-ui-lib';
import NavbarBack from "../../components/NavBarBack";
import LevyneProductContainer from "../../components/LevyneProductContainer";
import FetchDesignsByLevyne from '../../API/FetchDesignsByLevyne';

export default class DesignedAtLevyne extends Component {
    
    state = {
        LevyneProducts: []
    }

    Page = 0;
    NewPageLoading = false;
    NewProducts = true;

    abortController = new AbortController();

    componentDidMount = () => {
        FetchDesignsByLevyne(++this.Page, this.abortController.signal).then(LevyneProducts => {
            this.setState({LevyneProducts});
        }).catch(console.log);
    }

    componentWillUnmount = () => {
        this.abortController.abort();
    }

    NavigateDesign = (DesignID) => {
        this.props.navigation.navigate('ProductDetailsPage', {DesignID})
    }

    FlatListonEndReached = () => {
        if(!this.NewPageLoading && this.NewProducts) {
            this.NewPageLoading = true;
            FetchDesignsByLevyne(++this.Page, this.abortController.signal).then(LevyneProducts => {
                if(!LevyneProducts.length) {
                    this.NewProducts = false;
                } else {
                    this.state.LevyneProducts.push(...LevyneProducts);
                    this.setState({LevyneProducts: this.state.LevyneProducts});
                    this.NewPageLoading = false;
                }
            }).catch(console.log);
        }
    }

    render() {
        return (
            <>
                <NavbarBack Title={"Designed At Levyne"} Navigation={this.props.navigation.goBack}/>
                <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                    <FlatList
                        data={this.state.LevyneProducts}
                        contentContainerStyle={{backgroundColor: 'white'}}
                        numColumns={2}
                        renderItem={({item}) => <LevyneProductContainer
                            Image={item.PrimaryImage}
                            Name={"#" + item.DesignCode}
                            NavigateDesign={this.NavigateDesign}
                            DesignID={item.DesignID}
                        />}
                        keyExtractor={(item) => item.DesignCode}
                        showsHorizontalScrollIndicator={false}
                        onEndReached={this.FlatListonEndReached}
                    />
                    <View
                        center padding-10
                        style={{height:"auto", backgroundColor: Colors.grey70}}
                    >
                        <Text h1 secondary center>"Designed at Levyne" is currently under testing, you can still place an order by calling us.</Text>
                    </View>
                </SafeAreaView>
            </>
        )
    }
}
