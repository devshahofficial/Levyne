import React, { Component } from 'react'
import {Linking, ScrollView, StyleSheet} from "react-native";
import {Text, TouchableOpacity, Colors} from 'react-native-ui-lib';

import NavbarBack from "../../components/NavBarBack"
import LevyneProduct from "../../components/LevyneProduct";
import ImageCarouselLevyne from "../../components/ImageCarouselLevyne";
import {CallIcon} from "../../Icons/CallIcon";

const imgUrls = [
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1566491888763-e71518bbe846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
]

export default class ProductDetailsPage extends Component {
    render() {
        return (
            <>
                <NavbarBack Title={"#RS00011"} Navigation={this.props.navigation.goBack}/>
                <ScrollView>
                    <ImageCarouselLevyne ProductImages={imgUrls}></ImageCarouselLevyne>
                    <LevyneProduct
                        Title={"#RS00011"}
                        ShortDescription={"Short Description"}
                        Category={"Others"}
                        FreeDelivery={true}
                        ProductRating={0}
                        MinPrice={2000}
                        MaxPrice={2500}
                        Styles={["Casual","Gothic","Formal","Ethnic"]}
                        LongDescription={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo doloremque odio sequi ex recusandae harum cumque, rem quos veritatis rerum eligendi tempora quasi minus mollitia quidem ullam ducimus atque, quaerat qui? Sit soluta laboriosam a mollitia pariatur quia dolorum ratione velit. At rerum eligendi assumenda error libero iusto quod esse molestias necessitatibus neque? Voluptate, unde. Quibusdam explicabo voluptatem accusantium odit rem est quo consequatur maiores tempore reprehenderit quidem assumenda, libero repellendus dolorum reiciendis enim quis ipsam eaque aliquam, quos totam. Quidem at vel adipisci facere maiores, sapiente, quae fugiat sint quod eius eaque aut excepturi in consectetur culpa esse beatae voluptatibus voluptates? Culpa dolorem, numquam, asperiores cum, nihil delectus aspernatur est temporibus necessitatibus modi similique veniam recusandae ea! Dignissimos mollitia hic blanditiis quibusdam voluptas ipsum? Ipsa quasi cupiditate distinctio, quidem neque eum quae quisquam similique reiciendis eos, iste ex porro deserunt aut. Corrupti repellendus similique totam suscipit molestiae velit culpa deserunt officiis iure. Ipsum repellendus, suscipit dolorum at odit voluptates eos accusantium incidunt! Nulla quia dolores ea odio dolorum obcaecati. Libero cupiditate incidunt accusamus voluptatum explicabo cumque praesentium ipsum repellendus quaerat asperiores repudiandae eveniet aut doloremque dignissimos a iure quo minima aliquid, magnam sed labore quae? Incidunt sunt vitae nisi."}
                        FabricDescription={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo doloremque odio sequi ex recusandae harum cumque, rem quos veritatis rerum eligendi tempora quasi minus mollitia quidem ullam ducimus atque, quaerat qui? Sit soluta laboriosam a mollitia pariatur quia dolorum ratione velit. At rerum eligendi assumenda error libero iusto quod esse molestias necessitatibus neque? Voluptate, unde. Quibusdam explicabo voluptatem accusantium odit rem est quo consequatur maiores tempore reprehenderit quidem assumenda, libero repellendus dolorum reiciendis enim quis ipsam eaque aliquam, quos totam. Quidem at vel adipisci facere maiores, sapiente, quae fugiat sint quod eius eaque aut excepturi in consectetur culpa esse beatae voluptatibus voluptates? Culpa dolorem, numquam, asperiores cum, nihil delectus aspernatur est temporibus necessitatibus modi similique veniam recusandae ea! Dignissimos mollitia hic blanditiis quibusdam voluptas ipsum? Ipsa quasi cupiditate distinctio, quidem neque eum quae quisquam similique reiciendis eos, iste ex porro deserunt aut. Corrupti repellendus similique totam suscipit molestiae velit culpa deserunt officiis iure. Ipsum repellendus, suscipit dolorum at odit voluptates eos accusantium incidunt! Nulla quia dolores ea odio dolorum obcaecati. Libero cupiditate incidunt accusamus voluptatum explicabo cumque praesentium ipsum repellendus quaerat asperiores repudiandae eveniet aut doloremque dignissimos a iure quo minima aliquid, magnam sed labore quae? Incidunt sunt vitae nisi."}
                    />
                </ScrollView>
                <TouchableOpacity
                    style={{height:50, backgroundColor: Colors.primary}} center
                    onPress={() => Linking.openURL('tel:+91 9819 077182')} row
                >
                    <CallIcon Size={18} Color={Colors.white}/>
                    <Text h1 white marginL-20>Call us for product enquire</Text>
                </TouchableOpacity>
            </>
        )
    }
}
