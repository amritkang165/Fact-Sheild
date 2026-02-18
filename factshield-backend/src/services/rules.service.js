const { trustedDomains, riskyDomains, RULE_WEIGHTS } = require('../config/constants');

function evaluateSource(domain) {
  let delta = 0;
  const reasons = [];

  if (trustedDomains.some(d => domain.includes(d))) {
    delta += RULE_WEIGHTS.SOURCE_TRUSTED;
    reasons.push('Source is in reputable news list.');
  }

  if (riskyDomains.some(d => domain.includes(d))) {
    delta += RULE_WEIGHTS.SOURCE_RISKY;
    reasons.push('Source is in low-credibility / clickbait list.');
  }

  return { delta, reasons };
}

function evaluateHeadline(title) {
  let delta = 0;
  const reasons = [];

  const exclamations = (title.match(/!/g) || []).length;
  if (exclamations >= 3) {
    delta += RULE_WEIGHTS.MANY_EXCLAMATIONS;
    reasons.push('Headline uses many exclamation marks.');
  }

  const words = title.split(/\s+/);
  const allCapsWords = words.filter(w => w.length >= 4 && w === w.toUpperCase());
  if (allCapsWords.length >= 3) {
    delta += RULE_WEIGHTS.CLICKBAIT_TITLE;
    reasons.push('Headline uses a lot of ALL CAPS words (sensational style).');
  }

  const clickbaitPhrases = ['SHOCKING', 'YOU WON\'T BELIEVE', 'BREAKING', 'MUST SEE'];
  const upperTitle = title.toUpperCase();
  if (clickbaitPhrases.some(p => upperTitle.includes(p))) {
    delta += RULE_WEIGHTS.CLICKBAIT_TITLE;
    reasons.push('Headline contains clickbait phrases.');
  }

  return { delta, reasons };
}

function evaluateContent(text) {
  let delta = 0;
  const reasons = [];

  const words = text.split(/\s+/);
  const wordCount = words.length;

  const bigKeywords = ['government', 'election', 'vaccine', 'covid', 'war', 'terrorist', 'scam'];
  const hasBigKeyword = bigKeywords.some(k => text.toLowerCase().includes(k));

  if (wordCount < 150 && hasBigKeyword) {
    delta += RULE_WEIGHTS.VERY_SHORT_ARTICLE;
    reasons.push('Article is very short for a serious topic.');
  }

  const hasReferenceWords = /(according to|reported by|source:|sources say)/i.test(text);
  const hasLinks = /https?:\/\//i.test(text);

  if (!hasReferenceWords && !hasLinks) {
    delta += RULE_WEIGHTS.NO_REFERENCES;
    reasons.push('Article has no references or links to sources.');
  }

  return { delta, reasons };
}

function combineScores(results) {
  let risk = 50;
  let reasons = [];

  for (const r of results) {
    risk += r.delta;
    reasons = reasons.concat(r.reasons || []);
  }

  if (risk < 0) risk = 0;
  if (risk > 100) risk = 100;

  let label = 'medium';
  if (risk < 30) label = 'low';
  else if (risk > 60) label = 'high';

  return { risk, label, reasons };
}

module.exports = { evaluateSource, evaluateHeadline, evaluateContent, combineScores };
