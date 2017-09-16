module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'fixture', 'sinon-chai'],
        files: [
            'js/jquery2.1.0.js',
            'css/minified_design.css',
            'js/bootstrap.min.js',
            'js/lazysizes.min.js',
            'js/commonFB.1.js',
            'css/minified_design.css',
            'css/desktop_landing.3.css',
            'css/main.16.css',
            'desktop_landing.3.css',
            'css/mobile_landing.3.css',
            'css/media_landscap.1.css',
            'js/jquery2.1.0.js',
            'js/abanalytics.37.js',
            'js/owl.carousel.min.js',
            'js/validate.12.js',
            'js/track.13.js',
            'js/mobile-detect.min.js',
            'test/global.js',
            'test/qa.html',
            'test/amptload.js',
            'test/abanalytics.specs.js',
            'test/validation.specs.js',
        ],
        exclude: [
        ],
        preprocessors: {
            'test/qa.html': ['html2js'],
            'js/abanalytics.37.js' : 'coverage',
            'js/validate.12.js' : 'coverage'
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
