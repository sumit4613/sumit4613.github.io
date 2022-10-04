---
title: "Install and Manage your own PostgreSQL Server"
tags: ["postgres", "ubuntu", "server", "ec2", "digitalocean", "aws"]
date: 2022-09-10
toc: false
draft: false
---

_Commands which I use to install and manage my own PostgreSQL server._

Install the dependencies to use Postgres with Python/Django

```shell
sudo apt-get -y install build-essential libpq-dev python3-dev
```

Install Postgres Server

```shell
sudo apt-get -y install postgresql postgresql-contrib
```

### Create a new user

```shell
sudo -u postgres createuser --interactive
```

After running the above command, you will be prompted something like this:

```console
Enter name of role to add: new-user
Shall the new role be a superuser? (y/n) n
Shall the new role be allowed to create databases? (y/n) y
Shall the new role be allowed to create more new roles? (y/n) n
```

### Create database and grant access to the user

```shell
sudo -u postgres createdb hisabkitab --owner loop101

sudo -u postgres psql -c "ALTER USER loop101 WITH PASSWORD '@jn1z&xy+*jkcm^';"
```

### Backup and Restore in SQL format

```shell
pg_dump -U db_user database_name > path/to/backup.sql
```

```shell
psql -U db_user database_name < path/to/backup.sql
```

### Backing up a specific table

```shell
pg_dump -U db_user database_name -t table_name > path/to/backup.sql
```

### Restore a specific table

```shell
psql -U db_user -d db_name < path/to/backup.sql
```

## Notes:

- If you are using `psql` command, you might get an error like this:
  ```console
  psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:
  Peer authentication failed for user "new-user"
  ```
- To fix this, you can edit the `pg_hba.conf` file:
  ```shell
  sudo nano /etc/postgresql/13/main/pg_hba.conf
  ```
- Find `# "local" is for Unix domain socket connections only` and add a new line below it:
  ```shell
  local   all             new-user                              password
  ```
- Restart the postgres service:
  ```shell
  sudo systemctl restart postgresql
  ```
- Now you can use `psql` command without any issues.
