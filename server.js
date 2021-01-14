import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express()
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('API is running...........');
})

app.get('/login',async(req,res) => {
    const url = 'https://api.instahealthsolutions.com/motherhood_t/Customer/Login.do?_method=login&hospital_name=motherhood_t'
    const fetch_res = await fetch(url,{
        method: 'GET',
        headers: { 'x-insta-auth': 'shopify:1234' }
    })
    const json = await fetch_res.json();
    res.json(json)
})

app.get('/getPatientsDetails',async(req,res) => {
    const {mrNo,request_handler_key} = req.body;
    
    const fetchPatient = await fetch(`https://api.instahealthsolutions.com/motherhood_t/Customer/Registration/GeneralRegistration.do?_method=getPatientDetails&mr_no=${mrNo}`,{
        method: 'GET',
        headers: {'request_handler_key':request_handler_key}
    })
    const json = await fetchPatient.json();
    res.json(json.return_message)
})

const PORT = process.env.PORT || 5001

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))