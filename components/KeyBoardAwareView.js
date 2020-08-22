import React from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';


export default class KeyboardAwareView extends React.PureComponent {    
    render() {
        return (
            <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
                {this.props.children}
            </TouchableWithoutFeedback>
        );
    }
}
    