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
type: put <br/>
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
taskName: String,<br/>
taskStatus: String,<br/>
userId: String,<br/>
password: base64 encoded String<br/>
}<br/>
provide inputs in as json body and all parameters are mandatory

## Get Todo:
Url: `localhost:8000/tasks?taskStatus=All`<br/>
type: get <br/>
query parameter: <br/>
    - taskStatus: All, Active, Completed<br/>
header parameter: <br/>
    - userId: String<br/>
    - password: base64 encoded String<br/>
all parameters are mandatory   

## Remove Todo:
Url: `http://localhost:8000/removeTodo`<br/>
type: delete <br/>

parameters: { <br/>
id: Integer,<br/>
taskName: String,<br/>
userId: String,<br/>
password: base64 encoded String<br/>
}<br/>
provide inputs in as json body and all parameters are mandatory

