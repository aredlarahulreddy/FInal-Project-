import jwt from 'jsonwebtoken';

function generateJwtToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '10h' });
};

function verifyJwtToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
};

function verifyAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}

export default { generateJwtToken, verifyJwtToken, verifyAuth }