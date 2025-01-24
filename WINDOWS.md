# Running the Project on Windows with WSL2 + Debian

This guide will help you set up and run the project in a Windows environment using WSL2 (Windows Subsystem for Linux) with Debian. Why Debian? Because I love it.

## Tested Environment

This setup has been verified to work on:

```plaintext
Edition: Windows 10 Pro
Version: 21H2
OS build: 19044.3086
```

While the project should work on other Windows versions that support WSL2, this specific configuration has been thoroughly tested.

## Prerequisites

1. Windows 10 version 2004 and higher or Windows 11
2. WSL2 installed with Debian distribution

## Important Note About Project Location

⚠️ **Recommended Project Location**: Clone and work with the repository directly in your WSL2 Debian filesystem, NOT in Windows directories (like `/mnt/c/`).

Here's why:

1. **Better Performance**: Working directly in the WSL2 filesystem is significantly faster than working through the Windows filesystem mount
2. **Avoid File Permission Issues**: Windows and Linux handle file permissions differently, which can cause problems with Git and Docker
3. **Proper File Line Endings**: Prevents issues with Windows (CRLF) vs Unix (LF) line endings

Example of correct project location:

```bash
# Good - Clone directly into WSL2 home directory
cd ~
git clone https://github.com/gruz0/checkmvp.git

# Bad - Don't clone into Windows mounted directories
# ❌ cd /mnt/c/Users/YourUsername/Projects/
```

## Important Note About Docker Installation

⚠️ This setup uses Docker directly in Debian WSL2, NOT Docker Desktop for Windows. Having both Docker Desktop and Docker Engine in WSL2 installed simultaneously can cause conflicts, as WSL2 will try to use the Windows version first. If you have Docker Desktop installed, we recommend:

1. Uninstall Docker Desktop from Windows completely
2. Follow this guide to install Docker Engine in Debian WSL2
3. If you must keep Docker Desktop, you'll need to disable the WSL2 integration in Docker Desktop settings

## Setup Instructions

### 1. Install Docker Engine on Debian WSL2

Follow the official [Docker installation guide for Debian](https://docs.docker.com/engine/install/debian/).

### 2. Optional: Configure DNS Settings

If you experience DNS resolution issues, you can configure Docker's DNS settings:

Create or edit `/etc/docker/daemon.json`:

```json
{
  "dns": ["8.8.8.8", "8.8.4.4"]
}
```

You can also update `/etc/resolv.conf` with Google DNS servers:

```plaintext
nameserver 8.8.8.8
nameserver 8.8.4.4
```

Note: WSL2 might automatically regenerate `/etc/resolv.conf`. If you want to prevent this, add these lines to `/etc/wsl.conf`:

```plaintext
[network]
generateResolvConf = false
```

### 3. Project Setup

For detailed instructions on setting up and running the project, please refer to the [CONTRIBUTING.md](./CONTRIBUTING.md) file in the root directory. This file contains all necessary commands and steps for:

- Setting up the development environment
- Installing dependencies
- Running the project
- Testing
- And other development-related tasks

### 4. File Permissions for SQLite

When using WSL2, the default user ID is typically 1000. To ensure proper access to SQLite inside the Docker container, you need to set the correct permissions for the shared directory:

```bash
# Navigate to project root directory
cd /path/to/project

# Set permissions for the shared directory
chmod 777 ./shared
```

This step is crucial for proper database operations and file access between WSL2 and the Docker container.

## Troubleshooting

### If Docker commands require sudo

Add your user to the docker group:

```bash
sudo usermod -aG docker $USER
```

Then restart your terminal or WSL2 instance.

### For any other issues

Please refer to the project's issue tracker or documentation.

## Additional Resources

- [Official Docker Documentation for Debian](https://docs.docker.com/engine/install/debian/)
- [Microsoft's WSL2 Documentation](https://learn.microsoft.com/en-us/windows/wsl/)
- [Docker Desktop WSL2 Backend](https://docs.docker.com/desktop/features/wsl/)
