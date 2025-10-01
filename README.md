# Vue/Nuxt Release Monitor 🚀

An automated n8n workflow that monitors Vue.js and Nuxt.js releases and posts detailed reports to Slack.

## ✨ Features

- **📦 Release Monitoring**: Automatically tracks latest Vue.js and Nuxt.js releases
- **📊 Rich Data Collection**: Gathers repository stats, contributors, and changelogs
- **💬 Slack Integration**: Posts beautifully formatted reports to your Slack channel
- **🔐 Authenticated GitHub API**: Uses personal access token for higher rate limits (5,000/hour)
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
- Import `workflows/vue-nuxt-release-monitor.json`
- Run the workflow manually or set up a schedule

## 📋 Workflow Details

The main workflow (`vue-nuxt-release-monitor.json`) performs:

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

## 🔧 Technical Stack

- **n8n**: Workflow automation platform
- **PostgreSQL**: Workflow and execution data
- **Redis**: Caching and session storage
- **Docker**: Containerization
- **GitHub API**: Release and repository data
- **Slack Webhooks**: Message posting

## 📁 Project Structure

```
├── docker-compose.yml     # Docker services configuration
├── .env.example          # Environment variables template
├── workflows/
│   ├── vue-nuxt-release-monitor.json  # Main working workflow
│   └── README.md         # Workflow documentation
└── README.md            # This file
```

## 🔒 Security

- Sensitive credentials are stored in `.env` (not committed)
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

### Example Slack Output
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

### Key Features Implemented
- [x] GitHub API Integration with Authentication
- [x] Sequential Data Processing (avoiding merge node issues)
- [x] Comprehensive Repository Statistics
- [x] Top Contributors Information
- [x] Properly Formatted Slack Messages
- [x] Error Handling and Rate Limit Management
- [x] Docker Containerization
- [x] Security Best Practices