let gulp = require('gulp'),
    scss = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    stylelint = require('gulp-stylelint');

gulp.task('lint', () =>
    gulp.src(bases.scss + 'app/scss.scss')
    .pipe(stylelint({
        failAfterError: true,
        reporters: [{
            formatter: 'verbose',
            console: true
        }],
        debug: true
    }));
);

gulp.task('scss', function () {
    gulp.src('app/scss/style.scss')
        .pipe(scss())
        .pipe(gulp.dest('app/css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task('runBrSynk', function () {
    browserSync.init({
        server: {
            baseDir: "app"
        },
        // tunnel: true,
        // host: 'localhost'
    })
});

gulp.task('autoprefixer', function () {
    gulp.src('app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
});

gulp.task('watch', ['runBrSynk', 'scss', 'autoprefixer'], function () {
    gulp.watch('app/scss/*.scss', ['scss']);
    gulp.watch('app/scss/*.scss', ['autoprefixer']);
    gulp.watch('app/*.html', browserSync.reload);
});