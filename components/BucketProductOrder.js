import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { View, TouchableOpacity, Text, Colors } from 'react-native-ui-lib';
import { ArchiveIcon } from "../Icons/ArchiveIcon";
import ShadowView from "react-native-simple-shadow-view";

const windowWidth = Dimensions.get('window').width;

export default class BucketProduct extends React.PureComponent {

    ProductWithFabric = () => {
        return (
            <View padding-15>
                <ShadowView style={styles.View}>
                    <View flex row centerH style={{ height: "auto" }}>
                        <TouchableOpacity
                            flex-6 style={{borderTopLeftRadius:10}}
                            onPress={() => this.props.DisplayImageView(this.props.item.ProductImage)}
                        >
                            <Image
                                style={styles.ImageContainer}
                                source={{ uri: this.props.item.ProductImage }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            flex-2 style={{borderTopRightRadius:10}}
                            onPress={() => this.props.DisplayImageView(this.props.item.FabricImage)}
                        >
                            <Image
                                style={styles.FabricContainer}
                                source={{uri: this.props.item.FabricImage}}
                            />
                        </TouchableOpacity>
                    </View>

                    <View marginT-10>
                        <Text h2 secondary>Average Cost</Text>
                        <View row>
                            <Text hb1 primary>₹{this.props.item.AveragePrice}</Text>
                        </View>
                    </View>

                    <View marginV-10 paddingV-10>
                        <Text h2 secondary>Final Budget</Text>
                        <View row>
                            {this.props.item.DecidedPrice ?
                                <Text hb1 primary>₹{this.props.item.DecidedPrice}</Text> :
                                <Text hb1 primary>Chat to Decide</Text>
                            }
                        </View>
                    </View>

                    <View flex marginV-20>
                        <View row>
                            <Text flex hb2 secondary>Quantity</Text>
                            <Text flex-2 h1>{this.props.item.Quantity}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigateProduct(this.props.item.ProductID)} center marginB-5 style={styles.TouchableOpacity}>
                        <Text h2 secondary flex-15>Visit the product</Text>
                        <Text h2 secondary flex>{">"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigateFabric(this.props.item.FabricID)} center marginT-5 marginB-15 style={styles.TouchableOpacity}>
                        <Text h2 secondary flex-15>Visit the Fabric</Text>
                        <Text h2 secondary flex>{">"}</Text>
                    </TouchableOpacity>
                </ShadowView>
            </View>
        )
    }

    OnlyProduct = () => {
        return (
            <View padding-15>
                <ShadowView style={styles.View}>

                    <View flex row centerH style={{ height: "auto" }}>
                        <TouchableOpacity
                            flex
                            style={{borderRadius:10}}
                            onPress={() => this.props.DisplayImageView(this.props.item.ProductImage)}
                        >
                            <Image
                                style={styles.ImageContainerOnlyProduct}
                                source={{ uri: this.props.item.ProductImage }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View marginT-10>
                        <Text h2 secondary>Average Cost</Text>
                        <View row>
                            <Text hb1 primary>₹{this.props.item.AveragePrice}</Text>
                        </View>
                    </View>

                    <View marginV-10 paddingV-10>
                        <Text h2 secondary>Final Budget</Text>
                        <View row>
                            {this.props.item.DecidedPrice ?
                                <Text hb1 primary>₹{this.props.item.DecidedPrice}</Text> :
                                <Text hb1 primary>Chat to Decide</Text>
                            }
                        </View>
                    </View>

                    <View flex marginV-10>
                        <View row>
                            <Text flex hb2 secondary>Quantity</Text>
                            <Text flex-2 h1>{this.props.item.Quantity}</Text>
                        </View>
                    </View>

                    <View row center>
                        <TouchableOpacity
                            onPress={() => this.props.navigateProduct(this.props.item.ProductID)}
                            flex
                            center
                            marginH-5 style={styles.TouchableOpacity}
                        >
                            <Text h2 secondary flex-15>Visit the Product</Text>
                            <Text h2 secondary flex>{">"}</Text>
                        </TouchableOpacity>
                    </View>
                </ShadowView>
            </View>
        )
    }

    render() {
        switch (this.props.item.ProductType) {
            case 1:
                return <this.OnlyProduct {...this.props} />
            case 2:
                return <this.ProductWithFabric {...this.props} />
            default:
                return <></>
        }

    }
}

const styles = StyleSheet.create({
    View: {
        borderRadius: 10,
        borderColor: Colors.shadow,
        borderWidth: 1,
        padding: 10,
        shadowColor: Colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
        backgroundColor: Colors.white,
    },
    TouchableOpacity: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.shadow,
        flexDirection: "row",
        paddingHorizontal: 15
    },
    ImageContainer: {
        height: windowWidth*0.8,
        width: windowWidth*0.6,
        borderTopLeftRadius:10
    },
    ImageContainerOnlyProduct: {
        height: windowWidth*0.8,
        width: '100%',
        borderTopLeftRadius:10
    },
    FabricContainer:  {
        height: windowWidth*0.8,
        width: 'auto',
        borderTopRightRadius:10
    },
});
