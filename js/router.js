function Router(routes) {
  try {
    if (!routes) {
      throw 'error: routes params is mandatory'
    }

    this.constructor(routes)
    this.init()
  } catch (error) {
    console.log(error)
  }
}

Router.prototype = {
  routes: undefined,
  rootElm: undefined,
  constructor: function (routes) {
    this.routes = routes
    this.rootElm = document.getElementById('app')
  },
  init: function() {
    const route = this.routes;

    (function (scope, route) {
      window.addEventListener('hashchange', (e) => {
        scope.hasChanged(scope, route)
      })
    })(this, route)

    this.hasChanged(this, route)
  },
  hasChanged: function (scope, routes) {
    if (window.location.hash.length > 0) {
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        
        if (route.isActiveRoute(window.location.hash.substr(1))) {
          scope.goToRoute(route.htmlName)
        }
      }
    } else {
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        if (route.default) {
          scope.goToRoute(route.htmlName)
        }
      }
    }
  },
  goToRoute: function (htmlName) {
    (function (scope) {
      const url = 'views/' + htmlName
      const xhttp = new XMLHttpRequest()

      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          scope.rootElm.innerHTML = this.responseText
        }
      }

      xhttp.open('GET', url, true)
      xhttp.send()
    })(this)
  }
}