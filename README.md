# 猫咪健康簿

为单猫家庭设计的本地优先健康记录 Web App。第一版聚焦：记住下一次驱虫时间，以及把零散的不适情况整理成可回顾的时间线。

**[直接体验示例 Demo](https://juzai0924-cloud.github.io/cat-health-journal/?demo=1)** · [打开安全使用版](https://juzai0924-cloud.github.io/cat-health-journal/)

## 已实现

- 体内、体外驱虫记录；按可配置周期自动计算下次日期
- 临期和逾期状态；一键导出系统日历事件
- 不适记录与自定义类型；支持发生时间、严重程度、描述和照片
- 时间线分类筛选、单猫资料、JSON 数据备份与恢复
- PWA 离线缓存，可添加到手机主屏幕
- 无密码示例 Demo：使用动态日期的虚构数据，仅存于内存，刷新即重置

## 隐私与安全

- 使用 Web Crypto API：PBKDF2-SHA-256（310,000 次迭代）派生不可导出的 AES-GCM-256 密钥
- 每次保存使用新的随机 IV；密码和解密密钥仅存在于当前页面内存
- 旧版明文数据在加密写入并成功回读后自动删除
- 备份文件保持加密，恢复前必须通过密码和完整性验证
- 导入数据按白名单重建，限制记录数量、字段长度、枚举、图片格式与体积
- Content Security Policy 禁止第三方脚本、对象、框架及非可信资源
- 不依赖第三方前端库，不向服务器发送健康记录

完整威胁模型与已知边界见 [SECURITY.md](./SECURITY.md)。

## 本地预览

```bash
git clone https://github.com/juzai0924-cloud/cat-health-journal.git
cd cat-health-journal
python3 -m http.server 4173
```

打开 `http://localhost:4173`。数据和压缩照片经加密后保存在当前浏览器，清理浏览器数据或换手机前请先导出加密备份。

## GitHub Pages

将本目录作为仓库根目录推送到 GitHub，在 Settings → Pages 中选择从主分支根目录发布。
