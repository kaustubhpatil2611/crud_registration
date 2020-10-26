document.querySelector("#home").addEventListener('click',changehead);
document.querySelector("#register").addEventListener('click',changereg);
document.querySelector("#show").addEventListener('click',changeshow);
document.querySelector("#home1").addEventListener('click',changehead);
document.querySelector("#register1").addEventListener('click',changereg);
document.querySelector("#show1").addEventListener('click',changeshow);
document.querySelector("#show").addEventListener('click',display);
document.querySelector("#show1").addEventListener('click',display);

function changehead()
{
	document.getElementById("page").innerHTML="Home";
	document.getElementById("two").style.display="none";
	document.getElementById("three").style.display="none";
	document.getElementById("one").style.display="";
	document.getElementById("four").style.display="none";
	document.getElementById("vsubmit").innerHTML="";
}

function changereg()
{
	document.getElementById("page").innerHTML="Register";
	document.getElementById("one").style.display="none";
	document.getElementById("three").style.display="none";
	document.getElementById("two").style.display="";
	document.getElementById("four").style.display="none";
	document.getElementById("vsubmit").innerHTML="";
}

function changeshow()
{
	document.getElementById("page").innerHTML="Show Registrations";
	document.getElementById("one").style.display="none";
	document.getElementById("two").style.display="none";
	document.getElementById("three").style.display="";
	document.getElementById("four").style.display="none";
	document.getElementById("vsubmit").innerHTML="";
}

function changeedit(id)
{
	document.getElementById("page").innerHTML="Update Registration";
	document.getElementById("one").style.display="none";
	document.getElementById("two").style.display="none";
	document.getElementById("three").style.display="none";
	document.getElementById("four").style.display="";
	document.getElementById("vsubmit").innerHTML="";
    document.myform2.uid.value=id;

}

function checkemail(str)
{
	var at=str.indexOf("@");
	var dot=str.indexOf(".");
	if(at!=-1 && dot!=-1){
		if(at>=1 && dot>=3 && (str.length-1-dot)>=2 && (str.length-1-dot)<=5){
			return true;
		}
		else{
			return false;
		}
	}
	else{
		return false;
	}
}

let base_url="index.php";
function addData(){
	var name=document.myform.firstname.value;
		var fname=name+" "+document.myform.lastname.value;
		var mail=document.myform.emailid.value;
		var college=document.myform.college.value;
		var dept=document.myform.dept.value;
		var quest=document.myform.questions.value;
		var app=document.myform.approve.value;
		var d = new Date();
		var ts = d.toUTCString();
		var url=base_url+"?req=insert&name="+fname+"&mail="+mail+"&college="+college+"&dept="+dept+"&quest="+quest+"&app="+app+"&ts="+ts;
		$.get(url,function(obj,success){
            console.log(obj);
		    var data=JSON.parse(obj);
			document.getElementById("none1").style.display="none";
			alert(data[0]);
			document.getElementById("vsubmit").innerHTML=data[0];
		})	;
}

function edit()
{
	var getid=document.myform2.uid.value;
	var name=document.myform2.firstname.value;
		var fname=name+" "+document.myform2.lastname.value;
		var mail=document.myform2.emailid.value;
		var college=document.myform2.college.value;
		var dept=document.myform2.dept.value;
		var quest=document.myform2.questions.value;
		var app=document.myform2.approve.value;
		var d = new Date();
		var ts = d.toUTCString();
		let url=base_url+"?req=edit&id="+getid+"&name="+fname+"&mail="+mail+"&college="+college+"&dept="+dept+"&quest="+quest+"&app="+app+"&ts="+ts;
		$.get(url,function(obj,success){
            console.log(obj);
		    var data=JSON.parse(obj);
			document.getElementById("none1").style.display="none";
			alert(data[0]);
			document.getElementById("vsubmit2").innerHTML=data[0];
		})	;
    
}

function delentry(getid)
{
    let url=base_url+"?req=delete&id="+getid;
    $.get(url,function(obj,success){
        console.log(obj);
        display();
        alert("Record deleted successfully!");
    })	;
    
}

function display()
{
		let url=base_url+"?req=display";	
		var table=document.getElementById("myTable");
		table.innerHTML="";
		table.innerHTML += "<thead><tr><th>Name</th><th>E-Mail</th><th>College</th><th>Branch</th><th>Query</th><th colspan='2'>Actions</th><th></th></tr></thead>";
		document.getElementById("none1").innerHTML="";
        let data1=null;

		$.get(url,function(jsonObj,success){
                console.log(jsonObj);
                var obj=JSON.parse(jsonObj);		    
			    data1=obj.records;
			    
				for(var key in data1){
                    var row = table.insertRow(table.rows.length);
                    var x=data1[key].id;
				    var cell1 = row.insertCell(0);
				    var cell2 = row.insertCell(1);
				    var cell3 = row.insertCell(2);
				    var cell4 = row.insertCell(3);
				    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    var cell7 = row.insertCell(6);
                    
					cell1.innerHTML=data1[key].name;	
					cell2.innerHTML=data1[key].mail;	
					cell3.innerHTML=data1[key].college;	
                    cell4.innerHTML=data1[key].dept;	
                    cell5.innerHTML=data1[key].question;
                    cell6.innerHTML="<button class='btn btn-info' onclick='return changeedit("+x+");'> Edit </button>";
                    cell7.innerHTML="<button class='btn btn-danger' onclick='return delentry("+x+");'> Delete </button>";	
				}
				
			

		});
}


function validate()
{
	var name=document.myform.firstname.value;
	var mail=document.myform.emailid.value;
	
	if(name==""|| name==null)
	{
		document.getElementById("vname").innerHTML="Name is compulsory";
		return false;
	}
	else if(name.length<2 && name.length<20)
	{
		document.getElementById("vname").innerHTML="Name should be atleast 2 characters long and max 20 characters long";
		return false;
	}
	else if(isNaN(name)==false)
	{
		document.getElementById("vname").innerHTML="Enter valid name";
		return false;
	}
	else if(mail==""|| mail==null)
	{
		document.getElementById("vemail").innerHTML="Email is compulsory";
		return false;
	}
	else if(checkemail(mail)==false)
	{
		document.getElementById("vemail").innerHTML="Enter valid Email";
		return false;
	}
	else{
		addData();
		return false;
	}
	
}

function validateedit()
{
	var name=document.myform2.firstname.value;
	var mail=document.myform2.emailid.value;
	
	if(name==""|| name==null)
	{
		document.getElementById("vname2").innerHTML="Name is compulsory";
		return false;
	}
	else if(name.length<2 && name.length<20)
	{
		document.getElementById("vname2").innerHTML="Name should be atleast 2 characters long and max 20 characters long";
		return false;
	}
	else if(isNaN(name)==false)
	{
		document.getElementById("vname2").innerHTML="Enter valid name";
		return false;
	}
	else if(mail==""|| mail==null)
	{
		document.getElementById("vemail2").innerHTML="Email is compulsory";
		return false;
	}
	else if(checkemail(mail)==false)
	{
		document.getElementById("vemail2").innerHTML="Enter valid Email";
		return false;
	}
	else{
        edit();
		return false;
	}
	
}