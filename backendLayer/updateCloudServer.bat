@echo off

echo Uploading all files and folders in backendLayer to server...
:: >nul 2>&1: This syntax redirects both standard output (stdout, >nul) and standard error (stderr, 2>&1) to nul, effectively suppressing any output or errors from those commands.
scp -i SENG401ProjectEC2Key.pem -r * ec2-user@18.222.60.25:/home/ec2-user/SENG401_Term_Project_backend >nul 2>&1
echo Upload complete

echo ssh into server and running reLaunchContainers.sh in specified dir...
:: Suppress output of ssh command
ssh -i SENG401ProjectEC2Key.pem ec2-user@18.222.60.25 "cd /home/ec2-user/SENG401_Term_Project_backend && ./reLaunchContainers.sh" >nul 2>&1
echo reLaunchContainer.sh ran. If not working, unsupress error messages

echo Task completed


