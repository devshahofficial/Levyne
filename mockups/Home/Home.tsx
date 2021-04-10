import React from 'react';
import {
    BackHandler,
    Animated,
    ScrollView,
    //FlatList,
    Linking,
    Platform,
    Dimensions,
    Image,
    StyleSheet
} from 'react-native';
import {View, Colors, Text, ConnectionStatusBar, Toast, TouchableOpacity } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import HomeNavBar from '../../components/HomeNavBar';
import Category from "../../components/Category";
//import FetchStories from '../../API/Home/FetchStories';
//import Recent15Products from '../../API/Products/Recent15Products';
//import FetchBlogPosts from '../../API/Blogs/FetchBlogPosts';
//import FetchDesignsByLevyneGender from "../../API/DesignByLevyne/FetchDesignsByLevyneGender";
//import timeAgo from '../../API/Chats/timeAgo';
//import Recent15Brands from '../../API/Brand/Recent15Brands';
//import PutStoryAsRead from '../../API/Home/PutStoryAsRead';
import FetchChatBuckets from '../../API/Chats/FetchChatBuckets';
import HandleShareURL from '../../API/Home/HandleShareURL';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import Square from "../../components/PosterComponents/Square";
import Rectangle from "../../components/PosterComponents/Rectangle";
import FetchBucketsPendingForReview from '../../API/Orders/FetchBucketsPendingForReview';
import StarIconsWithPress from '../../components/StarIconsWithPress';
import CloseReviewModal from '../../API/Orders/CloseReviewModal';
import {CancelIcon} from "../../Icons/Cancel";
import { Socket } from 'socket.io-client';
import {HomeStackParamList} from '../../Types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import ListWishlistProductIDs from '../../API/Products/ListWishlistProductIDs';

const {width} = Dimensions.get('window');

interface Chat {
    Message: string,
    Timestamp: string,
    id: number,
    unread: 0 | 1,
    Name: string,
    ProfileImage: string,
    BrandID: number,
    ItemCount: number,
    Status: number,
    OrderID: number,
    BucketID: number
}

interface Wishlist {
    Products: Number[],
    Fabrics: Number[]
}

type HomeScreenProps = {
    Socket: Socket,
    navigation: StackNavigationProp<HomeStackParamList, 'Home'>,
    AccessToken: String,
    MarkBucketAsUnRead: (Buckets: number[], EmptyFirst?: boolean) => void,
    setChatList: (Chats: Chat[], EmptyFirst?: boolean) => void,
    setWishlist: (Wishlist: Wishlist) => void
}

type HomeScreenState = {
    showCustomToast: boolean,
    showContent: string,
    isConnected: boolean,
    Rating: number[],
    PendingReviews: {Name: string, ProfileImage: string, BucketID: number, OrderID: number, BrandID: number}[]
}

class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {

    backPressed: number;
    abortController: AbortController;
    Page: number;
    NewPageLoading: boolean;
    NewProducts: boolean;
    BackHandlerTimeOut: null | NodeJS.Timer;

    constructor(props: HomeScreenProps) {
        super(props);
        this.state = {
            showCustomToast: false,
            showContent: '',
            isConnected: true,
            //StoryData: [],
            //BlogPosts: [],
            //Recent15Products: [],
            //Recent15Brands: [],
            //modalVisible: false,
            //CurrentStory: null,
            //LevyneProducts: [],
            //LevyneProductsMale: [],
            //LevyneProductsFemale: [],
            //Loading: true,
            Rating: [0],
            PendingReviews: []
        }
        this.backPressed = 0;
        this.abortController = new AbortController();
        this.props.Socket && this.props.Socket.on('ChatMessage', this.SocketListener);
        this.Page = 0;
        this.NewPageLoading = false;
        this.NewProducts = true;
        this.BackHandlerTimeOut = null

        if(Platform.OS === 'android') {
            PushNotification.configure({

                onNotification: (notification) => {

                    PushNotification.localNotification({ ...notification.data, message: notification.data.message, onlyAlertOnce: true, visibility: 'private', channelId: 'chatmessages' })

                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                },

                requestPermissions: false,
            });
        }
    };

    UpdateRating = (index: number, OrderID: number, Rating: number) => {
        this.state.PendingReviews.splice(index, 1);
        this.setState({PendingReviews: this.state.PendingReviews});
        this.props.navigation.navigate('AddReview', { OrderID, Rating });
    }

    CloseRatingToast = (index: number, OrderID: number) => {
        this.state.PendingReviews.splice(index, 1);
        this.setState({PendingReviews: this.state.PendingReviews});
        CloseReviewModal(OrderID, this.props.AccessToken);
    }

    SocketListener = () => {
        FetchChatBuckets(this.props.AccessToken, 1, this.abortController.signal).then(rows => {
            this.props.MarkBucketAsUnRead(rows[1], true);
            this.props.setChatList(rows[0], true);
        }).catch(() => { });
    }

    renderCustomContent = () => {

        return (
            <View flex padding-10 style={{ backgroundColor: undefined }}>
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

    handleOpenURL = ({ url }: { url: string; }) => {
        if (url && url.includes('https://collections.levyne.com')) {

            interface Map {
                [key: string]: 1 | 2 | 3 | 4 | 5
            }

            const ScreenIDs : Map = {
                'p': 1,
                'P': 1,
                'f': 2,
                'F': 2,
                'd': 3,
                'D': 3,
                'm': 4,
                'M': 4,
                'B': 5,
                'b': 5
            }

            const Paths = url.replace('https://collections.levyne.com', '').split('/');
            if (Paths.length === 3) {

                HandleShareURL(ScreenIDs[Paths[1]], parseInt(Paths[2]), this.props.navigation);
            } else if(ScreenIDs[Paths[1]] === 4 && Paths.length === 4) {
                HandleShareURL(ScreenIDs[Paths[1]], Paths[3], this.props.navigation, Paths[2]);
            }
        }
    }

    componentDidMount() {

        BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);

        Linking.addEventListener('url', this.handleOpenURL);

        FetchBucketsPendingForReview(this.props.AccessToken, this.abortController.signal).then(PendingReviews => {
            this.setState({PendingReviews})
        }).catch(err => {
            console.log(err);
        })

        ListWishlistProductIDs(this.props.AccessToken).then((Wishlist: Wishlist) => {
            this.props.setWishlist(Wishlist);
        }).catch(console.log);
        /*
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

        Recent15Products(this.abortController.signal).then(Recent15Products => {
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

        */
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
        if(this.BackHandlerTimeOut) {
            global.clearTimeout(this.BackHandlerTimeOut);
        }
        this.abortController.abort();
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    /*
    navigateProductStory = () => {
        this.setModalVisible();
        this.props.navigation.navigate('Product', { ProductID: this.state.StoryData[this.state.CurrentStory].ProductID });
    }
    */

    navigateSearchText = () => {
        this.props.navigation.navigate('SearchText');
    }

    navigateSearch(SearchFilter: { Gender?: number; Type: 0 | 1 | 2 | 3 | 4; Label: string; Index?: number; }) {
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

    navigateQRCode = () => {
        //this.props.navigation.navigate('DesignedAtLevyne');
        this.props.navigation.navigate('QRCodeReader');
    }

    navigateCall = () => {
        this.props.navigation.navigate('Call');
    }

    /*
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
     */

    navigateBrand = (BrandID: number) => {
        this.props.navigation.push('BrandProfile', { BrandID })
    }

    navigateProduct = (ProductID: number) => {
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

    /*
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
    */

    NavigateDesign = (DesignID: number) => {
        this.props.navigation.navigate('DesignScreen', { DesignID })
    }

    NavigateChatToOrder = () => {
        this.props.navigation.navigate('ChatToOrder')
    }

    NavigateThreeD = (CategoryID: number, Category: string) => {
        this.props.navigation.push('ThreeD', {
            CategoryID: CategoryID,
            Category: Category
        })
    }

    render() {
        return (
            <View flex>
                <HomeNavBar
                    navigateSearchText={this.navigateSearchText}
                    navigateBookMark={this.navigateBookMark}
                    navigateOrders={this.navigateOrders}
                    //navigateNotifications={this.navigateNotifications}
                    //navigateCall={this.navigateCall}
                    navigateQRCode={this.navigateQRCode}
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
                    {/*<View marginT-120 paddingH-20>
                        <Text b1 secondary>Chat Now</Text>
                    </View>
                    <Rectangle Image={"https://d32kprqn8e36ns.cloudfront.net/ChatToPlace.webp"} onPress={this.NavigateChatToOrder}/>*/}

                    <View marginT-120 paddingH-20>
                        <Text b1 secondary>Shop Now</Text>
                    </View>
                    <View row>
                        <TouchableOpacity onPress={() => this.navigateSearch({ Gender: 1, Type: 4, Label: 'Man' })} style={styles.Discount}>
                            <Image source={{uri: "https://d32kprqn8e36ns.cloudfront.net/MenLevyne-min.png"}} style={styles.img} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.navigateSearch({ Gender: 0, Type: 4, Label: 'Women' })} style={styles.Discount}>
                            <Image source={{uri: "https://d32kprqn8e36ns.cloudfront.net/WomenLevyne-min.png"}} style={styles.img} />
                        </TouchableOpacity>
                    </View>

                    <View marginB-10 marginT-20 paddingH-20>
                        <Text b1 secondary>Customize Now</Text>
                    </View>
                    <Square NavigateThreeD={this.NavigateThreeD}/>

                    <View marginB-10 marginT-20 paddingH-20>
                        <Text b1 secondary>Premium Collections</Text>
                    </View>
                    <Rectangle onPress={() => this.navigateSearch({ Index: 5, Type: 0, Label: 'Blazers' })} Image={"https://d32kprqn8e36ns.cloudfront.net/BlazersHPImages.webp"}/>
                    <Rectangle onPress={() => this.navigateSearch({ Index: 6, Type: 0, Label: 'Lehenga' })} Image={"https://d32kprqn8e36ns.cloudfront.net/LehngaHPImages.webp"}/>

                    <View marginB-10 marginT-20 paddingH-20>
                        <Text b1 secondary>Exciting Offers</Text>
                    </View>
                    <View row>
                        <TouchableOpacity onPress={() => this.navigateSearch({ Index: 8, Type: 0, Label: 'Bridal' })} flex style={styles.msg}>
                            <Image source={{uri: "https://d32kprqn8e36ns.cloudfront.net/Group-4188.jpg"}} style={styles.img} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.navigateSearch({ Index: 7, Type: 0, Label: 'Indo-Western' })} flex style={styles.msg}>
                            <Image source={{uri: "https://d32kprqn8e36ns.cloudfront.net/Group-4189.jpg"}} style={styles.img} />
                        </TouchableOpacity>
                    </View>

                </Animated.ScrollView>
                {
                    this.state.PendingReviews.length ?
                        <Toast
                            visible={true}
                            position={'bottom'}
                        >
                            <View flex paddingB-20>
                                <ScrollView
                                    horizontal={true}
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {this.state.PendingReviews.map((item: { OrderID: number; Name: string; }, index: number) => {
                                        const UpdateRating = (Rating: any) => this.UpdateRating(index, item.OrderID, Rating);
                                        const CloseRatingToast = () => this.CloseRatingToast(index, item.OrderID);
                                        return (
                                            <View key={item.OrderID.toString()} style={{width:width}}>
                                                <TouchableOpacity right onPress={CloseRatingToast} margin-15>
                                                    <CancelIcon size={22} Color={Colors.secondary}/>
                                                </TouchableOpacity>
                                                <Text hb2 secondary center marginH-10>{"Rate your experience with " + item.Name}</Text>
                                                <View row marginV-20 center>
                                                    <StarIconsWithPress Rating = {this.state.Rating[index] || 0} UpdateRating={UpdateRating}  />
                                                </View>
                                            </View>
                                        )
                                    })}
                                </ScrollView>
                            </View>
                        </Toast>
                        : <></>
                }

            </View>
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
        width: 0.4475*width,
        height: 0.581*width,
        borderRadius: 10,
        margin: 10,
    },
    Discount: {
        height: width * 0.45,
        width: width * 0.45,
        borderRadius: 10,
        margin: 10,
        flex:1
    }
});

const mapsStateToProps = (state: { Auth: { AccessToken: string; }; Socket: { Socket: Socket; }; }) => ({
    AccessToken: state.Auth.AccessToken,
    Socket: state.Socket.Socket,
});

const mapDispatchToProps = (dispatch: (arg0: { type: string; value: any; EmptyFirst?: any; }) => void) => {
    return {
        setChatList: (ChatList: Chat[], EmptyFirst?: boolean) => dispatch({ type: 'setChatList', value: ChatList, EmptyFirst }),
        setWishlist: (Wishlist: Wishlist) => dispatch({ type: 'setWishlist', value: Wishlist }),
        MarkBucketAsUnRead: (Buckets: number[], EmptyFirst?: boolean) => dispatch({ type: 'MarkBucketAsUnRead', value: Buckets, EmptyFirst }),
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(HomeScreen);
