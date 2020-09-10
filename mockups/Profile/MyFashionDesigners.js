import React from 'react';
import {Animated, ActivityIndicator} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import BrandItemContainer from '../../components/BrandItemContainer';
import NavBarBack from "../../components/NavBarBack";

export default class MyFashionDesigners extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sortModel: false,
        }
    }

    render() {
        return (
            <>
                <NavBarBack Title={'My Fashion Designers'} Navigation={this.props.navigation.goBack}/>
                <View flex>
                    {
                        this.props.LoadingBrands ?
                            <View flex center>
                                <ActivityIndicator />
                            </View>
                            :
                            <Animated.FlatList
                                data={this.props.BrandData}
                                ListHeaderComponent={<View marginV-25></View>}
                                renderItem={({ item }) => <BrandItemContainer item={item} navigateBrand={this.props.navigateBrand}/>}
                                keyExtractor={(item) => 'Brand' + item.BrandID}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={
                                    <View flex centerV centerH style={{height:605}} paddingH-40>
                                        <Text center b1 grey50>You aren't following any fashion designer or a tailor.</Text>
                                    </View>
                                }
                                onEndReached={this.props.onBrandEndReached}
                                onEndReachedThreshold={0.75}
                            />
                    }
                </View>
            </>
        );
    }

}
