# 小程序视觉改版

Mode: Operate. Scope: miniapp only. 用户已选择“利落、专业，偏运动训练品牌”。采用 code-led 实现。

## Direction contract
THESIS: 乐秒是以课程为核心的青少年运动训练品牌，清楚呈现项目、年龄、时长和授课方式。
OWN-WORLD: 信号橘红、石墨黑、白色表面；原创 LM 跑道标志。用户后续明确要求按提供的截图重建首页并使用2D插画，该指令覆盖旧版首页的白底摄影方向。首页使用橘色刊头、运动2D插画与紧凑目录；详情摄影、活动版画和个人页装备插画保持原实现。拒绝低龄吉祥物、渐变、装饰卡片堆叠。
STORY: 家长搜索课程或运动项目，通过授课方式及左侧分类筛选服务端演示课程，点击整行进入既有详情。附近课、教练和地点服务明确尚未接入；活动及个人服务继续明确未接入。
FIRST VIEWPORT: 橘色自定义品牌导航与搜索框，2D少年运动主视觉和原生标题；下接附近课/找课程/找教练入口、全部地区提示与全部/团课/私教筛选。目录以左侧分类栏、右侧活动横幅及紧凑课程行为核心。微信胶囊保留原生系统空间，不伪造胶囊；底部保持首页/活动专区/我的三项，不增加AI标签。
FORM: 用户指定的专业训练品牌方向优先于概念随机分配。seed 25b9cd84。白天手机使用场景要求亮底与足够对比度。后台保持原状。
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Constraints: 数据仍来自服务端；图片是生成的品牌情境素材，不声称实际学员或教练；不新增预约/支付/登录功能。

Homepage assets: 新增5张内置 image_gen 2D素材：home-illustration、course-banner、basketball-2d、fitness-2d、rope-2d；原提示词与来源见 assets/brand/home-2d-manifest.json，运行图在 apps/miniapp/src/static/brand/。首页最大宽480px，350px及以下收窄分类栏与缩略图；其他页面设计不随首页替换。
