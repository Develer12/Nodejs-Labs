const app = require('express')();
const passport = require('passport');
const Digest = require('passport-http').DigestStrategy;
const session = require('express-session')({
  resave: false,
  saveUninitialized: false,
  secret: '123'
});

let Users = require(__dirname+'/users.json');
const PORT = 4000;

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Digest({qop:'auth'},(user, done)=>{
  let rc = null;
  let cr = Credential(user);
  if(!cr){
    console.log('Wrong user name');
    rc = done(null, false);
  }
  else {
    rc = done(null, cr.user, cr.password);
  }
  return rc;
}, (params, done)=>{
  console.log(`Params: ${JSON.stringify(params)}`);
  done(null, true);
}));

passport.serializeUser((user, done)=>{
  console.log('SerializeUser');
  done(null, user);
});
passport.deserializeUser((user, done)=>{
  console.log('DeserializeUser');
  done(null, user);
});

app.get('/login', (req, res, next)=>{
  console.log('Login')

  if(req.session.logout && req.headers['authorization']){
    req.session.logout = false;

    delete req.headers['authorization'];
  }

  next();
}, passport.authenticate('digest', {session: false}), (req, res, next)=>{
  if(req.session.logout == undefined)
    req.session.logout = false;
  next();
})

.get('/login', (req, res, next)=>{
  res.end('da');
})

app.get('/logout', (req, res)=>{
  console.log('Logout');
  req.session.logout = true;
  delete req.headers['authorization'];
  res.redirect('/login');
})

app.get('/resource', (req, res)=>{
  console.log('Resource');

  if(req.session.logout == false && req.headers['authorization'])
    res.end('Resource');
  else
    res.redirect('/login')
});

let Credential = (user) =>{
  let us = Users.find(u => u.user.toLowerCase() == user.toLowerCase());
  return us;
};
let verificate = (pass1, pass2) =>{
  return pass1 == pass2;
};

app.listen(PORT, () =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});
