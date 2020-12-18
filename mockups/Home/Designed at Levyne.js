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

    abortController = new AbortController();

    componentDidMount = () => {
        FetchDesignsByLevyne(1, this.abortController.signal).then(LevyneProducts => {
            this.setState({LevyneProducts});
        }).catch(console.log);
    }

    componentWillUnmount = () => {
        this.abortController.abort();
    }

    NavigateDesign = (DesignID) => {
        this.props.navigation.navigate('ProductDetailsPage', {DesignID})
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
