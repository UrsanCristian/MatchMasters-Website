import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const apiToken = "Your Football-Data API Token"

const config = { 
    headers: { "X-Auth-Token": apiToken }
    };

function getMatchDates(daysToAdd = 0) {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

function formatDate(apiDate) {
    const date = new Date(apiDate);

    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' ,
        hour12: false
    };

    return date.toLocaleDateString('en-GB', options);
};


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
    const currentDate = getMatchDates();
    const endDate = getMatchDates(7);
    
    try {
        const response = await axios.get(`https://api.football-data.org/v4/competitions/PL/matches?dateFrom=${currentDate}&dateTo=${endDate}`, 
        config);
        const result = response.data;
        res.render("index.ejs", { info: result, formatDate: formatDate });
    } catch (error) {
        res.render("index.ejs", { fail: "Failed to connect to API"})};
});

app.post("/PL", (req, res) => {
    res.redirect("/");
});

app.post("/BL", async (req, res) => {
    const currentDate = getMatchDates();
    const endDate = getMatchDates(7);
    
    try {
        const response = await axios.get(`https://api.football-data.org/v4/competitions/BL1/matches?dateFrom=${currentDate}&dateTo=${endDate}`, 
        config);
        const result = response.data;
        res.render("index.ejs", { info: result, formatDate: formatDate });
    } catch (error) {
        res.render("index.ejs", { fail: "Failed to connect to API"})};
});

app.post("/SA", async (req, res) => {
    const currentDate = getMatchDates();
    const endDate = getMatchDates(7);
    
    try {
        const response = await axios.get(`https://api.football-data.org/v4/competitions/SA/matches?dateFrom=${currentDate}&dateTo=${endDate}`, 
        config);
        const result = response.data;
        res.render("index.ejs", { info: result, formatDate: formatDate });
    } catch (error) {
        res.render("index.ejs", { fail: "Failed to connect to API"})};
});

app.get("/live", async (req, res) => {
    try {
        const responsePL = await axios.get("https://api.football-data.org/v4/competitions/PL/matches", config);
        const resultPL = responsePL.data;

        const responseBL = await axios.get("https://api.football-data.org/v4/competitions/BL1/matches", config);
        const resultBL = responseBL.data;

        const responseSA = await axios.get("https://api.football-data.org/v4/competitions/SA/matches", config);
        const resultSA = responseSA.data;

        res.render("live.ejs", { infoPL: resultPL, infoBL:  resultBL, infoSA: resultSA });
    } catch (error) {
        res.render("live.ejs", { fail: "Failed to connect to API"})};
});

app.get("/schedule", async (req, res) => {
    const currentDate = getMatchDates();
    const endDate = getMatchDates(7);

    try {
        const responsePL = await axios.get(`https://api.football-data.org/v4/competitions/PL/matches?dateFrom=${currentDate}&dateTo=${endDate}`, config);
        const resultPL = responsePL.data;

        const responseBL = await axios.get(`https://api.football-data.org/v4/competitions/BL1/matches?dateFrom=${currentDate}&dateTo=${endDate}`, config);
        const resultBL = responseBL.data;

        const responseSA = await axios.get(`https://api.football-data.org/v4/competitions/SA/matches?dateFrom=${currentDate}&dateTo=${endDate}`, config);
        const resultSA = responseSA.data;

        res.render("schedule.ejs", { infoPL: resultPL, infoBL: resultBL, infoSA: resultSA , formatDate: formatDate });
    } catch (error) {
        res.render("schedule.ejs", { fail: "Failed to connect to API"})};
});

app.get("/results", async (req, res) => {
    const startDate = getMatchDates(-7);
    const currentDate = getMatchDates();

    try {
        const responsePL = await axios.get(`https://api.football-data.org/v4/competitions/PL/matches?dateFrom=${startDate}&dateTo=${currentDate}`, config);
        const resultPL = responsePL.data;

        const responseBL = await axios.get(`https://api.football-data.org/v4/competitions/BL1/matches?dateFrom=${startDate}&dateTo=${currentDate}`, config);
        const resultBL = responseBL.data;

        const responseSA = await axios.get(`https://api.football-data.org/v4/competitions/SA/matches?dateFrom=${startDate}&dateTo=${currentDate}`, config);
        const resultSA = responseSA.data;

        res.render("results.ejs", { infoPL: resultPL, infoBL: resultBL, infoSA: resultSA });
    } catch (error) {
        res.render("results.ejs", { fail: "Failed to connect to API"})};
});

app.get("/standings", async (req, res) => {
    try {
        const responsePL = await axios.get("https://api.football-data.org/v4/competitions/PL/standings", config);
        const resultPL = responsePL.data;

        const responseBL = await axios.get("https://api.football-data.org/v4/competitions/BL1/standings", config);
        const resultBL = responseBL.data;

        const responseSA = await axios.get("https://api.football-data.org/v4/competitions/SA/standings", config);
        const resultSA = responseSA.data;

        res.render("standings.ejs", { infoPL: resultPL, infoBL: resultBL, infoSA: resultSA });
    } catch (error) {
        res.render("standings.ejs", { fail: "Failed to connect to API"})};
});

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});