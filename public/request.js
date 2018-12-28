const makeRequest =(inputValue, callback) =>{
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () =>{
    if(xhr.readyState == 4 && xhr.status == 200){
        let spellObj = JSON.parse(xhr.responseText);
       // console.log(spellObj[0])
        callback(spellObj);
    }
}
xhr.open('GET', `/search?spell=${inputValue}`)
xhr.send();

}

//`/search${inputValue}`
