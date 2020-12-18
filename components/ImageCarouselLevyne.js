import React, {Component} from 'react';
import {Dimensions, ActivityIndicator} from 'react-native';
import {Carousel, AnimatedImage, Colors, TouchableOpacity} from 'react-native-ui-lib';

const screenWidth = Dimensions.get('window').width;

export default class ImageCarouselLevyne extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeSlide : 0
        }
    }
    onPagePress = index => {
        this.carousel.goToPage(index, true);
    };
    render() {
        return (
            <Carousel
                containerStyle={{height:screenWidth}}
                ref={ref => this.carousel = ref}
                onChangePage={(activeSlide) => this.setState({activeSlide})}
                key={'Carousel'}
                pageControlPosition={'under'}
                pageControlProps={{
                    onPagePress: this.onPagePress,
                    size : 7
                }}
            >
                {this.props.ProductImages.map((item, index) => (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.DisplayModal(index)} key={index.toString()}>
                        <AnimatedImage
                            containerStyle={{backgroundColor: Colors.shadow}}
                            source={{uri: item}}
                            loader={<ActivityIndicator />}
                            style={{width:screenWidth,height:screenWidth}}
                            animationDuration={index === 0 ? 300 : 800}
                        />
                    </TouchableOpacity>
                ))}
            </Carousel>
        )
    }


}
