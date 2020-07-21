import React, {Component, PureComponent} from 'react';
import {StyleSheet, Alert, FlatList} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {ThemeManager, Colors, ListItem, Text, Avatar, AvatarHelper, Drawer, Button, View} from 'react-native-ui-lib'; //eslint-disable-line
import {connect} from 'react-redux';
import TextNavBar from '../components/TextNavBar';


class ConversationListScreen extends Component {

    constructor(props) {
        super(props);
        this.lastIndex = undefined;
        this.refArray = [];
        this.batchCounter = 0;
        if(!this.props.ChatList) {
            this.props.ChatList = [];
        }
    }


    getNewItems() {
        //New chat API
    }

    closeLast(index) {
        if (this.lastIndex !== undefined && this.lastIndex !== index) {
            this.closeDrawer(this.lastIndex);
        }
        this.lastIndex = index;
    }

    closeDrawer(index) {
        this.refArray[index].closeDrawer();
    }

    addRef = (ref, index) => {
        this.refArray[index] = ref;
    }

    onEndReached = () => {
        this.getNewItems();
    }

    onSwipeableWillOpen = (props) => {
        this.closeLast(props.index);
    }

    renderItem = ({item, index}) => {
        return <ContactItem item={item} index={index} addRef={this.addRef} onSwipeableWillOpen={this.onSwipeableWillOpen}/>
    }

    keyExtractor = (item, index) => `${item.name}-${index}`;

    render() {
        return (
            <>
                <TextNavBar Title={'Messages'}/>
                <View flex>
                    <FlatList
                        data={
                            this.props.ChatList ?
                                this.props.ChatList.map((item, index) => {
                                    const initials = AvatarHelper.getInitials(item.BrandName);
                                    const avatarBadgeProps = item.count ? {backgroundColor:  Colors.blue90} : null;
                                    const listOnPress = () => this.props.navigation.navigate('Chat', {
                                        ChatID : item.ChatID,
                                        BrandID : item.ChatID.replace('Chat-' + this.props.BrandID + 'N', ''),
                                        BrandName : item.BrandName,
                                        BrandImage : item.Thumbnail
                                    });
                                    const imageSource = item.Thumbnail ? {uri: item.Thumbnail} : null;
                                    const leftButton = {
                                        text: 'Delete',
                                        background: Colors.red10,
                                        onPress: () => Alert.alert(`Delete`)
                                    };

                                    return {
                                        ...item,
                                        initials,
                                        avatarBadgeProps,
                                        listOnPress,
                                        imageSource,
                                        leftButton
                                    };
                                }) : []
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
        const {item, index, addRef, onSwipeableWillOpen} = this.props;
        if(item.Timestamp) {
            this.Hours = item.Timestamp.timeHours;
            this.minute = item.Timestamp.timeMinutes;
        } else {
            this.Hours = 0;
            this.minute = 0;
        }
        return (
            <Drawer
                leftItem={item.leftButton}
                // itemsMinWidth={80}
                ref={r => addRef(r, index)}
                index={index} // sent for the 'closeLast' functionality
                onSwipeableWillOpen={onSwipeableWillOpen} // sent for the 'closeLast' functionality
            >
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
                            <Text style={styles.text} text70 color={Colors.dark10} numberOfLines={1}>{item.BrandName}</Text>
                            <Text style={styles.subtitle} text90 color={Colors.dark50}>{this.Hours + ":" + this.minute}</Text>
                        </ListItem.Part>
                        <ListItem.Part>
                            <Text style={styles.text} text80 color={Colors.dark40} numberOfLines={1}>{item.LastMessage}</Text>
                            {item.count > 0 && <Button size={'small'} label={item.count} onPress={item.buttonPress}/>}
                        </ListItem.Part>
                    </ListItem.Part>
                </ListItem>
            </Drawer>
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
    access_token : state.Auth.access_token,
    ChatList : state.Chat.ChatList,
    BrandID : state.Auth.BrandID
});



export default connect(mapsStateToProps)(gestureHandlerRootHOC(ConversationListScreen));
