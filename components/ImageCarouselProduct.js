import React, {Component} from 'react';
import {Dimensions, ActivityIndicator} from 'react-native';
import {Carousel, AnimatedImage, Colors, TouchableOpacity} from 'react-native-ui-lib';

const screenWidth = Dimensions.get('window').width;

/**
 * @type {React.Component}
 * @extends {React.Component<{height: number,ProductImages: string[], width: number, DisplayModal: (index: number) => void }>}
 **/


export default class ImageCarouselProduct extends Component{
    /**
     * @param {{ height: number; ProductImages: string[]; width: number; DisplayModal: (index: number) => void; }} props
     */
    constructor(props) {
        super(props);
        this.state = {
            activeSlide : 0
        }
        this.carousel = null;
    }
    /**
     * @param {number} index
     */
    onPagePress = index => {
        // @ts-ignore
        this.carousel?.goToPage(index, true);
    };
    render() {
        return (
            <Carousel
                containerStyle={{height:screenWidth * 1.5 + 40}}
                ref={ref => this.carousel = ref}
                onChangePage={(activeSlide) => this.setState({activeSlide})}
                key={'Carousel'}
                // @ts-ignore
                pageControlPosition={'under'}
                pageControlProps={{
                    onPagePress: this.onPagePress,
                    size : 7
                }}
            >
                {this.props.ProductImages.map((item, index) => (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.DisplayModal(index)} key={index.toString()}>
                        <AnimatedImage
                            containerStyle={{backgroundColor: Colors.blue60}}
                            source={{uri: item}}
                            loader={<ActivityIndicator />}
                            style={{width:screenWidth,height:screenWidth * 1.5}}
                            animationDuration={index === 0 ? 300 : 800}
                        />
                    </TouchableOpacity>
                ))}
            </Carousel>
        )
    }


}
