import express from 'express'

const app = express();  //create object of express
app.use(express.json()); 
const port = 5000; // Assign port on which want to run application

//Empty products object
let datastore = {
    products: [],
}

//HTTP Get Request
app.get('/getproducts',(req, res) => {
    res.json(datastore.products);
})

//HTTP Post Request
app.post('/addproduct',(req, res) => {
    const product = req.body;

    // Check if all required fields are provided
    if (!product || !product.id || !product.name || !product.description || !product.price || !product.qty || !product.category) {
        return res.status(400).json({ error: 'Product id, name, description, price, qty, and category are required' });
    }

    // Check if a product with the same id already exists
    const existingProduct = datastore.products.find(p => p.id == product.id);
    if (existingProduct) {
        return res.status(409).json({ error: 'Id already exists, please add unique!!' });
    }
    
    datastore.products.push(product);
    res.status(200).json(product);
})

//HTTP Delete Request
app.delete('/deleteproduct/:id',(req, res) => {
    const product = req.params.id;
    const productIndex = datastore.products.findIndex(p => p.id === product); // To find the product with requested product Id

    // Check if a product exists or not
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const deletedProduct = datastore.products.splice(productIndex, 1);
    res.status(200).json(deletedProduct);
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})