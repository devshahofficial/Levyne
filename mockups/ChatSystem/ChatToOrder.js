import React from 'react';
import {ImageBackground, StyleSheet, Dimensions, SafeAreaView, Platform} from "react-native";
import {View,Text,Colors, Picker, Switch, Button} from 'react-native-ui-lib';
import NavBarBack from '../../components/NavBarBack';
import CstmInput from "../../components/input";
import {ScrollView} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-ui-lib';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerModal from '../../components/Modal/ImagePickerModal';
import CstmShadowView from '../../components/CstmShadowView';

const screenWidth = Dimensions.get('window').width;

/**
 * @type {React.PureComponent}
 * @typedef {object} AccessTokenProps
 * @prop {string} AccessToken
 * @typedef {import('../../Types/index').HomeStackParamList} HomeStackParamList
 * @typedef {RouteProp<HomeStackParamList, 'ChatToOrder'>} ReviewScreenRouteProp
 * @typedef {StackNavigationProp<HomeStackParamList, "ChatToOrder">} ReviewScreenNavigationProps
 * @typedef {AccessTokenProps & { navigation: ReviewScreenNavigationProps, route: ReviewScreenRouteProp }} Props
 * @typedef {{Gender: boolean, Budget: number, Occasion: string, Description: string, Image: string, ImageSize: {width: number, height: number}, modalVisible: boolean}} ChatToOrderState
 * @extends {React.Component<Props, ChatToOrderState>}
 */

export default class ChatToOrder extends React.Component {
    /**
     * @param {Props} props
     */
    constructor(props) {
        super(props);
        this.state = {
            Gender: false,
            Budget: 0,
            Occasion: '',
            Description: '',
            Image: '',
            ImageSize: {
                width: screenWidth,
                height: screenWidth
            },
            modalVisible: false,
        };

        this.BudgetList = [],
        this.OccasionList = [],

        this.Page = 0;
        /**
         * @type {import('react-native-image-crop-picker').Options}
         */
        this.ImagePickerConfig = { cropping: true, mediaType: 'photo', forceJpg: true, width: 600, height: 600 }
    }

    switchGender = () => {
        this.setState({ Gender: !this.state.Gender });
    }

    /**
     * @param {number} Budget
     */
    BudgetOnChange = (Budget) => this.setState({Budget})

    /**
     * @param {string} Occasion
     */
    OccasionOnChange = (Occasion) => this.setState({Occasion})

    /**
     * @param {string} Description
     */
    onDescriptionChange = (Description) => this.setState({Description})

    /**
     * @param {string} item
     */
    PicketItemRender = (item) => (
        <Picker.Item
            key={item}
            value={item}
            label={item}
        />
    )

    /**
     * @param {import('react-native-image-crop-picker').Image} ImageData
     */
    HandleImagePicker = (ImageData) => {
        this.setState({
            Image: Platform.OS === 'ios' ? 'file:///' + ImageData.path : ImageData.path,
            ImageSize: {
                width: ImageData.width,
                height: ImageData.height
            },
            modalVisible: !this.state.modalVisible
        });
    }

    ShowGallery = () => {
        ImagePicker.openPicker(this.ImagePickerConfig).then(this.HandleImagePicker).catch(() => {})
    }

    ShowCamera = () => {
        ImagePicker.openCamera(this.ImagePickerConfig).then(this.HandleImagePicker).catch(() => {})
    }

    RemoveImage = () => {
        this.setState({Image: ''});
    }

    setModalVisible = () => {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    selectBrand = () => {
        this.props.navigation.push("BrandListForChat", {
            Gender: this.state.Gender,
            Budget: this.state.Budget,
            Occasion: this.state.Occasion,
            Description: this.state.Description,
            Image: this.state.Image
        })
    }

    render() {
        return (
            <>
                <NavBarBack Title={'Tell us more about your taste'} Navigation={this.props.navigation.goBack}/>

                <SafeAreaView style={{flex: 1}}>
                    <ScrollView
                        contentContainerStyle={{backgroundColor:Colors.white, paddingHorizontal:20}}
                    >
                        <View marginV-30 row center>
                            <Text marginH-20 secondary hb1>Male</Text>
                            <Switch
                                onColor={Colors.primary}
                                offColor={Colors.shadow}
                                height={30} width={60} thumbSize={20}
                                value={this.state.Gender}
                                onValueChange={this.switchGender}
                            />
                            <Text marginH-20 secondary hb1>Female</Text>
                        </View>

                        <ImagePickerModal
                            modalVisible={this.state.modalVisible}
                            setModalVisible={this.setModalVisible}
                            ShowGallery={this.ShowGallery}
                            ShowCamera={this.ShowCamera}
                        />

                        <Picker
                            titleStyle={styles.titleStyle}
                            placeholder="None"
                            title="Budget"
                            value={this.state.Budget}
                            enableModalBlur={false}
                            onChange={this.BudgetOnChange}
                            topBarProps={{
                                title: 'Budget  ',
                                titleStyle: {fontFamily: 'Mulish-Regular', lineHeight:18, fontSize: 16}
                            }}
                        >
                            {this.BudgetList.map(this.PicketItemRender)}
                        </Picker>

                        <Picker
                            titleStyle={styles.titleStyle}
                            placeholder="None"
                            title="Occasion"
                            value={this.state.Occasion}
                            enableModalBlur={false}
                            onChange={this.OccasionOnChange}
                            topBarProps={{
                                title: 'Occasion',
                                titleStyle: {fontFamily: 'Mulish-Regular', lineHeight:18, fontSize: 16}
                            }}
                        >
                            {this.OccasionList.map(this.PicketItemRender)}
                        </Picker>

                        <Text marginT-10 h1 secondary>
                            Please describe the outfit in a few words:
                        </Text>
                        <CstmInput
                            placeholder="Tell us something about the outfit!"
                            placeholderTextColor={Colors.grey50}
                            style={{height:150, borderRadius:20, marginBottom:20}}
                            value={this.state.Description}
                            onChangeText={this.onDescriptionChange}
                        />

                        <View paddingR-50>
                            <Text h3 padding-50 secondary>**Let us know about the colours, embroideries, fabric you are looking for, etc...**</Text>
                        </View>
                        {
                            this.state.Image ?
                                <ImageBackground
                                    source={{uri: this.state.Image}}
                                    style={styles.ImageBG}>
                                    <TouchableOpacity onPress={this.RemoveImage} style={styles.iconCircle}>
                                        <Text b1 primary>
                                            x
                                        </Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                                :
                                <TouchableOpacity onPress={this.setModalVisible} flex center style={{height: screenWidth*0.5}}>
                                    <Text b1 primary>+</Text>
                                </TouchableOpacity>
                        }
                        <CstmShadowView style={{marginBottom: 20}}>
                            <Button onPress={this.selectBrand} flex hb1 label='Select Brand' />
                        </CstmShadowView>
                    </ScrollView>
                </SafeAreaView>
            </>
        );
    }

};

const styles = StyleSheet.create({
    titleStyle:{
        fontFamily: 'Mulish-Regular',
        lineHeight:15,
        fontSize: 14
    },
    slider: {
        marginVertical: 6
    },
    ImageBG : {
        alignItems : 'flex-end',
        width: '100%',
        alignSelf : 'center',
        height: screenWidth - 40
    },
    group: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 6
    },
    iconCircle: {
        borderRadius: 45,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        width: 45,
        margin : 10,
        backgroundColor: Colors.white,
        borderColor: Colors.white,
    }
});

