import React from 'react';
import {View,Text} from 'react-native-ui-lib';
import ReadMore from 'react-native-read-more-text';

export class DescriptionCard extends React.PureComponent {

    render() {
        return (
            <View flex marginL-15 marginR-15>
                <ReadMore
                    numberOfLines={3}
                    renderTruncatedFooter={this._renderTruncatedFooter}
                    renderRevealedFooter={this._renderRevealedFooter}
                >
                    <Text h2>
                        {this.props.CompleteDescription}
                    </Text>
                </ReadMore>
            </View>
        );
    }

    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text marginT-5 grey50 onPress={handlePress}>
                Read more
            </Text>
        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text marginT-5 grey50 onPress={handlePress}>
                Show less
            </Text>
        );
    }
}
