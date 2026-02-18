const axios = require('axios');
const { trustedDomains, RULE_WEIGHTS } = require('../config/constants');

async function evaluateCrossSource(title) {
  const reasons = [];
  let delta = 0;
  let articles = [];

  try {
    const keywords = title.split(/\s+/).slice(0, 6).join(' ');

    const response = await axios.get('https://api.thenewsapi.com/v1/news/all', {
      params: {
        api_token: process.env.NEWS_API_KEY,
        search: keywords,
        language: 'en',
      },
    });

    const data = response.data;
    articles = (data.data || []).map(a => ({
      title: a.title,
      source: a.source || a.domain,
      url: a.url,
      domain: a.domain,
    }));

    const total = articles.length;
    const trustedMatches = articles.filter(a =>
      trustedDomains.some(d => (a.domain || '').includes(d))
    ).length;

    if (trustedMatches >= 2) {
      delta += RULE_WEIGHTS.HAS_TRUSTED_SUPPORT;
      reasons.push('Multiple reputable outlets report similar news.');
    } else if (total === 0) {
      delta += RULE_WEIGHTS.NO_OTHER_SOURCES;
      reasons.push('No similar news found on major outlets.');
    }
  } catch (err) {
    console.error('News API error', err.message);
  }

  return { delta, reasons, articles };
}

module.exports = { evaluateCrossSource };
