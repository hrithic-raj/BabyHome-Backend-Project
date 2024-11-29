const productService = require('../services/productServices')
const catchAsync = require('../utils/asyncErrorHandler')
const AppError = require('../utils/appError')

const allProducts = catchAsync(async (req, res, next)=>{
    const category = req.query.category;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let products, total;

    if(category){
        products = await productService.getProductByCategory(category, skip, limit);
        total = await productService.getTotalCountByCategory(category);
    }
    else {
        products = await productService.getAllProducts(skip, limit);
        total = await productService.getTotalCount();
    }
    
    if(!products.length) return next(new AppError( "bad request", 400));
    res.status(200).json({
        status : "fetching success",
        data : {
            products,
            total,
            totalPages: Math.ceil(total/limit),
            currentPage: page,
        },
    });
});

const productById = catchAsync(async (req, res, next)=>{
    const productId = req.params.productId;
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