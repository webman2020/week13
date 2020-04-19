
// Curt Dunmire
// Spring 2020
// Web233 Javascript
// Date: 04/12/20
// Assignment #12



// ——————————————————————————————————————————————————————
// PUT DATE AFTER PAGE LOAD

window.onload =		WhenLoad;
function WhenLoad()	{
	tt = setTimeout("PutDate()", 1000);

	//	v4.0 save cookie
	//	v4.0 read cookie when page loads and displays

	PopulateShoppingListonload();
	DisplayShoppingLists();
}


// ——————————————————————————————————————————————————————

var MyItems = {
	Name:"", Price:""
};

var ShoppingList = [];


// —————————	v3.1 AddToCart empty array

var AddToCart = [];


// —————————	v4.0 save cookie

function SaveCookie() {
	DeleteCookie("DunmireShopList");
	var date = new Date();

	//	keeps for a year
	date.setTime(date.getTime() + Number(365) * 3600 * 1000);
	document.cookie = "DunmireShopList" + "=" + escape(ShoppingList.join(",")) + "; path=/;expires = " + date.toGMTString();
}


// —————————	v4.0 read cookie and return

function ReadCookie(Name) {
	var NameEQ = Name + "=";
	var ca = document.cookie.split(";");
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==" ") {
			c = c.substring(1, c.length);
			if (c.indexOf(NameEQ) == 0) { return c.substring(NameEQ.length, c.length); }
		}
	}
	return null;
}


// —————————	v4.0 delete cookie

function DeleteCookie(Name) {
	document.cookie = Name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}


// —————————	v4.0 PopulateShoppingListonload

function PopulateShoppingListonload() {
	ShoppingList = [];
	AddToCart = [];

	//	load cookie into array
	var y = ReadCookie("DunmireShopList");

	//	remove unwanted chars and format
	y = RemoveUnwanted(y); 

	//	spit array by comma %2C
	y = y.split('%2C');

	if (y) { ShoppingList = y; }
}


// —————————	v4.0 remove and format cookie

function RemoveUnwanted(str) {
	if ((str === null) || (str === "")) {
		return false;
	} else {
		str = str.toString();
		str = str.replace(/%20/g, "");
		str = str.replace(/%24/g, "$"); 
		str = str.replace(/%7C/g, " | ");
		return str.replace(/[^\x20-\x7E]/g, "");
	}
}


// —————————	v3.1

function ChangeShoppingList(Position) {
	var Arrays = ShoppingList[Position];
	Arrays = Arrays.split(",");
	var e1 = Arrays[0];
	var e2 = Arrays[1];
	var ReplacedAmount = e2.replace(/\$/g,'');
	var eItem = prompt("Please enter new item", e1);
	var eCost = prompt("Please enter new item cost", ReplacedAmount);

	ShoppingList[Position] = eItem + "," + "$" + eCost;
	DisplayShoppingLists();
	DisplayShoppingCart();

	//	v4.0 save cookie
	SaveCookie();
}


// —————————	v3.1

function ChangeShoppingCart(Position) {
	document.getElementById("MyCart").innerHTML = ShoppingList[Position];
	var Arrays = AddToCart[Position];
	Arrays = Arrays.split(",");
	var e1 = Arrays[0];
	var e2 = Arrays[1];
	var ReplacedAmount = e2.replace(/\$/g,"");
	var eItem = prompt("Please enter new item", e1);
	var eCost = prompt("Please enter new item cost", ReplacedAmount);
	AddToCart[Position] = eItem + "," + "$" + eCost;
	DisplayShoppingLists();
	DisplayShoppingCart();

	//	v4.0 save cookie
	SaveCookie();
}


// —————————	v3.1 

function AddBackToShoppingList(Item, Num) {
	//	push to deleteShoppingCar
	DeleteShoppingCart(Num);
	ShoppingList.push(Item);

	//	display ShoppingList
	DisplayShoppingLists();

	//	display DisplayShoppingCart() 
	DisplayShoppingCart(); 
	ClearFocus();
	
	//	v4.0 save cookie
	SaveCookie();
}


// —————————	v3.1 Update function AddToShopCart by adding objects

function AddToShopCart(Item, Num) {
	DeleteShoppingLists(Num);
	AddToCart.push(Item);

	//	display shoppinglist
	DisplayShoppingLists();

	//	display DisplayShoppingCart() 
	DisplayShoppingCart(); 

	//	Clear
	ClearFocus();

	//	v4.0 save cookie
	SaveCookie();
}


// —————————	v3.1 Update function AddShoppingList by adding objects

function AddShoppingList(Item, Cost) {
	//	Checks for empty values or just whitespaces (no alphanumeric characters)
	//	If no alphanumeric characters are entered, item is not added and alert is shown.

	var CheckWhiteSpace = new RegExp(/^\s+$/);

	if (Item.length == 0 || CheckWhiteSpace.test(Item)) {
		alert("You did not add a valid item.\nItem not added to list.\nPlease try again.\n\n");
		return false;
	} else {
		//	Replace functions remove extra unneeded whitespaces in added shopping list item
		Item = Item.replace(/^\s+|\s+$/g, "");
		Item = Item.replace(/\s{2,}/g, " ");
	}

	if (Cost.length == 0 || CheckWhiteSpace.test(Cost)) {
		alert("You did not add a valid cost.\nCost not added to list.\nPlease try again.\n\n");
		return false;
	} else {
		//	Replace functions remove extra unneeded whitespaces in added shopping list item
		Cost = Cost.replace(/^\s+|\s+$/g, "");
		Cost = Cost.replace(/\s{2,}/g, " ");
	}

	//v 3.0 declare variable for Groc string
	var Groc = "";

	//v 3.0 v 3.0 declare variable for loop count
	var count = 0;

	//v 3.0 edit value for MyItems.Name
	MyItems.Name = Item;

	//v 3.0 edit value for MyItems.Cost
	MyItems.price = Cost;

	//v 3.0 for loop through object propterties and 
	for (var x in MyItems) {
		if (count === 1) { Groc += "$"; }

		//add to Groc string from object array item
		Groc += MyItems[x];
		if (count === 0) { Groc += " | "; }

		//increment count by 1
		count++;
	}

	//	push to shoppinglist
	ShoppingList.push(Groc);

	//	display shoppinglist
	DisplayShoppingLists();

	//	v3.1 display DisplayShoppingCart() 
	DisplayShoppingCart(); 
	ClearFocus();

	//	v4.0 save cookie
	SaveCookie();
}


function ClearFocus() {
	document.getElementById("Item").value = "";
	document.getElementById("Cost").value = "";
	document.getElementById("Item").focus();
}


// —————————	v3.1: update function DisplayShoppingLists() to add to cart 

function DisplayShoppingLists() {
	var TheList = "";
	var TheRow = "";
	var ArrayLength = ShoppingList.length;

	for (var i = 0; i < ShoppingList.length; i++) {
		//	v3.1 change button name to BtnDelete
		var BtnDelete =	' <input class="button" id="remove" name="delete" type="button" value="Remove Item" onclick="DeleteShoppingLists(' + i + ')" />';
		var BtnUpdate =	' <input class="button" name="edit" type="button" value="Edit Item" onclick="ChangeShoppingList(' + i + ')" />';

		//	v3.1 add edit button using below i index & name it btnpdate
		var Arrays = ShoppingList[i];
		Arrays = "'" + Arrays + "'";

		var BtnAddcart = '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping Cart" onclick="AddToShopCart(' + Arrays + ',' + i + ')" />Add</label>';
		TheRow = "<li>" + ShoppingList[i] + BtnDelete + " " + BtnAddcart + "</li>";
		TheList += TheRow;
	}

	//	v3.1 add Title
	if (ArrayLength > 0) {
		MyList.style.paddingTop = "20px";
		document.getElementById("MyList").innerHTML = "Shopping List:<br><ul>" + TheList + "</ul>";
	} else {
		MyList.style.paddingTop = "0";
		document.getElementById("MyList").innerHTML = "";
	}
}


// —————————	v3.1

function DisplayShoppingCart() {
	var TheList = "";
	var TheRow = "";
	var ArrayLength = AddToCart.length;

	for (var i = 0; i < ArrayLength; i++) {
		//	v 3.1 change button name to BtnDelete
		var BtnDelete =	' <input class="button" id="remove" name="delete" type="button" value="Remove Item" onclick="DeleteShoppingCart(' + i + ')" />';

		//	v3.1 add edit button using below i index & name it btnpdate
		var BtnUpdate =	' <input class="button" name="edit" type="button" value="Edit Item" onclick="ChangeShoppingCart(' + i + ')" />';
		var Arrays = AddToCart[i];
		Arrays = "'" + Arrays + "'";

		//	v3.1 add edit button using below i index & name it btnpdate
		var btnaddlist = '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping List" onclick="AddBackToShoppingList(' + Arrays + ',' + i + ')" checked="checked"/>Add</label>';
		TheRow = "<li>" + AddToCart[i] + BtnDelete + " " + btnaddlist + "<br></li>";
		TheList += TheRow;
	}

	if (ArrayLength > 0) {
		MyCart.style.paddingTop = "20px";
		document.getElementById("MyCart").innerHTML = "Items in Shopping Cart:<br><ul>" + TheList + "</ul>";
	} else {
		MyCart.style.paddingTop = "0";
		document.getElementById("MyCart").innerHTML = "";
	}
}


// —————————	v3.1

function DeleteShoppingLists(Position) {
	ShoppingList.splice(Position, 1);
	DisplayShoppingLists();
	DisplayShoppingCart();

	//	v4.0 save cookie
	SaveCookie();
}


// —————————	v3.1

function DeleteShoppingCart(Position) {
	AddToCart.splice(Position, 1);
	DisplayShoppingLists();
	DisplayShoppingCart();

	//	v4.0 save cookie
	SaveCookie();
}




// ——————————————————————————————————————————————————————
// v2.1: DISPLAY CURRENT DATE (using document ID 'Date'):

function PutDate() {
	var d = new Date();
	var n = d.toLocaleDateString();
	document.getElementById("Date").innerHTML = "Current date: <span class=\"Hilite\">" + n + "</span>";
}



