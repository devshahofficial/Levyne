import React, { Component } from 'react'
import {ScrollView,Text,View, StyleSheet} from "react-native"

import NavbarBack from "../../components/NavBarBack"
import ImageCarousel from "../../components/ImageCarousel"
import ProductScreenPartOne from "../../components/ProductScreenPartOne"
import ConstBottomButton from "../../components/constBottomButton"
import ModalPopUp from '../../components/ModalPopUp'
import { TouchableOpacity } from 'react-native-ui-lib'

const imgUrls = [
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1566491888763-e71518bbe846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1576350591619-5f0841c6cab5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
]

export default class ProductDetailsPage extends Component {
    render() {
        return (
            <>
                <NavbarBack Title={"#RS00011"} Navigation={this.props.navigation.goBack}/>
                <ScrollView>
                    <ImageCarousel width={"100%"} height={400} imageURL={imgUrls}></ImageCarousel>
                    <ProductScreenPartOne
                        Title={"Short Description"}
                        Category={"Women"}
                        FreeDelivery={true}
                        ProductRating={4.7}
                        MinPrice={2000}
                        MaxPrice={2500}
                    ></ProductScreenPartOne>
                    <View>
                        <Text style={styles.TextView}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo doloremque odio sequi ex recusandae harum cumque, rem quos veritatis rerum eligendi tempora quasi minus mollitia quidem ullam ducimus atque, quaerat qui? Sit soluta laboriosam a mollitia pariatur quia dolorum ratione velit. At rerum eligendi assumenda error libero iusto quod esse molestias necessitatibus neque? Voluptate, unde. Quibusdam explicabo voluptatem accusantium odit rem est quo consequatur maiores tempore reprehenderit quidem assumenda, libero repellendus dolorum reiciendis enim quis ipsam eaque aliquam, quos totam. Quidem at vel adipisci facere maiores, sapiente, quae fugiat sint quod eius eaque aut excepturi in consectetur culpa esse beatae voluptatibus voluptates? Culpa dolorem, numquam, asperiores cum, nihil delectus aspernatur est temporibus necessitatibus modi similique veniam recusandae ea! Dignissimos mollitia hic blanditiis quibusdam voluptas ipsum? Ipsa quasi cupiditate distinctio, quidem neque eum quae quisquam similique reiciendis eos, iste ex porro deserunt aut. Corrupti repellendus similique totam suscipit molestiae velit culpa deserunt officiis iure. Ipsum repellendus, suscipit dolorum at odit voluptates eos accusantium incidunt! Nulla quia dolores ea odio dolorum obcaecati. Libero cupiditate incidunt accusamus voluptatum explicabo cumque praesentium ipsum repellendus quaerat asperiores repudiandae eveniet aut doloremque dignissimos a iure quo minima aliquid, magnam sed labore quae? Incidunt sunt vitae nisi.</Text>
                    </View>
                </ScrollView>
                <ConstBottomButton ButtonB={"Add To Cart"}></ConstBottomButton>
            </>
        )
    }
}

const styles = StyleSheet.create({
    TextView: {
        fontSize: 15,
        padding: 20,
        // fontColor: "ff99cc",
    }
})
