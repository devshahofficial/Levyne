import React from 'react';
import {Text, View, AnimatedImage, Colors} from 'react-native-ui-lib';
import { StyleSheet, Dimensions, ScrollView} from 'react-native';
import NavBarBack from "../../components/NavBarBack";
const deviceHeight = Dimensions.get("window").height;
import FetchBlogByID from '../../API/FetchBlogByID';
import BlogBody from '../../components/BlogBody';

export default class BlogPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            BlogBodyChildren : []
        }
        this.abortController = new AbortController();
    }

    componentDidMount() {
        FetchBlogByID(this.props.route.params.PostID, this.abortController.signal).then(resp => {
            this.setState({
                BlogBodyChildren: JSON.parse(resp.Body).children
            });
        }).catch(err => {
            console.log(err);
        })
    }

    RenderBlogBody = (props) => {
        console.log(props.Root);
        switch(props.Root.type) {
            case 0 :

                console.log(`return (<Text>${props.Root.textContent}</Text>);`);
                return <Text></Text>

            case 1 :
                console.log(`(<Text h1>
                    ${props.Root.children.map(item => <this.RenderBlogBody Root={item} />)}
                </Text>);`)
                
                return <Text></Text>
            case 2 :
                console.log(`(<Text marginB-10></Text>);`)
                    return <Text></Text>
            case 3 :
                console.log(`return (<Text>${props.Root.children.map((item) => {
                    return <this.RenderBlogBody Root={item} />
                })}</Text>);`);
            
            default :
                return (<Text marginB-10></Text>);
        }
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={"The trendiest topics"}/>
                <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                    <AnimatedImage
                        style={styles.pic}
                        source={{uri:this.props.route.params.Image}}
                    />
                    <View paddingH-20>
                        <Text style={styles.heading}>
                            {this.props.route.params.Title}
                        </Text>
                        <Text style={styles.time}>
                            {this.props.route.params.Timestamp}
                        </Text>
                    </View>
                    <View flex margin-20>
                        <Text>
                            <BlogBody RootChildrens={this.state.BlogBodyChildren} />
                        </Text>
                    </View>
                </ScrollView>
            </>
        );
    }

};

const styles = StyleSheet.create({
    pic: {
        padding:0,
        margin:0,
        height: deviceHeight/3,
    },
    heading: {
        paddingTop:15,
        fontSize: 27,
        textAlign: 'left',
        lineHeight: 37,
    },
    time:{
        paddingTop:15,
        paddingBottom:5,
        fontSize:15,
        color:Colors.primary,
    },
    date:{
        color:Colors.primary
    },
    text: {
        color: Colors.secondary,
        textAlign: 'justify',
        lineHeight: 30,
        marginBottom: 20
    },

});

