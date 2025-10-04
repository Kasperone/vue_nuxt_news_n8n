# Vue/Nuxt News Aggregator 🚀

An automated n8n workflow that monitors Vue.js and Nuxt.js releases, Weekly Vue News articles, and posts comprehensive reports to Slack.

## ✨ Features

- **📦 Latest Release Fetching**: Retrieves current Vue.js and Nuxt.js release information
- **📰 News Aggregation**: Monitors Weekly Vue News RSS feed for latest community articles
- **📊 Rich Data Collection**: Gathers repository stats, contributors, and changelogs
- **💬 Slack Integration**: Posts beautifully formatted reports to your Slack channel
- **🔐 Authenticated GitHub API**: Uses personal access token for higher rate limits (5,000/hour)
- **🌐 RSS Feed Processing**: Parses and formats Weekly Vue News content
- **🐳 Docker Deployment**: Complete containerized setup with persistent data

## 🚀 Quick Start

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd vue-nuxt-news
cp .env.example .env
```

### 2. Configure Environment
Edit `.env` file with your credentials:
- `GITHUB_TOKEN`: Get from https://github.com/settings/tokens (no scopes needed)
- `SLACK_WEBHOOK_URL`: Create at https://api.slack.com/messaging/webhooks
- Set secure passwords for database and n8n admin

### 3. Start Services
```bash
docker compose up -d
```

### 4. Import Workflow
- Access n8n at http://localhost:5678
- Login with credentials from `.env` file
- Import `workflows/vue-nuxt-news-aggregator.json`
- Run the workflow manually or set up a schedule

## 📋 Workflow Details

The main workflow (`vue-nuxt-news-aggregator.json`) performs two parallel processes:

### 📰 Weekly Vue News Processing:
1. **RSS Feed Fetch**: Retrieves latest articles from https://weekly-vue.news/rss.xml
2. **XML Parsing**: Extracts title, publication date, link, and content
3. **Slack Posting**: Posts formatted Weekly Vue News update

### 📦 GitHub Release Monitoring:
1. **Sequential API Calls** to GitHub:
   - Vue.js latest release
   - Vue.js repository info
   - Vue.js top contributors
   - Nuxt.js latest release
   - Nuxt.js repository info
   - Nuxt.js top contributors

2. **Data Processing**: Combines all data into structured format

3. **Slack Posting**: Creates formatted message with:
   - Version numbers and release dates
   - Repository statistics (stars, forks, issues)
   - Top contributors
   - Changelog previews
   - Direct links to releases

## 📰 About Weekly Vue News

[Weekly Vue News](https://weekly-vue.news/) is an independent newsletter curated by Michael Hoffmann that delivers the latest Vue and Nuxt tips, tutorials, and updates. The workflow integrates with their RSS feed to automatically fetch and share:

- **Latest Newsletter Issues**: Automatically detects new weekly publications
- **Rich Content**: Extracts titles, publication dates, and content previews
- **Community Focus**: Covers tools, tutorials, and insights from the Vue & Nuxt ecosystem
- **Independent Coverage**: 100% independent newsletter with no official Vue/Nuxt affiliation

The RSS integration ensures your team stays updated with community news and best practices alongside official release information.

## 🔧 Technical Stack

- **n8n**: Workflow automation platform
- **PostgreSQL**: Workflow and execution data
- **Redis**: Caching and session storage
- **Docker**: Containerization
- **GitHub API**: Release and repository data
- **RSS/XML**: Weekly Vue News feed parsing
- **Slack Webhooks**: Message posting

## 📁 Project Structure

```
├── docker-compose.yml     # Docker services configuration
├── .env.example          # Environment variables template
├── workflows/
│   ├── vue-nuxt-news-aggregator.json  # Main working workflow
│   └── README.md         # Workflow documentation
└── README.md            # This file
```

## 🔒 Security

- Sensitive credentials are stored in `.env`
- GitHub token uses minimal permissions
- All services run in isolated Docker network
- n8n protected with basic authentication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the workflow
5. Submit a pull request

## 📄 License

MIT License - feel free to use and modify as needed.

---

## 🛠️ Development Notes

### Example Slack Outputs

#### Weekly Vue News Message
```
📰 Weekly Vue News - Issue #234
📅 Published: October 1, 2025 at 02:15 PM
🔗 https://weekly-vue.news/issues/234

📄 Content Preview:
This week's highlights include new Vue 3.5 features, Nuxt 4 updates, 
community tools, and best practices for modern Vue development...

✅ Weekly Vue News update complete
```

#### GitHub Releases Report
```
🚀 Vue.js & Nuxt.js Report - October 1, 2025 at 04:22 PM

💚 Vue.js
├─ 📦 Version: v3.5.22
├─ 📅 Released: September 25, 2025 at 01:08 AM (6 days ago)
├─ 👤 Author: github-actions[bot]
├─ ⭐ Stars: 51,741
├─ 🍴 Forks: 8,894
├─ 👀 Watchers: 51,741
├─ 🐛 Issues: 1065
├─ 📝 Language: TypeScript
├─ 📄 License: MIT License
├─ 👨‍💻 Top contributors:
│  ├─ yyx990803 (1651)
│  ├─ HcySunYang (589)
│  └─ posva (393)
└─ 🔗 https://github.com/vuejs/core/releases/tag/v3.5.22

🟢 Nuxt.js
├─ 📦 Version: v4.1.2
├─ 📅 Released: September 12, 2025 at 11:48 PM (18 days ago)
├─ 👤 Author: github-actions[bot]
├─ ⭐ Stars: 58,319
├─ 🍴 Forks: 5,373
├─ 👀 Watchers: 58,319
├─ 🐛 Issues: 894
├─ 📝 Language: TypeScript
├─ 📄 License: MIT License
├─ 👨‍💻 Top contributors:
│  ├─ pi0 (1240)
│  ├─ danielroe (983)
│  └─ atinux (567)
└─ 🔗 https://github.com/nuxt/nuxt/releases/tag/v4.1.2

✅ Report complete | 🤖 Authenticated GitHub API
```
