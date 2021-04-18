/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CstmShadowView from '../../components/CstmShadowView';
import { Text, TouchableOpacity } from 'react-native-ui-lib';
import { TouchableOpacityProps } from 'react-native-ui-lib/generatedTypes/incubator';

const MilestonePaymentDetails = ({
	Price,
	Note,
	PaymentTimestamp,
	onPress,
}: {
	Price: number;
	Note: string;
	PaymentTimestamp: string;
	onPress?: (props: TouchableOpacityProps | any) => void;
}) => (
	<CstmShadowView
		style={{ height: 'auto', padding: 15, borderRadius: 5, margin: 20 }}>
		<Text hb1>₹{Price}</Text>
		<Text h2 secondary>
			{Note}
		</Text>
		{PaymentTimestamp ? (
			<TouchableOpacity
				onPress={onPress}
				marginT-15
				style={{ justifyContent: 'flex-start' }}>
				<Text primary>
					Paid at {new Date(PaymentTimestamp).toDateString()}
				</Text>
			</TouchableOpacity>
		) : (
			<TouchableOpacity
				onPress={onPress}
				marginT-15
				style={{ justifyContent: 'flex-start' }}>
				<Text primary>Secure Pay</Text>
			</TouchableOpacity>
		)}
	</CstmShadowView>
);

export default MilestonePaymentDetails;
