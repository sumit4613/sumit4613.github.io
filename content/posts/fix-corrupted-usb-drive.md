---
title: "USB Drive Corrupted? Let's just fix it!"
tags: ["windows", "usb-drive", "corrupted"]
date: 2022-10-19
toc: false
draft: false
---

Recently, I was trying to boot ubuntu to an old system. And while I was making my bootable USB drive, somehow my USB
drive got corrupted. I tried to format it, but it was not working. I tried to fix it using `chkdsk`, but it was not
working either.

So I thought, why not just fix it using `diskpart`? So here is how I did it.

## Steps

1. Open `cmd` as administrator.
2. Type `diskpart` and press enter.
3. Type `list disk` and press enter.
4. Type `select disk <disk_number>` and press enter. (Replace `<disk_number>` with the disk number of your USB drive)
5. Type `clean` and press enter.
6. Type `create partition primary` and press enter.
7. Type `select partition 1` and press enter.
8. Type `format fs=fat32` and press enter.
9. It'll take a while to format the drive. So just wait for it. And do not interrupt the process.

## Conclusion

That's it. Now you can use your USB drive as you want. I hope this post helped you. If you have any questions, feel free
to reach out. I'll try to answer them as soon as possible. If you find any mistakes in the post, please create an issue
or raise pull request with the fix.
