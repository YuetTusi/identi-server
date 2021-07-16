// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportAuthLogin from '../../../app/controller/auth/login';
import ExportDictDict from '../../../app/controller/dict/dict';
import ExportLawCaseLawCase from '../../../app/controller/law-case/law-case';
import ExportMenuMenu from '../../../app/controller/menu/menu';
import ExportPermissionResource from '../../../app/controller/permission/resource';
import ExportPermissionRole from '../../../app/controller/permission/role';
import ExportPermissionUser from '../../../app/controller/permission/user';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    auth: {
      login: ExportAuthLogin;
    }
    dict: {
      dict: ExportDictDict;
    }
    lawCase: {
      lawCase: ExportLawCaseLawCase;
    }
    menu: {
      menu: ExportMenuMenu;
    }
    permission: {
      resource: ExportPermissionResource;
      role: ExportPermissionRole;
      user: ExportPermissionUser;
    }
  }
}
