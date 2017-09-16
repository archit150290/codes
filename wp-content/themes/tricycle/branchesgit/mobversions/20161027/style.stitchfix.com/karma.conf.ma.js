module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'fixture', 'sinon-chai'],
        files: [
            {pattern: 'about1.html'},
            'js/jquery2.1.0.js',
            'css/main.ma.css',
            'css/desktop_landing.3.css',
            'css/mobile_landing.3.css',
            'css/media_landscap.ma.css',
            'js/abanalytics.ma.js',
            'js/mobile-detect.min.js',
            'js/commonFB.ma.js',
            'test/global.js',
            'js/track.ma.js',
            'test/amptload.js',
            "js/bootstrap.min.js",
            "js/lazysizes.min.js",
            "js/validate.ma.js",
            'css/minified_design.css',
            'test/validateForms.js',
            'test/abanalytics.ma.spec.js',
            'test/validation.ma.spec.js',
        ],
        exclude: [
        ],
        preprocessors: {
            'js/validate.ma.js': 'coverage',
            'js/abanalytics.ma.js': 'coverage'
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
