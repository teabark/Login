import Express from "express";
import pg from "pg";
import env from "dotenv";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";

env.config();

const db = new pg.Client({
    user : process.env.PG_USER,
    host : process.env.PG_HOST,
    database : process.env.PG_DATABASE,
    password : process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

db.connect();

const app = Express();
const port = 5000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Hello World");
});
app.post("/register", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email=$1", [email]);

        if (checkResult.rows.length > 0) {
            return res.send(false);
        }
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.log("Error hashing password:", err);
                return res.status(500).send("Error hashing password");
            }
            try {
                await db.query("INSERT INTO users (email, user_pass) VALUES ($1, $2)", [email, hash]);
                return res.send(true);
            } catch (dbError) {
                console.log("Database error:", dbError);
                return res.status(500).send("Error inserting user into database");
            }
        });
    } catch (err) {
        console.log("Server error:", err);
        return res.status(500).send("Server error");
    }
});


app.post("/login", async (req, res)=>{
    const email = req.body.username;
    const loginPassword = req.body.password;

    try {
        const result = await db.query("SELECT * FROM users where email=$1", [email]);
        
        if(result.rows.length > 0){
            const user = result.rows[0];
            const storedHashedPassword = user.user_pass;

            bcrypt.compare(loginPassword, storedHashedPassword, (err, result)=>{
                if(err){
                    console.log("Error comparing passwords:", err)
                } else {
                    console.log(result);
                    if(result){
                        return res.send(true);
                    } else {
                        return res.send(false)
                    }
                }
            });
        } else {
            res.send("User not found")
        }
    } catch(err){
        console.log(err)
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});