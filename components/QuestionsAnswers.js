import React from 'react';
import { Text, View, StyleSheet, LayoutAnimation, Platform, UIManager, TouchableOpacity } from 'react-native';
import {Icon} from '@ui-kitten/components';
import colors from "../assets/colors";
import { QuestionComponent } from '../components/QuestionComponent';

export default class QuestionsAnswers extends React.PureComponent {
    constructor() {
        super();

        this.state = { expanded: false }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.btnTextHolder}>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={styles.Btn}>
                        <View style={{justifyContent: 'center',flexDirection:'row'}}>
                            <View style={{flexDirection:'row',flex:9}}>
                                <Text style={{fontSize:16, color:colors.trivisionBlue}}>
                                    Questions and Answers
                                </Text>
                            </View>
                            <Icon
                                name={this.state.expanded ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'}
                                width={24} height={24}
                                fill={colors.trivisionBlue}
                                style={{flex:1}}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.expanded ? null : 0, overflow: 'hidden' }}>
                        <QuestionComponent/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        marginTop:30,
        marginBottom:200,
    
    },

    text: {
        fontSize: 17,
        color: 'black',
        padding: 10
    },

    btnText: {
        textAlign: 'center',
        color: colors.trivisionWhite,
        fontSize: 20
    },

    btnTextHolder: {
        borderWidth: 1,
        borderColor:colors.trivisionWhite,
    },
    Btn: {
        padding: 10,
        backgroundColor: colors.trivisionWhite,
        elevation:1,
        borderColor: colors.trivisionWhite
    }
});
