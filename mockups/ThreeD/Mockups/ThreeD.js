import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {View} from "react-native-ui-lib";
import UpperComponent from '../Components/UpperComponent'
import NavBarBack from "../../../components/NavBarBack";
import WebView from "react-native-webview";


const upperList = [
    {
        number: 1,
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb288a',
        title: '#HA0001',
    },
    {
        number: 2,
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: '#RS0029',
    },
    {
        number: 3,
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f78',
        title: '#NP0015',
    },
    {
        number: 4,
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: '#NB0008',
    },
    {
        number: 5,
        id: '3ac68afc-c405-48d3-a4f8-fbd91aa97f63',
        title: '#SJ0019',
    },
];

export default class NewScreen extends Component {

    state = {
        upperSelected: 1,
        lowerSelected: 1,
    }

    render() {
        return (
            <>
                <NavBarBack Title={"Design 3D here!"}/>
                <View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={styles.Flatlist}
                        data={upperList}
                        horizontal={true}
                        renderItem={({ item }) =>
                            <UpperComponent
                                item={item}
                                selected={this.state.upperSelected}
                                onUpperPressed={(data) => this.onUpperPressed(data)}
                            />
                        }
                        keyExtractor={item => item.id}
                    />
                </View>

                <WebView
                    source={{
                        uri: 'https://levyne3dtrial.netlify.app/',
                    }}
                />

            </>
        )

    }

    onUpperPressed = (selectedOne) => {
        this.setState({ upperSelected: selectedOne })
        // console.warn('upper pressed', selectedOne)
    }

    onLowerPressed = (selectedOne) => {
        this.setState({ lowerSelected: selectedOne })
        // console.warn(' lower pressed', selectedOne)
    }
}

const styles = StyleSheet.create({
    Flatlist: {
        marginTop: 10,
        paddingLeft: 20
    },
})

