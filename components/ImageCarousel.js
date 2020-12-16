import React, { Component } from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import { Carousel, Text, View, TouchableOpacity } from 'react-native-ui-lib';
import colors from "../assets/colors";

export default class ImageCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0,
        }
    }

    onPagePress = index => {
        this.carousel.goToPage(index, true);
    };

    render() {
        return (
            <Carousel
                containerStyle={{height: this.props.height}}
                ref={ref => this.carousel = ref}
                onChangePage={(activeSlide) => this.setState({activeSlide})}
                key={'Carousel'}
                pageControlPosition={'under'}
                pageControlProps={{
                    onPagePress: this.onPagePress,
                    size : 7
                }}
            >
                    {this.props.imageURL.map((item, index) => {
                    if (this.props.imageURL.length !== 5 && index === this.props.imageURL.length) {
                        // console.log(item);
                        return (
                            <View key={index.toString()} style={{...styles.addImageButtonView, width: this.props.width, height: this.props.height}}>
                                <TouchableOpacity style={[styles.iconCircle, {width : 80, height: 80}]} onPress={() => {this.props.addImage()}}>
                                    <Text f1 primary>+</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    if (index !== 4) {
                        return (
                            <ImageBackground key={index.toString()} source={{uri: item}} style={{...styles.ImageBG, width: this.props.width, height: this.props.height}}>
                                <TouchableOpacity style={styles.iconCircle} onPress={() => this.props.removeImage(index)}>
                                    <Text b1 primary>x</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        )
                    }
                    if (this.props.imageURL.length === 5 && index === this.props.imageURL.length - 1) {
                        return (
                            <View key={index.toString()} style={styles.addImageButtonView}>
                                <Text>Maximum 4 images are allowed</Text>
                            </View>
                        )
                    }
                })}
            </Carousel>
        )
    }


}

const styles = StyleSheet.create({
    addImageButtonView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    addImageButton: {
        width: 100,
        height: 50,
        // backgroundColor:'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addImageText: {
        color: colors.trivisionPink,
    },
    ImageBG : {
        alignItems : 'flex-end',
        alignSelf : 'center'
    },
    iconCircle: {
        borderRadius: 45,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        width: 45,
        margin : 10,
        backgroundColor: colors.trivisionWhite,
        borderColor: colors.trivisionWhite,
    }
})
