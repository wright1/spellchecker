const makeRequest =(inputValue, callback) =>{
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () =>{
    if(xhr.readyState == 4 && xhr.status == 200){
        let spellObj = JSON.parse(xhr.responseText);
       
        callback(spellObj);
    }
}
xhr.open('GET', `/search?spell=${inputValue}`)
xhr.send();

}

const makeResultRequest = (inputValue, callback) =>{
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            let resultObj = JSON.parse(xhr.responseText)

            callback(resultObj)

        }
    }

    xhr.open('GET', `/resultObject?name=${inputValue}`)
    xhr.send();
}


