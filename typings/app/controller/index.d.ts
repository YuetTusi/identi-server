// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportAttachmentDownload from '../../../app/controller/attachment/download';
import ExportAttachmentUpload from '../../../app/controller/attachment/upload';
import ExportAuthLogin from '../../../app/controller/auth/login';
import ExportCaseAttachCaseAttach from '../../../app/controller/case-attach/case-attach';
import ExportDefaultDefault from '../../../app/controller/default/default';
import ExportDictDict from '../../../app/controller/dict/dict';
import ExportMenuMenu from '../../../app/controller/menu/menu';
import ExportMessageMessage from '../../../app/controller/message/message';
import ExportPermissionLawCase from '../../../app/controller/permission/law-case';
import ExportPermissionResource from '../../../app/controller/permission/resource';
import ExportPermissionRole from '../../../app/controller/permission/role';
import ExportPermissionUser from '../../../app/controller/permission/user';
import ExportRecRec from '../../../app/controller/rec/rec';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    attachment: {
      download: ExportAttachmentDownload;
      upload: ExportAttachmentUpload;
    }
    auth: {
      login: ExportAuthLogin;
    }
    caseAttach: {
      caseAttach: ExportCaseAttachCaseAttach;
    }
    default: {
      default: ExportDefaultDefault;
    }
    dict: {
      dict: ExportDictDict;
    }
    menu: {
      menu: ExportMenuMenu;
    }
    message: {
      message: ExportMessageMessage;
    }
    permission: {
      lawCase: ExportPermissionLawCase;
      resource: ExportPermissionResource;
      role: ExportPermissionRole;
      user: ExportPermissionUser;
    }
    rec: {
      rec: ExportRecRec;
    }
  }
}
