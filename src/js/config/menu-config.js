const fullMenus = [
  {
    title: '首页',
    key: 'Home',
    icon: 'icon-monitor',
    count: 1
  },
  // {
  //   title: 'Icons',
  //   key: 'Icons',
  //   icon: 'icon-heart'
  // },
  {
    title: '数据管理',
    key: 'DataManger',
    icon: 'icon-server',
    children: [
      {
        title: '数据查询',
        key: 'DataSearch'
      },
      {
        title: '脱敏字段配置',
        key: 'DataConfig'
      },
      {
        title: 'SQL操作记录',
        key: 'SQLOptionHistory'
      }
    ]
  },
  {
    title: '审批管理',
    key: 'ApprovalManger',
    icon: 'icon-paper-stack',
    children: [
      {
        title: '发起审批',
        key: 'LaunchApproval'
      },
      {
        title: '审批列表',
        key: 'ApprovalList',
        icon: 'icon-menu',
        children: [
          {
            title: '审批中',
            key: 'Approvaling',
          },
          {
            title: '已审批',
            key: 'Approvaled',
          }
        ]
      }
    ]
  },
  {
    title: '用户管理',
    key: 'UserManger',
    icon: 'icon-head',
    children: [
      {
        title: '用户列表',
        key: 'UserList'
      }
    ]
  },
  // {
  //   title: '权限管理',
  //   key: 'AuthorityManger',
  //   icon: 'icon-cog',
  //   children: [
  //     {
  //       title: '用户权限列表',
  //       key: 'UserAuthorityList'
  //     }
  //   ]
  // },
  // {
  //   title: '列表应用',
  //   key: 'tablelist',
  //   icon: 'icon-grid-2',
  //   children: [
  //     {
  //       title: '基础表格',
  //       key: 'TableBasic'
  //     },
  //     {
  //       title: '查询列表',
  //       key: 'TableSearch'
  //     }
  //   ]
  // },
  // {
  //   title: '表单应用',
  //   key: 'form-folder',
  //   icon: 'icon-paper',
  //   children: [
  //     {
  //       title: '基础表单',
  //       key: 'Form'
  //     },
  //     {
  //       title: '表单详情',
  //       key: 'FormDetail'
  //     }
  //   ]
  // },
  // {
  //   title: '模糊匹配',
  //   key: 'AutoComplete-folder',
  //   icon: 'icon-disc',
  //   children: [
  //     {
  //       title: '模糊搜索',
  //       key: 'Autocomplete1'
  //     },
  //     {
  //       title: '场景应用',
  //       key: 'Autocomplete2'
  //     },
  //     {
  //       title: '复杂场景',
  //       key: 'Autocomplete3'
  //     }
  //   ]
  // },
  // {
  //   title: '扩展组件',
  //   key: 'Advance-folder',
  //   icon: 'icon-bar-graph-2',
  //   children: [
  //     {
  //       title: '图表',
  //       key: 'Chart'
  //     },
  //     {
  //       title: '富文本编辑器',
  //       key: 'RicktextEditor'
  //     },
  //     {
  //       title: '代码编辑器',
  //       key: 'CodeEditor'
  //     },
  //     {
  //       title: 'Markdown编辑器',
  //       key: 'MarkdownEditor'
  //     }, {
  //       title: '百度地图',
  //       key: 'BaiduMap'
  //     }
  //   ]
  // },
  {
    title: '系统设置',
    key: 'SysSetting',
    icon: 'icon-cog',
    children: [
      {
        title: '个人中心',
        key: 'AccountBasic'
      },
      {
        title: '安全设置',
        key: 'SecuritySetting'
      },
      {
        title: '权限设置',
        key: 'Authorization'
      }
      // {
      //   title: '用户管理',
      //   key: 'Users'
      // }
    ]
  }
];

const getMenus = function (menuIdList = []) {
  return getAuthMenu(fullMenus, menuIdList);
};

let getAuthMenu = (menus, menuIdList) => {
  let configMenu = [];
  for (let menu of menus) {
    let m = Utils.copy(menu);
    if (menuIdList.indexOf(m.key) > -1) {
      configMenu.push(m);
    }
    if (menu.children && menu.children.length) {
      m.children = getAuthMenu(menu.children, menuIdList);
    }
  }
  return configMenu;
};

const getKeys = function (menus) {
  let keys = [];
  for (let menu of menus) {
    keys.push(menu.key);
    if (menu.children && menu.children.length) {
      keys.push(...getKeys(menu.children));
    }
  }
  return keys;
};

let fullMenuKeys = getKeys(fullMenus);

const isAuthPage = function (name) {
  let menus = G.get('SYS_MENUS') || [];
  if (fullMenuKeys.indexOf(name) > -1 && menus.indexOf(name) == -1) {
    return false;
  }
  return true;
};

export { getMenus, fullMenus, fullMenuKeys, isAuthPage };
