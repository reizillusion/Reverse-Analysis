const line = (speaker, tag, text, extra = {}) => ({ speaker, tag, text, ...extra });

const player = (tag, text) => line("player", tag, text);
const npc = (tag, text) => line("npc", tag, text);
const system = (tag, text) => line("system", tag, text);
const cameo = (speakerName, tag, text, speakerType = "system") =>
  line("other", tag, text, { speakerName, speakerType });
const failure = (title, body, lines = []) => ({ title, body, lines });

export const evidenceLibrary = {
  "ev-continuity-def": {
    id: "ev-continuity-def",
    type: "定义",
    title: "连续的定义",
    summary: "函数在 x0 处连续，当且仅当 lim(x→x0) f(x) 存在且等于 f(x0)。",
    detail:
      "连续检验的是函数值与极限值能否接上，不检验导数是否存在。很多初学者把“图像好不好看”错当成定义本身，但分析学只认极限与函数值。",
  },
  "ev-diff-implies-cont": {
    id: "ev-diff-implies-cont",
    type: "定理",
    title: "可导必连续",
    summary: "若 f 在 x0 处可导，则 f 在 x0 处连续。",
    detail:
      "这是最常用也最容易被滥用的单向命题之一。它只允许从“可导”推出“连续”，不能反推，也不能从“不可导”推出“必不连续”。",
  },
  "ev-reverse-fallacy": {
    id: "ev-reverse-fallacy",
    type: "逻辑",
    title: "逆命题警报",
    summary: "由 P→Q 不能推出 Q→P；由“不 P”也不能直接推出“不 Q”。",
    detail:
      "把定理的方向写反，是分析学口试中最常见的事故之一。定理不是双向门，没写“当且仅当”的地方就不能擅自往回走。",
  },
  "ev-cusp-not-break": {
    id: "ev-cusp-not-break",
    type: "图形",
    title: "尖点不是断点",
    summary: "图像在某点拐得很急，说明斜率行为异常；但函数值仍可能与极限严丝合缝地接上。",
    detail:
      "尖点、折点、竖切线等现象主要影响的是可导性，不自动影响连续性。图像“看起来疼”不等于函数“已经断了”。",
  },
  "ev-abs-counterexample": {
    id: "ev-abs-counterexample",
    type: "反例",
    title: "反例：|x| 在 0",
    summary: "|x| 在 x=0 处满足左右极限都等于 0，且函数值也是 0，所以连续；但左右导数分别为 -1 与 1，因此不可导。",
    detail:
      "这是连续但不可导的标准范本。它之所以经典，是因为反例本身就把“连续”和“可导”这两个概念的边界画在了黑板正中央。",
  },
  "ev-left-right-derivative": {
    id: "ev-left-right-derivative",
    type: "结论",
    title: "左右导数判别",
    summary: "若左右导数都存在但不相等，则该点不可导。",
    detail:
      "这条结论能有效判定不可导，却无法直接判定不连续。它是“斜率不统一”的证据，不是“函数值断裂”的证据。",
  },
  "ev-evt": {
    id: "ev-evt",
    type: "定理",
    title: "极值定理",
    summary: "连续函数在闭区间 [a,b] 上一定能取得最大值与最小值。",
    detail:
      "这里“闭区间”不是装饰语。端点是否属于定义域，会直接决定上确界能不能真的落在某个函数值上。",
  },
  "ev-closed-interval": {
    id: "ev-closed-interval",
    type: "条件",
    title: "闭区间条件",
    summary: "很多一元分析结论要求定义域是闭且有界的区间；极值定理尤其依赖端点被包含。",
    detail:
      "一旦拿掉端点，函数就可能只无限逼近某个数，却永远碰不到它。教材里那对中括号不是排版情绪，而是命题真假的分界线。",
  },
  "ev-maximum-definition": {
    id: "ev-maximum-definition",
    type: "定义",
    title: "最大值的定义",
    summary: "f 在集合 D 上取得最大值，意指存在 x*∈D 使得对任意 x∈D 都有 f(x)≤f(x*)。",
    detail:
      "“最大值存在”必须包含一个真正落在定义域里的点。若只有一个上界数值，却没有点把它取到，那叫有上界，不叫有最大值。",
  },
  "ev-supremum-vs-maximum": {
    id: "ev-supremum-vs-maximum",
    type: "概念",
    title: "上确界不等于最大值",
    summary: "sup A 只是最小上界；只有当 sup A 真正属于 A 时，它才同时是 max A。",
    detail:
      "把 supremum 和 maximum 混为一谈，是开区间极值题里的常见坍塌点。前者是集合外部的序性质，后者是集合内部有成员站出来把它实现。",
  },
  "ev-open-interval-counterexample": {
    id: "ev-open-interval-counterexample",
    type: "反例",
    title: "反例：f(x)=x on (0,1)",
    summary: "f(x)=x 在 (0,1) 上处处连续，但最大上界是 1，而区间内任一点都满足 x<1，因此最大值不存在。",
    detail:
      "这是否定原命题最短的一刀。函数再连续，也无法把不属于定义域的端点 1 变成区间内某点。",
  },
  "ev-boundedness": {
    id: "ev-boundedness",
    type: "结论",
    title: "有上界不等于取到上界",
    summary: "函数值集合有上界，只能说明存在一个压在上面的数；并不说明这个数被某个函数值实现。",
    detail:
      "这是“有界”和“取极值”之间的关键鸿沟。很多看似顺滑的错误证明，最后都是在这道鸿沟前脚下一滑。",
  },
  "ev-counterexample-principle": {
    id: "ev-counterexample-principle",
    type: "逻辑",
    title: "反例原则",
    summary: "要否定“对所有对象都成立”的命题，只需给出一个满足前提但不满足结论的例子。",
    detail:
      "全称命题最怕一个真正合法的反例。分析学有时像在作业群里抓逻辑漏洞：你不需要把所有情况都重算一遍，只要举出一个满足前提却打破结论的例子，就足以推翻“处处成立”的断言。",
  },
  "ev-intermediate-value": {
    id: "ev-intermediate-value",
    type: "定理",
    title: "介值定理",
    summary: "连续函数在区间上会取到介于两端函数值之间的每一个中间值。",
    detail:
      "介值定理控制的是“中间值能否出现”，并不负责“最大值一定出现”。把它端来讨论极值，往往像拿学生证去刷食堂电表。",
  },
  "ev-ftc": {
    id: "ev-ftc",
    type: "定理",
    title: "微积分基本定理（第一部分）",
    summary:
      "若 f 在区间上可积，F(x)=∫(a→x)f(t)dt 连续；若 f 在 x0 连续，则 F 在 x0 可导且 F'(x0)=f(x0)。",
    detail:
      "这条定理至少有两层内容：先是“可积推出积分函数连续”，再是“在被积函数连续点可导”。任何把第二层扩写成“处处可导”的说法，都是把条件偷走了。",
  },
  "ev-ftc-continuity-condition": {
    id: "ev-ftc-continuity-condition",
    type: "条件",
    title: "连续性前提",
    summary: "要得到 F'(x0)=f(x0)，必须额外要求 f 在 x0 连续。",
    detail:
      "可积性只保证积分函数能连起来走，不保证每一步都光滑。真正决定某点能否求导的，是被积函数在该点的局部连续性。",
  },
  "ev-jump-integrable": {
    id: "ev-jump-integrable",
    type: "结论",
    title: "有限跳跃仍可积",
    summary: "像阶跃函数这样只有有限个间断点、且有界的函数，仍然是 Riemann 可积的。",
    detail:
      "这类函数不够平滑，但足够可积。它们正适合用来打脸“可积就自动处处可导”的夸张说法。",
  },
  "ev-step-function": {
    id: "ev-step-function",
    type: "反例",
    title: "反例：阶跃函数",
    summary: "令 f(x)=0（x<1/2），f(x)=1（x≥1/2）。它在 [0,1] 上可积，但在 x=1/2 处发生跳跃不连续。",
    detail:
      "它的优点是结构极其清楚：合法、可积、但在关键点不连续。作为反例，它像数分试卷里的重锤，短、硬、没有多余枝叶。",
  },
  "ev-step-integral-formula": {
    id: "ev-step-integral-formula",
    type: "计算",
    title: "阶跃函数的积分公式",
    summary: "对上述阶跃函数，F(x)=∫(0→x)f(t)dt 满足：x≤1/2 时 F(x)=0；x≥1/2 时 F(x)=x-1/2。",
    detail:
      "这个分段公式直接把“连续但带尖点”的图像算了出来。它不是凭直觉猜的，而是把积分定义老老实实分区间算出来的。",
  },
  "ev-non-diff-by-one-sided": {
    id: "ev-non-diff-by-one-sided",
    type: "结论",
    title: "左右导数不等则不可导",
    summary: "若某点左右导数分别存在且不相等，则该点不可导。",
    detail:
      "这是终局落锤的那条结论。很多“看上去差不多”的图像，只要左右斜率一算不一样，就会从“似乎平滑”瞬间跌回“不可导”。",
  },
  "ev-mean-value": {
    id: "ev-mean-value",
    type: "定理",
    title: "拉格朗日中值定理",
    summary: "函数在闭区间连续、开区间可导时，存在一点使导数等于平均变化率。",
    detail:
      "它很重要，也很容易被拿来做无关但气势很足的错误援军。不是每道题都需要中值定理，硬塞它往往只会让逻辑更拥堵。",
  },
  "ev-double-integral-cov": {
    id: "ev-double-integral-cov",
    type: "定理",
    title: "二重积分换元公式",
    summary:
      "若 T:(u,v)↦(x(u,v),y(u,v)) 可逆且足够光滑，则 ∫∫_D f(x,y)dA = ∫∫_R f(x(u,v),y(u,v)) |det ∂(x,y)/∂(u,v)| dudv。",
    detail:
      "换元不是把字母改名，而是把面积元也一起搬家。真正进入公式的是从新变量到旧变量的 Jacobian 绝对值，也就是面积缩放因子。",
  },
  "ev-linear-not-isometric": {
    id: "ev-linear-not-isometric",
    type: "概念",
    title: "线性变换也会缩放面积",
    summary: "“线性”只表示保持直线与原点，不表示长度、面积、体积自动保持不变。",
    detail:
      "旋转和反射是特殊的线性变换，会保面积；但剪切、拉伸、压缩同样是线性变换，却会改变面积。别把“线性”误听成“无损压缩”。",
  },
  "ev-jacobian-inverse-map": {
    id: "ev-jacobian-inverse-map",
    type: "计算",
    title: "逆变换与 Jacobian",
    summary:
      "若 u=x+y, v=x-y，则 x=(u+v)/2, y=(u-v)/2，故 det ∂(x,y)/∂(u,v) = -1/2，面积因子取绝对值为 1/2。",
    detail:
      "很多人先算出 det ∂(u,v)/∂(x,y)=-2，就直接把 2 塞进积分公式。这一步恰好反了：公式需要的是逆变换的 Jacobian，或者把 -2 取倒数后再取绝对值。",
  },
  "ev-jacobian-absolute": {
    id: "ev-jacobian-absolute",
    type: "条件",
    title: "Jacobian 取绝对值",
    summary: "面积元与体积元只关心缩放倍数，不关心映射是否翻转方向，因此换元公式里要取绝对值。",
    detail:
      "det 为负通常表示方向反转，而面积本身不会因为坐标系翻面就变成负的。积分里若没有额外定向结构，面积因子必须取绝对值。",
  },
  "ev-case4-region-map": {
    id: "ev-case4-region-map",
    type: "计算",
    title: "菱形区域的像",
    summary:
      "若 D={|x+y|≤1, |x-y|≤1}，令 u=x+y, v=x-y，则 D 恰好映到矩形 R=[-1,1]×[-1,1]。",
    detail:
      "这个换元之所以漂亮，正因为原本倾斜的菱形被拉正成了轴对齐的正方形。区域条件直接变成 |u|≤1, |v|≤1，积分限反而更干净。",
  },
  "ev-case4-integral-value": {
    id: "ev-case4-integral-value",
    type: "计算",
    title: "换元后的正确积分值",
    summary:
      "∫∫_D (x+y)^2 dA = ∫∫_R u^2 · (1/2) dudv = (1/2)(∫(-1→1)u^2du)(∫(-1→1)dv) = 4/3。",
    detail:
      "若忘掉 1/2，会把答案算成 8/3；若再把 Jacobian 的方向与绝对值搞混，连正负号都可能乱掉。这题最值钱的不是积分本身，而是换元时每一个因子的来源。",
  },
  "ev-conservative-criterion": {
    id: "ev-conservative-criterion",
    type: "定理",
    title: "保守场判别准则",
    summary:
      "在单连通区域内，若向量场 F=(P,Q) 一阶偏导连续且满足 ∂P/∂y = ∂Q/∂x，则 F 为保守场。",
    detail:
      "这条准则的关键词不是只有“偏导相等”，还包括区域的拓扑条件。把单连通删掉，就像把门锁拆了再说保险箱依旧安全。",
  },
  "ev-simply-connected-domain": {
    id: "ev-simply-connected-domain",
    type: "条件",
    title: "单连通条件",
    summary: "区域中每条闭曲线都能在区域内部连续缩成一点，这样的区域称为单连通。",
    detail:
      "R^2\\{(0,0)} 有一个洞，因此不是单连通。很多‘curl 为零就保守’的事故，都发生在大家把这个洞当成空气的时候。",
  },
  "ev-curl-zero-not-enough": {
    id: "ev-curl-zero-not-enough",
    type: "结论",
    title: "零旋度不自动推出保守",
    summary: "在非单连通区域上，即使 ∂P/∂y = ∂Q/∂x，也可能不是保守场。",
    detail:
      "零旋度是局部条件，保守性是全局性质。局部看着平静，不代表绕着洞兜一圈之后积分还会老老实实回到零。",
  },
  "ev-unit-circle-param": {
    id: "ev-unit-circle-param",
    type: "计算",
    title: "单位圆参数化",
    summary: "闭曲线 C: x=cos t, y=sin t, 0≤t≤2π，可写为 r(t)=(cos t,sin t)，且 r'(t)=(-sin t,cos t)。",
    detail:
      "这条参数化几乎是线积分里的标准发球动作。只要向量场在圆上也恰好沿切向转，积分常常会大幅简化。",
  },
  "ev-closed-curve-criterion": {
    id: "ev-closed-curve-criterion",
    type: "结论",
    title: "闭路积分判据",
    summary: "若 F 为保守场，则对区域内任意分段光滑闭曲线 C 都有 ∮_C F·dr = 0。",
    detail:
      "这是判定非保守场最直接的重锤之一：只要找到一条闭曲线使积分非零，‘存在势函数’这件事就当场破产。",
  },
  "ev-circle-integral-2pi": {
    id: "ev-circle-integral-2pi",
    type: "计算",
    title: "绕原点一周的积分",
    summary:
      "对 F(x,y)=(-y/(x²+y²), x/(x²+y²))，沿单位圆 r(t)=(cos t,sin t) 有 F(r(t))·r'(t)=1，因此 ∮_C F·dr = ∫(0→2π)1dt = 2π。",
    detail:
      "这不是‘差不多非零’，而是干干净净的 2π。只要这个值一出来，保守场与路径无关这层外衣就被当场扯掉了。",
  },
  "ev-nth-order-dimension": {
    id: "ev-nth-order-dimension",
    type: "定理",
    title: "n 阶线性齐次方程的解空间维数",
    summary: "n 阶线性齐次常微分方程的解空间是 n 维线性空间，需要 n 个线性无关解构成基本解组。",
    detail:
      "这条事实决定了高阶方程不可能只靠一两个常数随便糊过去。若你少写了一个独立解，就等于把整座解空间砍掉一块。",
  },
  "ev-repeated-root-theorem": {
    id: "ev-repeated-root-theorem",
    type: "定理",
    title: "重根对应的基本解结构",
    summary:
      "若常系数线性方程的特征方程有根 r，重数为 m，则对应的 m 个线性无关解为 e^(rx), x e^(rx), ..., x^(m-1)e^(rx)。",
    detail:
      "重根不是‘同一个指数解重复写 m 次’，而是会生成一串乘上 x 次幂的独立解。少一个 x，就少一维自由度。",
  },
  "ev-case6-charpoly": {
    id: "ev-case6-charpoly",
    type: "计算",
    title: "三重根特征方程",
    summary: "y'''-3y''+3y'-y=0 的特征方程为 r³-3r²+3r-1=(r-1)³=0，因此 r=1 是三重根。",
    detail:
      "把多项式看成 (r-1)^3 很关键，因为这一步直接告诉你：解不可能只停在 e^x 或 (C1+C2x)e^x，后面还必然跟着一个 x²e^x。",
  },
  "ev-wronskian-case6": {
    id: "ev-wronskian-case6",
    type: "计算",
    title: "Wronskian 判线性无关",
    summary:
      "对 y1=e^x, y2=xe^x, y3=x²e^x，有 W(y1,y2,y3)=2e^(3x) ≠ 0，因此三者线性无关。",
    detail:
      "Wronskian 在这里像点名册：只要它不为零，这三个解就不是同一个人换三套衣服，而是真正张成三维解空间的基本解组。",
  },
  "ev-third-order-ivp": {
    id: "ev-third-order-ivp",
    type: "条件",
    title: "三阶初值问题需要三个条件",
    summary: "三阶方程若要求唯一解，通常需要给出 y(x0), y'(x0), y''(x0) 三个初值。",
    detail:
      "这和一阶、二阶的情形完全同脉络：方程阶数决定自由常数的个数，也决定你需要多少初值才能把解锁死。",
  },
  "ev-case6-ivp-solution": {
    id: "ev-case6-ivp-solution",
    type: "计算",
    title: "特定初值下的解",
    summary:
      "若 y=(C1+C2x+C3x²)e^x，且 y(0)=0, y'(0)=0, y''(0)=2，则 C1=0, C2=0, C3=1，故唯一解为 y=x²e^x。",
    detail:
      "这一步把‘第三个独立解不是摆设’说得最彻底：若没有 x²e^x，你连这样一个再普通不过的初值问题都解不出来。",
  },
};

export const cases = [
  {
    id: "case-1",
    order: 1,
    shortLabel: "第一案",
    title: "尖点不是断点",
    subtitle: "可导、连续与逻辑箭头",
    difficulty: "基础",
    sceneLabel: "宿舍楼公共自习室",
    sceneAsset: "assets/images/backgrounds/dorm-study-room.jpg",
    objective:
      "拆穿“不可导所以不连续”的逻辑倒置，并严格说明 |x| 在 0 连续但不可导。",
    summary:
      "首案的难点不在计算，而在把两个很像的概念剥开：导数谈的是斜率，连续谈的是函数值与极限。魏同学的问题，是把一条单向定理说成了双向真理。",
    intro:
      "很多寝室都熄灯了，宿舍楼公共自习室里的白板却被魏同学占得满满当当。他突然用马克笔在板面上敲了一下，宣布今晚要当场拆掉一个“每学期都会在作业群复活一次的错误命题”。白板中央只写了一个熟得发烫的函数：|x|。有人低声说，完了，魏同学今晚显然没打算只刷题，他是来给概念清库存的。",
    player: {
      name: "王若臣",
      role: "计算机系本科生",
      glyph: "王",
      asset: "assets/images/portraits/player-wang.png",
    },
    npc: {
      name: "魏同学",
      role: "隔壁宿舍同级生",
      glyph: "魏",
      asset: "assets/images/portraits/student-wei.png",
    },
    maxCredibility: 7,
    failureText:
      "魏同学把白板笔扣上笔帽，语气平静得像在群里发最终勘误：你输的不是计算，而是把定理方向都看丢了。若连“推出”该往哪边走都守不住，分析学会把每一道题都变成迷宫。",
    initialEvidence: [
      "ev-continuity-def",
      "ev-diff-implies-cont",
      "ev-reverse-fallacy",
      "ev-cusp-not-break",
      "ev-abs-counterexample",
      "ev-left-right-derivative",
      "ev-mean-value",
    ],
    events: [
      {
        type: "dialogue",
        lines: [
          system(
            "旁白",
            "宿舍楼走廊尽头的窗缝里灌进一点夜风，公共自习室却比往常更安静。魏同学把“连续”和“可导”两个词写在白板两侧，中间只留了一支长长的箭头。",
          ),
          npc(
            "开场",
            "今天，我们讨论一下这次的作业，重点处理一个常年潜伏在作业纸里的病句。|x| 在 0 左右导数不同，所以它在 0 当然不连续。谁要是还分不清这两个概念，老师下次作业的红笔批注会替他分清。",
          ),
          cameo(
            "A同学",
            "小声",
            "魏同学这个语气，不像在讲题，像是要给一个逆命题当场送走。",
          ),
          player(
            "心声",
            "他说“当然”的时候，自习室里不少人都在点头。危险就在这里：一旦某句话听起来太顺，就得怀疑是不是把逻辑台阶偷偷拆掉了。",
          ),
          npc(
            "施压",
            "王若臣，你来。告诉大家，一个点连切线都站不稳，函数值凭什么站得稳？",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第一轮反驳",
          "既然 |x| 在 0 左右导数不同，它就不可能在 0 连续。一个点连切线都站不稳，函数值怎么可能站得住？",
        ),
        stages: [
          {
            kind: "choice",
            prompt: "先指出这句论证最根本的错误类型。",
            modeLabel: "选择突破口",
            correctOption: "reverse-theorem",
            options: [
              {
                id: "reverse-theorem",
                label: "把单向定理反着用了",
                detail: "先抓住逻辑方向错位，再谈具体函数。",
              },
              {
                id: "arithmetic-error",
                label: "左右导数算错了",
                detail: "这里数值并没算错，错的是从数值跳到结论的方式。",
              },
              {
                id: "insufficient-graph",
                label: "图像画得不够准确",
                detail: "问题不在草图精度，而在概念偷换。",
              },
            ],
            failureText: "这一步没掐住病根。魏同学真正偷换的不是数值，而是逻辑方向。",
            wrongChoiceResponses: {
              "arithmetic-error": failure(
                "抓错层级",
                "左右导数恰恰算得很对，错的是把“不可导”一路滑成了“不连续”。",
                [
                  npc(
                    "冷声",
                    "我还没糊涂到把 -1 和 1 算成一样。你若想赢我，别在算术草丛里找逻辑尸体。",
                  ),
                  player(
                    "心声",
                    "确实，这题的危险不在算错，而在算对以后说错。数院最吓人的从来不是失误，是自信地失误。",
                  ),
                ],
              ),
              "insufficient-graph": failure(
                "图像不是病灶",
                "图像只是外观，真正的病灶在于“可导必连续”被偷偷倒放了。",
                [
                  cameo(
                    "A同学",
                    "嘀咕",
                    "这就像说证明写崩是因为字不够工整。字难看顶多别扭，逻辑难看才真出事。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "击偏了",
              "这一步需要先拆逻辑箭头，而不是围着图像表情做文章。",
            ),
            successLines: [
              player(
                "切入",
                "问题不在左右导数不同，而在你把一条单向定理反着用了。这里不是计算事故，是逻辑方向事故。",
              ),
              npc(
                "眯眼",
                "哦？那你倒把这个方向写清楚。分析学里箭头一旦写反，整页纸都得跟着陪葬。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "拿出限定箭头方向的定理。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-diff-implies-cont"],
            failureText: "这一轮需要的是定理原文，先把方向锁死。",
            wrongEvidenceResponses: {
              "ev-mean-value": failure(
                "中值定理走错自习室",
                "中值定理很重要，但它今天只是围观群众，不是主证据。",
                [
                  npc(
                    "不耐",
                    "把中值定理拖进来，就像在讨论宿舍门禁时搬出食堂饭卡。都属于校园系统，但刷不到这扇门。",
                  ),
                ],
              ),
              "ev-left-right-derivative": failure(
                "证据级别不够",
                "左右导数不等只能说明不可导，不能替你说明定理方向。",
                [
                  player(
                    "心声",
                    "我拿的是症状，不是病因。魏同学在这一步问的是“凭什么能推”，不是“最后结论是什么”。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "还没碰到主干",
              "先把“可导必连续”这句话端上来，否则对方还能继续装作自己在按教材说话。",
            ),
            successLines: [
              player(
                "异议",
                "正确定理是：若 f 在 x0 处可导，则 f 在 x0 处连续。它只允许“可导→连续”，没有授权你写成“不可导→不连续”。",
              ),
              cameo(
                "A同学",
                "低声吸气",
                "来了，经典桥段：把必要条件认成充要条件。每届数分都有人在这一步栽跟头。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "再拿出一张逻辑卡，说明为什么不能把这条定理倒过来用。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-reverse-fallacy"],
            failureText: "魏同学的漏洞是逆命题误用，缺的正是这张逻辑说明。",
            wrongEvidenceResponses: {
              "ev-cusp-not-break": failure(
                "时机过早",
                "尖点与断点的区分当然重要，但此刻还得先把逻辑结构钉死。",
                [
                  player(
                    "心声",
                    "我已经摸到第二层漏洞了，可魏同学第一层逻辑还没认账。反驳顺序一乱，容易被他把话题拖走。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "论证缺了一块骨架",
              "这一步不是再举例，而是要说明“单向命题不能倒放”这件事本身。",
            ),
            successLines: [
              player(
                "追击",
                "由 P 推出 Q，不等于由 Q 推回 P，更不等于由“不 P”推出“不 Q”。你把“可导必连续”说成了“不可导必不连续”，这是标准的逆命题坍塌。",
              ),
              npc(
                "短暂停顿",
                "逻辑卡倒是打得漂亮。但图像在 0 那里明明拐得生硬，你又要怎么解释那种“像断了一下”的观感？",
              ),
            ],
          },
        ],
        resolvedLines: [
          system(
            "旁白",
            "白板前第一次安静下来。魏同学没再重复“当然”二字，而是把马克笔换到了另一只手里。",
          ),
        ],
      },
      {
        type: "dialogue",
        lines: [
          player(
            "心声",
            "他开始后退，但还没认输。很多错误证明就是这样：第一层逻辑被拆掉以后，会立刻躲进“图像直觉”这片烟雾里。",
          ),
          npc(
            "再辩",
            "别急着高兴。学生最爱犯的第二个错，就是把“图像看起来接上了”当作严谨证明。你若只会背箭头，接下来一样会输。",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第二轮反驳",
          "图像有尖角，就像把曲线在 0 处掰断再硬按在一起。视觉上都断了，连续两个字只是你们喜欢的修辞。",
        ),
        stages: [
          {
            kind: "evidence",
            prompt: "先澄清“尖点”和“断点”并不是一回事。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-cusp-not-break"],
            failureText: "先拆掉图像直觉里的错配，别让“拐得急”混成“已经断”。",
            wrongEvidenceResponses: {
              "ev-left-right-derivative": failure(
                "还在谈斜率",
                "左右导数不等能证明不可导，但魏同学这一轮故意把话题扯成了“图像看着像断点”。",
                [
                  npc(
                    "逼问",
                    "我知道左右导数不同。现在问的是：你如何阻止大家把“尖”误会成“断”？别只在斜率上兜圈子。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "概念没剥开",
              "这一击需要先把“几何外观”和“连续定义”拆成两张桌子，不能让它们混写在同一行里。",
            ),
            successLines: [
              player(
                "说明",
                "尖点只说明斜率行为突变，不说明函数值断裂。‘看起来拐得疼’是可导性的麻烦，不是连续性失守的判据。",
              ),
              cameo(
                "B同学",
                "低声",
                "原来图像看着拧巴，不等于定义上真的断了……这句还挺该记。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "回到严格定义：连续到底检查什么？",
            modeLabel: "出示证据",
            correctEvidence: ["ev-continuity-def"],
            failureText: "只要把连续定义完整写出，魏同学的“视觉论证”就站不住了。",
            wrongEvidenceResponses: {
              "ev-diff-implies-cont": failure(
                "定理还不够细",
                "这张卡能说明方向，却不能替你写出连续的判定标准。",
                [
                  player(
                    "心声",
                    "是的，现在不能只说“你方向错了”，还得把“什么叫连续”真正摆出来。否则魏同学还会在直觉里游泳。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "定义还没上板",
              "图像直觉已经说够了，这一步必须把连续的正式定义摆到白板中央。",
            ),
            successLines: [
              player(
                "定标",
                "连续只看一件事：lim(x→0)f(x) 是否等于 f(0)。它不检查切线漂不漂亮，也不在乎图像有没有脾气。",
              ),
              npc(
                "追问",
                "那你就别只讲原则。把 |x| 这道题自身算给自习室里的人看，别让定义停在口号上。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "给出这道题自己的铁证，完成连续性的核验。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-abs-counterexample"],
            failureText: "最后需要回到 |x| 本身，把极限、函数值和导数情况一并说完整。",
            wrongEvidenceResponses: {
              "ev-reverse-fallacy": failure(
                "逻辑已够，算例未落地",
                "你已经证明魏同学说法不合逻辑，但还没把 |x| 本身的连续性算完。",
                [
                  npc(
                    "敲桌",
                    "逻辑上的确抓到我一层错。但你若不把这道题本身讲完，这间自习室还是只会记住一句漂亮口号。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "还差题目本身",
              "这一轮已经进入收束阶段，需要直接落回 |x| 在 0 的具体事实。",
            ),
            successLines: [
              player(
                "落锤",
                "|x| 在 0 的左右极限都是 0，且 f(0)=0，所以它在 0 连续；但左右导数分别是 -1 和 1，因此它在那里不可导。结论应当是‘连续但不可导’，不是‘不连续’。",
              ),
              npc(
                "沉默后点头",
                "很好。尖点不是断点，斜率失控不等于函数值失联。你至少没让这两个概念在白板上打成一团。",
              ),
            ],
          },
          {
            kind: "choice",
            prompt: "用一句最完整的结论收束这一案。",
            modeLabel: "选择结论",
            correctOption: "continuous-not-differentiable",
            options: [
              {
                id: "continuous-not-differentiable",
                label: "|x| 在 0 连续但不可导",
                detail: "这正是极限与导数分别检验后的最终结论。",
              },
              {
                id: "differentiable-not-continuous",
                label: "|x| 在 0 可导但不连续",
                detail: "这同时违背了左右导数事实与可导必连续。",
              },
              {
                id: "neither",
                label: "|x| 在 0 既不连续也不可导",
                detail: "这又把第一轮已经拆掉的错误捡了回来。",
              },
            ],
            failureText: "收尾结论必须同时照顾连续性与可导性，不能只取其一。",
            wrongChoiceResponses: {
              "differentiable-not-continuous": failure(
                "结论整体翻车",
                "这不仅与左右导数矛盾，也直接撞上了“可导必连续”。",
                [
                  cameo(
                    "A同学",
                    "扶额",
                    "这已经不是把箭头写反了，这是把整张图直接转了个面。",
                  ),
                ],
              ),
              neither: failure(
                "把旧错捡回来了",
                "你前面好不容易拆掉“不可导所以不连续”，现在又亲手把它写回来了。",
              ),
            },
            genericFailureResponse: failure(
              "结论不完整",
              "最后一句话要精确落点：连续性与可导性分别判定，然后并列陈述。",
            ),
            successLines: [
              player(
                "收束",
                "这类题最该记住的不是某个函数，而是边界：连续关心函数值接不接得上，可导关心斜率是否统一。|x| 在 0 恰好连续，但没有统一的切线方向。",
              ),
              system(
                "结案",
                "案一告破：自习室里的人终于看到，数学里的“长得像”从来不能替代“定义写对了”。",
              ),
            ],
          },
        ],
        resolvedLines: [],
      },
    ],
    verdict:
      "首案并不靠炫技取胜，而是靠把两个最基础的概念彻底剥开。你让自习室里的人明白：图像的尖锐感属于可导性，函数值能否接上才属于连续性；至于定理箭头，谁敢擅自倒放，反例就会像马克笔一样砸回来。",
  },
  {
    id: "case-2",
    order: 2,
    shortLabel: "第二案",
    title: "上确界不在场",
    subtitle: "极值定理与开区间骗局",
    difficulty: "进阶",
    sceneLabel: "图书馆玻璃讨论间",
    sceneAsset: "assets/images/backgrounds/library-discussion-room.jpg",
    objective:
      "指出极值定理对闭区间的要求，区分 maximum 与 supremum，并用开区间连续函数给出完整反例。",
    summary:
      "第二案的对手不再粗暴地说错，而是把一条真定理剪掉最关键的前提后重新朗读。你必须先拆定理适用范围，再拆概念误混，最后用一个合法反例盖棺。",
    intro:
      "图书馆玻璃讨论间里总有一种危险的轻松感。刘同学擅长把证明讲得像捷径，把条件讲得像注脚。他把“连续函数在开区间上也能取到最大值”写在平板投屏中央时，甚至还配了一句：‘大家别把教材的中括号当宗教。’屋里的人笑了，除了你。",
    player: {
      name: "王若臣",
      role: "计算机系本科生",
      glyph: "王",
      asset: "assets/images/portraits/player-wang.png",
    },
    npc: {
      name: "刘同学",
      role: "图书馆讨论搭子",
      glyph: "刘",
      asset: "assets/images/portraits/student-liu.png",
    },
    maxCredibility: 8,
    failureText:
      "刘同学耸耸肩，把“严格定义才是重点”这句话故意拖得很长。你之所以失手，不是因为不会举例，而是没及时分清：有界不是极值，supremum 也不是 automatically maximum。",
    initialEvidence: [
      "ev-evt",
      "ev-closed-interval",
      "ev-maximum-definition",
      "ev-supremum-vs-maximum",
      "ev-open-interval-counterexample",
      "ev-boundedness",
      "ev-counterexample-principle",
      "ev-intermediate-value",
    ],
    events: [
      {
        type: "dialogue",
        lines: [
          system(
            "旁白",
            "图书馆讨论间的投屏有点偏蓝，把玻璃墙也映成了草稿纸颜色。刘同学一边翻笔记，一边用那种‘我只是帮你省时间’的语气开口。",
          ),
          npc(
            "开题",
            "我们别做教材的排版奴隶。函数在 (0,1) 上连续，又不是在野外乱跳，最大值当然能取到。闭区间只是课本写法比较保守。",
          ),
          cameo(
            "C同学",
            "低笑",
            "刘同学又开始‘把严格条件翻译成人话’了。上次他这么翻，半个 ε-δ 直接被翻没了。",
          ),
          player(
            "心声",
            "这次的错更滑。不是直接胡说，而是把正确定理削掉一点，再用口才把缺口抛光。",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第一轮反驳",
          "连续于 (0,1) 已经足够推出最大值存在，端点写不写，无非是教材洁癖。",
        ),
        stages: [
          {
            kind: "choice",
            prompt: "这段话第一刀应该切在哪？",
            modeLabel: "选择突破口",
            correctOption: "check-theorem",
            options: [
              {
                id: "check-theorem",
                label: "先核对定理适用条件",
                detail: "先证明他引用的根本不是原版极值定理。",
              },
              {
                id: "draw-graph",
                label: "先从图像直觉反驳",
                detail: "图像可以辅助理解，但这一步还不够致命。",
              },
              {
                id: "talk-derivative",
                label: "先讨论导数",
                detail: "极值定理这题还没轮到导数出场。",
              },
            ],
            failureText: "这一步应当先锁死定理文本，而不是被“直觉好像对”牵着走。",
            wrongChoiceResponses: {
              "draw-graph": failure(
                "先手不够硬",
                "图像能帮你看问题，但对方此刻打的是‘教材删节版定理’，先得把原文请回来。",
                [
                  player(
                    "心声",
                    "对，先别陪他聊直觉。跟会说话的人辩论，第一步就是把讨论拽回定义和定理原文。",
                  ),
                ],
              ),
              "talk-derivative": failure(
                "工具箱抽错层了",
                "这道题的核心是紧致性影子下的闭区间条件，不是导数。",
                [
                  npc(
                    "笑",
                    "我这里连导数都没登场，你倒先把它叫上台了。别让整门微积分都替你陪跑。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "节奏被带走了",
              "他在冒充极值定理，就该先查证件，别先陪他聊感受。",
            ),
            successLines: [
              player(
                "切入",
                "既然你说的是极值定理，那就先把极值定理完整写出来。命题真伪不靠语气轻松，得靠条件有没有保留。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "出示被引用的原定理。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-evt"],
            failureText: "需要先把极值定理本身摆上来，防止对方继续用“大家都懂”偷跑。",
            wrongEvidenceResponses: {
              "ev-intermediate-value": failure(
                "定理串台",
                "介值定理关心中间值，不负责最大值是否被取到。",
                [
                  npc(
                    "抬眉",
                    "介值定理当然也很重要，但它今天只是友情出演。你总不能因为区间里每道菜都能点到，就断定甜点一定免费送。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "原文还没归位",
              "这一步要让讨论间里的人看到：你我现在谈的究竟是不是同一条定理。",
            ),
            successLines: [
              player(
                "异议",
                "极值定理原文是：连续函数在闭区间 [a,b] 上一定能取得最大值与最小值。‘闭区间’不在括号里，它就在命题主干上。",
              ),
              npc(
                "摊手",
                "行，就算课本喜欢中括号。但区间本身既然有界，差那两个端点，真的能把整个结论推翻？",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "哪张卡能说明这两个端点不是小装饰，而是定理命门？",
            modeLabel: "出示证据",
            correctEvidence: ["ev-closed-interval"],
            failureText: "这里需要强调闭区间条件本身的功能，而不是急着举例。",
            wrongEvidenceResponses: {
              "ev-open-interval-counterexample": failure(
                "反例还稍早",
                "你当然马上能举出例子，但在那之前，先让讨论间里的人明白‘端点被包含’为何是原理层条件。",
                [
                  player(
                    "心声",
                    "没错，先讲机制，再举例子。否则对方还会说我只是碰巧找到了一个怪函数。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "条件作用说轻了",
              "这一步要讲的是：端点一旦不在定义域里，极值可能永远只在门外徘徊。",
            ),
            successLines: [
              player(
                "解释",
                "闭区间意味着端点被纳入定义域，函数值集合才有机会把上界和下界真正抓住。换成开区间，极值完全可能只被逼近而不被取到。",
              ),
              system(
                "旁白",
                "有人开始低头改笔记，把原来潦草写成“连续+有界区间⇒极值”的那一行悄悄补回了中括号。",
              ),
            ],
          },
        ],
        resolvedLines: [
          npc(
            "追击",
            "可你目前说的，还只是‘可能出问题’。要推翻我，最好别只谈可能，拿出真正把命题撞碎的东西。",
          ),
        ],
      },
      {
        type: "dialogue",
        lines: [
          player(
            "心声",
            "他开始转进第二层：把“可能取不到”偷换成“但只要有上界，最后总能取到”。这就是很多分析错误最滑的一步，把上确界伪装成最大值。",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第二轮反驳",
          "只要函数有上界，连续性就会逼着它在某点碰到这个上界。上确界和最大值在这种题里没必要分得那么细。",
        ),
        stages: [
          {
            kind: "choice",
            prompt: "这一轮该先拆哪个混淆概念？",
            modeLabel: "选择突破口",
            correctOption: "sup-vs-max",
            options: [
              {
                id: "sup-vs-max",
                label: "区分上确界与最大值",
                detail: "先把数值上界和实际取到的函数值分开。",
              },
              {
                id: "repeat-theorem",
                label: "再重复一遍极值定理",
                detail: "原定理已说过，这一轮必须进一步拆概念。",
              },
              {
                id: "use-ivt",
                label: "改讲介值定理",
                detail: "介值仍然不是这里的主角。",
              },
            ],
            failureText: "这一轮的核心已经从‘条件漏了什么’转向‘概念混了什么’。",
            wrongChoiceResponses: {
              "repeat-theorem": failure(
                "还停在上一层",
                "光重复原定理不够，对方现在在偷换 maximum 和 supremum，得顺着这一层拆。",
                [
                  cameo(
                    "A同学",
                    "小声",
                    "同一句极值定理讲到第三遍，就像第三次提醒室友洗碗：话都对，槽里的锅一点没少。",
                  ),
                ],
              ),
              "use-ivt": failure(
                "又把介值拖来了",
                "介值定理保证中间值能出现，不保证最上面的值被实现。",
              ),
            },
            genericFailureResponse: failure(
              "概念刀口没对准",
              "现在最危险的词不是‘连续’，而是他嘴里那个被说得像理所当然的‘最大值’。",
            ),
            successLines: [
              player(
                "锁定",
                "问题就在这里：你把上确界当成了最大值。二者只有在上确界真的被某个点取到时，才是同一个东西。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "拿出“最大值存在”的精确定义。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-maximum-definition"],
            failureText: "要正面拆穿偷换，先把 maximum 的定义写到黑板上。",
            wrongEvidenceResponses: {
              "ev-boundedness": failure(
                "还差最后一句",
                "“有上界”只是在说上面有天花板，但还没说哪位函数值同学真的顶到了天花板。",
                [
                  player(
                    "心声",
                    "这轮得更精确一点。刘同学最擅长把差一点的说法讲成完全一样。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "定义还没到场",
              "必须先说清楚：最大值不是一个漂浮的数，而是要有点把它实现。",
            ),
            successLines: [
              player(
                "下定义",
                "最大值存在，意味着必须有某个 x* 属于定义域，并且对任意 x 都有 f(x)≤f(x*)。重点不是有一个大数压在上面，而是有一个点亲自站出来把它取到。",
              ),
              npc(
                "敲笔帽",
                "好，那你继续。你说上确界只是站在外面的数，可我不信连续函数会永远摸不到它。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "再拿出一张卡，直接区分 supremum 与 maximum。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-supremum-vs-maximum"],
            failureText: "这一步必须正面回应“上确界和最大值差不多”的说法。",
            wrongEvidenceResponses: {
              "ev-intermediate-value": failure(
                "问题不在中间值",
                "即便所有中间值都能取到，最顶上的那个数若不在像集中，最大值仍然不存在。",
                [
                  npc(
                    "摊手",
                    "我现在谈的是屋顶，不是楼层之间的电梯。介值定理在这栋楼里负责的是‘中间层都能到’，不是‘天台一定开放’。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "还没把这两个词分开",
              "这一步就该点名：supremum 可以在集合外，maximum 必须在集合内。",
            ),
            successLines: [
              player(
                "追击",
                "上确界只是最小上界；只有当它本身属于函数值集合时，才是最大值。把这两个词含糊过去，等于把证明的地板抽掉一块再说房间还平。",
              ),
              cameo(
                "B同学",
                "记笔记",
                "‘有天花板’不等于‘有人摸到天花板’……这句适合直接写在极值题旁边。",
              ),
            ],
          },
        ],
        resolvedLines: [
          npc(
            "不退",
            "概念课上得不错。但如果你没有一个真正满足前提却推翻结论的函数，我仍然可以说你只是在做字典学。",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第三轮反驳",
          "概念分得再细也只是术语洁癖。没有具体反例，我的命题依旧可能对大多数正常函数成立。",
        ),
        stages: [
          {
            kind: "evidence",
            prompt: "先说明：要否定这种全称命题，最有效的武器是什么？",
            modeLabel: "出示证据",
            correctEvidence: ["ev-counterexample-principle"],
            failureText: "对方在逼你“证明所有函数都不行”，但驳倒全称命题并不需要那样做。",
            wrongEvidenceResponses: {
              "ev-evt": failure(
                "原定理已经用过了",
                "现在不是再背一遍极值定理，而是说明为什么一个合法反例就足够砸碎原命题。",
              ),
            },
            genericFailureResponse: failure(
              "逻辑武器拿错了",
              "驳倒“所有连续函数都……”时，先把反例原则摆出来，堵住‘那只是个别现象’这条退路。",
            ),
            successLines: [
              player(
                "定性",
                "要否定‘所有在 (0,1) 上连续的函数都能取到最大值’，只需给出一个满足前提却不满足结论的反例。数学命题不是靠投票存活的，一个合法反例就够了。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "给出开区间上的最短反例。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-open-interval-counterexample"],
            failureText: "此刻需要的是一个最干净、最难狡辩的开区间反例。",
            wrongEvidenceResponses: {
              "ev-boundedness": failure(
                "还缺实体函数",
                "说“有上界不够”还只是原则层，反例必须真的把函数名字写出来。",
                [
                  player(
                    "心声",
                    "没错，对这种擅长打口头仗的人，最好给最短的函数、最短的区间、最短的致命一击。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "反例还没落地",
              "直接上 f(x)=x on (0,1) 就够了，再花哨只会给对方找岔路。",
            ),
            successLines: [
              player(
                "举反例",
                "取 f(x)=x，定义在 (0,1) 上。它在整个区间内连续，但函数值总小于 1，所以 1 虽然是上确界，却没有任何 x∈(0,1) 让 f(x)=1。",
              ),
              npc(
                "语速慢下来",
                "所以……这个函数确实满足我的前提，却没有最大值。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "最后补上一句：为什么“有上界”仍然不够？",
            modeLabel: "出示证据",
            correctEvidence: ["ev-boundedness"],
            failureText: "结案前还要补上原则总结，否则对方还能假装自己只是在措辞上含糊了一点。",
            wrongEvidenceResponses: {
              "ev-supremum-vs-maximum": failure(
                "已经接近了，但还差一句用途说明",
                "现在需要落回“有上界并不推出取到上界”这句更直接的总结。",
              ),
            },
            genericFailureResponse: failure(
              "还差结案用语",
              "最后一句要把整个漏洞压缩成一句能记住的话：bounded does not mean attained。",
            ),
            successLines: [
              player(
                "收束",
                "函数值集合有上界，只说明屋顶存在；要说它有最大值，必须有人真的摸到屋顶。开区间恰恰允许函数永远逼近、永远差一点。",
              ),
              npc(
                "认输",
                "好吧，我承认。中括号不是教材洁癖，是命题生死线。把端点删掉以后，极值定理就不再是原来的定理了。",
              ),
              system(
                "结案",
                "案二告破：你先把条件从“可有可无”恢复成“决定真假”，再把上确界从最大值手里完整夺了回来。",
              ),
            ],
          },
        ],
        resolvedLines: [],
      },
    ],
    verdict:
      "第二案之后，讨论间里没人再敢把中括号看成格式问题。你用三层拆解让所有人记住：极值定理先要闭区间，再要连续；最大值必须被真正取到；而全称命题一旦撞上合法反例，再圆润的口才也救不回来。",
  },
  {
    id: "case-3",
    order: 3,
    shortLabel: "第三案",
    title: "积分不会治疗一切",
    subtitle: "微积分基本定理的危险扩写",
    difficulty: "终局",
    sceneLabel: "图书馆报告角",
    sceneAsset: "assets/images/backgrounds/library-report-corner.jpg",
    objective:
      "纠正“可积就推出积分函数处处可导”的错误扩写，利用阶跃函数构造连续但不可导的积分函数反例。",
    summary:
      "终局的错误最像真理：它先借来一条正确的定理，再把条件削平、把结论放大，然后用漂亮的直觉包装成‘积分会磨平一切’。你必须连续拆掉定理文本、前提条件、反例构造与局部导数计算四层外壳。",
    intro:
      "图书馆报告角的灯比平时亮，李同学也比平时更像演讲者。他把一句‘积分会抚平一切尖刺’写在投影顶端，像在给一个概念做品牌宣言。围观的人已经开始点头，因为这句话既优雅又危险。真正麻烦的伪命题，通常都不是胡扯，而是把真命题讲得过于顺滑。",
    player: {
      name: "王若臣",
      role: "计算机系本科生",
      glyph: "王",
      asset: "assets/images/portraits/player-wang.png",
    },
    npc: {
      name: "李同学",
      role: "竞赛队同学",
      glyph: "李",
      asset: "assets/images/portraits/student-li.png",
    },
    maxCredibility: 9,
    failureText:
      "李同学微笑着收起遥控笔，像是在说“直觉依然赢了”。这一案失手往往不是因为不会计算，而是因为没把定理的两层结论拆开：可积带来连续，不自动带来处处可导。",
    initialEvidence: [
      "ev-ftc",
      "ev-ftc-continuity-condition",
      "ev-jump-integrable",
      "ev-step-function",
      "ev-step-integral-formula",
      "ev-non-diff-by-one-sided",
      "ev-mean-value",
    ],
    events: [
      {
        type: "dialogue",
        lines: [
          system(
            "旁白",
            "图书馆报告角的投影幕像一面白墙，把每个词都显得比平时更像定论。李同学转身时，嘴角甚至带着一种“这句话会被记到学期末”的笃定。",
          ),
          npc(
            "宣言",
            "只要 f 在区间上可积，定义 F(x)=∫(0→x)f(t)dt，那么 F 就必然处处可导，而且 F'(x)=f(x) 对每个 x 都成立。积分的伟大之处，就是它会磨平一切局部粗糙。",
          ),
          cameo(
            "围观同学",
            "小声",
            "这话听着像鸡汤版微积分基本定理，顺耳是顺耳，条件几乎被熬没了。",
          ),
          player(
            "心声",
            "危险就在‘处处’两个字。很多谬误不是一句话全错，而是在真命题后面悄悄多加两个字，整个世界就歪了。",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第一轮反驳",
          "可积已经足够。积分函数必然对每个点都可导，任何局部跳跃都会在积分过程中被驯服。",
        ),
        stages: [
          {
            kind: "choice",
            prompt: "先指出这句扩写漏掉了哪类前提？",
            modeLabel: "选择突破口",
            correctOption: "continuity-at-point",
            options: [
              {
                id: "continuity-at-point",
                label: "被积函数在该点连续",
                detail: "这是从“连续”升级到“可导”的关键门槛。",
              },
              {
                id: "bounded-interval-only",
                label: "区间必须有限长",
                detail: "区间长度不是这条伪命题的核心漏洞。",
              },
              {
                id: "monotonicity",
                label: "被积函数必须单调",
                detail: "微积分基本定理从未要求单调。",
              },
            ],
            failureText: "终局第一刀必须切准：问题不在可积性不够大，而在可导性需要更细的局部连续前提。",
            wrongChoiceResponses: {
              "bounded-interval-only": failure(
                "抓到边缘，没抓到心脏",
                "区间是否有限当然影响很多结论，但此处真正缺席的是被积函数在点上的连续性。",
              ),
              monotonicity: failure(
                "凭空加条件",
                "单调性从来不是微积分基本定理的一部分。你这一步像是看见水坑就顺手把整个操场填了。",
                [
                  cameo(
                    "围观同学",
                    "低声",
                    "单调性：我今天只是路过，怎么又被抓来替别人补条件了。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "第一刀切偏",
              "要从“可积”走到“在该点可导”，中间缺的正是连续性这座桥。",
            ),
            successLines: [
              player(
                "锁定",
                "你把‘在连续点可导’扩张成了‘处处可导’。缺失的不是豪言壮语，而是被积函数在该点连续这条局部前提。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "拿出真正应被引用的定理文本。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-ftc"],
            failureText: "先把微积分基本定理的完整版本摆上来，才能看见“处处”二字从哪里偷偷长出来。",
            wrongEvidenceResponses: {
              "ev-mean-value": failure(
                "中值定理又来串门",
                "它依旧重要，但依旧不是这句话的定理依据。",
                [
                  npc(
                    "平静",
                    "你若每逢可导就想起中值定理，迟早会把整本微积分都压成一页索引。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "原定理还没亮相",
              "这一步必须让全场先看见正版定理，再指出伪命题在哪一行偷偷加码。",
            ),
            successLines: [
              player(
                "立论",
                "微积分基本定理先说：若 f 可积，则积分函数 F 连续；再说：若 f 在 x0 连续，则 F 在 x0 可导且 F'(x0)=f(x0)。这是两层结论，不是一句口号。",
              ),
              npc(
                "微笑不减",
                "两层也好，一层也罢。在直觉上，积分总归会把跳跃磨得平一点。你总不能告诉我，一次积分连个台阶都收拾不掉？",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "指出从第二层结论成立所必需的额外前提。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-ftc-continuity-condition"],
            failureText: "这一步要精确命名：F'(x0)=f(x0) 不是处处成立，而是只在 f 连续的点成立。",
            wrongEvidenceResponses: {
              "ev-jump-integrable": failure(
                "还没到举反例的时候",
                "先别急着挑函数，先把定理缺的那行条件补回来。",
                [
                  player(
                    "心声",
                    "对，反例可以等一拍。终局里最怕顺序错：若不先钉死理论缺口，反例也会被对方说成偶然现象。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "关键条件未点名",
              "必须明说：只有在 f 于 x0 连续时，才有 F'(x0)=f(x0)。",
            ),
            successLines: [
              player(
                "追问",
                "要推出 F'(x0)=f(x0)，必须额外要求 f 在 x0 连续。删掉这条前提以后，你说的就不再是定理，而是扩写版传说。",
              ),
              system(
                "旁白",
                "周围的笑声消失了一点。大家开始意识到，李同学那句漂亮话里确实藏着被故意略过的门槛。",
              ),
            ],
          },
        ],
        resolvedLines: [
          npc(
            "转进",
            "好，那我换个说法。就算 f 在某点跳一下，积分之后的 F 也总该更平顺吧？台阶积完了，总不至于还留棱角。",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第二轮反驳",
          "即使 f 在某点有跳跃，积分累计以后也会把它磨成光滑曲线。台阶一积分，最多变成斜坡，不会再留下不可导的尖刺。",
        ),
        stages: [
          {
            kind: "choice",
            prompt: "哪类反例最适合当场击穿这句“磨平论”？",
            modeLabel: "选择反例",
            correctOption: "step-function",
            options: [
              {
                id: "step-function",
                label: "阶跃函数",
                detail: "最短、最干净，正好在可积与不连续之间制造裂口。",
              },
              {
                id: "absolute-value",
                label: "|x|",
                detail: "|x| 自己连续，不能用来打“被积函数有跳跃”的漏洞。",
              },
              {
                id: "quadratic",
                label: "x²",
                detail: "它太平滑了，只会替对方做广告。",
              },
            ],
            failureText: "你需要一个既可积又在某点跳跃不连续的函数，阶跃函数正合适。",
            wrongChoiceResponses: {
              "absolute-value": failure(
                "反例属性不匹配",
                "|x| 的确有尖点，但它本身是连续的，打不到“被积函数跳跃不连续”这一层。",
                [
                  player(
                    "心声",
                    "同一个老朋友不能连续打三案。终局要的不是‘不可导’，而是‘可积但在某点不连续’。",
                  ),
                ],
              ),
              quadratic: failure(
                "你在替对方做演示",
                "x² 太规矩了。拿它当反例，等于主动给“积分会抚平一切”拍宣传片。",
              ),
            },
            genericFailureResponse: failure(
              "反例选型错误",
              "这一步必须挑一个有真实跳跃、又绝对可积的例子，阶跃函数最直接。",
            ),
            successLines: [
              player(
                "选定",
                "最合适的就是阶跃函数。它够合法、够简单、也足够锋利：正好让‘可积’和‘在某点不连续’同时成立。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "先说明：这种函数虽然有跳跃，但仍然可积。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-jump-integrable"],
            failureText: "在抛反例之前，先堵住“这函数根本不合法”的退路。",
            wrongEvidenceResponses: {
              "ev-step-function": failure(
                "函数先别急着报名字",
                "还差一句合法性说明。李同学很可能先抓“你这个函数能不能积”来拖延。",
              ),
            },
            genericFailureResponse: failure(
              "先把合法性补上",
              "这一步的目标不是立即算积分，而是说明“带跳跃的函数仍可能可积”。",
            ),
            successLines: [
              player(
                "封口",
                "像阶跃函数这样有界且只有有限个间断点的函数，仍然是 Riemann 可积的。所以它完全有资格进入你这句命题的前提。",
              ),
              npc(
                "点头",
                "好，反例资格我先承认。那你把它具体写出来，我看看它能怎么把积分函数弄坏。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "写出这只真正上场的反例函数。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-step-function"],
            failureText: "需要把阶跃函数明确写出来，不能只说“存在一个跳跃函数”。",
            wrongEvidenceResponses: {
              "ev-ftc": failure(
                "理论已经够了",
                "现在不是再背理论，而是要让具体函数站到灯下。",
              ),
            },
            genericFailureResponse: failure(
              "反例还没具名",
              "终局已经进入实战阶段，直接把阶跃函数写出来。",
            ),
            successLines: [
              player(
                "举反例",
                "令 f(x)=0（x<1/2），f(x)=1（x≥1/2）。它在 [0,1] 上可积，但在 x=1/2 处发生跳跃不连续。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "把这个反例对应的积分函数 F(x) 算出来。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-step-integral-formula"],
            failureText: "反例的杀伤力不在口头描述，而在把 F(x) 的分段公式亲手算出来。",
            wrongEvidenceResponses: {
              "ev-non-diff-by-one-sided": failure(
                "还没到最后一锤",
                "左右导数判别当然要用，但得先把 F 的具体公式算出来，否则导数从哪里算起？",
                [
                  player(
                    "心声",
                    "我太想直接敲终局了。可数学不能跳步，没公式就没有左右差商，更没有最后的裁决。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "计算层还没展开",
              "请把积分真的分区间算出来。终局不接受“看起来应该如此”。",
            ),
            successLines: [
              player(
                "计算",
                "于是 F(x)=∫(0→x)f(t)dt 满足：当 x≤1/2 时，积分区间内函数恒为 0，所以 F(x)=0；当 x≥1/2 时，只有 [1/2,x] 这一段贡献面积，因此 F(x)=x-1/2。",
              ),
              cameo(
                "围观同学",
                "低呼",
                "这图像哪像被磨平了，分明是在 1/2 前后直接换了个走法。",
              ),
              npc(
                "仍不松口",
                "分段公式我认。可图像只是拐了一下，不代表导数就一定不存在。很多函数看着别扭，算一算仍能过去。",
              ),
            ],
          },
        ],
        resolvedLines: [],
      },
      {
        type: "cross",
        line: npc(
          "第三轮反驳",
          "你得到的分段公式至多说明斜率前后不同，却还没正式证明导数不存在。也许这个点只是写法换了，导数仍然能统一出来。",
        ),
        stages: [
          {
            kind: "evidence",
            prompt: "拿出能够正式判定“此点不可导”的结论。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-non-diff-by-one-sided"],
            failureText: "终局落锤需要的是左右导数判别，而不是再重复“看起来有尖点”。",
            wrongEvidenceResponses: {
              "ev-mean-value": failure(
                "这次真别再叫中值定理了",
                "它今天不是支点，顶多是围观群众。你眼前这道门只认左右导数。",
                [
                  cameo(
                    "A同学",
                    "几乎忍笑",
                    "中值定理今天出场次数快赶上主角了，可这一题显然轮不到它收尾。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "最后的判定依据拿错了",
              "眼下需要的是‘左右导数不等则不可导’，不是任何更花哨的定理。",
            ),
            successLines: [
              player(
                "判定标准",
                "若某点左右导数都存在但不相等，则该点不可导。这是正式判定，不是图像感受。",
              ),
            ],
          },
          {
            kind: "choice",
            prompt: "对刚才算出的 F，在 x=1/2 处左右导数分别是多少？",
            modeLabel: "选择结果",
            correctOption: "0-and-1",
            options: [
              {
                id: "0-and-1",
                label: "左导数 0，右导数 1",
                detail: "左侧分段常值，右侧分段斜率为 1。",
              },
              {
                id: "1-and-1",
                label: "左导数 1，右导数 1",
                detail: "这会把左侧常值函数的斜率凭空改掉。",
              },
              {
                id: "0-and-0",
                label: "左导数 0，右导数 0",
                detail: "这等于忽略了右侧分段的线性增长。",
              },
            ],
            failureText: "左右两侧的分段公式不同，导数值当然也要分边算。",
            wrongChoiceResponses: {
              "1-and-1": failure(
                "左侧常值被你改写了",
                "当 x<1/2 时，F(x)=0 是常值函数，左导数怎么都不可能是 1。",
              ),
              "0-and-0": failure(
                "右侧斜率被你抹平了",
                "当 x>1/2 时，F(x)=x-1/2 的斜率就是 1，不会凭礼貌自动降成 0。",
              ),
            },
            genericFailureResponse: failure(
              "分段没算到导数上",
              "左边看常值，右边看一次函数，各自的斜率要分开算。",
            ),
            successLines: [
              player(
                "计算结论",
                "左侧分段 F(x)=0，所以左导数为 0；右侧分段 F(x)=x-1/2，所以右导数为 1。它们不相等，因此 F 在 1/2 不可导。",
              ),
              npc(
                "终于沉默",
                "也就是说，积分确实让它保持连续，却没能保证这处尖角消失。",
              ),
            ],
          },
          {
            kind: "choice",
            prompt: "选出这道题对应的正确终局命题。",
            modeLabel: "选择结论",
            correctOption: "ftc-correct",
            options: [
              {
                id: "ftc-correct",
                label: "若 f 可积，则 F 连续；若 f 在 x0 连续，则 F'(x0)=f(x0)",
                detail: "这是完整且正确的微积分基本定理表述。",
              },
              {
                id: "everywhere-diff",
                label: "若 f 可积，则 F 处处可导且 F'=f",
                detail: "这正是本案被击穿的伪命题。",
              },
              {
                id: "nowhere-diff",
                label: "若 f 有跳跃，则 F 处处不可导",
                detail: "这又把反例推广过头，走向另一边的夸张。",
              },
            ],
            failureText: "终局最后一句必须把真命题收回来，既不能少条件，也不能多夸张。",
            wrongChoiceResponses: {
              "everywhere-diff": failure(
                "又回到了原罪",
                "你前面整整三轮都在拆这句话，现在别亲手把它供回去。",
              ),
              "nowhere-diff": failure(
                "反例被你又夸大了",
                "阶跃函数只说明在跳跃点可能失去可导性，不说明积分函数处处不可导。",
              ),
            },
            genericFailureResponse: failure(
              "收束命题失准",
              "终局不是制造新口号，而是把被扩写的定理收回到真正正确的版本。",
            ),
            successLines: [
              player(
                "终局总结",
                "正确说法必须分层：f 可积时，F 一定连续；只有当 f 在 x0 连续时，才有 F'(x0)=f(x0)。积分不会治疗一切，它只在定理允许的范围内工作。",
              ),
              npc(
                "认输",
                "好。我承认，是我把一条有条件的定理包装成了无条件的神话。直觉可以引路，但不能篡位。",
              ),
              system(
                "终局",
                "案三告破：你没有靠更响亮的口号取胜，而是靠条件、反例、分段公式与左右导数，把“几乎正确”的伪命题一层层拆回了真命题。",
              ),
            ],
          },
        ],
        resolvedLines: [],
      },
    ],
    verdict:
      "第三案落幕时，图书馆报告角第一次真正安静下来。你证明的不只是一个积分函数在某点不可导，更是一个更重要的习惯：任何漂亮的直觉，只要越过了条件边界，就必须被定义、反例和局部计算拉回现实。数学不会惩罚不够华丽，但一定惩罚偷走前提。",
  },
  {
    id: "case-4",
    order: 4,
    shortLabel: "第四案",
    title: "雅可比失踪案",
    subtitle: "二重积分换元里的面积税",
    difficulty: "进阶",
    sceneLabel: "数院研讨间",
    sceneAsset: "assets/images/backgrounds/math-seminar-room.jpg",
    objective:
      "指出线性换元仍需乘 Jacobian，分清正逆 Jacobian 的角色，并正确算出菱形区域上的二重积分。",
    summary:
      "第四案正式走进多元积分。陈学长把“线性换元”讲成了“字母重命名”，顺手让 Jacobian 从白板上失踪。你要做的，是把这个面积缩放因子当众找回来。",
    intro:
      "数院研讨间的白板通常比别处更拥挤。陈学长今天却只写了一组看上去十分清爽的换元：u=x+y，v=x-y。然后他很满意地把笔一收，说线性变换没有弯曲，面积元自然不用改。这句话一出，屋里出现了那种最危险的安静：不是听懂了，而是觉得好像挺合理。",
    player: {
      name: "王若臣",
      role: "计算机系本科生",
      glyph: "王",
      asset: "assets/images/portraits/player-wang.png",
    },
    npc: {
      name: "陈学长",
      role: "计算机学院高年级学长",
      glyph: "陈",
      asset: "assets/images/portraits/senior-chen.png",
    },
    maxCredibility: 8,
    failureText:
      "陈学长把白板擦得很干净，只留下那个孤零零的 dudv。你输掉这一案，不是因为不会积分，而是因为忘了换元从来不只是改字母，面积元也有自己的报销单。",
    initialEvidence: [
      "ev-double-integral-cov",
      "ev-linear-not-isometric",
      "ev-jacobian-inverse-map",
      "ev-jacobian-absolute",
      "ev-case4-region-map",
      "ev-case4-integral-value",
      "ev-mean-value",
    ],
    events: [
      {
        type: "dialogue",
        lines: [
          system(
            "旁白",
            "白板上斜着画了一个菱形区域 D，旁边则是一个被陈学长框得极其端正的正方形。视觉上的对比已经让不少人开始提前相信答案会很漂亮。",
          ),
          npc(
            "开场",
            "今天这题最值得学的，是换元的优雅。u=x+y，v=x-y 一上，菱形就成正方形。既然是线性变换，没有弯曲、没有扭结，dA 自然就是 dudv。",
          ),
          cameo(
            "C同学",
            "小声",
            "“自然”两个字一出来，我就开始紧张。数分里最容易出事故的词，除了“显然”就是“自然”。",
          ),
          player(
            "心声",
            "对，一听到‘自然’，就该检查有没有哪个因子被偷偷自然死亡了。",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第一轮反驳",
          "线性换元只是在坐标纸上重新标轴，面积元不需要额外因子。Jacobian 那套主要是给弯弯绕绕的换元准备的。",
        ),
        stages: [
          {
            kind: "choice",
            prompt: "这句话最先错在什么地方？",
            modeLabel: "选择突破口",
            correctOption: "area-scaling",
            options: [
              {
                id: "area-scaling",
                label: "把线性误当成保面积",
                detail: "线性不等于等距，更不等于面积自动不变。",
              },
              {
                id: "continuity",
                label: "换元不连续",
                detail: "这组换元本身很连续，问题不在光滑性。",
              },
              {
                id: "integrand-unchanged",
                label: "被积函数不能代换",
                detail: "被积函数当然要代换，但核心漏项还不是它。",
              },
            ],
            failureText: "第一刀要切在线性变换的本质上：它未必保面积。",
            wrongChoiceResponses: {
              continuity: failure(
                "对象抓错了",
                "这组换元的光滑性没问题，真正出事的是面积缩放被说没了。",
              ),
              "integrand-unchanged": failure(
                "层级太后",
                "被积函数确实要改写，但现在最致命的不是它，而是面积元被直接原样搬运。",
              ),
            },
            genericFailureResponse: failure(
              "切口不对",
              "线性变换也可能拉伸、压缩、剪切，先把这点说清，Jacobian 才有理由登场。",
            ),
            successLines: [
              player(
                "切入",
                "问题不在它是不是线性，而在你把‘线性’自动翻译成了‘保面积’。坐标轴一改，面积元凭什么一点成本都不付？",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "拿出二重积分换元真正依赖的公式。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-double-integral-cov"],
            failureText: "现在要把换元公式原文端上来，别让“线性就算了吧”继续冒充原则。",
            wrongEvidenceResponses: {
              "ev-mean-value": failure(
                "中值定理还在外面排队",
                "它依旧重要，但和二重积分换元里的面积因子没有直接关系。",
                [
                  cameo(
                    "C同学",
                    "憋笑",
                    "中值定理今天又串错门了，这间研讨间现在归 Jacobian 管。",
                  ),
                ],
              ),
            },
            genericFailureResponse: failure(
              "公式还没写全",
              "先把换元公式完整写出，所有后续争论才能有共同底稿。",
            ),
            successLines: [
              player(
                "异议",
                "换元公式从来不是把 dA 原样抄成 dudv，而是要乘上 |det ∂(x,y)/∂(u,v)|。面积元是否变化，不靠感觉，靠 Jacobian。",
              ),
              npc(
                "耸肩",
                "就算如此，线性变换那点尺度变化也未必真的发生。你总不能因为写了个行列式，就默认它不等于 1。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "再拿一张概念卡，说明“线性”并不等于“保面积”。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-linear-not-isometric"],
            failureText: "这里需要把‘线性’和‘等距/保面积’彻底拆开。",
            genericFailureResponse: failure(
              "概念还粘在一起",
              "请直接指出：剪切、拉伸、压缩都线性，但它们照样改面积。",
            ),
            successLines: [
              player(
                "说明",
                "线性变换只说明直线还直、原点还在，不说明长度和面积自动保存。若真想保面积，至少得额外证明对应行列式绝对值等于 1。",
              ),
              system(
                "旁白",
                "旁边有人把原来写成“线性换元≈不用 Jacobian”的那句速记默默划掉，改成了一个大得有点心虚的感叹号。",
              ),
            ],
          },
        ],
        resolvedLines: [
          npc(
            "转进",
            "好，那我退一步。就算真要用 Jacobian，这组换元的系数看着就很大，答案也该乘 2 才对。总不至于还变小吧？",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第二轮反驳",
          "u=x+y, v=x-y 的 Jacobian 明明是 det [[1,1],[1,-1]] = -2，所以面积因子就是 2。你若坚持写 Jacobian，也该把积分放大，而不是缩小。",
        ),
        stages: [
          {
            kind: "choice",
            prompt: "换元公式里真正该出现的是哪一个 Jacobian？",
            modeLabel: "选择公式",
            correctOption: "inverse-jacobian",
            options: [
              {
                id: "inverse-jacobian",
                label: "∂(x,y)/∂(u,v)",
                detail: "公式写的是旧变量对新变量的面积因子。",
              },
              {
                id: "forward-jacobian",
                label: "∂(u,v)/∂(x,y)",
                detail: "这是正向映射的 Jacobian，需要取倒数后才进入积分。",
              },
              {
                id: "either-one",
                label: "哪个都行，反正只差个符号",
                detail: "这会把缩放倍数和方向全混在一起。",
              },
            ],
            failureText: "这一步最常见的事故就是把正向 Jacobian 直接塞进公式。",
            wrongChoiceResponses: {
              "forward-jacobian": failure(
                "方向反了",
                "你算出的 -2 是正向映射的 Jacobian，进入积分前得先取逆，再取绝对值。",
              ),
              "either-one": failure(
                "不是只差个符号",
                "正反 Jacobian 互为倒数，差的不是正负，而是整整一个倍率。",
              ),
            },
            genericFailureResponse: failure(
              "公式朝向搞反了",
              "换元公式要的是由新变量恢复旧变量时的面积缩放因子。",
            ),
            successLines: [
              player(
                "反击",
                "你算的是 ∂(u,v)/∂(x,y)，但公式需要的是它的逆，也就是 ∂(x,y)/∂(u,v)。不是所有行列式都能不问方向就往积分里扔。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "把逆变换和正确的 Jacobian 算出来。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-jacobian-inverse-map"],
            failureText: "需要把 x,y 用 u,v 写出来，彻底堵住“就该乘 2”的退路。",
            genericFailureResponse: failure(
              "数还没算清",
              "把逆变换写出来：x=(u+v)/2, y=(u-v)/2，然后再算 determinant。",
            ),
            successLines: [
              player(
                "计算",
                "由 u=x+y, v=x-y 可反解得 x=(u+v)/2, y=(u-v)/2，因此 det ∂(x,y)/∂(u,v) = -1/2。面积因子不是 2，而是 1/2。",
              ),
              npc(
                "皱眉",
                "那负号呢？你总不会要告诉我，一个面积因子还可以带着负值在研讨间里走来走去。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "解释为什么这里必须取绝对值。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-jacobian-absolute"],
            failureText: "方向翻转不影响面积大小，别把行列式的符号错当成面积本身的符号。",
            genericFailureResponse: failure(
              "绝对值还没补上",
              "面积元只认倍数，不认方向反转。这里必须把 -1/2 变成 1/2。",
            ),
            successLines: [
              player(
                "补刀",
                "负号只说明映射翻了方向，不说明面积会变成负的。换元公式里本来就取绝对值，所以真正进入积分的是 1/2。",
              ),
              cameo(
                "B同学",
                "低声",
                "原来 Jacobian 连方向和面积账都得分开算……“先取逆再取绝对值”这句得写大一点。",
              ),
            ],
          },
        ],
        resolvedLines: [
          npc(
            "仍不服",
            "就算因子是 1/2，你还没把整道题算完。区域和被积函数一代进去，最后未必真是你说的那样。",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第三轮反驳",
          "我承认面积因子可能不是 1，但最终积分值仍然未必改变多少。别忘了原区域是菱形，换过去之后积分限和 integrand 一起动，最后说不定还是 8/3。",
        ),
        stages: [
          {
            kind: "evidence",
            prompt: "先说明区域 D 在新变量下究竟变成什么。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-case4-region-map"],
            failureText: "先把区域像说明白，否则积分限还会继续混乱。",
            genericFailureResponse: failure(
              "积分区域还在飘",
              "请直接说明：|x+y|≤1, |x-y|≤1 在新变量下就是 |u|≤1, |v|≤1。",
            ),
            successLines: [
              player(
                "定域",
                "原区域 D 满足 |x+y|≤1, |x-y|≤1，换成 u,v 后就是 |u|≤1, |v|≤1，所以积分区域正是 [-1,1]×[-1,1]。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "给出完整换元后得到的积分表达式与数值。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-case4-integral-value"],
            failureText: "结案要靠完整计算，不靠‘应该差不多’。",
            genericFailureResponse: failure(
              "最后一步还没算死",
              "把 integrand 变成 u²，再连同 1/2 的面积因子一起算到底。",
            ),
            successLines: [
              player(
                "落锤",
                "因为 x+y=u，所以被积函数变成 u²；又因为面积因子是 1/2，于是积分等于 1/2∫(-1→1)∫(-1→1)u²dvdu = 4/3。少了 Jacobian 才会错算成 8/3。",
              ),
              npc(
                "沉默两秒",
                "所以这题里最贵的不是换元本身，而是那张被我试图省掉的面积发票。",
              ),
            ],
          },
          {
            kind: "choice",
            prompt: "选出本案应被记进研讨间白板角落的正确结论。",
            modeLabel: "选择结论",
            correctOption: "linear-still-needs-jacobian",
            options: [
              {
                id: "linear-still-needs-jacobian",
                label: "线性换元也要乘 |det ∂(x,y)/∂(u,v)|",
                detail: "线性不等于保面积，正逆 Jacobian 也不能混写。",
              },
              {
                id: "linear-no-factor",
                label: "只有非线性换元才需要 Jacobian",
                detail: "这正是本案被拆穿的伪命题。",
              },
              {
                id: "forward-det-directly",
                label: "直接使用 det ∂(u,v)/∂(x,y)",
                detail: "这会把正反向因子整整颠倒。",
              },
            ],
            failureText: "收束必须同时写对两个要点：Jacobian 不能丢，也不能方向写反。",
            wrongChoiceResponses: {
              "linear-no-factor": failure(
                "旧错回潮",
                "你前面已经把 Jacobian 亲手找回来了，现在别又把它赶出研讨间。",
              ),
              "forward-det-directly": failure(
                "差的不是小修小补",
                "det ∂(u,v)/∂(x,y) 与 det ∂(x,y)/∂(u,v) 互为倒数，不能直接替代。",
              ),
            },
            genericFailureResponse: failure(
              "结论压缩失真",
              "最后一句要把‘仍需 Jacobian’与‘要用逆变换并取绝对值’一起收进去。",
            ),
            successLines: [
              player(
                "收束",
                "换元不是换字体。无论变换是否线性，只要面积元素被拉伸或压缩，积分里就必须如实记账。Jacobian 不是装饰品，而是多元积分里最不能漏写的那张面积发票。",
              ),
              system(
                "结案",
                "案四告破：你把失踪的 Jacobian 从“线性变换免检通道”里当场拽了回来。",
              ),
            ],
          },
        ],
        resolvedLines: [],
      },
    ],
    verdict:
      "第四案之后，研讨间里再也没人敢把换元理解成“把 x 换成 u 那么简单”。你让所有人看到：多元积分真正难的地方，恰恰是那些看似不起眼的面积因子与变量方向；少一个 1/2，整道题都会从优雅滑向事故。",
  },
  {
    id: "case-5",
    order: 5,
    shortLabel: "第五案",
    title: "洞口旁的零旋度",
    subtitle: "曲线积分与保守场的失真",
    difficulty: "高阶",
    sceneLabel: "校园湖边石桌区",
    sceneAsset: "assets/images/backgrounds/lakeside-stone-table.jpg",
    objective:
      "指出“零旋度即保守场”遗漏了单连通条件，并通过单位圆上的闭路积分证明给定向量场并非全局保守。",
    summary:
      "第五案走进曲线积分。rikka学姐拿出一支在原点附近打转的向量场，试图用‘偏导相等’一锤定音。你要拆掉的，不只是一个局部条件被滥用，而是一整个被洞口扭曲的全局结论。",
    intro:
      "傍晚的校园湖边石桌区总有人摊着草稿纸聊题。rikka学姐喜欢把向量场画得像天气图，今天她在原点周围画出一圈逆时针箭头，语气却异常笃定：只要旋度为零，势函数就一定存在。围坐的人已经有人开始写“路径无关”四个字，而你盯着那个被故意略过的原点，只觉得整张图里有个洞正在发亮。",
    player: {
      name: "王若臣",
      role: "计算机系本科生",
      glyph: "王",
      asset: "assets/images/portraits/player-wang.png",
    },
    npc: {
      name: "rikka学姐",
      role: "向量分析社团学姐",
      glyph: "R",
      asset: "assets/images/portraits/senior-rikka.png",
    },
    maxCredibility: 9,
    failureText:
      "rikka学姐把原点重新圈了一遍，像在提醒你那个洞一直都在。你输掉这一案，不是不会算线积分，而是让局部条件冒充了全局性质：零旋度只说明附近看起来平静，不说明绕洞一圈还会老实。",
    initialEvidence: [
      "ev-conservative-criterion",
      "ev-simply-connected-domain",
      "ev-curl-zero-not-enough",
      "ev-unit-circle-param",
      "ev-closed-curve-criterion",
      "ev-circle-integral-2pi",
      "ev-mean-value",
    ],
    events: [
      {
        type: "dialogue",
        lines: [
          system(
            "旁白",
            "石桌上的草稿本摊开成一张去掉原点的平面，密密的箭头像被谁拧成了漩涡。rikka学姐把偏导算式写得很快，像生怕大家有空去看那块缺失的中心。",
          ),
          npc(
            "开场",
            "看这个向量场 F(x,y)=(-y/(x²+y²), x/(x²+y²))。直接验算可知 ∂P/∂y = ∂Q/∂x，所以它当然是保守场，势函数存在，路径积分自然无关。",
          ),
          cameo(
            "围观同学",
            "低声",
            "“当然”又来了。向量场题里这词一响，我第一反应就是先找有没有洞。",
          ),
          player(
            "心声",
            "她把原点周围那块空白讲得像背景色。可有时候，一个洞就足够让整个结论绕一大圈回来。",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第一轮反驳",
          "偏导相等就意味着这个二维场是某个势函数的梯度，这一点没有争议。去掉原点不影响结论本身。",
        ),
        stages: [
          {
            kind: "choice",
            prompt: "这一轮最先缺失的是什么条件？",
            modeLabel: "选择突破口",
            correctOption: "simply-connected",
            options: [
              {
                id: "simply-connected",
                label: "区域必须单连通",
                detail: "保守场判据除了偏导相等，还依赖区域没有洞。",
              },
              {
                id: "bounded-domain",
                label: "区域必须有界",
                detail: "有界与否并不是这条准则的核心要求。",
              },
              {
                id: "closed-curve-smooth",
                label: "曲线必须光滑",
                detail: "曲线光滑是之后算积分的问题，不是当前判据的缺口。",
              },
            ],
            failureText: "这案的核心不是算错偏导，而是把区域拓扑条件蒸发掉了。",
            wrongChoiceResponses: {
              "bounded-domain": failure(
                "边界不是重点",
                "整片平面都可以拿来讨论保守场；真正惹事的是原点被挖掉以后留下的洞。",
              ),
              "closed-curve-smooth": failure(
                "对象拿早了",
                "现在还在讨论向量场是否保守，不是具体哪条曲线能不能积分。",
              ),
            },
            genericFailureResponse: failure(
              "刀口偏了",
              "‘零旋度推出保守’真正危险的遗漏，是单连通三个字。",
            ),
            successLines: [
              player(
                "切入",
                "争议就在这里：偏导相等还不够，区域还必须单连通。去掉原点以后，这块平面已经不是一张没有洞的纸了。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "拿出完整的保守场判别准则。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-conservative-criterion"],
            failureText: "先把准则完整版写出，别让“偏导相等”独自扮演全部条件。",
            genericFailureResponse: failure(
              "条件没写完整",
              "请把‘在单连通区域内’和‘偏导连续且相等’一起端上来。",
            ),
            successLines: [
              player(
                "异议",
                "完整准则是：在单连通区域内，若 ∂P/∂y = ∂Q/∂x 且偏导连续，才可推出保守场。你把最关键的拓扑前提整段删掉了。",
              ),
              npc(
                "抬手",
                "单连通听上去很玄，可很多时候只是书写洁癖。这个场除了原点处没定义，其他地方都光滑得很，哪里就差那一步了？",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "说明为什么去掉原点后的区域不是单连通。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-simply-connected-domain"],
            failureText: "要把‘洞’说成数学语言，而不是只靠图像比画。",
            genericFailureResponse: failure(
              "洞还没被正式命名",
              "请明确指出：去掉原点后，绕原点一圈的闭曲线不能在区域内部缩成一点。",
            ),
            successLines: [
              player(
                "说明",
                "单连通要求每条闭曲线都能在区域内部缩成一点。可绕原点一圈的曲线若强行收缩，最终一定得碰到缺失的原点，所以这片区域不是单连通。",
              ),
              cameo(
                "围观同学",
                "低声",
                "原来那个洞不是图上的留白，是整条判据里真正缺掉的那一块。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "再补一句结论：为什么零旋度在这里仍然不够？",
            modeLabel: "出示证据",
            correctEvidence: ["ev-curl-zero-not-enough"],
            failureText: "这里要把‘局部条件’和‘全局结论’明确分层。",
            genericFailureResponse: failure(
              "结论还没封口",
              "请直接指出：在非单连通区域上，零旋度并不能自动推出保守场。",
            ),
            successLines: [
              player(
                "封口",
                "零旋度只是局部平静，保守场却是全局性质。只要区域里有洞，局部不旋，不代表绕洞一圈以后线积分还会归零。",
              ),
              system(
                "旁白",
                "石桌边有人下意识地把笔尖从原点附近移开，像是第一次认真看见那块原来被当成留白的空洞。",
              ),
            ],
          },
        ],
        resolvedLines: [
          npc(
            "追击",
            "听上去不错，但你说的都还是原则。要真想推翻我，就拿一条闭曲线出来，让这向量场自己开口。",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第二轮反驳",
          "你若拿不出一条真的让积分非零的闭曲线，‘有洞’终究只是视觉紧张感。别让拓扑只停在修辞上。",
        ),
        stages: [
          {
            kind: "evidence",
            prompt: "先选出最标准的闭曲线并写出参数化。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-unit-circle-param"],
            failureText: "最方便的试金石就是绕原点一周的单位圆。",
            genericFailureResponse: failure(
              "试金石还没上场",
              "把单位圆参数化写出来，后面的点积才能真正开始。",
            ),
            successLines: [
              player(
                "选曲线",
                "最自然的闭曲线就是单位圆 C：r(t)=(cos t,sin t)，0≤t≤2π，且 r'(t)=(-sin t,cos t)。",
              ),
            ],
          },
          {
            kind: "choice",
            prompt: "把这个参数代入向量场后，F(r(t))·r'(t) 等于什么？",
            modeLabel: "选择计算结果",
            correctOption: "one",
            options: [
              {
                id: "one",
                label: "恒等于 1",
                detail: "单位圆上分母化成 1，向量场恰好沿切向单位旋转。",
              },
              {
                id: "zero",
                label: "恒等于 0",
                detail: "若真为 0，就不会出现非零环流。",
              },
              {
                id: "minus-one",
                label: "恒等于 -1",
                detail: "方向若全部反了，才会出现这个结果。",
              },
            ],
            failureText: "单位圆上 x²+y²=1，算点积时别把切向量方向弄丢。",
            wrongChoiceResponses: {
              zero: failure(
                "把环流抹平了",
                "这个场在单位圆上正好沿切向走，点积不可能是 0。",
              ),
              "minus-one": failure(
                "方向看反了",
                "若你改成顺时针参数化才会多出负号；当前参数是逆时针。",
              ),
            },
            genericFailureResponse: failure(
              "点积没算准",
              "在单位圆上分母是 1，而 F 与 r' 的方向正好一致。",
            ),
            successLines: [
              player(
                "计算",
                "代入后得到 F(r(t))=(-sin t,cos t)，而 r'(t) 也是 (-sin t,cos t)，所以点积恒等于 1。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "据此给出整条闭曲线上的积分值。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-circle-integral-2pi"],
            failureText: "这一步要把非零结果明确算出来，别只说‘看起来不为零’。",
            genericFailureResponse: failure(
              "最后的数值还没落地",
              "既然点积恒为 1，就把 0 到 2π 的积分老老实实写完。",
            ),
            successLines: [
              player(
                "落锤",
                "因此 ∮_C F·dr = ∫(0→2π)1dt = 2π。只要这个值不是 0，‘全局保守’就已经当场破产。",
              ),
              npc(
                "沉默片刻",
                "也就是说，局部偏导再怎么安静，绕原点一圈之后，整个场还是会吐出一个完整的 2π。",
              ),
            ],
          },
        ],
        resolvedLines: [
          npc(
            "最后挣扎",
            "也许这只是某一条特殊曲线的意外。你还得说明：为什么一个非零闭路积分足以彻底否定保守场。",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第三轮反驳",
          "就算单位圆上的积分非零，也只能说明这条曲线‘有点特殊’。谁能保证势函数不存在，而不是你恰好绕错了路？",
        ),
        stages: [
          {
            kind: "evidence",
            prompt: "拿出保守场与闭路积分之间的正式判据。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-closed-curve-criterion"],
            failureText: "最后要用的判据很直接：保守场对任意闭曲线的积分都应为零。",
            genericFailureResponse: failure(
              "还缺最后的逻辑闭环",
              "把‘保守场 ⇒ 任意闭路积分为零’这句正式写出来。",
            ),
            successLines: [
              player(
                "判据",
                "若 F 真是某个势函数的梯度，那么对区域内任意闭曲线都有 ∮_C F·dr = 0。这不是个别曲线的性格问题，而是保守场的统一判据。",
              ),
            ],
          },
          {
            kind: "choice",
            prompt: "基于前两轮，你应当给出哪句最终结论？",
            modeLabel: "选择结论",
            correctOption: "not-conservative",
            options: [
              {
                id: "not-conservative",
                label: "该场在去掉原点的平面上不是全局保守场",
                detail: "闭路积分为 2π，直接否定势函数的全局存在。",
              },
              {
                id: "still-conservative",
                label: "该场仍是保守场，只是单位圆积分特殊",
                detail: "这与保守场的闭路积分判据正面冲突。",
              },
              {
                id: "need-better-curve",
                label: "还需要找更复杂的曲线才能下结论",
                detail: "一个非零闭路积分已经足够。",
              },
            ],
            failureText: "一个非零闭路积分已经足以终结“全局保守”这一说法。",
            wrongChoiceResponses: {
              "still-conservative": failure(
                "和判据正面撞上了",
                "若势函数存在，闭路积分就不可能是 2π。这不是‘特殊’，是‘当场矛盾’。",
              ),
              "need-better-curve": failure(
                "证据已经够重了",
                "对全称结论来说，一条合法反例曲线就足够。你不需要再替它找第二遍死因。",
              ),
            },
            genericFailureResponse: failure(
              "终局态度不够坚决",
              "保守场一旦出现非零闭路积分，就该立刻排除，而不是继续观望。",
            ),
            successLines: [
              player(
                "收束",
                "结论只能是：这个场在去掉原点的平面上并非全局保守场。局部零旋度没有错，错的是把它跨过那个洞，直接升级成全局势函数。",
              ),
              npc(
                "认输",
                "好。我承认我把单连通当成了空气。原点这一口洞，足以让整句‘零旋度即保守’绕一圈再失真。",
              ),
              system(
                "结案",
                "案五告破：你让全场看到，曲线积分里最可怕的往往不是计算量，而是那个被故意视而不见的洞。",
              ),
            ],
          },
        ],
        resolvedLines: [],
      },
    ],
    verdict:
      "第五案把争论从‘会不会算’推进到了‘会不会看全局结构’。你证明了：局部偏导条件再漂亮，也不能替代区域拓扑；而一条闭曲线上的 2π，足以把整个“保守场神话”绕回原点。",
  },
  {
    id: "case-6",
    order: 6,
    shortLabel: "第六案",
    title: "重根少写一维",
    subtitle: "三阶微分方程的解空间缺口",
    difficulty: "终章",
    sceneLabel: "本科生答疑研讨间",
    sceneAsset: "assets/images/backgrounds/ta-tutoring-room.jpg",
    objective:
      "纠正三重根只写出两个解的错误，说明三阶线性齐次方程需要三维基本解组，并用初值问题锁定缺失解的重要性。",
    summary:
      "第六案进入高阶常微分方程。杜助教把三重根写得铿锵有力，却在最后一行少写了一维自由度。你要做的，是把那个被吞掉的 x²e^x 从特征方程、Wronskian 与初值问题三层证据里一起拉回来。",
    intro:
      "本科生答疑研讨间快要熄灯时，白板上写的是 y'''-3y''+3y'-y=0。杜助教推到特征方程 (r-1)^3=0 后，非常流畅地写下了通解 y=(C1+C2x)e^x，然后停笔，转身，仿佛事情已经结束。屋里有一秒钟的迟疑，像三阶方程自己也发现少了点什么。",
    player: {
      name: "王若臣",
      role: "计算机系本科生",
      glyph: "王",
      asset: "assets/images/portraits/player-wang.png",
    },
    npc: {
      name: "杜助教",
      role: "本科生助教",
      glyph: "杜",
      asset: "assets/images/portraits/assistant-du.png",
    },
    maxCredibility: 10,
    failureText:
      "杜助教把方程编号圈了起来，像是在提醒你：三阶不会因为你偷懒就自动降成二阶。你输掉这一案，往往不是算不出指数，而是忘了重根会带来整串独立解，少一维就少整个解空间。",
    initialEvidence: [
      "ev-nth-order-dimension",
      "ev-repeated-root-theorem",
      "ev-case6-charpoly",
      "ev-wronskian-case6",
      "ev-third-order-ivp",
      "ev-case6-ivp-solution",
      "ev-mean-value",
    ],
    events: [
      {
        type: "dialogue",
        lines: [
          system(
            "旁白",
            "答疑研讨间里只剩最后一行方程和最后一点耐心。杜助教写板书的速度像在宣告：常系数线性方程这种事，熟练就该像呼吸一样自然。",
          ),
          npc(
            "开场",
            "特征方程是 (r-1)^3=0，所以根只有 r=1。既然指数解都是 e^x，那通解写成 y=(C1+C2x)e^x 已经够了，再往后不过是同一个解换说法。",
          ),
          cameo(
            "旁听同学",
            "低声",
            "三阶方程只给两个常数？这听着就像把最后一维当赠品省掉了。",
          ),
          player(
            "心声",
            "问题不在前两步，而在‘已经够了’这四个字。高阶方程最怕的不是根难找，而是找到根以后自作主张提前下课。",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第一轮反驳",
          "重根只说明同一个指数解出现了多次，本质上还是 e^x 那一家人。把它写成 (C1+C2x)e^x 已经覆盖全部自由度。",
        ),
        stages: [
          {
            kind: "evidence",
            prompt: "先把这道方程的特征方程与根的重数正式写清。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-case6-charpoly"],
            failureText: "要拆重根事故，第一步先把‘三重根’这个事实钉死。",
            genericFailureResponse: failure(
              "根的结构还没立案",
              "请明确指出：特征多项式就是 (r-1)^3，因此根 1 的重数是 3。",
            ),
            successLines: [
              player(
                "立案",
                "特征方程并不只是‘有个根 1’，而是 (r-1)^3=0，说明 r=1 是三重根。少看一个重数，就等于少看一层解空间。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "拿出重根对应基本解的正确结构。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-repeated-root-theorem"],
            failureText: "这里需要的不是直觉，而是重根解结构的正式定理。",
            genericFailureResponse: failure(
              "定理还没摆出来",
              "请直接给出：重数为 m 时，要有 e^(rx), x e^(rx), ..., x^(m-1)e^(rx)。",
            ),
            successLines: [
              player(
                "异议",
                "重根不会只留下一个指数解。若 r 的重数为 3，对应就必须有 e^x、x e^x、x² e^x 三个线性无关解。",
              ),
              npc(
                "皱眉",
                "x²e^x？那不过是同一家族里更花哨的一位亲戚。谁能保证它不是前两个解的线性组合？",
              ),
            ],
          },
          {
            kind: "choice",
            prompt: "这道题里被杜助教漏写的第三个标准解是哪一个？",
            modeLabel: "选择解",
            correctOption: "x2ex",
            options: [
              {
                id: "x2ex",
                label: "x²e^x",
                detail: "三重根对应第三个独立解。",
              },
              {
                id: "e2x",
                label: "e^(2x)",
                detail: "这对应另一根 2，但特征方程里根本没有它。",
              },
              {
                id: "lnxex",
                label: "ln(x)e^x",
                detail: "这不是常系数重根方程的标准结构。",
              },
            ],
            failureText: "三重根对应的是 x 的幂次递进，不是另起一个指数。",
            wrongChoiceResponses: {
              e2x: failure(
                "根从天而降了",
                "特征方程只有 r=1 这一根；e^(2x) 没有任何入场许可。",
              ),
              lnxex: failure(
                "把别的套路串进来了",
                "常系数重根方程的基本解是 x 的幂乘指数，不会平白长出对数。",
              ),
            },
            genericFailureResponse: failure(
              "第三个解还没认出来",
              "重数为 3 时，第三位成员就是 x²e^x。",
            ),
            successLines: [
              player(
                "点名",
                "漏写的就是 x²e^x。三重根的第三维自由度，恰恰藏在这一个看似多余的 x² 里。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "再说明：三阶线性齐次方程为什么不能只靠两个独立解收场？",
            modeLabel: "出示证据",
            correctEvidence: ["ev-nth-order-dimension"],
            failureText: "必须把‘三阶 ⇒ 三维解空间’这层结构说完整。",
            genericFailureResponse: failure(
              "解空间维数还没锁死",
              "请直接指出：n 阶线性齐次方程的解空间是 n 维的。",
            ),
            successLines: [
              player(
                "定维",
                "这是一道三阶线性齐次方程，解空间必须是三维。若只写两个独立解，就等于把一整个方向的解硬生生删掉了。",
              ),
              cameo(
                "旁听同学",
                "低声记下",
                "少一个常数原来不是板书省字，是把整个解空间直接漏掉一块。",
              ),
              system(
                "旁白",
                "研讨间里第一次出现那种很安静的、带着线性代数味道的敬畏：原来少写一个解，不是细节问题，而是维数塌了一块。",
              ),
            ],
          },
        ],
        resolvedLines: [
          npc(
            "不服",
            "维数讲得很响亮，但 x²e^x 到底是不是独立的，还得拿真凭实据。别让‘看起来不一样’冒充线性无关。",
          ),
        ],
      },
      {
        type: "cross",
        line: npc(
          "第二轮反驳",
          "e^x、x e^x、x² e^x 写法确实不同，但不同写法不等于线性无关。也许第三个解只是前两个解的组合伪装。",
        ),
        stages: [
          {
            kind: "evidence",
            prompt: "用哪张卡能正式判定这三解线性无关？",
            modeLabel: "出示证据",
            correctEvidence: ["ev-wronskian-case6"],
            failureText: "这一轮需要正式的独立性判据，而不是靠肉眼分辨。",
            genericFailureResponse: failure(
              "独立性证据级别不够",
              "Wronskian 在这里就是最直接、也最硬的独立性判据。",
            ),
            successLines: [
              player(
                "正证",
                "判断它们是否线性无关，不靠‘看起来像不像’，而靠 Wronskian。对 e^x、x e^x、x² e^x，可算得 W=2e^(3x)≠0。",
              ),
              npc(
                "缓了半秒",
                "既然 Wronskian 非零，那它们的确不能彼此替代。",
              ),
            ],
          },
          {
            kind: "choice",
            prompt: "由 Wronskian 非零，应得出哪条直接结论？",
            modeLabel: "选择结论",
            correctOption: "independent-basis",
            options: [
              {
                id: "independent-basis",
                label: "三者线性无关，可组成基本解组",
                detail: "这意味着通解必须含三个自由常数。",
              },
              {
                id: "same-family",
                label: "三者属于同一家族，因此不必全写",
                detail: "家族感不能代替线性代数结论。",
              },
              {
                id: "only-local",
                label: "只在某个点附近独立，整体未必",
                detail: "Wronskian 在区间上非零已足以说明全局独立。",
              },
            ],
            failureText: "Wronskian 非零的作用非常明确：直接宣告线性无关。",
            wrongChoiceResponses: {
              "same-family": failure(
                "亲戚关系不等于线性关系",
                "都带 e^x 只是表面相似，乘上不同幂次的 x 后，它们在解空间里就是不同方向。",
              ),
              "only-local": failure(
                "判据已经够强",
                "对这类常微分方程，Wronskian 非零足以确认它们在该区间上线性无关。",
              ),
            },
            genericFailureResponse: failure(
              "Wronskian 的结论没落稳",
              "非零就是非零，不需要再给‘基本解组’留模糊余地。",
            ),
            successLines: [
              player(
                "追击",
                "Wronskian 非零说明三者线性无关，因此它们正好构成三阶方程所需的基本解组。通解必须写成 y=(C1+C2x+C3x²)e^x。",
              ),
              npc(
                "最后挣扎",
                "即便如此，少写那个 C3 也未必影响实际做题。很多初值问题照样可能被前两个常数解决。",
              ),
            ],
          },
        ],
        resolvedLines: [],
      },
      {
        type: "cross",
        line: npc(
          "第三轮反驳",
          "你说第三个常数不可少，可真正做初值问题时，未必每次都会用到它。也许 y(0)、y'(0)、y''(0) 这些条件里，前两个就足够锁定解。",
        ),
        stages: [
          {
            kind: "evidence",
            prompt: "先说明三阶初值问题为何必须配三个初值条件。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-third-order-ivp"],
            failureText: "方程的阶数与所需初值个数必须对齐，这一步不能含糊。",
            genericFailureResponse: failure(
              "初值个数还没对齐",
              "三阶方程要唯一锁定解，通常就得给出 y、y'、y'' 三个条件。",
            ),
            successLines: [
              player(
                "对齐",
                "三阶方程对应三个自由常数，所以要唯一确定解，必须给出 y(0)、y'(0)、y''(0) 三个条件。若只保留两个方向，第三个初值根本无处安放。",
              ),
            ],
          },
          {
            kind: "evidence",
            prompt: "用具体初值问题说明缺失的第三解会怎样让解答失败。",
            modeLabel: "出示证据",
            correctEvidence: ["ev-case6-ivp-solution"],
            failureText: "这一步要把缺失解的后果真正算出来，而不是停在抽象讨论。",
            genericFailureResponse: failure(
              "缺口还没落到算例上",
              "请直接代入 y(0)=0, y'(0)=0, y''(0)=2，看看没有 x²e^x 会发生什么。",
            ),
            successLines: [
              player(
                "算例",
                "若写成 y=(C1+C2x+C3x²)e^x，再代入 y(0)=0, y'(0)=0, y''(0)=2，可解得 C1=0, C2=0, C3=1，所以唯一解就是 y=x²e^x。若少了第三项，这个初值问题根本无解。",
              ),
              npc(
                "终于停笔",
                "也就是说，x²e^x 不是锦上添花，而是某些初值问题唯一能活下去的那一维。",
              ),
            ],
          },
          {
            kind: "choice",
            prompt: "选出这道方程最后应留在答疑白板上的正确通解。",
            modeLabel: "选择通解",
            correctOption: "three-constant",
            options: [
              {
                id: "three-constant",
                label: "y=(C1+C2x+C3x²)e^x",
                detail: "三重根对应三维基本解组，这是完整通解。",
              },
              {
                id: "two-constant",
                label: "y=(C1+C2x)e^x",
                detail: "这少了一维自由度，无法覆盖全部解。",
              },
              {
                id: "single-exp",
                label: "y=Ce^x",
                detail: "这连二重根都没照顾到，更别说三重根。",
              },
            ],
            failureText: "终局必须把完整通解写回黑板，而不是只指出别人少写了什么。",
            wrongChoiceResponses: {
              "two-constant": failure(
                "旧伤未愈",
                "你已经证明少写一维会让解空间塌陷，现在别又把塌陷版本交回去。",
              ),
              "single-exp": failure(
                "这已经退回第一层错误了",
                "单个指数只覆盖最基础的一维，连重根结构都还没开始。",
              ),
            },
            genericFailureResponse: failure(
              "收束不完整",
              "最后一句必须把三维结构、三重根与三个常数一起写完整。",
            ),
            successLines: [
              player(
                "终局总结",
                "正确通解只能是 y=(C1+C2x+C3x²)e^x。高阶方程最忌讳的，不是写得长，而是把解空间偷偷写短。",
              ),
              npc(
                "认输",
                "好，我承认。三重根不是重复一遍语气，而是重复出三维结构。少写那个 x²e^x，等于把整道方程降成了伪二阶。",
              ),
              system(
                "终局",
                "案六告破：你把一维被吞掉的解空间从特征方程、Wronskian 与初值问题里完整救了回来。",
              ),
            ],
          },
        ],
        resolvedLines: [],
      },
    ],
    verdict:
      "第六案收尾得很干脆：高阶微分方程不会因为板书自信就自动少一维。你证明了，重根的真正难点不在写出 e^x，而在坚持把整串独立解都保留下来；一旦偷掉那一维，解空间、初值问题和整个论证结构都会跟着坍塌。",
  },
];

export const ending = {
  title: "逆转完成",
  summary:
    "六场质询之后，校园里的笑声仍在，但它不再属于那些把条件当脚注、把局部直觉当全局真理、把重根当重复措辞的人。你完成的也不再只是单变量数分的反驳，而是一条逐层上升的训练路径：从连续与可导，到极值定理与上确界，再到积分换元、曲线积分、保守场与高阶微分方程。每一案都在逼你做同一件事：把漂亮但危险的口号，压回定义、条件、定理、反例和计算共同约束下的真命题。",
  facts: [
    {
      label: "你击穿的误区",
      value: "逆命题偷换、尖点误判连续性、开区间误套极值定理、上确界与最大值混淆、微积分基本定理被无条件扩写、线性换元漏乘 Jacobian、零旋度误判保守场、三重根少写解空间",
    },
    {
      label: "你反复使用的工具",
      value: "定义、单向定理、逻辑卡、反例原则、分段计算、Jacobian、闭路积分、Wronskian、初值问题",
    },
    {
      label: "后续可扩展案件",
      value: "曲面积分与定向、散度定理与边界条件、傅里叶级数收敛、偏微分方程初边值问题、复分析中的路径独立性",
    },
  ],
};
