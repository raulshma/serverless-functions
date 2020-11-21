const got = require('got');

// API: https://github.com/M-Media-Group/Covid-19-API
module.exports = async (req, res) => {
  const {
    query: { country },
  } = req;
  try {
    const response = await got(
      `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`
    );
    return res.json({
      ...JSON.parse(response.body),
    });
  } catch (error) {
    return res.json({
      ...JSON.parse(error.response.body),
    });
  }
};
