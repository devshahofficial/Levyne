import React from 'react';
import {Dimensions, FlatList, Share, StyleSheet} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import {ShareIcon} from "../Icons/ShareIcon";
import {BookMarkIcon} from "../Icons/BookMarkIcon";
import Colors from '../Style/Colors';
import {StarIcon} from "../Icons/StarIcon";
import {MachineWashIcon} from "../Icons/Secondary/MachineWashIcon";

const Stars = (props) => {
    let i;
    const stars = [];
    for(i = 0; i<props.BrandRating; i++)
    {
        stars.push(true);
    }
    for(i = props.BrandRating; i<5; i++)
    {
        stars.push(false);
    }
    return (
        stars.map((name, i) => {
            return (<StarIcon key={i.toString()} Fill={name} height={15} width={15} Color={Colors.primary}/>);
        })
    );
}


const defaultColors = ["#ff99cc","#7ac1ff"];


export default class FabricScreenPartOne extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            FabricWishlist : this.props.FabricWishlist === 1 ? true : false
        }
    }

    onBookmarkPress = () => {
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

    };
    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    //console.log(result.activityType);
                } else {
                    //console.log(result.activityType);
                }
            } else if (result.action === Share.dismissedAction) {
                //console.log(result.action);
            }
        } catch (error) {
            //console.log(error.message);
        }
    }

    render() {
        return (
            <View flex primary marginL-15 marginR-15>
                <Text b1 black marginV-3>
                    {this.props.Title}
                </Text>
                {this.props.Dyeable && <View marginT-10 paddingH-15 center row style={{height:50,width:Dimensions.get('window').width,marginLeft:-15, backgroundColor:Colors.shadow}}>
                    <MachineWashIcon size={30} Color={Colors.black}/>
                    <Text marginL-10 h2>Dry cleaning is recommended for the first wash!</Text>
                </View>}
                <View row>
                    <View flex-7>
                        <Text marginV-3 h1 secondary>
                            {this.props.ShortDescription}
                        </Text>
                        <View row marginV-10>
                            <View row marginR-15>
                                <Stars BrandRating={Math.round(this.props.FabricRating)} />
                            </View>
                            <Text h2>
                                {this.props.FabricRating} Ratings
                            </Text>
                        </View>
                        <View row bottom>
                            <Text b1 primary>₹{this.props.DiscountPrice}</Text>
                            <Text h1 marginL-5 secondary style={{textDecorationLine: 'line-through'}}>₹{this.props.ActualPrice}</Text>
                            <Text h1 marginL-5 black>{Math.round((this.props.ActualPrice-this.props.DiscountPrice)/this.props.ActualPrice * 100)}% off</Text>
                        </View>
                    </View>

                    <View flex-end>
                        <TouchableOpacity marginV-10 onPress={this.onBookmarkPress}>
                            <BookMarkIcon Fill={this.state.ProductWishlist} size={28} Color={Colors.primary}/>
                        </TouchableOpacity>
                        <TouchableOpacity marginV-10 onPress={this.onShare}>
                            <ShareIcon size={24} Color={Colors.primary}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View marginT-20 style={{marginHorizontal: -15}}>
                    <FlatList
                        data={this.props.Styles}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => (
                            <View
                                centerV
                                style={[{backgroundColor: defaultColors[index%2]}, styles.Tags]}>
                                <Text hb2 white>
                                    {item}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </View>

        );
    }
};

const styles = StyleSheet.create({
    Tags: {
        height: 40,
        borderRadius:50,
        paddingHorizontal: 20,
        marginHorizontal: 6
    },
})
