# 猫咪健康簿

一个移动端优先的猫咪健康记录工具，用来管理驱虫计划，并持续记录呕吐、软便、泪痕等不适情况。

## 立即使用

无需下载安装或注册账号，直接打开网页即可使用：

**[打开猫咪健康簿](https://juzai0924-cloud.github.io/cat-health-journal/)**

想先了解功能、不保存真实记录，也可以打开：

**[体验示例 Demo](https://juzai0924-cloud.github.io/cat-health-journal/demo.html)**

建议使用手机浏览器打开，并添加到主屏幕。之后可以像普通 App 一样从桌面进入。

## 添加到手机主屏幕

### iPhone

1. 使用 Safari 打开[猫咪健康簿](https://juzai0924-cloud.github.io/cat-health-journal/)。
2. 点击浏览器底部的“分享”按钮。
3. 向下找到并点击“添加到主屏幕”。
4. 点击右上角“添加”。

### Android

1. 使用 Chrome 打开[猫咪健康簿](https://juzai0924-cloud.github.io/cat-health-journal/)。
2. 点击浏览器右上角菜单。
3. 选择“添加到主屏幕”或“安装应用”。
4. 按照提示完成添加。

如果没有看到安装选项，可以先在浏览器中正常使用，之后重新打开页面再尝试。

## 功能

- 体内、体外驱虫记录与周期设置
- 自动计算下次驱虫日期，展示临期和逾期状态
- 呕吐、软便、泪痕、食欲异常等不适记录和自定义类型
- 发生时间、严重程度、文字描述和照片
- 健康时间线与分类筛选
- 驱虫日期导出到系统日历
- 本地数据导出与导入
- PWA 安装和离线访问
- 使用虚构数据、刷新即重置的示例 Demo

## 隐私

应用不设置账号，也不上传猫咪资料和健康记录。文字与照片只保存在当前设备的浏览器本地存储中。GitHub 仓库只包含应用代码和虚构 Demo 数据，不包含用户数据。

输入与导入数据会经过字段、长度和图片格式校验；页面通过 Content Security Policy 限制非可信资源。完整说明见 [SECURITY.md](./SECURITY.md)。

## 使用注意事项

- 不同手机或不同浏览器之间不会自动同步记录。
- 清除浏览器网站数据、卸载浏览器或更换手机，可能导致本地记录丢失。
- 建议定期在“设置与数据”中导出备份。
- 更换设备后，可通过“恢复备份”导入此前的数据。
- 添加照片时，可以直接拍摄，也可以从手机相册中选择。
- Demo 中的修改不会保存，刷新页面后会恢复初始示例。

## 本地运行

```bash
git clone https://github.com/juzai0924-cloud/cat-health-journal.git
cd cat-health-journal
python3 -m http.server 4173
```

通过浏览器打开 `http://localhost:4173`。PWA 安装和离线缓存需要 HTTPS 或 localhost 环境。
