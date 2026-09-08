import crypto from 'crypto';


// token generate for email verification
const generateToken = () =>{
    return crypto.randomBytes(32).toString('hex');

}
export default generateToken;