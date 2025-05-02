import jwtHelper from "../helper/jwt.js";

async function signin(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        if (username === "rahul" && password === "rahul") {
            const token = jwtHelper.generateJwtToken({ username });
            return res.status(200).json({ token });
        }

        return res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export default { signin }
