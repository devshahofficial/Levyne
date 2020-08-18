import React from 'react';
import {StyleSheet, Animated} from 'react-native';
import {View,TouchableOpacity,Text} from 'react-native-ui-lib';
import colors from "../../assets/colors";
import BrandBySearch from '../../API/BrandBySearch';
import Colors from '../../Style/Colors';
import BrandItemContainer from '../../components/BrandItemContainer';
import PickerModal from "../../components/PickerModal";

const actionCompanyItems = [
    {
        id: 1,
        label: 'Popularity',
    },
    {
        id: 5,
        label: 'Customer Rating',
    },
    {
        id: 6,
        label: 'Located near me',
    },
];

export default class ProductSearchScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            sortModel: false,
            scrollY: new Animated.Value(0)
        }
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
                    ActionItems={actionCompanyItems}
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
                </Animated.View>
                <Animated.FlatList
                    data={this.props.BrandData}
                    ListHeaderComponent={<View marginV-25></View>}
                    renderItem={({ item }) => <BrandItemContainer item={item} navigateBrand={this.props.navigateBrand}/>}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View flex centerV centerH style={{height:605}} paddingH-40>
                            <Text center b1 grey50>Your brand is what other people say about you when you are not in the room.  </Text>
                            <Text center h3 grey50 marginT-10>- Jeff Bezoz, Founder & CEO of Amazon  </Text>
                        </View>
                    }
                    onEndReached={() => {
                        if(loadNewPage && props.BrandData.length !== this.TotalBrand) {
                            loadNewPage = false;
                            BrandBySearch(this.state.SearchKey, ++this.BrandPage, null, this.props.AccessToken).then(resp => {
                                loadNewPage = true;
                                if(this.state.SearchKey && this._isMounted) {
                                    this.setState({
                                        BrandData : [...props.BrandData,...resp.Brands]
                                    });
                                }
                            }).catch(() => {
                            });
                        }
                    }}
                    onEndReachedThreshold={0.75}
                />
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