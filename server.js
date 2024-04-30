const app = require('./config/app');
const connectDB = require('./config/db');

connectDB().then(() => {
    const PORT = process.env.PORT || 4200;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})