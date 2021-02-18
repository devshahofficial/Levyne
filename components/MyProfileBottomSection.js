import React from 'react';
import { StyleSheet, Linking, Platform } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import { MapIcon } from '../Icons/Secondary/MapIcon';
import { AboutIcon } from '../Icons/Secondary/AboutIcon';
import { BadgeIcon } from '../Icons/Secondary/BadgeIcon';
import { CalendarIcon } from '../Icons/Secondary/CalendarIcon';
import { TimerIcon } from '../Icons/Secondary/TimerIcon';
import { ScrollView } from 'react-native-gesture-handler';
import { ParkingIcon } from '../Icons/Secondary/ParkingIcon';
import { SewingMachineIcon } from '../Icons/Secondary/SewingMachineIcon';
import { MeasurementIcon } from '../Icons/Secondary/MeasurementIcon';
import { DeliveryIcon } from '../Icons/Secondary/DeliveryIcon';
import { TrialRoomIcon } from '../Icons/Secondary/TrialRoomIcon';
import CstmShadowView from "./CstmShadowView";

const Type = [
	"Ethnic",
	"Formal Wear",
	"Business Casual",
	"Everyday Casual",
	"Festive",
	"Social",
	"Holiday Wear",
	"Bridal Collection",
	"Trousseau Collection",
	"Cocktail Wear",
	"Bespoke",
	"Couture Wear",
	"Sustainable Wear",
	"Contemporary Wear",
	"Fusion Wear",
	"Pret Wear",
	"Summer Collection",
	"Winter Collection",
	"Resort And Beach Wear",
	"Celebrity Collection",
	"Evening Black Tie",
	"Kawaii",
	"Gothic",
	"Maternity",
	"Preppy",
	"Lagen look",
	"Casual Chic",
	"Retro",
	"Flapper",
	"Garconne",
	"Elegant"
]

const ConvertToTime = (TimeString) => {
	const H = +(TimeString.substr(0, 2));
	const h = H % 12 || 12;
	const AmPm = (H < 12 || H === 24) ? "AM" : "PM";
	return h + ":" + TimeString.substr(2, 2) + AmPm;
}

class ProfileBottomSection extends React.PureComponent {

	constructor(props) {
		super(props);
		this.StudioStartTiming = ConvertToTime(this.props.StudioStartTiming || "0700");
		this.StudioCloseTiming = ConvertToTime(this.props.StudioCloseTiming || "0800");
	}
	navigateMap = async () => {

		const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
		const latLng = `${this.props.Latitude},${this.props.Longitude}`;
		const label = this.props.Name;
		const url = Platform.select({
			ios: `${scheme}${label}@${latLng}`,
			android: `${scheme}${latLng}(${label})`
		});

		const supported = await Linking.canOpenURL(url);

		if (supported) {
			await Linking.openURL(url);
		}
	}
	render() {
		const Genre = this.props.BrandGenre.map((item) => Type[parseInt(item)]).join(', ');
		return (
			<View>
				<View paddingT-15>
					<View marginH-15 marginT-10 centerV row>
						<BadgeIcon size={20} Color={Colors.primary} />
						<Text marginH-15 hb1>
							Genre
						</Text>
					</View>
					<Text marginL-15 h1 marginR-15 grey30>
						{Genre}
					</Text>

					<View marginH-15 marginT-15 centerV row>
						<AboutIcon size={20} Color={Colors.black} />
						<Text marginH-15 hb1>
							About Us
						</Text>
					</View>
					<Text marginL-15 h1 marginR-15 grey30>
						{this.props.About}
					</Text>

					<View marginH-15 marginT-15 centerV row>
						<MapIcon size={20} Color={Colors.black} />
						<Text hb1 marginL-10>
							Address
						</Text>
					</View>
					<Text marginL-15 marginR-15 h1 grey30 onPress={this.navigateMap}>
						{this.props.Address}
					</Text>

					<View marginH-15 marginT-15 centerV row>
						<CalendarIcon size={20} Color={Colors.black} />
						<Text hb1 marginL-10>
							Studio Availability
						</Text>
					</View>
					<Text marginL-15 marginR-15 h1 grey30>
						{this.StudioStartTiming} - {this.StudioCloseTiming}
					</Text>

					<View marginH-15 marginT-15 centerV row>
						<TimerIcon size={20} Color={Colors.black} />
						<Text hb1 marginL-10>
							Approx Production Time
						</Text>
					</View>
					<Text marginL-15 marginR-15 h1 grey30>
						15-30 days
					</Text>
				</View>
				<View marginT-40 paddingH-20>
					<Text hb1>Other Amenities</Text>
					<ScrollView
						horizontal={true}
						style={{
							marginTop: 20,
							marginHorizontal: -20,
							marginBottom: 20,
							alignContent: 'center',
						}}
						showsHorizontalScrollIndicator={false}>
						{this.props.Tailoring ? (
							<CstmShadowView style={styles.View}>
								<View center flex>
									<SewingMachineIcon size={60} Color={Colors.primary} />
									<Text center h2 marginT-20 secondary>
										Tailoring
									</Text>
								</View>
							</CstmShadowView>
						) : (<></>)}

						{this.props.MeasurementService ? (
							<CstmShadowView style={styles.View}>
								<View center flex>
									<MeasurementIcon size={60} Color={Colors.primary} />
									<Text center h2 marginT-20 secondary>
										Measurement Services
									</Text>
								</View>
							</CstmShadowView>
						) : (<></>)}

						{this.props.TrialRoom ? (
							<CstmShadowView style={styles.View}>
								<View center flex>
									<TrialRoomIcon size={60} Color={Colors.primary} />
									<Text center h2 marginT-20 secondary>
										Trial Room Availability
									</Text>
								</View>
							</CstmShadowView>
						) : (<></>)}

						{this.props.Delivery ? (
							<CstmShadowView style={styles.View}>
								<View center flex>
									<DeliveryIcon size={60} Color={Colors.primary} />
									<Text center h2 marginT-20 secondary>
										Home Delivery
									</Text>
								</View>
							</CstmShadowView>
						) : (<></>)}

						{this.props.Parking ? (
							<CstmShadowView style={styles.View}>
								<View center flex>
									<ParkingIcon size={60} Color={Colors.primary} />
									<Text center h2 marginT-20 secondary>
										Parking Availability
									</Text>
								</View>
							</CstmShadowView>
						) : (<></>)}
					</ScrollView>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	Image: {
		height: 150,
		width: 150,
		borderRadius: 20,
	},
	ImageContainer: {
		borderColor: Colors.grey40,
		borderWidth: 0.6,
		borderRadius: 20,
	},
	TouchableOpacity: {
		alignContent: 'center',
		flexDirection: 'row',
		backgroundColor: Colors.grey60,
		height: 50,
	},
	View: {
		height:'auto',
		padding:10,
		borderRadius:20,
		marginBottom:20,
		marginTop: 5,
		marginHorizontal:10,
		width: 150
	}
});

export default connect()(ProfileBottomSection);
