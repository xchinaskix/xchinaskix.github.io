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

    function jSonStructure(firstName, secondName, phone, email) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.phone = phone;
        this.email = email;
    }

    showAdressBook();
	
    //EVENTLISTENER
    quickAdd.addEventListener('click', function () {
        console.log('button is clicked');
        quickAddFormDiv.style.display = 'flex';
    });
    cancelButton.addEventListener('click', function () {
        quickAddFormDiv.style.display = 'none';
		clearForm();
    });
    addBookDiv.addEventListener('click', removeEntry);
	
	addBookDiv.addEventListener('click', editEntry);

    addButton.addEventListener('click', addtoBook);

    function addtoBook() {
		valName();
		valPhone();
		valSName();
		valEmail();
		if (valName() && valPhone() && valSName() && valEmail() ) {
            //add the content from the form to arr and local storage
            var obj = new jSonStructure(firstName.value.toUpperCase(), secondName.value.toUpperCase(), phone.value, email.value);
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
	//очистка формы 
    function clearForm() {
        var frm = document.querySelectorAll('.formFields');
        for (i in frm) {
            frm[i].value = '';
        }
    }
	//удаление контакта
    function removeEntry(event) {
        if (event.target.classList.contains("delbutton")) {
            var remID = event.target.getAttribute("data-id");
            //remove the JSON entry from the array with the index num = remId
            addressBook.splice(remID, 1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAdressBook();
            console.log('function must worked');
        }
    }
	//редактирование контакта
	function editEntry(event) {
        if (event.target.classList.contains("editbutton")) {
            var remID = event.target.getAttribute("data-id");
			quickAddFormDiv.style.display = 'flex';
			console.log('hulk');
			firstName.value = addressBook[remID].firstName
			secondName.value = addressBook[remID].secondName
			phone.value = addressBook[remID].phone
			email.value = addressBook[remID].email
			addressBook.splice(remID, 1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAdressBook();
		}
    }

	//отображение списка контактов
    function showAdressBook() {
        if (localStorage['addbook'] === undefined) {
            localStorage['addbook'] = "[]";
        } else {
            addressBook = JSON.parse(localStorage['addbook']);
            addBookDiv.innerHTML = '';
            for (var n in addressBook) {
                var str = '<div class="entry">';
                str += '<div class="firstName"><p>' + addressBook[n].firstName + '</p></div>';
                str += '<div class="secondName"><p>' + addressBook[n].secondName + '</p></div>';
                str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
                str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
				str += '<div class="edit"><a href="#" class="editbutton" data-id ="' + n + '">Edit</a></div>';
                str += '<div class="delete"><a href="#" class="delbutton" data-id ="' + n + '">Delete</a></div>';
                str += '</div>';
                addBookDiv.innerHTML += str;}
        }
    }
	//валидация firstName
	function valName(){
		var errName1 = document.querySelector(".nameError1")
		if (firstName.value !=0){
			errName1.style.display = "none";
			firstName.style.border = "1px solid black";
			return true
		}
		else{
			console.log("hui")
			errName1.style.display = "inline-block";
			firstName.style.border = "2px solid red";
			return false
		}
	}
	
	//валидация secondName
	function valSName(){
		var errName1 = document.querySelector(".nameError2")
		if (secondName.value !=0){
			errName1.style.display = "none";
			secondName.style.border = "1px solid black";
			return true
		}
		else{
			console.log("hui")
			errName1.style.display = "inline-block";
			secondName.style.border = "2px solid red";
			return false
		}
	}
	
	//валидация phone
	function valPhone(){
		var errPhone = document.querySelector(".phoneError")
		var errPhone1 = document.querySelector(".phoneError1")
		if (phone.value.length == 12){
			errPhone.style.display = "none";
			errPhone1.style.display = "none";
			phone.style.border = "1px solid black";
			return true
		}
		else if(phone.value.length != 12 && phone.value.length !=0 ){
			console.log(phone.value.length)
			errPhone1.style.display = "inline-block";
			phone.style.border = "2px solid red";
			errPhone.style.display = "none";
			return false
		}else if (phone.value.length == 0){
			errPhone.style.display = "inline-block";
			phone.style.border = "2px solid red";
			errPhone1.style.display = "none";
			return false
	}
	}
	
	//валидация email
	function valEmail(){
		var emEr1 = document.querySelector(".emailError");
		var emEr2 = document.querySelector(".emailError1");
		var emResult = email.value.match('^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$');
		console.log(emResult);
		if(emResult == null){
			if (email.value.length == 0){
				console.log(1);
				email.style.border = "2px solid red";
				emEr1.style.display = "inline-block";
				emEr2.style.display = "none";
			}else{
				console.log(2);
				email.style.border = "2px solid red";
				emEr2.style.display = "inline-block";
				emEr1.style.display = "none";
			}
		}else{	
				console.log(3);
				email.style.border = "1px solid black";
				emEr2.style.display = "none";
				emEr1.style.display = "none";
				return true
		}
	}
	
		//поиск по имени контакта
			$(document).ready(function() {
				$('#search').on('keyup', function() {
				var oko = $(this).val().toUpperCase();
				$('.entry').find('.firstName').parent().show()
				$('.entry').find('.firstName').parent().not(':contains('+oko+')').hide()
		  });
		});
};