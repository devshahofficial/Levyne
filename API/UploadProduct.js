import config from '../assets/constants';
const UploadProduct = (ProductState, Token, showLoadingWithPercentage) => {
    return new Promise((resolve, reject) => {
        const SelectedImages = ProductState.SelectedImages.slice()
        SelectedImages.pop();

        const formData = new FormData();

        formData.append('ApproxManufacturingDays', ProductState.ApproxManufacturingDays);
        formData.append('Category', ProductState.Category.value);
        formData.append('CustomFit', ProductState.CustomFit);
        formData.append('Materials', JSON.stringify(ProductState.Fabrics.map(item => item.value)));
        formData.append('LongDescription', ProductState.LongDescription);
        formData.append('Name', ProductState.Name);
        formData.append('ActualPrice', ProductState.Price);
        formData.append('ShortDescription', ProductState.ShortDescription);
        formData.append('Styles', JSON.stringify(ProductState.Style.map(item => item.value)));
        formData.append('DiscountPrice', ProductState.TotalPrice);

        SelectedImages.forEach((item) => {
            formData.append('ProductImages[]', item);
        });
        const xhr = new XMLHttpRequest();
        xhr.open("POST", config.BaseURL + 'Products/UploadProduct');
        xhr.setRequestHeader("Content-Type", 'multipart/form-data');
        xhr.setRequestHeader("Authorization", Token);
        xhr.onreadystatechange = function() {
            if (this.status === 200) {
                if(this.readyState === 4) {
                    var json = JSON.parse(this.responseText);
                    resolve(json.ProductID);
                }
            }
            else {
                if(this.readyState === 4) {
                    reject('Error Status : ' + this.status);
                }
                //
            }
        };
        xhr.upload.onprogress = function(e){
            var done = e.position || e.loaded, total = e.totalSize || e.total
            var Percentage = Math.floor(done/total*100)
            showLoadingWithPercentage(parseInt(Percentage/1.1));
        }
        xhr.send(formData);
    })
}
export default UploadProduct;