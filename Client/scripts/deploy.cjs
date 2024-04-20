const hre=require('hardhat');

async function main(){
    const StudentRecords= await hre.ethers.getContractFactory("studentRecords");
    const studentRecords=await StudentRecords.deploy();
    await studentRecords.deployed();
    console.log("Records Deployed At :", studentRecords.address);

}

main()
    .then(()=>process.exit(0))
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    });
    