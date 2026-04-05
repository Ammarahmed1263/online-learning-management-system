const asyncWrapper = (asyncFn) => {
    return (req, res, next) => {
        Promise.resolve(asyncFn(req, res, next)).catch(next);
    }
}

export default asyncWrapper;