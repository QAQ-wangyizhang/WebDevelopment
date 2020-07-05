/*
 * @Author: your name
 * @Date: 2020-07-04 15:17:37
 * @LastEditTime: 2020-07-04 15:52:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\包管理\包的管理\简单数据爬虫\getMovies.js
 */
const axios = require("axios");
const cheerio = require("cheerio");
async function getMovies() {
    const resp = await axios.get("https://movie.douban.com/chart");
    return resp.data;
}
async function getMoviesData() {
    const html = await getMovies();
    const $ = cheerio.load(html);
    var text = $("tr.item");
    let movies = [];
    for (let i = 0; i < text.length; i++) {
        let tr = text[i];
        // 分析每个tr的数据
        let m = getMovie($(tr));
        movies.push(m);
    }
    return movies;
}

function getMovie(tr) {
    let name = tr.find("div.pl2 a").text();
    name = name.replace(/\s/g, "");
    name = name.split("/")[0];
    let imgSrc = tr.find("a.nbg img").attr("src");
    let detail = tr.find("div.pl2 p.pl").text();
    //    console.log(detail);
    //    console.log(imgSrc);
    //    console.log(name);
    return {
        name,
        imgSrc,
        detail
    }
}
// async function test(){
//     const html = await getMovies();
//     console.log(html);
// }
// test();

module.exports = getMoviesData;