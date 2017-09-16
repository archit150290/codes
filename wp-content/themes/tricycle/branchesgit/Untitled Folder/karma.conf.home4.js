module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'fixture', 'sinon-chai'],
        files: [
            'js/jquery2.1.0.js',
            'css/minified_design.css',
            'js/bootstrap.min.js',
            'js/lazysizes.min.js',
            'js/commonFB.women.js',
            'js/jquery2.1.0.js',
            'js/abanalytics.home4.js',
            'js/validate.home4.js',
            'js/track.women.js',
            'js/mobile-detect.min.js',
            'test/global.js',
            'test/qa.home4.html',
            'test/amptload.js',
            'test/abanalytics.specs.home4.js',
            'test/validation.home4.specs.js',
        ],
        exclude: [
        ],
        preprocessors: {
            'test/qa.home4.html': ['html2js'],
            'js/abanalytics.home4.js' : 'coverage',
            'js/validate.home4.js' : 'coverage'
        },
        reporters: ['progress', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    })
}
