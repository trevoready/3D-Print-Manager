let pool = require('../mysql-helper/mysql')
const fetch = require('node-fetch')
const { post } = require('../routes')
const { json } = require('express')

async function getPrinterInfo(printerCode){
    let printer = await pool.query('SELECT * FROM printers WHERE barcode=?',[printerCode]).then((results) =>{
        return results[0]
    })
    return printer
}
exports.getStatus = async (printerCode) =>{
    let printer = await getPrinterInfo(printerCode)
    const response = await fetch('http://' + printer.IPAddress + '/api/printer', {
      method:'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': printer.APIKEY
      }
    });
    const json = await response.json();
    return json
}
exports.lowerBed = async (printerCode) =>{
    let printer = await getPrinterInfo(printerCode)
    console.log(printer)
    const response = await fetch('http://' + printer.IPAddress + '/api/printer/command', {
      method:'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': printer.APIKEY
      },
      body:JSON.stringify({
          "commands":[
              "G90",
              "G1 Z" + printer.buildHeight + " F1000",
              "M18"
          ]
      })
    });
    console.log(await response.text())
}