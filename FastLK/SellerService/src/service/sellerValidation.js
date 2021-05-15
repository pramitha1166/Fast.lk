const Seller = require("../model/seller");

const validateSeller = async (seller) => {
    const { username, password, email, address, mobileNo } = seller;
    const { houseNumber, streetName, city } = address;

    //validating if all fields are filled
    if(!username || !password || !email || !houseNumber 
        || !streetName || !city || !mobileNo) {
            return 0;
        }
    //checking for existing user
    const user = await Seller.findOne({ email });
    if (user) {
        return 1;
    } else {
        return seller;
    }
}

module.exports.validateSeller = validateSeller;