var contextPath = '/sidemenu-bdd';

module.exports = {
  application: {
    contextPath: contextPath
  },
  plugins: {
    appSidemenu: {
      menuType: 'pushmenu', // pushmenu, flypanels
      contextPath: contextPath,
      interceptUrls: [contextPath + '/(.*)(1|2).html'],
      menuData: [
        {
          title: 'All Categories',
          id: 'menuID',
          icon: 'fa fa-reorder',
          items: [
            {
              name: 'Devices',
              id: 'itemID',
              icon: 'fa fa-laptop',
              link: '#',
              items: [
                {
                  title: 'Devices',
                  icon: 'fa fa-laptop',
                  link: '#',
                  items: [
                    {
                      name: 'Mobile Phones',
                      icon: 'fa fa-phone',
                      link: '#',
                      items: [
                        {
                          title: 'Mobile Phones',
                          icon: 'fa fa-phone',
                          items: [
                            {
                              name: 'Super Smart Phone',
                              link: '#devices/mobile-phones/super-smart-phone'
                            },
                            {
                              name: 'Thin Magic Mobile',
                              link: '#devices/mobile-phones/thin-magic-mobile'
                            },
                            {
                              name: 'Performance Crusher',
                              link: '#devices/mobile-phones/performance-crusher'
                            },
                            {
                              name: 'Futuristic Experience',
                              link: '#devices/mobile-phones/futuristic-experience'
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: 'Televisions',
                      icon: 'fa fa-desktop',
                      link: '#',
                      items: [
                        {
                          title: 'Televisions',
                          icon: 'fa fa-desktop',
                          link: '#',
                          items: [
                            {
                              name: 'Flat Super Screen',
                              link: '#'
                            },
                            {
                              name: 'Gigantic LED',
                              link: '#'
                            },
                            {
                              name: 'Power Eater',
                              link: '#'
                            },
                            {
                              name: '3D Experience',
                              link: '#'
                            },
                            {
                              name: 'Classic Comfort',
                              link: '#'
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: 'Cameras',
                      icon: 'fa fa-camera-retro',
                      link: '#',
                      items: [
                        {
                          title: 'Cameras',
                          icon: 'fa fa-camera-retro',
                          link: '#',
                          items: [
                            {
                              name: 'Smart Shot',
                              link: '#'
                            },
                            {
                              name: 'Power Shooter',
                              link: '#'
                            },
                            {
                              name: 'Easy Photo Maker',
                              link: '#'
                            },
                            {
                              name: 'Super Pixel',
                              link: '#'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: 'Magazines',
              icon: 'fa fa-book',
              link: '#',
              items: [
                {
                  title: 'Magazines',
                  icon: 'fa fa-book',
                  items: [
                    {
                      name: 'National Geographics',
                      link: '#'
                    },
                    {
                      name: 'Scientific American',
                      link: '#'
                    },
                    {
                      name: 'The Spectator',
                      link: '#'
                    },
                    {
                      name: 'Rambler',
                      link: '#'
                    },
                    {
                      name: 'Physics World',
                      link: '#'
                    },
                    {
                      name: 'The New Scientist',
                      link: '#'
                    }
                  ]
                }
              ]
            },
            {
              name: 'Store',
              icon: 'fa fa-shopping-cart',
              link: '#',
              items: [
                {
                  title: 'Store',
                  icon: 'fa fa-shopping-cart',
                  items: [
                    {
                      name: 'Clothes',
                      icon: 'fa fa-tags',
                      link: '#',
                      items: [
                        {
                          title: 'Clothes',
                          icon: 'fa fa-tags',
                          items: [
                            {
                              name: 'Women\'s Clothing',
                              icon: 'fa fa-female',
                              link: '#',
                              items: [
                                {
                                  title: 'Women\'s Clothing',
                                  icon: 'fa fa-female',
                                  items: [
                                    {
                                      name: 'Tops',
                                      link: '#'
                                    },
                                    {
                                      name: 'Dresses',
                                      link: '#'
                                    },
                                    {
                                      name: 'Trousers',
                                      link: '#'
                                    },
                                    {
                                      name: 'Shoes',
                                      link: '#'
                                    },
                                    {
                                      name: 'Sale',
                                      link: '#'
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              name: 'Men\'s Clothing',
                              icon: 'fa fa-male',
                              link: '#',
                              items: [
                                {
                                  title: 'Men\'s Clothing',
                                  icon: 'fa fa-male',
                                  items: [
                                    {
                                      name: 'Shirts',
                                      link: '#'
                                    },
                                    {
                                      name: 'Trousers',
                                      link: '#'
                                    },
                                    {
                                      name: 'Shoes',
                                      link: '#'
                                    },
                                    {
                                      name: 'Sale',
                                      link: '#'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: 'Jewelry',
                      link: '#'
                    },
                    {
                      name: 'Music',
                      link: '#'
                    },
                    {
                      name: 'Grocery',
                      link: '#'
                    }
                  ]
                }
              ]
            },
            {
              name: 'Collections',
              link: '#'
            },
            {
              name: 'Credits',
              link: '#'
            }
          ]
        }
      ]
    },
    appWebinject: {
      interceptor: 'tamper'
    },
    appWebweaver: {
      defaultRedirectUrl: contextPath + '/index'
    }
  }
};
