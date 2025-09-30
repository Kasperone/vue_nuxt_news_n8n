# n8n Dockerfile with additional packages for Vue/Nuxt news collector
FROM n8nio/n8n:latest

# Switch to root to install packages
USER root

# Install additional packages that might be needed
RUN apk add --no-cache \
    curl \
    wget \
    git \
    bash \
    jq \
    python3 \
    py3-pip

# Install Python packages for web scraping if needed
RUN pip3 install --no-cache-dir \
    requests \
    beautifulsoup4 \
    feedparser

# Create directories for custom nodes (if we add any later)
RUN mkdir -p /home/node/.n8n/custom

# Switch back to node user
USER node

# Expose the n8n port
EXPOSE 5678

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:5678/healthz || exit 1

# Default command
CMD ["n8n", "start"]