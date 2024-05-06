const User = require('../models/user');
exports.getUserInfo = async (req, res) => {
    try {
  
        const token = req.headers.authorization.split(' ')[1]; 

        const userId = getUserIdFromToken(token);

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
