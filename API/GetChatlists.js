const GetChatLists = async (Token, Page) => {
    /*
    const resp = await fetch(config.BaseURL + 'Chat/FetchChatList?Page=' + Page, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': Token
        }
    });
    if (resp.status != 200) {
        throw new Error('GetChatList : Response status not 200');
    }
    else {
        var json = await resp.json();
        return json;
    }
    */
   return [];
}

export default GetChatLists;