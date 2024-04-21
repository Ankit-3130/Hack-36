const express = require("express");
const app = express();
const cors = require('cors');
const { Web3 } = require('web3');
require('dotenv').config()
const StudentRecords = require("../Client/artifacts/contracts/students.sol/studentRecords.json");
const Student = require("../Client/artifacts/contracts/students.sol/student.json");
const Certificate = require("../Client/artifacts/contracts/students.sol/certificate.json");


const PORT = 8080;
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));




const web3 = new Web3(process.env.SERVER_RPC_URL);
const contractAddress = process.env.SERVER_CONTACT_ADDRESS;
const smartContract = new web3.eth.Contract(StudentRecords.abi, contractAddress);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/getRecords/:wallet', async (req, res) => {

    const walletId = req.params.wallet;
    let studentRecordEvent;
    let certificates;

    await smartContract.getPastEvents('studentCreated', {
        fromBlock: 0,
        toBlock: 'latest'
    }, function (error, events) {
        // console.log(events);
    })
        .then(function (events) {
            studentRecordEvent = events.map((e) => {
                return {
                    hexStudentId: e.returnValues.hexStudentId,
                }
            })

        });

    // console.log(walletId);
    // console.log(studentRecordEvent);
    const contract1 = new web3.eth.Contract(Student.abi, studentRecordEvent.hexStudentId);
    const promise = await contract1.getPastEvents('certificateUploaded', {
        fromBlock: 6075985,
        toBlock: 'latest',
    }, (error, events) => { })
        .then(function (events) {
            // console.log(events);
            certificates = events.map((e) => {
                return {
                    url: e.returnValues.url,
                    course: e.returnValues.course
                }
            })
        });

    let Documents = [];
    console.log(certificates);

    // convert pdf url to json
    let url = `https://gateway.pinata.cloud/ipfs/${certificates[certificates.length - 1].url}`;
    let jsonTable = await readPdffromUrl(url);

    res.status(200).json(jsonTable);




    // Array to store promises returned by the map function

    // Promise.all(promises)
    //     .then((documents) => {
    //         // Convert BigInt values to strings before sending the response
    //         const documentsStringified = documents.map((doc) => ({
    //             course: doc.course.toString(),
    //             subjects: doc.subjects,
    //             marks: doc.marks.map((mark) => mark.toString())
    //         }));

    //         console.log(documentsStringified);
    //         res.json(documentsStringified);

    //     })
    //     .catch((error) => {
    //         // Handle errors
    //         console.error("Error:", error);
    //         res.status(500).json({ error: "Internal Server Error" });
    //     });

});


app.listen(PORT, () => {
    console.log("server started");
});











async function readPdffromUrl(url) {
    let data = await fetch("http://127.0.0.1:8000/readpdfurl", {
        method: "POST",
        body: JSON.stringify({ pdf_url: url }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    let body = await data.clone().json();

    const subjects = Object.values(body[Object.keys(body)[0]]).slice(1);
    const codes = Object.values(body[Object.keys(body)[1]]).slice(1);
    const marks = Object.values(body[Object.keys(body)[2]]).slice(1);

    const result = subjects.map((subject, index) => {
        return {
            "subject": subject,
            "subject code": codes[index],
            "marks": parseInt(marks[index])
        };
    });

    console.log(result);
    return result;
}