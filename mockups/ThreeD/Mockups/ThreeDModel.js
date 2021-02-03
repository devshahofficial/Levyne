import React from 'react';
import NavBarBack from "../../../components/NavBarBack";
import WebView from "react-native-webview";

class ThreeD extends React.PureComponent {

    render() {
        return (
            <>
                <NavBarBack Title={"Design 3D here!"} Navigation={this.props.navigation.goBack} />
                <WebView
					automaticallyAdjustContentInsets={false}
					scrollEnabled={false}
					style={{ flex: 1, minHeight: 200, height: 300, opacity: 0.99 }}
					source={{ uri: `https://3d.levyne.com/${this.props.route.params.BrandUserName}/${this.props.route.params.ModelID}` }}
				/>
            </>
        )

    }
}


export default ThreeD
