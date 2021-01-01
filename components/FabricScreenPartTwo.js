import React from 'react';
import {Dimensions} from 'react-native';
import {Colors, View, Text} from 'react-native-ui-lib';
import {DescriptionCard} from "./ReadMore";
import {MachineWashIcon} from "../Icons/Secondary/MachineWashIcon";
import {HandWashIcon} from "../Icons/Secondary/HandWashIcon";
import {ShrinkIcon} from "../Icons/Secondary/ShrinkIcon";

export default class ProductScreenPartTwo extends React.PureComponent {

    /*
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

    checkSwitch=(Wash)=> {

        switch (Wash) {

            case 1:
                return this.MachineWash();
                break;

            case 2:
                return this.HandWash();
                break;

            default:
                return this.DryCleanWash();

        }
    }

    */

    render() {
        return (
            <View marginT-15 marginH-15>
                <View>
                    <Text hb1>Fabric Description</Text>
                    <DescriptionCard CompleteDescription = {this.props.LongDescription}/>
                </View>

                <View marginV-10 paddingH-15 center row style={{height:50,width:Dimensions.get('window').width,marginLeft:-15, backgroundColor:Colors.shadow}}>
                    <MachineWashIcon size={30} Color={Colors.black}/>
                    <Text marginL-10 h2>Machine wash is recommended!</Text>
                </View>

                <View row marginT-10 marginB-10 bottom>
                    <ShrinkIcon size={22} Color={Colors.secondary}/>
                    <Text marginL-15>Fabric might shrink on first wash.</Text>
                </View>

                <View row marginB-20 bottom>
                    <HandWashIcon size={20} Color={Colors.secondary}/>
                    <Text marginL-15>Fabric might lose colour on first wash.</Text>
                </View>
            </View>

        );
    }

};