var budgetController=(function(){
    
    
})();


var UIController=(function(){
    
})();


var controller=(function(budgetCtrl, UICtrl){
    var ctrlAddItem=function(){
        
        console.log('it works');
        
        
    }
    
    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);
    
    document.addEventListener('keypess',function(event){
        
        if(event.keyCode===13)
            ctrlAddItem();
    });
    
    
})(budgetController,UIController)