#!/usr/bin/env node

/**
 * Test script to validate the workflow data processing logic
 * This simulates what happens inside n8n nodes
 */

const https = require('https');

// Simulate the "Process Release Data" node logic
function processReleaseData(vueReleases, nuxtReleases) {
  const processedReleases = [];
  
  // Process Vue.js releases
  for (const release of vueReleases) {
    const processedRelease = {
      framework: 'Vue.js',
      version: release.tag_name,
      name: release.name || release.tag_name,
      description: release.body ? release.body.substring(0, 200) + '...' : 'No description available',
      published_date: release.published_at,
      html_url: release.html_url,
      draft: release.draft,
      prerelease: release.prerelease,
      author: release.author ? release.author.login : 'Unknown',
      assets_count: release.assets ? release.assets.length : 0,
      download_count: release.assets ? 
        release.assets.reduce((sum, asset) => sum + (asset.download_count || 0), 0) : 0,
      created_at: release.created_at,
      repository: 'vuejs/core'
    };
    processedReleases.push(processedRelease);
  }
  
  // Process Nuxt.js releases
  for (const release of nuxtReleases) {
    const processedRelease = {
      framework: 'Nuxt.js',
      version: release.tag_name,
      name: release.name || release.tag_name,
      description: release.body ? release.body.substring(0, 200) + '...' : 'No description available',
      published_date: release.published_at,
      html_url: release.html_url,
      draft: release.draft,
      prerelease: release.prerelease,
      author: release.author ? release.author.login : 'Unknown',
      assets_count: release.assets ? release.assets.length : 0,
      download_count: release.assets ? 
        release.assets.reduce((sum, asset) => sum + (asset.download_count || 0), 0) : 0,
      created_at: release.created_at,
      repository: 'nuxt/nuxt'
    };
    processedReleases.push(processedRelease);
  }
  
  // Sort by published date (newest first)
  processedReleases.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
  
  return processedReleases;
}

// Simulate the "Create Summary" node logic
function createSummary(processedReleases) {
  const vueReleases = processedReleases.filter(r => r.framework === 'Vue.js');
  const nuxtReleases = processedReleases.filter(r => r.framework === 'Nuxt.js');
  
  const summary = {
    total_releases: processedReleases.length,
    vue_releases: vueReleases.length,
    nuxt_releases: nuxtReleases.length,
    latest_vue: vueReleases.length > 0 ? vueReleases[0] : null,
    latest_nuxt: nuxtReleases.length > 0 ? nuxtReleases[0] : null,
    collection_timestamp: new Date().toISOString(),
    releases: processedReleases
  };
  
  return summary;
}

// Function to fetch GitHub releases
function fetchGitHubReleases(repoPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${repoPath}/releases?per_page=3`,
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Vue-Nuxt-News-Collector-Workflow-Test'
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
          resolve(Array.isArray(releases) ? releases : []);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function testWorkflowLogic() {
  console.log('🧪 Testing n8n Workflow Logic');
  console.log('==============================');
  
  try {
    console.log('\n1️⃣ Fetching Vue.js releases...');
    const vueReleases = await fetchGitHubReleases('vuejs/core');
    console.log(`   ✅ Fetched ${vueReleases.length} Vue.js releases`);
    
    console.log('\n2️⃣ Fetching Nuxt.js releases...');
    const nuxtReleases = await fetchGitHubReleases('nuxt/nuxt');
    console.log(`   ✅ Fetched ${nuxtReleases.length} Nuxt.js releases`);
    
    console.log('\n3️⃣ Processing release data...');
    const processedReleases = processReleaseData(vueReleases, nuxtReleases);
    console.log(`   ✅ Processed ${processedReleases.length} total releases`);
    
    console.log('\n4️⃣ Creating summary...');
    const summary = createSummary(processedReleases);
    console.log(`   ✅ Summary created with ${summary.total_releases} releases`);
    
    console.log('\n📊 Workflow Test Results:');
    console.log('=========================');
    console.log(`Total releases: ${summary.total_releases}`);
    console.log(`Vue.js releases: ${summary.vue_releases}`);
    console.log(`Nuxt.js releases: ${summary.nuxt_releases}`);
    
    if (summary.latest_vue) {
      console.log(`Latest Vue.js: ${summary.latest_vue.version} (${summary.latest_vue.published_date.substring(0, 10)})`);
    }
    
    if (summary.latest_nuxt) {
      console.log(`Latest Nuxt.js: ${summary.latest_nuxt.version} (${summary.latest_nuxt.published_date.substring(0, 10)})`);
    }
    
    console.log(`Collection time: ${summary.collection_timestamp}`);
    
    console.log('\n🔍 Sample Processed Release:');
    if (processedReleases.length > 0) {
      const sample = processedReleases[0];
      console.log(`Framework: ${sample.framework}`);
      console.log(`Version: ${sample.version}`);
      console.log(`Repository: ${sample.repository}`);
      console.log(`Published: ${sample.published_date.substring(0, 10)}`);
      console.log(`URL: ${sample.html_url}`);
      console.log(`Assets: ${sample.assets_count}`);
      console.log(`Draft: ${sample.draft}`);
      console.log(`Prerelease: ${sample.prerelease}`);
    }
    
    console.log('\n✅ Workflow logic test completed successfully!');
    console.log('🎯 Ready to import to n8n and test in the UI');
    
    // Validation
    const validationErrors = [];
    if (summary.total_releases === 0) validationErrors.push('No releases found');
    if (summary.vue_releases === 0) validationErrors.push('No Vue.js releases found');
    if (summary.nuxt_releases === 0) validationErrors.push('No Nuxt.js releases found');
    if (!summary.latest_vue) validationErrors.push('No latest Vue.js release');
    if (!summary.latest_nuxt) validationErrors.push('No latest Nuxt.js release');
    
    if (validationErrors.length > 0) {
      console.log('\n❌ Validation Errors:');
      validationErrors.forEach(error => console.log(`   - ${error}`));
    } else {
      console.log('\n✅ All validations passed!');
    }
    
  } catch (error) {
    console.log('\n❌ Workflow logic test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testWorkflowLogic();