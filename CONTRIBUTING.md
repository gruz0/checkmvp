# Contributing to CheckMVP

First off, thank you for considering contributing to CheckMVP! 🎉

We built this tool to help founders, and we're excited that you want to help make it even better. Here's how you can contribute.

## Quick Start

1. Fork the repo
2. Clone your fork
3. Create a new branch (`git checkout -b feature/amazing-idea`)
4. Make your changes
5. Run tests (`make test`)
6. Commit (`git commit -m 'Add amazing feature'`)
7. Push (`git push -u origin feature/amazing-idea`)
8. Open a Pull Request

## Development Setup

```bash
# Copy environment file
cp .env.example .env.development

# The .env.development file will be automatically copied to .env during setup
# You may want to adjust some values in .env.development to match your local environment

# Install dependencies
make setup

# Run redis
make redis-start

# Run development server
make dev

# Run tests
make test
```

> **Note**: The `.env.development` file will be used as your local configuration. Make sure to update any necessary values like `DATABASE_URL`, `OPENAI_API_KEY`, etc. to match your local setup. Never commit your `.env` or `.env.development` files to version control.

## Testing Production Build Locally

To test the production build in your local environment:

```bash
# 1. Copy environment file for production
cp .env.example .env.production

# 2. Build the production Docker image
make prod-docker-build

# 3. Start the application
make prod-docker-start

# 4. Apply database migrations
make prod-docker-db-migrate

# 5. Open in browser
# Visit localhost:3000 (or your custom port defined in .env.production)

# 6. View application logs (optional)
make prod-docker-logs

# 7. Stop the application when done
make prod-docker-stop
```

> **Note**: Make sure to update necessary values in `.env.production` such as `DATABASE_URL`, `OPENAI_API_KEY`, etc. The `.env.production` file will be automatically copied to `.env` during the build process.

## Guidelines

### Pull Requests

- Keep PRs small and focused on a single feature or fix
- Update documentation if needed
- Add tests for new features
- Follow the existing code style
- Describe your changes in the PR description

### Found a Bug?

1. Check if it's already reported in [Issues](https://github.com/gruz0/checkmvp/issues)
2. If not, open a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Feature Ideas?

We love new ideas! Before coding:

1. Open an issue to discuss the feature
2. Tag it with `enhancement`
3. Wait for feedback from maintainers

## Code of Conduct

- Be kind and respectful
- Welcome newcomers
- Help others learn
- Focus on what's best for the community

## Need Help?

- Open an issue with `question` label
- Reach out on [Twitter (X)](https://twitter.com/itmistakes_com)
- Check our [documentation](./Documentation/)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Remember: every contribution matters, no matter how small! 💪
