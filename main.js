Notes =[];
Notess=[];
Notesd=[];
Notesn=[];

//

let titles="";
let displaytitles=document.getElementById("displaytitles");
let displaytitles2=document.getElementById("displaytitles2");
//let whicha = document.getElementById("edititem").value;
//let whicha2 = document.getElementById("edititem2").value;
//let stata=document.getElementById("statum").value;
let found2 = false;
let found3 = false;

//

function uptitles()
  {function display(){titles="";for (let i=0;i<Notes.length;i++){ titles+=Notes[i].title+" , ";};}display();
  document.getElementById("displaytitles").innerHTML="<b>These are Your Titles: "+titles+"<b>";
  document.getElementById("displaytitles2").innerHTML="<b>These are Your Titles: "+titles+"<b>";}
  
//

function filterit()
   {let Notesd = Notes.filter(item => item.statut == "d");
	let Notess = Notes.filter(item => item.statut == "s");
	let Notesn = Notes.filter(item => item.statut == "n");
	document.getElementById("listUl2").innerHTML=Notess;
	document.getElementById("listUl3").innerHTML=Notesd;
	document.getElementById("listUl").innerHTML=Notesn;};
		
//
  
 Notes.push(new Note("Eng101", "Moonday 5/18","11:59 pm", "d"));
 Notes.push(new Note("Prog209", "Monday 5/18", "11:59 pm","n"));
 Notes.push(new Note("Play vid game", "Saturday 7/23", "10:30 am","s"));

//

document.addEventListener("DOMContentLoaded", function (event) {
	
	UpdateDisplay(listUl);  uptitles();filterit();
	
	//

    $(document).on('pagebeforeshow', '#Home', function () {
        let listUl = document.getElementById("listUl");
        UpdateDisplay(listUl); });
		
	//

    
    $(document).on('pagebeforeshow', '#Delete', function () {
        let deleteListUl = document.getElementById("deleteListUl");
        UpdateDisplay(deleteListUl);   
        document.getElementById("deleteItem").value = "";filterit();uptitles();} );
		
	//


    document.getElementById("newNote").addEventListener("click", function () {
        
        Notes.push( new Note( document.getElementById("title").value, document.getElementById("day").value,
        document.getElementById("time").value ,document.getElementById("statut").value));
		
		filterit();uptitles();
		
		document.getElementById("title").value=""; 
        document.getElementById("day").value="";
        document.getElementById("time").value="" ;
		document.getElementById("statut").value="";
 });
 
     //

     
     
	 document.getElementById("delete").addEventListener("click", function () {
       let which = document.getElementById("deleteItem").value;
       let found = false;
       for(var i = 0; i < Notes.length; i++)
        {if(Notes[i].title === which){ Notes.splice(i,1);  found = true;filterit();uptitles();}}
       if(!found){document.getElementById("deleteItem").value = "Sorry, could not find";};
       document.getElementById("deleteItem").value="";})
 ;});  
 
 
 //
 
 $(document).on('pagebeforeshow', '#AddDelete', function () {
        document.getElementById("title").value = ""; 
        document.getElementById("day").value = ""; 
        document.getElementById("time").value  = ""; 
		document.getElementById("statut").value  = ""; 
		document.getElementById("deleteItem").value  = ""; filterit();uptitles();
	 });
	 
// 
	
	
	$(document).on('pagebeforeshow', '#Edit', function () {
        document.getElementById("edititem").value = ""; 
        document.getElementById("statum").value = ""; 
        document.getElementById("edititem2").value  = ""; 
		
    });
	
//


function Note(pTitle, pDay, pTime,pStatut) 
{this.title= pTitle; this.day = pDay; this.time = pTime; 
 this.statut=pStatut; this.wording= function(){return this.title+" due on "+this.day+" at "+this.time}}
  
//

 function UpdateDisplay(whichElement) 
 { whichElement.innerHTML = ""; 
 Notes.sort(function(a, b) {return (a.priority) - (b.priority);});
  Notes.forEach(function(item, index) {var li = document.createElement('li');whichElement.appendChild(li);
 li.innerHTML=li.innerHTML + ": " + " You have " + item.title + " due on " + item.day + " at " + item.time;}); 
	
Note.prototype.toString = function () 
{return this.title+" due on "+ this.day+ " at "+ this.time+"<br>";};};


//


