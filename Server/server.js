const express = require("express");
const app = express();
const cors = require('cors');
const {Web3} = require('web3');
require('dotenv').config()
const StudentRecords=require("../my-app/artifacts/contracts/students.sol/studentRecords.json");
const Student=require("../my-app/artifacts/contracts/students.sol/student.json");
const Certificate=require("../my-app/artifacts/contracts/students.sol/certificate.json");


const PORT =8080;
app.use(cors({
    origin:"http://localhost:3001",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));


const address = process.env.ADDRESS;


const web3 = new Web3(process.env.SERVER_RPC_URL);
const contractAddress=process.env.SERVER_CONTACT_ADDRESS;
const smartContract = new web3.eth.Contract(StudentRecords.abi, contractAddress);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/getRecords/:wallet',async(req,res)=>{

    const walletId = req.params.wallet;
    let studentRecordEvent;
    let certificates;

    await smartContract.getPastEvents('studentCreated', {
        fromBlock: 0,
        toBlock: 'latest'
    }, function(error, events){ console.log(events); })
    .then(function(events){
         studentRecordEvent=events.map((e)=>{
                        return {
                            hexStudentId: e.returnValues.hexStudentId,
                        }
                    })
       
    });

    console.log(walletId);
    console.log(studentRecordEvent);
      const contract1 = new web3.eth.Contract(Student.abi, studentRecordEvent.hexStudentId);
      await contract1.getPastEvents('certificateUploaded', {
        fromBlock: 6075985,
        toBlock: 'latest',
      }, (error, events) => {})
        .then(function(events){
        console.log(events);
        certificates=events.map((e)=>{
            return {
                url:e.returnValues.url,
                course:e.returnValues.course
            }
        })
    });

        let Documents=[];
        console.log(certificates);

      
    
    // Array to store promises returned by the map function
const promises = certificates.map(async (obj) => {
    const contract = new web3.eth.Contract(Certificate.abi, obj.certId);
    let subLen;
    await contract.methods.subjectsLen().call({ from: walletId }).then((x) => {
        subLen = x;
    });

    let arr1 = [];
    let arr2 = [];
    for (let i = 0; i < subLen; i++) {
        let sub = await contract.methods.subjects(i).call({ from: walletId });
        let mark = await contract.methods.marks(i).call({ from: walletId });
        console.log(sub, mark);
        arr1.push(sub);
        arr2.push(mark);
    }
    return {
        course: obj.course,
        subjects: arr1,
        marks: arr2
    };
});

// Wait for all promises to resolve
Promise.all(promises)
    .then((documents) => {
        // Convert BigInt values to strings before sending the response
const documentsStringified = documents.map((doc) => ({
    course: doc.course.toString(),
    subjects: doc.subjects,
    marks: doc.marks.map((mark) => mark.toString())
}));

console.log(documentsStringified);
res.json(documentsStringified);

    })
    .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    });

})


app.listen(PORT, () => {
  console.log("server started");
});