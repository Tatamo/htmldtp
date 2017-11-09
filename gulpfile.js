"use strict";
const gulp = require("gulp");

const nunjucks = require("nunjucks");
const gulp_nunjucks = require('gulp-nunjucks');
const nunjucks_markdown = require("nunjucks-markdown");
const marked = require("marked");
const rename = require("gulp-rename");

const nm_env = new nunjucks.Environment(new nunjucks.FileSystemLoader("src"));
nunjucks_markdown.register(nm_env, marked);

gulp.task("nunjucks", () => {
	return gulp.src(["src/**/*.@(njk|html)", "!src/**/_*.@(njk|html)"])
		.pipe(gulp_nunjucks.compile("", {env: nm_env}))
		.pipe(rename({extname: ".html"}))
		.pipe(gulp.dest("dist/"));
});

gulp.task("watch-nunjucks", ["nunjucks"], () => {
	gulp.watch(["src/**/*.@(njk|html)", "!src/**/_*.@(njk|html)"], ["nunjucks"]);
});

const postcss = require("gulp-postcss");
const cssnext = require("postcss-cssnext");
const stylelint = require("stylelint");

gulp.task("postcss", () => {
	const plugins = [
		stylelint(),
		cssnext()
	];
	gulp.src("src/style/**/*.css")
		.pipe(postcss(plugins))
		.pipe(gulp.dest("dist/style"));
});

gulp.task("watch-postcss", ["postcss"], () => {
	gulp.watch("src/style/**/*.css", ["css"]);
});

gulp.task("default", ["nunjucks", "postcss"]);
gulp.task("watch", ["watch-nunjucks", "watch-postcss"]);
