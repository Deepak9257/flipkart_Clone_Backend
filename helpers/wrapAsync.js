 const wrapAsync = (fn)=>{
    
        return (req,res,next)=>{
            Promise.resolve(fn(req,res,next)).catch((err)=>next(err))   
        }
 }

 const wrapAllAsync = (controller) => {
    const wrapped = {};
    for (const key in controller) {
        const value = controller[key];
        if (typeof value === 'function') {
            wrapped[key] = wrapAsync(value);
        }
    }
    return wrapped;
};


 module.exports = {wrapAsync, wrapAllAsync};