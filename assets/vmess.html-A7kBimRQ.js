import{_ as s,r,o as l,c as o,a as t,b as e,d as a,e as i}from"./app-eE4giq9J.js";const d={},h=i('<h1 id="vmess-protocol" tabindex="-1"><a class="header-anchor" href="#vmess-protocol" aria-hidden="true">#</a> VMess Protocol</h1><p>VMess is an encrypted transmission protocol that can serve as a bridge between the Xray client and server.</p><h2 id="version" tabindex="-1"><a class="header-anchor" href="#version" aria-hidden="true">#</a> Version</h2><p>The current version number is 1.</p><h2 id="dependencies" tabindex="-1"><a class="header-anchor" href="#dependencies" aria-hidden="true">#</a> Dependencies</h2><h3 id="underlying-protocol" tabindex="-1"><a class="header-anchor" href="#underlying-protocol" aria-hidden="true">#</a> Underlying Protocol</h3><p>VMess is a TCP-based protocol where all data is transmitted over TCP.</p><h3 id="user-id" tabindex="-1"><a class="header-anchor" href="#user-id" aria-hidden="true">#</a> User ID</h3>',8),c={href:"https://en.wikipedia.org/wiki/Universally_unique_identifier",target:"_blank",rel:"noopener noreferrer"},u=t("code",null,"de305d54-75b4-431b-adb2-eb6b9e546014",-1),y={href:"https://www.uuidgenerator.net/",target:"_blank",rel:"noopener noreferrer"},p=t("p",null,[e("User ID can be specified in the "),t("a",{href:"../../config"},"configuration file"),e(".")],-1),m=t("h3",{id:"functions",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#functions","aria-hidden":"true"},"#"),e(" Functions")],-1),b={href:"https://en.wikipedia.org/wiki/MD5",target:"_blank",rel:"noopener noreferrer"},f=t("ul",null,[t("li",null,"Input parameter is any length byte array"),t("li",null,"Output is a 16-byte array")],-1),g={href:"https://en.wikipedia.org/wiki/Hash-based_message_authentication_code",target:"_blank",rel:"noopener noreferrer"},x=t("ul",null,[t("li",null,[e("Input parameters are: "),t("ul",null,[t("li",null,"H: Hash function"),t("li",null,"K: Key, any length byte array"),t("li",null,"M: Message, any length byte array")])])],-1),v={href:"https://en.wikipedia.org/wiki/SHA-3",target:"_blank",rel:"noopener noreferrer"},k=t("ul",null,[t("li",null,"Input parameter is any length string"),t("li",null,"Output is any length string")],-1),_=i('<h2 id="communication-process" tabindex="-1"><a class="header-anchor" href="#communication-process" aria-hidden="true">#</a> Communication Process</h2><p>VMess is a stateless protocol, which means that data can be transmitted directly between the client and the server without the need for a handshake. Each data transmission has no impact on other data transmissions before or after it.</p><p>When a VMess client initiates a request, the server checks whether the request comes from a legitimate client. If the validation passes, the server forwards the request and sends the obtained response back to the client.</p><p>VMess uses an asymmetric format, meaning that the requests sent by the client and the responses from the server use different formats.</p><h2 id="client-request" tabindex="-1"><a class="header-anchor" href="#client-request" aria-hidden="true">#</a> Client Request</h2><table><thead><tr><th>16 Bytes</th><th>X Bytes</th><th>Remaining</th></tr></thead><tbody><tr><td>Authentication Information</td><td>Instruction Part</td><td>Data Part</td></tr></tbody></table><h3 id="authentication-information" tabindex="-1"><a class="header-anchor" href="#authentication-information" aria-hidden="true">#</a> Authentication Information</h3><p>The authentication information is a 16-byte hash (hash) value, which is calculated as follows:</p><ul><li>H = MD5</li><li>K = User ID (16 bytes)</li><li>M = UTC time accurate to seconds, with a random value of ±30 seconds from the current time (8 bytes, Big Endian)</li><li>Hash = HMAC(H, K, M)</li></ul><h3 id="command-section" tabindex="-1"><a class="header-anchor" href="#command-section" aria-hidden="true">#</a> Command Section</h3><p>The instruction part is encrypted using AES-128-CFB.</p><ul><li>Key: MD5(user ID + []byte(&#39;c48619fe-8f02-49e0-b9e9-edf763e17e21&#39;))</li><li>IV: MD5(X + X + X + X), X = []byte(time generated by authentication information) (8 bytes, Big Endian)</li></ul><table><thead><tr><th style="text-align:center;">1 Byte</th><th style="text-align:center;">16 Bytes</th><th style="text-align:center;">16 Bytes</th><th style="text-align:center;">1 Byte</th><th style="text-align:center;">1 Byte</th><th style="text-align:center;">4 bits</th><th style="text-align:center;">4 bits</th><th style="text-align:center;">1 Byte</th><th style="text-align:center;">1 Byte</th><th style="text-align:center;">2 Bytes</th><th style="text-align:center;">1 Byte</th><th style="text-align:center;">N Bytes</th><th style="text-align:center;">P Bytes</th><th style="text-align:center;">4 Bytes</th></tr></thead><tbody><tr><td style="text-align:center;">Version</td><td style="text-align:center;">Data Encryption IV</td><td style="text-align:center;">Data Encryption Key</td><td style="text-align:center;">Response Authentication Value</td><td style="text-align:center;">Options</td><td style="text-align:center;">Reserved</td><td style="text-align:center;">Encryption Method</td><td style="text-align:center;">Reserved</td><td style="text-align:center;">Command</td><td style="text-align:center;">Port</td><td style="text-align:center;">Address Type</td><td style="text-align:center;">Address</td><td style="text-align:center;">Random Value</td><td style="text-align:center;">Checksum</td></tr></tbody></table><p>Options Opt Details: (When a bit is 1, it means the option is enabled)</p><table><thead><tr><th style="text-align:center;">0</th><th style="text-align:center;">1</th><th style="text-align:center;">2</th><th style="text-align:center;">3</th><th style="text-align:center;">4</th><th style="text-align:center;">5</th><th style="text-align:center;">6</th><th style="text-align:center;">7</th></tr></thead><tbody><tr><td style="text-align:center;">X</td><td style="text-align:center;">X</td><td style="text-align:center;">X</td><td style="text-align:center;">X</td><td style="text-align:center;">X</td><td style="text-align:center;">M</td><td style="text-align:center;">R</td><td style="text-align:center;">S</td></tr></tbody></table><p>of which:</p><ul><li>Version Number Ver: Always 1;</li><li>Data Encryption IV: Random value;</li><li>Data Encryption Key: Random value;</li><li>Response Authentication V: Random value;</li><li>Option Opt: <ul><li>S (0x01): Standard format data stream (recommended);</li><li>R (0x02): Client expects to reuse TCP connection (deprecated in Xray 2.23+); <ul><li>This item only takes effect when S is enabled;</li></ul></li><li>M (0x04): Enable metadata obfuscation (recommended); <ul><li>This item only takes effect when S is enabled;</li><li>When this item is enabled, the client and server need to construct two Shake instances respectively, RequestMask = Shake (request data IV), ResponseMask = Shake (response data IV).</li></ul></li><li>X: Reserved</li></ul></li><li>Redundancy P: Random value added before checksum value;</li><li>Encryption Method: Specify the encryption method for the data part, and the optional values are: <ul><li>0x00: AES-128-CFB;</li><li>0x01: No encryption;</li><li>0x02: AES-128-GCM;</li><li>0x03: ChaCha20-Poly1305;</li></ul></li><li>Instruction Cmd: <ul><li>0x01: TCP data;</li><li>0x02: UDP data;</li></ul></li><li>Port Port: Integer port number in Big Endian format;</li><li>Address Type T: <ul><li>0x01: IPv4</li><li>0x02: Domain name</li><li>0x03: IPv6</li></ul></li><li>Address A: <ul><li>When T = 0x01, A is a 4-byte IPv4 address;</li><li>When T = 0x02, A is a 1-byte length (L) + L-byte domain name;</li><li>When T = 0x03, A is a 16-byte IPv6 address;</li></ul></li><li>Check F: FNV1a hash of all content in the instruction except F.</li></ul><h3 id="data-section" tabindex="-1"><a class="header-anchor" href="#data-section" aria-hidden="true">#</a> Data Section</h3><p>When Opt(S) is enabled, this format is used for the data section. The actual request data is divided into several small chunks, and each chunk has the following format. After the server verifies all the small chunks, it will be forwarded in the basic format.</p><table><thead><tr><th style="text-align:center;">2 Bytes</th><th style="text-align:center;">L Bytes</th></tr></thead><tbody><tr><td style="text-align:center;">Length L</td><td style="text-align:center;">Data Packet</td></tr></tbody></table><p>in which:</p><ul><li>Length L: A big-endian integer with a maximum value of 2^14. <ul><li>When Opt(M) is enabled, the value of L is equal to the true value xor Mask. Mask = (RequestMask.NextByte() &lt;&lt; 8) + RequestMask.NextByte();</li></ul></li><li>Packet: A data packet encrypted by the specified encryption method.</li></ul><p>Before the transmission is completed, the data packet must contain actual data, in addition to the length and authentication data. When the transmission is complete, the client must send an empty data packet, that is, L = 0 (unencrypted) or the length of the authentication data (encrypted), to indicate the end of the transmission.</p><p>The packets are formatted as follows, depending on the encryption method:</p><ul><li>Unencrypted:   - L bytes: actual data;</li><li>AES-128-CFB: The entire data section is encrypted using AES-128-CFB.   - 4 bytes: FNV1a hash of actual data;   - L - 4 bytes: actual data;</li><li>AES-128-GCM: Key is the Key of the instruction section, IV = count (2 bytes) + IV (10 bytes). count starts at 0 and increases by 1 for each packet; IV is the 3rd to 12th byte of the instruction section IV.   - L - 16 bytes: actual data;   - 16 bytes: GCM authentication information</li><li>ChaCha20-Poly1305: Key = MD5 (instruction part Key) + MD5 (MD5 (instruction part Key)), IV = count (2 bytes) + IV (10 bytes). count starts at 0 and increases by 1 for each packet; IV is the 3rd to 12th byte of the instruction section IV.   - L - 16 bytes: actual data;   - 16 bytes: Poly1305 authentication information</li></ul><h2 id="server-response" tabindex="-1"><a class="header-anchor" href="#server-response" aria-hidden="true">#</a> Server Response</h2><p>The header data is encrypted using AES-128-CFB encryption. The IV is MD5 of the data encryption IV, and the Key is MD5 of the data encryption Key. The actual response data varies depending on the encryption settings.</p><table><thead><tr><th>1 Byte</th><th>1 Byte</th><th>1 Byte</th><th>1 Byte</th><th>M Bytes</th><th>Remaining Part</th></tr></thead><tbody><tr><td>Response Authentication V</td><td>Option Opt</td><td>Command Cmd</td><td>Command Length M</td><td>Command Content</td><td>Actual Response Data</td></tr></tbody></table><p>in which：</p><ul><li>Response Authentication V: must match the response authentication V in the client request.</li><li>Option Opt: <ul><li>0x01: server prepares to reuse TCP connections (deprecated in Xray 2.23+).</li></ul></li><li>Command Cmd: <ul><li>0x01: dynamic port command.</li></ul></li><li>Actual response data: <ul><li>If Opt(S) in the request is enabled, the standard format is used. Otherwise, the basic format is used.</li><li>Both formats are identical to the request data. <ul><li>When Opt(M) is enabled, the value of length L is equal to the true value XOR Mask. Mask = (ResponseMask.NextByte() &lt;&lt; 8) + ResponseMask.NextByte().</li></ul></li></ul></li></ul><h3 id="dynamic-port-instructions" tabindex="-1"><a class="header-anchor" href="#dynamic-port-instructions" aria-hidden="true">#</a> Dynamic Port Instructions</h3><table><thead><tr><th>1 Byte</th><th>2 Bytes</th><th>16 Bytes</th><th>2 Bytes</th><th>1 Byte</th><th>1 Byte</th></tr></thead><tbody><tr><td>Reserved</td><td>Port</td><td>User ID</td><td>AlterID</td><td>User level</td><td>Validity period T</td></tr></tbody></table><p>in which:</p><ul><li>Port: Integer port number in Big Endian format</li><li>T: Number of minutes as integer value.</li></ul><p>When the client receives a dynamic port command, the server opens a new port for communication. The client can then send data to the new port. After T minutes, the port will expire, and the client must use the main port to communicate again.</p><h2 id="comment" tabindex="-1"><a class="header-anchor" href="#comment" aria-hidden="true">#</a> Comment</h2><ul><li>To ensure forward compatibility, the values of all reserved fields must be 0.</li></ul>',37);function B(M,I){const n=r("ExternalLinkIcon");return l(),o("div",null,[h,t("p",null,[e("An ID is equivalent to a "),t("a",c,[e("UUID"),a(n)]),e(", which is a 16-byte long random number. Its function is similar to a token. An ID looks like: "),u,e(", it is almost entirely random and can be generated using any UUID generator, such as "),t("a",y,[e("this one"),a(n)]),e(".")]),p,m,t("ul",null,[t("li",null,[e("MD5: "),t("a",b,[e("MD5 Function"),a(n)]),f]),t("li",null,[e("HMAC: "),t("a",g,[e("HMAC Function"),a(n)]),x]),t("li",null,[e("Shake: "),t("a",v,[e("SHA3-Shake128 Function"),a(n)]),k])]),_])}const C=s(d,[["render",B],["__file","vmess.html.vue"]]);export{C as default};
