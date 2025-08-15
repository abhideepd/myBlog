# Load Balancer

- such a cool name!! can be used in an email address or game names

- between the client and server, for the client, its the first point of contact. 
  - simply speaking, the client request, encounters the load balancer first before anything else.
- it distributes incoming traffic across multiple servers
- key to scalability

- below are the most important components of the load balancers.

# ___the below stuff writen, I need to explore more to get more clarity___


## Routing Algorithm
- this determines, how the load balancer distributes incoming request to the backend servers.
- common algorithms : 
  - Round Robin, rotates request evenly across all servers.
  - Least Connections, sends requests to the server with fewest connections
  - Routes based on the IP Address of the client. This ensures that the same IP gets the same server for each request.

## Layers
- Layer in the OSI Model, the loadbalancer operates at. Loadbalancers can operate at different layers. Most common are Layer 4, the transport layer(TCP) and the layer 7(Application layer, http)
