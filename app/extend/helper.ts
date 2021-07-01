import { JwtPayload, sign, verify } from 'jsonwebtoken';

export default {

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
    }
}