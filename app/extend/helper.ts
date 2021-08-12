import { unlink } from 'fs';
import { v4 } from 'uuid';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

export default {
    /**
     * 验证是否是null或undefined
     * @param value 值
     * @returns 是/否
     */
    isNullOrUndefined(value: any) {
        return value === undefined || value === null;
    },
    /**
     * 验证是否是null或undefined或空串
     * @param value 值
     * @returns 是/否
     */
    isNullOrUndefinedOrEmpty(value: any) {
        return value === undefined || value === null || value === '';
    },
    /**
     * 验证JWT_Token篡改
     * @param token 验证的token
     * @returns 原签名对象失败返回null
     */
    jwtVerify(token: string, key: string) {

        let payload: string | JwtPayload = '';
        try {
            payload = verify(token, key);
        } catch (err) {
            payload = '';
        }
        return payload;
    },
    /**
     * JWT签名
     * @param payload 签名数据
     * @param key 密钥
     */
    jwtSign(payload: string | object | Buffer, key: string) {
        return sign(payload, key);
    },
    /**
     * 将资源数据转为菜单JSON
     * @param data 资源表权限数据
     */
    makeMenu(data: any[]) {

        let menu: any[] = [];

        const menuItems = data.filter((i) => i.level === 0 || i.level === 1);
        const menuActions = data.filter((i) => i.level === 2);

        for (let i = 0; i < menuItems.length; i++) {

            if (menuItems[i].level === 0) {
                menu.push({
                    ...data[i],
                    children: null
                });
            } else {

                for (let j = 0; j < menu.length; j++) {
                    if (menuItems[i].pid === menu[j].id) {
                        const next = menuActions.filter(action => action.pid === menuItems[i].id);
                        menu[j].children = menu[j].children === null ? [] : menu[j].children;
                        menu[j].children.push({
                            ...menuItems[i],
                            children: next.length === 0 ? null : next
                        });
                    }
                }
            }
        }
        return menu;
    },
    /**
     * 生成新UUID
     * @returns UUID
     */
    newId() {
        return v4().replace(/\-/g, '');
    },
    /**
     * 删除文件
     * @param filePath 文件位置
     */
    delFile(filePath: string) {
        return new Promise((resolve, reject) => {
            unlink(filePath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(void 0);
                }
            });
        });
    }
}