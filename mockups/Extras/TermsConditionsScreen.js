import React, { Component } from 'react';
import {View, Text} from 'react-native-ui-lib';
import {ScrollView} from "react-native";
import NavBarBack from '../../components/NavBarBack';

export default class TermsConditionsScreen extends Component {
    render() {
        return(
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Terms and Conditions'}/>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View flex paddingH-20 paddingV-10>
                        <Text hb1>Return Policy</Text>

                        <View paddingL-10 marginT-20>
                            <Text hb2>1) Size issues</Text>
                            <Text h2 secondary>
                                Customer should provide accurate information about size concerns so that we can assure a final product in the least amount of time. Levyne shall not provide alterations on any orders under ₹12,000. Customer can only seek for Size alterations in the 72 hours of product delivery.
                            </Text>
                        </View>

                        <View paddingL-10 marginT-10>
                            <Text hb2>2) Not the same design</Text>
                            <Text h2 secondary>
                                The customer must understand that a fashion designer/tailor is a professional and knows better what might suit you. The customer should be flexible in letting the fashion designer/tailor in making some changes in the design/embroidery of the outfit. In a case where the outfit doesn’t suit the customer’s taste, the outfit shall be returned.
                            </Text>
                        </View>

                        <View paddingL-10 marginT-10>
                            <Text hb2>3) Defective Product</Text>
                            <Text h2 secondary>
                                Customer shall return the product, Levyne and partners will provide a satisfactory service on what should be done. Customer must understand this that this might extend the delivery days no one from Levyne will be held liable for this. Order cannot be cancelled at this moment.
                            </Text>
                        </View>

                        <View paddingL-10 marginT-10>
                            <Text hb2>4) Damaged Packaging</Text>
                            <Text h2 secondary>
                                Order cannot be returned in this case.
                            </Text>
                        </View>

                        <View paddingL-10 marginT-10>
                            <Text hb2>5) The product shows a defect after first wash</Text>
                            <Text h2 secondary>
                                The customer can return the product if it gets damaged after the first wash. The final return acceptance shall lie in the hands of Levyne.
                            </Text>
                        </View>

                    </View>
                </ScrollView>
            </>
        );
    }
}

