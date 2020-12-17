import React from 'react';
import {BackHandler, Animated, ScrollView, FlatList} from 'react-native';
import {View, Colors, Text, ConnectionStatusBar, Toast} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import HomeNavBar from '../../components/HomeNavBar';
import Category from "../../components/Category";
import BlogContent from "../../components/BlogContent";
import Stories from "../../components/Stories";
import StoryModal from "../../components/StoryModal";
import FetchStories from '../../API/FetchStories';
import Recent15Products from '../../API/Recent15Products';
import ProductItemContainer from "../../components/ProductItemContainer";
import FetchBlogPosts from '../../API/FetchBlogPosts';
import PutStoryAsRead from '../../API/PutStoryAsRead';
import timeAgo from '../../API/timeAgo';
import FetchChatBuckets from '../../API/FetchChatBuckets';
import Recent15Brands from '../../API/Recent15Brands';
import PopularBrands from "../../components/PopularBrands";


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCustomToast: false,
            showContent: '',
            isConnected: true,
            StoryData: [],
            BlogPosts: [],
            Recent15Products: [],
            Recent15Brands: [],
            modalVisible: false,
            CurrentStory: null,
        }
        this.backPressed = 0;
        this.abortController = new AbortController();
        this.props.Socket && this.props.Socket.on('ChatMessage', this.SocketListener);
        this.timeout = null;
    };

    SocketListener = () => {
        FetchChatBuckets(this.props.AccessToken, 1, this.abortController.signal).then(rows => {
            this.props.MarkBucketAsUnRead(rows[1], true);
            this.props.setChatList(rows[0], true);
        }).catch(() => {});
    }

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
            this.setState({StoryData})
        }).catch(err => {
            console.log('Story',err);
        });

        FetchBlogPosts(this.abortController.signal).then(BlogPosts => {
            BlogPosts = BlogPosts.map(item => {
                item.Timestamp = timeAgo(item.Timestamp);
                return item;
            })
            this.setState({BlogPosts});
        }).catch(err => {
            console.log(err);
        });

        Recent15Products(this.props.AccessToken, this.abortController.signal).then(Recent15Products => {
            this.setState({Recent15Products});
        }).catch(err => {
            console.log(err);
        });

        Recent15Brands(this.abortController.signal).then(Recent15Brands => {
            this.setState({Recent15Brands});
        }).catch(err => {
            console.log(err);
        });
	}

	componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
        clearTimeout(this.BackHandlerTimeOut);
        clearTimeout(this.timeout);
        this.abortController.abort();
    }

    navigateProductStory = () => {
        this.setModalVisible();
        this.props.navigation.navigate('Product', { ProductID : this.state.StoryData[this.state.CurrentStory].ProductID });
    }


    navigateSearchText = () => {
        this.props.navigation.navigate('SearchText');
    }

    navigateSearch(SearchFilter) {
        this.props.navigation.push('SearchScreen', {SearchFilter});
    }

    navigateBookMark = () => {
        this.props.navigation.navigate('BookMark');
    }

    navigateCart = () => {
        this.props.navigation.navigate('MyOrders');
    }

    navigateNotifications = () => {
        this.props.navigation.navigate('Notifications');
    }

    navigateMenu = () => {
        this.props.navigation.navigate('DesignedAtLevyne');
    }

    ChangeStoryIndex = () => {
        this.setModalVisible();
        setImmediate(() => {
            if(this.state.CurrentStory < (this.state.StoryData.length - 1)) {
                this.ReadStory(this.state.CurrentStory + 1)
            }
        })
    }

    navigateBrandStory = () => {
        this.setModalVisible();
        this.props.navigation.push('BrandProfile', {BrandID : this.state.StoryData[this.state.CurrentStory].BrandID})
    }

    navigateBrand = (BrandID) => {
        this.props.navigation.push('BrandProfile', {BrandID})
    }

    navigateProduct = (ProductID) => {
        this.props.navigation.push('Product', {ProductID : ProductID})
    }

    NavigateLogin = () => {
        this.props.navigation.navigate("Login");
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


    navigateBlog = (PostID, Title, Image, Timestamp) => {
        this.props.navigation.navigate('BlogPost', {PostID, Title, Image, Timestamp})
    }

    ReadStory = (index) => {
        this.state.StoryData[index].UnRead = 0;
        this.setState({
            modalVisible: true,
            StoryData: this.state.StoryData,
            CurrentStory: index
        });
        PutStoryAsRead(this.state.StoryData[index].ProductID, this.props.AccessToken).catch(() => {})
    }

    render() {
        return (
            <>
                <HomeNavBar
                    navigateSearchText={this.navigateSearchText}
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
                    <ScrollView
                        horizontal={true} style={{height:90, alignContent:"center"}}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Category title={'Men'} NavigateSearch={() => this.navigateSearch({Gender: 1, Type: 4, Label: 'Men'})} Image={"https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}/>
                        <Category title={'Women'} NavigateSearch={() => this.navigateSearch({Gender: 0, Type: 4, Label: 'Women'})} Image={"https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}/>
                        <Category title={'Fusion'} NavigateSearch={() => this.navigateSearch({Index: 14, Type: 1, Label: 'Fusion'})} Image={"https://images.pexels.com/photos/1078958/pexels-photo-1078958.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}/>
                        <Category title={'Ethnic'} NavigateSearch={() => this.navigateSearch({Index: 0, Type: 1, Label: 'Ethnic'})} Image={"https://images.pexels.com/photos/2293102/pexels-photo-2293102.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}/>
                    </ScrollView>
                </Animated.View>

                <Animated.ScrollView
                    style={[{backgroundColor:Colors.white}]}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    onScroll={Animated.event([{nativeEvent:{contentOffset:{y:this.scrollY}}}], {useNativeDriver: true})}
                >
                    {Number.isFinite(this.state.CurrentStory) &&
                        <StoryModal
                            modalVisible={this.state.modalVisible}
                            setModalVisible={this.setModalVisible}
                            navigateProduct={this.navigateProductStory}
                            StoryItem={this.state.StoryData[this.state.CurrentStory]}
                            setDeleteModalVisible={this.setDeleteModalVisible}
                            NavigateBrand={this.navigateBrandStory}
                            ChangeStoryIndex={this.ChangeStoryIndex}
                        />
                    }

                    <View marginT-100>
                        <Text b1 secondary marginL-20 marginB-10>
                            Sensations From Levyne
                        </Text>
                        <FlatList
                            data={this.state.StoryData}
                            horizontal={true}
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

                    <View marginT-30>
                        <View row paddingH-20>
                            <Text b1 secondary flex>Blogs</Text>
                            <Text h3 primary paddingR-10 flexS>Swipe {'->'}</Text>
                        </View>
                        <FlatList
                            data={this.state.BlogPosts}
                            horizontal={true}
                            renderItem={({ item }) => {
                                return <BlogContent
                                    Navigation={this.navigateBlog}
                                    Headline={item.Title}
                                    Image={item.Image}
                                    Timestamp={item.Timestamp}
                                    ImageBig={item.ImageBig}
                                    PostID={item.BlogID}
                                />
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    <View marginT-30>
                        <View row paddingH-20>
                            <Text b1 secondary flex>Recent Products</Text>
                            <Text h3 primary paddingR-10 flexS>Swipe {'->'}</Text>
                        </View>
                        <FlatList
                            data={this.state.Recent15Products}
                            horizontal={true}

                            renderItem={({item}) => {
                                return <ProductItemContainer
                                    Token={this.props.AccessToken}
                                    item={item}
                                    navigateProduct={this.navigateProduct}
                                    NavigateLogin={this.NavigateLogin}
                                />
                            }}
                            keyExtractor={(item) => item.ProductID.toString()}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View marginT-30>
                        <View row paddingH-20>
                            <Text b1 secondary flex>Recent Brands</Text>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.Recent15Brands}
                            renderItem={({item}) => {
                                return <PopularBrands
                                    item={item}
                                    navigateBrand={this.navigateBrand}
                                />
                            }}
                            keyExtractor={(item) => item.BrandID.toString()}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </Animated.ScrollView>
            </>
        );
    };
}

const mapsStateToProps = (state) => ({
	AccessToken: state.Auth.AccessToken,
	Socket: state.Socket.Socket,
});

const mapDispatchToProps = dispatch => {
	return {
       	setChatList : (ChatList, EmptyFirst) => dispatch({type: 'setChatList', value: ChatList, EmptyFirst}),
		MarkBucketAsUnRead: (Buckets, EmptyFirst) => dispatch({type: 'MarkBucketAsUnRead', value: Buckets, EmptyFirst}),
	}
}

export default connect(mapsStateToProps, mapDispatchToProps)(HomeScreen);
