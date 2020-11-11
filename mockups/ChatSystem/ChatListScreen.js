import React, {Component, PureComponent} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {ThemeManager, Colors, ListItem, Text, Avatar, AvatarHelper, View, LoaderScreen} from 'react-native-ui-lib'; //eslint-disable-line
import {connect} from 'react-redux';
import TextNavBar from '../../components/TextNavBar';
import FetchChatBuckets from '../../API/GetChatlists';


class ConversationListScreen extends Component {

    constructor(props) {
        super(props);
        if(!this.props.ChatList) {
            this.props.ChatList = [];
        };
        this.Page = 1;

        this.props.Socket.on('ChatMessage', this.SocketListener);
    }

    SocketListener = (Message) => {
        console.log("ChatList: ", Message);
    }

    componentWillUnmount = () => {
        this.props.Socket.off('ChatMessage', this.SocketListener);
    }

    onEndReached = () => {
        if(this.props.ChatList.length >= this.Page*20) {
            FetchChatBuckets(this.props.AccessToken, ++this.Page).then(rows => {
                MarkBucketAsUnRead(rows[1]);
                setChatList(rows[0]);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    renderItem = ({item, index}) => {
        return <ContactItem item={item}/>
    }

    keyExtractor = (item, index) => item.BucketID.toString() + '-' + item.unread.toString();

    render() {
        return (
            <>
                <TextNavBar Title={'Messages'}/>
                {this.props.ChatLoading ? 
                    <View flex center>
                        <LoaderScreen />
                    </View>
                    :
                    <View flex>
                        <FlatList
                            data={
                                this.props.ChatList.map((item, itemIndex) => {2
                                    const initials = AvatarHelper.getInitials(item.Name);
                                    const avatarBadgeProps = item.unread ? {backgroundColor:  Colors.primary} : null;
                                    const imageSource = item.ProfileImage ? {uri: item.ProfileImage} : null;
                                    const listOnPress = () => {
                                        if(item.unread) {
                                            this.props.MarkBucketAsRead(item.BucketID, itemIndex);
                                        }
                                        this.props.navigation.navigate('Chat', {
                                            BucketID : item.BucketID,
                                            Name : item.Name,
                                            Status: item.Status,
                                            BrandID: item.BrandID,
                                            OrderID: item.OrderID,
                                            imageSource,
                                            initials
                                        })
                                    };
                                    return {
                                        ...item,
                                        initials,
                                        avatarBadgeProps,
                                        listOnPress,
                                        imageSource,
                                    };
                                })
                            }
                            ListEmptyComponent={
                                <View flex centerV centerH style={{height:655}} paddingH-40>
                                    <Text center b1 grey40>No messages.</Text>
                                </View>
                            }
                            renderItem={this.renderItem}
                            keyExtractor={this.keyExtractor}
                            onEndReached={this.onEndReached}
                        />
                    </View>
                }
                
            </>
        );
    }
}

class ContactItem extends PureComponent {
    render() {
        const {item} = this.props;
        return (
            <ListItem
                height={75.8}
                onPress={item.listOnPress}
            >
                <ListItem.Part left>
                    <Avatar
                        size={54}
                        source={item.imageSource}
                        label={item.initials}
                        badgeProps={item.avatarBadgeProps}
                        containerStyle={styles.avatar}
                    />
                </ListItem.Part>
                <ListItem.Part middle column containerStyle={styles.border}>
                    <ListItem.Part containerStyle={styles.middle}>
                        <Text style={styles.text} text70 color={Colors.dark10} numberOfLines={1}>{item.Name}</Text>
                        <Text style={styles.subtitle} text90 color={Colors.dark50}>{item.Timestamp}</Text>
                    </ListItem.Part>
                    <ListItem.Part>
                        <Text style={styles.text} text80 color={Colors.dark40} numberOfLines={1}>{item.Message}</Text>
                    </ListItem.Part>
                </ListItem.Part>
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({
    border: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: ThemeManager.dividerColor,
        paddingRight: 17
    },
    avatar: {
        marginHorizontal: 18
    },
    middle: {
        marginBottom: 3
    },
    text: {
        flex: 1,
        marginRight: 10
    },
    subtitle: {
        marginTop: 2
    }
});

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken,
    ChatList : state.Chat.ChatList,
    UserID : state.Auth.UserID,
    ChatLoading: state.Chat.ChatLoading,
    Socket: state.Socket.Socket,
});

const mapDispatchToProps = dispatch => {
	return {
        MarkBucketAsRead: (BucketID, itemIndex) => dispatch({type: 'MarkBucketAsRead', value: BucketID, itemIndex}),
        setChatList : (ChatList) => dispatch({type: 'setChatList', value: ChatList}),
		MarkBucketAsUnRead: (Buckets) => dispatch({type: 'MarkBucketAsUnRead', value: Buckets}),
	}
}

export default connect(mapsStateToProps, mapDispatchToProps)(gestureHandlerRootHOC(ConversationListScreen));
