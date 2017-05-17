import { getCookie } from './cookie';

const URL= "http://192.168.0.133:8080";

const TOKEN="";

export const api= {
    //获取用户列表
    getUserList : URL + "/oms/userController/getUserDatagrid.act?token=" + TOKEN,
    //用户编辑
    UserEditor : URL + "/oms/userController/updateUser.act?token=" + TOKEN,
    //用户新增
    UserAdded : URL + "/oms/userController/saveUser.act?token=" + TOKEN,
    //用户删除
    UserDelete : URL + "/oms/userController/deleteUserById.act?token=" + TOKEN,
    //密码重置
    UserPasswordReset : URL + "/oms/userController/reset.act?token=" + TOKEN,
    //角色
    UserRoleList : URL + "/oms/roleController/getRoleList.act?token=" + TOKEN,
    // 密码重置
    UserPasswordReset : URL + "/oms/userController/reset.act?token=" + TOKEN,
    //登录页面地址
    DoLogin:URL+"/oms/userController/doLogin.act",
    //菜单管理页面接口
    //1、新建菜单
    MenuAdded:URL+"/oms/menuController/saveMenu.act?token="+TOKEN,
    //2、渲染列表
    MenuList:URL+"/oms/menuController/getMenuDatagrid.act?token="+TOKEN,
    //3、修改数据
    MenuEditor:URL+"/oms/menuController/updateMenu.act?token="+TOKEN,
    //4、渲染下来列表
    MenuSelect:URL+"/oms/menuController/getParentMenuList.act?token="+TOKEN,
    //5、删除列表条数据
    MenuDel:URL+"/oms/menuController/deleteMenuById.act?token="+TOKEN,

    SystemLog:URL+"/oms/syslogController/getSyslogDatagrid.act?token="+TOKEN,

    DelSystemLog:URL+"/oms/syslogController/deleteSyslogById.act?token="+TOKEN,
    //客户管理
    //1、客户列表
    customerList:URL+"/oms/customerInfoController/getCustomerList.act?token="+TOKEN,
    //2、客户修改
    customerEdite:URL+"/oms/customerInfoController/updateCustomerInfo.act?token="+TOKEN,
    //3、客户禁用
    customerForbidden:URL+"/oms/customerInfoController/disableCustomer.act?token="+TOKEN,
    //4、客户删除
    customerDel:URL+"/oms/customerInfoController/delCustomer.act?token="+TOKEN,
    //5、密码重置
    customerReset:URL+"/oms/customerInfoController/resetPwd.act?token="+TOKEN,
    //6、查看客户订单列表
    customerOrderList:URL+"/oms/customerOrderController/getCustomerOrderDatagrid.act?token="+TOKEN,
    // 1、渲染数据
    serviceList:URL+"/oms/customerServiceController/queryCustomerList.act?token="+TOKEN,
    //2、服务处理列表
    handleService:URL+"/oms/customerServiceController/getCustomerServicesList.act?token="+TOKEN,
    //3、服务审核
    serviceAudit:URL+"/oms/customerServiceController/auditCustomerServices.act?token="+TOKEN,
    // 角色列表
    characterList : URL + "/oms/roleController/getRoleDatagrid.act?token=" + TOKEN,
    // 新建角色
    addUser:URL + "/oms/roleController/saveRole.act?token=" + TOKEN,
    // 角色拥有的权限
    UserJurisdiction:URL + "/oms/roleController/getRoleById.act?token=" + TOKEN,
    // 全部权限
    allJurisdiction:URL + "/oms/menuController/getMenuDatagrid.act?token=" + TOKEN,
    // 保存角色设置的权限
    saveUserJurisdiction:URL + "/oms/roleController/setRolePriv.act?token=" + TOKEN,
    //消息提醒
    NewMessage: URL + "/oms/messageController/getMessageList.act?token=" + TOKEN,
    // 产品上线/上传
    saveProduct: URL + "/oms/productController/saveProduct.act?token=" + TOKEN,
    chanpinupload:URL+"/oms/productController/upload.act?token=" + TOKEN,
    // 产品列表
    productList:URL+"/oms/productController/getProductDatagrid.act?token=" + TOKEN,
    // 删除产品
    delProduct:URL+"/oms/productController/deleteProductById.act?token=" + TOKEN,
    // 修改产品
    updatePub:URL+"/oms/productController/updateProduct.act?token=" + TOKEN,
    updateUpload:URL+"/oms/productController/updateUpload.act?token=" + TOKEN,
    // 产品详情
    productInfo:URL+"/oms/productController/getProductById.act?token=" + TOKEN,
    // 获取图片/文件  路径
    getAttach:URL+"/oms/attachController/getAttach.act?token=" + TOKEN,
    // 下载产品文档
    downloadT:URL+"/oms/attachController/download.act?token=" + TOKEN,
    // 获取所有的路径
    allPath:URL+"/oms/userController/getUserPriv.act?token="+TOKEN,
    // 流程规范列表
     getStandardDatagrid:URL+"/oms/standardController/getStandardDatagrid.act?token=" + TOKEN,
    //  流程规范上传
     saveStandard:URL+"/oms/standardController/saveStandard.act?token=" + TOKEN,
    //  流程规范修改
     updateStandard:URL+"/oms/standardController/updateStandard.act?token=" + TOKEN,
     //  流程规范删除
      deleteStandardById:URL+"/oms/standardController/deleteStandardById.act?token=" + TOKEN,
    //获取用户个人信息
    getUser : URL + "/oms/userController/getUser.act?token=" + TOKEN,
    //修改头像
    UserPhone : URL + "/oms/userController/updateUserPhoto.act",
    //修改个人信息
    changeUser : URL + "/oms/userController/updateUser.act?token=" + TOKEN,
    //订单管理列表
    getCustomerOrderDatagrid : URL + "/oms/customerOrderController/getCustomerOrderDatagrid.act?token=" + TOKEN,
    //订单管理状态数量
    getCustomerOrderCount : URL + "/oms/customerOrderController/getCustomerOrderCount.act?token=" + TOKEN,
    //订单管理详情
    getCustomerOrderById : URL + "/oms/customerOrderController/getCustomerOrderById.act?token=" + TOKEN,
    //产品类别/型号
    getChildCategoryListByParentNo : URL + "/oms/sysCategoryController/getChildCategoryListByParentNo.act?token=" + TOKEN,
    //产品网关
    getAllGateway : URL + "/oms/gatewayController/getAllGateway.act?token=" + TOKEN,
    //修改订单
    updateCustomerOrder : URL + "/oms/customerOrderController/updateCustomerOrder.act?token=" + TOKEN,
    //修改订单数量
    updateOrderItem : URL + "/oms/orderItemController/updateOrderItem.act?token=" + TOKEN,
    //修改设备详情
    saveEquipmentInfos : URL + "/oms/equipmentInfoController/saveEquipmentInfos.act?token=" + TOKEN,
    //所有实施人员
    allSSpeople : URL + "/oms/userController/getUserDatagrid.act?token=" + TOKEN,
    //获取设备列表
    getGatewayList : URL + "/oms/gatewayController/getGatewayList.act?token=" + TOKEN,
    //删除网关
    delGateway : URL + "/oms/gatewayController/delGateway.act?token=" + TOKEN,
    //修改网关
    updateGateway : URL + "/oms/gatewayController/updateGateway.act?token=" + TOKEN,
    //新增网关
    saveGateway : URL + "/oms/gatewayController/saveGateway.act?token=" + TOKEN,
    //绑定信息、设备中心搜索
    getEquipmentInfoList : URL + "/oms/equipmentInfoController/getEquipmentInfoList.act?token=" + TOKEN,
    //根据网关id获取设备列表
    queryEquipmentListByGatewaySid : URL + "/oms/gatewayController/queryEquipmentListByGatewaySid.act?token=" + TOKEN,
    // 迁徙网关
    exchangeGateway : URL + "/oms/gatewayController/exchangeGateway.act?token=" + TOKEN,
    //报警设置
    getWarningSettingBySn : URL + "/oms/warningSettingController/getWarningSettingBySn.act?token=" + TOKEN,
    //设置设备预警（保存/修改）
    saveWarningSetting : URL + "/oms/warningSettingController/saveWarningSetting.act?token=" + TOKEN,
    // 绑定信息列表
    getBindEquipmentList : URL + "/oms/equipmentInfoController/getBindEquipmentList.act?token=" + TOKEN,
    //设备解绑
    disBindEquipment : URL + "/oms/equipmentInfoController/disBindEquipment.act?token=" + TOKEN,
    // 退出、
    doLoginOut : URL + "/oms/userController/doLoginOut.act?token=" + TOKEN,
    //设置指令
    saveInstruction : URL + "/oms/instructionController/saveInstruction.act?token=" + TOKEN,
    //查看设备指令详情
    getEquipmentInstruction : URL + "/oms/instructionController/getEquipmentInstruction.act?token=" + TOKEN,
    //读取消息
    updateReadStatus : URL + "/oms/messageController/updateReadStatus.act?token=" + TOKEN
}
