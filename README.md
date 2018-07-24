
# Protecting edgemicro_ proxies in the cloud

When creating proxies for Microgateway, the proxy name must begin with "edgemicro_".  The developer will specific the basepath and the target url.  The developer will also create a product and add the proxy or path to the product.

The Microgateway, upon starting, will call up to Edge, find all of the proxies that begin with "edgemicro_", and download the baspath, target url, product info and other config.  Any policies configured will be ignored.  

The API will now be available at the specified basepath at the URL of the Microgateway instance.  OAuth is enforced at the Microgateway level.

But what happens to the live proxy that is still deployed and running in Edge?  The endpoint, as defined by the "edgemicro_" proxy, is live and able to receive traffic.  If called, the request will likely timeout or return an error because the target URL is usually a local url and not normally reachable by Edge.  However, it potentially could be a security hole if the target URL was reachable from Edge.

The developer should always put a RaiseFault policy in the proxy that returns a 404 Not Found error message.  

If there are many edgemicro_ proxies or they have already been deployed and the developer does not want to go back and update every one, then they can use a Flow Hook.

The [pre-proxy FlowHook](https://docs.apigee.com/api-platform/fundamentals/flow-hooks) is applied before every proxy is run.  The logic in the FlowHook should retrieve the proxy name using the "apiproxy.name" variable.  If the first part of the name matches "edgemicro_", then RaiseFault and return a 404 Not Found error.  

The code in this example is a flow hook.  Upload and deploy the shared flow, and then configure the pre-proxy flow hook to use the shared flow.








