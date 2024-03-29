import React from 'react';
import {StyleSheet, Dimensions, FlatList} from 'react-native';
import {View, Text, TouchableOpacity, Image, Colors} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import TextNavBar from '../../components/TextNavBar';
import FetchDesignsByLevyne from "../../API/DesignByLevyne/FetchDesignsByLevyne";
import Fetch3DCategories from "../../API/ThreeD/Fetch3DCategories";
import Loader from "../../components/Loader";
import LevyneProductContainer from "../../components/LevyneProductContainer";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

/**
 * @type {React.PureComponent}
 * @typedef {object} AccessTokenProps
 * @prop {string} AccessToken
 * @typedef {import('../../Types/navigation').HomeStackParamList} HomeStackParamList
 * @typedef {RouteProp<HomeStackParamList, 'Customize'>} ReviewScreenRouteProp
 * @typedef {StackNavigationProp<HomeStackParamList, "Customize">} ReviewScreenNavigationProps
 * @typedef {AccessTokenProps & { navigation: ReviewScreenNavigationProps, route: ReviewScreenRouteProp }} Props
 * @extends {React.Component<Props>}
 */

class Customize extends React.Component {

    state = {
        LevyneProducts: [],
        Loading: true,
        ModelCategories: []
    }

    Page = 0;
    NewPageLoading = false;
    NewProducts = true;

    abortController = new AbortController();

    componentDidMount = () => {
        FetchDesignsByLevyne(++this.Page, this.abortController.signal).then(Designs => {
            this.setState({
                LevyneProducts: Designs,
                Loading: false
            });
        }).catch(console.log);

        Fetch3DCategories(this.abortController.signal).then(ModelCategories => {
            this.setState({ModelCategories});
        }).catch(console.log)
    }

    componentWillUnmount = () => {
        this.abortController.abort();
    }

    /**
     * @param {number} DesignID
     */
    NavigateDesign = (DesignID) => {
        this.props.navigation.navigate('DesignScreen', {DesignID})
    }

    FlatListonEndReached = () => {
        if(!this.NewPageLoading && this.NewProducts) {
            this.NewPageLoading = true;
            FetchDesignsByLevyne(++this.Page, this.abortController.signal).then(LevyneProducts => {
                if(!LevyneProducts.length) {
                    this.NewProducts = false;
                } else {
                    // @ts-ignore
                    this.state.LevyneProducts.push(...LevyneProducts);
                    this.setState({LevyneProducts: this.state.LevyneProducts});
                    this.NewPageLoading = false;
                }
            }).catch(console.log);
        }
    }

    imgWidth = Dimensions.get('window').width - 40;
    imgHeight = 80*(Dimensions.get('window').width - 40)/335;

    /**
     * @param {number} index
     */
    Navigate3D = (index) => {
        this.props.navigation.push('ThreeD', {
            // @ts-ignore
            CategoryID: this.state.ModelCategories[index].CategoryID,
            // @ts-ignore
            Category: this.state.ModelCategories[index].Category
        })
    }

    headerContainerRender = ({ item, index }) => (
        <TouchableOpacity onPress={() => this.Navigate3D(index)} center>
            <View>
                <Image source={{uri: item.Image}} style={styles.ImageUpper}/>
            </View>
            <Text h3 secondary marginT-10>{item.Category}</Text>
        </TouchableOpacity>
    )

    renderItem = ({ item }) => (
        <TouchableOpacity center style={[styles.Container,{width: this.imgWidth+40, height: this.imgHeight}]}>
            <Image
                source={{uri:item.Image}}
                style={{ width: this.imgWidth, height: this.imgHeight }}
            />
        </TouchableOpacity>
    )

    renderHeader = () => (
        <>
            <Text marginL-15 marginV-10 secondary hb1>3D by Levyne</Text>
            <View center>
                <FlatList
                    data={this.state.ModelCategories}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem = {this.headerContainerRender}
                    keyExtractor={(item) => item.Category}
                />
            </View>
            <Text marginL-15 marginT-30 secondary hb1>Designs by Levyne</Text>
        </>
    )

    render() {
        return (
            <View flex>
                <TextNavBar Title={'Customize on Levyne'}/>
                {this.state.Loading ? <Loader /> :
                    <>
                        <FlatList
                            ListHeaderComponent={this.renderHeader}
                            data={this.state.LevyneProducts}
                            contentContainerStyle={{backgroundColor: 'white'}}
                            numColumns={2}
                            renderItem={({item}) => <LevyneProductContainer
                                Image={item.PrimaryImage}
                                NewDesign={item.NewDesign}
                                Name={"#" + item.DesignCode}
                                NavigateDesign={this.NavigateDesign}
                                DesignID={item.DesignID}
                            />}
                            extraData={{NavigateDesign: this.NavigateDesign}}
                            keyExtractor={(item) => item.DesignCode}
                            showsVerticalScrollIndicator={false}
                            onEndReached={this.FlatListonEndReached}
                        />
                    </>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ImageUpper: {
        height: windowWidth*0.25,
        width: windowWidth*0.25,
        borderRadius: 100,
        marginHorizontal: 10
    },
    Container: {
        marginVertical: 15,
    }
})


/**
 * @param {{ Auth: { AccessToken: any; }; }} state
 */
const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(Customize);
