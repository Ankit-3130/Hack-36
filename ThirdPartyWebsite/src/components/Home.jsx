import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import axios from "axios";

function Home() {
    const [formData, setFormData] = useState([{ subject: "", "subject code": "", marks: "" }]);

    const handleAutoFill = async () => {
        // call an api
        await getDetails();

        // setFormData([{ subject: "English", "subject code": "end", marks: 40 },
        // { subject: "Maths", "subject code": "mat", marks: 54 },
        // { subject: "Science", "subject code": "sci", marks: 42 },
        // { subject: "Hindi", "subject code": "hin", marks: 67 },
        // ]);
    }

    const [address, setAddress] = useState();
    const [details, setDetails] = useState([]);
    const course = ["Class 10th", "Class 12th", "B.Tech"];
    useEffect(() => {
        const Request = async () => {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = Web3provider.getSigner();
            const Address = await signer.getAddress();
            setAddress(Address);
        }
        Request();
    }, [])

    const getDetails = async () => {
        axios.get(`http://localhost:8080/getRecords/${address}`)
            .then(async (res) => {
                console.log(res);
                setDetails(res.data);
                setFormData(res.data);
            })
    }

    return (
        <div>
            <button onClick={handleAutoFill}>Auto form fill</button>
            <br />
            <br />
            <form>
                <table>
                    <thead>
                        <tr key={0}>
                            <th>
                                Subject name
                            </th>
                            <th>
                                Subject code
                            </th>
                            <th>
                                Marks
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        {
                            formData && formData.map((subject, index) => {
                                return (
                                    <tr key={index + 1}>
                                        <td><input type='text' value={subject.subject}
                                            onChange={(e) => {
                                                setFormData(formData => {
                                                    const updatedFormData = formData.map((item, idx) => {
                                                        if (idx === index) {
                                                            return { ...item, subject: e.target.value };
                                                        }
                                                        return item;
                                                    });
                                                    return updatedFormData;
                                                })
                                            }} /></td>

                                        <td><input type='text' value={subject["subject code"]}
                                            onChange={(e) => {
                                                setFormData(formData => {
                                                    const updatedFormData = formData.map((item, idx) => {
                                                        if (idx === index) {
                                                            return { ...item, "subject code": e.target.value };
                                                        }
                                                        return item;
                                                    });
                                                    return updatedFormData;
                                                })
                                            }} /></td>

                                        <td><input type='number' value={subject.marks}
                                            onChange={(e) => {
                                                setFormData(formData => {
                                                    const updatedFormData = formData.map((item, idx) => {
                                                        if (idx === index) {
                                                            return { ...item, marks: e.target.value };
                                                        }
                                                        return item;
                                                    });
                                                    return updatedFormData;
                                                })
                                            }} /></td>
                                    </tr>
                                )
                            })
                        }
                    </thead>
                </table>
                <button onClick={(e) => {
                    e.preventDefault();
                    setFormData(formData => {
                        return [...formData, { subject: "", "subject code": "", marks: "" }];
                    })
                }}>+</button>
                <button type='submit' style={{ marginLeft: '5px' }}>Submit</button>
            </form>
        </div>
    )
}

export default Home