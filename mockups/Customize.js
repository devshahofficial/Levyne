import React from 'react';
import {StyleSheet, Dimensions, FlatList, ScrollView} from 'react-native';
import {View, Text, TouchableOpacity, Image, Colors} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import TextNavBar from '../components/TextNavBar';
import Models from '../assets/3DModels';
import FetchDesignsByLevyne from "../API/DesignByLevyne/FetchDesignsByLevyne";
import Loader from "../components/Loader";
import LevyneProductContainer from "../components/LevyneProductContainer";

const windowWidth = Dimensions.get('window').width;

class Customize extends React.Component {

    state = {
        LevyneProducts: [],
        Loading: true
    }

    Page = 0;
    NewPageLoading = false;
    NewProducts = true;

    Seed = undefined;

    abortController = new AbortController();

    componentDidMount = () => {
        FetchDesignsByLevyne(++this.Page, this.Seed, this.abortController.signal).then(({Designs, Seed}) => {
            this.setState({
                LevyneProducts: Designs,
                Loading: false
            });
            this.Seed = Seed;
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
            FetchDesignsByLevyne(++this.Page, this.Seed, this.abortController.signal).then(({Designs: LevyneProducts}) => {
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

    imgWidth = Dimensions.get('window').width - 40;
    imgHeight = 80*(Dimensions.get('window').width - 40)/335;

    ModelKeys = Object.keys(Models);

    Navigate3D = (index) => {
        this.props.navigation.push('ThreeD', {Category: this.ModelKeys[index]})
    }

    headerContainerRender = ({ item, index }) => (
        <TouchableOpacity onPress={() => this.Navigate3D(index)} style={styles.Category} center>
            <View>
                <Image source={{uri: Models[item].ImageURL}} style={styles.ImageUpper}/>
            </View>
            <Text h3 secondary marginT-10>{item}</Text>
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
                    data={this.ModelKeys}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem = {this.headerContainerRender}
                    keyExtractor={(item) => item}
                />
            </View>
            <Text marginL-15 marginT-30 secondary hb1>Designs by Levyne</Text>
        </>
    )

    render() {
        return (
            <>
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

                <View
                    center padding-10
                    style={{height:"auto", backgroundColor: Colors.grey70}}
                >
                    <Text h1 secondary center>"3D Customization" is currently under maintenance, you can still place an order by calling us.</Text>
                </View>
            </>
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


const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(Customize);
