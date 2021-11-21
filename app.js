const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let data = {
    allItems: {
      inc: [],
      exp: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };
  var calTotal = (type) => {
    var sum = 0;
    data.allItems[type].forEach((el) => (sum += el.value));
    data.totals[type] = sum;
  };

  return {
    addItem: (type, des, val) => {
      let newItem, Id;
      //Create Id
      if (data.allItems[type].length > 0)
        Id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      else Id = 0;
      if (type === "inc") newItem = new Income(Id, des, val);
      else {
        newItem = new Expense(Id, des, val);
      }
      //push into inc or exp array
      data.allItems[type].push(newItem);
      return newItem;
    },
    calculateBudget: () => {
      calTotal("inc");
      calTotal("exp");
      data.budget = data.totals.inc - data.totals.exp;
      data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      return;
    },
    getBudget: () => {
      return {
        budget: data.budget,
        incTotal: data.totals.inc,
        expTotal: data.totals.exp,
        percentage: data.percentage,
      };
    },
    deleteItem:(type,id)=>{
        var arr=data.allItems[type];
        arr.splice(id,1);
        data.allItems[type]=arr;


    }
  };
})();

var UIController = (function () {
  return {
    getInput: () => {
      let desc = document.querySelector(".add__description");
      let value = document.querySelector(".add__value");
      let type = document.querySelector(".add__type").value;
      return {
        description: desc.value,
        value: parseFloat(value.value),
        type,
      };
    },
    addListItem: (obj, type) => {
      var html, newHtml;
      if (type === "inc") {
        html = `<div class="item clearfix" id="inc-%id%">
               <div class="item__description">%description%</div>
               <div class="right clearfix">
                   <div class="item__value">%value%</div>
                   <div class="item__delete">
                       <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                   </div>
               </div>
           </div>`;
      } else if (type === "exp") {
        html = `<div class="item clearfix" id="exp-%id%">
               <div class="item__description">%description%</div>
               <div class="right clearfix">
                   <div class="item__value">%value%</div>
                   <div class="item__delete">
                       <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                   </div>
               </div>
           </div>`;
      }

      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);
      var explist = document.querySelector(".expenses__list");
      var inclist = document.querySelector(".income__list");
      if (type === "inc") inclist.insertAdjacentHTML("beforeend", newHtml);
      else if (type === "exp") explist.insertAdjacentHTML("beforeend", newHtml);
    },
    clearFields: () => {
      var fields = document.querySelectorAll(
        ".add__description" + "," + ".add__value"
      );
      // var fieldsArr=Array.prototype.slice.call(fields)
      var fieldsArr = Array.from(fields);
      fieldsArr.forEach((el) => {
        el.value = "";
      });
    },
    clearBudget(){
        var budget = document.querySelector(".budget__value");
        var incval = document.querySelector(".budget__income--value");
        var expval = document.querySelector(".budget__expenses--value");
        var percen = document.querySelector(".budget__expenses--percentage");
        budget.textContent = 0;
        incval.textContent = 0;
        expval.textContent = 0;
        percen.textContent = 0 + "%";


    },
    updateBudget: (data) => {
      var budget = document.querySelector(".budget__value");
      var incval = document.querySelector(".budget__income--value");
      var expval = document.querySelector(".budget__expenses--value");
      var percen = document.querySelector(".budget__expenses--percentage");
      budget.textContent = data.budget;
      incval.textContent = data.incTotal;
      expval.textContent = data.expTotal;
        percen.textContent = data.percentage + "%";
      
    },
    deleteItemUI:(type,id)=>{
        var item=type+'-'+id;
        var itemdel=document.querySelector('#'+item);
        console.log(itemdel);
        itemdel.style.display="none";
    }
  };
})();

var controller = (function (budgetCtrl, UICtrl) {
  const setUpEventListeners = () => {
    document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

    document.addEventListener("keypess", function (event) {
      if (event.keyCode === 13) ctrlAddItem();
    });
    document.querySelector('.container').addEventListener('click',cltrDeleteItem);
  };
  var ctrlAddItem = function () {
    var inpdata = UICtrl.getInput();
    if (
      inpdata.description !== "" &&
      !isNaN(inpdata.value) &&
      inpdata.value !== 0
    ) {
      var newItem = budgetCtrl.addItem(
        inpdata.type,
        inpdata.description,
        inpdata.value
      );
      
      UICtrl.addListItem(newItem, inpdata.type);
      UICtrl.clearFields();
      budgetCtrl.calculateBudget();
      // get budget
      let budgetData = budgetCtrl.getBudget();

      //update budget in Ui
      UICtrl.updateBudget(budgetData);
    }

    
  };
  var cltrDeleteItem=(event)=>{
    var itemId,split,type,Id;
    itemId=event.target.parentNode.parentNode.parentNode.parentNode.id;
    
    if(itemId)
    {
        split=itemId.split('-');
        Id=split[1];
        type=split[0];
        //delete from array
        budgetCtrl.deleteItem(type,Number(Id));
        //update Ui
        UICtrl.deleteItemUI(type,Id);
        

        budgetCtrl.calculateBudget();
        let budgetData = budgetCtrl.getBudget();

      //update budget in Ui
      UICtrl.updateBudget(budgetData);
    }


}

  return {
    init: () => {
      setUpEventListeners();
      UICtrl.clearBudget();
      var month=document.querySelector('.budget__title--month');
      const d = new Date();
       month.textContent=monthNames[d.getMonth()];
    },
  };
})(budgetController, UIController);
controller.init();
