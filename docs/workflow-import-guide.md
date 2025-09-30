# n8n Workflow Import and Testing Guide

This guide walks you through importing and testing the GitHub releases workflow in n8n.

## 🚀 Import Workflow to n8n

### Step 1: Access n8n Interface
1. Open your browser and go to: http://localhost:5678
2. Login with credentials:
   - **Username**: `admin`  
   - **Password**: `MGyq3oIiZVlap1Dx`

### Step 2: Import the Workflow
1. In n8n interface, click **"Workflows"** in the left sidebar
2. Click the **"+"** button to create a new workflow
3. Click the **three dots menu** (⋮) in the top right
4. Select **"Import from File"**
5. Choose the file: `workflows/github-releases-collector.json`
6. Click **"Import"**

### Step 3: Save the Workflow
1. After import, click **"Save"** button
2. The workflow should now appear as **"GitHub Vue/Nuxt Releases Collector"**

## 🧪 Test the Workflow

### Manual Execution
1. Open the imported workflow
2. Click **"Execute Workflow"** button in the top right
3. Watch the execution progress through each node
4. Check the output data in each node by clicking on them

### Expected Results

#### Node: "Get Vue.js Releases"
- **Status**: ✅ Success
- **Output**: Array of Vue.js releases (up to 10)
- **Sample data**:
  ```json
  {
    "tag_name": "v3.5.22",
    "name": "v3.5.22",
    "published_at": "2025-09-25T...",
    "html_url": "https://github.com/vuejs/core/releases/tag/v3.5.22"
  }
  ```

#### Node: "Get Nuxt.js Releases"  
- **Status**: ✅ Success
- **Output**: Array of Nuxt.js releases (up to 10)
- **Sample data**:
  ```json
  {
    "tag_name": "v4.1.2", 
    "name": "v4.1.2",
    "published_at": "2025-09-12T...",
    "html_url": "https://github.com/nuxt/nuxt/releases/tag/v4.1.2"
  }
  ```

#### Node: "Process Release Data"
- **Status**: ✅ Success  
- **Output**: Structured array with both Vue.js and Nuxt.js releases
- **Added fields**:
  - `framework`: "Vue.js" or "Nuxt.js"
  - `repository`: "vuejs/core" or "nuxt/nuxt"
  - `description`: Truncated release notes
  - `download_count`: Asset download statistics

#### Node: "Create Summary"
- **Status**: ✅ Success
- **Output**: Single summary object
- **Expected fields**:
  ```json
  {
    "total_releases": 20,
    "vue_releases": 10,
    "nuxt_releases": 10,
    "latest_vue": { ... },
    "latest_nuxt": { ... },
    "collection_timestamp": "2025-09-30T..."
  }
  ```

## 📊 Validation Checklist

- [ ] Both GitHub API calls return 200 status
- [ ] Vue.js releases contain valid version numbers (v3.x.x)
- [ ] Nuxt.js releases contain valid version numbers (v3.x.x or v4.x.x)  
- [ ] Data processing adds framework identification
- [ ] Summary shows correct counts
- [ ] Latest versions match current GitHub releases
- [ ] Console logs appear in execution view

## 🔧 Troubleshooting

### Issue: "Unauthorized" or 403 Error
- **Cause**: GitHub API rate limiting or authentication
- **Solution**: Add GitHub token to environment variables (optional for public repos)

### Issue: Empty Results
- **Cause**: API endpoint changed or network issues
- **Solution**: Check API URLs and test with curl:
  ```bash
  curl -H "Accept: application/vnd.github.v3+json" \
       https://api.github.com/repos/vuejs/core/releases?per_page=5
  ```

### Issue: Workflow Import Failed
- **Cause**: JSON format issue or n8n version compatibility
- **Solution**: Check JSON syntax and try importing smaller sections

## ✅ Success Criteria

The workflow test is successful when:

1. **All nodes execute without errors** ✅
2. **GitHub APIs return valid release data** ✅  
3. **Data processing correctly identifies frameworks** ✅
4. **Summary contains expected release counts** ✅
5. **Console shows collection statistics** ✅

Once these criteria are met, the workflow is ready for automation and integration with other services (Slack, Obsidian).