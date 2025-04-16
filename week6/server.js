const express = require("express");
const path = require("path");
const app = express();
const port = 3004;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/add", (req, res) => {
    handleOperation(req, res, (a, b) => a + b);
});

app.get("/subtract", (req, res) => {
    handleOperation(req, res, (a, b) => a - b);
});

app.get("/multiply", (req, res) => {
    handleOperation(req, res, (a, b) => a * b);
});

app.get("/divide", (req, res) => {
    handleOperation(req, res, (a, b) => {
        if (b === 0) {
            res.status(400).send("Cannot divide by zero");
        } else {
            res.send((a / b).toFixed(2));
        }
    }, true);
});

function handleOperation(req, res, operation, allowZero = false) {
    const a = req.query.a;
    const b = req.query.b;

    if (a === undefined || b === undefined) {
        return res.status(400).send("Missing input");
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).send("Invalid input");
    }

    if (operation.length === 3) {
        operation(req, res, numA, numB);
        return;
    }

    const result = operation(numA, numB);
    res.send(result.toString());
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
