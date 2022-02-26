function parseError(err) {
    if (Array.isArray(err)) {
        return err.join('\n');
    } else if (err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => e.properties.message).join(' \n');
    } else if (typeof err.message == 'string') {
        return err.message;
    } else {
        return 'Request error';
    }
}

module.exports = {
    parseError
}