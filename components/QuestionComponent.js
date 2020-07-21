import React from 'react';
import { View,Text,StyleSheet, } from 'react-native';
import {Button, Icon} from '@ui-kitten/components';
import colors from "../assets/colors";

const PlusIcon = (style) => (
    <Icon {...style} name='plus' fill='white'/>
);

export const QuestionComponent = (props) =>{
    return(
        <View style={{marginLeft:10}}> 
            <Button
                icon={PlusIcon}
                style={[styles.Button,{width:140, marginTop:10, marginBottom:10}]}
                size='small'
            >Add a Question</Button>
            <View style={styles.Main}>
                <View style={styles.QView}>
                    <Text style={styles.Question}>
                        Q : {props.Question}
                    </Text>
                </View>
                <View style={styles.AView}>
                    <Text style={styles.Answer}>
                        {props.Answer}
                    </Text>
                </View>
                <View style={styles.BView}>
                    <Button style={styles.Button} size='tiny' icon={PlusIcon}>
                        Add an Answer
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Question:{
        fontSize:15,
        fontWeight:'bold',
        color:colors.trivisionBlue
    },
    Answer:{
        fontSize:14,
        color: colors.trivisionBlue
    },
    Button:{
        width:110,
        borderRadius:50,
        backgroundColor:colors.trivisionGrey,
        borderColor:colors.trivisionGrey
    },
    Main:{
        flexDirection:'column',
    },
    QView:{
        flex:1,
        paddingBottom:5
    },
    AView:{
        flex:1,
        paddingBottom:10,
        marginLeft:20
    },
    BView:{
        flex:1,
        paddingLeft:20
    },

})
