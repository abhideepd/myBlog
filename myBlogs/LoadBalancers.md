A highlevel overview of a loadbalancer to a newbie, what's a load balancer ? what is the purpose of its existence ? what are the basic parameters of configuration ?

# Load Balancers
- such a cool name!! can be used in an email address or game alias
- between the client and server, for the client, its the first point of contact. 
  - simply speaking, the client request, encounters the load balancer first before anything else.
- it distributes incoming traffic across multiple servers
- key to scalability


## Purpose
- created an app with frontend and backend ? Cool!
- Slowly users are getting to know about how awesome you are
- You soon get to know your first 1000 users! Getting hyped up and appreciated!! No other feeling compared to this.
- You have a simple, aws instance running a docker image running and you have built up a small cicd, which, ensures, whenever pasted to main or deploy branch, it creates a docker image and loads on the instance
- Suddenly, you explode in popularity! users are coming fast, the 1100 users suddenly gets 10000 and rising.. what do you do ?
- scale the single instance ? Good, soon you are running out of options, there is no other way, other than, distributing it to different instances and tweeking the codebase as well
- that's solves almost major problem, however, one problem still remains,
- <u>HOW DO YOU DIRECT THE USER TO WHICH INSTANCE ?</u>
- Enter Load Balancers, the primary purpose or the first bottleneck it solves it. Redirecting requests to multiple instances.

## Routing Algorithm
- Traffic Distribution Strategy
- this determines, how the load balancer distributes incoming request to the backend servers.
- common algorithms : 
  - Round Robin, rotates request evenly across all servers.
  - Least Connections, sends requests to the server with fewest connections
  - Routes based on the IP Address of the client. This ensures that the same IP gets the same server for each request.

## Layers
- Layer in the OSI Model, the loadbalancer operates at. Loadbalancers can operate at different layers. Most common are Layer 4, the transport layer(TCP) and the layer 7(Application layer, http)
