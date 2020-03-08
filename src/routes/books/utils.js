const getErrorMessage = (id = null, title=null, status=404) => {
    let error = "The book doesn't exist"
    if (id || id === 0) {
        error = `The book with the id: ${id} doesn't exist`
    }
    if (status === 404 && title) {
        error = `The book with the title: ${title} doesn't exist`
    }
    if (status === 409 && title) {
        error = `The book with the title: ${title} already exist`
    }
    return error;
}

module.exports = {
    getErrorMessage,
}
