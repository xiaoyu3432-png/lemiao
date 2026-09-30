---
name: 乐秒运动 · 小程序视觉系统
description: 利落、专业的青少年运动训练品牌；仅适用于小程序及其 H5 预览。
colors:
  accent: "#c8401d"
  accent-active: "#aa3213"
  accent-soft: "#fbeee8"
  accent-text: "#ac3517"
  ink: "#202624"
  muted: "#68716c"
  white: "#ffffff"
  paper: "#f5f5f1"
  line: "#e5e8e3"
  secondary: "#e9ece6"
  secondary-active: "#dfe3dd"
  notice: "#edf0eb"
  notice-text: "#5d6861"
  skeleton: "#e8ece7"
  image-placeholder: "#dce4de"
  court: "#202e28"
  home-orange: "#f45125"
  home-paper: "#f5f6f8"
  home-rail: "#f0f2f3"
  home-banner: "#234837"
  teaching-rail: "#f0f2ef"
  teaching-selected-text: "#b73b1b"
  campaign-cream: "#fff1d5"
typography:
  home-display:
    fontSize: "26px"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-.4px"
  home-course-title:
    fontSize: "14px"
    fontWeight: 750
    lineHeight: 1.5
  home-meta:
    fontSize: "12px"
    lineHeight: 1.5
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif"
    fontSize: "49rpx"
    fontWeight: 800
    lineHeight: 1.28
    letterSpacing: "-1rpx"
  headline:
    fontSize: "46rpx"
    fontWeight: 750
    lineHeight: 1.25
  section:
    fontSize: "36rpx"
    fontWeight: 700
    lineHeight: 1.3
  course-title:
    fontSize: "max(31rpx,14px)"
    fontWeight: 750
    lineHeight: 1.5
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif"
    fontSize: "28rpx"
    lineHeight: 1.6
  course-meta:
    fontSize: "max(23rpx,12px)"
    lineHeight: 1.5
  action:
    fontSize: "max(28rpx,14px)"
    fontWeight: 650
    lineHeight: 1.7
  filter:
    fontSize: "max(26rpx,14px)"
    lineHeight: 1.6
  price:
    fontSize: "38rpx"
    fontWeight: 750
rounded:
  square: "0"
  label: "4rpx"
  compact: "8rpx"
  control: "12rpx"
  panel: "16rpx"
  circle: "50%"
spacing:
  micro: "8rpx"
  tight: "12rpx"
  small: "16rpx"
  medium: "20rpx"
  row-gap: "26rpx"
  row: "28rpx"
  page: "32rpx"
  section: "36rpx"
  page-bottom: "48rpx"
components:
  home-search:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "12px"
    height: "46px"
  home-course-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.home-course-title}"
    rounded: "0"
    padding: "13px 0"
    width: "100%"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "18rpx 28rpx"
  button-primary-active:
    backgroundColor: "{colors.accent-active}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "18rpx 28rpx"
  button-secondary-active:
    backgroundColor: "{colors.secondary-active}"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.filter}"
    rounded: "{rounded.square}"
    padding: "18rpx 0"
  demo-label:
    backgroundColor: "{colors.notice}"
    textColor: "{colors.notice-text}"
    rounded: "{rounded.label}"
    padding: "5rpx 12rpx"
  course-card:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "28rpx 0"
    width: "100%"
  navigation:
    backgroundColor: "{colors.white}"
    textColor: "{colors.muted}"
  navigation-selected:
    textColor: "{colors.accent}"
---

# Design System: 乐秒运动 · 小程序

## Overview

**Creative North Star: "每一秒向前的训练场"**

乐秒采用用户已确认的“利落、专业，偏运动训练品牌”方向。原创 LM 跑道标志、训练场摄影、运动版画海报与装备静物插画建立身份；白色阅读面、石墨文字和信号橘红操作提供清晰秩序。页面围绕课程浏览，优先让家长读到运动项目、授课方式、适龄、时长与示例价格。

**首页方向更新：** 用户后续明确要求按提供的截图重建首页，并使用2D插画。这一指令覆盖先前首页的白底摄影构图：当前首页为橘色品牌刊头、搜索框、运动插画轮播、三项入口、地点提示、授课方式筛选及左分类栏/右紧凑课程目录。随后按用户要求调整筛选尺寸和配色、增加营销主题插画：轮播共四张，活动页同步展示三组主题。详情摄影和个人页装备插画保持原状。

本系统仅适用于 `apps/miniapp` 的微信小程序与 H5 预览，不代表后台已改版。视觉方向依据 `.impeccable/miniapp-direction.md`；旧版 `PRODUCT.md` 保留，不借本次文档更新重写产品事实。课程演示、未接入、加载失败和无结果状态必须继续可见，不新增预约、支付或登录能力。

**Key Characteristics:**

- 明亮、利落、专业的运动训练品牌。
- 原创 LM 标志、训练场摄影、运动版画与装备插画各有明确职责。
- 单列课程列表、细分隔线与紧凑线性图标构成主要信息秩序。
- 图片是品牌情境素材；课程事实来自服务端，功能状态如实表达。

## Colors

橘红负责行动与价格，白色和偏暖纸色负责阅读，石墨黑负责结构；暗绿来自训练场语境，保持辅助地位。前置 YAML 中的值是规范 token，以下描述用途。

### Primary

- **信号橘红（accent）**：主要按钮、课程价格、已选导航与筛选指示线。按压使用 `accent-active`。
- **首页橘色（home-orange）**：截图方向下的首页刊头与2D主视觉背景；首页目录使用 `home-paper`、`home-rail`，活动横幅使用 `home-banner`。这是首页局部配色，不替换全局操作橘红。
- **浅橘底与深橘字（accent-soft / accent-text）**：已选运动分类，同时保留图标和状态语义。

### Secondary

- **训练场深绿（court）**：个人页品牌面板；摄影中的球场绿延续该氛围。不要扩展为第二套主要按钮。

### Neutral

- **石墨（ink）**：标题、主要正文与功能图标。
- **信息灰（muted）**：年龄、时长、说明、未接入状态及未选导航。
- **白色 / 纸色（white / paper）**：首页与详情用白底；活动、个人页使用纸色底，局部白色服务容器。
- **分隔灰（line）**：课程行、筛选区和服务列表的边界。
- **浅灰操作面（secondary / secondary-active）**：次要按钮及其按压状态。
- **演示提示底与文字（notice / notice-text）**：演示标签；`notice` 也用于课程行按压反馈。
- **骨架灰 / 影像占位灰（skeleton / image-placeholder）**：加载过程与图片占位。

**The Action Signal Rule.** 主要操作、价格和选中状态共享橘红；正文保持石墨或信息灰，不能只靠颜色表达状态。

## Typography

**Display / Body Font:** 微信端使用系统中文字体栈，见前置 token。H5 使用本地 `Lemiao UI`（Noto Sans SC 界面文字子集，400/700），后备为系统中文字体；许可证与来源保存在 `assets/brand/fonts/`。新增字符允许系统回退，不依赖外部字体网络。

字体关系依靠字重和尺度建立；大标题短而有力，课程名称保留完整信息，不使用装饰字体。价格使用等宽数字 `tabular-nums`。

- **Display**：保留旧摄影构图的提取值；当前首页轮播使用 `home-display`，350px及以下为23px。活动主题图标题为24px / 750 / 1.4，窄屏21px；原单张版画的76rpx标题不再使用。
- **Headline / Section**：页面标题和章节标题。活动与个人页有适应篇幅的局部字号，通用层级见前置 token。
- **Course Title / Body / Course Meta**：课程名称、正文、课程属性；详情正文使用更宽松行高（1.95）。
- **Action / Filter**：按钮、授课方式筛选；选中筛选加粗并显示橘红下划线。
- **Price**：列表价格；详情专用更大价格（52rpx / 750），始终附示例价格说明。

**The Small Screen Reading Rule.** 当前代码在 320px 下为课程分类、年龄/时长与示例价说明保留 12px 下限，为课程标题、首页主要操作和全局主次按钮保留 14px 下限；主要操作触控高度至少 44px。其他辅助标签仍使用各自 rpx 值，这不是已全局兜底的声明；新增或改动必要信息按这些下限复核。

首页更新后 `HomeCourseRow` 使用固定14px标题与12px标签/年龄时长/示例价说明。首页搜索14px、入口16px（窄屏14px），筛选及主视觉按钮13px、辅助说明可为11px；所有独立主要操作区域至少44px高。上述旧版首页操作14px下限不再描述新首页现状，全局主次按钮规则不变。

## Layout

整体保持手机窄栏。其他页面内边距为左右/上方 `page`、底部 `page-bottom`；旧 `CourseCard` 的202 × 216rpx照片规格仍留存于组件，不再用于当前首页。长标题自然换行，文字列 `min-width: 0`，不得挤掉价格或属性。

当前首页最大宽480px，去除全局页面内边距。橘色刊头含46px高搜索面与232px高轮播；目录顶部18px圆角并向上叠10px。三项入口横排，下一行是地点提示和授课方式筛选。分类栏宽78px，右侧内容弹性填充且有12px内边距；课程缩略图76 × 100px。350px及以下分类栏68px、内容左右9px、缩略图65 × 92px，保持两栏目录。该首页使用px布局，其他页面保留rpx及其局部px样式。

`pages.json` 的 rpx 计算基准是 375px，最大设备宽度是 600px。H5 到 600px 及以上时，内容与底部导航同步限制为 480px 并居中；基础 `.page` 的 760px 是未触发该 H5 规则时的上限，不是桌面扩展版布局。保持原生导航栏与底部三项导航：首页、活动专区、我的。

详情封面为580rpx。活动页改为三组营销主题，每组图面高180px、圆角12px，350px及以下图面155px；组间距28px，标题17px、筹备中标签12px、说明13px。首页轮播与活动主题插画使用 `widthFix`，课程2D缩略图、横幅及详情照片使用 `aspectFill`，标志与功能图标使用 `aspectFit`。必要信息和操作始终是原生文字，不烘焙进海报。

## Elevation & Depth

界面没有投影词汇。通过白色/纸色表面、细分隔线、影像裁切和深绿品牌面板区分层次。不要给每段内容增加悬浮卡片或阴影；照片自身的光影属于素材，不属于界面阴影。

**The Flat Training Surface Rule.** 默认表面保持平整，边界依靠留白、实色与 1px 分隔线。

其他页面带 `brand-photo` 的图片使用饱和度从0.45到1的轻量过渡（700ms，`cubic-bezier(.16,1,.3,1)`）。当前首页2D图不应用该动画。减少动画偏好下关闭CSS动画与过渡；首页搜索/探索课程的页面滚动另有200ms命令行为，不据此声称所有命令动画均已适配减少动画。

## Shapes

圆角保持小而克制：标签、紧凑操作、按钮/图片、主视觉/面板依次使用前置 rounded token。课程行与筛选底线保持方正。圆形仅用于头像或错误状态图标底，不扩展为通用容器。

LM 标志是原创前倾跑道几何图形，保持宽高比、留白及方向，不拉伸或任意旋转。13 类功能图标均源于本地手绘 SVG：48 × 48 viewBox、2.6 线宽、圆端点与圆连接，分别有墨黑、橘红、白色、灰色版本；运行时为 72px PNG，底部导航另有选中/未选中 PNG。

## Components

### Buttons

主要按钮为橘红实底白字，次要按钮为浅灰底石墨字；圆角、字号、内边距见前置 token。最小高度 `max(88rpx,44px)`，按压加深底色。键盘焦点使用橘红 3px 轮廓并外移 3px；没有悬停位移。禁用按钮采用灰字灰底，但“尚未接入”服务当前以静态信息行表达，不制造可点击假入口。

### Chips and Filters

当前首页采用入口文字/图标加短下划线、灰色分段授课方式轨道、左栏白底与橘红竖线的分类选中态。授课方式每项实际触控区域48 × 44px，内层可见选中面高28px、圆角7px、白底橘字与1px浅边框；轨道圆角10px，上下各内收5px。文字13px，选中700字重，保留 `aria-pressed`。附近课和找教练进入明确未接入状态；全部地区只弹出地点服务未接入提示。以下横向运动分类与下划线筛选为旧首页实现记录，不用于覆盖新目录。

授课方式筛选为透明文字按钮，下沿橘红 4rpx 指示线代表选中；运动分类为图标加文字，选中后增加浅橘底。二者有 `aria-pressed` 状态。演示标签是信息提示，不是筛选按钮，不暗示操作。

### Cards / Containers

当前首页使用 `HomeCourseRow`：2D缩略图、14px完整名称、两枚12px属性标签、12px年龄/时长、橘红价格及“详情”提示。整行是唯一跳转按钮，“详情”是行内视觉提示，不是独立小触控按钮。分类标签浅绿，授课方式标签浅米色；无结果与请求错误在右目录内显示紧凑反馈。原 `CourseCard` 保留，不再用于首页。

课程组件是整行可点击的无外框列表项：左图、分类/授课方式、标题、年龄/时长、示例价、箭头按固定阅读顺序排列。底部 1px 分隔线与按压底色提供边界和反馈。个人页服务区和详情事实区才使用成组容器；不要把每一条课程属性单独包成卡片。

### Navigation

首页配置 `navigationStyle: custom`，橘色品牌导航预留微信实际状态栏及系统胶囊空间，不绘制假胶囊。其他页面保留uni-app原生白底黑字导航。底部白底，未选为信息灰，选中为橘红；宽屏H5与内容同宽。详情通过课程id导航，底部保持首页、活动专区、我的三个入口，不增加AI标签。

### Homepage Search

白底12px圆角搜索框嵌在橘色刊头中，输入文字14px，提交/清空按钮44 × 46px并提供可访问名称。搜索仅在已加载的服务端演示课程名称、分类、描述中匹配；输入会重置分类与授课方式，提交滚动到目录。不声称地点搜索、教练搜索或真实预约已接入。

### Feedback States

加载时显示与课程行结构一致的静态骨架。空结果与不存在的课程使用装备插画，并给出“查看全部课程”或“返回首页”；请求错误使用刷新图标、文字原因和重试按钮。保留这些真实状态，不以装饰性空白或虚构成功提示替代。

### Brand Imagery

**轮播与营销主题增量：** `HomeCarousel.vue` 使用原始课程主视觉加亲子、跳绳、篮球伙伴三张新图，共四张；共享 `content/campaigns.ts`，活动页复用三组主题。自动间隔5500ms、切换350ms、循环播放，提供上一张/下一张/暂停和当前页码；页面隐藏停止自动播放，H5初次读取减少动画偏好时默认暂停。控制按钮当前为44 × 44px，主操作最小高44px。课程首图进入目录，其余主题进入活动页，不提供实际报名、优惠或预约。主题色为橘色、奶油色、深绿，文字和状态均由原生控件显示。

七张内置 image_gen 素材分别为 LM 标志、训练主视觉、运动版画海报、篮球/体适能/跳绳照片、装备插画。运行素材位于 `apps/miniapp/src/static/brand/`，原图、原始提示词与来源清单位于 `assets/brand/`，所有运行路径本地化。人物和场景只代表品牌情境，不代表真实学员、教练或已举办活动；活动文案保留“筹备中”“尚未接入”和非招募提示。

首页新增五张同工具生成的2D图：`home-illustration`、`course-banner`、`basketball-2d`、`fitness-2d`、`rope-2d`，提示词与来源保存在 `assets/brand/home-2d-manifest.json`。原七张素材仍保留，首页2D与其他页面摄影并存，不能将新首页方向推广成全端重绘。

后续新增 `campaign-family`、`campaign-rope`、`campaign-team` 三张营销插画，均为品牌主题概念。核验增量来源：`HomeCarousel.vue`、`content/campaigns.ts`、首页授课筛选样式、活动页，以及 `.impeccable/review/carousel-390.png`、`carousel-320.png`、`campaigns-320.png`。

当前已实现首页课程搜索输入框，没有登录或预约表单。核验来源：`apps/miniapp/src/styles/global.scss`、`components/*.vue`（含新增 `HomeCourseRow.vue`）、四个 `pages/**/*.vue`、`pages.json`、`assets/brand/README.md`、`source-manifest.json` 与 `home-2d-manifest.json`。机器可读扩展见 `.impeccable/design.json`；旧组件预览将rpx按375px基准换算为px，新首页组件直接使用px，只用于展示。

## Do's and Don'ts

### Do:

- **Do** 延续利落、专业的训练品牌，把课程项目、适龄、时长、授课方式和示例价放在清楚的阅读顺序中。
- **Do** 使用本地 LM 标志、统一摄影、版画和线性图标，并保留原始提示词、来源和许可记录。
- **Do** 在 320px 检查课程分类、年龄/时长、示例价说明 12px，课程标题和主要操作 14px，主要触控高度 44px 的下限。
- **Do** 同时保留演示、未接入、错误、无结果提示与减少动画支持。
- **Do** 将本规范限定于小程序及其 H5 预览；后台样式仍保持原状。

### Don't:

- **Don't** 引入低龄吉祥物、霓虹渐变、通用人物插画或装饰卡片堆叠。
- **Don't** 把生成的情境素材声称为真实学员、教练或已经发生的活动。
- **Don't** 把示例价格包装为可交易报价，或通过视觉假装预约、支付、登录已经接入。
- **Don't** 用海报内嵌字替代必要信息，或拉伸、旋转 LM 标志。
- **Don't** 将旧版 PRODUCT.md 的保留误解为后台已更新或产品范围已扩展。
