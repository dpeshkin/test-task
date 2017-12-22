const gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  pug = require("gulp-pug"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  gulpWebpack = require("gulp-webpack"),
  webpack = require("webpack"),
  webpackConfig = require("./webpack.config.js"),
  svgSprite = require("gulp-svg-sprites"),
  svgmin = require("gulp-svgmin"),
  cheerio = require("gulp-cheerio"),
  replace = require("gulp-replace"),
  del = require("del");

//paths
const paths = {
  root: "./docs",
  styles: {
    src: "src/styles/**/*.scss",
    dest: "docs/assets/styles/"
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "docs/assets/scripts/"
  },
  templates: {
    src: "src/templates/",
    dest: "docs/assets/"
  },
  images: {
    src: "src/images/**/*.{jpg,svg,png}",
    dest: "docs/assets/images/"
  },
  fonts: {
    src: "src/fonts/**/*.*",
    dest: "docs/assets/fonts/"
  },
  icons: {
    src: "src/icons/*.svg",
    dest: "src/images/"
  }
};

// CLEAN
gulp.task("clean", function clean() {
  return del(paths.root);
});

// SCRIPTS
gulp.task("scripts", function() {
  return gulp
    .src("src/scripts/app.js")
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
});

// SERVER
gulp.task("server", function() {
  browserSync.init({
    server: paths.root
  });
  browserSync.watch(paths.root + "/**/*.*", browserSync.reload);
});

// PUG
gulp.task("html", function() {
  return gulp
    .src(paths.templates.src + "*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.root));
});

// SASS
gulp.task("styles", function() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
});

// dest images
gulp.task("images", function() {
  return gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest));
});

// dest fonts
gulp.task("fonts", function() {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
});

//SVG Sprite
gulp.task("sprite", function() {
  return gulp
    .src(paths.icons.src)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true
        }
      })
    )
    .pipe(
      cheerio({
        run: function($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: { xmlMode: true }
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgSprite({
        mode: "symbols",
        svg: {
          symbols: "icons/sprite.svg"
        }
      })
    )
    .pipe(gulp.dest(paths.icons.dest));
});

const watch = () => {
  gulp.watch(paths.scripts.src, ["scripts"]);
  gulp.watch(paths.styles.src, ["styles"]);
  gulp.watch(paths.templates.src + "**/*.pug", ["html"]);
};

gulp.task("default", ["server", "styles", "html", "images", "fonts"], watch());
