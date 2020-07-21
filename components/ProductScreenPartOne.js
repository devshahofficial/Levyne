import React from 'react';
import {Share} from 'react-native';
import {Button,View, Text, TouchableOpacity} from 'react-native-ui-lib';
import CstmShadowView from "./CstmShadowView";
import {ShareIcon} from "../Icons/ShareIcon";
import {BookMarkIcon} from "../Icons/BookMarkIcon";
import Colors from '../Style/Colors';
import {StarIcon} from "../Icons/StarIcon";

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

export default class ProductScreenPartOne extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            ProductWishlist : this.props.ProductWishlist === 1 ? true : false
        }
    }

    onBookmarkPress = () => {
        if(!this.state.ProductWishlist)
        {
            this.props.AddToWishlistFn(this.props.ProductID, this.props.Token);
            this.setState({
                ProductWishlist : !this.state.ProductWishlist
            })
        }
        else
        {
            this.props.RemoveFromWishlistFn(this.props.ProductID, this.props.Token);
            this.setState({
                ProductWishlist : !this.state.ProductWishlist
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
                <View row>
                    <View flex-7>
                        <Text hb1 marginB-4>
                            {this.props.Title}
                        </Text>
                        <Text marginB-4 h2 grey40>
                            {this.props.ShortDescription}
                        </Text>
                        <View row>
                            <View row marginR-15>
                                <Stars BrandRating={Math.round(this.props.ProductRating)} />
                            </View>
                            <Text h3>
                                {this.props.ProductRating} Ratings
                            </Text>
                        </View>
                        <View row>
                            <Text b1 primary>₹{this.props.DiscountPrice} </Text>
                            <Text b1 secondary style={{textDecorationLine: 'line-through'}}>₹{this.props.ActualPrice}</Text>
                        </View>
                    </View>
                    <View flex-end>
                        <TouchableOpacity marginB-10 onPress={this.onBookmarkPress}>
                            <BookMarkIcon Fill={this.state.ProductWishlist} size={24} Color={Colors.primary}/>
                        </TouchableOpacity>
                        <TouchableOpacity marginT-10 onPress={this.onShare}>
                            <ShareIcon Color={Colors.primary}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View row center>
                    <CstmShadowView style={{marginRight:10,flex:1}}>
                        <Button
                            flex
                            onPress={() => this.props.BrandNavigation(this.props.BrandID)}
                            label='Visit Brand'
                        />
                    </CstmShadowView>
                    <CstmShadowView style={{marginLeft:10,flex:1}}>
                        <Button
                            flex
                            label='Add to cart'
                            onPress={
                                () => this.props.RequestADealNavigation(
                                    this.props.BrandID, this.props.BrandName,
                                    this.props.ProductID, this.props.Title, this.props.ProductImage,
                                    this.props.ShortDescription, this.props.Price, this.props.BrandImage
                                )
                            }
                        />
                    </CstmShadowView>
                </View>
            </View>

        );
    }
};
