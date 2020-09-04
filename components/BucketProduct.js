import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { View,TouchableOpacity, Text, Colors} from 'react-native-ui-lib';
import {ArchiveIcon} from "../Icons/ArchiveIcon";

export default class BucketProduct extends React.PureComponent {
    render() {
        return (
            <View style={styles.View}>
                <View row>
                    <View padding-15 flex>
                        <Text hb2>Outfit</Text>
                        <Image
                            style={{height: 150,width: 150}}
                            source={{uri:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"}}
                        />
                        <Text h2 secondary numberOfLines={2} ellipsizeMode='tail'>Short Description</Text>
                        <Text h2>₹100</Text>
                    </View>
                    <View padding-15 flex>
                        <Text hb2>Fabric</Text>
                        <Image
                            style={{height: 150,width: 150}}
                            source={{uri:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"}}
                        />
                        <Text h2 secondary numberOfLines={2} ellipsizeMode='tail'>Short Description of Fabric</Text>
                        <Text h2>₹100</Text>
                    </View>
                </View>
                <View>
                    <View row>
                        <Text h1 secondary>Total Cost: </Text>
                        <Text hb1 primary>$200</Text>
                    </View>
                    <View row>
                        <Text h1 secondary>Size: </Text>
                        <Text hb1 primary>M</Text>
                    </View>
                </View>
                <TouchableOpacity center marginT-15 marginB-5 style={styles.TouchableOpacity}>
                    <Text h2 secondary flex-10>Visit the product</Text>
                    <Text h2 secondary flex>{">"}</Text>
                </TouchableOpacity>
                <TouchableOpacity center marginT-5 marginB-15 style={styles.TouchableOpacity}>
                    <Text h2 secondary flex-10>Visit the Fabric</Text>
                    <Text h2 secondary flex>{">"}</Text>
                </TouchableOpacity>
                <View style={{justifyContent: "flex-end"}}>
                    <TouchableOpacity activeOpacity={0.8} center style={{width:40, height:40, backgroundColor:Colors.red30, borderRadius:5}}>
                        <ArchiveIcon Size={25} Color={Colors.white}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    View: {
        borderRadius: 10,
        borderColor: Colors.grey50,
        borderWidth: 1,
        padding: 10,
        margin:10
    },
    TouchableOpacity: {
        height: 40,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: Colors.shadow,
        flexDirection: "row",
        paddingHorizontal: 15
    }
});
