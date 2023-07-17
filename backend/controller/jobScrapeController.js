const cheerio = require("cheerio");
const axios = require("axios");

const linkedin = async (req, res) => {
  const start = req.query.start || 0;
  const url = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/react.js-jobs-worldwide?position=1&pageNum=0&currentJobId=3575090751&start=${start}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const jobs = [];
    $(".job-search-card").each((_, el) => {
      const job = {};
      const info = $(el).children(".base-search-card__info");
      job.title = info.children(".base-search-card__title").text().trim();
      job.company = info
        .children(".base-search-card__subtitle")
        .children("a")
        .text()
        .trim();
      const metadata = info.children(".base-search-card__metadata");
      job.location = metadata
        .children(".job-search-card__location")
        .text()
        .trim();
      job.posted = metadata.children("time").text().trim();
      job.logo = $(el)
        .children(".search-entity-media")
        .children("img")
        .attr("data-delayed-url");
      job.link = $(el).find(".base-card__full-link").attr("href");
      jobs.push(job);
    });
    return res.status(200).json({ jobs });
  } catch (err) {
    return res.status(500).json({ message: "Unable to scrape li jobs" });
  }
};

const wttj = async (req, res) => {
  const start = req.query.start || 0;
  const url = `https://www.welcometothejungle.com/en/jobs?page=1&refinementList%5Boffices.country_code%5D%5B%5D=FR&aroundQuery=France&query=web%20software`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const jobs = [];
    $(".ais-Hits-list-item").each((_, el) => {
        // console.log(el.find(".wui-text").text().trim());
      const job = {};
      job.title = $(el).find(".sc-cyRfQX.hlqow9-0.iAQSkJ").text().trim();
      job.company = $(el)
        .find(".sc-cwVcKo.GaPTn.sc-6i2fyx-3.gqcfmt.wui-text")
        .text()
        .trim();
      job.location = $(el).find(".sc-68sumg-0.hgLpfK").text().trim();
      job.posted = $(el)
        .find("sc-cwVcKo.yubgT.wui-text")
        .children("time")
        .children("span")
        .text()
        .trim();
      job.logo = $(el)
        .find(".sc-6i2fyx-2.jZHcXN")
        .children("img")
        .attr("src");
      job.link = $(el).find(".base-card__full-link").attr("href");
      jobs.push(job);
    });
    return res.status(200).json({ jobs });
  } catch (err) {
    return res.status(500).json({ message: "Unable to scrape wttj jobs" });
  }
};
module.exports = { linkedin, wttj };
