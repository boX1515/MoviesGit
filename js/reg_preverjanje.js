$(function()
{
    $('#reg_form').validate(
    {
        rules:
        {
            UporIme:{required:true,minlength:5},
            email_naslov:{required:true,email:true},
            password:{required:true,minlength:5}
        },
        messages:
        {
            UporIme:
            {
                required: "Vnesite uporabniško ime!"
            },
            email_naslov:
            {
                required: "Vnesite email naslov!"
            },
            password:
            {
                required: "Vnesite geslo!"
            }
        }
    });
});

function checkUsername(data)
{
    console.log(data);
    if(data.length > 5)
    {
        document.getElementsByTagName("a")[1].removeAttribute("class","notValid");
        document.getElementsByTagName("a")[1].setAttribute("class", "isValid");
        
    }
    else
    {
        document.getElementsByTagName("a")[1].removeAttribute("class","isValid");
        document.getElementsByTagName("a")[1].setAttribute("class", "notValid");
    }
   
    
}

var firstPW;
var requestEmail;
var requestEmail_data;
function isPwValid(data)
{
    //console.log(data);
    firstPW = data;
    if(data.length == 0)
    {
        document.getElementById("pw_vnos").blur();
    }
    if(data.length > 5)
    {
        document.getElementsByTagName("a")[2].removeAttribute("class","notValid");
        document.getElementsByTagName("a")[2].setAttribute("class", "isValid");
        
    }
    else
    {
        document.getElementsByTagName("a")[2].removeAttribute("class","isValid");
        document.getElementsByTagName("a")[2].setAttribute("class", "notValid");
        
    }
    
}

function checkPasswords(data)
{
    //console.log(html_elements);
    if(data.length == 0)
    {
        document.getElementById("pw2_vnos").blur();
    }
    if(data === firstPW && data.length > 5)
    {
        document.getElementsByTagName("a")[3].removeAttribute("class","notValid");
        document.getElementsByTagName("a")[3].setAttribute("class", "isValid");  
    }
    else if(data !== firstPW && data.length > 5)
    {
        alert("Gesli se ne ujemata!"); 
        document.getElementsByTagName("a")[3].removeAttribute("class","isValid");
        document.getElementsByTagName("a")[3].setAttribute("class", "notValid");
    }
    
}

//emailData = value.replace("@","%40");
    //requestEmail_data = "value="+replacedEmail;
    //requestEmail = "../ISS/php/reg_user.php?email_data="+replacedEmail;
    /*$.get("../ISS/php/reg_user.php?a=email&data="+value, function(data){                                          
       console.log(JSON.parse(data));
    });*/


