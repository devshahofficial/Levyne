import React from 'react';
import {View, Carousel, Image, Button, Colors} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const data = [
    'https://images.pexels.com/photos/4698490/pexels-photo-4698490.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    'https://images.pexels.com/photos/4698742/pexels-photo-4698742.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/4698741/pexels-photo-4698741.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/4698740/pexels-photo-4698740.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    'https://images.pexels.com/photos/4698739/pexels-photo-4698739.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/4698738/pexels-photo-4698738.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
]

const INITIAL_PAGE = 0;

class AppTour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0,
            numberOfPagesShown: 7,
            limitShownPages: false,
            currentPage: INITIAL_PAGE,
            index:5
        }
    }

    onChangePage = currentPage => {
        this.setState({currentPage});
    };

    onPagePress = index => {
        this.carousel.goToPage(index, true);
    };

    navigateHome = () => {
        AsyncStorage.setItem('AppTour', 'done').catch(() => {});
        this.props.navigation.navigate('MainHomeStack');
    };

    render() {

        return (
            <View flex>
                    <Carousel
                        containerStyle={{flex:1}}
                        initialPage={0}
                        onChangePage={this.onChangePage}
                        pageControlPosition={'over'}
                        pageControlProps={{onPagePress: this.onPagePress}}
                    >
                        {data.map((item, index) => (
                            <View flex key={index.toString()}>
                                <Image
                                    style={{flex:1}}
                                    key={item}
                                    source={{uri:item}}
                                />
                            </View>
                        ))}
                    </Carousel>
                <View>
                    <Button
                        marginH-120 marginV-20 outlineColor={Colors.primary}
                        label='Skip Tutorial' white h1
                        onPress={this.navigateHome}
                    />
                </View>
                </View>
        );
    }

};

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(AppTour);
