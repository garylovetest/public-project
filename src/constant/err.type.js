module.exports = {
    userFormateError: {
        code: '10001',
        message: '用户名或密码为空',
        result: ''
    },
    userAlreadyExisted: {
        code: '10002',
        message: "用户已存在",
        result: ''
    },
    userRegisterError: {
        code: '10003',
        message: '用户注册错误',
        result: ''
    },
    userDoesNotExist: {
        code: '10004',
        message: '用户不存在',
        result: ''
    },
    userLoginError: {
        code: '10005',
        message: '用户登陆失败',
        result: ''
    },
    invalidPassword: {
        code: '10006',
        message: '用户密码不匹配',
        result: ''
    },
    tokenExpiredError: {
        code: '10101',
        message: 'token过期',
        result: ''
    },
    invalidToken: {
        code: '10102',
        message: '无效的token',
        result: ''
    },
    hasNotAdminPermission: {
        code: '10103',
        message: '没有管理员权限',
        result: ''
    },
    fileUploadError: {
        code: '10201',
        message: '商品图片上传失败',
        result: ''
    },
    unSupportedFileType: {
        code: '10202',
        message: '不支持的文件格式',
        result: ''
    },
    goodsFormatError: {
        code: '10203',
        message: '参数格式错误',
        result: ''
    },
    publishGoodsError: {
        code: '10204',
        message: '发布商品失败',
        result: ''
    },
    invalidGoodsID: {
        code: '10205',
        message: '待修改的商品不存在',
        result: ''
    }
}