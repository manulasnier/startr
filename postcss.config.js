module.exports = {
    plugins: {
        'autoprefixer': {
            grid : true
        },

        'cssnano': process.env.NODE_ENV === 'production' ? {} : false
    }
}
