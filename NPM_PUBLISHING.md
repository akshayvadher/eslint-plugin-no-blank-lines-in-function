# NPM Publishing Setup

This repository is configured with GitHub Actions to automatically publish to npm. Here's how to set it up:

## Prerequisites

1. **npm Account**: Create an account at https://www.npmjs.com
2. **npm Access Token**: Generate a token with publish permissions
3. **GitHub Secret**: Add the token to your repository secrets

## Setup Instructions

### 1. Generate npm Access Token

1. Go to https://www.npmjs.com and sign in
2. Click your profile picture → Access Tokens
3. Click "Generate New Token" → "Granular Access Token" 
4. Set permissions to allow publishing
5. Copy the generated token

### 2. Add GitHub Secret

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click "Add secret"

## Publishing Methods

### Method 1: GitHub Releases (Recommended)

1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Create a new tag (e.g., `v1.0.0`)
4. Fill in release notes
5. Click "Publish release"
6. GitHub Actions will automatically publish to npm

### Method 2: Version Tags

1. Update version in package.json: `npm version patch` (or minor/major)
2. Push the tag: `git push origin --tags`
3. GitHub Actions will automatically publish to npm

## Workflows

- **CI**: Runs tests on every push/PR (Node.js 16, 18, 20)
- **Publish**: Publishes to npm when GitHub release is created
- **Publish on Tag**: Publishes to npm when version tag is pushed

## Manual Publishing

If needed, you can publish manually:

```bash
npm login
npm publish
```
