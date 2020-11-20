const {
  getVedantComputers,
  getAmazon,
  getItDepot,
  getMdComputers,
  getPrimeAbgb,
  getPcAdda,
  getPcShop,
} = require('../helpers/pricesFunctions');

module.exports = async (req, res) => {
  const {
    query: { search },
  } = req;
  data = await Promise.all([
    getPrimeAbgb(search),
    getMdComputers(search),
    getAmazon(search),
    getItDepot(search),
    getVedantComputers(search),
    getPcShop(search),
    getPcAdda(search),
  ]);
  res.json({
    data,
  });
};
