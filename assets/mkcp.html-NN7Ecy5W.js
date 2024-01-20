import{_ as d,r,o as h,c as s,a as e,b as t,d as n,e as i}from"./app-eE4giq9J.js";const o={},l=e("h1",{id:"mkcp-protocol",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#mkcp-protocol","aria-hidden":"true"},"#"),t(" mKCP Protocol")],-1),c={href:"https://github.com/skywind3000/kcp",target:"_blank",rel:"noopener noreferrer"},m=i('<h2 id="version" tabindex="-1"><a class="header-anchor" href="#version" aria-hidden="true">#</a> Version</h2><p>mKCP has no version number and does not guarantee compatibility between versions.</p><h2 id="dependencies" tabindex="-1"><a class="header-anchor" href="#dependencies" aria-hidden="true">#</a> Dependencies</h2><h3 id="underlying-protocol" tabindex="-1"><a class="header-anchor" href="#underlying-protocol" aria-hidden="true">#</a> Underlying Protocol</h3><p>mKCP is a protocol based on UDP, and all communication uses UDP transmission.</p><h3 id="functions" tabindex="-1"><a class="header-anchor" href="#functions" aria-hidden="true">#</a> Functions</h3>',6),u={href:"https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function",target:"_blank",rel:"noopener noreferrer"},p=e("ul",null,[e("li",null,"Takes a string of arbitrary length as input parameter;"),e("li",null,"Outputs a 32-bit unsigned integer.")],-1),b=i('<h2 id="communication-process" tabindex="-1"><a class="header-anchor" href="#communication-process" aria-hidden="true">#</a> Communication Process</h2><ol><li>mKCP splits data streams into several data packets for transmission. Each data stream has a unique identifier to distinguish it from other data streams. Each data packet in the data stream carries the same identifier.</li><li>mKCP does not have a handshake process. When receiving a data packet, it determines whether it is a new call or an ongoing call based on the identifier of the data stream it carries.</li><li>Each data packet contains several segments (Segment), which are divided into three types: data (Data), acknowledgment (ACK), and heartbeat (Ping). Each segment needs to be processed separately.</li></ol><h2 id="data-format" tabindex="-1"><a class="header-anchor" href="#data-format" aria-hidden="true">#</a> Data Format</h2><h3 id="data-packet" tabindex="-1"><a class="header-anchor" href="#data-packet" aria-hidden="true">#</a> Data Packet</h3><table><thead><tr><th>4 Bytes</th><th>2 Bytes</th><th>L Bytes</th></tr></thead><tbody><tr><td>Auth A</td><td>Data Len L</td><td>Fragment</td></tr></tbody></table><p>as which:</p><ul><li>Authentication information A = fnv(fragment), big endian;</li><li>The fragment may contain multiple sections.</li></ul><h3 id="data-snippet" tabindex="-1"><a class="header-anchor" href="#data-snippet" aria-hidden="true">#</a> Data snippet</h3><table><thead><tr><th>2 bytes</th><th>1 byte</th><th>1 byte</th><th>4 bytes</th><th>4 bytes</th><th>4 bytes</th><th>2 bytes</th><th>Len bytes</th></tr></thead><tbody><tr><td>Conv flag</td><td>Cmd flag</td><td>Opt flag</td><td>Timestamp</td><td>Sequence</td><td>Unacknowledged</td><td>Len flag</td><td>Data</td></tr></tbody></table><p>as which:</p><ul><li>Identifier Conv: Identifier for mKCP data stream</li><li>Command Cmd: Constant 0x01</li><li>Option Opt: Optional values include: <ul><li>0x00: Empty option</li><li>0x01: Opposite party has sent all data</li></ul></li><li>Timestamp Ts: Time when the current segment was sent from the remote end, big endian</li><li>Sequence Number Sn: The position of the data segment in the data stream, the sequence number of the starting segment is 0, and each new segment is sequentially added by 1</li><li>Unacknowledged Sequence Number Una: The minimum Sn that the remote host is sending and has not yet received confirmation.</li></ul><h3 id="confirmation-snippet" tabindex="-1"><a class="header-anchor" href="#confirmation-snippet" aria-hidden="true">#</a> Confirmation snippet</h3><table><thead><tr><th>2 bytes</th><th>1 byte</th><th>1 byte</th><th>4 bytes</th><th>4 bytes</th><th>4 bytes</th><th>2 bytes</th><th>Len * 4 bytes</th></tr></thead><tbody><tr><td>Conv ID</td><td>Cmd</td><td>Opt</td><td>Wnd</td><td>Next Seq Number</td><td>Timestamp</td><td>Length</td><td>Received Seq Number</td></tr></tbody></table><p>as which:</p><ul><li>Identifier Conv: Identifier of the mKCP data stream</li><li>Command Cmd: Constant 0x00</li><li>Option Opt: Same as above</li><li>Window Wnd: The maximum sequence number that the remote host can receive</li><li>Next receive sequence number Sn: The smallest sequence number of the data segment that the remote host has not received</li><li>Timestamp Ts: The timestamp of the latest received data segment by the remote host, which can be used to calculate the delay</li><li>Received sequence numbers: Each 4 bytes, indicating that the data of this sequence number has been confirmed received.</li></ul><p>as which:</p><ul><li>The remote host expects to receive data within the serial number [Sn, Wnd) range.</li></ul><h3 id="heartbeat-fragments" tabindex="-1"><a class="header-anchor" href="#heartbeat-fragments" aria-hidden="true">#</a> Heartbeat Fragments</h3><table><thead><tr><th>2 Bytes</th><th>1 Byte</th><th>1 Byte</th><th>4 Bytes</th><th>4 Bytes</th><th>4 Bytes</th></tr></thead><tbody><tr><td>Conv ID</td><td>Cmd</td><td>Opt</td><td>Unacknowledged Seq No</td><td>Next Receive Seq No</td><td>Rto</td></tr></tbody></table><p>as which:</p><ul><li>Identifier Conv: Identifier for the mKCP data stream</li><li>Command Cmd: Optional values include: <ul><li>0x02: Remote host forcibly terminates the session</li><li>0x03: Normal heartbeat</li></ul></li><li>Option Opt: Same as above</li><li>Unacknowledged sequence number Una: Same as the Una of the data fragment</li><li>Next receive sequence number Sn: Same as the Sn of the acknowledgement fragment</li><li>Delay Rto: Delay calculated by the remote host itself</li></ul>',21);function f(y,g){const a=r("ExternalLinkIcon");return h(),s("div",null,[l,e("p",null,[t("mKCP is a stream transfer protocol, modified from the "),e("a",c,[t("KCP protocol"),n(a)]),t(", which can transmit any data stream in order.")]),m,e("ul",null,[e("li",null,[t("fnv: "),e("a",u,[t("FNV-1a"),n(a)]),t(" hash function "),p])]),b])}const C=d(o,[["render",f],["__file","mkcp.html.vue"]]);export{C as default};
