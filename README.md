## Configure Hyperledger Fabric with vis.js (WebUI)

This will allow you to generate configuration files to configure Hyperledger Fabric Network.

Basic feature list :

* Add/Remove Orgs
* Add/Remove channel
* Edit # of Peers, name, domain of normal Orgs
* Edit # of Peers, name, domain, # of Kafkas, # of Zookeepers of Orderer Orgs
* Check/Unckeck auditor role to Orgs
* *Auditor Org is a special Org and it will be inserted to all channels you create.*

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

### Example 1
Suppose you want to build below configuration:

 member Org | domain
------------|--------
 Bear       | bear.com
 Salmon     | salmon.com
 Plankton   | plank.com

 Special Org  | type    | domain
 -------------|---------|--------
 Human        | auditor | human.com
 Gaia         | orderer | gaia.org

 Channels  | members
 ----------|-----------
 BEatsS    | Bear & Salmon  + Human (as auditor)
 SEatsP    | Salmon & Plankton + Human (as auditor)

 then You can build it like this:
 ![alt text](https://github.com/ChoiSD/hyperledger-vis/blob/master/screenshots/Example.png "Example.png")

 And you can get crypto-config.yaml & configtx.yaml files at the right side.
 ```
 ##########################
 #   crypto-config.yaml   #
 ##########################
 ---
   OrdererOrgs:
     -
       Name: "Orderer"
       Domain: "gaia.org"
       Specs:
         -
           Hostname: "orderer0"
         -
           Hostname: "orderer1"
         -
           Hostname: "orderer2"
   PeerOrgs:
     -
       Name: "Bear"
       Domain: "bear.com"
       Template:
         Count: 2
       Users:
         Count: 1
     -
       Name: "Salmon"
       Domain: "salmon.com"
       Template:
         Count: 2
       Users:
         Count: 1
     -
       Name: "Plankton"
       Domain: "plank.com"
       Template:
         Count: 2
       Users:
         Count: 1
     -
       Name: "Human"
       Domain: "human.com"
       Template:
         Count: 2
       Users:
         Count: 1

 ##########################
 #     configtx.yaml     #
 ##########################
 ---
   Profiles:
     OrdererGenesis:
       Orderer:
         OrdererType: "kafka"
         Addresses:
           - "orderer0.gaia.org:7050"
           - "orderer1.gaia.org:7050"
           - "orderer2.gaia.org:7050"
         BatchTimeout: "2s"
         BatchSize:
           MaxMessageCount: 1
           AbsoluteMaxBytes: 10485760
           PreferredMaxBytes: 524288
         Kafka:
           Brokers:
             - "kafka0.gaia.org:9092"
             - "kafka1.gaia.org:9092"
             - "kafka2.gaia.org:9092"
             - "kafka3.gaia.org:9092"
         Organizations:
           -
             Name: "Gaia"
             ID: "GaiaMSP"
             MSPDir: "crypto-config/ordererOrganizations/gaia.org/msp"
       Consortiums:
         SampleConsortium:
           Organizations:
             -
               Name: "Bear"
               ID: "BearMSP"
               MSPDir: "crypto-config/peerOrganizations/bear.com/msp"
               AnchorPeers:
                 -
                   Host: "peer0.bear.com"
                   Port: 7051
             -
               Name: "Salmon"
               ID: "SalmonMSP"
               MSPDir: "crypto-config/peerOrganizations/salmon.com/msp"
               AnchorPeers:
                 -
                   Host: "peer0.salmon.com"
                   Port: 7051
             -
               Name: "Plankton"
               ID: "PlanktonMSP"
               MSPDir: "crypto-config/peerOrganizations/plank.com/msp"
               AnchorPeers:
                 -
                   Host: "peer0.plank.com"
                   Port: 7051
             -
               Name: "Human"
               ID: "HumanMSP"
               MSPDir: "crypto-config/peerOrganizations/human.com/msp"
               AnchorPeers:
                 -
                   Host: "peer0.human.com"
                   Port: 7051
     AllOrgsChannel:
       Consortium: "SampleConsortium"
       Application:
         Organizations:
           -
             Name: "Bear"
             ID: "BearMSP"
             MSPDir: "crypto-config/peerOrganizations/bear.com/msp"
             AnchorPeers:
               -
                 Host: "peer0.bear.com"
                 Port: 7051
           -
             Name: "Salmon"
             ID: "SalmonMSP"
             MSPDir: "crypto-config/peerOrganizations/salmon.com/msp"
             AnchorPeers:
               -
                 Host: "peer0.salmon.com"
                 Port: 7051
           -
             Name: "Plankton"
             ID: "PlanktonMSP"
             MSPDir: "crypto-config/peerOrganizations/plank.com/msp"
             AnchorPeers:
               -
                 Host: "peer0.plank.com"
                 Port: 7051
           -
             Name: "Human"
             ID: "HumanMSP"
             MSPDir: "crypto-config/peerOrganizations/human.com/msp"
             AnchorPeers:
               -
                 Host: "peer0.human.com"
                 Port: 7051
     BEatsS:
       Consortium: "SampleConsortium"
       Application:
         Organizations:
           -
             Name: "Bear"
             ID: "BearMSP"
             MSPDir: "crypto-config/peerOrganizations/bear.com/msp"
             AnchorPeers:
               -
                 Host: "peer0.bear.com"
                 Port: 7051
           -
             Name: "Salmon"
             ID: "SalmonMSP"
             MSPDir: "crypto-config/peerOrganizations/salmon.com/msp"
             AnchorPeers:
               -
                 Host: "peer0.salmon.com"
                 Port: 7051
           -
             Name: "Human"
             ID: "HumanMSP"
             MSPDir: "crypto-config/peerOrganizations/human.com/msp"
             AnchorPeers:
               -
                 Host: "peer0.human.com"
                 Port: 7051
     SEatsP:
       Consortium: "SampleConsortium"
       Application:
         Organizations:
           -
             Name: "Salmon"
             ID: "SalmonMSP"
             MSPDir: "crypto-config/peerOrganizations/salmon.com/msp"
             AnchorPeers:
               -
                 Host: "peer0.salmon.com"
                 Port: 7051
           -
             Name: "Plankton"
             ID: "PlanktonMSP"
             MSPDir: "crypto-config/peerOrganizations/plank.com/msp"
             AnchorPeers:
               -
                 Host: "peer0.plank.com"
                 Port: 7051
           -
             Name: "Human"
             ID: "HumanMSP"
             MSPDir: "crypto-config/peerOrganizations/human.com/msp"
             AnchorPeers:
               -
                 Host: "peer0.human.com"
                 Port: 7051
 ```
