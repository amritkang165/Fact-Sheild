const trustedDomains = [
  'bbc.com',
  'reuters.com',
  'thehindu.com',
  'indianexpress.com',
  'ndtv.com',
];

const riskyDomains = [
   'reddit.com',
  'quora.com',
  'opindia.com',
  'postcard.news',
  'infowars.com',
  'naturalnews.com',
  'buzzfeed.com',
  'upworthy.com',
  'breitbart.com'
];

const RULE_WEIGHTS = {
  SOURCE_TRUSTED: -20,
  SOURCE_RISKY: 30,
  CLICKBAIT_TITLE: 15,
  MANY_EXCLAMATIONS: 10,
  VERY_SHORT_ARTICLE: 15,
  NO_REFERENCES: 10,
  NO_OTHER_SOURCES: 15,
  HAS_TRUSTED_SUPPORT: -20,
};

module.exports = { trustedDomains, riskyDomains, RULE_WEIGHTS };
