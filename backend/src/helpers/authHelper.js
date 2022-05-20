import jwt from 'jsonwebtoken';

export class AuthService {
    constructor() {
    this.signature = process.env.SIGNATURE;
    this.esignature = process.env.ESIGNATURE;

    }


    generateToken(user) {

        const data =  {
            _id: user._id,
            username: user.username,
        };
        const expiration = '6h';

        return jwt.sign(data, this.signature, { expiresIn: expiration });
    }

    checkToken(token) {
        const check = jwt.verify(token, this.signature);
        return check;
    }


    vToken(user) {

        const data =  {
            username: user.username,
        };
        const expiration = '200h';

        return jwt.sign(data, this.esignature, { expiresIn: expiration });
    }
}

