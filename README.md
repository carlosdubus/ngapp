# ngapp-bundle
Bundle angular apps easily


Suppose you have this directory structure:

```
app
  controllers
    home.js
  index.js
  
```

index.js:
```js
module.exports = function(angular){
  return angular.module("myapp",[]);
}
```

controllers/home.js
```js
module.exports = function(app){
  app.controller("HomeCtrl",function($scope){
    $scope.hello = "world";
  });
}
```

Then you do:
```
npm install https://github.com/carlosdubus/ngapp-bundle -g
ngapp-bundle ./app > bundle.js
```

Then include bundle.js after angular in your website!

TODO: more detailed explanation
