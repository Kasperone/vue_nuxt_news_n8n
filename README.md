# Vue & Nuxt News Collector 🚀

Automated system for collecting the latest Vue.js and Nuxt.js information using n8n and Claude AI.

## 🎯 What does this project do?

This agent automatically:
- 📡 Collects latest Vue.js and Nuxt.js information from various sources
- 🤖 Processes them using Claude AI into readable format
- 📱 Sends notifications to Slack
- 📝 Creates notes in Obsidian
- ⏰ Runs automatically once per week

## 🏗️ Architecture

```
📦 vue-nuxt-news/
├── 🐳 docker/
│   └── n8n/
│       └── Dockerfile          # Custom n8n image
├── 🔄 workflows/               # n8n workflow files
├── 📚 docs/                    # Documentation
├── 🐳 docker-compose.yml      # Full stack setup
├── 🔒 .env.example            # Environment template
└── 📖 README.md
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Git
- Internet access

### 1. Clone and configure
```bash
# Clone repository (if you don't have it)
git clone [your-repo-url]
cd vue-nuxt-news

# Copy and configure environment variables
cp .env.example .env
nano .env  # Edit as needed
```

### 2. Launch
```bash
# Start the full stack
docker-compose up -d

# Check status
docker-compose ps

# Check n8n logs
docker-compose logs -f n8n
```

### 3. Access n8n
- Open: http://localhost:5678
- Login: admin (or as set in .env)
- Password: admin_password (or as set in .env)

## 🔧 Configuration

### Environment Variables (.env)
Copy `.env.example` to `.env` and configure:

```bash
# Basic passwords
POSTGRES_PASSWORD=your_strong_password
N8N_BASIC_AUTH_PASSWORD=your_admin_password
N8N_ENCRYPTION_KEY=very_long_random_string_32+_characters

# API keys
CLAUDE_API_KEY=sk-ant-api03-...
GITHUB_TOKEN=ghp_...
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
```

### How to get API keys:

**Claude API:**
1. Go to https://console.anthropic.com
2. Create account/login
3. Generate API key

**GitHub Token:**
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scope: `public_repo`

**Slack Webhook:**
1. https://api.slack.com/apps
2. Create New App → From scratch
3. Incoming Webhooks → Activate
4. Add New Webhook to Workspace

## 📊 Data Sources

Agent collects information from:
- ✅ **GitHub Releases** (Vue.js, Nuxt.js)
- ✅ **Official Blogs** (RSS feeds)
- ✅ **Dev.to** (Vue/Nuxt articles)
- 🔄 **Reddit** (r/vuejs, r/nuxt) - planned
- 🔄 **Twitter/X** - planned

## 🛠️ Development

### Workflow Structure
```
1. Schedule Trigger (weekly)
2. GitHub API → latest releases
3. RSS Reader → blog posts
4. Dev.to API → articles
5. Claude AI → formatting
6. Slack → notification
7. Obsidian → note
```

### Adding New Sources
1. Add new node in n8n workflow
2. Configure API/RSS
3. Connect to Claude for formatting
4. Test and deploy

## 🐛 Troubleshooting

### n8n won't start
```bash
# Check logs
docker-compose logs n8n

# Restart services
docker-compose restart

# Full restart
docker-compose down
docker-compose up -d
```

### Database issues
```bash
# Reset database (WARNING: deletes data!)
docker-compose down -v
docker-compose up -d
```

### Port conflicts
```bash
# Check occupied ports
sudo netstat -tlnp | grep :5678

# Change port in docker-compose.yml if needed
```

## 📝 Usage

### Manual workflow execution
1. Go to n8n (localhost:5678)
2. Open workflow "Vue-Nuxt News Collector"
3. Click "Execute Workflow"

### Schedule
- Default: Every Sunday at 9:00 AM
- Configuration: In n8n Schedule Trigger node

## 🤝 Contributing

1. Fork repo
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file

## 🆘 Support

Have an issue? Create an issue in this repository!

---

**Project Status:** 🚧 In Development

**Upcoming Features:**
- [ ] Reddit integration
- [ ] Twitter/X integration  
- [ ] Email notifications
- [ ] Web dashboard
- [ ] Mobile app notifications
