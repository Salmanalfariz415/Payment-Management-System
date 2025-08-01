let response=document.getElementById('response');
let submit=document.getElementById('submitButton');
let emailInput=document.getElementById('emailInput');
let userEmail;
let otpinp=document.getElementById('otpInput');
let otpsubmit=document.getElementById('otpsubmit');
let passInp=document.getElementById('passInput');
let pass;

async function sendUser(userEmail,pass){
    try{
        const result=await fetch('/register/send/email',{
            method:'POST',
            body : JSON.stringify({
                email:userEmail,
                pass : pass
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data=await result.json();
        return{success:result.ok,data:data}
    }
    catch(err){
        return{success:false,error:err.message}
    }
}
async function sendEmail(userEmail){
        try{
            const result = await fetch('/api/send/email',{
            method: 'POST',
            body: JSON.stringify({
                email : userEmail,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data=await result.json();
        return{success : result.ok, data : data}
        }
        catch(err){
            return{success:false,error:err.message}
        }
}

async function sendOtp(otp,userEmail){
    try{
        const result = await fetch('/api/send/otp',{ // this will call it automatically
        method : 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            otp : otp,
            email : userEmail
        })
    })
        const data = await result.json();
        return { success: result.ok, data: data };
    }
    catch(err){
        return { success: false, error: err.message };
    }
}
//for both these submits..try and catch is not needed...as it is included in the post requests
submit.addEventListener('click', async function() {
    userEmail = emailInput.value.trim();
    pass = passInp.value.trim();
    otpinp.style.opacity = 1;
    otpsubmit.style.opacity = 1;
    if(userEmail == ""){
        response.innerHTML = "Kindly input the email";
    }
    else{ 
        const result1=await sendUser(userEmail,pass);
        const result = await sendEmail(userEmail); 

        if (!result1.success) {
    console.log("Registration Success");
    return;}
        
        if(result.success) {
            response.innerHTML = "Email sent successfully!";
            
        } else {
            response.innerHTML = "Failed to send email: " + result.error;
        }
    }
});


otpsubmit.addEventListener("click", async function () {
    let otp = otpinp.value.trim();
    const result = await sendOtp(otp, userEmail); 

    if(result.success) {
        response.innerHTML = "OTP verified successfully!"; 
    } else {
        response.innerHTML = "OTP error: " + (result.data?.message || result.error);
    }
    setTimeout(() => {
    window.location.href = "../main/";
    }, 1000);

});

if (performance.navigation.type === 1) {
    window.location.href = "/";
}