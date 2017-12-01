## Configure Hyperledger Fabric with vis.js (WebUI)

This will allow you to generate configuration files to configure Hyperledger Fabric Network.

Basic feature list :

* Add/Remove Orgs
* Add/Remove channel
* Edit # of Peers, name, domain of normal Orgs
* Edit # of Peers, name, domain, # of Kafkas, # of Zookeepers of Orderer Orgs
* Check/Unckeck auditor role to Orgs
> Auditor Org is a special Org and it will be inserted to all channels you create.

Limitation:

* need to generate network artifacts manually
* need to edit BatchSize and BatchTimeout if you wish


### How to use this

#### If you choose to use Docker
Build docker images
```
docker build -t edithf:v1 .
```

Run a container from the image
```
docker run -d --name edithf -p 3000:3000 edithf:v1
```

#### If you choose to use it on local machine
Install necessary packages
```
npm install
```

Run server
```
node ./server.js
```

#### Access with your browser
Open your web browser and connect to `localhost:3000/editHF.html`
And use it!!!
