# Security

## 数据边界

本应用是无后端、本地优先的静态 Web App。猫咪资料、健康事件和照片不会上传到 GitHub；浏览器只持久化一个加密 vault。

## 加密设计

- KDF：PBKDF2-HMAC-SHA-256，310,000 次迭代，128-bit 随机盐
- 数据加密：AES-GCM-256，每次写入使用新的 96-bit 随机 IV
- 密钥：通过 Web Crypto API 生成且不可导出，只在解锁后的页面内存中存在
- 完整性：AES-GCM authentication tag 检测错误密码和密文篡改
- 备份：直接导出加密 vault，不导出解密后的业务对象

密码不会发送或持久化，因此遗忘后无法恢复数据。弱密码仍可能遭受离线猜测，建议使用至少 12 位的独立密码。

## 输入与内容安全

- 所有导入对象均通过字段白名单和上限校验后重建
- 图片仅接受 JPEG、PNG、WebP，拒绝 SVG、外部 URL 和超大文件
- 用户文本输出前进行 HTML 上下文编码
- CSP 仅允许同源脚本、样式、manifest、worker，以及受限的 data/blob 图片
- Service Worker 对页面采用网络优先，并在安全更新发布后立即接管

## GitHub Pages 已知边界

GitHub Project Pages 的不同仓库路径共享 `https://juzai0924-cloud.github.io` 这一浏览器 origin。锁定状态下，其他同源页面最多只能取得加密 vault；但若同源页面或 GitHub 账号本身被攻陷，仍可能在用户解锁期间攻击页面。

生产级隔离应把应用部署到只承载本项目的独立 origin，例如专用自定义子域。公开 GitHub 仓库不会暴露用户本地保存的数据。

## 报告问题

请勿在公开 Issue 中粘贴真实备份文件、密码、猫咪健康记录或照片。
