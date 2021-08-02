let api_info = {
    url : 'https://api.coingecko.com/api/v3/',
    coins_str : 'coins/',
    search_str : 'search/trending',
    coin_name : ''
}

let get_trendings = async() =>{
    try{
        let response = await fetch( `${api_info.url + api_info.search_str}`)
        let data = await response.json()
        console.log(data)
        let trendings = data.coins
        let name
        for (let x in trendings){ 
            name = trendings[x].item.name
            let list = document.querySelector('#trendings_list')
            let li = document.createElement('li')
            li.classList.add('list-group-item')
            li.innerHTML = name
            list.insertAdjacentElement('beforeend',li)
        }
    }catch (e){
        console.log(e)
    }
}


let search_coin = () => {
    let table = document.querySelector('#table')
    table.style.visibility = 'visible'
    let coin_name = document.querySelector('#search_name').value 
    api_info.coin_name = coin_name.toLowerCase() 
    api_call()
}

let api_call = async() => {
    try{
        let response = await fetch( `${api_info.url + api_info.coins_str + api_info.coin_name}`)
        let data = await response.json()
        let currency = data.market_data.current_price
        charge_data(currency)

    }catch (e){
        console.log(e)
    }
}

let charge_data = (currency) => {
    let currency_name, currency_price, i
    i = 0
    for (let x in currency){ 
        currency_name = x
        currency_price = currency[x]
        ++i
        append_data(currency_name, currency_price, i) 
    }
    
}

let append_data = (curr_name, curr_price, i) => {
    let tbody = document.querySelector('#currency-info')
    let row = document.createElement('tr')
    let num = document.createElement('th')
    let column_curr = document.createElement('td')
    let column_price = document.createElement('td')
    num.innerHTML = i
    column_curr.innerHTML = curr_name
    column_price.innerHTML = curr_price
    row.insertAdjacentElement('beforeend', num)
    row.insertAdjacentElement('beforeend', column_curr)
    row.insertAdjacentElement('beforeend', column_price)
    tbody.insertAdjacentElement('beforeend', row)

}


