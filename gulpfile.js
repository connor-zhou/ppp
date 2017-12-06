// JSHint stuffs:
/* global __dirname: false, require: false, JSON: false, process: false */

/*========================================
 =            Requiring stuffs            =
 ========================================*/

var gulp              = require('gulp'),
    concat            = require('gulp-concat'),
    connect           = require('gulp-connect'),
    csso              = require('gulp-csso'),
    del                = require('del'),
    // jshint            = require('gulp-jshint'),
    less               = require('gulp-less'),
    mobilizer         = require('gulp-mobilizer'),
    path               = require('path-extra'),
    protractor        = require('gulp-protractor').protractor,
    releaseTasks      = require('gulp-release-tasks'),
    rename             = require('gulp-rename'),
    os                  = require('os'),
    fs                  = require('fs'),
    rimraf              = require('rimraf');
    seq                 = require('run-sequence'),
    sourcemaps         = require('gulp-sourcemaps'),
    uglify              = require('gulp-uglify'),
    linker              = require('gulp-linker'),
    sftp                = require('gulp-sftp'),
    _                   = require('lodash'),
    gls                 = require('gulp-live-server'),
    gCssample          = require('gulp-cssample'),
    ngHtml2Js           = require("gulp-ng-html2js"),
    minifyHtml          = require("gulp-minify-html"),
    replace             = require('gulp-replace'),
    gutil               = require('gulp-util'),
    tsc                 =require('gulp-typescript'),
    exec = require('child_process').exec,
    webpack = require("webpack");
    WebpackDevServer = require("webpack-dev-server"),
        git = require('gulp-git');
        git = require('gulp-git');

    webdriverio = require('webdriverio');
    mkdir =  require('mkdirp');

/*=============================
 =            Globs           =
 =============================*/

var GLOBS = {};
GLOBS.fonts                 = ['bower_components/font-awesome/fonts/fontawesome-webfont.*', 'bower_components/bootstrap/fonts/**'];
GLOBS.vendorLess            = [ path.resolve(__dirname, 'app/less'), path.resolve(__dirname, 'bower_components'), path.resolve(__dirname) ];
GLOBS.appConfig = JSON.parse(fs.readFileSync('config/app.json'));

// tsc
gulp.task("tsc:dev", function (cb) {
    var ngcCmd = 'tsc -p "tsconfig.json"';
    exec(ngcCmd, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
		cb(err);
    });
});

gulp.task("tsc:build", function (cb) {
    var ngcCmd = os.platform() === 'win32' ? 'node_modules\\.bin\\ngc' : './node_modules/.bin/ngc';
    var rollupCmd = os.platform() === 'win32' ? 'node_modules\\.bin\\rollup' : './node_modules/.bin/rollup';
    ngcCmd += ' -p "tsconfig-aot.json"';
    rollupCmd += ' -c rollup-config.js';
    exec(ngcCmd, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        exec(ngcCmd,function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            exec(rollupCmd,function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(err);
            });
        });
    });
});



// copy
gulp.task('copy:images', function() {
    return gulp.src('app/images/**')
        .pipe(gulp.dest(path.join('dist', 'images')));
});
gulp.task('copy:lib_js', function() {
    return gulp.src([
        'node_modules/core-js/client/core.min.js',
        'node_modules/intl/dist/Intl.min.js',
        'bower_components/classlist/classList.min.js',
        'node_modules/web-animations-js/web-animations.min.js',
        "node_modules/zone.js/dist/zone.min.js",
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/bootstrap/dist/js/bootstrap.min.js',
		'bower_components/jquery-ui-datepicker-smooth/jquery-ui.min.js'
    ]).pipe(gulp.dest(path.join('dist', 'js')));
});
gulp.task('copy:css', function() {
    return gulp.src('app/css/**')
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.join('dist', 'css')));
});


//------------ linker ----------------
gulp.task('linker',function(){
    var serverConfig =  fs.readFileSync(__dirname+'/config/app.json', 'utf8')+';';
    var logConfig = fs.readFileSync(__dirname+'/config/log.json', 'utf8')+';';

    return gulp.src('app/_index.html')
        .pipe(replace('/*--app config--*/', 'window.SERVERCONF='+serverConfig+';'))
        .pipe(replace('/*--log config--*/', 'window.LOGCONF='+logConfig+';'))
        .pipe(linker({
            scripts:[
                'node_modules/core-js/client/core.js',
                'node_modules/intl/dist/Intl.js',
                'bower_components/classlist/classList.js',
                'node_modules/web-animations-js/web-animations.min.js',
                "node_modules/zone.js/dist/zone.js",
                "node_modules/reflect-metadata/Reflect.js",
                "node_modules/systemjs/dist/system.src.js",
                'bower_components/jquery/dist/jquery.min.js',
                'bower_components/bootstrap/dist/js/bootstrap.min.js',
                'bower_components/jquery-ui-datepicker-smooth/jquery-ui.min.js'
            ],
            startTag: '<!--node js-->',
            endTag: '<!--node js end-->',
            fileTmpl: '<script src="/%s" type="text/javascript"></script>',
            appRoot: 'app/'
        }))
        .pipe(linker({
            scripts:['app/css/*.css'],
            startTag: '<!--css-->',
            endTag: '<!--css end-->',
            fileTmpl: '<link crossorigin="anonymous" href="/%s" media="all" rel="stylesheet" />',
            appRoot: 'app/'
        }))
        .pipe(linker({
            scripts:['systemjs.config.js'],
            startTag: '<!--app js-->',
            endTag: '<!--app js end-->',
            fileTmpl: '<script src="/%s" type="text/javascript"></script>',
            appRoot: './'
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('app'));
});

gulp.task('linker:build',function () {
    var appConfig = JSON.parse(fs.readFileSync(__dirname+'/config/app.build.json'));
    var serverConfig =  fs.readFileSync(__dirname+'/config/app.build.json', 'utf8')+';';
    var logConfig = fs.readFileSync(__dirname+'/config/log.build.json', 'utf8')+';';
    return gulp.src('app/_index-aot.html')
		.pipe(replace('/**--base url--**/', appConfig.baseURL))
        .pipe(replace('/*--app config--*/', 'window.SERVERCONF='+serverConfig+';'))
        .pipe(replace('/*--log config--*/', 'window.LOGCONF='+logConfig+';'))
        .pipe(linker({
            scripts:[
                'dist/js/core.min.js',
                'dist/js/Intl.min.js',
                'dist/js/classList.min.js',
                'dist/js/web-animations.min.js',
                'dist/js/zone.min.js',
                'dist/js/jquery.min.js',
                'dist/js/bootstrap.min.js',
                'dist/js/jquery-ui.min.js',
                'dist/js/build.js',
            ],
            startTag: '<!--js-->',
            endTag: '<!--js end-->',
            fileTmpl: '<script src="/%s" type="text/javascript"></script>',
            appRoot: appConfig.appRoot
        }))
        .pipe(linker({
            scripts:['dist/css/*.css'],
            startTag: '<!--css-->',
            endTag: '<!--css end-->',
            fileTmpl: '<link crossorigin="anonymous" href="/%s" media="all" rel="stylesheet" />',
            appRoot: appConfig.appRoot
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'));
});

/*====================================
 =   Compile, minify, mobilize less  =
 ====================================*/
gulp.task('css:less', function () {

        gulp.src([
            'app/less/app-base.less'
        ])
        .pipe(less({paths: GLOBS.vendorLess}))
        // .pipe(mobilizer('app-base.css', {
        //     'app-base.css': { hover: 'exclude', screens: ['0px'] }
        // }))
         .pipe(gulp.dest('app/css/'));
});

//---------------------------  nodemon  --------

// gulp.task('nodemon', function () {
//     GLOBS.lieveServer = gls(path.join(__dirname, 'bin/www') , {env: {NODE_ENV: 'development'}});
//     GLOBS.lieveServer.start();
//     gulp.watch(['app/**'], function (file) {
//         GLOBS.lieveServer.notify.apply(GLOBS.lieveServer, [file]);
//         // console.log('brower reload');
//     });
// });

gulp.task('build:aot',function(done){
    console.log('clean start ...');
    del('aot/*');
    del('dist/*');
    console.log('clean end');
    seq(['css:less','tsc:build'],['copy:images','copy:lib_js','copy:css'],'linker:build',done)
});

gulp.task('build:webpack',function(done){
    console.log('clean start ...');
    rimraf('dist',function () {
        seq('webpack:css:less:build', 'webpack:build','webpack:_browser:copy:html','webpack:_browser:copy:image' ,done);
    });

});

gulp.task('default',function(done){
    seq('webpack:css:less:dev', ['webpack:dev','webpack:watch:less:dev','webpack:watch:scripts:dev'],done)

});

//==============webpack

gulp.task("webpack:build", function(cb) {
    var config = require('./webpack.product.js');
    // run webpack
    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        cb(err);
    });
});

gulp.task("webpack:dev", function(cb) {
    var config = require('./webpack.dev.js');
    // Start a webpack-dev-server
    var compiler = webpack(config);

    new WebpackDevServer(compiler, {
        historyApiFallback: {
            disableDotRule:true
        }

    }).listen(8880, "localhost", function(err) {

        if(err){
            console.log(err);
        }
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
        // keep the server alive or continue?
        // cb();
    });
});

gulp.task('webpack:css:less:dev', function () {
    return gulp.src([
        'app/less/app-base.dev.less'
    ])
        .pipe(less({paths: GLOBS.vendorLess}))
        .pipe(rename({basename:'app-base',suffix:'',extname: '.css'}))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('webpack:css:less:build', function () {
    return gulp.src([
        'app/less/app-base.build.less'
    ])
        .pipe(less({paths: GLOBS.vendorLess}))
        .pipe(rename({basename:'app-base',suffix:'',extname: '.css'}))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('webpack:watch:less:dev',function(){
    gulp.watch(['app/less/**'], ['webpack:css:less:dev']);
});

gulp.task('webpack:watch:scripts:dev',function(){
    gulp.watch(['app/scripts/**'], ['webpack:dev']);
});

gulp.task('webpack:_browser:copy:html',function (cb) {
    return gulp.src([
        'app/browser.html'
    ]).pipe(gulp.dest('dist/'));
});
gulp.task('webpack:_browser:copy:image',function (cb) {
    gulp.src([
        'app/images/logo.jpg',
        'app/images/app.png'
    ]).pipe(gulp.dest('dist/images/'));
    return gulp.src([
        'app/images/icon/icon-index.png',
        'app/images/icon/icon-login-reg.png',
        'app/images/icon/contact-help.png',
        'app/images/icon/icon-my.png'
    ]).pipe(gulp.dest('dist/images/icon/'));
});
//=================activity=========================
gulp.task('activity:dev', function () {
    var config = require('./activity.webpack.dev.js');
    var activityConfig = JSON.parse(fs.readFileSync('./config/activity.json'));

    // Start a webpack-dev-server
    var compiler = webpack(config);

    new WebpackDevServer(compiler, {
        historyApiFallback: {
            disableDotRule:true
        }
    }).listen(8090, "localhost", function(err) {
        if(err){
            console.log(err);
        }
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8090/webpack-dev-server/index.html");
        // keep the server alive or continue?
        // cb();
    });
});
gulp.task("activity:build", function(cb) {
    var build = function (cb) {
        var config = require('./activity.webpack.product.js');
        // run webpack
        webpack(config, function(err, stats) {
            if(err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({
                // output options
            }));
            cb(err);
        });
    };
    fs.exists('./dist/activity',function (exists) {
        if(exists){
            rimraf('./dist/activity',function () {
                gutil.log('[activity:build]', 'delete dist/activity');
                build(cb);
            });
        }else {
            build(cb);
        }
    });
});
gulp.task('activity:git:clone',function (cb) {
    fs.exists('./activity', function (exists) {
        if(exists){
            gutil.log('[activity:git]', 'activity exists');
            cb();
        }else{
            git.clone('http://tester:tester@code.asterlake.cn/git/git/wenqiang/xingtouzi_pc_activity.git',
                {args:'activity'}, function (err) {
                    if (err){
                        cb(err);
                    }else{
                        cb();
                    }
                });
        }
    });
});
gulp.task('activity:git:pull',function (cb) {
    git.pull('origin', 'master', {cwd:'./activity'}, function (err) {
        if (err) {
            cb(err);
        }else{
            cb();
        }
    });
});
gulp.task('build:activity',function (cb) {
    seq('activity:git:clone','activity:git:pull','activity:build',cb);
});


//------------- static file   ---------------

gulp.task('spider',function() {

    var options = JSON.parse(fs.readFileSync('./config/spider.json'));
    var rootUrl = GLOBS.appConfig.appRootUrl;

    var currentContent = '';
    var currentUrl = '';
    var static = {};

    spider('/', 1);

    function spider(url, level) {
        if(level > 4){
            return ;
        }
        var client = webdriverio
            .remote(options);

        var mainDone = 0;
        var currentHref;
        client
            .init()
            .url(url)
            .getHTML('html', false).then(function(html){
                    currentContent = html;
                    mainDone +=1;
                })
            .getHTML('a', true)
            .getAttribute('a', 'href').then(function(href){
                    if(href.length > 0 ){
                        currentHref = href;
                    }else{
                        currentHref = [];
                    }
                    mainDone +=1;
                })

            .getUrl().then(function(url){
                currentUrl = url;
                mainDone +=1;
            })
            .end();

        require('deasync').loopWhile(function(){return mainDone<3;});


        if(currentContent && currentUrl){
            var filePath = path.join(__dirname,'static',currentUrl.substring(rootUrl.length+1));
            if(!fs.existsSync(filePath)){
                mkdir.sync(filePath);
                fs.writeFile(path.join(filePath,'index.html'),currentContent,function(err){
                });
            }
        }
        var reg = new RegExp('^'+rootUrl.split('//').join('\/\/'));
        if(currentHref && currentHref.length > 0){
            for(var i=0;i<currentHref.length;i++){
                if(currentHref[i] != null && reg.test(currentHref[i])){
                    if(!fs.existsSync(path.join(__dirname,'static',currentHref[i].substring(rootUrl.length+1)))){
                        spider(currentHref[i], level+1);
                    }
                }
            }
        }
    }

});

