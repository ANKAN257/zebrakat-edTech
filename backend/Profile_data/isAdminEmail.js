// Function to check if email domain is admin
function isAdminEmail(email) {

    const specificDomain = process.env.ForAdminEmail; // Replace with your specific domain
    const domain = email.split('kumar')[1];
    return domain === specificDomain;
}

module.exports=isAdminEmail