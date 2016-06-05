var express = require('express');

module.exports = function(app, passport) {
    app.get('/', function(req, res) {
            res.render('homepage/index',{user: req.user});            
    });

    app.get('/login', function(req, res) {
        res.render('register/login', {
            message: req.flash('loginMessage')
        });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    app.post('/login', passport.authenticate('local-login',{
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/register', function(req, res) {
        res.render('register/index', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    app.post('/register',
        passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRedirect: '/register'
        }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('register/profile', {
            user: req.user // get the user out of session and pass to template
        });
        
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/forgotpass', function(req, res) {
        res.render('register/forgotpass',{
            user: req.user,message: req.flash('forgotPassMessage')
        });
    });

    app.post('/forgotpass',function(req,res,next){
        async.waterfall([
            function (done) {
                         crypto.randomBytes(20, function (err,buf) {
                             var token = buf.toString('hex');
                             done(err,token);
                         }); 
                    },
            function (token,done) {
                                User.findOne({email: req.body.email},function (err,user) {
                                        if(!user){
                                            req.falsh('error', 'No account with that email address exists.');
                                            return res.redirect('/forgotpass')
                                        }

                                        user.resetPasswordToken = token;
                                        user.resetPasswordDate = Date.now()+3600000;

                                        user.save(function (err) {
                                            done(err,token,user);
                                        });
                                });
                            },
            function (token,user,done) {
                var smtpTransport = nodemailer.createTransport('SMTP', {
                    service: 'SendGrid',
                    auth: {
                      user: '!!! YOUR SENDGRID USERNAME !!!',
                      pass: '!!! YOUR SENDGRID PASSWORD !!!'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'passwordreset@demo.com',
                    subject: 'Node.js Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                      'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                    done(err, 'done');
                });
            }                                
        ],function (err) {
            if (err) return next(err);
            res.redirect('/forgotpass');
        });
    });

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }
};