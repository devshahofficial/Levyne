import React from 'react';
import {Animated, StyleSheet, ActivityIndicator} from 'react-native';
import {View,TouchableOpacity,Text} from 'react-native-ui-lib';
import ProductItemContainer from "../../components/ProductItemContainer";
import colors from "../../assets/colors";
import Colors from '../../Style/Colors';
import PickerModal from "../../components/PickerModal";
//import {FilterIcon} from "../../Icons/FilterIcon";
import {SettingsIcon} from "../../Icons/SettingsIcon";


export default class ProductSearchScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            sortModel: false,
            scrollY: new Animated.Value(0)
        }
        this.actionItems = [
            {
                id: 0,
                label: 'Relevance',
                onPress: () => {
                    this.setSortModel();
                    this.props.setProductSort(0);
                }
            },
            {
                id: 5,
                label: 'Price - high to low',
                onPress: () => {
                    this.setSortModel();
                    this.props.setProductSort(5);
                }
            },
            {
                id: 6,
                label: 'Price - low to high',
                onPress: () => {
                    this.setSortModel();
                    this.props.setProductSort(6);
                }
            },
            {
                id: 8,
                label: 'Manufacturing Time - low to high',
                onPress: () => {
                    this.setSortModel();
                    this.props.setProductSort(8);
                }
            },
            {
                id: 7,
                label: 'Manufacturing Time - high to low',
                onPress: () => {
                    this.setSortModel();
                    this.props.setProductSort(7);
                }
            },
            {
                id: 3,
                label: 'Latest Arrival',
                onPress: () => {
                    this.setSortModel();
                    this.props.setProductSort(3);
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
                    ActionItems={this.actionItems}
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
                    {
                        /*
                        <TouchableOpacity flex
                            style={styles.Filter} center
                        >
                            <FilterIcon size={18} Color={Colors.black} />
                            <Text hb1 secondary marginL-10>Filter</Text>
                        </TouchableOpacity>
                        */
                    }
                </Animated.View>
                {
                    this.props.LoadingProduct ? 
                    <View flex center>
                        <ActivityIndicator />
                    </View>
                    :
                    <Animated.FlatList
                        data={this.props.ProductsData}
                        numColumns={2}
                        ListHeaderComponent={<View marginV-15></View>}
                        renderItem={({ item }) =>
                            <ProductItemContainer
                                Token={this.props.AccessToken}
                                item={item}
                                navigateProduct={this.props.navigateProduct}
                            />
                        }
                        keyExtractor={(item) => 'Product' + item.ProductID}
                        extraData={{
                            navigateProduct: this.props.navigateProduct,
                            Token: this.props.AccessToken
                        }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View flex centerV centerH paddingH-40 style={{height:605}}>
                                <Text center b1 grey50>Learning from mistakes and constantly improving products is a key in all successful companies. </Text>
                                <Text center h3 grey50 marginT-10>- Bill Gates, Founder & Former CEO of Microsoft </Text>
                            </View>
                        }
                        onEndReached={this.props.onProductEndReached}
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
        borderColor: colors.trivisionWhite,
        backgroundColor: colors.trivisionWhite
    },
    searchRow: {
        flex:1,
        backgroundColor: colors.trivisionWhite
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
        color: colors.trivisionBlack,
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