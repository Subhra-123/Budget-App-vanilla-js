var budgetController=(function(){

    var Expense=function(id,description,value){
        this.id=id;this.description=description;this.value=value

    }
    var Income= function(id,description,value){
        this.id=id;this.description=description;this.value=value
    }

    let data={
        allItems:{
            inc:[],
            exp:[]
        },
        totals:{
            exp:0,
            inc:0
        }
    }

    return {
        addItem:(type,des,val)=>{
            let newItem,Id;
            //Create Id
            if(data.allItems[type].length>0)
            Id=data.allItems[type][data.allItems[type].length-1].id+1;
            else
            Id=0;
            if(type==='inc')
            newItem=new Income(Id,des,val);
            else{
                newItem=new Expense(Id,des,val);
            }
            //push into inc or exp array
            data.allItems[type].push(newItem);
            console.log(newItem);
            return newItem;

        }
    }
    
    
})();


var UIController=(function(){

    return {
        getInput: ()=>{
            let desc=document.querySelector('.add__description');
            let value=document.querySelector('.add__value');
            let type=document.querySelector('.add__type').value;
            return {
                description:desc.value,
                value:value.value,
                type
            }

        },
        addListItem:(obj,type)=>{
            var html,newHtml;
           if(type==='inc')
           {
               html= `<div class="item clearfix" id="income-%id%">
               <div class="item__description">%description%</div>
               <div class="right clearfix">
                   <div class="item__value">%value%</div>
                   <div class="item__delete">
                       <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                   </div>
               </div>
           </div>`
           }
           else if(type==='exp')
           {
               html=`<div class="item clearfix" id="expense-%id%">
               <div class="item__description">%description%</div>
               <div class="right clearfix">
                   <div class="item__value">%value%</div>
                   <div class="item__percentage">21%</div>
                   <div class="item__delete">
                       <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                   </div>
               </div>
           </div>`
           }
           console.log(html);
           
           newHtml=html.replace('%id%',obj.id);
           newHtml=newHtml.replace('%description%',obj.description);
           newHtml=newHtml.replace('%value%',obj.value);
           console.log(newHtml);
           var explist=document.querySelector('.expenses__list');
           var inclist=document.querySelector('.income__list');
           if(type==='inc')
           inclist.insertAdjacentHTML('beforeend',newHtml);

          

        }
    }
    
})();


var controller=(function(budgetCtrl, UICtrl){
    const setUpEventListeners=()=>{

        document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);
    
    document.addEventListener('keypess',function(event){
        
        if(event.keyCode===13)
            ctrlAddItem();
    });

    }
    var ctrlAddItem=function(){
        
       var inpdata= UICtrl.getInput();
       var newItem=budgetCtrl.addItem(inpdata.type,inpdata.description,inpdata.value);
       UICtrl.addListItem(newItem,inpdata.type);
       
        
        
    }

    return {
        init:()=>{
            setUpEventListeners();
        }

    }
    
    
    
    
})(budgetController,UIController)
controller.init();