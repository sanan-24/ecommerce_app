const { config } = require('dotenv');
const app = require('./src/app');
config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});