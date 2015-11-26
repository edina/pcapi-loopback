PCAPI LoopBack
==============

This is a implementation of the FieldtripGB backend using [LoopBack](https://strongloop.com/node-js/loopback-framework/)

Install
-------

### Requirements
- nodeJS
- npm


Clone the repository:

```
git clone https://github.com/edina/pcapi-loopback
```



Install node dependencies:

```
cd pcapi-loopback
npm install
```

Development
-----------

Not essential but if you want to use some tools from strongloop (Scaffolding, Arc Console, Process Manager) install them for the user using:

```
npm install -g strongloop
```

Before Run
---

Make sure that mongoDB is up and running. By default the database name is fieldtripGB. If you want to change the name go to server/datasources.json
and modify the database key under MongoDB entry.

Run
---

```
cd pcapi-loopback
node .
```