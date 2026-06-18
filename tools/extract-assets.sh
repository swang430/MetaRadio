#!/usr/bin/env bash
# 把分散在 PPTX / MWC 物料 PDF / repo 里的候选图抽取到一个 staging 目录，供人/AI 编目挑选。
# 产物落 /tmp/mr-assets（不入 git）；编目结果见 docs/assets-catalog.md。
# 依赖：unzip、pdftoppm(poppler `brew install poppler`)、sips(macOS 自带)。
#
# 用法：bash tools/extract-assets.sh
set -euo pipefail

# —— 源路径（用户机绝对路径；换机器时改这里）——
KIT="${MR_MWC_KIT:-/Users/Simon/Library/CloudStorage/OneDrive-个人/2024/乾径/MWC 2026 SH/MWC26SH_宣传物料交付包}"
BP_PPTX="${MR_BP_PPTX:-/Users/Simon/Library/CloudStorage/OneDrive-个人/2024/乾径/材料/网站设计/AI和通信业务/乾径科技 最新BP.pptx}"
REPO="$(cd "$(dirname "$0")/.." && pwd)"
STAGE="${MR_STAGE:-/tmp/mr-assets}"

rm -rf "$STAGE"; mkdir -p "$STAGE/pptx" "$STAGE/pdf"

echo "→ 1/3 现有 PNG（MWC preview + repo public/images）"
find "$KIT" -iname '*.png' 2>/dev/null | while read -r f; do
  cp "$f" "$STAGE/mwc_$(basename "$f" | tr ' ·/' '___')" 2>/dev/null || true
done
cp "$REPO"/public/images/*.png "$STAGE/" 2>/dev/null || true

echo "→ 2/3 PPTX 内嵌图（BP）"
(cd "$STAGE/pptx" && unzip -o -q "$BP_PPTX" 'ppt/media/*' 2>/dev/null && mv ppt/media/* . 2>/dev/null && rm -rf ppt) || true

echo "→ 3/3 关键 PDF 第1页 → PNG（海报/展板/datasheet/一页纸）"
render() { [ -f "$1" ] && pdftoppm -png -r "${3:-90}" -f 1 -l 1 "$1" "$STAGE/pdf/$2" 2>/dev/null && echo "   ✓ $2"; }
render "$KIT/01_海报_Posters/MetaRadio · L1-L3 Stack Poster.pdf" poster_l1l3_stack
render "$KIT/01_海报_Posters/MetaRadio · Verticals Poster.pdf" poster_verticals
render "$KIT/01_海报_Posters/MetaRadio · Liquid RF Poster.pdf" poster_liquidrf
render "$KIT/06_展板_WallPanels/展板A_背墙_主视觉_2450x1500.pdf" panel_a_main 60
render "$KIT/06_展板_WallPanels/展板B_右墙_MetaRadio主推_2450x1500.pdf" panel_b_metaradio 60
render "$KIT/06_展板_WallPanels/展板C_左墙_Lauraycs底座_2450x1500.pdf" panel_c_lauraycs 60
render "$KIT/02_公司一页纸_OnePager/MetaRadio · Company One-Pager · 2026 · CN-EN.pdf" onepager
render "$KIT/03_产品Datasheet_Products/MetaRadio · L1 Ray Tracing Datasheet · with products · 2026.pdf" ds_l1
render "$KIT/03_产品Datasheet_Products/MetaRadio · Liquid RF Datasheet · 2026.pdf" ds_liquidrf

echo ""
echo "✅ staging: $STAGE  （顶层 $(ls "$STAGE"/*.png 2>/dev/null | wc -l | tr -d ' ') PNG · pptx $(ls "$STAGE/pptx" 2>/dev/null | wc -l | tr -d ' ') · pdf $(ls "$STAGE/pdf" 2>/dev/null | wc -l | tr -d ' '))"
echo "   下一步：对照 docs/assets-catalog.md 挑图，复制进 public/images/ 接入页面。"
