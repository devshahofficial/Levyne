import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import {View,TouchableOpacity,Text} from 'react-native-ui-lib';
import Colors from '../../Style/Colors';
import BrandItemContainer from '../../components/BrandItemContainer';
import PickerModal from "../../components/PickerModal";
import {SettingsIcon} from "../../Icons/SettingsIcon";
import Loader from '../../components/Loader';

export default class ProductSearchScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            sortModel: false,
            scrollY: new Animated.Value(0)
        }
        this.actionCompanyItems = [
            {
                id: 0,
                label: 'Relevance',
                onPress: () => {
                    this.setSortModel();
                    this.props.setBrandSort(0);
                }
            },
            {
                id: 1,
                label: 'Located near me',
                onPress: () => {
                    this.setSortModel();
                    this.props.setBrandSort(1);
                }
            },
            {
                id: 2,
                label: 'A-Z',
                onPress: () => {
                    this.setSortModel();
                    this.props.setBrandSort(2);
                }
            },
            {
                id: 3,
                label: 'Z-A',
                onPress: () => {
                    this.setSortModel();
                    this.props.setBrandSort(3);
                }
            },
            {
                id: 4,
                label: 'Newly Added',
                onPress: () => {
                    this.setSortModel();
                    this.props.setBrandSort(4);
                }
            },
        ];
    }

    setSortModel = () => {
        this.setState({
            sortModel : !this.state.sortModel
        })
    }

    render() {
        return (
            <View flex>
                <PickerModal
                    ActionItems={this.actionCompanyItems}
                    modalVisible={this.state.sortModel}
                    setModalVisible={this.setSortModel}
                />
                <Animated.View
                    style={{
                        transform: [{translateY: 0}],
                        position: 'absolute',
                        zIndex: 1, flexDirection: 'row'
                    }}
                >
                    <TouchableOpacity
                        flex style={{...styles.Filter, borderRightColor: Colors.shadow, borderRightWidth: 1}} center
                        onPress={this.setSortModel}
                    >
                        <SettingsIcon size={18} Color={Colors.black} />
                        <Text hb1 secondary marginL-10>Sort</Text>
                    </TouchableOpacity>
                </Animated.View>
                {
                    this.props.LoadingBrands ? 
                    <Loader />
                    :
                    <Animated.FlatList
                        data={this.props.BrandData}
                        ListHeaderComponent={<View marginV-20></View>}
                        renderItem={({ item }) => <BrandItemContainer item={item} navigateBrand={this.props.navigateBrand}/>}
                        keyExtractor={(item) => 'Brand' + item.BrandID}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View flex centerV centerH style={{height:605}} paddingH-40>
                                <Text center b1 grey50>Your brand is what other people say about you when you are not in the room.  </Text>
                                <Text center h3 grey50 marginT-10>- Jeff Bezoz, Founder & CEO of Amazon  </Text>
                            </View>
                        }
                        onEndReached={this.props.onBrandEndReached}
                        onEndReachedThreshold={0.75}
                    />
                }
            </View>
        );
    }
    
}


const styles = StyleSheet.create({
    Search: {
        width: 370,
        borderRadius: 40,
        borderColor: Colors.white,
        backgroundColor: Colors.white
    },
    searchRow: {
        flex:1,
        backgroundColor: Colors.white
    },
    Input: {
        borderRadius: 30,
        height: 50,
        width: 380,
        marginTop: 10,
        marginHorizontal: 10,
        textAlign: 'center',
    },
    inputText: {
        fontSize: 12,
        color: Colors.black,
        textAlign: 'center',
    },
    flatlist: {
        marginTop: 6,
        marginLeft: 2,
    },
    Filter: {
        height: 40,
        backgroundColor: Colors.white,
        borderBottomColor: Colors.shadow,
        borderBottomWidth: 1,
        borderColor: Colors.white,
        borderWidth: 5,
        flexWrap: 'wrap',
        alignContent: 'center'
    }
});