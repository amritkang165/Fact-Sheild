const Check = require('../models/Check');
const { fetchArticleFromUrl, buildFromText } = require('../services/article.service');
const { evaluateSource, evaluateHeadline, evaluateContent, combineScores } = require('../services/rules.service');
const { evaluateCrossSource } = require('../services/newsapi.service');

async function checkNews(req, res) {
  try {
    console.log("Received request:", req.body);

    const { url, text } = req.body;
    if (!url && !text) {
      return res.status(400).json({ message: 'Provide url or text' });
    }

    let article;
    if (url) {
      console.log("Fetching article from URL...");
      article = await fetchArticleFromUrl(url);
    } else {
      console.log("Building article from text...");
      article = buildFromText(text);
    }

    const { title, text: content, domain } = article;
    console.log("Article processed:", title);

    const sourceResult = evaluateSource(domain);
    const headlineResult = evaluateHeadline(title);
    const contentResult = evaluateContent(content);
    console.log("Local rules evaluated");

    console.log("Evaluating cross-source...");
    const crossResult = await evaluateCrossSource(title);
    console.log("Cross-source evaluation done");

    const combined = combineScores([
      sourceResult,
      headlineResult,
      contentResult,
      { delta: crossResult.delta, reasons: crossResult.reasons },
    ]);

    console.log("Combined score:", combined);

    const doc = await Check.create({
      url: url || null,
      title,
      domain,
      risk: combined.risk,
      label: combined.label,
      reasons: combined.reasons,
      supportingArticles: crossResult.articles.map(a => ({
        title: a.title,
        source: a.source,
        url: a.url,
      })),
    });

    console.log("Document saved to DB");
    res.json(doc);

  } catch (err) {
    console.error("Error in checkNews:", err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { checkNews };
