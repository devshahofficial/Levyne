import React from 'react';
import {View,Button} from 'react-native-ui-lib';
import CstmShadowView from '../../components/CstmShadowView';
import NavBarBack from '../../components/NavBarBack';

export default class Help extends React.Component {

    render() {
        return (
            <>
                <NavBarBack Title={'Help And Support'} Navigation={this.props.navigation.goBack}/>
                <View flex>
                    <View marginL-15 marginR-15>
                        <CstmShadowView style={{marginBottom: 10}}>
                            <Button label='Call Us'/>
                        </CstmShadowView>
                    </View>
                </View>
            </>
        );
    }

};
