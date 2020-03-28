Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: '推广链接'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '商家入驻'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '我的钱包'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '联系客服'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '我的团队'
    }],
  },
  methods: {
   
  }
})