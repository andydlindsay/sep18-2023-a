# W03D04 - Security & Real World HTTP Servers

### To Do
- [x] Storing passwords
- [x] Encrypted cookies
- [x] HTTP Secure (HTTPS)
- [x] REST
- [x] More HTTP methods
- [x] Method Override [Stretch]

### Security Problem #1: Plaintext Passwords
* hashing => one-way process
* plaintext password => hashing algo (bcrypt) => 60 character string (hash)
* fashdfhaskdlfhawesihfoaisdhfoahnsdklfhalskdf
* plaintext password => same hashing algo => same output
* password + salt => hash
* '1234' + 'djfhaskdkfhkasd' => hash

### Security Problem #2: Plaintext Cookies
* 123 => 'afhdsjkfhaskdhf'
* encyption => decrypted
* set the cookie => encryption middleware => encrypted string
* encrypted cookie => decyrption middleware => plaintext values
* symetric key (same key is used to encrypt and decrypt)

```js
// reading a cookie
req.cookies.userId => req.session.userId

// setting a cookie
res.cookie('userId') => req.session.userId

// clearing a cookie
res.clearCookie('userId') => req.session = null
```

### Security Problem #3: Plaintext Protocol
* http://localhost:3000/protected
* Man in the Middle (MiiM) => Monster in the Middle (MiiM)
* HTTPS => HTTP Secure
* asymetric encryption (two different keys are used)

### REST
* naming convention for routes
* RESTful

GET /all-the-users
POST /create-new-image-url

Browse  GET   /dinosaurs
Read    GET   /dinosaurs/:id
Edit    POST  /dinosaurs/:id
Add     POST  /dinosaurs
Delete  POST  /dinosaurs/:id/delete

BREAD > CRUD

### More HTTP Verbs
* PUT => replace a resource completely
* PATCH => replace a piece of a resource
* DELETE => deletes a resource
* semantic aliases for POST

const a = 42;
const age = 42;

div
article
aside
section

Browse  GET     /dinosaurs
Read    GET     /dinosaurs/:id
Edit    PATCH   /dinosaurs/:id
Add     POST    /dinosaurs
Delete  DELETE  /dinosaurs/:id

HTML only understands GET and POST
AJAX


req.method = POST
req.method = PATCH

app.patch()



