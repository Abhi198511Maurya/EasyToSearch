// THIS IS A FUCTION THAT RETURNS FUNCTION 
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}