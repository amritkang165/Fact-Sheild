const axios = require('axios');
const cheerio = require('cheerio');

async function fetchArticleFromUrl(url) {
  const domain = new URL(url).hostname;
  const { data: html } = await axios.get(url);

  const $ = cheerio.load(html);

  let title =
    $('meta[property="og:title"]').attr('content') ||
    $('title').text() ||
    '';

  // Simple text extraction: get all paragraphs
  let text = '';
  $('p').each((i, el) => {
    const t = $(el).text();
    if (t.length > 50) {
      text += t + '\n';
    }
  });

  return { title: title.trim(), text: text.trim(), domain };
}

function buildFromText(text) {
  const words = text.split(/\s+/);
  const title = words.slice(0, 12).join(' ') + (words.length > 12 ? '...' : '');
  return { title, text, domain: 'user_content' };
}

module.exports = { fetchArticleFromUrl, buildFromText };
