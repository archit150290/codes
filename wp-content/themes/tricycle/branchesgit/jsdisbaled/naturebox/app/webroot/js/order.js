/**
 * example ebay API request to Trading:GetOrders
 */

var ebay = require('ebay-api');

ebay.xmlRequest({
  serviceName : 'Trading',
  opType : 'GetOrders',

  // app/environment
  devId: 'e3347743-dca6-40d7-80eb-2b94b79c5047',
  certId: 'PRD-90ed7b6b4072-eddb-46fe-8c30-e82a',
  appName: 'managedata',
  sandbox: false,

  // per user
  authToken: 'AgAAAA**AQAAAA**aAAAAA**em9JVw**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AFloqpDZKAow2dj6x9nY+seQ**600DAA**AAMAAA**qUsuDRHHJ1px9smmkAQf6qO8e282KH2XxHsLibPg+6Qv3UCCX1OSNKs5oV8ECZnjxKcGbkB/E8/l9ReyPELHb2fiDX7mgQOQV/aSo9Xn6KhNkSgH2Jy77PxbPM8WCKkudlmBSq0RdMUfUFE5SHA4PvFQx4b7e2Jpbvs0yzrRQlLpq90ImP1NiERar7A0vlepY+kYpUYRSxtrCJxuevykYoaqk4ALZHrc5Ttf/ZJ2tR8+AChRWulO5Loq2BzgU3t3pVbGInigb5T7XanRLAkcic532aHwx72VNwYeeIMHnllsDaVkR8ef234MzYfun+SQuqQx99aMV3Y4K2o02Dk2iED+C5CTwMmdLm+ubMGLQZujqNWkLDsWVVqZ0aIyYeFxOZTI4DmjW4CWGQuqCykC7PIaHIlbxhx/0D3tDgh+jh1DTkNSKDfkBelv/EiFUcjWgHKVI+kbV4Y5FFwuH/W06MKsxr6vbzBfa4cAuWM60KTevsq06qAAMd0HfjxdqSmZp/ZOV3yhdFhPqBlj7G/HIm1ZTLTIpP4lv2j0e68/AIKqVVnZe8NMlL9v/lwbGUuaAcTmVNPy3BrB28quegqP/yw27csQD4pxnXh1njkIax2JfJvFNM8kSAxVgTHBWu+bbo4GMTJLDNRs4AlnrNMhmQZY2JgeDxshOZzRSnbJ6FVb7DvN6gUA31EAh3RdD9EX3BsOFzwBhS2jj7e9GBZwTk5k7O+z0YaYxpKNbsas2qRbrhZwY1wEVADHFCVPRTLz',

  params: {
    'OrderStatus': 'Active',
    'NumberOfDays': 1
  }
}, function(error, results) {
  // ...
});