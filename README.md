# Please run following commands: 

## To run eslint
`npm run lint`

## To start server
`npm start`
### Server start at port 8000

## To test
`npm test`

# Services provided:

## Add Todo:
Url: `http://localhost:8000/addTodo` <br/>
type: post <br/>
parameters: { <br/>
taskName: String,<br/>
taskStatus: String,<br/>
userId: String,<br/>
password: base64 encoded String<br/>
}<br/>
provide inputs in as json body and all parameters are mandatory

## Update Todo:
Url: `http://localhost:8000/updateStatus`<br/>
type: post <br/>
parameters: { <br/>
id: Integer,<br/>
taskStatus: String,<br/>
userId: String,<br/>
password: base64 encoded String<br/>
}<br/>
provide inputs in as json body and all parameters are mandatory
