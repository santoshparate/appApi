
const _ = require('underscore')

let q = require('q')

const getStudents = ()=>{
    let deferred = q.defer()
    let students = [
      {id: 1, name: 'Matt', email:'matt@mail.com'},
      {id: 2, name: 'Dave',email:'dave@mail.com'},
      {id: 3, name: 'Nick',email:'nick@mail.com'},
      {id: 4, name: 'Ashley',email:'ashley@mail.com'},
      {id: 5, name: 'Steve',email:'steve@mail.com'},
      {id: 6, name: 'Andrew',email:'andrew@mail.com'},
      {id: 7, name: 'Neon',email:'neon@mail.com'},
      {id: 8, name: 'Kemp',email:'kemp@mail.com'},
      {id: 9, name: 'Demp',email:'demp@mail.com'},
      {id: 10, name: 'Martine',email:'martine@mail.com'}
      
    ]
    if(!_.isEmpty(students)){
        deferred.resolve(students)
    }else{
        deferred.reject('Something Went Wrong ->')
    }
    
    return deferred.promise
}

let studentList = (req, res) => {
    // let getBody = req.body && req.body.data ? req.body.data : null
    // let logHeaders = req.headers
   
    getStudents()
      .then((data) => {
       
        res.status(200).send(data)
      }).catch((error) => {
        
        console.log( ' API error :- ', error)
        res.status(400).send(error)
      }).done()
  }
  
  exports.studentList = studentList