import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import BucketComponent from "../components/BucketComponent";
import FetchBuckets from '../API/FetchBuckets';
import {ActivityIndicator, FlatList} from 'react-native';

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Buckets: [],
            Loading: true
        }
    }

    componentDidMount() {
        FetchBuckets(this.props.AccessToken).then(Buckets => {
            Buckets = Buckets.map(item => {
                item.BrandID = item.BrandID.toString();
                return item;
            });
            this.setState({Buckets, Loading: false});
        }).catch(err => {
            //console.log(err);
        })
    }

    onBucketPress = () => {
        this.props.navigation.navigate("Bucket");
    }

    FlatListRenderItem = ({item}) => (
        <BucketComponent
            item={item}
            Navigation={this.onBucketPress}
        />
    )

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Your Wardrobe'}/>
                {this.state.Loading ?
                    <View flex center>
                        <ActivityIndicator />
                    </View> :
                    <View paddingH-15 flex centerH>
                        <FlatList
                            data={this.state.Buckets}
                            renderItem={this.FlatListRenderItem}
                            keyExtractor={(item) => item.BrandID}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                <View flex centerV centerH style={{height:655}} paddingH-40>
                                    <Text center b1 grey40>Make a wish and we'll make sure that it comes true.</Text>
                                </View>
                            }
                        />
                    </View>
                }
            </>
        );
    }

};

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(Cart);
