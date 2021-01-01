import React from 'react';
import {Dimensions} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import BookMarkIcon from "../Icons/BookMarkIcon";
import Colors from '../Style/Colors';
import {MachineWashIcon} from "../Icons/Secondary/MachineWashIcon";



export default class FabricScreenPartOne extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            FabricWishlist : this.props.FabricWishlist === 1 ? true : false
        }
    }

    onBookmarkPress = () => {

        if(this.props.Token) {
            if(!this.state.FabricWishlist)
            {
                this.props.AddToWishlistFn(this.props.FabricID, this.props.Token);
                this.setState({
                    FabricWishlist : !this.state.FabricWishlist
                })
            }
            else
            {
                this.props.RemoveFromWishlistFn(this.props.FabricID, this.props.Token);
                this.setState({
                    FabricWishlist : !this.state.FabricWishlist
                })
            }
        } else {
            this.props.NavigateLogin();
        }
    };


    onShare = async () => {
        /*try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    ////console.log(result.activityType);
                } else {
                    ////console.log(result.activityType);
                }
            } else if (result.action === Share.dismissedAction) {
                ////console.log(result.action);
            }
        } catch (error) {
            ////console.log(error.message);
        }
        */
    }

    render() {
        return (
            <View flex primary marginL-15 marginR-15>
                <View row marginV-5>
                    <View flex-7 centerV>
                        <Text b1 black>
                            {this.props.Title}
                        </Text>
                    </View>

                    <View flex-end>
                        <TouchableOpacity flex centerV onPress={this.onBookmarkPress}>
                            <BookMarkIcon Fill={this.state.FabricWishlist} size={28} Color={Colors.primary}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View marginT-10 paddingH-15 center row style={{height:50,width:Dimensions.get('window').width,marginLeft:-15, backgroundColor:Colors.shadow}}>
                    <MachineWashIcon size={30} Color={Colors.black}/>
                    <Text marginL-10 h2>Dry cleaning is recommended for the first wash!</Text>
                </View>
            </View>

        );
    }
};