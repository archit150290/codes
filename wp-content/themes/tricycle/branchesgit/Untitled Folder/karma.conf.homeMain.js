module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'fixture', 'sinon-chai'],
        files: [
            'js/jquery2.1.0.js',
            'css/minified_design.css',
            'js/bootstrap.min.js',
            'js/lazysizes.min.js',
            'js/commonFB.main.js',
            'css/minified_design.css',
            'css/desktop_landing.3.css',
            'css/reskin-main.css',
            'desktop_landing.3.css',
            'css/mobile_landing.3.css',
            'css/media_landscap.1.css',
            'js/jquery2.1.0.js',
            'js/abanalytics.main.js',
            'js/validate.main.js',
            'js/track.welcome.js',
            'js/mobile-detect.min.js',
            'test/global.js',
            'test/qa.welcome.html',
            'test/amptload.js',
            'test/abanalytics.specs.main.js',
            'test/validation.specs.main.js',
        ],
        exclude: [
        ],
        preprocessors: {
            'test/qa.welcome.html': ['html2js'],
            'js/abanalytics.main.js' : 'coverage',
            'js/validate.main.js' : 'coverage'
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
