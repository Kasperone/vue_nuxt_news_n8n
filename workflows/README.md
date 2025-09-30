# n8n Workflows

This directory contains the n8n workflow configurations for the Vue & Nuxt News Collector.

## Structure

- `vue-nuxt-collector.json` - Main workflow file that will be created in Phase 3
- `test-workflows/` - Test workflows for development (will be created later)

## Importing Workflows

1. Access n8n web interface: http://localhost:5678
2. Go to Workflows tab
3. Click "Import from File"
4. Select the workflow JSON file
5. Save and activate

## Exporting Workflows

When you make changes in n8n:
1. Go to your workflow
2. Click on the three dots menu
3. Select "Export"
4. Save to this directory
5. Commit to version control

## Workflow Components

The main workflow will include:
- **Schedule Trigger** - Weekly execution
- **GitHub API nodes** - Fetch Vue/Nuxt releases
- **RSS Reader nodes** - Fetch blog posts
- **Dev.to API nodes** - Fetch articles
- **Claude AI nodes** - Process and format content
- **Slack nodes** - Send notifications
- **Obsidian nodes** - Create notes
- **Error handling nodes** - Manage failures

## Development Notes

- Test each component individually before connecting
- Use the "Execute Workflow" button for manual testing
- Check execution logs for debugging
- Always backup workflows before major changes