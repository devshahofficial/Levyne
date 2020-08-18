import React from 'react';
import { Dimensions, StyleSheet, ScrollView } from 'react-native';
import {
	Text,
	View,
	Button,
	Picker,
	TouchableOpacity,
	Toast,
} from 'react-native-ui-lib';
import ImageCarousel from '../components/ImageCarousel';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import CstmInput from '../components/input';
import UploadProduct from '../API/UploadProduct';
import Colors from '../Style/Colors';
import CstmShadowView from '../components/CstmShadowView';
import NavBarBack from '../components/NavBarBack';
import ProductsData from '../assets/ProductsData';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePickerModal from '../components/ImagePickerModal';

const screenWidth = Dimensions.get('window').width;

class FabricUpload extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			SelectedImages: ['button'],
			Name: '',
			ShortDescription: '',
			Price: '',
			Discount: '',
			TotalPrice: 0,
			Category: '',
			Style: [],
			Fabrics: [],
			LongDescription: '',
			BackgroundColor: Colors.white,
			showLoading: false,
			TextColor: Colors.primary,
			modalVisible: false,
			showCustomToast: false,
			ToastText: 'Oops! Something went wrong ',
			LoaderContent: '',
		};
	}

	componentWillUnmount() {
		this.showToastTimeOut1 && clearTimeout(this.showToastTimeOut1);
		this.showToastTimeOut2 && clearTimeout(this.showToastTimeOut2);
		this.showToastTimeOut3 && clearTimeout(this.showToastTimeOut3);
	}

	handleImagePicker = (response) => {
		this.state.SelectedImages.pop();
		var newArrayImages = this.state.SelectedImages;
		newArrayImages.push({
			uri: response.path,
			name: response.path.split('/').pop(),
			type: response.mime,
		});
		newArrayImages.push('button');
		this.setState({
			SelectedImages: newArrayImages,
			modalVisible: false,
		});
	};

	ShowGallery = async () => {
		ImagePicker.openPicker({
			width: screenWidth * 3,
			height: screenWidth * 3,
			cropping: true,
			mediaType: 'photo',
			forceJpg: true,
		})
			.then(this.handleImagePicker)
			.catch(() => {});
		//this.setState({ modalVisible: !this.state.modalVisible });
	};

	ShowCamera = async () => {
		ImagePicker.openCamera({
			width: screenWidth * 3,
			height: screenWidth * 3,
			cropping: true,
			mediaType: 'photo',
			forceJpg: true,
		})
			.then(this.handleImagePicker)
			.catch(() => {});
		//this.setState({ modalVisible: !this.state.modalVisible });
	};

	setModalVisible = () => {
		this.setState({ modalVisible: !this.state.modalVisible });
	};

	renderCustomContent = () => {
		return (
			<View flex padding-10 style={{ backgroundColor: undefined }}>
				<Text white h1>
					{this.state.ToastText}
				</Text>
			</View>
		);
	};

	setPrice = (Price) => {
		Price = Price.replace(/[^\d.-]/g, '');
		this.setState({
			Price: Price,
		});
	};

	onTypePressed = (Type) => {
		this.setState({
			Type: Type,
		});
	};

	setTerms = (Terms) => {
		Terms = Terms.replace(/[^\d.-]/g, '');
		this.setState({
			Terms: Terms,
		});
	};

	onUploadPress = () => {
		this.showToastTimeOut1 = setTimeout(() => {
			this.setState({
				showCustomToast: false,
			});
        }, 3000);

		if (this.state.SelectedImages.length < 2) {
			return this.setState({
				showCustomToast: true,
				ToastText: 'Minimum 1 image required ',
			});
		}
		if (!this.state.Name) {
			return this.setState({
				showCustomToast: true,
				ToastText: 'Name Should not be blank ',
			});
		}

		if (!/^\d+(?:[.,]\d+)*$/gm.test(this.state.Price)) {
			return this.setState({
				showCustomToast: true,
				ToastText: 'Price format is not looking good ',
			});
		}

		if (!/^[0-9]{2}$/.test(this.state.Discount)) {
			this.setState({
				showCustomToast: true,
				ToastText: 'Discount should be in number ',
			});
		}

		if (!this.state.ShortDescription) {
			return this.setState({
				showCustomToast: true,
				ToastText: 'Short Description Should not be blank ',
			});
		}

		if (!this.state.Category) {
			this.setState({
				showCustomToast: true,
				ToastText: 'Please Select the Category ',
			});
		}

		if (!this.state.Style) {
			this.setState({
				showCustomToast: true,
				ToastText: 'Please Select the Style ',
			});
		}

		if (!this.state.Fabrics) {
			this.setState({
				showCustomToast: true,
				ToastText: 'Please Select the Fabrics ',
			});
		}

		if (!this.state.LongDescription) {
			this.setState({
				showCustomToast: true,
				ToastText: 'Description Should not be blank ',
			});
		}

		this.setState({ LoaderContent: '0/100', showLoading: true });
		UploadProduct(
			this.state,
			this.props.AccessToken,
			this.showLoadingWithPercentage
		)
			.then((ProductID) => {
				this.setState({
					showCustomToast: true,
					showLoading: false,
					ToastText:
						'Product Uploaded with Product ID : ' + ProductID,
				});
				this.showToastTimeOut2 = setTimeout(() => {
					this.setState({
						showCustomToast: false,
					});
				}, 3000);
			})
			.catch((err) => {
				console.log(err);
				this.setState({
					showCustomToast: true,
					showLoading: false,
					ToastText: 'Product Customize Failed',
				});
				this.showToastTimeOut3 = setTimeout(() => {
					this.setState({
						showCustomToast: false,
					});
				}, 3000);
			});
	};

	_removeImage = (i) => {
		this.setState({
			SelectedImages: this.state.SelectedImages.slice(0, i).concat(
				this.state.SelectedImages.slice(
					i + 1,
					this.state.SelectedImages.length
				)
			),
		});
	};

	showLoadingWithPercentage = (Percentage) => {
		this.setState({ LoaderContent: Percentage + '/100' });
	};

	//a = this.state.Price
	render() {
		return (
			<>
				<NavBarBack
					Navigation={this.props.navigation.goBack}
					Title={'Customize a new fabric'}
				/>
				<Toast
					visible={this.state.showCustomToast}
					position={'bottom'}
					backgroundColor={Colors.primary}
				>
					{this.renderCustomContent()}
				</Toast>
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={styles.container}
				>
					<ImagePickerModal
						modalVisible={this.state.modalVisible}
						setModalVisible={this.setModalVisible}
						ShowGallery={this.ShowGallery}
						ShowCamera={this.ShowCamera}
					/>
					<Spinner
						visible={this.state.showLoading}
						textContent={this.state.LoaderContent}
						textStyle={styles.spinnerTextStyle}
					/>
					<ImageCarousel
						height={screenWidth}
						width={screenWidth}
						addImage={() =>
							this.setState({
								modalVisible: true,
							})
						}
						imageURL={this.state.SelectedImages}
						removeImage={this._removeImage}
					/>

					<View paddingH-20>
						<Text marginT-20 h2 secondary>
							Name
						</Text>
						<CstmInput
							placeholder='Name'
							placeholderTextColor={Colors.grey50}
							value={this.state.Name}
							onChangeText={(Name) => {
								this.setState({ Name });
							}}
						/>

						<Text marginT-20 h2 secondary>
							Set Price
						</Text>
						<CstmInput
							placeholder='In Rupees'
							placeholderTextColor={Colors.grey50}
							value={this.state.Price}
							keyboardType='number-pad'
							onChangeText={(Price) => {
								if (
									isNaN(this.state.Discount) ||
									isNaN(Price)
								) {
									this.setState({ Price });
								} else {
									this.setState({
										Price,
										TotalPrice: parseFloat(
											Price -
												Price *
													0.01 *
													this.state.Discount
										).toFixed(2),
									});
								}
							}}
						/>

						<Text marginT-20 h2 secondary>
							Apply any discounts(%)
						</Text>
						<CstmInput
							placeholder='Discounts attract customers!'
							placeholderTextColor={Colors.grey50}
							value={this.state.Discount}
							keyboardType='number-pad'
							maxLength={2}
							onChangeText={(Discount) => {
								if (
									isNaN(this.state.Price) ||
									isNaN(Discount)
								) {
									this.setState({ Discount });
								} else {
									this.setState({
										Discount,
										TotalPrice: parseFloat(
											this.state.Price -
												this.state.Price *
													0.01 *
													Discount
										).toFixed(2),
									});
								}
							}}
						/>

						<View marginT-20 row spread>
							<Text h1 secondary>
								Total Price
							</Text>
							<Text h1 secondary>
								{this.state.TotalPrice}
							</Text>
						</View>

						<TouchableOpacity
							style={[
								styles.button,
								{
									backgroundColor: this.state.BackgroundColor,
									borderWidth: 1,
									borderColor: Colors.primary,
								},
							]}
							onPress={() => {
								this.setState({
									BackgroundColor: this.state.TextColor,
									TextColor: this.state.BackgroundColor,
									CustomFit: !this.state.CustomFit,
								});
							}}
						>
							<Text
								style={[
									styles.buttonText,
									{ color: this.state.TextColor },
								]}
							>
								Replaceable
							</Text>
						</TouchableOpacity>

						<Text marginT-20 h2 secondary>
							Short Description
						</Text>
						<CstmInput
							style={{ marginBottom: 25 }}
							placeholder='Short Description'
							placeholderTextColor={Colors.grey50}
							value={this.state.ShortDescription}
							onChangeText={(ShortDescription) => {
								this.setState({ ShortDescription });
							}}
						/>

						<Picker
							placeholder='None'
							title='Category'
							value={this.state.Category}
							enableModalBlur={false}
							onChange={(item) =>
								this.setState({ Category: item })
							}
							topBarProps={{ title: 'Category' }}
							showSearch
							hideUnderline
							searchPlaceholder={'Search a Category'}
							searchSClatyle={{
								placeholderTextColor: Colors.dark50,
							}}
						>
							{ProductsData[0].map((item, index) => (
								<Picker.Item
									key={index.toString()}
									value={{
										value: index,
										label: item.title,
									}}
								/>
							))}
						</Picker>

						<Picker
							placeholder='None'
							title='Style'
							mode={'MULTI'}
							value={this.state.Style}
							enableModalBlur={false}
							onChange={(item) => this.setState({ Style: item })}
							topBarProps={{ title: 'Style' }}
							showSearch
							hideUnderline
							searchPlaceholder={
								'Search for styles which go with your product'
							}
							searchSClatyle={{
								placeholderTextColor: Colors.dark50,
							}}
						>
							{ProductsData[1].map((item, index) => (
								<Picker.Item
									key={index.toString()}
									value={{
										value: index,
										label: item.title,
									}}
								/>
							))}
						</Picker>

						<Picker
							placeholder='None'
							title='Fabrics'
							mode={'MULTI'}
							value={this.state.Fabrics}
							enableModalBlur={false}
							onChange={(item) =>
								this.setState({ Fabrics: item })
							}
							topBarProps={{ title: 'Fabrics' }}
							showSearch
							hideUnderline
							searchPlaceholder={
								'Search for fabrics which go with your product'
							}
							searchSClatyle={{
								placeholderTextColor: Colors.dark50,
							}}
						>
							{ProductsData[2].map((item, index) => (
								<Picker.Item
									key={index.toString()}
									value={{
										value: index,
										label: item.title,
									}}
								/>
							))}
						</Picker>

						<Text h2 secondary>
							Description
						</Text>
						<CstmInput
							placeholder='Description'
							placeholderTextColor={Colors.grey50}
							value={this.state.LongDescription}
							onChangeText={(LongDescription) => {
								this.setState({ LongDescription });
							}}
						/>

						<CstmShadowView
							style={{ marginBottom: 20, marginTop: 40 }}
						>
							<Button
								hb2
								flex
								onPress={this.onUploadPress}
								label='Customize'
							/>
						</CstmShadowView>
					</View>
				</ScrollView>
			</>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 30,
		height: 40,
		width: '100%',
		marginTop: 30,
		justifyContent: 'center',
	},
	buttonText: {
		fontSize: 18,
		color: Colors.primary,
		textAlignVertical: 'center',
		textAlign: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	spinnerTextStyle: {
		color: Colors.primary,
	},
});

const mapsStateToProps = (state) => ({
	AccessToken: state.Auth.AccessToken,
});

export default connect(mapsStateToProps)(FabricUpload);
