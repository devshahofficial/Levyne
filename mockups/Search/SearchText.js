import React from 'react';
import {StyleSheet, Dimensions, Animated} from 'react-native';
import {View,TouchableOpacity,Colors,Text} from 'react-native-ui-lib';
import CstmInput from "../../components/input";
import {connect} from 'react-redux';
import {SearchIcon} from '../../Icons/SearchIcon';
import {BackArrowIcon} from '../../Icons/BackArrowIcon';
import CstmShadowView from "../../components/CstmShadowView";
import SearchSuggestionsAPI from '../../API/SearchSuggestions';

const screenWidth = Dimensions.get('window').width;

class SearchText extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            SearchKey: '',
            SearchSuggestions: [],
            Loading: false,
        }
        this.abortController = new AbortController();
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    navigateSearch(SearchKey) {
        if(SearchKey) {
            this.props.navigation.push('SearchScreen', {SearchKey});
        }
    }

    navigateSearchWithStateSearchKey = () => {
        if(this.state.SearchKey) {
            this.props.navigation.push('SearchScreen', {SearchKey: this.state.SearchKey});
        }
    }

    renderItem = ({item}) => {
        const NavigateSearch = () => this.navigateSearch(item);
        return (
            <TouchableOpacity activeOpacity={0.5} style={styles.TextResultContainer} onPress={NavigateSearch}>
                <CstmShadowView style={styles.TextResult}>
                    <Text marginL-15 h1 secondary>{item}</Text>
                </CstmShadowView>
            </TouchableOpacity>
        )
    }

    setSearchKey = (SearchKey) => {

        this.setState({
            SearchKey: SearchKey
        });
        if(SearchKey !== '') {
            SearchSuggestionsAPI(SearchKey).then(SearchSuggestions => {
                this.setState({SearchSuggestions});
            }).catch(err => {
                console.log(err);
            })
        } else {
            this.setState({SearchSuggestions : []});
        }
    }

    render() {
        return (
            <View flex>
                <View row centerV paddingL-10 paddingR-30>
                    <TouchableOpacity
                        onPress={this.props.navigation.goBack}
                        marginT-10 centerV centerH
                        style={{height:30,width:40}}
                    >
                        <BackArrowIcon/>
                    </TouchableOpacity>
                    <View row centerV marginL-15 marginR-30 marginB-10>
                        <CstmInput
                            placeholder='Search...'
                            value={this.state.SearchKey}
                            onChangeText={this.setSearchKey}
                            style={{flex:10}}
                            autoFocus={true}
                            returnKeyType='search'
                            onSubmitEditing={this.navigateSearchWithStateSearchKey}
                        />
                        <TouchableOpacity onPress={this.navigateSearchWithStateSearchKey} flex-1 marginT-13 style={{marginLeft:-40}}>
                            <SearchIcon Color={Colors.grey40}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View flex centerH marginT-10>
                    <Animated.FlatList
                        data={this.state.SearchSuggestions}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View flex centerV centerH style={{height:605}} paddingH-40>
                                <Text center b1 grey50>Your brand is what other people say about you when you are not in the room.  </Text>
                                <Text center h3 grey50 marginT-10>- Jeff Bezoz, Founder & CEO of Amazon  </Text>
                            </View>
                        }
                        onEndReached={this.props.onBrandEndReached}
                        onEndReachedThreshold={0.75}
                    />
                </View>
            </View>
        );
    }

};


const styles = StyleSheet.create({
    TextResult: {
        borderRadius: 10,
        marginTop:0,
        flex:1,
        justifyContent: "center"
    },
    TextResultContainer: {
        width: screenWidth*0.95,
        height:50,
        marginTop:2,
    }
});

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(SearchText);
