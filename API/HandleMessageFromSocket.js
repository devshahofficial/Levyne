export default (BrandID, Messages, resp) => {
    
    if(parseInt(resp.From) === parseInt(BrandID)) {
        for(var i = Messages.length - 1;i>=0;i--){
            if(resp.ReferenceID === Messages[i].ReferenceID) {
                Messages[i].image = resp.ImageURL;
                return Messages;
            }
        }
        return -1;
    } else {
        switch(resp.Type) {
            case 1 :
                Messages.push({
                    direction: "left",
                    type: 1,
                    image: null,
                    text: resp.Text,
                    ReferenceID : resp.ReferenceID,
                    timeStamp:
                    {
                        timeHours: new Date().getHours(),
                        timeMinutes: new Date().getMinutes()
                    }
                })
                return Messages;
            case 2 :
                Messages.push({
                    direction: "left",
                    type: 2,
                    image: resp.ImageURL,
                    text: null,
                    ReferenceID : resp.ReferenceID,
                    timeStamp:
                    {
                        timeHours: new Date().getHours(),
                        timeMinutes: new Date().getMinutes()
                    }
                })
                return Messages;
            case 3 :
                Messages.push({
                    direction: "left",
                    type: 3,
					ProductImage: resp.ProductImage,
					ProductName: resp.ProductName,
					ProductShortDescription : resp.ProductShortDescription,
					ProductPrice : resp.ProductPrice,
					ProductID : resp.ProductID,
					ReferenceID : resp.ReferenceID,
					timeStamp:
					{
						timeHours: new Date().getHours(),
						timeMinutes: new Date().getMinutes()
					},
                })
                return Messages;
            case 4 :
        }
    }
}