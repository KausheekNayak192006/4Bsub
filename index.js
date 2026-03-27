const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const lat = 19.2952;
    const lng = 72.8544;
    const apiKey = 'openuv-1kw8jrmn8atdkz-io';

    try {
        const response = await axios.get(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lng}`, {
            headers: {
                'x-access-token': apiKey
            }
        });

        const uvIndex = response.data.result.uv;
        const needsSunscreen = uvIndex >= 3;

        res.render('sunscreen', {
            name: "Pranet",
            location: "Mira Bhayandar",
            uvIndex: uvIndex.toFixed(2),
            needsSunscreen: needsSunscreen
        });

    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).send("Error retrieving UV data. Check your API key or terminal logs.");
    }
});

app.post('/submit', (req, res) => {
    const studentName = req.body.studentName;
    const branch = req.body.branch;
    const year = req.body.year;

    res.send(`
        <h2>Form Submitted Successfully</h2>
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Branch:</strong> ${branch}</p>
        <p><strong>Year:</strong> ${year}</p>
        <br>
        <a href="/">Go back to form</a>
    `);
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        name: "Pranet",
        branch: "Computer Engineering",
        year: "SE"
    });
});

app.get('/sunscreen', async (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
