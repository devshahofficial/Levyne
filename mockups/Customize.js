import React from 'react';
import {StyleSheet, Dimensions, FlatList, Animated, ImageBackground} from 'react-native';
import {View, Colors, Text, TouchableOpacity, Image} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import TextNavBar from '../components/TextNavBar';

const screenWidth = Dimensions.get('window').width;

const ProductsData = [
    {
        id: "dajwefvka",
        Title: "Designed at Levyne",
        Image: "https://media-exp1.licdn.com/dms/image/C4D0BAQHcOy3X-JWnQw/company-logo_200_200/0?e=2159024400&v=beta&t=XkI8512lSLGFQyAvYBrzs4zSujmX_qnbnqWMUsbRLSI"
    },
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
        Title: "Blazers",
        Image: "https://singaporebrides.com/articles/wp-content/uploads/2017/05/Bespoke-Mens-Tailors-for-Weddings-in-Singapore-Dorcas-Stitch.jpg"
    },
    {
        id: "guwiquwkgduqgd",
        Title: "Vest",
        Image: "https://www.dhresource.com/f2/albu/g10/M01/6D/93/rBVaWV5TiQaAEz12AALE8qMCOqw900.jpg"
    },
    {
        id: "oqhguwiqwqugd",
        Title: "Blouse",
        Image: "https://i.pinimg.com/originals/78/08/04/780804374d512943da57104eca419643.jpg"
    },
    {
        id: "dajqwvka",
        Title: "Kurti",
        Image: "https://asset22.ckassets.com/thegoodlookbook/wp-content/uploads/sites/2/2018/09/front-slit-kurti.jpg"
    },
    {
        id: "guwiqugdweqd",
        Title: "Face Mask",
        Image: "https://s1.stabroeknews.com/images/2020/04/miss-1.jpg"
    },
    {
        id: "oqhgu21wiqugd",
        Title: "Cholis",
        Image: "https://i.pinimg.com/originals/13/6c/1e/136c1e5adc00740bbb08134ac548f8df.jpg"
    },
];

class Customize extends React.Component {
    render() {
        return (
            <>
                <TextNavBar Title={'Customize on Levyne'}/>
                <View flex center>
                    <FlatList
                        data={ProductsData}
                        numColumns={2}
                        renderItem={
                            ({ item }) =>
                                <TouchableOpacity style={styles.Container}>
                                    <View>
                                        <Image source={{uri:item.Image}} style={styles.Image}/>
                                    </View>
                                    <View center style={styles.Text}>
                                        <Text hb1 secondary>{item.Title}</Text>
                                    </View>
                                </TouchableOpacity>
                        }
                    />
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    Image: {
        height: screenWidth*0.45,
        width: screenWidth*0.45,
        flex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    Container: {
        marginHorizontal: 10,
        marginVertical: 20,
    },
    Text: {
        borderWidth: 1,
        borderColor: Colors.shadow,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        height:40
    }
})


const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(Customize)
