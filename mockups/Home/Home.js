import React from 'react';
import {BackHandler, Animated, ScrollView, FlatList} from 'react-native';
import {View, Colors, Text, ConnectionStatusBar, Toast} from'react-native-ui-lib';
import {connect} from 'react-redux';
import HomeNavBar from '../../components/HomeNavBar';
import Category from "../../components/Category";
import BlogContent from "../../components/BlogContent";
import Stories from "../../components/Stories";
import StoryModal from "../../components/StoryModal";
import FetchStories from '../../API/FetchStories';
import PutStoryAsRead from '../../API/PutStoryAsRead';


ConnectionStatusBar.registerGlobalOnConnectionLost(() => {

});

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCustomToast: false,
            showContent: '',
            isConnected: true,
            StoryData: []
        }
        this.backPressed = 0;
        this.abortController = new AbortController();
    };

    renderCustomContent = () => {
        const {selectedColor} = this.state;
        const backgroundColor = selectedColor === 'none' ? undefined : selectedColor;

        return (
            <View flex padding-10 style={{backgroundColor}}>
                <Text white h1>
                    {this.state.showContent}
                </Text>
            </View>
        );
    };

    backButtonHandler = () => {
		if(this.props.navigation.isFocused())
		{
			if(this.backPressed > 0){
				BackHandler.exitApp();
			}else {
				this.backPressed++;
                this.setState({showCustomToast: !this.state.showCustomToast});
                this.setState({showContent:'Press Again To Exit'});
                this.BackHandlerTimeOut = setTimeout( () => { this.backPressed = 0}, 2000);
				return true;
			}
		}
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);
        FetchStories(this.props.AccessToken, this.abortController.signal).then(StoryData => {
            console.log(StoryData);
            this.setState({StoryData})
        }).catch(err => {
            console.log(err);
        })
	}

	componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
        clearTimeout(this.BackHandlerTimeOut)
    }

    navigateSearch = () => {
        this.props.navigation.navigate('SearchText');
    }
    navigateBookMark = () => {
        this.props.navigation.navigate('BookMark');
    }
    navigateCart = () => {
        this.props.navigation.navigate('Cart');
    }
    navigateNotifications = () => {
        this.props.navigation.navigate('Notifications');
    }
    navigateMenu = () => {
        this.props.navigation.navigate('ProductDetailsPage');
    }

    scrollY = new Animated.Value(0);
    diffClampScrollY = Animated.diffClamp(this.scrollY,0,95);
    headerY = this.diffClampScrollY.interpolate({
        inputRange:[64.5,125],
        outputRange:[-20,-85]
    })

    footerY = this.diffClampScrollY.interpolate({
        inputRange:[0,40],
        outputRange:[0,40]
    })

    setModalVisible = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    };

    navigateAddStory = () => {
        this.props.navigation.navigate('AddStory')
    }

    navigateBlog = (Title, Content, Image, Published) => {
        this.props.navigation.navigate('BlogPost', {
            Content: Content,
            Title: Title,
            Image: Image,
            Published: Published
        })
    }

    ReadStory = (index) => {
        this.state.StoryData[index].UnRead = 0;
        this.setState({
            modalVisible: true,
            selectedStoryIndex: index,
            StoryData: this.state.StoryData
        });
        PutStoryAsRead(this.state.StoryData[index].ProductID, this.props.AccessToken).catch(console.log)
    }

    render() {
        return (
            <>
                <HomeNavBar
                    navigateSearch={this.navigateSearch}
                    navigateBookMark={this.navigateBookMark}
                    navigateCart={this.navigateCart}
                    navigateNotifications={this.navigateNotifications}
                    navigateMenu={this.navigateMenu}
                />
                <ConnectionStatusBar
                    useAbsolutePosition
                    onConnectionChange={isConnected => this.setState({isConnected})}
                />
                <Toast
                    visible={this.state.showCustomToast}
                    position={'bottom'}
                    backgroundColor={Colors.primary}
                >
                    {this.renderCustomContent()}
                </Toast>
                <Animated.View style={{transform:[{translateY:this.headerY}], position:'absolute', zIndex:1 }}>
                    <View>
                        <ScrollView
                            horizontal={true} style={{height:90, alignContent:"center"}}
                            showsHorizontalScrollIndicator={false}
                        >
                            <Category title={'Men'} Image={"https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}/>
                            <Category title={'Women'} Image={"https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}/>
                            <Category title={'Accessories'} Image={"https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}/>
                        </ScrollView>
                    </View>
                </Animated.View>

                <Animated.ScrollView
                    style={[{backgroundColor:Colors.white}]}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    onScroll={Animated.event([{nativeEvent:{contentOffset:{y:this.scrollY}}}], {useNativeDriver: true})}
                >
                    {isFinite(this.state.selectedStoryIndex) &&
                    <StoryModal
                        modalVisible={this.state.modalVisible}
                        setModalVisible={this.setModalVisible}
                        StoryItem={this.state.StoryData[this.state.selectedStoryIndex]}
                        setDeleteModalVisible={this.setDeleteModalVisible}
                    />
                    }

                    <View marginT-100>
                        <Text b1 secondary marginL-20>
                            Sensations From Levyne
                        </Text>
                        <FlatList
                            data={this.state.StoryData}
                            horizontal={true}
                            ListHeaderComponent={
                                this.state.StoryAddAllowed && <Stories
                                    ProfileImage={require('../../assets/images/Plus.webp')}
                                    ReadStory={this.navigateAddStory}
                                />
                            }
                            renderItem={({item, index}) => {
                                return <Stories
                                    ProfileImage={{uri: item.BrandProfileImage}}
                                    ReadStory={() => this.ReadStory(index)}
                                    UnRead={item.UnRead}
                                />
                            }}
                            keyExtractor={(item) => item.ProductID.toString()}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    <View marginT-30 paddingH-10>
                        <View row>
                            <Text b1 secondary flex>Blogs</Text>
                            <Text h3 primary marginR-10 flexS>Swipe {'->'}</Text>
                        </View>
                        <FlatList
                            data={this.state.BlogPosts}
                            horizontal={true}
                            renderItem={({ item }) => {
                                return <BlogContent
                                    Navigation={this.navigateBlog}
                                    Content={item.Content}
                                    Headline={item.Title}
                                    Image={item.Image}
                                    Published={item.Published}
                                    ImageBig={item.ImageBig}
                                />
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </Animated.ScrollView>
            </>
        );
    };
}


const mapsStateToProps = state => ({
	AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(HomeScreen)
