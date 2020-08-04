# Amazon Interactive Video Service (IVS) POC

1. [ivs-proxy](ivs-proxy/README.md) demonstrates a method for proxying IVS events to an internal Application Load Balancer via a VPC-attached proxy Lambda function.
2. [ivs-tester](ivs-tester/README.md) demonstrates a method for using ffmpeg in a Lambda function to stream to IVS RTMP ingest endpoints.
3. [ivs-monitor](ivs-monitor/README.md) demonstrates a method for monitoring IVS for streams that are started in order to set a maximum stream time, using a Step Functions workflow to schedule an IVS StopStream API call a fixed number of seconds later.
