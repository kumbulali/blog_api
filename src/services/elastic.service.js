const elasticClient = require('../config/elastic.connection.config');
const docs = require('../../dummy/posts.json');

function getDayOfWeek(dateString) {
  const date = new Date(dateString),
    daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayOfWeek = daysOfWeek[date.getDay()];

  return dayOfWeek;
}

module.exports.categoryRates = async () => {
  const response = await elasticClient.search({
    index: 'posts',
    body: {
      "size": 0,
      "aggs": {
        "category_percentages": {
          "terms": {
            "field": "category.keyword",
            "size": 10
          }
        }
      }
    }
  });

  const totalDocCount = response.hits.total.value;
  const categoryDocCounts = response.aggregations.category_percentages.buckets;

  const category_percentages = categoryDocCounts.map(categoryDocCounts => {
    return {
      category_name: categoryDocCounts.key,
      category_percentage: parseFloat((categoryDocCounts.doc_count / totalDocCount * 100).toFixed(2))
    };
  })

  return category_percentages;
};

module.exports.userStats = async () => {
  const uniqueUsersResponse = await elasticClient.search({
    index: 'posts',
    body: {
      "size": 0,
      "aggs": {
        "unique_users": {
          "cardinality": {
            "field": "profile.username.keyword"
          }
        }
      }
    }
  });

  const totalUsersCount = await elasticClient.count({ index: 'users' });

  const blogger_users = uniqueUsersResponse.aggregations.unique_users.value;

  return { blogger_users: blogger_users, reader_users: totalUsersCount.count - blogger_users };
};

module.exports.postByTimeThisWeek = async () => {
  const result = await elasticClient.search({
    index: 'posts',
    body: {
      "size": 0,
      "query": {
        "range": {
          "createdAt": {
            "gte": "now-1w/w",
            "lte": "now/w"
          }
        }
      },
      "aggs": {
        "daily_posts": {
          "date_histogram": {
            "field": "createdAt",
            "calendar_interval": "day",
            "format": "yyyy-MM-dd"
          },
          "aggs": {
            "category_terms": {
              "terms": {
                "field": "category.keyword"
              }
            }
          }
        }
      }
    }
  });

  const dailyPosts = result.aggregations.daily_posts.buckets.map(dailyPosts => {
    const categories = dailyPosts.category_terms.buckets.map(category => ({
      category: category.key,
      post_count: category.doc_count
    }));

    return {
      day: getDayOfWeek(dailyPosts.key_as_string),
      totalPostCount: dailyPosts.doc_count,
      categories: categories
    };
  })

  return dailyPosts;
};

module.exports.postByTimeThisMonth = async () => {
  const result = await elasticClient.search({
    index: 'posts',
    body: {
      "size": 0,
      "aggs": {
        "weekly": {
          "date_histogram": {
            "field": "createdAt",
            "calendar_interval": "week",
            "format": "yyyy-MM-dd",
            "time_zone": "UTC",
            "min_doc_count": 0,
            "extended_bounds": {
              "min": "now-4w/w",
              "max": "now/w"
            }
          },
          "aggs": {
            "total_posts": {
              "value_count": {
                "field": "createdAt"
              }
            },
            "categories": {
              "terms": {
                "field": "category.keyword",
                "size": 10
              }
            }
          }
        }
      },
      "query": {
        "range": {
          "createdAt": {
            "gte": "now-1M/M",
            "lte": "now/M"
          }
        }
      }
    }
  });

  const weeklyPosts = result.aggregations.weekly.buckets.map(doc => {
    const categories = doc.categories.buckets.map(category => ({
      category: category.key,
      post_count: category.doc_count
    }));

    return {
      week: doc.key_as_string,
      totalPostCount: doc.doc_count,
      categories: categories
    };
  })

  return weeklyPosts;
};

module.exports.postByTimeThisYear = async () => {
  const result = await elasticClient.search({
    index: 'posts',
    body: {
      "size": 0,
      "aggs": {
        "monthly": {
          "date_histogram": {
            "field": "createdAt",
            "calendar_interval": "month",
            "format": "yyyy-MM",
            "time_zone": "UTC",
            "min_doc_count": 0,
            "extended_bounds": {
              "min": "now-1y/y",
              "max": "now/M"
            }
          },
          "aggs": {
            "total_posts": {
              "value_count": {
                "field": "createdAt"
              }
            },
            "categories": {
              "terms": {
                "field": "category.keyword",
                "size": 10
              }
            }
          }
        }
      },
      "query": {
        "range": {
          "createdAt": {
            "gte": "now-1y/y",
            "lte": "now/y"
          }
        }
      }
    }    
  });

  const monthlyPosts = result.aggregations.monthly.buckets.map(doc => {
    const categories = doc.categories.buckets.map(category => ({
      category: category.key,
      post_count: category.doc_count
    }));

    return {
      week: doc.key_as_string,
      totalPostCount: doc.doc_count,
      categories: categories
    };
  })

  return monthlyPosts;
};

module.exports.createPosts = async () => {
  const promises = docs.map(async doc => {
    return await elasticClient.index({
      index: 'posts',
      body: doc
    })
  })

  return Promise.all(promises);
};