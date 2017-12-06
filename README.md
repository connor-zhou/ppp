# 快速运行
+ 安装 `nodejs` 和 `npm`, windows下面不用单独安装 `npm`
+ 安装 `cnpm`和相关应用
    ```
    $ npm install -g cnpm --registry=https://registry.npm.taobao.org
    $ cnpm install bower grunt grunt-cli gulp typescript -g
    ```
+ 执行命令 `cnpm install`
+ 执行命令 `bower install`
+ 执行命令 `gulp` 访问 http://localhost:3000
# typings.json
    ```
    {
      "name":"yuangongdai_h5",
      "version":false,
      "globalDependencies": {
        // compile to es5 requeired es6-shim
        "core-js": "registry:dt/core-js#0.0.0+20160317120654"
      }
    }
    ```
# tsconfig.json
    ```
    {
      "compilerOptions": {
        // es5 is required by common borowsers
        "target": "ES5",
        "module": "system",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false
      }
    }
    ```
# 注意事项

+ `package.json`  `dependencies` 里面的版本被锁定了，防止错误升级
    
