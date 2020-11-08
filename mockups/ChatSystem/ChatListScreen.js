import React, {Component, PureComponent} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {ThemeManager, Colors, ListItem, Text, Avatar, AvatarHelper, View} from 'react-native-ui-lib'; //eslint-disable-line
import {connect} from 'react-redux';
import TextNavBar from '../components/TextNavBar';


class ConversationListScreen extends Component {

    constructor(props) {
        super(props);
        if(!this.props.ChatList) {
            this.props.ChatList = [];
        }
    }


    getNewItems() {
        //New chat API
    }

    onEndReached = () => {
        this.getNewItems();
    }

    renderItem = ({item, index}) => {
        return <ContactItem item={item}/>
    }

    keyExtractor = (item, index) => item.BucketID.toString();

    render() {
        return (
            <>
                <TextNavBar Title={'Messages'}/>
                <View flex>
                    <FlatList
                        data={
                            this.props.ChatList.map((item) => {
                                const initials = AvatarHelper.getInitials(item.Name);
                                const avatarBadgeProps = item.unread ? {backgroundColor:  Colors.blue90} : null;
                                const listOnPress = () => this.props.navigation.navigate('Chat', {
                                    BucketID : item.BucketID,
                                    Name : item.Name,
                                });
                                const imageSource = item.ProfileImage ? {uri: item.ProfileImage} : null;
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
    BrandID : state.Auth.BrandID
});



export default connect(mapsStateToProps)(gestureHandlerRootHOC(ConversationListScreen));
