Transitioning from Windows to Linux can be both exciting and challenging. While Linux Mint 21.3 offers a smooth and enjoyable experience, the absence of an official Microsoft Office version for Linux can be a significant hurdle for many users. Fortunately, there’s a way to bring Microsoft Office apps like Excel, PowerPoint, and Word to your Linux desktop. In this guide, I’ll walk you through setting up Microsoft Office on Linux Mint 21.3 using WinApps and Docker.

## Why No Official Microsoft Office for Linux?

It's understandable to feel frustrated by the lack of a native Microsoft Office version for Linux. However, Microsoft’s decision to focus on Windows and macOS makes sense from a business perspective. If transitioning to Linux were as easy as switching between software, more users might leave Windows for Linux. Thankfully, there are alternative methods to access Office apps on Linux.

## Using WinApps to Run Microsoft Office on Linux

While native support is missing, you can still use Microsoft Office on Linux by running it in a Windows environment using [WinApps](https://github.com/winapps-org/winapps) (https://github.com/winapps-org/winapps). WinApps renders Windows applications running on a Windows environment on your Linux desktop with the RDP protocal. I chose to run Windows environment via Docker containers. Here’s how you can set it up:

### Step 1: Install Docker on Linux Mint 21.3

1. **Follow the Docker Installation Guide**: Linux Mint 21.3 is based on Ubuntu 22.04, so you’ll need to follow the Docker installation steps for Ubuntu Jammy Jellyfish. You can find the official guide [here](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository) (https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository).

2. **Add Docker’s Official GPG Key and Repository**:
   - If you encounter errors related to the repository not found for “virginia” (Linux Mint’s code name), you may need to tweak the commands. This error occurs because Docker’s repository does not recognize the “virginia” code name directly. Try the following commands:
   
```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(echo "virginia") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

3. **Configure Docker to Run as a Non-Root User**:
   - Create the `docker` group: `sudo groupadd docker`.
   - Add your user to the `docker` group: `sudo usermod -aG docker $USER`.
   - Log out and log back in for the changes to take effect.

### Step 2: Install the Prerequisites

1. **Clone the WinApps Repository**:
   - Clone the repository from GitHub: [WinApps GitHub Repo](https://github.com/winapps-org/winapps).

2. **Install FreeRDP**:
   - Since FreeRDP 3 is not available in Linux Mint 21.3’s official repository, install it via Flatpak.

```
flatpak install flathub com.freerdp.FreeRDP
sudo flatpak override --filesystem=home com.freerdp.FreeRDP # To use `+home-drive`
```

### Step 3: Create a Windows Environment in Docker

1. **Configure Docker**:
   - Use the default configurations, credentials, disk space, RAM, etc., provided in the `compose.yaml` file from the [dockur/windows repo](https://github.com/dockur/windows).

2. **Start Your Windows Environment**:
   - Open your terminal, navigate to the WinApps repo, and run: `docker compose up`.

### Step 4: Install Microsoft Office Apps

1. **Access the Windows Environment**:
   - Remote into your Windows environment via `http://127.0.0.1:8006`.

2. **Install a Web Browser**:
   - Use PowerShell to install Google Chrome with the command: `winget install -e --id Google.Chrome`.

3. **Install Office 365**:
   - Download and install Office 365 as you would on a regular Windows machine.

### Step 5: Update Windows Credentials (Optional)

1. **Change the Default Password**:
   - The default Windows environment credentials are `docker` with an empty password. Update this password for added security.

### Step 6: Use Microsoft Office Apps on Your Linux Desktop

1. **Create a WinApps Configuration File**:
   - Create a configuration file at ~/.config/winapps/winapps.conf containing the following:

```
RDP_USER="docker"
RDP_PASS=""
#RDP_DOMAIN="MYDOMAIN"
#RDP_IP="192.168.123.111"
#WAFLAVOR="docker" # Acceptable values are 'docker', 'podman' and 'libvirt'.
#RDP_SCALE=100 # Acceptable values are 100, 140, and 180.
#RDP_FLAGS=""
#MULTIMON="true"
#DEBUG="true"
#FREERDP_COMMAND="xfreerdp"
```

1. **Run the Install Script**:
   - Navigate to the WinApps repo and execute: `./installer`. Follow the prompts to add Office apps to your Linux desktop.

2. **Additional Applications**:
   - Only apps from the official supported list will appear. For running other applications, refer to the [WinApps readme](https://github.com/winapps-org/winapps?tab=readme-ov-file#running-applications-manually) (https://github.com/winapps-org/winapps?tab=readme-ov-file#running-applications-manually).

## Conclusion

Setting up Microsoft Office on Linux Mint 21.3 might seem like a daunting task, but using WinApps and Docker makes it achievable. By following these steps, you can seamlessly integrate Microsoft Office into your Linux environment, allowing you to continue using familiar tools while exploring the benefits of Linux.

Feel free to leave a comment if you have any questions or run into issues during the setup process. Happy computing!

<!--
**SEO Keywords**: Microsoft Office on Linux, Linux Mint 21.3, Install Office on Linux, WinApps, Docker, Microsoft Office Excel Linux, PowerPoint on Linux, Word on Linux
-->
