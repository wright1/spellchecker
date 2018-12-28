const elSearch = document.getElementById("spell-search");
const elList = document.getElementById("dropdown");



const domCb = (response) =>{
    console.log("This is the",response)

    
    // list of all items doesn't appear when user deletes all search box entry
    if(elSearch.value == "") elList.style.display = "none";

    //removes all previous divs to eliminate duplicates
    let linkArr = document.querySelectorAll('a');

    linkArr.forEach((div) =>{
        div.parentNode.remove();
    })
    
    
    //creates a div and link containing a name for every object returned 
    response.forEach((item) =>{
        const name = item.name || item.define || '';
        //console.log(name)
        const newEl = document.createElement('div');
        const link = document.createElement('a');
        const newText = document.createTextNode(name);
        const dropList = document.getElementById('dropdown');
        const searchBar = document.getElementById('form');

       link.setAttribute('href', '#');
       newEl.setAttribute('class', 'listItem');
        newEl.appendChild(link);
        link.appendChild(newText);

        dropList.appendChild(newEl);
    })


    
}

elSearch.addEventListener("keyup", (e) =>{
    console.log("event triggered")
    makeRequest(e.target.value, domCb)
})