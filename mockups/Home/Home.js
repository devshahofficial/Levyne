import React from 'react';
import {
    BackHandler,
    Animated,
    ScrollView,
    FlatList,
    Linking,
    Platform,
    Dimensions,
    Image,
    StyleSheet
} from 'react-native';
import {View, Colors, Text, ConnectionStatusBar, Toast, TouchableOpacity} from 'react-native-ui-lib';
import { connect } from 'react-redux';
import HomeNavBar from '../../components/HomeNavBar';
import Category from "../../components/Category";
import FetchStories from '../../API/Home/FetchStories';
import Recent15Products from '../../API/Products/Recent15Products';
import FetchBlogPosts from '../../API/Blogs/FetchBlogPosts';
import PutStoryAsRead from '../../API/Home/PutStoryAsRead';
import timeAgo from '../../API/Chats/timeAgo';
import FetchChatBuckets from '../../API/Chats/FetchChatBuckets';
import Recent15Brands from '../../API/Brand/Recent15Brands';
import { CommonActions } from '@react-navigation/native';
import FetchDesignsByLevyneGender from "../../API/DesignByLevyne/FetchDesignsByLevyneGender";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import Square from "../../components/PosterComponents/Square";
import Rectangle from "../../components/PosterComponents/Rectangle";

const {height} = Dimensions.get('window');


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
            LevyneProducts: [],
            LevyneProductsMale: [],
            LevyneProductsFemale: [],
            Loading: true
        }
        this.backPressed = 0;
        this.abortController = new AbortController();
        this.props.Socket && this.props.Socket.on('ChatMessage', this.SocketListener);
        this.timeout = null;
        this.Page = 0;
        this.NewPageLoading = false;
        this.NewProducts = true;

        if(Platform.OS === 'android') {
            PushNotification.configure({

                onNotification: (notification) => {

                    PushNotification.localNotification({ ...notification.data, onlyAlertOnce: true, visibility: 'private', channelId: 'chatmessages' })

                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                },

                requestPermissions: false,
            });
        }
    };

    SocketListener = () => {
        FetchChatBuckets(this.props.AccessToken, 1, this.abortController.signal).then(rows => {
            this.props.MarkBucketAsUnRead(rows[1], true);
            this.props.setChatList(rows[0], true);
        }).catch(() => { });
    }

    renderCustomContent = () => {
        const { selectedColor } = this.state;
        const backgroundColor = selectedColor === 'none' ? undefined : selectedColor;

        return (
            <View flex padding-10 style={{ backgroundColor }}>
                <Text white h1>
                    {this.state.showContent}
                </Text>
            </View>
        );
    };

    backButtonHandler = () => {
        if (this.props.navigation.isFocused()) {
            if (this.backPressed > 0) {
                BackHandler.exitApp();
            } else {
                this.backPressed++;
                this.setState({ showCustomToast: !this.state.showCustomToast });
                this.setState({ showContent: 'Press Again To Exit' });
                this.BackHandlerTimeOut = setTimeout(() => {
                    this.backPressed = 0,
                        this.setState({ showCustomToast: false });
                }, 2000);
                return true;
            }
        }
    }

    /**
     *
     * @param {{url: string}} param0
     */
    handleOpenURL = ({ url }) => {
        if (url && url.includes('https://collections.levyne.com')) {

            const Paths = url.replace('https://collections.levyne.com', '').split('/');
            if (Paths.length === 3) {
                switch (Paths[1]) {
                    case 'p':
                    case 'P':
                        const ProductID = parseInt(Paths[2]);
                        if (ProductID) {

                            this.props.navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [
                                        {
                                            name: 'MainHomeStack',
                                            state: {
                                                routes: [
                                                    { name: 'Home' },
                                                    { name: 'Product', params: { ProductID } },
                                                ],
                                                index: 1,
                                            }
                                        },
                                    ]
                                })
                            );
                        }
                        break;
                    case 'd':
                    case 'D':
                        const DesignID = parseInt(Paths[2])
                        if (DesignID) {

                            this.props.navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [
                                        {
                                            name: 'MainHomeStack',
                                            state: {
                                                routes: [
                                                    { name: 'Home' },
                                                    { name: 'ProductDetailsPage', params: { DesignID } },
                                                ],
                                                index: 1,
                                            }
                                        },
                                    ]
                                })
                            );
                        }
                        break;
                }
            }
        }
    }

    componentDidMount() {

        BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);

        Linking.addEventListener('url', this.handleOpenURL);

        FetchStories(this.props.AccessToken, this.abortController.signal).then(StoryData => {
            this.setState({ StoryData })
        }).catch(err => {
            console.log('Story', err);
        });

        FetchBlogPosts(this.abortController.signal).then(BlogPosts => {
            BlogPosts = BlogPosts.map(item => {
                item.Timestamp = timeAgo(item.Timestamp);
                return item;
            })
            this.setState({ BlogPosts });
        }).catch(err => {
            console.log(err);
        });

        Recent15Products(this.props.AccessToken, this.abortController.signal).then(Recent15Products => {
            this.setState({ Recent15Products });
        }).catch(err => {
            console.log(err);
        });

        Recent15Brands(this.abortController.signal).then(Recent15Brands => {
            this.setState({ Recent15Brands });
        }).catch(err => {
            console.log(err);
        });

        FetchDesignsByLevyneGender(0, this.abortController.signal).then(LevyneProducts => {
            this.setState({
                LevyneProductsFemale: LevyneProducts,
                Loading: false
            });
        }).catch(console.log);

        FetchDesignsByLevyneGender(1, this.abortController.signal).then(LevyneProducts => {
            this.setState({
                LevyneProductsMale: LevyneProducts,
                Loading: false
            });
        }).catch(console.log);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
        clearTimeout(this.BackHandlerTimeOut);
        clearTimeout(this.timeout);
        this.abortController.abort();
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    navigateProductStory = () => {
        this.setModalVisible();
        this.props.navigation.navigate('Product', { ProductID: this.state.StoryData[this.state.CurrentStory].ProductID });
    }


    navigateSearchText = () => {
        this.props.navigation.navigate('SearchText');
    }

    navigateSearch(SearchFilter) {
        this.props.navigation.push('SearchScreen', { SearchFilter });
    }

    navigateBookMark = () => {
        if (this.props.AccessToken) {
            this.props.navigation.navigate('BookMark');
        } else {
            this.props.navigation.push('Auth', { screen: 'Login' });
        }
    }

    navigateOrders = () => {
        if (this.props.AccessToken) {
            this.props.navigation.navigate('MyOrders');
        } else {
            this.props.navigation.push('Auth', { screen: 'Login' });
        }
    }

    navigateNotifications = () => {
        if (this.props.AccessToken) {
            this.props.navigation.navigate('Notifications');
        } else {
            this.props.navigation.push('Auth', { screen: 'Login' });
        }
    }

    navigateMenu = () => {
        this.props.navigation.navigate('DesignedAtLevyne');
    }

    navigateCall = () => {
        this.props.navigation.navigate('Call');
    }

    ChangeStoryIndex = () => {
        this.setModalVisible();
        setImmediate(() => {
            if (this.state.CurrentStory < (this.state.StoryData.length - 1)) {
                this.ReadStory(this.state.CurrentStory + 1)
            }
        })
    }

    navigateBrandStory = () => {
        this.setModalVisible();
        this.props.navigation.push('BrandProfile', { BrandID: this.state.StoryData[this.state.CurrentStory].BrandID })
    }

    navigateBrand = (BrandID) => {
        this.props.navigation.push('BrandProfile', { BrandID })
    }

    navigateProduct = (ProductID) => {
        this.props.navigation.push('Product', { ProductID: ProductID })
    }

    NavigateLogin = () => {
        this.props.navigation.push("Auth", { screen: 'Login' });
    }


    scrollY = new Animated.Value(0);
    diffClampScrollY = Animated.diffClamp(this.scrollY, 0, 95);
    headerY = this.diffClampScrollY.interpolate({
        inputRange: [64.5, 125],
        outputRange: [-20, -85]
    })

    footerY = this.diffClampScrollY.interpolate({
        inputRange: [0, 40],
        outputRange: [0, 40]
    })

    setModalVisible = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    };


    navigateBlog = (PostID, Title, Image, Timestamp) => {
        this.props.navigation.navigate('BlogPost', { PostID, Title, Image, Timestamp })
    }

    ReadStory = (index) => {
        this.state.StoryData[index].UnRead = 0;
        this.setState({
            modalVisible: true,
            StoryData: this.state.StoryData,
            CurrentStory: index
        });
        PutStoryAsRead(this.state.StoryData[index].ProductID, this.props.AccessToken).catch(() => { })
    }

    NavigateDesign = (DesignID) => {
        this.props.navigation.navigate('ProductDetailsPage', { DesignID })
    }

    NavigateThreeD = (CategoryID, Category) => {
        this.props.navigation.push('ThreeD', {
            CategoryID: CategoryID,
            Category: Category
        })
    }

    render() {
        return (
            <>
                <HomeNavBar
                    navigateSearchText={this.navigateSearchText}
                    navigateBookMark={this.navigateBookMark}
                    navigateOrders={this.navigateOrders}
                    navigateNotifications={this.navigateNotifications}
                    navigateCall={this.navigateCall}
                    // navigateMenu={this.navigateMenu}
                />
                <ConnectionStatusBar
                    useAbsolutePosition
                    onConnectionChange={isConnected => this.setState({ isConnected })}
                />
                <Toast
                    visible={this.state.showCustomToast}
                    position={'bottom'}
                    backgroundColor={Colors.primary}
                >
                    {this.renderCustomContent()}
                </Toast>
                <Animated.View style={{ transform: [{ translateY: this.headerY }], position: 'absolute', zIndex: 1 }}>
                    <ScrollView
                        horizontal={true} style={{ height: 90, alignContent: "center" }}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Category title={'Levyne'} NavigateSearch={() => this.props.navigation.navigate('DesignedAtLevyne')} Image={"https://d32kprqn8e36ns.cloudfront.net/NB0003%20(3).webp"} />
                        <Category title={'Men'} NavigateSearch={() => this.navigateSearch({ Gender: 1, Type: 4, Label: 'Men' })} Image={"https://d32kprqn8e36ns.cloudfront.net/SJ0001.webp"} />
                        <Category title={'Women'} NavigateSearch={() => this.navigateSearch({ Gender: 0, Type: 4, Label: 'Women' })} Image={"https://d32kprqn8e36ns.cloudfront.net/FemaleHP.webp"} />
                        <Category title={'Fusion'} NavigateSearch={() => this.navigateSearch({ Index: 14, Type: 1, Label: 'Fusion' })} Image={"https://d32kprqn8e36ns.cloudfront.net/HA0003.webp"} />
                        <Category title={'Ethnic'} NavigateSearch={() => this.navigateSearch({ Index: 0, Type: 1, Label: 'Ethnic' })} Image={"https://d32kprqn8e36ns.cloudfront.net/RS0017.webp"} />
                    </ScrollView>
                </Animated.View>

                <Animated.ScrollView
                    style={[{ backgroundColor: Colors.white }]}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], { useNativeDriver: true })}
                >
                    <View marginT-120>
                        <View marginB-10 paddingH-20>
                            <Text b1 secondary>Customize Now</Text>
                        </View>
                        <Square NavigateThreeD={this.NavigateThreeD}/>

                        <View marginB-10 marginT-20 paddingH-20>
                            <Text b1 secondary>Shop Now</Text>
                        </View>
                        <Rectangle onPress={() => this.navigateSearch({ Index: 5, Type: 0, Label: 'Blazers' })} Image={"https://d32kprqn8e36ns.cloudfront.net/BlazersHPImages.webp"}/>
                        <Rectangle onPress={() => this.navigateSearch({ Index: 6, Type: 0, Label: 'Lehenga' })} Image={"https://d32kprqn8e36ns.cloudfront.net/LehngaHPImages.webp"}/>

                        <View marginB-10 marginT-20 paddingH-20>
                            <Text b1 secondary>Exciting Offers</Text>
                        </View>
                        <View row>
                            <TouchableOpacity onPress={() => this.navigateSearch({ Index: 6, Type: 0, Label: 'Lehenga' })} flex style={styles.msg}>
                                <Image source={{uri: "https://i.ibb.co/KLVCrJm/Group-4188.jpg"}} style={styles.img} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.navigateSearch({ Index: 6, Type: 0, Label: 'Lehenga' })} flex style={styles.msg}>
                                <Image source={{uri: "https://i.ibb.co/5sZrzP0/Group-4189.jpg"}} style={styles.img} />
                            </TouchableOpacity>
                        </View>

                    </View>

                </Animated.ScrollView>
            </>
        );
    };
}




const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    msg: {
        marginTop: 10,
        height: height * 0.30,
        borderRadius: 10,
        margin: 10,
    },
});

const mapsStateToProps = (state) => ({
    AccessToken: state.Auth.AccessToken,
    Socket: state.Socket.Socket,
});

const mapDispatchToProps = dispatch => {
    return {
        setChatList: (ChatList, EmptyFirst) => dispatch({ type: 'setChatList', value: ChatList, EmptyFirst }),
        MarkBucketAsUnRead: (Buckets, EmptyFirst) => dispatch({ type: 'MarkBucketAsUnRead', value: Buckets, EmptyFirst }),
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(HomeScreen);
