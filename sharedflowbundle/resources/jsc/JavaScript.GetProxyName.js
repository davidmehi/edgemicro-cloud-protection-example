

//print("proxy name: " + context.getVariable("apiproxy.name"));

var proxyName = context.getVariable("apiproxy.name");
var proxyNameFirstTen = "";

if(proxyName.length > 10) {
    proxyNameFirstTen = proxyName.substring(0,10);
}
context.setVariable("proxyNameFirstTen", proxyNameFirstTen);
