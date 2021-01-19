---
date: "2020-12-23T00:00:00.000Z"
description: Project X Documentation.
title: The Working Mode of Xray
weight: 4
---

## Single Server mode

---

The same as the other network proxy tools, you need a configured Xray Server. And install & configure Xray client on your device. After that, you will have a smooth Internet Access.

{{<mermaid align="left">}}
graph LR;
A(PC) -.- B(Firewall);
B -.-> C(Blocked Website);
A --> D(Xray/VPS);
D --> C;
A --> E(Accessible Website);
{{< /mermaid >}}

An Xray Server can simutanously support multiple devices and devices can using different proxy protocol to access. Meanwhile, via the correct configuation , Xray can recognize and distingush the traffic which need to proxy or not. Direct data do not need to detour.

<br />

## Bridge Mode

---

If you don't like to set router on each device, you can set a transit server for reciving all the traffic from the Client, and do forwarding judgment on server.

{{<mermaid align="left">}}
graph LR;
A(PC) -.-> B(Firewall);
B -.-> C(Blocked Website);
A --> D(Inside-firewall VPS);
D --> E(Outside-firewall VPS);
E --> C;
D --> F(Accessible Website);
{{< /mermaid >}}

<br />

## Working Principle

---

Before configure Xray, it's a good idea to acknowledge the Working Principle of Xray, the following is a schematic diagram of the internal structure of a single Xray process. Multiple Xrays are independent of each other and do not affect each other.

{{<mermaid align="left">}}
graph LR;
A1(inbound) --> D(Dispatcher / Router / DNS);
A2(inbound) --> D;
A3(inbound) --> D;
A4(inbound) --> D;
D --> B1(outbound);
D --> B2(outbound);
D --> B3(outbound);
D --> B4(outbound);
{{< /mermaid >}}

- In order to work successfully, it need to configure at least one Inbound Connection and one Outbound Connection.
  - Inbound connections are responsible for communicating with clients (such as browsers)：
    - Inbound Connection can usually configure User authentication, such as ID , password and so on;
    - After the inbound connection receives the data, it will be handed over to the Dispatcher for distribution；
  - Outbound connection is responsible for sending data to the server, such as Xray on another host.
  - When there are multiple outbound connections, you can configure Routing to specify that a certain type of traffic is sent by a certain outbound connection.
  - When necessary, the router will query DNS for more information to make judgments.
