import React, {Component} from 'react';
import {Dimensions, ActivityIndicator} from 'react-native';
import {Carousel, AnimatedImage, Colors} from 'react-native-ui-lib';

export default class ImageCarouselProduct extends Component{
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
                containerStyle={{height:this.props.height}}
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
                    <AnimatedImage
                        key={index.toString()}
                        containerStyle={{backgroundColor: Colors.blue60}}
                        source={{uri: item}}
                        loader={<ActivityIndicator />}
                        style={{width:Dimensions.get('window').width,height:this.props.height}}
                        animationDuration={index === 0 ? 300 : 800}
                    />
                ))}
            </Carousel>
        )
    }


}
