const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

// http://localhost:3000/api/add?num1=5&num2=10
app.get('/api/add', (req, res) => {
    let num1 = parseFloat(req.query.num1);
    let num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid numbers provided" });
    }

    let sum = num1 + num2;
    res.json({ result: sum });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
