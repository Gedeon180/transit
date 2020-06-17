let titles="";
let displaytitles=document.getElementById("displaytitles");
let displaytitles2=document.getElementById("displaytitles2");
let found2 = false;
let found3 = false;

//

function uptitles()
  {let Notes;let Notess;let Notesn;let Notesd;$.get("/getAllNotes", function(data, status){  // AJAX get
   Notes =data;});
   $.get("/getdNotes", function(data, status){  // AJAX get
   Notesd = data;});
		 $.get("/getsNotes", function(data, status){  // AJAX get
         Notess = data;});
	$.get("/getnNotes", function(data, status){  // AJAX get
	Notesn = data;});function display(){titles="";for (let i=0;i<Notes.length;i++){ titles+=Notes[i].title+" , ";};}display();
  document.getElementById("displaytitles").innerHTML="<b>These are Your Titles: "+titles+"<b>";
  document.getElementById("displaytitles2").innerHTML="<b>These are Your Titles: "+titles+"<b>";}
  
//

function filterit()
   {$.get("/getAllNotes", function(data, status){  // AJAX get
   let Notes =data;});
    $.get("/getdNotes", function(data, status){  // AJAX get
  let Notesd = data;});
		 $.get("/getsNotes", function(data, status){  // AJAX get
         let Notess = data;});
	$.get("/getnNotes", function(data, status){  // AJAX get
	let Notesn = data;});
	document.getElementById("listUl2").innerHTML=Notess;
	document.getElementById("listUl3").innerHTML=Notesd;
	document.getElementById("listUl").innerHTML=Notesn;};
		
//
  
 
//

document.addEventListener("DOMContentLoaded", function (event) {
	
	filterit();  uptitles();
	
	//

    $(document).on('pagebeforeshow', '#Home', function () {
        let listUl = document.getElementById("listUl");
        //UpdateDisplay(listUl); 
		});
		
	//

    
    $(document).on('pagebeforeshow', '#Delete', function () {
        let deleteListUl = document.getElementById("deleteListUl");
        //UpdateDisplay(deleteListUl);   
        document.getElementById("deleteItem").value = "";filterit();uptitles();} );
		
	//


    document.getElementById("newNote").addEventListener("click", function () {
		let newNote = new Note( document.getElementById("title").value, 
           document.getElementById("day").value,
           document.getElementById("time").value ,document.getElementById("statut").value) ;
        
        $.ajax({
            url : "/AddNote",
            type: "POST",
            data: JSON.stringify(newNote),
            contentType: "application/json; charset=utf-8",
            dataType   : "json",
            success: function (result) {
                console.log(result);
                //document.location.href = "index.html#Show";  // go to this page to show item was added
            }
        });
		
		filterit();uptitles();
		
		document.getElementById("title").value=""; 
        document.getElementById("day").value="";
        document.getElementById("time").value="" ;
		document.getElementById("statut").value="";
 });
 
     
     
	 document.getElementById("delete").addEventListener("click", function () {
       let which = document.getElementById("deleteItem").value;
       let found = false;
        $.ajax({
            type: "DELETE",
                url: "/DeleteNote/" +which,
                success: function(result){
                    console.log(result);
                    //document.location.href = "index.html#Show";  // go to this page to show item was deleted
                },
                error: function (xhr, textStatus, errorThrown) {  
                    console.log('Error in Operation');  
                    //alert("Server could not delete Note with title " + which)
                }  
            }); found = true;filterit();uptitles();}}
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
 this.statut=pStatut; };
 Note.prototype.toString = function () 
{return this.title+" due on "+ this.day+ " at "+ this.time+"<br>";};



function changing()
  {let whicha = document.getElementById("edititem").value;let stata=document.getElementById("statum").value;
  let found2 = false;let newNote2;
  
      for(var i = 0; i < Notes.length; i++) 
        {if(Notes[i].title === whicha){Notes[i].statut=stata;
			newNote2=new Note(Note[i].title,Note[i].day,Note[i].time,Note[i].statut); 
			$.ajax({
            url : "/AddNote",
            type: "POST",
            data: JSON.stringify(newNote2),
            contentType: "application/json; charset=utf-8",
            dataType   : "json",
            success: function (result) {
                console.log(result);
                //document.location.href = "index.html#Show";  // go to this page to show item was added
            }
        });
		$.ajax({
            type: "DELETE",
                url: "/DeleteNote/" +whicha,
                success: function(result){
                    console.log(result);
                    //document.location.href = "index.html#Show";  // go to this page to show item was deleted
                },
                error: function (xhr, textStatus, errorThrown) {  
                    console.log('Error in Operation');  
                    //alert("Server could not delete Note with title " + which)
                }  
            }); 
		
			
			found2 = true;filterit();uptitles();}};
		
   if(!found2){document.getElementById("statum").value = "Sorry, could not find";};
document.getElementById("edititem").value="";
document.getElementById("statum").value="";};
	 
	 
//
	
	
function changing2()
 {
	let whicha2 = document.getElementById("edititem2").value;
	let found3 = false;
	
	    for(var i = 0; i < Notes.length; i++) 
           {if(Notes[i].title === whicha2)
			{document.getElementById("section1").style.display = "none";
 	        document.getElementById("section2").style.display = "block";
			document.getElementById("day2").value=Notes[i].day;
            document.getElementById("title2").value=Notes[i].title; 				
            document.getElementById("time2").value=Notes[i].time;
			document.getElementById("statut2").value=Notes[i].statut;
			found3 = true;};};
			
        if(!found3){
            document.getElementById("edititem2").value = "Sorry, could not find";};
 };
	
	

//

	
	
function changing3()
  {
	let whicha2 = document.getElementById("edititem2").value;let newNote3;
	
 for(var i = 0; i < Notes.length; i++) 
	{if(Notes[i].title === whicha2)
	{Notes[i].day=document.getElementById("day2").value;
     Notes[i].title=document.getElementById("title2").value; 				
      Notes[i].time=document.getElementById("time2").value;
	Notes[i].statut=document.getElementById("statut2").value;
	newNote3=new Note(Note[i].title,Note[i].day,Note[i].time,Note[i].statut);
	$.ajax({
            url : "/AddNote",
            type: "POST",
            data: JSON.stringify(newNote3),
            contentType: "application/json; charset=utf-8",
            dataType   : "json",
            success: function (result) {
                console.log(result);
                //document.location.href = "index.html#Show";  // go to this page to show item was added
            }
        });$.ajax({
            type: "DELETE",
                url: "/DeleteNote/" +whicha2,
                success: function(result){
                    console.log(result);
                    //document.location.href = "index.html#Show";  // go to this page to show item was deleted
                },
                error: function (xhr, textStatus, errorThrown) {  
                    console.log('Error in Operation');  
                    //alert("Server could not delete Note with title " + which)
                }  
            }); 
	}};
	
 document.getElementById("section1").style.display = "block";
 document.getElementById("section2").style.display = "none";filterit();uptitles();
document.getElementById("edititem2").value = "";
  };
  
  


//


