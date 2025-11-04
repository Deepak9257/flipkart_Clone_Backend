const express = require("express");
const userRoutes = require("./routes/userRoutes");
const { handleError } = require("./middlewares/handleError");
const MyError = require("./helpers/error");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./admin/authRoutes");
const cors = require('cors')

require("./database/db")  // import DB function


const port = process.env.PORT || 5000;
const host = process.env.HOST || "127.0.0.1"

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({ msg: 'server is working' })
});

// routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);

// admin routes
app.use('/admin', authRoutes)

// page not found error
app.use((req, res, next) => {
    throw new MyError(404, "Page not found")
})


// global error handling
app.use(handleError);

app.listen(port, host, () => {
    console.log(`server is working at: http://${host}:${port}`)
});