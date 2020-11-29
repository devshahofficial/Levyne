import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {View} from "react-native-ui-lib";
import UpperComponent from '../Components/UpperComponent'
import NavBarBack from "../../../components/NavBarBack";
import WebView from "react-native-webview";
import Models from '../../../assets/3DModels';

export default class NewScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upperSelected: 0,
            lowerSelected: 0
        }

        this.Category = this.props.route.params.Category
    
        if(this.Category) {
            this.URL3DModelBase = `https://apitesting603.levyne.com/3D/${this.Category}/`;
            this.Model = Models[this.Category];
        } else {
            this.goBack();
        }
    }


    onUpperPressed = (selectedIndex) => {
        this.setState({ upperSelected: selectedIndex })
    }

    onLowerPressed = (selectedIndex) => {
        this.setState({ lowerSelected: selectedIndex })
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    renderItem = ({ item, index }) => (
        <UpperComponent
            item={item}
            index={index}
            selected={this.state.upperSelected}
            onUpperPressed={this.onUpperPressed}
        />
    )


    render() {
        return (
            <>
                <NavBarBack Title={"Design 3D here!"} Navigation={this.goBack} />
                <View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={styles.FlatList}
                        data={this.Model.items}
                        horizontal={true}
                        renderItem={this.renderItem}
                        keyExtractor={item => item}
                    />
                </View>

                <WebView source={{ uri: this.URL3DModelBase + this.Model.items[this.state.upperSelected] }}/>

            </>
        )

    }
}

const styles = StyleSheet.create({
    FlatList: {
        marginTop: 10,
        paddingLeft: 20,
    },
})

