import React from 'react';
import {StyleSheet, Dimensions, FlatList} from 'react-native';
import {View, Text, TouchableOpacity, Image} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import TextNavBar from '../components/TextNavBar';
import Models from '../assets/3DModels';

const windowWidth = Dimensions.get('window').width;

const ProductsData = [
    {
        id: "dajwefvka",
        Title: "Ethnic Wear",
        Image: "https://d364lz1eqz350v.cloudfront.net/EthnicWear.png"
    },
    {
        id: "guwiqugd",
        Title: "Trousseau wear",
        Image: "https://d364lz1eqz350v.cloudfront.net/TrousseauWear.png"
    },
    {
        id: "oqhguwiqugd",
        Title: "Men's Wear",
        Image: "https://d364lz1eqz350v.cloudfront.net/MensWear.png"
    },
    {
        id: "dajvka",
        Title: "Fusion Wear",
        Image: "https://d364lz1eqz350v.cloudfront.net/FusionWear.png"
    },
    {
        id: "guwiquwkgduqgd",
        Title: "Bridal Wear",
        Image: "https://d364lz1eqz350v.cloudfront.net/BridalWear.png"
    }
];

class Customize extends React.Component {

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

    headerContainer = () => {
        return(
            <View>
                <Text marginL-5 marginV-10 hb1>3D by Levyne</Text>
                <View center>
                    <FlatList
                        data={this.ModelKeys}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem = {this.headerContainerRender}
                        keyExtractor={(item) => item}
                    />
                </View>
                <Text marginL-5 marginV-10 hb1>Designs by Levyne</Text>
            </View>
        )
    }

    renderItem = ({ item }) => (
        <TouchableOpacity centerH style={[styles.Container,{width: this.imgWidth, height: this.imgHeight}]}>
            <Image
                source={{uri:item.Image}}
                style={{ width: this.imgWidth, height: this.imgHeight }}
            />
        </TouchableOpacity>
    )


    render() {
        return (
            <>
                <TextNavBar Title={'Customize on Levyne'}/>
                <View flex centerH>
                    <FlatList
                        data={ProductsData}
                        ListHeaderComponent={this.headerContainer}
                        showsVerticalScrollIndicator={false}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.id}
                    />
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
