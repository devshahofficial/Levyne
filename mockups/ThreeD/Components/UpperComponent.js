import React from 'react';
import { StyleSheet} from 'react-native';
import {Text, TouchableOpacity, Colors } from "react-native-ui-lib";
import CstmShadowView from "../../../components/CstmShadowView";

export default class UpperComponent extends React.PureComponent {


    render() {
        return (
            <CstmShadowView style={styles.shadow}>
                <TouchableOpacity
                    padding-15
                    style={this.props.index === this.props.selected ? styles.boxSelected : styles.box}
                    onPress={() => (this.props.onUpperPressed(this.props.index))}
                >
                    <Text h2 secondary> {this.props.item.Model} </Text>
                </TouchableOpacity>
            </CstmShadowView>


        )
    }
}

const BOX_WIDTH = "auto";
const BOX_HEIGHT = 60;
const BOX_RADIUS = 15;

const styles = StyleSheet.create({
    shadow: {
        height: BOX_HEIGHT,
        width: BOX_WIDTH,
        borderRadius: BOX_RADIUS,
        marginRight: 25,
        marginBottom: 10
    },
    box:{
        alignItems: 'center',
        justifyContent: 'center',
        height: BOX_HEIGHT,
        width: BOX_WIDTH,
        borderRadius: BOX_RADIUS,
        // backgroundColor:'blue',
    },
    boxSelected:{
        borderRadius: BOX_RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        height: BOX_HEIGHT,
        width: BOX_WIDTH,
        borderColor:Colors.primary,
        borderWidth: 2
    },

})
