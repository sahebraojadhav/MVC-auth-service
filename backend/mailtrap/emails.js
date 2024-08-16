import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_TEMPLATE } from "./emailTemplates.js";
import { mailTrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail=async(email,verificationToken)=>{
    const recipient=[{email}];

    try{
        const response=await mailTrapClient.send({
            from:sender,
            to:recipient,
            subject:"verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Eamil verification"
        })
        console.log("Email sent successfully from emails.js",response);

    }catch(error){
        console.error(`Error sending verifiacation ${error}`);
        throw new Error( `Error sending verification email:${error}`);
    }
}

export const sendWelcomeEmail=async(email,name)=>{
   const recipient=[{email}];

   try{
     const response=await mailTrapClient.send({
        from:sender,
        to:recipient,
        template_uuid:"af383b8f-2722-4e20-87b1-d4b286cbee57",
        template_variables:{
            "company_info_name":"from sahebrao's company",
            "name":name,
        }
    });
    console.log("Welcoe email sent successfully",response);
   }catch(error){
    console.error(`Error sending Welcome email`,error);
    throw new Error(`Error sending welcome eamil:${error}`);
   }
}

export const sendPasswordResetEmail=async(email,resetURL)=>{
    const recipient=[{email}];

    try{
        const response=await mailTrapClient.send({
            from:sender,
            to:recipient,
            subject:"Reset Your Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category:"Password Reset",
        })
    }catch(error){
        console.error(`Error sending password reset email`,error);
        throw new Error(`Error sending password reset eail:${error}`);
    }
}

export const sendResetSuccessEmail=async(email)=>{
    const recipient=[{email}];
    try{
        const response=await mailTrapClient.send({
            from:sender,
            to:recipient,
            subject:"password Reset Successfully",
            html:PASSWORD_RESET_TEMPLATE,
            category:"Password Reset"
        })
        console.error("password reset email sent successfully",response);
    }catch(error){
        console.error(`Error send reset success password reset email`,error);
        throw new Error(`Error send reset success  reset eail:${error}`);
    
    }
}