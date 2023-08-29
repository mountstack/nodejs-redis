const express = require('express');
const mongoose = require('mongoose');
const ErrorHandler = require('./Error-Handler'); 

const { create, read, update, deleteProduct } = require('./crud'); 

const app = express();


app.use(express.json());

// Create, Read all, Update, Delete 

app.post('/api/product', create); 
app.get('/api/product', read); 
app.patch('/api/product/:id', update); 
app.delete('/api/product/:id', deleteProduct); 

// Page not found 
app.use((req, res, next) => {
    next(ErrorHandler.pageNotFound()); 
})

// Express error Handling Middleware
app.use((err, req, res, next) => {
    res.status(err.status).json({
        status: err.status, 
        error: err.message 
    }) 
}) 

app.listen(5000, () => {
    console.log(`Server is running on 5000`);
    mongoose.connect(
        'mongodb://localhost:27017/cachewithdb', 
        {  useNewUrlParser: true }
    )
        .then(() => {
            console.log('Database Connected');
        })
        .catch(err => {
            console.log('Error occures');
            console.log(err);
        })
}); 