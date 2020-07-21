import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import Colors from '../Style/Colors';
import ProductMessage from '../components/productMessage';
import ShadowView from "react-native-simple-shadow-view/src/ShadowView";

export default class MessageBubble extends Component {
	render() {
	//These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
		var leftSpacer = this.props.Direction === 'left' ? null : <View style={{ width: 70 }} />;
		var rightSpacer = this.props.Direction === 'right' ? null : <View style={{ width: 70 }} />;

		var timeStyle = this.props.Direction === 'left' ? styles.timeStyleLeft : styles.timeStyleRight
		var timeTextStyle = this.props.Direction === 'left' ? styles.timeTextLeft : styles.timeTextRight;


		if (this.props.Type === 2) {
			var bubbleImageStyles = this.props.Direction === 'left' ? [styles.imageBubble, styles.imageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];
		}
		if (this.props.Type === 1) {
			var bubbleStyles = styles.messageBubble
		}
		return (
			<View style={{ justifyContent: 'space-between'}} row>
				{leftSpacer}
				<View>
					{this.props.Type === 1 &&
						<ShadowView style={bubbleStyles}>
							<Text h1>{this.props.Text}</Text>
						</ShadowView>
					}
					{this.props.Type === 2 &&
						<ShadowView style={bubbleImageStyles}>
							<Image source={{ uri: this.props.Image }} style={styles.imageStyle} />
						</ShadowView>
					}
					{this.props.Type === 3 &&
						<ShadowView style={bubbleImageStyles}>
							<ProductMessage ProductID={this.props.ProductID} ProductImage={this.props.ProductImage} ProductName={this.props.ProductName} ProductShortDescription={this.props.ProductShortDescription} ProductPrice={this.props.ProductPrice} />
						</ShadowView>
					}
					<View style={timeStyle}>
						<Text style={timeTextStyle}>
							{(this.props.Timestamp.timeHours.toString()).padStart(2, '0')} : {(this.props.Timestamp.timeMinutes.toString()).padStart(2, '0')}
						</Text>
					</View>
				</View>
				{rightSpacer}
			</View>
		);
	}
}

const styles = StyleSheet.create({
  //ImageBubble
  imageStyle: {
    height: 180,
    width: 180,
  },

  //MessageBubble

  messageBubble: {
    marginTop: 8,
    marginRight: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    maxWidth: 300,
    shadowColor: Colors.shadow,
    marginVertical: 8,
    borderRadius: 15,
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3},
    backgroundColor: Colors.white,

  },
  timeStyleRight: {
    marginRight: 20,
    marginLeft: 10,
  },
  timeTextLeft: {
    marginLeft: 8,
    color: Colors.primary
  },
  timeTextRight: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    color: Colors.primary,
  }
})
