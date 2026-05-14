# 资源目录说明

当前版本可以在没有任何外部资源文件的情况下直接运行：

- 角色立绘缺失时，会自动退回到首字占位卡片。
- 音效缺失时，使用 Web Audio API 合成点击、反驳、成功、失败提示音。
- 背景暂由 CSS 渐变与图形纹理生成。

如果后续需要接入正式资源，请优先放到以下目录：

- `assets/images/portraits/`
- `assets/images/backgrounds/`
- `assets/audio/`
- `assets/ui/`

具体文件建议命名与规格见 `docs/协作资源清单.md`。
