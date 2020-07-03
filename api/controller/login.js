
const _ = require('underscore')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
let q = require('q')

const secret = 'Q@%6ahsyr'

const checkUser = (data)=>{
    
    let deferred = q.defer()

    sendDetails = {}

    userDetails = {email:'santosh@gmail.com', password : 'abc123' }  // we can encrypt password 
    sendDetails.email = userDetails.email
    if(userDetails.email ===data.email && userDetails.password ===data.password){

        // create a token
    var token = jwt.sign({ id: userDetails.email }, secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      sendDetails.token = token
      sendDetails.auth = true


      deferred.resolve(sendDetails)
    }else{
      sendDetails.auth = false
      sendDetails.token = null
      deferred.resolve(sendDetails)
    }
    
    return deferred.promise
}

let login = (req, res) => {
    
     let getBody = req.body ? req.body : null
    // let logHeaders = req.headers
   
    checkUser(getBody)
      .then((data) => {
       
        res.status(200).send(data)
      }).catch((error) => {
        
        console.log( ' API error :- ', error)
        res.status(400).send(error)
      }).done()
  }
  
  exports.login = login