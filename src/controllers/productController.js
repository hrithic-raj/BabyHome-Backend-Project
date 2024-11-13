const productService = require('../services/productService')
const catchAsync = require('../utils/asyncErrorHandler')
const AppError = require('../utils/AppError')

const allProducts = catchAsync(async (req, res, next)=>{

    const category = req.query.category;
    let products;
    if(category) products = await productService.getProductByCategory(category);
    else products = await productService.getAllProducts();
    
    if(!products.length) return next(new AppError( "bad request", 400));
    res.status(200).json({
        status : "fetching success",
        data : products
    });
});

const productById = catchAsync(async (req, res, next)=>{
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    if(!product) return next(new AppError( "product not found", 404));
    
    res.status(200).json({
        status : "fetching success", 
        data : product
    });
});

const getBestSellers = catchAsync(async (req, res, next)=>{
    const product = await productService.getBestSellers();
    
    if(!product) return next(new AppError( "Bestsellers not found", 404));
    
    res.status(200).json({
        status : "fetching success", 
        data : product
    });
});

const getNewlyAdded = catchAsync(async (req, res, next)=>{
    const product = await productService.getNewlyAdded();
    
    if(!product) return next(new AppError( "Newly added product not found", 404));
    res.status(200).json({
        status : "fetching success",
        data : product
    });
});

module.exports = {
    allProducts,
    productById,
    getBestSellers,
    getNewlyAdded,
}