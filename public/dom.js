const elSearch = document.getElementById("spell-search");
const elList = document.getElementById("dropdown");
const button = document.getElementById("button");



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

       link.setAttribute('href', '/');
       link.setAttribute('value', name)
       newEl.setAttribute('class', 'listItem');
       newEl.setAttribute('value', name);
        newEl.appendChild(link);
        link.appendChild(newText);

        dropList.appendChild(newEl);
    })


    
}

const listValue = (e) =>{
    console.log(event.target)
    if (event.target != event.currentTarget){
        clickedItem = event.target.value;
        
        
    }else {
        e.stopPropagation();
    }
    let linkArr = document.querySelectorAll('a');
    event.preventDefault()
    elSearch.value = event.target.textContent;

    linkArr.forEach((div)=>{
        div.parentNode.remove();
    })
};

// button.addEventListener("click")

elList.addEventListener("click", (e) =>{
    console.log("list event triggered")
    // e.preventDefault();
    listValue()
})

//call xhr with every letter entered
elSearch.addEventListener("keyup", (e) =>{
    console.log("event triggered")
    makeRequest(e.target.value, domCb)
})