module.exports = {
    plugins: {
        'autoprefixer': process.env.NODE_ENV === 'production' ? {} : false,
        'cssnano': process.env.NODE_ENV === 'production' ? {} : false
    }
}
