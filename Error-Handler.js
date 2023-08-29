
class ErrorHandler { 
    constructor(status, message) {
        this.status = status; 
        this.message = message; 
    }

    static pageNotFound() {
        return new ErrorHandler(404, 'NOT found!'); 
    } 

    static serverError() {
        return new ErrorHandler(500, 'Internal server error!'); 
    }

    static forbidden() {
        return new ErrorHandler(403, 'Forbidden resource!'); 
    } 
} 

module.exports = ErrorHandler; 