import React from 'react';
import {View,Text} from 'react-native-ui-lib';
import ReadMore from 'react-native-read-more-text';

export class DescriptionCard extends React.PureComponent {

    render() {
        return (
            <View flex>
                <ReadMore
                    numberOfLines={3}
                    renderTruncatedFooter={this._renderTruncatedFooter}
                    renderRevealedFooter={this._renderRevealedFooter}
                >
                    <Text h1>
                        {this.props.CompleteDescription}
                    </Text>
                </ReadMore>
            </View>
        );
    }

    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text marginT-5 grey40 onPress={handlePress}>
                Read more
            </Text>
        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text marginT-5 grey40 onPress={handlePress}>
                Show less
            </Text>
        );
    }
}
