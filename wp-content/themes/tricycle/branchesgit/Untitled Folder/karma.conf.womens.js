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
            'js/abanalytics.women.js',
            'js/validate.women.js',
            'js/track.women.js',
            'js/mobile-detect.min.js',
            'test/global.js',
            'test/qa.variant2.html',
            'test/amptload.js',
            'test/abanalytics.specs.women.js',
            'test/validation.specs.women.js',
        ],
        exclude: [
        ],
        preprocessors: {
            'test/qa.variant2.html': ['html2js'],
            'js/abanalytics.women.js' : 'coverage',
            'js/validate.women.js' : 'coverage'
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
