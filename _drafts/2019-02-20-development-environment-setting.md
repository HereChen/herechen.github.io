# 开发环境配置

## 跨平台

1. 文本编辑/开发 IDE: [Visual Studio Code](https://code.visualstudio.com/), 将 code 命令添加到环境变量(可 `code folder` 打开文件夹).
2. 邮件: [Thunderbird](https://www.thunderbird.net), 跨平台的邮件收发.
3. 前端环境: [Node.js](https://nodejs.org).
4. 数据库链接: [DBeaver](https://github.com/dbeaver/dbeaver/).

## Windows 10

常用: Tim, WPS

1. 虚拟机: 启用 Hyper-V, 用于搭建 Linux 服务器, IE 测试环境.
2. bash: 安装 Windows Subsystem for Linux (WSL).
    * 可选, 安装 oh-my-zsh.
    * 安装 git.

      ```bash
      sudo add-apt-repository ppa:git-core/ppa
      sudo apt update
      sudo apt install git
      ```

    * 配置 SSH, 参考 [Keychain - Manage ssh keys](https://help.ubuntu.com/community/QuickTips).

      ```bash
      sudo apt install keychain
      vim  ~/.zshrc
      # add the following to ~/.zshrc or ~/.bashrc.
      # keychain ~/.ssh/id_rsa_gitlab  ~/.ssh/id_rsa_github ~/.ssh/id_rsa_gitee ~/.ssh/id_rsa_opengitlab
      # . ~/.keychain/`uname -n`-sh
      ```

3. bash: [Cmder](https://github.com/cmderdev/cmder)
    * 配置同一个窗口的多窗口.
    * 启动默认 bash 配置为 wsl.
4. 链接服务器(可保存账户): [MobaXterm](https://mobaxterm.mobatek.net/) 链接服务器工具(SSH client).
5. HTTP 调试: [Fiddler](https://www.telerik.com/fiddler) HTTP 调试.

### 可选

1. 可选, 设计图标注: [PxCook](http://www.fancynode.com.cn/pxcook) 设计图取色、取尺寸.
2. 可选, 接口调试: [Postman](https://www.getpostman.com/).
3. 可选, 字体: [FiraCode](https://github.com/tonsky/FiraCode) 可用于 Cmder 和 VSCode.

## Linux(Ubuntu)

USB Wifi 缺乏支持. VPN 不能用, 缺乏工具.

1. 虚拟机: [VirtualBox](https://www.virtualbox.org). 网络配置为 `Bridged Adapter` 模式, 虚拟机可上网, 虚拟机之间以及和主机可互通.

```bash
# curl
sudo apt install curl

# firefox nightly
# https://support.mozilla.org/en-US/questions/924510
sudo add-apt-repository ppa:ubuntu-mozilla-daily/ppa
sudo apt update
sudo apt install firefox-trunk

# VSCode
# https://code.visualstudio.com/docs/setup/linux
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'

sudo apt install apt-transport-https
sudo apt update
sudo apt install code # or code-insiders

# git
# https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases
sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt install git

git config --global core.editor "vim"

git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.pu push

# git-ssh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/*

# nodejs (或从应用商店安装)
# https://github.com/nodesource/distributions/blob/master/README.md
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt install -y nodejs

# nvm
# https://github.com/creationix/nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
nvm install v11.10.0
```