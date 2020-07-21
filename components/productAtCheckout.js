import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import colors from '../assets/colors';
import {Icon, Button} from '@ui-kitten/components';
import ShadowView from 'react-native-simple-shadow-view';

export default class ProductAtCheckout extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			pressCounter : props.Quantity
		}
	}
	onPressPlus = () => {
		if(this.state.pressCounter != 10)
		{
			this.setState({
				pressCounter : this.state.pressCounter + 1
			});
			this.props.ChangeQuantity(this.props.ProductID, 'Plus');
		}
	};
	onPressMinus = () => {
		if(this.state.pressCounter != 1)
		{
			this.setState({
				pressCounter : this.state.pressCounter - 1
			});
			this.props.ChangeQuantity(this.props.ProductID, 'Minus');
		}
	};
	PlusIcon = (style) => (
		<Icon {...style} name={'plus-outline'} fill={colors.trivisionPink}/>
	);
	MinusIcon = (style) => (
		<Icon {...style} name={'minus-outline'} fill={colors.trivisionPink}/>
	);
	render() {
		return (
			<>
				<ShadowView style={styles.Shadow}>
					<View style={styles.Main}>
						<Text style={styles.Text}>Shipping to : {this.props.ShippingTo}</Text>
						<Text style={styles.Text}>
							Estimated delivery : {this.props.EstimatedDelivery}
						</Text>
	
						<View style={styles.Product}>
	
							<View style={styles.ImageView}>
								<Image source={this.props.source} style={styles.Image} />
							</View>
	
	
							<View style={styles.ProductDescription}>
	
								<Text style={styles.Text}>{this.props.Title}</Text>
								<Text style={styles.Text}>₹{this.props.Price}</Text>
	
								<View style={{marginTop:5,flexDirection:'row',justifyContent:'flex-start'}}>
	
									<View style={{justifyContent:'center',marginRight:20}}>
										<Text style={{fontSize:16, color:colors.trivisionBlue}}>Quantity:</Text>
									</View>
	
									<ShadowView style={styles.QuantityShadow}>
										<Button style={styles.buttonQuantity} onPress={this.onPressMinus} icon={this.MinusIcon}></Button>
									</ShadowView>
	
									<ShadowView style={{backgroundColor:colors.trivisionWhite,height:50,width:50,justifyContent:'center'}}>
										<Text style={{fontSize:16,alignSelf: 'center',color:colors.trivisionBlue}}>{this.state.pressCounter}</Text>
									</ShadowView>
	
									<ShadowView style={styles.QuantityShadow}>
										<Button style={styles.buttonQuantity} onPress={this.onPressPlus} icon={this.PlusIcon}></Button>
									</ShadowView>
								</View>
	
							</View>
						</View>
					</View>
				</ShadowView>
			</>
		);
	}
}

const styles = StyleSheet.create({
	Image: {
		width: '100%',
		height: '100%',
	},
	Product: {
		flexDirection: 'row',
		margin: 5,
	},
	ImageView: {
		width: 75,
		height: 75,
		marginTop: 10,
	},
	Main: {
		marginBottom: 5,
		marginTop: 5,
		padding: 10,
		borderRadius: 15,
	},
	ProductDescription: {
		marginLeft: 12,
		marginTop: 8,
		flex:1
	},
	Text: {
		marginBottom: 2,
		fontSize: 16,
		color:colors.trivisionBlue
	},
	Shadow: {
		paddingTop:5,
		marginTop:10,
		shadowColor: colors.trivisionShadow,
		shadowOpacity: 2,
		shadowRadius: 1.5,
		shadowOffset: {width: 0,height: 3},
		backgroundColor: colors.trivisionWhite,
	},
	buttonQuantity:{
		backgroundColor:colors.trivisionWhite,
		height:40,
		width:40,
		borderRadius:40,
		borderColor:colors.trivisionWhite
	},
	QuantityShadow:{
		borderRadius:40,
		height:40,
		shadowColor: colors.trivisionShadow,
		shadowOpacity: 1,
		shadowRadius: 2,
		shadowOffset: {width: 0,height: 3},
		backgroundColor: colors.trivisionWhite,
	}
});
