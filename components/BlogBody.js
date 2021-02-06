import React from 'react';
import { Text } from 'react-native-ui-lib';

/**
 * @type {React.Component}
 * @typedef {[{textContent: string,type: number, children: RootChildrens}]} RootChildrens
 * @extends {React.PureComponent<{RootChildrens: RootChildrens, isBold: boolean}>}
 **/

class BlogBody extends React.PureComponent {

    render() {
        return (
            <>
                {this.props.RootChildrens.map((item, index) => {

                    switch(item.type) {
                        case 0 : {
                            if(this.props.isBold) {
                                return <Text key={index.toString()} hb1>{item.textContent}</Text>
                            } else {
                                return <Text key={index.toString()} h1>{item.textContent}</Text>
                            }
                        }
                        case 1 : return <Text key={index.toString()} h1><BlogBody isBold={true} RootChildrens={item.children} /></Text>
                        case 2 : return <Text key={index.toString()} h1>{"\n"}</Text>
                        default : return <Text key={index.toString()} h1></Text>
                    }
                })}
            </>
        );
    }

};

export default BlogBody;