import React from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Text, View, TouchableOpacity, Colors, Checkbox } from 'react-native-ui-lib';

const windowWidth = Dimensions.get('window').width;

const data = [
    {
        name: "Size",
        id: 1
    },
    {
        name: "Brand",
        id: 2
    },
    {
        name: "Price",
        id: 3
    },
    {
        name: "Fabric",
        id: 4
    },
    {
        name: "Rating",
        id: 5
    },
    {
        name: "Occasion",
        id: 6
    },
    {
        name: "Stitch",
        id: 7
    },
    {
        name: "Size",
        id: 8
    },
    {
        name: "Brand",
        id: 9
    },
    {
        name: "Price",
        id: 31
    },
    {
        name: "Fabric",
        id: 42
    },
    {
        name: "Rating",
        id: 53
    },
    {
        name: "Occasion",
        id: 64
    },
    {
        name: "Stitch",
        id: 75
    },
    {
        name: "Size",
        id: 17
    },
    {
        name: "Brand",
        id: 27
    },
    {
        name: "Price",
        id: 37
    },
    {
        name: "Fabric",
        id: 47
    },
    {
        name: "Rating",
        id: 57
    },
    {
        name: "Occasion",
        id: 67
    },
    {
        name: "Stitch",
        id: 77
    }
]

const subItems = [
    {
        value: "s",
        key: 1
    },
    {
        value: "m",
        key: 2
    },
    {
        value: "l",
        key: 3
    },
    {
        value: "xl",
        key: 4
    }
]

const renderItem = ({ item }) => {
    return (
        <TouchableOpacity centerV paddingL-20 style={styles.Item}>
            <Text h1 grey10>{item.name}</Text>
        </TouchableOpacity>
    )
}

const renderList = ({ item }) => {
    return (
        <TouchableOpacity
            centerV
            paddingL-20
            row
            style={[styles.Item, { backgroundColor: Colors.grey80 }]}
        // create a function in onPress which changes the value of Checkbox
        // thus, making the UI better so that even if someone presses any where in the box,
        // checkBox is automatically selected
        >
            <View flex style={{ backgroundColor: Colors.grey80 }}>
                <Checkbox
                    value={item.checkbox}
                    size={18}
                    color={Colors.primary}
                    borderRadius={1}
                />
            </View>
            <View flex-9 marginL-10 style={{ backgroundColor: Colors.grey80 }}>
                <Text h1 grey10>{item.value}</Text>
            </View>
        </TouchableOpacity>
    )
};

export default class Filter extends React.Component {
    render() {
        return (
            <>
                <View style={styles.footer} row>
                    <View marginH-30 centerV>
                        <Text hb1 secondary>Filter</Text>
                    </View>
                    <TouchableOpacity marginH-30 centerV>
                        <Text hb1 primary>Close</Text>
                    </TouchableOpacity>
                </View>

                <View flex row>
                    <View flex-35>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={data}
                            renderItem={renderItem}
                        />
                    </View>

                    <View flex-65>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={subItems}
                            renderItem={renderList}
                        />
                    </View>
                </View>

                <View style={styles.footer} row>
                    <TouchableOpacity marginH-30 centerV>
                        <Text hb1 secondary>Clear All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity marginH-30 centerV>
                        <Text hb1 primary>Apply</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#d4d2d2',
        padding: 16,
        fontSize: 16,

    },
    subListItem: {
        backgroundColor: "#f2f2f2",
        padding: 16,
        fontSize: 16,
    },
    Item: {
        height: 50,
        backgroundColor: Colors.shadow,
        borderColor: Colors.white,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5
    },
    item: {
        flexDirection: "row",

    },
    headerStyle: {
        width: windowWidth,
        height: 50,
    },
    textStyle: {
        color: '#fff',
        width: windowWidth,
        backgroundColor: '#f2f2f2',
        padding: 4,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    texts: {
        color: "#9e9e9e",
        fontWeight: "bold"
    },
    text2: {
        color: "#FF0080",
        fontWeight: "bold"
    },
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "7%",


    },
    text: {
        fontSize: 20,
        textAlign: "left",
        padding: 7,
    },
    footer: {
        width: windowWidth,
        height: 50,
        justifyContent: 'space-between'
    },

})
