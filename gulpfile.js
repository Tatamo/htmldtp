"use strict";
const gulp = require("gulp");
const nunjucks = require("nunjucks");
const gulp_nunjucks = require('gulp-nunjucks');
const nunjucks_markdown = require("nunjucks-markdown");
const marked = require("marked");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const cssnext = require("postcss-cssnext");
const stylelint = require("stylelint");
const browsersync = require("browser-sync").create();
const plumber = require("gulp-plumber");

gulp.task("nunjucks", () => {
	const nm_env = new nunjucks.Environment(new nunjucks.FileSystemLoader("src"));
	nunjucks_markdown.register(nm_env, marked);

	return gulp.src(["src/**/*.@(njk|html)","!src/**/_*.@(njk|html)"])
		.pipe(plumber())
		.pipe(gulp_nunjucks.compile("", {env: nm_env}))
		.pipe(rename({extname: ".html"}))
		.pipe(gulp.dest("dist/"))
		.pipe(browsersync.stream());
});

gulp.task("watch-nunjucks", ["nunjucks"], () => {
	gulp.watch(["src/**/*.@(njk|html)"], ["nunjucks"]);
});

gulp.task("postcss", () => {
	const plugins = [
		stylelint(),
		cssnext()
	];
	gulp.src("src/style/**/*.css")
		.pipe(plumber())
		.pipe(postcss(plugins))
		.pipe(gulp.dest("dist/style"))
		.pipe(browsersync.stream());
});

gulp.task("watch-postcss", ["postcss"], () => {
	gulp.watch("src/style/**/*.css", ["postcss"]);
});

gulp.task("static", ()=>{
	gulp.src("static/**/*")
		.pipe(gulp.dest("dist/"));
});

gulp.task("watch-static", ["static"], ()=>{
	gulp.watch("static/**/*", ["static"]);
});

gulp.task("browser-sync", () => {
	browsersync.init({server: {baseDir: "./dist"}});
});

gulp.task("default", ["nunjucks", "postcss", "static"]);
gulp.task("watch", ["watch-nunjucks", "watch-postcss", "watch-static"]);
gulp.task("serve", ["browser-sync", "watch"]);

