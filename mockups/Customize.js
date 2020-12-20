import React from 'react';
import {StyleSheet, Dimensions, FlatList, ScrollView} from 'react-native';
import {View, Text, TouchableOpacity, Image, Colors} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import TextNavBar from '../components/TextNavBar';
import Models from '../assets/3DModels';
import LevyneDesignIllustration from '../assets/images/AppImages/LevyneDesign.svg';

const windowWidth = Dimensions.get('window').width;

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

    renderItem = ({ item }) => (
        <TouchableOpacity center style={[styles.Container,{width: this.imgWidth+40, height: this.imgHeight}]}>
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
                <ScrollView
                    style={{backgroundColor: Colors.white}}
                    contentContainerStyle={{flex:1}}
                >
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
                    <Text marginL-15 marginT-50 secondary hb1>Designs by Levyne</Text>
                    <View flex center>
                        <LevyneDesignIllustration width={"50%"}/>
                    </View>
                </ScrollView>
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
