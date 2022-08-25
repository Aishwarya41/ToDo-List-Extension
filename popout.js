

document.querySelector('.create-todo').addEventListener('click', function(){
     document.querySelector('.new-item').style.display='block';
});

document.querySelector('.new-item button').addEventListener('click', function(){
    let itemName = document.querySelector('.new-item input').value;
    if(itemName != ''){

        let itemsStorage = localStorage.getItem('todo-items');
        let itemsArrObj = JSON.parse(itemsStorage)
        var itemsArr = [];
        itemsArr = Object.entries(itemsArrObj);
        itemsArr.push({"item": itemName, "status":0});
        saveItems(itemsArrObj);
        fetchItems();
        document.querySelector('.new-item input').value='';
        document.querySelector('.new-item').style.display='none';
    }
});

function fetchItems(){

    const itemsList = document.querySelector('ul.todo-items');
    itemsList.innerHTML = '';
    var newItemHTML = '';
    try{
        var itemsStorage = localStorage.getItem('todo-items');
        var itemsArr = Object.entries(JSON.parse(itemsStorage));

        for (var i=0; i< itemsArr.length; i++){
            var status = '';
            if(itemsArr[i].status == 1){
                status = 'class="done"';
            }
            newItemHTML += `<li data-itemindex="${i}" ${status}><span class="item">
            ${itemsArr[i].item}</span><div><span class="itemComplete">✅</span>
            <span class="itemDelete">🗑</span></div></li>`;
        }   

        itemsList.innerHTML = newItemHTML;

        var itemsListUL = document.querySelectorAll('ul li');
        for (var i=0;i< itemsListUL.length; i++){
            itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function(){
                //
                var index = this.parentNode.parentNode.dataset.itemindex;
                console.log(index);
                itemComplete(index);
            });

            itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function(){
                //
                var index = this.parentNode.parentNode.dataset.itemindex;
                console.log(index);
                itemDelete(index);
            });

        }
    } catch(e){

    }

}


//<li><span class="item">Record video</span><div><span>✅</span><span>🗑</span></div></li>



function itemComplete(index){

    var itemsStorage = localStorage.getItem('todo-items');
    var itemsArr = Object.entries(JSON.parse(itemsStorage));

    itemsArr[index].status = 1;

    saveItems(itemsArr);

    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className ='done';

}

function itemDelete(index){

    var itemsStorage = localStorage.getItem('todo-items');
    var itemsArr = Object.entries(JSON.parse(itemsStorage));

    itemsArr.splice(index, 1);

    saveItems(itemsArr);

    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').remove();


}

function saveItems(obj){

    var string = JSON.stringify(obj);

    localStorage.setItem('todo-items', string);
}