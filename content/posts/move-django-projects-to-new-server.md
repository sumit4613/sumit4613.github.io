---
title: "Moving Django Projects to a new server"
tags: ["django", "ec2", "nginx", "postgres"]
date: 2022-10-02
toc: false
draft: false
---

I keep migrating django projects from one provider to another. Everytime, I have to look up the same steps. So I decided
to write them down here.
It is a bit of a long post that contains various commands and sample config files, but I hope it will be useful to
someone.

I'm assuming by now, you already created a new instance and is able to ssh into it.

## Install/Update Server Dependencies

```shell
sudo apt-get update
sudo apt-get -y upgrade
```

### PostgreSQL

_Note: I install postgres inside the server, you can use RDS or some external service as well._

[Install and Manage your own Postgres Server.]({{< ref "/posts/install-and-manage-postgres" >}})

### NGINX

Installing NGINX, which will be used to serve static assets (css, js, images) and also to run the Django application
behind a proxy server:

```shell
sudo apt-get -y install nginx
```

### Supervisor

I deploy different django projects (usually small scale, not much traffic) on the same server. To manage all of those I
use `Supervisor`. It's good for single
project as well. But if you want you can look for other ways to manage your project.

#### Install

```shell
sudo apt-get -y install supervisor
```

#### Enable and start the Supervisor

```shell
sudo systemctl enable supervisor
sudo systemctl start supervisor
```

### Install Virtual Environment

_I use simple requirements.txt file to install and manage the dependencies. You can use pipenv or poetry as well._

```shell
sudo apt-get -y install python3-virtualenv
```

### Install Python

_Note: I'll be installing and using python3.8 due to some old dependencies._

[Install Python]({{< ref "/posts/install-python-in-ubuntu" >}})

## Clone/Set up the project

`cd` into the directory where you want to clone the project and run:

```shell
git clone https://github.com/101Loop/HisabKitab-BE.git  # replace with your project url
```

### Create/Manage your virtual environment

`cd` into the directory where you cloned the project and run:

#### Create a virtual environment

```shell
cd HisabKitab-BE/  # replace with your project directory
virtualenv -p python3.8 .venv
```

- `.venv` is the name of the virtual environment. You can use any name you want.
- `-p` is for python version.
- I'm using python3.8, you can use any version you want.
- If you don't specify the python version, it will use the default python version.

#### Activate the virtual environment

```shell
source .venv/bin/activate
```

#### Install the dependencies

```shell
pip install -r requirements.txt
```

#### Update settings or change config files as per your need

- I'm using `django-environ` to manage the environment variables.
- I'll just copy my `sample.env` file to `.env` and update the values.
- You can use any other method to manage the environment variables.

### Check if everything is working fine

Migrate the database

```shell
python manage.py migrate  # to run the migrations
```

- Usually this is not required, since we're migrating the database from the old server.
- Checkout how to [take dump and restore postgres db]({{< ref "/posts/install-and-manage-postgres" >}}).

Collect Static Files

```shell
python manage.py collectstatic  # to collect the static files
```

Run the server

```shell
python manage.py runserver
```

- If this is working fine, you can stop the server by pressing `ctrl + c`.

## Configure Gunicorn

**Note: Check this out for more details. <a href="https://docs.gunicorn.org/en/stable/deploy.html" target="_blank">
Deploying Gunicorn</a>**

- First install `Gunicorn` if not already installed.
  ```shell
  pip install gunicorn  # make sure you're in the virtual environment
  ```

**Note: Go outside the project directory and run the following commands.**

- Create a directory for storing logs for debugging.

  ```shell
  mkdir logs
  mkdir logs/hisabkitab  # to store logs for hisabkitab
  ```

- Create a directory for storing the socket files.

  ```shell
  mkdir sockets
  ```

- I usually create a directory named `run_scripts` that contains all the gunicorn scripts to run the projects.

  ```shell
  mkdir run_scripts
  ```

- Create a file named `<product_name>_gunicorn.sh` inside the `run_scripts` directory. (Not necessary to create inside
  the `run_scripts` directory, you can create anywhere you want.)
  ```shell
  touch run_scripts/hisabkitab_gunicorn.sh  # you can use any name
  ```
- Copy the content from
  this <a href="https://gist.github.com/sumit4613/0b489a10d820211807224555e0f72f2b" target="_blank">Gunicorn Config</a>
  and
  paste
  it in the file you just created. Make sure to update the values as per your need.
- Make the file executable
  ```shell
  chmod u+x run_scripts/hisabkitab_gunicorn.sh
  ```

## Configure Supervisor

- Create a new Supervisor configuration file.
  ```shell
  sudo nano /etc/supervisor/conf.d/backend.conf
  ```
- Copy the content from
  this <a href="https://gist.github.com/sumit4613/91e5107102a86aa333ede5ee751a733f" target="_blank">Supervisor
  Config</a> and
  paste
  it in the file you just created. Make sure to update the values as per your need.
- Reread Supervisor configuration files and make the new program available.
  ```shell
  sudo supervisorctl reread
  sudo supervisorctl update
  ```
- Check status
  ```shell
  sudo supervisorctl status hisabkitab_supervisor  # use your own program name
  ```
  ```console
  hisabkitab_supervisor            RUNNING   pid 9698, uptime 22:52:48
  ```
  **Pro Tip: By running `sudo supervisorctl status` you can see the status of all your programs.**
- To update the source code of the running application, pull the latest code using `git pull`, update requirements (if
  required) and run the following command.
  ```shell
  sudo supervisorctl restart hisabkitab_supervisor  # use your own program name
  ```

## Configure Nginx

- Add a new configuration file named `hisabkitab.conf` inside /etc/nginx/sites-available/:
  ```shell
  sudo nano /etc/nginx/sites-available/hisabkitab.conf
  ```
- Copy the content from this <a href="https://gist.github.com/sumit4613/341ad0a0294039f62093a3d7b06c0c99" target="_blank">Nginx
  Config</a> and
  paste
  it in the file you just created. Make sure to update the values as per your need.
- Create a symbolic link to the sites-enabled directory to enable the site.
  ```shell
  sudo ln -s /etc/nginx/sites-available/hisabkitab.conf /etc/nginx/sites-enabled
  ```
- Test the configuration for syntax errors.
  ```shell
  sudo nginx -t
  ```
- Reload Nginx.
  ```shell
  sudo service nginx restart
  ```

## Configure [Certbot](https://certbot.eff.org/) (Let's Encrypt)

- Install Certbot
  ```shell
  sudo apt install certbot python3-certbot-nginx
  ```
- Run the following command to get the certificate.
  ```shell
  sudo certbot --nginx
  ```
- Follow the instructions on the screen to get the certificate for the required domain.
- You can also use the following command to get the certificate.
- This will automatically redirect all the traffic from `http` to `https`.
  ```shell
  sudo certbot --nginx -d <domain_name> -d www.<domain_name>
  ```

Congratulations! You have successfully deployed 🚀 your Django application on the server. It should be running via https.
