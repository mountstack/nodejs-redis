const Product = require('./ProductModel'); 
const redis = require('redis');
const client = redis.createClient(); 
const ErrorHandler = require('./Error-Handler'); 


const create = async (req, res, next) => { 

    try {
        if(b) {
            // ...
        }
    } catch (error) { 
        next(ErrorHandler.serverError()); 
    } 



    try { 
        const product = new Product({...req.body}); 
        result = await product.save(); 

        await clearCache(); 

        res.json({ 
            message: 'created'
        }) 
    } 
    catch (error) { 
        res.json({ 
            message: 'failed' 
        }) 
    } 
} 

const read = async (req, res) => { 
    try { 
        let result; 
        result = await getCache(); 

        if(!result) { // null 
            console.log('DB calling');
            result = await Product.find(); // DB 
            setCache(result); 
        } 

        res.json({ result }); 
    } 
    catch (error) {
        res.json({ 
            message: 'failed', 
            error
        }) 
    }
} 

const update = async (req, res) => { 
    const { id } = req.params; 

    try {
        let result; 
        result = await Product.findByIdAndUpdate({_id: id}, req.body, {new: true}); 

        await clearCache(); 

        res.json({result})
    } 
    catch (error) {
        res.json({ 
            message: 'failed' 
        }) 
    }
} 

const deleteProduct = async (req, res) => { 
    const { id } = req.params; 

    try { 
        await Product.findOneAndDelete({_id: id}); 
        await clearCache(); 

        res.json({message: 'Deleted'})
    } 
    catch (error) {
        res.json({ 
            message: 'failed' 
        }) 
    }
} 


async function setCache(result) { 
    await client.connect(); 
    await client.set('products', JSON.stringify(result)); 
    await client.disconnect(); 
} 

async function getCache() {
    await client.connect(); 
    const result = JSON.parse(await client.get('products')); 
    await client.disconnect(); 
    return result; 
}

async function clearCache() { 
    await client.connect(); 
    await client.del('products'); 
    await client.disconnect(); 
} 

module.exports = { 
    create, 
    read, 
    update, 
    deleteProduct
} 