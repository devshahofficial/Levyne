import React from 'react';
import {BackHandler, Animated, ScrollView, FlatList, Linking, Platform, Dimensions} from 'react-native';
import { View, Colors, Text, ConnectionStatusBar, Toast } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import HomeNavBar from '../../components/HomeNavBar';
import Category from "../../components/Category";
import FetchStories from '../../API/Home/FetchStories';
import Recent15Products from '../../API/Products/Recent15Products';
import ProductItemContainer from "../../components/ProductItemContainer";
import FetchBlogPosts from '../../API/Blogs/FetchBlogPosts';
import PutStoryAsRead from '../../API/Home/PutStoryAsRead';
import timeAgo from '../../API/Chats/timeAgo';
import FetchChatBuckets from '../../API/Chats/FetchChatBuckets';
import Recent15Brands from '../../API/Brand/Recent15Brands';
import PopularBrands from "../../components/PopularBrands";
import { CommonActions } from '@react-navigation/native';
import LevyneProductContainer from "../../components/LevyneProductContainer";
import FetchDesignsByLevyneGender from "../../API/DesignByLevyne/FetchDesignsByLevyneGender";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import MakeInIndia from "../../assets/images/MakeInIndia.svg";
import Square from "../../components/Square";
import Rectangle from "../../components/Rectangle";

const deviceWidth = Dimensions.get("window").width;

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
                        <Category title={'Levyne'} NavigateSearch={() => this.props.navigation.navigate('DesignedAtLevyne')} Image={"https://d1g0sqy9wcgheg.cloudfront.net/NB0003%20(3).jpg"} />
                        <Category title={'Men'} NavigateSearch={() => this.navigateSearch({ Gender: 1, Type: 4, Label: 'Men' })} Image={"https://d1g0sqy9wcgheg.cloudfront.net/SJ0001%20(1).jpg"} />
                        <Category title={'Women'} NavigateSearch={() => this.navigateSearch({ Gender: 0, Type: 4, Label: 'Women' })} Image={"https://d1g0sqy9wcgheg.cloudfront.net/NP0010%20(2).jpg"} />
                        <Category title={'Fusion'} NavigateSearch={() => this.navigateSearch({ Index: 14, Type: 1, Label: 'Fusion' })} Image={"https://d1g0sqy9wcgheg.cloudfront.net/HA0003%20(1).jpg"} />
                        <Category title={'Ethnic'} NavigateSearch={() => this.navigateSearch({ Index: 0, Type: 1, Label: 'Ethnic' })} Image={"https://d1g0sqy9wcgheg.cloudfront.net/RS0017%20(1).jpg"} />
                    </ScrollView>
                </Animated.View>

                <Animated.ScrollView
                    style={[{ backgroundColor: Colors.white }]}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], { useNativeDriver: true })}
                >
                    <View marginT-120>

                        <View>
                            <View marginV-10 paddingH-20>
                                <Text b1 secondary>Customize Now</Text>
                            </View>
                            <Square/>
                            <View row marginT-20 paddingH-20>
                                <Text b1 secondary flex>Top trends in Men</Text>
                                <Text h3 primary paddingR-10 flexS>Swipe {'->'}</Text>
                            </View>
                            <FlatList
                                data={this.state.Recent15Products}
                                horizontal={true}

                                renderItem={({ item }) => {
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

                            <View row marginT-20 paddingH-20>
                                <Text b1 secondary flex>Top trends in Women</Text>
                                <Text h3 primary paddingR-10 flexS>Swipe {'->'}</Text>
                            </View>
                            <FlatList
                                data={this.state.Recent15Products}
                                horizontal={true}

                                renderItem={({ item }) => {
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

                        <Rectangle Image={'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8c2hpcnR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'}/>
                        <Rectangle Image={'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8c2hpcnR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'}/>

                        <View row paddingH-20 marginT-30>
                            <Text b1 secondary flex>Fresh in Levyne's Men</Text>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.LevyneProductsMale}
                            contentContainerStyle={{ backgroundColor: 'white' }}
                            renderItem={({ item }) => <LevyneProductContainer
                                Image={item.PrimaryImage}
                                Name={"#" + item.DesignCode}
                                NewDesign={item.NewDesign}
                                NavigateDesign={this.NavigateDesign}
                                DesignID={item.DesignID}
                            />}
                            extraData={{ NavigateDesign: this.NavigateDesign }}
                            keyExtractor={(item) => item.DesignCode}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    <View marginT-30>
                        <View row paddingH-20>
                            <Text b1 secondary flex>Fresh in Levyne's Women</Text>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.LevyneProductsFemale}
                            contentContainerStyle={{ backgroundColor: 'white' }}
                            renderItem={({ item }) => <LevyneProductContainer
                                Image={item.PrimaryImage}
                                NewDesign={item.NewDesign}
                                Name={"#" + item.DesignCode}
                                NavigateDesign={this.NavigateDesign}
                                DesignID={item.DesignID}
                            />}
                            extraData={{ NavigateDesign: this.NavigateDesign }}
                            keyExtractor={(item) => item.DesignCode}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    <View marginT-30>
                        <View row paddingH-20>
                            <Text b1 secondary flex>Brands</Text>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.Recent15Brands}
                            renderItem={({ item }) => {
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
        setChatList: (ChatList, EmptyFirst) => dispatch({ type: 'setChatList', value: ChatList, EmptyFirst }),
        MarkBucketAsUnRead: (Buckets, EmptyFirst) => dispatch({ type: 'MarkBucketAsUnRead', value: Buckets, EmptyFirst }),
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(HomeScreen);
