import React from 'react';
import { ImageBackground, StyleSheet, Dimensions, SafeAreaView, Platform } from "react-native";
import { View, Text, Colors, Picker, Switch, Button, Toast } from 'react-native-ui-lib';
import NavBarBack from '../../components/NavBarBack';
import CstmInput from "../../components/input";
import { ScrollView } from "react-native";
import { TouchableOpacity } from 'react-native-ui-lib';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerModal from '../../components/Modal/ImagePickerModal';
import CstmShadowView from '../../components/CstmShadowView';
import CreateChatBucket from '../../API/Chats/CreateNewChatBucket';
import Loader from '../../components/Loader';
import { connect } from 'react-redux';

const screenWidth = Dimensions.get('window').width;

class ChatToOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Gender: true,
            Budget: 0,
            Occasion: '',
            Description: '',
            Image: '',
            ImageSize: {
                width: screenWidth,
                height: screenWidth
            },
            ShowToast: false,
            ToastContent: '',
            modalVisible: false,
            BudgetListKey: '232',
            OccasionListKey: '2132',
            Loading: false,
        };

        this.abortController = new AbortController();

        this.BudgetList = [''];
        this.OccasionList = [''];

        this.Timeouts = [0];

        this.Page = 0;

        this.ImagePickerConfig = { cropping: true, mediaType: 'photo', forceJpg: true, width: 600, height: 600, includeBase64: true, writeTempFile: false }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    switchGender = () => {
        this.setState({ Gender: !this.state.Gender });
    }

    /**
     * @param {number} Budget
     */
    BudgetOnChange = (Budget) => this.setState({ Budget })

    /**
     * @param {string} Occasion
     */
    OccasionOnChange = (Occasion) => this.setState({ Occasion })

    /**
     * @param {string} Description
     */
    onDescriptionChange = (Description) => this.setState({ Description })

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
            Image: `data:${ImageData.mime};base64,${ImageData.data}`,
            ImageSize: {
                width: ImageData.width,
                height: ImageData.height
            },
            modalVisible: !this.state.modalVisible
        });
    }

    ShowGallery = () => {
        ImagePicker.openPicker(this.ImagePickerConfig).then(this.HandleImagePicker).catch(() => { })
    }

    ShowCamera = () => {
        ImagePicker.openCamera(this.ImagePickerConfig).then(this.HandleImagePicker).catch(() => { })
    }

    RemoveImage = () => {
        this.setState({ Image: '' });
    }

    setModalVisible = () => {
        this.setState({ modalVisible: !this.state.modalVisible })
    }

    componentDidMount() {
        fetch(global.MainURL + 'ProductData.json').then(resp => resp.json()).then(({ OccasionList, BudgetList }) => {
            this.BudgetList = BudgetList,
                this.OccasionList = OccasionList,
                this.setState({
                    // @ts-ignore
                    BudgetListKey: Math.random().toString(),
                    OccasionListKey: Math.random().toString(),
                })
        }).catch(err => { });
    }

    selectBrand = async () => {
        this.Timeouts.forEach(clearTimeout);
        if (!this.state.Budget) {
            this.setState({
                // @ts-ignore
                ShowToast: true,
                ToastContent: 'Please Enter Budget',
            });
            this.Timeouts.push(setTimeout(() => {
                this.setState({
                    // @ts-ignore
                    ShowToast: false,
                });
            }, 3000));
            return;
        }
        if (!this.state.Occasion) {
            this.setState({
                // @ts-ignore
                ShowToast: true,
                ToastContent: 'Please Enter Occasion',
            });
            this.Timeouts.push(setTimeout(() => {
                this.setState({
                    // @ts-ignore
                    ShowToast: false,
                });
            }, 3000));
            return;
        }

        if (this.props.route.params.BrandID) {

            const { BucketID } = await CreateChatBucket(this.props.route.params.BrandID, this.props.AccessToken, this.abortController.signal);
            let Message = `Gender: ${this.props.route.params.Gender ? "Male" : "Female"}\nBudget: ${this.state.Budget.value}\nOccasion: ${this.state.Occasion.value}\n`;

            if (this.state.Description) {
                Message += `Description: ${this.state.Description}`;
            }

            this.setState({
                Loading: false
            });

            this.props.navigation.navigate('Chat', {
                BucketID: BucketID,
                BrandID: this.props.route.params.BrandID,
                Name: this.props.route.params.BrandName,
                Status: -1,
                imageSource: { uri: this.props.route.params.BrandImage },
                Message: Message,
                ImagePath: this.state.Image
            })
        } else {

            this.props.navigation.push("BrandListForChat", {
                Gender: this.state.Gender ? 1 : 0,
                Budget: this.state.Budget.value,
                Occasion: this.state.Occasion.value,
                Description: this.state.Description,
                Image: this.state.Image
            })
        }
    }

    render() {
        return (
            <>
                <NavBarBack Title={'Tell us more about your taste'} Navigation={this.props.navigation.goBack} />

                <SafeAreaView style={{ flex: 1 }}>
                    {this.state.Loading ?
                        <Loader />
                        :
                        <ScrollView
                            contentContainerStyle={{ backgroundColor: Colors.white, paddingHorizontal: 20 }}
                        >
                            <View marginV-30 row center>
                                <Text marginH-20 secondary hb1>Male</Text>
                                <Switch
                                    onColor={Colors.primary}
                                    offColor={Colors.shadow}
                                    height={30} width={60} thumbSize={20}
                                    value={!this.state.Gender}
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
                                key={this.state.BudgetListKey}
                                value={this.state.Budget}
                                enableModalBlur={false}
                                onChange={this.BudgetOnChange}
                                topBarProps={{
                                    title: 'Budget  ',
                                    titleStyle: { fontFamily: 'Mulish-Regular', lineHeight: 18, fontSize: 16 }
                                }}
                            >
                                {this.BudgetList.map(this.PicketItemRender)}
                            </Picker>

                            <Picker
                                titleStyle={styles.titleStyle}
                                placeholder="None"
                                title="Occasion"
                                key={this.state.OccasionListKey}
                                value={this.state.Occasion}
                                enableModalBlur={false}
                                onChange={this.OccasionOnChange}
                                topBarProps={{
                                    title: 'Occasion',
                                    titleStyle: { fontFamily: 'Mulish-Regular', lineHeight: 18, fontSize: 16 }
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
                                style={{ height: 150, borderRadius: 20, marginBottom: 20 }}
                                value={this.state.Description}
                                onChangeText={this.onDescriptionChange}
                            />
                            <Text h3 secondary marginB-20>Let us know about the colours, embroideries, fabric you are looking for, etc...</Text>

                            {
                                this.state.Image ?
                                    <ImageBackground
                                        source={{ uri: this.state.Image }}
                                        style={styles.ImageBG}>
                                        <TouchableOpacity onPress={this.RemoveImage} style={styles.iconCircle}>
                                            <Text b1 primary>
                                                x
                                        </Text>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                    :
                                    <TouchableOpacity onPress={this.setModalVisible} flex center style={{ height: screenWidth * 0.5, borderWidth: 0.8, borderColor: Colors.shadow }}>
                                        <Text h2 primary>Upload an Image of outfit</Text>
                                    </TouchableOpacity>
                            }
                            <CstmShadowView style={{ marginBottom: 20, marginTop: 20 }}>
                                <Button onPress={this.selectBrand} flex h2 label='Select Brand' />
                            </CstmShadowView>
                        </ScrollView>
                    }
                    <Toast
                        visible={this.state.ShowToast}
                        position={'bottom'}
                        backgroundColor={Colors.primary}
                    >
                        <View flex padding-10 paddingB-30 style={{ backgroundColor: Colors.primary }}>
                            <Text white h1>{this.state.ToastContent}</Text>
                        </View>
                    </Toast>
                </SafeAreaView>
            </>
        );
    }

};

const styles = StyleSheet.create({
    titleStyle: {
        fontFamily: 'Mulish-Regular',
        lineHeight: 15,
        fontSize: 14
    },
    slider: {
        marginVertical: 6
    },
    ImageBG: {
        alignItems: 'flex-end',
        width: '100%',
        alignSelf: 'center',
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
        margin: 10,
        backgroundColor: Colors.white,
        borderColor: Colors.white,
    }
});



const mapsStateToProps = state => ({
    AccessToken: state.Auth.AccessToken
});

export default connect(mapsStateToProps)(ChatToOrder)