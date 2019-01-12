var HttpsProxyAgent = require('https-proxy-agent');
var proxyConfig = [{
  context: '/www/AlizeePHP/api/*',
  target: 'http://localhost:8080',
  changeOrigin: true,
  secure: false,
  headers: { 
      'Access-Control-Allow-Headers': 'x-env-ssl_client_certificate, Origin, Access-Control-Allow-Methods, Access-Control-Request-Methods, Access-Control-Allow-Headers, Access-Control-Request-Headers, Access-Control-Allow-Origin, Vary',
	  'Access-Control-Allow-Origin': '*',
	  'Access-Control-Allow-Methods': '*'
  },
  "bypass": function (req, res, proxyOptions) {
	  
				//console.log("On passe à travers le proxy 1 ==>"+JSON.stringify(req.headers)+"\n");
					
					//console.log("RES HEADERS="+JSON.stringify(res.headers));
					
					//console.log("REQ HEADERS="+JSON.stringify(req.headers));

					//console.log("REQ HEADERS ACCEPT="+JSON.stringify(req.headers.accept));
				
					res.setHeader("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Methods, Access-Control-Request-Methods, Access-Control-Request-Headers, Access-Control-Allow-Headers, Access-Control-Allow-Origin");				
					res.setHeader("Access-Control-Allow-Origin", "*");
					res.setHeader("Access-Control-Allow-Methods", "*");
					
					req.headers["Access-Control-Allow-Headers"] = "Origin, Access-Control-Allow-Methods, Access-Control-Request-Methods, Access-Control-Request-Headers, Access-Control-Allow-Headers, Access-Control-Allow-Origin";
					req.headers["Access-Control-Allow-Origin"] = "*";
					req.headers["Access-Control-Allow-Methods"] = "*";
					
					
					//console.log("On passe à travers le proxy 1 Dans le IF");

					//console.log("header accept modified!");
					
					
					//console.log("REQ HEADERS ACCEPT="+JSON.stringify(req.headers.accept));
					//console.log("REQ HEADERS="+JSON.stringify(req.headers));

  }
}
];

function setupForCorporateProxy(proxyConfig) {
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    var agent = new HttpsProxyAgent(proxyServer);
    console.log('Using corporate proxy server: ' + proxyServer);
    proxyConfig.forEach(function(entry) {
      entry.agent = agent;
    });
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
//module.exports = setupForCorporateProxy(proxyConfig2);