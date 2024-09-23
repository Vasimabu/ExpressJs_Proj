const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const { promisify }=require('util')
const mssql=require('mssql')
const config=require('../db_config')


/*  exports.register = async (req, res) => {

     console.log(req.body);
     
    try {
        const { name, email, password, Confirm_password } = req.body;

        console.log('Received data:', { name, email, password, Confirm_password });

        // Validate incoming data
        if (!name || !email || !password || !Confirm_password) {
            console.error('Invalid input data');
            const msg = "Invalid input data. Please provide name, email, pass, and confirm_pass."
            return res.render('register', {doctitle:"Register Page", msg});
        }

        // Check if passwords match
        if (password !== Confirm_password) {
            console.error('Passwords do not match');
            const msg = "Passwords do not match." 
            return res.render('register', { doctitle: "Register Page",msg });
        }

        const pool = await mssql.connect(config);

        // Check if the email already exists
        const request = new mssql.Request(pool);
        request.input('Email', mssql.NVarChar, email);
        const checkEmailQuery = "SELECT Email FROM Users WHERE Email = @Email";
        const emailResult = await request.query(checkEmailQuery);

        if (emailResult.recordset.length > 0) {
            console.error('Email already exists');
            const msg="Email already exists. Please use a different email."
            return res.render('register', {doctitle: "Register Page", msg});
        }

        // Insert new user if the email does not exist
        request.input('Fullname', mssql.NVarChar, name);
        request.input('Pass', mssql.NVarChar, password);
        request.input('Confirm_Pass', mssql.NVarChar, Confirm_password);
        const insertQuery = "INSERT INTO Users (Fullname, Email, Pass, Confirm_Pass) VALUES (@Fullname, @Email, @Pass, @Confirm_Pass)";
        await request.query(insertQuery);

        // Success: Redirect to home with a success message
        const  msg="User registered successfully" 
        res.render('home', { doctitle: "Home Page",msg});

    } catch (err) {
        console.error("Database error: ", err);
        const msg= "An error occurred while processing your request." 
        res.status(500).render('register', {doctitle: "Register Page", msg});
    } finally {
        await mssql.close();
    }
};  */
/* exports.register = async (req, res) => {
    try {
        const { name, email, pass, confirm_pass } = req.body;

        console.log('Received data:', { name, email, pass, confirm_pass });

        // Validate incoming data
        if (!name || !email || !pass || !confirm_pass) {
            console.error('Invalid input data');
            return res.redirect('/register?msg=Invalid input data. Please provide name, email, pass, and confirm_pass.');
        }

        // Check if passwords match
        if (pass !== confirm_pass) {
            console.error('Passwords do not match');
            return res.redirect('/register?msg=Passwords do not match.');
        }

        const pool = await mssql.connect(config);

        // Check if the email already exists
        const request = new mssql.Request(pool);
        request.input('Email', mssql.NVarChar, email);
        const checkEmailQuery = "SELECT Email FROM Users WHERE Email = @Email";
        const emailResult = await request.query(checkEmailQuery);

        if (emailResult.recordset.length > 0) {
            console.error('Email already exists');
            return res.redirect('/register?msg=Email already exists. Please use a different email.');
        }

        // Insert new user if the email does not exist
        request.input('Fullname', mssql.NVarChar, name);
        request.input('Pass', mssql.NVarChar, pass);
        const insertQuery = "INSERT INTO Users (Fullname, Email, Pass) VALUES (@Fullname, @Email, @Pass)";
        await request.query(insertQuery);

        // Success: Redirect to home with a success message
        res.redirect('/home?msg=User registered successfully');

    } catch (err) {
        console.error("Database error: ", err);
        res.redirect('/register?msg=An error occurred while processing your request.');
    } finally {
        await mssql.close();
    }
}; */
/*     exports.login = async (req, res) => {
        console.log(req.body);
        try {
            const { email, password } = req.body;
    
            // Backend validation for empty fields
            if (!email || !password) {
                const msg = "Please provide both email and password.";
                return res.render('login', { doctitle: "Login Page", msg });
            }
    
            // Validate email format using a regex pattern
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                const msg = "Please provide a valid email address.";
                return res.render('login', { doctitle: "Login Page", msg });
            }
    
            const pool = await mssql.connect(config);
            const request = new mssql.Request(pool);
    
            // Query to check if the email and password match
            request.input('Email', mssql.NVarChar, email);
            request.input('Pass', mssql.NVarChar, password);
            const query = "SELECT Email, Pass FROM Users WHERE Email = @Email AND Pass = @Pass";
            const result = await request.query(query);
    
            // If email and password match, login is successful
            if (result.recordset.length > 0) {
                const msg = "User login successful.";
                return res.redirext('/home', { doctitle: "Home Page", msg });
            } else {
                const msg = "Incorrect email or password.";
                return res.render('login', { doctitle: "Login Page", msg });
            }
        } catch (err) {
            console.error("Database error: ", err);
            const msg = "An error occurred while processing your request.";
            res.status(500).render('login', { doctitle: "Login Page", msg });
        } finally {
            await mssql.close();
        }
    }; */

exports.register = async (req, res) => {
    console.log(req.body);
    
    try {
        const { name, email, password, Confirm_password } = req.body;

        console.log('Received data:', { name, email, password, Confirm_password });

        // Validate incoming data
        if (!name || !email || !password || !Confirm_password) {
            console.error('Invalid input data');
            const msg = "Invalid input data. Please provide name, email, password, and confirm password.";
            return res.render('register', { doctitle: "Register Page", msg });
        }

        // Check if passwords match
        if (password !== Confirm_password) {
            console.error('Passwords do not match');
            const msg = "Passwords do not match.";
            return res.render('register', { doctitle: "Register Page", msg });
        }

        const pool = await mssql.connect(config);
        const request = new mssql.Request(pool);

        // Check if the email already exists
        request.input('CheckEmail', mssql.NVarChar, email);
        const checkEmailQuery = "SELECT Email FROM Users WHERE Email = @CheckEmail";
        const emailResult = await request.query(checkEmailQuery);

        if (emailResult.recordset.length > 0) {
            console.error('Email already exists');
            const msg = "Email already exists. Please use a different email.";
            return res.render('register', { doctitle: "Register Page", msg });
        }

        // Hash the password before saving it to the database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user if the email does not exist
        request.input('Fullname', mssql.NVarChar, name);
        request.input('Email', mssql.NVarChar, email);
        request.input('Pass', mssql.NVarChar, hashedPassword);
        const insertQuery = "INSERT INTO Users (Fullname, Email, Pass) VALUES (@Fullname, @Email, @Pass)";
        await request.query(insertQuery);

        // Success: Redirect to home with a success message
        const msg = "User registered successfully.";
        res.render('home', { doctitle: "Home Page", msg });

    } catch (err) {
        console.error("Database error: ", err);
        const msg = "An error occurred while processing your request.";
        res.status(500).render('register', { doctitle: "Register Page", msg });
    } finally {
        await mssql.close();
    }
};

/* exports.login = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;

        console.log('Received data:', { email, password });

        // Validate incoming data
        if (!email || !password) {
            console.error('Invalid input data');
            const msg = "Invalid input data. Please provide email and password.";
            return res.render('login', { doctitle: "Login Page", msg });
        }

        const pool = await mssql.connect(config);
        const request = new mssql.Request(pool);

        // Check if the email exists
        const query = `
            SELECT Email, Pass FROM Users WHERE Email = @Email
        `;
        request.input('Email', mssql.NVarChar, email);
        const result = await request.query(query);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            // Compare the provided password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, user.Pass);

            if (isMatch) {
                const msg = "User login successful.";
                return res.render('home', { doctitle: "Home Page", msg });
            } else {
                console.error('Incorrect password');
                const msg = "Incorrect email or password.";
                return res.render('login', { doctitle: "Login Page", msg });
            }
        } else {
            console.error('Email not found');
            const msg = "Incorrect email or password.";
            return res.render('login', { doctitle: "Login Page", msg });
        }
    } catch (err) {
        console.error("Database error: ", err);
        const msg = "An error occurred while processing your request.";
        res.status(500).render('login', { doctitle: "Login Page", msg });
    } finally {
        await mssql.close();
    }
};
 */



// JWT Secret Key
const jwtSecret = 'your_jwt_secret_key'; // Store this securely, e.g., in environment variables

/* exports.login = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;

        console.log('Received data:', { email, password });

        // Validate incoming data
        if (!email || !password) {
            console.error('Invalid input data');
            const msg = "Invalid input data. Please provide email and password.";
            return res.render('login', { doctitle: "Login Page", msg });
        }

        const pool = await mssql.connect(config);
        const request = new mssql.Request(pool);

        // Check if the email exists
        request.input('Email', mssql.NVarChar, email);
        const query = "SELECT Email, Pass FROM Users WHERE Email = @Email";
        const result = await request.query(query);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            // Compare the provided password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, user.Pass);

            if (isMatch) {
                // Generate JWT token
                const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });
                console.log(token);
                const msg = "User login successful.";
                return res.render('home', { doctitle: "Home Page", msg, token });
            } else {
                console.error('Incorrect password');
                const msg = "Incorrect email or password.";
                return res.render('login', { doctitle: "Login Page", msg });
            }
        } else {
            console.error('Email not found');
            const msg = "Incorrect email or password.";
            return res.render('login', { doctitle: "Login Page", msg });
        }
    } catch (err) {
        console.error("Database error: ", err);
        const msg = "An error occurred while processing your request.";
        res.status(500).render('login', { doctitle: "Login Page", msg });
    } finally {
        await mssql.close();
    }
}; */

// Store this securely, e.g., in environment variables

exports.login = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;

        console.log('Received data:', { email, password });

        // Validate incoming data
        if (!email || !password) {
            console.error('Invalid input data');
            const msg = "Invalid input data. Please provide email and password.";
            return res.render('login', { doctitle: "Login Page", msg });
        }

        const pool = await mssql.connect(config);
        const request = new mssql.Request(pool);

        // Check if the email exists
        request.input('Email', mssql.NVarChar, email);
        const query = "SELECT Userid, Pass FROM Users WHERE Email = @Email";
        const result = await request.query(query);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            // Compare the provided password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, user.Pass);

            if (isMatch) {
                // Generate JWT token
                const token = jwt.sign({ userid: user.Userid }, jwtSecret, { expiresIn: '1h' });

                // Set cookie with specific expiry date (example: 7 days from now)
                const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

                res.cookie('authToken', token, { 
                    httpOnly: true,   // Cookie is accessible only via HTTP(S)
                    secure: process.env.NODE_ENV === 'production',   // Cookie is sent only over HTTPS (set true in production)
                    expires: expiryDate // Set expiry date
                });
                console.log('token is',token);
                console.log('expiry date',expiryDate);
                const msg = "User login successful.";
                return res.render('home', { doctitle: "Home Page", msg });
                //res.redirect('/home');
            } else {
                console.error('Incorrect password');
                const msg = "Incorrect email or password.";
                return res.render('login', { doctitle: "Login Page", msg });
            }
        } else {
            console.error('Email not found');
            const msg = "Incorrect email or password.";
            return res.render('login', { doctitle: "Login Page", msg });
        }
    } catch (err) {
        console.error("Database error: ", err);
        const msg = "An error occurred while processing your request.";
        res.status(500).render('login', { doctitle: "Login Page", msg });
    } finally {
        await mssql.close();
    }
};

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.authToken) {
        try {
            // Verify the JWT token
            const decoded = await promisify(jwt.verify)(
                req.cookies.authToken,
                jwtSecret
            );

            // Query the database to find the user by UserId
            const pool = await mssql.connect(config);
            const request = new mssql.Request(pool);
            request.input('Userid', mssql.Int, decoded.userid); // Assuming UserId is an integer
            
            const result = await request.query('SELECT * FROM Users WHERE Userid = @Userid');
            //console.log('query',result.recordset);

            // If the user is found, attach the UserId to the request object
            if (result.recordset.length > 0) {
                req.user = { userid: result.recordset[0].Userid,
                    fullname: result.recordset[0].Fullname,
                    email: result.recordset[0].Email
                 };
                console.log(req.user);
                
                return next()
            } else {
                req.user = null;
                return next()
            }

            await pool.close(); // Close the connection
        } catch (error) {
            console.error('Error verifying token or querying database:', error);
            req.user = null; // If there's an error, set req.user to null
        }
    } else {
        req.user = null; // No token found, set req.user to null
        return next()
    }

    // Proceed to the next middleware or route handler
};

/* exports.logout=async(req,res)=>{
    req.cookie('authToken','logout',{
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly:true,
    })
    res.status(200).redirect('/')
} */

exports.logout = async (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie('authToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        // Redirect to the homepage
        res.status(200).redirect('/');
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send('An error occurred during logout.');
    }
};
    
