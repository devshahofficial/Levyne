import React from 'react';
import {Svg,Path,G,Rect} from 'react-native-svg';
import {connect} from 'react-redux';
import {Colors} from 'react-native-ui-lib';

class ChatIcon extends React.PureComponent {

    render() {
        if (this.props.IsAnyChatMessage) {
            return (
                <Svg xmlns="http://www.w3.org/2000/svg" width='24' height='24' viewBox="0 0 35 35">
                    <G id="Group_3786" data-name="Group 3786" transform="translate(19454 9974)">
                        <G id="Iconly_Light-outline_Chat" data-name="Iconly/Light-outline/Chat" transform="translate(-19454 -9974)">
                            <G id="Chat" transform="translate(2.917 2.917)">
                                <Path id="Chat-2" data-name="Chat" d="M7.756,27.486l-.067-.024a.025.025,0,0,1-.014-.017l-.995-.564a1.094,1.094,0,0,0-.4-.079.677.677,0,0,0-.164.017,25.788,25.788,0,0,1-3.166.915l-.2.024H2.692A1.631,1.631,0,0,1,1.4,27.242,2.006,2.006,0,0,1,.974,25.9L1,25.662a26.87,26.87,0,0,1,.987-3.214.772.772,0,0,0-.063-.591l-.268-.522A14.591,14.591,0,0,1,14.612,0h.056A14.583,14.583,0,1,1,7.756,27.486Zm-.249-2.462c.134.064.3.156.539.287l.616.354.009,0,.419.213a12.588,12.588,0,0,0,13.454-1.605L22.865,24A12.55,12.55,0,0,0,14.654,2.034l-.409.005A12.546,12.546,0,0,0,3.466,20.4l.264.514a2.834,2.834,0,0,1,.184,2.195,25.87,25.87,0,0,0-.933,3.033l.137-.537.576-.151c.416-.116.807-.234,1.2-.362l.61-.21a2.983,2.983,0,0,1,.789-.106A3.184,3.184,0,0,1,7.506,25.024ZM19.467,14.583a1.664,1.664,0,1,1,1.664,1.664A1.664,1.664,0,0,1,19.467,14.583Zm-6.471,0a1.664,1.664,0,1,1,1.664,1.664A1.664,1.664,0,0,1,13,14.583Zm-6.471,0A1.664,1.664,0,1,1,8.19,16.247,1.664,1.664,0,0,1,6.526,14.583Z" transform="translate(0)" fill={this.props.Color}/>
                            </G>
                        </G>
                        <Rect id="Rectangle_189" data-name="Rectangle 189" width="12" height="12" rx="6" transform="translate(-19433 -9972)" fill={Colors.primary}/>
                    </G>
                </Svg>
            );
        }
        else {
            return (
                <Svg xmlns="http://www.w3.org/2000/svg" width='24' height='24' viewBox="0 0 35 35">
                    <G id="Group_3786" data-name="Group 3786" transform="translate(19454 9974)">
                        <G id="Iconly_Light-outline_Chat" data-name="Iconly/Light-outline/Chat" transform="translate(-19454 -9974)">
                            <G id="Chat" transform="translate(2.917 2.917)">
                                <Path id="Chat-2" data-name="Chat" d="M7.756,27.486l-.067-.024a.025.025,0,0,1-.014-.017l-.995-.564a1.094,1.094,0,0,0-.4-.079.677.677,0,0,0-.164.017,25.788,25.788,0,0,1-3.166.915l-.2.024H2.692A1.631,1.631,0,0,1,1.4,27.242,2.006,2.006,0,0,1,.974,25.9L1,25.662a26.87,26.87,0,0,1,.987-3.214.772.772,0,0,0-.063-.591l-.268-.522A14.591,14.591,0,0,1,14.612,0h.056A14.583,14.583,0,1,1,7.756,27.486Zm-.249-2.462c.134.064.3.156.539.287l.616.354.009,0,.419.213a12.588,12.588,0,0,0,13.454-1.605L22.865,24A12.55,12.55,0,0,0,14.654,2.034l-.409.005A12.546,12.546,0,0,0,3.466,20.4l.264.514a2.834,2.834,0,0,1,.184,2.195,25.87,25.87,0,0,0-.933,3.033l.137-.537.576-.151c.416-.116.807-.234,1.2-.362l.61-.21a2.983,2.983,0,0,1,.789-.106A3.184,3.184,0,0,1,7.506,25.024ZM19.467,14.583a1.664,1.664,0,1,1,1.664,1.664A1.664,1.664,0,0,1,19.467,14.583Zm-6.471,0a1.664,1.664,0,1,1,1.664,1.664A1.664,1.664,0,0,1,13,14.583Zm-6.471,0A1.664,1.664,0,1,1,8.19,16.247,1.664,1.664,0,0,1,6.526,14.583Z" transform="translate(0)" fill={this.props.Color}/>
                            </G>
                        </G>
                    </G>
                </Svg>
            );
        }
    }
};

const mapsStateToProps = state => ({
	IsAnyChatMessage : state.IsAnyChatMessage
});

export default connect(mapsStateToProps)(ChatIcon);
