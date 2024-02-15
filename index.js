// import needed module
// import {bodyParser} from 'body-parser'

// initiate ExpressJS
const express = require('express')
const bodyParser = require('body-parser')
const menu = require('./menu1')
const app = express()
const port = 3000
// Parse incoming request data
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({extended: false})

//initiate whatsappweb.js
const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});
const menus = new menu()


// generate QRCode to scan webclient of whatsapp
client.on('qr', (qr)=>{
    qrcode.generate(qr, {small: true})
})
client.on('ready', ()=>{
    console.log('Client is ready')
})

// Command 
client.on('message', async msg => {
    // Command to get senderId
	// if(msg.body === "!id") {
    //     msg.reply(msg.from);
    // }else if(msg.body === "!halo") {
    //     let senderId = msg.from
    //     noticeAdmin('62811520504@c.us', senderId)
    // }
    var a = menus.respon(msg.body)
    if (a === "-"){
        //noting happen. let customer chat with agen
    }else{
        msg.reply(a)
    }
    // msg.reply(menus.respon(msg.body))
});
// Command to get groupId
client.on('message', async msg => {
	if(msg.body === "!groupid") {
        // console.log(msg.from)
        msg.reply(msg.from);
    }
});

function noticeAdmin(admin, id){
    client.sendMessage(admin, id + ' is contact sicantik')
}
function msgCustomer(phone, message){
    client.sendMessage(phone, message)
}


// set API route here. it will handle by ExpressJS
app.get('/api/v1/', (req, res) => {
    res.send('hello world')
})
app.post('/api/v1/regisok', urlencodedParser, (req, res) => {
    if(res.status(200)){
        mssg = "Registrasi Anda berhasil.\n\n"+
            "Nama : "+req.body.name+
            "\nNomor tiket : "+req.body.noticket+
            "\n\nMohon tunggu sebentar, Anda akan segera terhubung dengan agen kami."+
            "\nAnda dapat memantau progres tiket Anda melalui link berikut : https://tiket.bpskalteng.id/tracking/"+req.body.noticket
        msgCustomer(req.body.phone+'@c.us', mssg)
        res.status(200).send({
            success: 'true',
            message: 'customer has been informed'
        })
    }else{
        res.send({
            success: 'false',
            message: 'Something wrong'
        })
    }
})

app.post('/api/v1/msgcust', urlencodedParser, (req, res) => {
    if(res.status(200)){
        mssg = 'Terima kasih kak '+req.body.name+' sudah bersedia menunggu. Mohon maaf ya kak karena cukup padatnya pengunjung kami.\n\nTadi kakak cerita perlu '+req.body.necessary+'. Benar ya? Bisa ceritakan lebih detail kak?'
        msgCustomer(req.body.phone+'@c.us', mssg)
        res.status(200).send({
            success: 'true',
            message: 'customer has been informed'
        })
    }else{
        res.send({
            success: 'false',
            message: 'Something wrong'
        })
    }
})

app.listen(port, ()=>{
    console.log(`Apps is listening on port ${port}`)
})


client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});

client.initialize()