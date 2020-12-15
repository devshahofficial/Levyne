import React from 'react';
import {StyleSheet, Dimensions, FlatList} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import {DescriptionCard} from "./ReadMore";
import Category from "./Category";
import Colors from "../Style/Colors";
import {MachineWashIcon} from "../Icons/Secondary/MachineWashIcon";
import {HandWashIcon} from "../Icons/Secondary/HandWashIcon";
import {TimerIcon} from "../Icons/Secondary/TimerIcon";



export default class ProductScreenPartTwo extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            pressCounter: 0,
            Wash: 2,
            Days: 10
        }
    }

    DryCleanWash = () => {
        return(
            <>
                <MachineWashIcon size={30} Color={Colors.black}/>
                <Text marginL-10 h2>Dry cleaning is recommended!</Text>
            </>
        )
    }

    MachineWash = () => {
        return(
            <>
                <MachineWashIcon size={30} Color={Colors.black}/>
                <Text marginL-10 h2>Machine wash is recommended!</Text>
            </>
        )
    }

    HandWash = () => {
        return(
            <>
                <HandWashIcon size={30} Color={Colors.black}/>
                <Text marginL-10 h2>Hand wash is recommended!</Text>
            </>
        )
    }

    checkSwitch = (Wash) => {

        switch (Wash) {

            case 1:
                return this.MachineWash();
            case 2:
                return this.HandWash();
            default:
                return this.DryCleanWash();

        }
    }

    NavigateSearch = (SearchFilter) => {
        this.props.navigation.push('SearchScreen', {SearchFilter});
    }

    render() {
        return (
            <View marginT-30 marginB-20 marginH-15>
                <Text hb1>Product Description</Text>
                <DescriptionCard CompleteDescription = {this.props.LongDescription} />

                <View marginT-20 paddingH-15 center row style={{height:50,width:Dimensions.get('window').width,marginLeft:-15, backgroundColor:Colors.shadow}}>
                    <TimerIcon size={30} Color={Colors.black}/>
                    <Text marginL-10 h2>Approximate Delivery within {this.props.ApprxDaysForProduction} days.</Text>
                </View>

                <Text hb1 marginT-20>Fabric Description</Text>
                <DescriptionCard CompleteDescription = {this.props.FabricDescription} />
                <TouchableOpacity>
                    <View style={{marginHorizontal: -15}}>
                        <FlatList
                            data={this.props.Materials}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            extraData={this.props.navigation}
                            keyExtractor={(item) => item}
						    renderItem={({item, index}) => (
                                <Category
                                    title={item}
                                    NavigateSearch={() => this.NavigateSearch({Type: 2, Index: this.props.MaterialIDs[index], Label: item})}
                                    ImageStyle={styles.Image}
                                />
                            )}
                        />
                    </View>
                </TouchableOpacity>
                <View marginT-10 paddingH-15 center row style={{height:50,width:Dimensions.get('window').width,marginLeft:-15, backgroundColor:Colors.shadow}}>
                    {
                        this.checkSwitch(this.props.FabricWashType)
                    }
                </View>
            </View>

        );
    }

};


const styles = StyleSheet.create({
    Tags: {
        height: 40,
        borderRadius:50,
        paddingVertical: 20
    },
    Image: {
        height: 60,
        width:200,
        borderRadius: 5,
        alignSelf: 'center',
        paddingTop: Platform.OS === 'ios' ? 5 : 0,
        justifyContent: 'center',
        margin: 15,
    },
})
