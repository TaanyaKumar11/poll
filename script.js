let items = [];

function addItem(){

    const input = document.getElementById("itemInput");

    if(input.value.trim()=="") return;

    items.push(input.value);

    input.value="";

    updateItemList();
}

function updateItemList(){

    const list = document.getElementById("itemList");

    list.innerHTML="";

    items.forEach(item=>{

        const li=document.createElement("li");

        li.textContent=item;

        list.appendChild(li);

    });

}

function createRanking(){

    if(items.length<2){
        alert("Add at least two items.");
        return;
    }

    document.getElementById("rankingSection").style.display="block";

    const ranking=document.getElementById("rankingList");

    ranking.innerHTML="";

    items.forEach(item=>{

        const li=document.createElement("li");

        li.textContent=item;

        li.draggable=true;

        li.classList.add("draggable");

        ranking.appendChild(li);

    });

    enableDrag();
}

function enableDrag(){

    const list=document.getElementById("rankingList");

    let dragging=null;

    list.querySelectorAll("li").forEach(item=>{

        item.addEventListener("dragstart",()=>{

            dragging=item;

            item.classList.add("dragging");

        });

        item.addEventListener("dragend",()=>{

            dragging=null;

            item.classList.remove("dragging");

        });

    });

    list.addEventListener("dragover",e=>{

        e.preventDefault();

        const after=getDragAfterElement(list,e.clientY);

        if(after==null){
            list.appendChild(dragging);
        }else{
            list.insertBefore(dragging,after);
        }

    });

}

function getDragAfterElement(container,y){

    const elements=[...container.querySelectorAll("li:not(.dragging)")];

    return elements.reduce((closest,child)=>{

        const box=child.getBoundingClientRect();

        const offset=y-box.top-box.height/2;

        if(offset<0 && offset>closest.offset){
            return {offset:offset,element:child};
        }else{
            return closest;
        }

    },{offset:Number.NEGATIVE_INFINITY}).element;

}

function showResults(){

    const items=[...document.querySelectorAll("#rankingList li")];

    let html="<h3>Final Ranking</h3><ol>";

    items.forEach(item=>{

        html+=`<li>${item.textContent}</li>`;

    });

    html+="</ol>";

    document.getElementById("results").innerHTML=html;

}