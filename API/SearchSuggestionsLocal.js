import ProductsData from '../assets/ProductsData';

const SearchSuggestionsLocal = (SearchText) => {

    const Category = ProductsData[0]
        .filter(item => item.title.search(new RegExp(SearchText, "i")) !== -1 )
        .slice(0, 2)
        .map(item => {
            return {Type: 0, Index: ProductsData[0].findIndex(itemTemp => itemTemp.title === item.title), Label: item.title}
        });
    
    const Styles = ProductsData[1]
        .filter(item => item.title.search(new RegExp(SearchText, "i")) !== -1)
        .slice(0, 2)
        .map(item => {
            return {Type: 1, Index: ProductsData[1].findIndex(itemTemp => itemTemp.title === item.title), Label: item.title}
        });

    const Fabrics = ProductsData[2]
        .filter(item => item.title.search(new RegExp(SearchText, "i")) !== -1)
        .slice(0, 2)
        .map(item => {
            return {Type: 2, Index: ProductsData[2].findIndex(itemTemp => itemTemp.title === item.title), Label: item.title}
        });

    return [...Category, ...Styles, ...Fabrics];
}

export default SearchSuggestionsLocal;