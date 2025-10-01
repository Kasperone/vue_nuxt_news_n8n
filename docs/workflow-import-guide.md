# n8n Workflow Import and Testing Guide

This guide walks you through importing and testing the Vue/Nuxt Release Monitor workflow in n8n.

## 🚀 Import Workflow to n8n

### Step 1: Access n8n Interface
1. Open your browser and go to: http://localhost:5678
2. Login with credentials from your `.env` file:
   - **Username**: `admin` (or as configured in `N8N_BASIC_AUTH_USER`)
   - **Password**: Check your `.env` file for `N8N_BASIC_AUTH_PASSWORD`

### Step 2: Import the Workflow
1. In n8n interface, click **"Workflows"** in the left sidebar
2. Click the **"+"** button to create a new workflow
3. Click the **three dots menu** (⋮) in the top right
4. Select **"Import from File"**
5. Choose the file: `workflows/vue-nuxt-release-monitor.json`
6. Click **"Import"**

### Step 3: Save the Workflow
1. After import, click **"Save"** button
2. The workflow should now appear as **"Vue/Nuxt Release Monitor"**

## 🧪 Test the Workflow

### Manual Execution
1. Open the imported workflow
2. Click **"Execute Workflow"** button in the top right
3. Watch the execution progress through each node
4. Check the output data in each node by clicking on them

### Expected Results

#### Sequential Execution Flow
The workflow runs sequentially through these nodes:

#### Node: "1. Vue Release"
- **Status**: ✅ Success
- **Output**: Array with Vue.js latest release
- **Sample data**:
  ```json
  [{
    "tag_name": "v3.5.22",
    "name": "v3.5.22",
    "published_at": "2025-09-25T01:08:48Z",
    "html_url": "https://github.com/vuejs/core/releases/tag/v3.5.22",
    "author": { "login": "github-actions[bot]" }
  }]
  ```

#### Node: "2. Vue Repo Info"  
- **Status**: ✅ Success
- **Output**: Repository statistics object
- **Sample data**:
  ```json
  {
    "full_name": "vuejs/core",
    "stargazers_count": 51741,
    "forks_count": 8894,
    "watchers_count": 51741,
    "open_issues_count": 1065,
    "language": "TypeScript",
    "license": { "name": "MIT License" }
  }
  ```

#### Node: "3. Vue Contributors"
- **Status**: ✅ Success
- **Output**: Array of top 5 contributors
- **Sample data**:
  ```json
  [{
    "login": "yyx990803",
    "contributions": 1651,
    "html_url": "https://github.com/yyx990803"
  }]
  ```

#### Nodes: "4. Nuxt Release", "5. Nuxt Repo Info", "6. Nuxt Contributors"
- Similar structure but for Nuxt.js data

#### Node: "Process All Data"
- **Status**: ✅ Success  
- **Output**: Structured objects for Vue.js and Nuxt.js
- **Added fields**:
  - `framework`: "Vue.js" or "Nuxt.js"
  - `repository`: "vuejs/core" or "nuxt/nuxt"
  - `latest_version`, `repo_stars`, `repo_forks`, etc.
  - `top_contributors`: Array of contributor objects

#### Node: "Create Summary"
- **Status**: ✅ Success
- **Output**: Slack-formatted message
- **Expected fields**:
  ```json
  {
    "success": true,
    "frameworks_analyzed": 2,
    "slack_message": "🚀 Vue.js & Nuxt.js Report...",
    "collection_timestamp": "2025-10-01T..."
  }
  ```

#### Node: "Send to Slack"
- **Status**: ✅ Success (if Slack webhook is configured)
- **Output**: Slack API response

## 📊 Validation Checklist

- [ ] All 6 HTTP request nodes execute successfully
- [ ] Vue.js release data shows version v3.5.x+
- [ ] Nuxt.js release data shows version v3.x.x or v4.x.x
- [ ] Repository info shows current star counts (Vue: 50k+, Nuxt: 50k+)
- [ ] Contributors data shows top GitHub usernames
- [ ] "Process All Data" combines everything correctly
- [ ] "Create Summary" generates formatted Slack message
- [ ] "Send to Slack" posts message (if webhook configured)
- [ ] Environment variables `$env.GITHUB_TOKEN` and `$env.SLACK_WEBHOOK_URL` are used

## 🔧 Troubleshooting

### Issue: "API rate limit exceeded"
- **Cause**: GitHub API rate limiting (60 requests/hour without auth)
- **Solution**: Set `GITHUB_TOKEN` in your `.env` file to get 5,000 requests/hour

### Issue: "Slack webhook not found" or 404 Error  
- **Cause**: Missing or incorrect `SLACK_WEBHOOK_URL` environment variable
- **Solution**: Set `SLACK_WEBHOOK_URL` in your `.env` file with your webhook URL

### Issue: Environment variables not working
- **Cause**: Docker containers not restarted after `.env` changes
- **Solution**: Restart containers:
  ```bash
  docker compose down && docker compose up -d
  ```

### Issue: Empty Results
- **Cause**: API endpoint changed or network issues
- **Solution**: Test GitHub API manually:
  ```bash
  curl -H "Accept: application/vnd.github.v3+json" \
       -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
       https://api.github.com/repos/vuejs/core/releases?per_page=1
  ```

### Issue: Workflow Import Failed
- **Cause**: JSON format issue or n8n version compatibility
- **Solution**: Check JSON syntax and ensure n8n is up to date

## ✅ Success Criteria

The workflow test is successful when:

1. **All 9 nodes execute without errors** ✅
   - Manual Trigger → 1. Vue Release → 2. Vue Repo Info → 3. Vue Contributors → 4. Nuxt Release → 5. Nuxt Repo Info → 6. Nuxt Contributors → Process All Data → Create Summary → Send to Slack

2. **GitHub APIs return authenticated data** ✅  
   - Uses `$env.GITHUB_TOKEN` for higher rate limits
   - All API calls return status 200

3. **Data processing creates structured output** ✅
   - Vue.js and Nuxt.js data properly separated
   - Repository stats, contributors, and release info combined

4. **Slack message is properly formatted** ✅
   - Beautiful tree-style formatting with emojis
   - Shows version numbers, stars, contributors, etc.

5. **Environment variables work correctly** ✅
   - GitHub token provides authentication
   - Slack webhook posts to your channel

Once these criteria are met, the workflow is ready for:
- ⏰ **Scheduled automation** (set up cron trigger)
- 🔄 **Regular monitoring** (weekly/daily runs)
- 📊 **Extended reporting** (add more data sources)
