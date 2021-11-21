var budgetController=(function(){

    var Expense=(id,description,value)=>{
        this.id=id;this.description=description;this.value=value

    }
    var Income=(id,description,value)=>{
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
        
       const inpdata= UICtrl.getInput();
       console.log(inpdata.description);
       console.log(inpdata.value);
       console.log(inpdata.type);
        
        
    }

    return {
        init:()=>{
            setUpEventListeners();
        }

    }
    
    
    
    
})(budgetController,UIController)
controller.init();