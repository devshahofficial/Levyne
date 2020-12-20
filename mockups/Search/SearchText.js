import React from 'react';
import {StyleSheet, Dimensions, Animated} from 'react-native';
import {View,TouchableOpacity,Colors,Text,Image} from 'react-native-ui-lib';
import CstmInput from "../../components/input";
import {connect} from 'react-redux';
import {SearchIcon} from '../../Icons/SearchIcon';
import {BackArrowIcon} from '../../Icons/BackArrowIcon';
import CstmShadowView from "../../components/CstmShadowView";
import SearchSuggestionsAPI from '../../API/SearchSuggestions';
import SearchSuggestionsLocal from '../../API/SearchSuggestionsLocal';
import SearchTextSVG from '../../assets/images/AppImages/SearchText.svg';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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

    componentWillUnmount() {
        this.abortController.abort();
    }

    navigateSearch(SearchFilter) {
        this.props.navigation.push('SearchScreen', {SearchFilter});
    }

    navigateSearchWithStateSearchKey = () => {
        if(this.state.SearchKey) {
            this.props.navigation.push('SearchScreen', {SearchFilter: {Label: this.state.SearchKey, Type: 3}});
        }
    }

    renderItem = ({item}) => {
        const NavigateSearch = () => this.navigateSearch(item);
        return (
            <TouchableOpacity activeOpacity={0.5} style={styles.TextResultContainer} onPress={NavigateSearch}>
                <CstmShadowView style={styles.TextResult}>
                    <Text marginL-15 h1 secondary>{item.Label}</Text>
                </CstmShadowView>
            </TouchableOpacity>
        )
    }

    setSearchKey = (SearchKey) => {

        this.setState({
            SearchKey: SearchKey
        });

        if(SearchKey !== '') {
            const SearchSuggestionFromLocal = SearchSuggestionsLocal(SearchKey);
            this.setState({SearchSuggestions: SearchSuggestionFromLocal});
            SearchSuggestionsAPI(SearchKey).then(SearchSuggestions => {
                this.setState({SearchSuggestions: [...SearchSuggestionFromLocal, ...SearchSuggestions]});
            }).catch(() => {})
        } else {
            this.setState({SearchSuggestions : []});
        }
    }

    render() {
        return (
            <>
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
                <View flex centerH >
                    <Animated.FlatList
                        data={this.state.SearchSuggestions}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.Label + `${item.Type}`}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View center style={styles.Image}>
                                <SearchTextSVG width={'90%'}/>
                            </View>
                        }
                        onEndReached={this.props.onBrandEndReached}
                        onEndReachedThreshold={0.75}
                    />
                </View>
            </>
        );
    }

};


const styles = StyleSheet.create({
    TextResult: {
        borderRadius: 10,
        marginTop:0,
        flex:1,
        justifyContent: "center",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {width: 0,height: 1}
    },
    TextResultContainer: {
        width: screenWidth*0.95,
        height:50,
        marginTop:0,
        marginBottom: 2,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    Image: {
        width: screenWidth,
        height: screenHeight-90,
    }
});

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(SearchText);
