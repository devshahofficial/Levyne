import React from 'react';
import {StyleSheet, Dimensions, FlatList} from 'react-native';
import {View, Text, TouchableOpacity, Image} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import TextNavBar from '../components/TextNavBar';

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

const threeD = [
    {
        id: "guwiqugd",
        Title: "Shirt",
        Image: "https://tiimg.tistatic.com/fp/1/003/975/linen-classic-fit-black-shirt-361.jpg"
    },
    {
        id: "oqhguwiqugd",
        Title: "Pant",
        Image: "https://www.ericmusgrave.co.uk/wp-content/uploads/MM-5.jpg"
    },
    {
        id: "dajvka",
        Title: "Choli",
        Image: "https://singaporebrides.com/articles/wp-content/uploads/2017/05/Bespoke-Mens-Tailors-for-Weddings-in-Singapore-Dorcas-Stitch.jpg"
    }
];

class Customize extends React.Component {

    state = {
        imgWidth: 0,
        imgHeight: 0,
    }

    componentDidMount() {

        Image.getSize("https://d364lz1eqz350v.cloudfront.net/MensWear.png", (width, height) => {
            // calculate image width and height
            const screenWidth = Dimensions.get('window').width-40
            const scaleFactor = width / screenWidth
            const imageHeight = height / scaleFactor
            this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
        })
    }



    headerContainer = () => {
        return(
            <View>
                <Text marginL-5 marginV-10 hb1>3D by Levyne</Text>
                <View center>
                    <FlatList
                        data={threeD}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={
                            ({ item }) =>
                                <TouchableOpacity style={styles.Category} center>
                                    <View>
                                        <Image source={{uri:item.Image}} style={styles.ImageUpper}/>
                                    </View>
                                    <Text h3 secondary marginT-10>{item.Title}</Text>
                                </TouchableOpacity>
                        }
                    />
                </View>
                <Text marginL-5 marginV-10 hb1>Designs by Levyne</Text>
            </View>
        )
    }

    render() {
        const {imgWidth, imgHeight} = this.state;
        return (
            <>
                <TextNavBar Title={'Customize on Levyne'}/>
                <View flex centerH>
                    <FlatList
                        data={ProductsData}
                        ListHeaderComponent={this.headerContainer}
                        showsVerticalScrollIndicator={false}
                        renderItem={
                            ({ item }) =>
                                <TouchableOpacity
                                    style={[styles.Container,{width: imgWidth, height: imgHeight}]}
                                >
                                    <Image
                                        source={{uri:item.Image}}
                                        style={{ width: imgWidth, height: imgHeight }}
                                    />
                                </TouchableOpacity>
                        }
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
