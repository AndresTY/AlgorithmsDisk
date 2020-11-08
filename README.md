#Disk algorithms
These are differents types of disk planning, although not all algorithms, these are the most popular and seen in their class.

##Short summary of algorithms
### FIFO
First in first out, incoming “requests” are immediately executed on disk no matter what tier you are at.

![>example extract of geeksforgeeks.org](https://media.geeksforgeeks.org/wp-content/uploads/20200608201201/fcfs3.jpg "FIFO")

###SSTF
Shortest seek time first, the system calculates which is the closest "request" to the head.

![>example extract of gatevidyalay](https://www.gatevidyalay.com/wp-content/uploads/2018/11/SSTF-Disk-Scheduling-Algorithm-Problem-01.png "SSTF" )

###SCAN
the heads move from one end of the disk to the other, attending to the requests that are found.

![>example extract of CESMAG](http://2.bp.blogspot.com/-8oCQgaja1M0/UaatPmottgI/AAAAAAAAACM/YaTiBge_8Xo/s400/scan.JPG "SCAN")

###CSCAN
the heads move from the first cylinder to the last one attending requests, and return to the beginning.

![>example extract of CESMAG](http://2.bp.blogspot.com/-JwdSQUVbAZQ/UaaswZr4zmI/AAAAAAAAAB8/t50ytnqmEZA/s400/cscan.JPG "CSCAN")

###LOOK
heads aren't moved to the extreme, but until the last pending request in the direction of movement

![>example extract of CESMAG](http://1.bp.blogspot.com/-Am5Zf7qBM2c/Uaasxcz0ZmI/AAAAAAAAACE/qw89BTfauAY/s400/LOOK.JPG "LOOK")


