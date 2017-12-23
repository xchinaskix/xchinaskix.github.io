window.onload = function () {
    //BUTTONS
    var quickAdd = document.getElementById('QuickAdd');
    var addButton = document.getElementById('Add');
    var cancelButton = document.getElementById('Cancel');
    var quickAddFormDiv = document.querySelector('.QuickAddForm');

    //FORM FIELDS
    var firstName = document.getElementById('firstName');
    var secondName = document.getElementById('secondName');
    var phone = document.getElementById('phone');
    var email = document.getElementById('e-mail');

    //ADRESS BOOK DISPLAY
    var addBookDiv = document.querySelector('.addBook');

    //CREATE STORAGE
    var addressBook = [];

    function jSonStructure(firstName, secondName, phone, email){
        this.firstName = firstName;
        this.secondName = secondName;
        this.phone = phone;
        this.email = email;
    };

    //EVENTLISTENER
    quickAdd.addEventListener('click', function(){
        console.log('button is clicked');
        quickAddFormDiv.style.display = 'inline-block';
    });
    cancelButton.addEventListener('click', function(){
        quickAddFormDiv.style.display = 'none';
    });
    addBookDiv.addEventListener('click', removeEntry);
    
    addButton.addEventListener('click', addtoBook);

    function addtoBook(){
        var isNull = firstName.value!='' && secondName.value!='' && phone.value!='' && email.value!='';
        console.log(isNull);
        if(isNull){
            //add the content from the form to arr and local storage
            var obj = new jSonStructure(firstName.value, secondName.value, phone.value, email.value);
            addressBook.push(obj);
            localStorage['addbook'] = JSON.stringify(addressBook);
            //hide the form
            quickAddFormDiv.style.display = 'none';
            //clear the form
            clearForm();
            //update form
            showAdressBook();
        }
    }

    function clearForm() {
        var frm = document.querySelectorAll('.formFields');
        for (i in frm) {
            frm[i].value = '';
        }
    }

    function removeEntry(event){
        if(event.target.classList.contains("delbutton")){
            var remID = event.target.getAttribute("data-id");
            //remove the JSON entry from the array with the index num = remId
            addressBook.splice(remID, 1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAdressBook();
            console.log('function must worked');
        }
    }
    function showAdressBook(){
        //check if the key addbook exist in local storage of else create it
        //if it exist, load content from the local storage and loop - display it on the page
        if (localStorage['addbook'] === undefined){
            localStorage['addbook'] = "[]";
        }else{
            addressBook = JSON.parse(localStorage['addbook']);
            addBookDiv.innerHTML = '';
            for (var n in addressBook){
                var str = '<div class="entry">';
                    str +='<div class="firstName"><p>' +addressBook[n].firstName +'</p></div>';
                    str +='<div class="secondName"><p>' +addressBook[n].secondName +'</p></div>';
                    str +='<div class="phone"><p>' +addressBook[n].phone +'</p></div>';
                    str +='<div class="email"><p>' +addressBook[n].email +'</p></div>';
                    str +='<div class="delete"><a href="#" class="delbutton" data-id ="' + n +'">Delete</a></div>';
                    str+='</div>';
                    addBookDiv.innerHTML += str;
            }
        }
    }
    showAdressBook();
    var searchInput = document.getElementById('search');
    searchInput.addEventListener('keydown', function (ele) {
        console.log(this.value);
        var lowC = inpSr.value.toLowerCase();
            for (i in addressBook){
                if addressBook[i].firstName.(lowC){
                    addressBook[i].style.display = "none";
                else{
                    addressBook[i].style.display = "block";
                    }
                }
            }
    )};

};