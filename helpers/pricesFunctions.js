const cheerio = require('cheerio');
const got = require('got');

const URLS = {
  primeabgb: (search) =>
    `https://www.primeabgb.com/?post_type=product&taxonomy=product_cat&s=${search}`,
  mdComputers: (search) =>
    `https://mdcomputers.in/index.php?category_id=0&search=${search}&submit_search=&route=product%2Fsearch`,
  amazon: (search) => `https://www.amazon.in/s?k=${search}`,
  itDepot: (search) =>
    `https://www.theitdepot.com/search.html?keywords=${search}`,
  vedantComputers: (search) =>
    `https://www.vedantcomputers.com/index.php?route=product/search&search=${search}&description=true`,
  pcshop: (search) =>
    `https://www.pcshop.in/?orderby=popularity&paged=1&s=${search}&product_cat=0&post_type=product`,
  pcadda: (search) =>
    `https://www.pcadda.com/?category=&s=${search}&search_posttype=product`,
};

const getPage = async (link) => {
  const res = await got(link);
  return cheerio.load(res.body);
};

const getPrimeAbgb = async (search) => {
  try {
    const $ = await getPage(URLS.primeabgb(search));
    const item = $(
      'li.product-item div.product-innfo > span > ins > span'
    ).html();
    const itemLink = $('li.product-item div.product-innfo > h3 > a').attr(
      'href'
    );
    const itemName = $('li.product-item div.product-innfo > h3 > a')
      .html()
      .trim();
    const idx = item.lastIndexOf('>') + 1;
    const amount = Number(
      item.substring(idx, item.length).replace(',', '').trim()
    );
    return {
      success: true,
      site: 'primeabgb',
      name: itemName,
      price: amount,
      link: itemLink,
    };
  } catch (e) {
    return { success: false, site: 'primeabgb' };
  }
};

const getMdComputers = async (search) => {
  try {
    const $ = await getPage(URLS.mdComputers(search));
    const itemLink = $(
      '#content > div.products-category > div.products-list.row.nopadding-xs > div:nth-child(1) > div > div.right-block.right-b > h4 > a'
    ).attr('href');
    const itemName = $(
      '#content > div.products-category > div.products-list.row.nopadding-xs > div:nth-child(1) > div > div.right-block.right-b > h4 > a'
    )
      .html()
      .trim();
    const amount = Number(
      $(
        '#content > div.products-category > div.products-list.row.nopadding-xs > div:nth-child(1) > div > div.right-block.right-b > div.price > span.price-new'
      )
        .html()
        .replace('&#x20B9;', '')
        .replace(',', '')
        .trim()
    );
    return {
      success: true,
      site: 'mdcomputers',
      name: itemName,
      price: amount,
      link: itemLink,
    };
  } catch (e) {
    return { success: false, site: 'mdcomputers' };
  }
};

const getAmazon = async (search) => {
  try {
    const $ = await getPage(URLS.amazon(search));
    const itemLink = $(
      '#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(4) > div > span > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(1) > div > div > div:nth-child(1) > h2 > a'
    ).attr('href');
    const itemName = $(
      '#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(4) > div > span > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(1) > div > div > div:nth-child(1) > h2 > a > span'
    )
      .html()
      .trim();
    const amount = Number(
      $(
        '#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(4) > div > span > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(2) > div.sg-col-4-of-24.sg-col-4-of-12.sg-col-4-of-36.sg-col-4-of-28.sg-col-4-of-16.sg-col.sg-col-4-of-20.sg-col-4-of-32 > div > div.a-section.a-spacing-none.a-spacing-top-small > div.a-row.a-size-base.a-color-base > div > div > a > span:nth-child(1) > span.a-offscreen'
      )
        .html()
        .replace('&#x20B9;', '')
        .replace(',', '')
        .trim()
    );

    return {
      success: true,
      site: 'Amazon',
      name: itemName,
      price: amount,
      link: `https://www.amazon.in${itemLink}`,
    };
  } catch (e) {
    return { success: false, site: 'Amazon' };
  }
};

const getItDepot = async (search) => {
  try {
    const $ = await getPage(URLS.itDepot(search));
    const itemLink = $(
      '#filter_display div.card-body > div > div.product-details > div.card-text.product_title > a'
    ).attr('href');
    const itemName = $(
      '#filter_display div.card-body > div > div.product-details > div.card-text.product_title > a'
    )
      .html()
      .trim();
    const amountEle = $(
      '#filter_display div.card-body > div > div.product-details > div:nth-child(3) > strong'
    ).html();
    const amount = Number(
      amountEle
        .substring(amountEle.lastIndexOf('>') + 1, amountEle.length)
        .trim()
    );
    return {
      success: true,
      site: 'THEITDEPOT',
      name: itemName,
      price: amount,
      link: `https://theitdepot.com/${itemLink}`,
    };
  } catch (e) {
    return { success: false, site: 'THEITDEPOT' };
  }
};

const getVedantComputers = async (search) => {
  try {
    const $ = await getPage(URLS.vedantComputers(search));
    const itemLink = $(
      '#content > div.main-products-wrapper > div.main-products.product-grid > div:nth-child(1) > div > div.caption > div.name > a'
    ).attr('href');
    const itemName = $(
      '#content > div.main-products-wrapper > div.main-products.product-grid > div:nth-child(1) > div > div.caption > div.name > a'
    )
      .html()
      .trim();
    const amount = Number(
      $(
        '#content > div.main-products-wrapper > div.main-products.product-grid > div:nth-child(1) > div > div.caption > div.price > span'
      )
        .html()
        .replace('&#x20B9;', '')
        .replace(',', '')
        .trim()
    );
    return {
      success: true,
      site: 'VEDANT COMPUTERS',
      name: itemName,
      price: amount,
      link: itemLink,
    };
  } catch (e) {
    return { success: false, site: 'VEDANT COMPUTERS' };
  }
};

const getPcShop = async (search) => {
  try {
    const $ = await getPage(URLS.pcshop(search));
    const itemLink = $(
      '#main > ul > li.product.type-product.status-publish.first.purchasable.product-type-simple > div > div > div.product-loop-header.product-item__header > a'
    ).attr('href');
    const itemName = $(
      '#main > ul > li.product.type-product.status-publish.first.purchasable.product-type-simple > div > div > div.product-loop-header.product-item__header > a > h2'
    )
      .html()
      .trim();
    const amountEle = $(
      '#main > ul > li.product.type-product.status-publish.first.purchasable.product-type-simple > div > div > div.product-loop-footer.product-item__footer > div.price-add-to-cart > span > span > ins > span > bdi'
    ).html();
    const amount = Number(
      amountEle
        .substring(amountEle.lastIndexOf('>') + 1, amountEle.length)
        .replace('&#x20B9;', '')
        .replace(',', '')
        .trim()
    );
    return {
      success: true,
      site: 'pcshop',
      name: itemName,
      price: amount,
      link: itemLink,
    };
  } catch (e) {
    return { success: false, site: 'pcshop' };
  }
};

const getPcAdda = async (search) => {
  try {
    const $ = await getPage(URLS.pcadda(search));
    const itemLink = $(
      '#loop-products > li:nth-child(1) > div > div > div > div.item-content > h4 > a'
    ).attr('href');
    const itemName = $(
      '#loop-products > li:nth-child(1) > div > div > div > div.item-content > h4 > a'
    )
      .html()
      .trim();
    const amountEle = $(
      '#loop-products > li:nth-child(1) > div > div > div > div.item-content > div.item-price > span > span > bdi'
    ).html();
    const amount = Number(
      amountEle
        .substring(amountEle.lastIndexOf('>') + 1, amountEle.length)
        .replace('&#x20B9;', '')
        .replace(',', '')
        .trim()
    );
    return {
      success: true,
      site: 'pcadda',
      name: itemName,
      price: amount,
      link: itemLink,
    };
  } catch (e) {
    return { success: false, site: 'pcshop' };
  }
};

module.exports = {
  getVedantComputers,
  getAmazon,
  getItDepot,
  getMdComputers,
  getPrimeAbgb,
  getPcShop,
  getPcAdda,
};
