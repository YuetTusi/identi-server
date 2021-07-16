// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportTest from '../../../app/service/Test';
import ExportDictDict from '../../../app/service/dict/dict';
import ExportLawCaseLawCase from '../../../app/service/law-case/law-case';
import ExportMenuMenu from '../../../app/service/menu/menu';
import ExportPermissionResource from '../../../app/service/permission/resource';
import ExportPermissionRole from '../../../app/service/permission/role';
import ExportPermissionUser from '../../../app/service/permission/user';

declare module 'egg' {
  interface IService {
    test: AutoInstanceType<typeof ExportTest>;
    dict: {
      dict: AutoInstanceType<typeof ExportDictDict>;
    }
    lawCase: {
      lawCase: AutoInstanceType<typeof ExportLawCaseLawCase>;
    }
    menu: {
      menu: AutoInstanceType<typeof ExportMenuMenu>;
    }
    permission: {
      resource: AutoInstanceType<typeof ExportPermissionResource>;
      role: AutoInstanceType<typeof ExportPermissionRole>;
      user: AutoInstanceType<typeof ExportPermissionUser>;
    }
  }
}
