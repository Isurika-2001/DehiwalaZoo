//-------------------------------------------------------------------FOR PURCHACE FORM----------------------------------------------------------------------------------


//Javascript object to store choice of ticket and time duration of visit.




var noOfRows = 0;
document.getElementById("spCost").style = "text-align:center";
var trow;

function calculateTotal(){

    let ticketChoice = [1000,500,5000];//choice of ticket based on the customer situation.(it can be day pass, student pass or foriegn pass)
    let durationChoice = [0,250,500,1000];//extra amounts based on time duration (for half day, 1 day and 2 days.(0 = no extra))
    var cost = 0;
    var extra = 0;

    var chOfTicket = document.getElementById("choice").value;
    var duration = document.getElementById("duration").value;
    var adultTicket = document.getElementById("noOfAdult").value;
    var childTicket = document.getElementById("noOfChild").value;
    var annualPass = document.getElementById("noOfPass").value;
    var foodToken = document.getElementById("noOfTokens").value;

    if(chOfTicket == ""){
        alert("Please select your choice");
        document.getElementById("choice").focus();
        return false;
    }

    chOfTicket = parseInt(chOfTicket);
    //assign the value of typeOfTicket[index] to the chOfTicket
    var ticketPrice = ticketChoice[chOfTicket];
    

    if (adultTicket == ""){
        adultTicket = 0;
    }
    else{
        //conver string "noOfadult" value to integer value
        adultTicket = parseInt(adultTicket);
    }

    if (childTicket == ""){
        childTicket = 0;
    }
    else{
        childTicket = parseInt(childTicket);
    }
    
    
    duration = parseInt(duration);

    if(adultTicket > 0 || childTicket > 0){
        //if there is any adult ticket or child ticket with (time duration > 3 hours) add extra charges 
        check();
        extra = durationChoice[duration];
    }

    //calculate annual pass cost and food token cost
    var annualPass_cost = parseInt(annualPass * 5000);
    var foodToken_cost = parseInt(foodToken * 500);
        
    var cost = parseFloat(ticketPrice*adultTicket + (ticketPrice/2)/*divided by 2 - child ticket*/ *childTicket + extra + annualPass_cost + foodToken_cost);
    
    document.getElementById("spCost").innerHTML = cost.toFixed(2);



}

function check(){
    var date = document.getElementById("date").value;
    var duration = document.getElementById("duration").value;

    if(duration == ""){
        alert("Please select duration");
        document.getElementById("duration").focus();
        return false;
    }
    else if(date == ""){
        alert("Please select the date");
        document.getElementById("date").focus();
        return false;
    }
}

function addToOrder(){
    
    var cost = parseFloat(document.getElementById("spCost").innerHTML);

    if(cost == 0){
        alert("Please fill the form");
        return;
    }

    //calculate annual pass and food token cost

    var date = document.getElementById("date").value;
    var noOfAdults = document.getElementById("noOfAdult").value;
    var noOfChild = document.getElementById("noOfChild").value;
    var ctrlDuration = document.getElementById("duration");
    var annualPass = document.getElementById("noOfPass").value;
    var foodToken = document.getElementById("noOfTokens").value;
    var ctrlChoice = document.getElementById("choice");

    if((noOfAdults > 0 || noOfChild>0) && (ctrlDuration.value == "" || date == "")){
        check();
    }
    else{
        annualPass = parseInt(annualPass);
        var annualPass_cost =annualPass * 5000;

        foodToken = parseInt(foodToken);
        var foodToken_cost = foodToken * 500;

        var selectd_choice = ctrlChoice.options[ctrlChoice.selectedIndex].text;

        var selected_duration = ctrlDuration.options[ctrlDuration.selectedIndex].text;
        
        var total = cost - (annualPass_cost + foodToken_cost);

        var tbody = document.getElementById("tbody_purchase");

        
        if(noOfAdults > 0 || noOfChild>0){
            
            trow = tbody.insertRow(-1)

            noOfRows++;

            td1 = trow.insertCell(0);
            td1.innerHTML = selectd_choice;

            td2 = trow.insertCell(1);
            td2.innerHTML = date;

            td3 = trow.insertCell(2);
            td3.innerHTML = selected_duration;

            td4 = trow.insertCell(3);
            td4.innerHTML = noOfAdults;

            td5 = trow.insertCell(4);
            td5.innerHTML = noOfChild;

            td6 = trow.insertCell(5);
            td6.innerHTML=total.toFixed(2);
            td6.style = "text-align:right";

            td7 = trow.insertCell(6);
            td7.innerHTML = "<a href='javascript:void(0)' style='color:red;font-weight:bold' onclick='removeRecord(this.parentElement);'>X</a>";


        }

        highlight();
    

        
        
        

        var grand_annualPass = parseFloat(document.getElementById("tbAnnual").innerHTML);
        grand_annualPass = grand_annualPass + annualPass;

        var grand_foodToken = parseFloat(document.getElementById("tbFood").innerHTML);
        grand_foodToken = grand_foodToken + foodToken;



        document.getElementById("tbAnnual").innerHTML = grand_annualPass;
        document.getElementById("tbFood").innerHTML = grand_foodToken;

        var grand_total = parseFloat(document.getElementById("tbGrandTot").innerHTML);
        grand_total = grand_total + total + annualPass_cost + foodToken_cost;

        var grand_annualPass_cost = parseFloat(document.getElementById("tbAnnual_cost").innerHTML);
        grand_annualPass_cost = grand_annualPass_cost + annualPass_cost;

        var grand_foodToken_cost = parseFloat(document.getElementById("tbFood_cost").innerHTML);
        grand_foodToken_cost = grand_foodToken_cost + foodToken_cost;

        document.getElementById("tbAnnual_cost").innerHTML = grand_annualPass_cost.toFixed(2);
        document.getElementById("tbAnnual_cost").style = "text-align:right";
        document.getElementById("remove_pass").innerHTML = "<a href='javascript:void(0)' style='color:blue;font-weight:bold' onclick='removePass(this.parentElement);'>X</a>";

        document.getElementById("tbFood_cost").innerHTML = grand_foodToken_cost.toFixed(2);
        document.getElementById("tbFood_cost").style = "text-align:right";
        document.getElementById("remove_token").innerHTML = "<a href='javascript:void(0)' style='color:blue;font-weight:bold' onclick='removeToken(this.parentElement);'>X</a>";
        
        document.getElementById("tbGrandTot").innerHTML = grand_total.toFixed(2);
        document.getElementById("tbGrandTot").style = "text-align:center";

        
        document.getElementById("divOrder").style = "display: block";

        calcLoyaltyPoints();
        resetForm1();
    }
    
}






function addExtra(){
    document.getElementById("hide").style = "display: block";
}

function resetForm1(){
    document.getElementById("form1").reset();
    document.getElementById("spCost").innerHTML = "0.00";
    document.getElementById("hide").style="display: none;"
}

function removeRecord(item){
    var result = confirm("Do you want to remove this record?");
    
    if(result == true){
        var table = document.getElementById("PD_Table");
        var grand_total = parseFloat(document.getElementById("tbGrandTot").innerHTML);
        var total = parseFloat(item.parentElement.cells[5].innerHTML);
        grand_total = grand_total - total;
        document.getElementById("tbGrandTot").innerHTML = grand_total.toFixed(2);
        table.deleteRow(item.parentElement.rowIndex);

        noOfRows = noOfRows - 1;
    }
   

}
function removePass(){
    var grand_annualPass_cost = parseFloat(document.getElementById("tbAnnual_cost").innerHTML);
    var grand_total = parseFloat(document.getElementById("tbGrandTot").innerHTML);
    var grand_annualPass = document.getElementById("tbAnnual").innerHTML;

    if(grand_annualPass_cost >  0){
        grand_annualPass_cost = grand_annualPass_cost - 5000;
        grand_annualPass = grand_annualPass - 1;
        grand_total = grand_total - 5000;

        var result = confirm("Do you want to remove 1 Annual Pass");
    }
    else{
        alert("You don't have any Annual Passes");
    }

    
    if( result == true){
        document.getElementById("tbAnnual_cost").innerHTML = grand_annualPass_cost.toFixed(2);
        document.getElementById("tbAnnual").innerHTML = grand_annualPass;
        document.getElementById("tbGrandTot").innerHTML = grand_total.toFixed(2);
    }
}
function removeToken(){
    var grand_foodToken_cost = parseFloat(document.getElementById("tbFood_cost").innerHTML);
    var grand_total = parseFloat(document.getElementById("tbGrandTot").innerHTML);
    var grand_foodToken = document.getElementById("tbFood").innerHTML

    if(grand_foodToken_cost >  0){
        grand_foodToken_cost = grand_foodToken_cost - 500;
        grand_foodToken = grand_foodToken - 1;
        grand_total = grand_total - 500;

        var result = confirm("Do you want to remove 1 Food Token");
    }
    else{
        alert("You don't have any Food Tokens");
    }

    if( result == true){
        document.getElementById("tbFood_cost").innerHTML = grand_foodToken_cost.toFixed(2);
        document.getElementById("tbFood").innerHTML = grand_foodToken;
        document.getElementById("tbGrandTot").innerHTML = grand_total.toFixed(2);
    }
}

function placeOrder(item){
    var table_body = document.getElementById("tbody_purchase");
    var grand_total = document.getElementById("tbGrandTot").innerHTML

    var result = confirm("Total payment is " + grand_total + "\n Do you want to proceed");
    
    if(result == true){

        document.getElementById("tbGrandTot").innerHTML = 0.00.toFixed(2);
        document.getElementById("tbAnnual_cost").innerHTML = 0.00.toFixed(2);
        document.getElementById("tbFood_cost").innerHTML = 0.00.toFixed(2);
        document.getElementById("tbAnnual").innerHTML = 0;
        document.getElementById("tbFood").innerHTML = 0;
        
        document.getElementById("divOrder").style = "display: none;";

        while(noOfRows >= 1){
            table_body.deleteRow(item.parentElement.rowIndex);
            noOfRows = noOfRows - 1;
        }
        document.getElementById("divOrder").style = "display: none;";

        alert("Thank you for your reservation")
    }
}

//table row hover
function highlight(){
    let listElement = document.getElementsByTagName("li");


    for(let i = 0; i<noOfRows; i++){
        trow.addEventListener("mouseenter",listEnter)
        trow.addEventListener("mouseleave",listLeave)
    }
}


function listEnter(){
    this.style.backgroundColor = "#ccffd4";
}


function listLeave(){
    this.style.backgroundColor = "white";
}






//------------LOCAL STORAGE-----------

const alertBox = document.getElementById("alert");
let form1 = document.getElementById("form1");
let formElements = form1.elements;
let loyaltyPoints;
let grand_loyaltyPoints = 0;


//getting elements from form
const getFormData = () => {
    let data = { [form1]: {} };
    for (const element of formElements){
        if(element.name.length > 0){
            data[form1][element.name] = element.value;
        }
    }
    return data;
};

//when the user clicks "Add to favorite" button, every data that entered by the user to form, will store in the local storage.
function addToFavorite(){
    var data = getFormData();
    localStorage.setItem(form1, JSON.stringify(data[form1]));
    const message = "form data has been saved!";
    displayAlert(message);
    resetForm1();
}


//alert 
const displayAlert = message => {
    alertBox.innerHTML = message;
    alertBox.style.display = "block";
    setTimeout(function(){
        alertBox.style.display = "none";
    }, 2000);
};

/*when the user clicks "Order favorite" button, it retrieve the saved data from local storage and add to overall order.*/
function OrderFav() {
    if(localStorage.key(form1)){
        const savedData = JSON.parse(localStorage.getItem(form1));
        for(const element of formElements) {
            if (element.name in savedData){
                element.value = savedData[element.name];
            }
        }
        const message = "Your favorite order has been added to the table!";
        displayAlert(message);
        calculateTotal();
        addToOrder();
    }
}

//calculate and store loyalty points in the local storage
function calcLoyaltyPoints(){
    var adultTicket = parseInt(document.getElementById("noOfAdult").value);
    var childTicket = parseInt(document.getElementById("noOfChild").value);
    

    var totalTicket = adultTicket + childTicket;
    if(totalTicket > 3){
        loyaltyPoints = 20 * totalTicket;
        grand_loyaltyPoints = grand_loyaltyPoints + loyaltyPoints; 
        localStorage.setItem("loyalty",grand_loyaltyPoints);
    }
}

/*when user clicks on the "Check loyalty points" button,
it shows total loyalty points that have earned by the user so far based on the overall order*/
function showLoyaltyPoints(){
    grand_loyaltyPoints = JSON.parse(localStorage.getItem(`loyalty`));
    if(grand_loyaltyPoints>0){
        alert("Congratulations! You have earned "+ grand_loyaltyPoints + " loyalty points so far");
    }
    else{
        alert("Sorry! You don't have any loyalty points so far");
    }
}




//---------------------------------------------------------------------FOR DONATE FORM--------------------------------------------------------------------------------


function donateAmount(){
    amount = document.getElementById("amount").value;
    document.getElementById("other").value = amount;
}
function remove_innerText(){
    amount = document.getElementById("amount").value;
    if(amount == "--Select your amount of donation--"){
        document.getElementById("other").value = "";
    }
}


var finalAmount;
function makeDonation(){
    finalAmount = document.getElementById("other").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("addr").value;
    var cardNumber = document.getElementById("CDnum").value;
    var pinNumber = document.getElementById("pin").value;


    /*VALIDATION*/
    var finalAmount_pattern = /^[0-9]{1,12}$/;
    var email_pattern = /^[A-Za-z\d\.\_]+\@[A-Za-z\d\.\-]+\.[A-Za-z]{2,5}$/;
    var name_pattern = /^[A-Za-z\s\.]{2,}$/;
    var addr_pattern = /^[A-Za-z\d\.\-\/\#\,\s]+$/;
    var card_pattern = /^[0-9]{16,16}$/;
    var pin_pattern = /^[0-9]{3,3}$/;


    if (fname == "" || lname == "" || email == "" || address == "" || cardNumber == "" || pinNumber == ""){
        alert("All fields are required");
        return false;
    }

    if(finalAmount == "--Enter your donation amount here--" || finalAmount == ""){
        alert("Please enter an donation amount");
        return false;
    }
    if(!fname.match(name_pattern)){
        alert("Please enter a valid first name");
        document.getElementById("fname").focus();
        return false;
    }
    if(!lname.match(name_pattern)){
        alert("Please enter a valid last name");
        document.getElementById("lname").focus();
        return false;
    }
    
    if(!email.match(email_pattern)){
        alert("Please enter a valid email");
        document.getElementById("email").focus();
        return false;
    }
    if(!address.match(addr_pattern)){
        alert("Please enter a valid address");
        document.getElementById("addr").focus();
        return false;
    }
    if(!cardNumber.match(card_pattern)){
        if(cardNumber.length<16){
            alert("Credit card number must have 16 digits");
        }
        else{
            alert("Please enter a valid credit card number");
        }
        document.getElementById("CDnum").focus();
        return false;
    }
    if(!pinNumber.match(pin_pattern)){
        if(pinNumber.length<3){
            alert("Pin number must have 3 digits");
        }
        else{
            alert("Please enter a valid pin number");
        }
        document.getElementById("pin").focus();
        return false;
    }
    if(!finalAmount.match(finalAmount_pattern)){
        alert("Amount should not contain letters and special characters etc.");
        document.getElementById("pin").focus();
        return false;
    }
    document.getElementById("dDetails").innerHTML = `Donation Amount : LKR ${finalAmount}`


    document.getElementById("dDetails").style = "display: block";
    document.getElementById("confirmDonate").style = "display: block";
    

}

function confirmDonation(){
    document.getElementById("formD").reset();
    document.getElementById("dDetails").innerHTML = "";
    document.getElementById("dDetails").style = "display: none;";
    document.getElementById("confirmDonate").style = "display: none;";
    var confirm = document.getElementById("confirmDonate").value;
    
    if(confirm == "Confirm Donation"){
        alert("Successfully Donated " + finalAmount);
    }
}
