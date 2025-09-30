# n8n Workflows

This directory contains the n8n workflow configurations for the Vue & Nuxt News Collector.

## Structure

- `github-releases-collector.json` - Main workflow for GitHub releases collection

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

## Current Workflow Components

The current workflow includes:
- **Manual Trigger** - For testing (replaces schedule trigger)
- **GitHub API nodes** - Fetch Vue.js and Nuxt.js releases
- **Merge node** - Combine release data from both repositories
- **Code nodes** - Process and format release data
- **Slack formatting** - Format messages for Slack notifications
- **Obsidian formatting** - Format content for Obsidian notes
- **HTTP Request nodes** - Send data to external services

## Development Notes

- Test each component individually before connecting
- Use the "Execute Workflow" button for manual testing
- Check execution logs for debugging
- Always backup workflows before major changes