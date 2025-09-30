#!/usr/bin/env node

/**
 * Test script to verify GitHub API access
 * This validates our workflow logic before importing to n8n
 */

const https = require('https');

function makeGitHubRequest(repoPath, repoName) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${repoPath}/releases?per_page=5`,
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Vue-Nuxt-News-Collector-Test'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const releases = JSON.parse(data);
          console.log(`\n🔍 ${repoName} Releases:`);
          console.log(`Status: ${res.statusCode}`);
          console.log(`Rate limit remaining: ${res.headers['x-ratelimit-remaining'] || 'Unknown'}`);
          
          if (Array.isArray(releases)) {
            console.log(`Found ${releases.length} releases:`);
            releases.forEach((release, index) => {
              console.log(`  ${index + 1}. ${release.tag_name} (${release.published_at?.substring(0, 10)})`);
              if (index === 0) {
                console.log(`     📝 ${release.name || 'No name'}`);
                console.log(`     🔗 ${release.html_url}`);
                console.log(`     📦 ${release.assets?.length || 0} assets`);
              }
            });
          } else {
            console.log('❌ No releases array found');
            console.log('Response:', data.substring(0, 200) + '...');
          }
          
          resolve(releases);
        } catch (error) {
          console.log('❌ JSON parse error:', error.message);
          console.log('Raw response:', data.substring(0, 200));
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ Request error for ${repoName}:`, error.message);
      reject(error);
    });

    req.end();
  });
}

async function testGitHubAPI() {
  console.log('🚀 Testing GitHub API Access');
  console.log('============================');
  
  try {
    // Test Vue.js releases
    const vueReleases = await makeGitHubRequest('vuejs/core', 'Vue.js');
    
    // Test Nuxt.js releases  
    const nuxtReleases = await makeGitHubRequest('nuxt/nuxt', 'Nuxt.js');
    
    console.log('\n📊 Summary:');
    console.log(`Vue.js releases found: ${Array.isArray(vueReleases) ? vueReleases.length : 0}`);
    console.log(`Nuxt.js releases found: ${Array.isArray(nuxtReleases) ? nuxtReleases.length : 0}`);
    
    if (Array.isArray(vueReleases) && vueReleases.length > 0) {
      console.log(`Latest Vue.js: ${vueReleases[0].tag_name}`);
    }
    
    if (Array.isArray(nuxtReleases) && nuxtReleases.length > 0) {
      console.log(`Latest Nuxt.js: ${nuxtReleases[0].tag_name}`);
    }
    
    console.log('\n✅ GitHub API test completed successfully!');
    console.log('🎯 Ready to import workflow to n8n');
    
  } catch (error) {
    console.log('\n❌ GitHub API test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testGitHubAPI();