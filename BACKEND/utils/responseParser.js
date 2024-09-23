module.exports.responseParser = (message,error,data) =>{
    let code = error?500:200
    return {
        error: error,
        message: message,
        data: data,
        code
    };
}