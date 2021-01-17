---
date: "2020-01-17T00:00:00.000Z"
description: Project X Documents
title: Configure and run
weight: 2
---

Once you [downloaded and installed](../install) xray, you will need to configure it.

For demonstration purposes, only simple configurations are described here.

For more complex configurations, please refer to the more detailed [configuration file](../../config) for more detailed instructions.

<br />

## Server-side configuration

---

You will need a server outside the firewall to run the server-side xray. Configure it as follows.

```json
{
  "inbounds": [
    {
      "port": 10086, // Port that the server listens on
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "b831381d-6324-4d53-ad4f-8cda48b30811"
          }
        ]
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom"
    }
  ]
}
```

The server needs to be configured to ensure that the `id` and the `port` are the same as the client's and you will be able to connect properly.

<br />

## Client-side configuration

---

On your PC (or mobile phone), you need to run xray with the following configuration.

```json
{
  "inbounds": [
    {
      "port": 1080, // SOCKS proxy port, you need to configure the proxy in your browser and point to this port
      "listen": "127.0.0.1",
      "protocol": "socks",
      "settings": {
        "udp": true
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "vmess",
      "settings": {
        "vnext": [
          {
            "address": "server", // Server address, please change to your own server ip or domain name
            "port": 10086, // Server port
            "users": [
              {
                "id": "b831381d-6324-4d53-ad4f-8cda48b30811"
              }
            ]
          }
        ]
      }
    },
    {
      "protocol": "freedom",
      "tag": "direct"
    }
  ],
  "routing": {
    "domainStrategy": "IPOnDemand",
    "rules": [
      {
        "type": "field",
        "ip": ["geoip:private"],
        "outboundTag": "direct"
      }
    ]
  }
}
```

You only need to change the server IP, which is indicated in the configuration. The above configuration will forward all traffic to your server except for the LAN (e.g. access to the router).

<br />

## Run

---

- On Windows and macOS, the configuration file is usually a `config.json` file in the same directory as xray.
    - Just run `xray` or `xray.exe` directly.
- On Linux, the configuration file is usually located in the `/etc/xray/` or `/usr/local/etc/xray/` directory.
    - Run `xray run -c /etc/xray/config.json`
    - or use a tool such as systemd to run xray as a service in the background.

More detailed instructions can be found in the [configuration documents](../../config) and [usage tips](../../documents).
