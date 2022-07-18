# reactDreamWorks
    This is an open source real-time information release and display system platform,which is currently in the developing stage of version 1.0,including front-end display platform and background management system.

# Project design
    Current Stage:React18.0,Redux,react-router5,json-server,less,ant-Design
    Development Plan:Node.js for the backEnd Api,more modules(including UI/UX,JS Games),tailwind.

# Development considerations

1. some development standard matters
    1. all static resources should be put into assets Document
    2. display components and its router rules should be put into components Docoment
    3. DB for backend api currently,you should install json-server in your local environment `npm install -g json-server`,and then get into DB document,and run `json-server --watch .\db.json --port 8001` to start it
    4. router Document for router management
    5. util Document for Basic too functions

# Description of project document & structure
```js
NEWSSYSTEMSTATIC
├─ README.md // issue record、instructions and so on
├─ src
│  ├─ App.js
│  ├─ App.css
│  ├─ assets //static resources
│  ├─ components
│  │  ├─ client-header
│  │  ├─ copyright
│  │  ├─ news-manage
│  │  ├─ publish-manage
│  │  ├─ sandbox
│  │  └─ user-manage
│  ├─ db
│  │  ├─ test.json
│  │  └─ db.json //json-server file
│  ├─ redux
│  │  ├─ reducers
│  │  │  ├─ CollapseReducer.js  
│  │  │  └─ LoadingReducer.js  
│  │  └─ store.js 
│  ├─ router
│  │  └─ indexRouter.js // router management
│  └─ views
│     ├─ login // backend management system Login page
│     ├─ news // frontend display pages
│     └─ sandbox // backend management system Module pages
└─ setupProxy.js // server proxy file
```