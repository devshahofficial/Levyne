import React from 'react';
import { Dimensions, FlatList, useWindowDimensions } from 'react-native'
import { View, Button } from 'react-native-ui-lib';
import NavBarBack from "../components/NavBarBack";
import Loader from '../components/Loader';
import FabricOrderContainer from '../components/FabricOrderContainer';
import FetchFabricsByFilter from '../API/Fabrics/FetchFabricsByFilter';
import { connect } from 'react-redux';
import CstmShadowView from '../components/CstmShadowView';

class FashionDesignerList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            Fabrics: [],
            SelectedFabric: -1
        }
        this.abortController = new AbortController();
        this.Page = 0;
        this.Total = 0;
        this.LoadingMoreFabrics = false;
        this.window = Dimensions.get('window')
    }

	goBack = () => {
		this.props.navigation.goBack();
	}

	componentDidMount() {
        console.log(this.props.route.params);
        FetchFabricsByFilter({CategoryID: this.props.route.params.CategoryID}, ++this.Page, this.props.AccessToken, this.abortController.signal).then(resp => {
            this.Total = resp.Total;
            this.setState({
				Fabrics: resp.Fabrics
			})
        }).catch(console.log)
	}
	
	AddDesignToCart = () => {
		//this.props.navigation.push('BrandProfile', {BrandID})
		console.log('Add 3D in Cart');
    }

    FlatListRenderItem = ({item}) =>
        <FabricOrderContainer
            item={item}
            navigateFabric={this.navigateFabric}
            SelectFabric={this.SelectFabric}
            SelectedFabric={this.state.SelectedFabric}
        />

    SelectFabric = (SelectedFabric) => {
        this.setState({SelectedFabric});
    }

    navigateFabric = (FabricID) => {
        this.props.navigation.push('Fabric', {FabricID})
    }

    LoadMoreFabrics = () => {
        if(!this.LoadingMoreFabrics && this.state.Fabrics.length < this.Total) {
            this.LoadingMoreFabrics = true;
            FetchFabricsByFilter({CategoryID: this.props.route.params.CategoryID}, ++this.Page, this.props.AccessToken, this.abortController.signal).then(resp => {
                this.setState({
                    Fabrics: [...this.state.Fabrics, ...resp.Fabrics]
                });
                this.LoadingMoreFabrics = false;
            }).catch(console.log)
        }
    }

    AddToCartButton = () => {
        if(this.state.Fabrics.length) {
            return (<View absB flex width={'100%'}>
                <CstmShadowView style={{marginHorizontal:15, marginBottom: 15}}>
                    <Button flex onPress={this.AddProductToCart} label={"Add to Cart"}/>
                </CstmShadowView>
            </View>);
        } else {
            return <View></View>
        }
    }

	render() {
        
		return (
			<View marginB-10 flex>
				<NavBarBack Title={"Design 3D here!"} Navigation={this.goBack} />
				<FlatList
                    data={this.state.Fabrics}
                    numColumns={2}
                    contentContainerStyle={{minHeight: this.window.height, paddingBottom:10 }}
                    ListEmptyComponent={<Loader />}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.FlatListRenderItem}
                    keyExtractor={item => item.FabricID}
                    onEndReached={this.LoadMoreFabrics}
                    onEndReachedThreshold={0.50}
                />
                <this.AddToCartButton />
			</View>
		);
	}
}

const mapsStateToProps = state => ({
	AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(FashionDesignerList);