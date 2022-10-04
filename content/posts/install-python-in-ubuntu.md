---
title: "Install Python"
tags: ["python", "ubuntu", "server", "ec2", "digitalocean", "aws"]
date: 2022-09-05
toc: false
draft: false
---

On new Ubuntu servers, Python 3.10 is installed by default. But if you want to install a specific version of Python,
this post shows you how.

**Run the following commands with `sudo` or `root` user.**

### Install the prerequisites

```shell
sudo apt-get update
sudo apt install software-properties-common
```

### Update the sources

```shell
sudo add-apt-repository ppa:deadsnakes/ppa
```

When prompted press Enter to continue:

```console
Press [ENTER] to continue or Ctrl-c to cancel adding it.
```

### Install Python 3.8

```shell
sudo apt-get -y install python3.8  # or any other version
```

### Verify the installation

```shell
python3.8 --version
```

Cheers! At this point, Python 3.8 is installed on your Ubuntu system, and you can start using it.

### Notes:

- Installing python3.8 via deadsnakes has an issue with `distutils` module.
- While running `pip install` you might get an error like this:

    ```console
    from distutils.cmd import Command as DistutilsCommand
    ModuleNotFoundError: No module named 'distutils.cmd'
    ```
- To fix this, you can install `python3.8-distutils` package:

    ```shell
    sudo apt-get -y install python3.8-distutils
    ```