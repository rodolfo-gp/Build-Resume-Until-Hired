## How to run Flask API server and DB with docker Locally:

1. install docker 
2. Start docker engine via cmd or docker desktop(just open app)
3. have latest .env file in backendLayer dir
4. ```cd backenLayer```
5. ```docker-compose up --build -d```

To stop containers: ```docker-compose down``` \
To stop docker engine: ```stop docker```


## For Dev AWS Deployment: (instance already exists)

So you have this pem file used to auth into the AWS EC2 instance. So what we do is use the pem file to auth, then upload all of this dir files and folders into a specific folder in the EC2 instance. After that, ssh into the intance and rebuild and start the new containers with the new code. This assuming that you already have EC2 instance, have installed docker and docker-compose, configured Ngix reverse proxy to allow API container to communicate with instance portss(https), and have a valid ssl certificate for https connection and requests to the server. The public IP of the instance at the time of writting this...

IP: 18.222.60.25 \
Domain: api.bru-h.xyz 

NOTE: to do this properly you need the latest super secrete .env and SENG401ProjectEC2Key.pem file in backendLayer dir

How to upload all files:

1. ```cd backendLayer```
   
2. ```scp -i SENG401ProjectEC2Key.pem -r * ec2-user@18.222.60.25:/home/ec2-user/SENG401_Term_Project_backend``` DO NOT HAVE VIRTUALENV FILES OR OTHER JAZZ TO UPLOAD

Update AWS Instance:
1. conncet via ssh through AWS intance terminal
   
2. pwd must be ```/home/ec2-user/SENG401_Term_Project_backend```

3. ```docker-compose down``` (end containers)
   
4. ```docker-compose up --build -d```


#### Side Notes
setting up the EC2 instance was followed using this video: https://www.youtube.com/watch?v=qNIniDftAcU 

setting up https is manually for serrver container requires ngix reverse proxy and abunch of other config file shinnanigans.