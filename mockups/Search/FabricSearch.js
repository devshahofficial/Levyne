import React from 'react';
import {Dimensions, Animated, StyleSheet, ActivityIndicator} from 'react-native';
import {View,TouchableOpacity,Text} from 'react-native-ui-lib';
import FabricItemContainer from "../../components/FabricItemContainer";
import colors from "../../assets/colors";
import Colors from '../../Style/Colors';
import PickerModal from "../../components/PickerModal";

const screenHeight = Dimensions.get('window').height * 0.75;

export default class FabricSearchScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            sortModel: false,
            scrollY: new Animated.Value(0)
        }
        this.actionItems = [
            {
                id: 1,
                label: 'Latest Arrival',
                onPress: () => {
                    this.setSortModel();
                    this.props.setFabricSort(1);
                }
            },
            {
                id: 2,
                label: 'Price high to low',
                onPress: () => {
                    this.setSortModel();
                    this.props.setFabricSort(2);
                }
            },
            {
                id: 3,
                label: 'Discount',
                onPress: () => {
                    this.setSortModel();
                    this.props.setFabricSort(3);
                }
            },
            {
                id: 4,
                label: 'Price low to high',
                onPress: () => {
                    this.setSortModel();
                    this.props.setFabricSort(4);
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
                        flex style={styles.Filter} center
                        onPress={this.setSortModel}
                    >
                        <Text hb1 secondary>Sort</Text>
                    </TouchableOpacity>
                    <TouchableOpacity flex
                        style={styles.Filter} center
                    >
                        <Text hb1 secondary>Filter</Text>
                    </TouchableOpacity>
                </Animated.View>
                {
                    this.props.LoadingFabrics ? 
                    <View flex center>
                        <ActivityIndicator />
                    </View>
                    :
                    <Animated.FlatList
                        data={this.props.FabricsData}
                        numColumns={2}
                        ListHeaderComponent={<View marginV-25></View>}
                        renderItem={({ item }) =>
                            <FabricItemContainer
                                Token={this.props.AccessToken}
                                item={item}
                                navigateFabric={this.props.navigateFabric}
                                height={screenHeight}
                            />
                        }
                        keyExtractor={(item) => 'Fabric' + item.FabricID}
                        extraData={{
                            navigateFabric: this.props.navigateFabric,
                            Token: this.props.AccessToken
                        }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View flex centerV centerH paddingH-40 style={{height:605}}>
                                <Text center b1 grey50>Learning from mistakes and constantly improving Fabrics is a key in all successful companies. </Text>
                                <Text center h3 grey50 marginT-10>- Bill Gates, Founder & Former CEO of Microsoft </Text>
                            </View>
                        }
                        onEndReached={this.props.onFabricEndReached}
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
        height: 60,
        backgroundColor: Colors.shadow,
        borderColor: Colors.white,
        borderWidth: 5
    }
});