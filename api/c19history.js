const got = require('got');

// API: https://disease.sh/v3/covid-19/historical/all?lastdays=all
module.exports = async (req, res) => {
  const {
    query: { days },
  } = req;
  console.log(days);
  try {
    const { body } = await got(
      `https://disease.sh/v3/covid-19/historical/all?lastdays=${
        days ? days : 30
      }`
    );
    const items = JSON.parse(body);
    const cases = [];
    const recovered = [];
    const deaths = [];
    for (let i in items['cases']) {
      cases.push({ date: i, count: items.cases[i] });
    }
    for (let i in items['recovered']) {
      recovered.push({ date: i, count: items.recovered[i] });
    }
    for (let i in items['deaths']) {
      deaths.push({ date: i, count: items.deaths[i] });
    }
    res.json({ cases, recovered, deaths });
  } catch (ex) {
    res.json({ error: ex.message });
  }
};
