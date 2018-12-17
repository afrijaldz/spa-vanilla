function init() {
  new Router([
    new Route('home', 'home.html', true),
    new Route('about', 'about.html'),
    new Route('profile', 'profile.html')
  ])
}

init()