
const sendRes=(res,statusCode=200,msg="server fetched successfully",data={})=>{
    return res.status(statusCode).json({success:true,msg,data})
}

module.exports = {sendRes};