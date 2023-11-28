const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;
const users = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

app.get('/health', (req, res) => {
    const serverInfo = {
        serverName: 'The Week List Server',
        currentTime: new Date(),
        state: 'active',
    };
    res.json(serverInfo);
})

app.post('/signup', (req, res) => {
    const { fullname, email, password, age, gender, mobile } = req.body;
    const newUser = { fullname, email, password, age, gender, mobile };
    users.push(newUser);
    res.json({ message: 'User registered successfully', user: newUser });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
        const token = '';
        res.json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});