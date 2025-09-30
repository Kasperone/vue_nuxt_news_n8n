#!/usr/bin/env node

/**
 * Test script for enhanced formatting outputs
 * Tests Slack message and Obsidian note generation
 */

const https = require('https');

// Mock recent release data for testing
const mockReleases = [
  {
    framework: 'Vue.js',
    version: 'v3.5.22',
    name: 'v3.5.22',
    published_date: '2025-09-25T10:00:00Z',
    published_date_formatted: 'September 25, 2025',
    html_url: 'https://github.com/vuejs/core/releases/tag/v3.5.22',
    description: 'Bug fixes and performance improvements...',
    version_type: 'Stable',
    repository: 'vuejs/core',
    prerelease: false,
    draft: false
  },
  {
    framework: 'Nuxt.js',
    version: 'v4.1.2',
    name: 'v4.1.2',
    published_date: '2025-09-12T15:30:00Z',
    published_date_formatted: 'September 12, 2025',
    html_url: 'https://github.com/nuxt/nuxt/releases/tag/v4.1.2',
    description: 'New features and bug fixes for Nuxt 4...',
    version_type: 'Stable',
    repository: 'nuxt/nuxt',
    prerelease: false,
    draft: false
  }
];

function createSlackMessage(releases) {
  const vueReleases = releases.filter(r => r.framework === 'Vue.js');
  const nuxtReleases = releases.filter(r => r.framework === 'Nuxt.js');
  
  const currentWeek = new Date();
  const oneWeekAgo = new Date(currentWeek.getTime() - (7 * 24 * 60 * 60 * 1000));
  
  const recentReleases = releases.filter(r => 
    new Date(r.published_date) > oneWeekAgo
  );

  const slackMessage = {
    text: '🚀 Weekly Vue.js & Nuxt.js Releases Summary',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🚀 Vue.js & Nuxt.js Weekly Release Summary'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `📊 *Summary for ${currentWeek.toLocaleDateString('en-US')}*\n• Total releases checked: ${releases.length}\n• Vue.js releases: ${vueReleases.length}\n• Nuxt.js releases: ${nuxtReleases.length}\n• Recent releases (last 7 days): ${recentReleases.length}`
        }
      }
    ]
  };

  if (recentReleases.length > 0) {
    slackMessage.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*🆕 Recent Releases:*'
      }
    });
    
    recentReleases.slice(0, 5).forEach(release => {
      const emoji = release.framework === 'Vue.js' ? '💚' : '🟢';
      slackMessage.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${emoji} *${release.framework} ${release.version}*\n📅 ${release.published_date_formatted}\n🔗 <${release.html_url}|View Release>`
        }
      });
    });
  }

  // Add latest versions
  if (vueReleases.length > 0 || nuxtReleases.length > 0) {
    let latestText = '*📋 Current Latest Versions:*\n';
    if (vueReleases.length > 0) {
      latestText += `💚 Vue.js: ${vueReleases[0].version} (${vueReleases[0].published_date_formatted})\n`;
    }
    if (nuxtReleases.length > 0) {
      latestText += `🟢 Nuxt.js: ${nuxtReleases[0].version} (${nuxtReleases[0].published_date_formatted})\n`;
    }
    
    slackMessage.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: latestText
      }
    });
  }

  return slackMessage;
}

function createObsidianNote(releases) {
  const vueReleases = releases.filter(r => r.framework === 'Vue.js');
  const nuxtReleases = releases.filter(r => r.framework === 'Nuxt.js');
  
  const currentWeek = new Date();
  const oneWeekAgo = new Date(currentWeek.getTime() - (7 * 24 * 60 * 60 * 1000));
  
  const recentReleases = releases.filter(r => 
    new Date(r.published_date) > oneWeekAgo
  );

  const obsidianNote = {
    title: `Vue & Nuxt Releases - ${currentWeek.toLocaleDateString('en-US')}`,
    content: `# Vue.js & Nuxt.js Release Summary

**Date:** ${currentWeek.toLocaleDateString('en-US')}
**Collection Time:** ${new Date().toISOString()}

## 📊 Summary

- **Total releases checked:** ${releases.length}
- **Vue.js releases:** ${vueReleases.length}
- **Nuxt.js releases:** ${nuxtReleases.length}
- **Recent releases (last 7 days):** ${recentReleases.length}

## 🆕 Recent Releases

${recentReleases.length > 0 ? recentReleases.map(release => {
  return `### ${release.framework} ${release.version}

- **Published:** ${release.published_date_formatted}
- **Type:** ${release.version_type}
- **Repository:** ${release.repository}
- **URL:** [${release.html_url}](${release.html_url})
- **Description:** ${release.description}
`;
}).join('\n') : 'No new releases in the last week.'}

## 📋 Latest Versions

${vueReleases.length > 0 ? `**Vue.js:** ${vueReleases[0].version} (${vueReleases[0].published_date_formatted})\n` : ''}${nuxtReleases.length > 0 ? `**Nuxt.js:** ${nuxtReleases[0].version} (${nuxtReleases[0].published_date_formatted})\n` : ''}

## 🏷️ Tags

#vue #nuxt #releases #weekly-summary

---
*Generated automatically by Vue-Nuxt News Collector*`
  };

  return obsidianNote;
}

function testFormatting() {
  console.log('🎨 Testing Output Formatting');
  console.log('============================');
  
  console.log('\n1️⃣ Testing Slack Message Format...');
  const slackMessage = createSlackMessage(mockReleases);
  
  console.log('✅ Slack Message Generated:');
  console.log(`   Text: ${slackMessage.text}`);
  console.log(`   Blocks: ${slackMessage.blocks.length} blocks`);
  console.log(`   Header: ${slackMessage.blocks[0].text.text}`);
  
  // Show a sample block
  if (slackMessage.blocks[2]) {
    console.log('   Sample block text:', slackMessage.blocks[2].text.text.substring(0, 100) + '...');
  }
  
  console.log('\n2️⃣ Testing Obsidian Note Format...');
  const obsidianNote = createObsidianNote(mockReleases);
  
  console.log('✅ Obsidian Note Generated:');
  console.log(`   Title: ${obsidianNote.title}`);
  console.log(`   Content length: ${obsidianNote.content.length} characters`);
  console.log('   Content preview:');
  console.log(obsidianNote.content.substring(0, 300) + '...');
  
  console.log('\n3️⃣ Testing JSON Export...');
  
  const exportData = {
    slack_message: slackMessage,
    obsidian_note: obsidianNote,
    test_timestamp: new Date().toISOString(),
    releases_count: mockReleases.length
  };
  
  console.log('✅ Export Data Structure:');
  console.log(`   Keys: ${Object.keys(exportData).join(', ')}`);
  console.log(`   Total size: ${JSON.stringify(exportData).length} characters`);
  
  console.log('\n✅ Formatting test completed successfully!');
  console.log('🎯 Outputs are ready for Slack and Obsidian integration');
  
  // Validation
  const validationResults = {
    slack_has_header: slackMessage.blocks[0].type === 'header',
    slack_has_summary: slackMessage.blocks[1].text.text.includes('Summary for'),
    obsidian_has_title: obsidianNote.title.includes('Vue & Nuxt Releases'),
    obsidian_has_tags: obsidianNote.content.includes('#vue #nuxt'),
    both_have_data: slackMessage.blocks.length > 2 && obsidianNote.content.length > 500
  };
  
  console.log('\n📋 Validation Results:');
  Object.entries(validationResults).forEach(([key, value]) => {
    console.log(`   ${value ? '✅' : '❌'} ${key}: ${value}`);
  });
  
  const allValid = Object.values(validationResults).every(v => v);
  console.log(`\n${allValid ? '✅ All validations passed!' : '❌ Some validations failed!'}`);
  
  return allValid;
}

// Run the test
if (testFormatting()) {
  console.log('\n🚀 Ready for Phase 4: Slack Integration!');
} else {
  console.log('\n❌ Fix formatting issues before proceeding');
  process.exit(1);
}