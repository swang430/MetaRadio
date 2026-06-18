# 素材库编目（AI 描述）· Asset Catalog

> 由 PR-IMG-1 产出。抽取源:`最新BP.pptx`(99 张内嵌图)、MWC `宣传物料交付包`(海报/展板/datasheet PDF + preview)、repo `public/images/`。
> 用视觉模型(Claude)逐张描述并初判用途。**这是后续"AI 槽位匹配 / 接图"的输入索引。**
> 重新抽取见 `tools/extract-assets.sh`(staging 落 `/tmp/mr-assets/`,不入 git)。
> 部署/图片策略见项目记忆 `deployment-model-c-images`(模型 C:图默认静态 public/,少数才走 Strapi+S3)。

---

## A. 可直接用(as-is)—— 优先接入

| 资产 | 来源 | 尺寸 | 类型 | 描述 | 建议槽位 |
|---|---|---|---|---|---|
| `pptx image2` | BP.pptx | 1924×1252 | 实拍/合成 | 工程师戴 AR 眼镜操作全息数据界面,实验室满是电路板 | **首页 Hero 背景** |
| `pptx image8` | BP.pptx | 2400×1014 | 装饰渐变 | cyan→navy 对角渐变,纯背景,正好品牌色 | 首页/区块 Hero 背景叠加 |
| `pptx image100` | BP.pptx | 2400×1350 | 3D 渲染 | 深 navy 上的曲面紫色硅晶圆/芯片宏观纹理 | **Foundations · GPU 加速栈** |
| `pptx image26` | BP.pptx | 3318×1264 | 概念图 | 铜/navy 缎带穿过中央 GPU 芯片,RF→GPU 融合 | Foundations · GPU 栈 / Liquid RF |
| `pptx image22` | BP.pptx | ~3000² | 概念图 | 铜缎带在 GPU 芯片周围成沙漏,软基带收敛意象 | **Liquid RF datasheet hero** |
| `pptx image25` | BP.pptx | ~3000² | 架构图 | 天线→「GPUDirect/RF 1-2ms」→发光 GPU,低时延直连 | Liquid RF datasheet hero |
| `pptx image24` | BP.pptx | 3344×1254 | 概念图 | 缎带+箭头升向卫星与「6G」标 | **首页场景卡 · V6 6G** |
| `pptx image99` | BP.pptx | ~1500² | 3D 场景 | 等距商场/楼层剖面,人形机器人在 cyan 连接环上,GPU Direct | **首页场景卡 · V5 机器人** |
| `repo sw_img1` | public/images | — | 技术图表 | matplotlib 堆叠柱「Power per Probe / Tx Contributions」 | 资源/L2 配图 |
| `repo sw_img2` | public/images | — | 技术图表 | 极坐标「Probe & Target Cluster Angles」 | 资源/L1 配图 |
| `repo sw_img3` | public/images | — | 技术图表 | viridis 热力图「Cluster-to-Probe Power(dB)」 | **Foundations · 电磁世界观** |
| `repo product.png` | public/images | — | Logo | 蓝色 "Lauraycs" 字标(心电线 + Wi-Fi 弧) | Lauraycs 品牌标(icon-pool) |

## B. 需裁切/作缩略(text-heavy 成品设计)

| 资产 | 来源 | 尺寸 | 描述 | 建议槽位 |
|---|---|---|---|---|
| `pdf panel_a_main` | MWC 展板A 主视觉 | 8683×5317 | 「电磁孪生与端侧AI」MetaRadio↔Lauraycs 双引擎主视觉 + KPI | **首页双重基础设施**(裁主视觉区) |
| `pdf panel_b_metaradio` | MWC 展板B | 8683×5317 | MetaRadio(Liquid RF)展板:Runtime 架构 + 六场景图标 | Liquid RF 页配图(裁) |
| `pdf panel_c_lauraycs` | MWC 展板C | 8683×5317 | Lauraycs 平台展板:L1/L2/L3 栈 + V1-V6 | Foundations / 产品页(裁) |
| `pdf poster_l1l3_stack` | MWC 海报 | 2835×7088 | 三层电磁孪生栈竖版海报 + KPI 8dB/0.5ms/≤325GHz | 资源中心海报缩略 |
| `pdf poster_verticals` | MWC 海报 | 2835×7087 | 六行业 V1-V6 竖版海报 + 公司事实 | 资源中心海报缩略 |
| `pdf poster_liquidrf` | MWC 海报 | 2835×7088 | Liquid RF 终端通算一体竖版海报 | 资源中心海报缩略 |
| `pptx image47` | BP.pptx | 2556×1438 | 四联:射线追踪波束/RSRP 热图/路测/仿真-实测对比 | **L1 datasheet hero**(裁波束或热图) |
| `pptx image23` | BP.pptx | ~3000² | 铜 PCB 条 "Simple RF / ADC-DAC" 极简射频前端 | Liquid RF datasheet(裁) |
| `repo sw_img4` | public/images | — | 微波暗室内景(蓝色吸波尖 + 橙色测试拱) | L1/L2 datasheet hero(裁,真实实拍) |
| `pdf ds_l1 / ds_liquidrf / onepager` | MWC | 745×1054 | A4 datasheet/一页纸版式(整页文字) | 资源下载缩略(raw-source) |

## C. 原始池(按需再抽,暂不逐张编目)
BP.pptx 剩余 ~80 张多为**图标/装饰碎片**(如 image17/19/20/21 芯片信号链小图标、image1/50/51 形状碎片/市场数字徽标)。需要时从 `tools/extract-assets.sh` 的 staging 里挑,或并入 PR-IMG-6 图标系统。

## D. 缺口(需业务方真实素材 —— 已知短板)
- **团队人像**:0 张 → §6.3 待补(关于页占位中)。
- **实验室/设备实拍**:仅暗室(sw_img4)+ 实验室合成(image2)→ 重庆/东莞/昆山实拍待补。
- **各 vertical 场景实拍**(V1 低空/V2 卫星/V3/V4 自驾):暂用品牌渲染顶替,可后补。
- **WebGPU 实时演示动画**:Phase 3。

---

### 提议的"槽位 → 素材"首版映射(待 PR-IMG-2 审批)
- 首页 Hero 背景 ← `image2`(或 `image8` 渐变叠加)
- 首页 双重基础设施 ← 已用 `产品战略图`;可选升级为 `panel_a` 主视觉裁切
- 首页 场景卡 ← V5=`image99` · V6=`image24`;V1-V4 暂缺(用渲染/占位)
- L1 datasheet hero ← `image47`(裁) 或 `sw_img4`(暗室)
- Liquid RF datasheet hero ← `image22` / `image25`
- Foundations:电磁=`sw_img3` · GPU=`image100`/`image26` · AI/飞轮=暂缺
- 资源中心 ← 三张 poster 缩略
