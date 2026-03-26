import { useState, useEffect } from "react";

const C = {
  cream: "#faf6f0", warm: "#fffdf9", brown: "#5c3d2e", brownL: "#8b6355",
  brownP: "#c4a882", sage: "#8a9e7e", sageL: "#b8c9b0", peach: "#e8a87c",
  peachL: "#f5d5b8", rose: "#c9897a", ink: "#2c1810", inkL: "#5c4033",
  border: "#e0d0bc", gold: "#b8860b", goldBg: "#fdf5e4",
};

const BOOKS = [
  { title:"猜猜我有多爱你", lang:"中译", author:"山姆·麦克布雷尼", ageMin:0, ageMax:4, themes:["情绪管理","亲子情感"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读"], awards:"英国格林纳威奖提名", buy:"京东、当当、各大书店", desc:"用小兔子比赛「爱有多深」，让孩子感受被爱的安全感，睡前亲子共读的经典之选。", tags:["不安全感","分离焦虑","情绪"] },
  { title:"晚安，月亮", lang:"中译", author:"玛格丽特·怀兹·布朗", ageMin:0, ageMax:3, themes:["生活习惯"], style:"简洁明快", interactive:"普通绘本", reading:["亲子共读"], awards:"美国图书馆协会推荐", buy:"京东、当当", desc:"重复的语言节奏帮助宝宝建立睡眠仪式，读几遍后孩子会跟着说，有助于入睡。", tags:["不肯睡觉","睡前","睡眠"] },
  { title:"棕色的熊棕色的熊你在看什么", lang:"中译", author:"比尔·马丁", ageMin:0, ageMax:3, themes:["自然动物","认知启蒙"], style:"简洁明快", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"美国幼儿经典读物", buy:"京东、当当", desc:"重复句式+鲜艳色彩，0-2岁语言启蒙神书，读几遍后孩子就能预测下一页。", tags:["语言发育","认知"] },
  { title:"好饿的毛毛虫", lang:"中译", author:"艾瑞克·卡尔", ageMin:1, ageMax:4, themes:["自然动物","认知启蒙","科学探索"], style:"细节丰富", interactive:"洞洞书", reading:["亲子共读","孩子自主阅读"], awards:"国际安徒生奖插画师", buy:"京东、当当、各大书店", desc:"洞洞书形式天然吸引孩子探索，同时学习数字食物星期，趣味和认知兼顾的经典之作。", tags:["不爱吃饭","挑食","认知"] },
  { title:"蚯蚓的日记", lang:"中译", author:"朵琳·克罗宁", ageMin:3, ageMax:7, themes:["自然动物","想象力冒险"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"美国图书馆协会推荐", buy:"京东、当当", desc:"用蚯蚓写日记的视角观察世界，幽默有创意，培养孩子观察力和同理心，大人读了也会笑。", tags:["想象力","观察力"] },
  { title:"我爸爸", lang:"中译", author:"安东尼·布朗", ageMin:2, ageMax:6, themes:["亲子情感","情绪管理"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读"], awards:"国际安徒生奖得主", buy:"京东、当当、各大书店", desc:"孩子眼中爸爸是无所不能的超人，画面充满彩蛋，每次读都有新发现，适合爸爸讲给孩子听。", tags:["亲子关系","爸爸陪伴"] },
  { title:"我妈妈", lang:"中译", author:"安东尼·布朗", ageMin:2, ageMax:6, themes:["亲子情感","情绪管理"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读"], awards:"国际安徒生奖得主", buy:"京东、当当、各大书店", desc:"用孩子的口吻赞美妈妈，画面温暖幽默，读完孩子会抱着你说「我爱你妈妈」。", tags:["亲子关系","情绪"] },
  { title:"汽车嘟嘟嘟", lang:"中译", author:"罗伦·汤普森", ageMin:1, ageMax:3, themes:["交通工具"], style:"简洁明快", interactive:"普通绘本", reading:["亲子共读"], awards:"美国儿童读物推荐", buy:"京东、当当", desc:"专为迷恋汽车的小朋友设计，拟声词丰富朗朗上口，认识各种车辆的入门绘本。", tags:["交通工具","语言"] },
  { title:"工程师小火车", lang:"中译", author:"沃特·韦克", ageMin:2, ageMax:5, themes:["交通工具","科学探索"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读"], awards:"美国科普绘本推荐", buy:"京东、亚马逊", desc:"讲火车构造和工作原理，画面细节超丰富，迷恋交通工具的孩子能反复看，还能学到真实知识。", tags:["交通工具","科学"] },
  { title:"挖土机年年转", lang:"中译", author:"Virginia Lee Burton", ageMin:2, ageMax:5, themes:["交通工具","科学探索"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读"], awards:"美国图书馆协会推荐", buy:"京东、当当", desc:"经典工程车绘本，讲一台挖土机如何帮助城市建设，画面震撼，工程车迷必读。", tags:["交通工具","工程"] },
  { title:"菲菲生气了", lang:"中译", author:"莫莉·卞", ageMin:2, ageMax:5, themes:["情绪管理"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读"], awards:"凯迪克荣誉奖", buy:"京东、当当、各大书店", desc:"用满页红色表现愤怒，帮孩子认识和命名自己的情绪，情绪管理启蒙的经典绘本。", tags:["发脾气","情绪管理","打人"] },
  { title:"生气汤", lang:"中译", author:"贝西·艾佛瑞", ageMin:3, ageMax:6, themes:["情绪管理"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读"], awards:"美国图书馆协会推荐", buy:"京东、当当", desc:"用煮「生气汤」的方式发泄情绪，给孩子一个具体的情绪出口，读完可以跟孩子玩角色扮演。", tags:["发脾气","情绪管理"] },
  { title:"我的情绪小怪兽", lang:"中译", author:"安娜·莱纳斯", ageMin:3, ageMax:6, themes:["情绪管理"], style:"简洁明快", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"西班牙畅销绘本", buy:"京东、当当、各大书店", desc:"用颜色和怪兽形象区分不同情绪，帮助孩子建立情绪词汇，目前口碑最好的情绪绘本之一。", tags:["情绪管理","发脾气","哭闹"] },
  { title:"大卫不可以", lang:"中译", author:"大卫·香农", ageMin:2, ageMax:5, themes:["生活习惯","情绪管理"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读"], awards:"凯迪克荣誉奖", buy:"京东、当当、各大书店", desc:"大卫总是做各种调皮的事，结尾妈妈说「我爱你」，让孩子知道犯错了也被爱，特别治愈。", tags:["不听话","规则","情绪"] },
  { title:"牙齿大街的新鲜事", lang:"中译", author:"金·福罗", ageMin:3, ageMax:6, themes:["生活习惯"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读"], awards:"德国绘本奖", buy:"京东、当当", desc:"把牙齿比喻成住在嘴巴里的居民，不刷牙就会有蛀牙怪捣乱，用故事方式让孩子理解刷牙的重要性。", tags:["不爱刷牙","刷牙","生活习惯"] },
  { title:"鳄鱼怕怕牙医怕怕", lang:"中译", author:"五味太郎", ageMin:2, ageMax:5, themes:["生活习惯"], style:"简洁明快", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"日本畅销绘本", buy:"京东、当当、各大书店", desc:"鳄鱼和牙医互相害怕，幽默化解看牙恐惧，顺带强调刷牙的重要性，孩子超爱这本。", tags:["不爱刷牙","看牙恐惧","刷牙"] },
  { title:"小熊宝宝绘本系列", lang:"中译", author:"佐佐木洋子", ageMin:0, ageMax:2, themes:["生活习惯","认知启蒙"], style:"简洁明快", interactive:"普通绘本", reading:["亲子共读"], awards:"日本畅销婴幼儿绘本", buy:"京东、当当、各大书店", desc:"专为0-2岁设计，涵盖如厕洗手吃饭等日常场景，是建立生活习惯的好帮手。", tags:["生活习惯","如厕","吃饭"] },
  { title:"我有友情要出租", lang:"中文", author:"方素珍", ageMin:3, ageMax:6, themes:["友谊社交"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"台湾金鼎奖", buy:"京东、当当", desc:"大猩猩挂出「友情出租」的牌子，温暖又幽默地展示了如何主动建立友谊。", tags:["不会交朋友","社交","孤独"] },
  { title:"小阿力的大学校", lang:"中译", author:"安琦拉·麦卡利斯特", ageMin:3, ageMax:5, themes:["入园适应","友谊社交"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读"], awards:"英国畅销幼儿绘本", buy:"京东、当当", desc:"小阿力对上学又期待又紧张，展示了入园第一天的真实感受，适合入园前一两个月开始读。", tags:["入园焦虑","不想上幼儿园","分离焦虑"] },
  { title:"魔法亲亲", lang:"中译", author:"奥黛丽·潘恩", ageMin:2, ageMax:5, themes:["入园适应","亲子情感"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读"], awards:"美国畅销亲子绘本", buy:"京东、当当、各大书店", desc:"妈妈在孩子手心印一个吻，想妈妈时把手心贴脸上，这个仪式感的方法真的有效缓解分离焦虑。", tags:["入园焦虑","分离焦虑","想妈妈"] },
  { title:"汤姆上幼儿园", lang:"中译", author:"罗斯玛丽·威尔斯", ageMin:2, ageMax:4, themes:["入园适应"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读"], awards:"美国图书馆协会推荐", buy:"京东、当当", desc:"汤姆第一天上幼儿园，真实呈现孩子从抗拒到接受的过程，让孩子知道我不是一个人。", tags:["入园焦虑","不想上幼儿园"] },
  { title:"弟弟出生了", lang:"中译", author:"简·赛门", ageMin:2, ageMax:5, themes:["二胎家庭"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读"], awards:"美国儿童绘本推荐", buy:"京东、当当", desc:"从大宝视角讲述弟弟出生后的复杂感受，适合准备迎接二宝的家庭提前和大宝谈论这件事。", tags:["二胎","大宝情绪","嫉妒"] },
  { title:"我是老大", lang:"中译", author:"Lauren Berger", ageMin:3, ageMax:6, themes:["二胎家庭"], style:"简洁明快", interactive:"普通绘本", reading:["亲子共读"], awards:"美国二胎主题推荐绘本", buy:"京东", desc:"用正面方式让大宝看到自己的优势，帮助大宝建立老大的自豪感，而不是失落感。", tags:["二胎","大宝情绪","嫉妒"] },
  { title:"野兽国", lang:"中译", author:"莫里斯·桑达克", ageMin:3, ageMax:7, themes:["想象力冒险","情绪管理"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"凯迪克金奖", buy:"京东、当当、各大书店", desc:"男孩麦克斯幻想去野兽国当国王，是关于情绪和想象力最伟大的绘本之一。", tags:["情绪","想象力","发脾气"] },
  { title:"母鸡萝丝去散步", lang:"中译", author:"佩特·哈群斯", ageMin:2, ageMax:5, themes:["自然动物","想象力冒险"], style:"简洁明快", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"美国图书馆协会推荐", buy:"京东、当当、各大书店", desc:"文字只讲母鸡散步，图画里狐狸一路倒霉，文图反差制造超强喜剧效果，孩子笑着读完就懂了。", tags:["幽默","观察力"] },
  { title:"爷爷一定有办法", lang:"中译", author:"菲比·吉尔曼", ageMin:3, ageMax:6, themes:["亲子情感","传统文化"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读"], awards:"加拿大儿童文学奖", buy:"京东、当当、各大书店", desc:"爷爷把旧毯子一次次改造，画面里还有老鼠家族用碎布做床，两条故事线同步进行，充满惊喜。", tags:["祖孙情感","创意"] },
  { title:"活了一百万次的猫", lang:"中译", author:"佐野洋子", ageMin:4, ageMax:8, themes:["情绪管理","亲子情感"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"日本绘本奖", buy:"京东、当当、各大书店", desc:"表面是猫的故事，实际讲的是爱和生命意义，大人读了比孩子还感动。", tags:["情绪","生命教育","爱"] },
  { title:"花婆婆", lang:"中译", author:"芭芭拉·库尼", ageMin:4, ageMax:8, themes:["想象力冒险","自然动物"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"美国国家图书奖", buy:"京东、当当、各大书店", desc:"一个女孩立志做三件事：去远方旅行、住在海边、让世界变得更美，是关于梦想和生命意义的绘本。", tags:["梦想","女性榜样","自然"] },
  { title:"逃家小兔", lang:"中译", author:"玛格丽特·怀兹·布朗", ageMin:1, ageMax:4, themes:["亲子情感","想象力冒险"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读"], awards:"美国经典绘本", buy:"京东、当当、各大书店", desc:"小兔说要逃走，妈妈说无论变成什么都会找到你，反复的追逐游戏让孩子感受到妈妈永远在。", tags:["分离焦虑","安全感","亲子情感"] },
  { title:"不一样的卡梅拉系列", lang:"中译", author:"克利斯提昂·约里波瓦", ageMin:3, ageMax:7, themes:["想象力冒险","友谊社交"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"法国最畅销儿童绘本之一", buy:"京东、当当、各大书店", desc:"小鸡卡梅拉充满好奇心不断探索，鼓励孩子做自己勇敢追梦，每本都有独立冒险故事。", tags:["独立性","勇气","冒险"] },
  { title:"月亮的味道", lang:"中译", author:"麦克·格雷涅茨", ageMin:3, ageMax:6, themes:["自然动物","友谊社交","想象力冒险"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读"], awards:"德国绘本奖", buy:"京东、当当、各大书店", desc:"动物们叠在一起去够月亮，终于尝到月亮的味道是甜的，充满诗意，读完让孩子对世界充满好奇。", tags:["合作","想象力","好奇心"] },
  { title:"大象艾玛", lang:"中译", author:"大卫·麦基", ageMin:3, ageMax:6, themes:["情绪管理","友谊社交"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"英国经典绘本", buy:"京东、当当", desc:"花格子大象想变成普通灰色大象，却发现大家喜欢的就是她的与众不同，是接纳自我的好绘本。", tags:["自我接纳","不一样","被嘲笑"] },
  { title:"小黑鱼", lang:"中译", author:"李欧·李奥尼", ageMin:3, ageMax:6, themes:["友谊社交","自然动物"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"凯迪克荣誉奖", buy:"京东、当当、各大书店", desc:"小黑鱼用智慧带领伙伴战胜大鱼，讲述团结合作的力量，拼贴画风格非常有艺术感。", tags:["合作","勇气","友谊"] },
  { title:"这不是我的帽子", lang:"中译", author:"乔·克拉森", ageMin:3, ageMax:6, themes:["情绪管理","自然动物"], style:"简洁明快", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"凯迪克金奖", buy:"京东、当当", desc:"小鱼偷了大鱼的帽子还嘴硬，文图之间充满悬疑感，孩子超爱猜结局，也在思考诚实和规则。", tags:["诚实","规则","幽默"] },
  { title:"团圆", lang:"中文", author:"余丽琼", ageMin:3, ageMax:7, themes:["传统文化","亲子情感"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读"], awards:"纽约时报年度最佳绘本、丰子恺儿童图画书奖", buy:"京东、当当、各大书店", desc:"爸爸春节回家，一枚硬币串起团圆的温情，是最有中国味的亲情绘本之一。", tags:["亲子情感","思念","传统节日"] },
  { title:"十二生肖的故事", lang:"中文", author:"余兆麟", ageMin:3, ageMax:7, themes:["传统文化"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读"], awards:"台湾金鼎奖", buy:"京东、当当", desc:"用故事解释十二生肖来历，融入大量中国传统元素，传统文化启蒙的经典绘本。", tags:["传统文化","节日","历史"] },
  { title:"神奇校车系列", lang:"中译", author:"乔安娜·柯尔", ageMin:4, ageMax:8, themes:["科学探索","想象力冒险"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"美国最受欢迎科普绘本系列", buy:"京东、当当、各大书店", desc:"魔法校车探索人体宇宙地球，科学知识融入冒险故事，科普启蒙必读系列。", tags:["科学","好奇心","探索"] },
  { title:"海底100层的家", lang:"中译", author:"岩井俊雄", ageMin:2, ageMax:6, themes:["自然动物","科学探索"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"日本畅销绘本", buy:"京东、当当、各大书店", desc:"竖向翻页从海面到海底探索100层不同海洋生物的家，画面超丰富，孩子能看很久找各种细节。", tags:["海洋","科学","探索"] },
  { title:"100层的家", lang:"中译", author:"岩井俊雄", ageMin:2, ageMax:6, themes:["自然动物","想象力冒险"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"日本畅销绘本", buy:"京东、当当、各大书店", desc:"竖向翻页大开本，从地面到100层每10层住着不同动物家庭，细节丰富百看不厌。", tags:["探索","细节","数字认知"] },
  { title:"小兔汤姆系列", lang:"中译", author:"多米尼克·德·圣马尔斯", ageMin:3, ageMax:6, themes:["生活习惯","情绪管理","友谊社交"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读"], awards:"法国最畅销幼儿绘本系列", buy:"京东、当当", desc:"小兔汤姆面对各种生活场景：嫉妒害怕撒谎，每本解决一个具体问题，贴近孩子真实生活。", tags:["生活习惯","情绪","社交","嫉妒"] },
  { title:"第一次上街买东西", lang:"中译", author:"筒井赖子", ageMin:3, ageMax:6, themes:["生活习惯","想象力冒险"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读"], awards:"日本畅销绘本", buy:"京东、当当、各大书店", desc:"小男孩第一次独自去买东西，紧张又勇敢，画面细腻温暖，鼓励孩子的独立和勇气。", tags:["独立性","勇气","胆小"] },
  { title:"图书馆狮子", lang:"中译", author:"蜜雪儿·努森", ageMin:3, ageMax:7, themes:["友谊社交","生活习惯"], style:"手绘温暖", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"美国图书馆协会推荐", buy:"京东、当当", desc:"一只狮子来图书馆努力遵守规则，温暖地探讨规则和善意之间的关系，也是阅读启蒙好绘本。", tags:["规则","阅读习惯","友谊"] },
  // 英文原版
  { title:"The Very Hungry Caterpillar", lang:"英文", author:"Eric Carle", ageMin:1, ageMax:4, themes:["自然动物","认知启蒙","科学探索"], style:"细节丰富", interactive:"洞洞书", reading:["亲子共读","孩子自主阅读"], awards:"International Andersen Award Illustrator", buy:"京东、当当、亚马逊", desc:"经典英文启蒙绘本，简单重复的英文句式非常适合语言入门，洞洞书形式孩子爱不释手。", tags:["不爱吃饭","认知","英文启蒙"] },
  { title:"Goodnight Moon", lang:"英文", author:"Margaret Wise Brown", ageMin:0, ageMax:3, themes:["生活习惯"], style:"简洁明快", interactive:"普通绘本", reading:["亲子共读"], awards:"American Library Association", buy:"京东、亚马逊、当当", desc:"英文睡前绘本经典，押韵文字朗朗上口，是英文启蒙和睡前仪式的双重神器。", tags:["不肯睡觉","英文启蒙","睡前"] },
  { title:"Where the Wild Things Are", lang:"英文", author:"Maurice Sendak", ageMin:3, ageMax:7, themes:["想象力冒险","情绪管理"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"Caldecott Medal", buy:"京东、亚马逊", desc:"凯迪克金奖英文原版，语言简练有力，是学习情绪表达英文词汇的好素材。", tags:["情绪","想象力","发脾气"] },
  { title:"The Gruffalo", lang:"英文", author:"Julia Donaldson", ageMin:2, ageMax:6, themes:["自然动物","想象力冒险"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"Smarties Prize Gold Award", buy:"亚马逊、京东", desc:"押韵文字极度上口，小老鼠用机智战胜森林里的动物，英文启蒙必读经典，读几遍孩子就能背诵。", tags:["英文启蒙","勇气","幽默"] },
  { title:"Dragons Love Tacos", lang:"英文", author:"Adam Rubin", ageMin:3, ageMax:6, themes:["想象力冒险","自然动物"], style:"细节丰富", interactive:"普通绘本", reading:["亲子共读"], awards:"New York Times Bestseller", buy:"亚马逊、京东", desc:"龙最爱吃墨西哥玉米卷！幽默荒诞，英文词汇生动有趣，孩子超爱反复听。", tags:["幽默","英文启蒙","想象力"] },
  { title:"Elephant and Piggie Series", lang:"英文", author:"Mo Willems", ageMin:3, ageMax:7, themes:["友谊社交","情绪管理"], style:"简洁明快", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"Theodor Seuss Geisel Award", buy:"亚马逊、京东", desc:"对话式英文简单到孩子可以自主阅读，大象和小猪的友谊故事同时帮助孩子理解社交和情绪。", tags:["英文启蒙","友谊","情绪"] },
  { title:"Pete the Cat Series", lang:"英文", author:"James Dean", ageMin:3, ageMax:6, themes:["情绪管理","生活习惯"], style:"简洁明快", interactive:"普通绘本", reading:["亲子共读","孩子自主阅读"], awards:"New York Times Bestseller", buy:"亚马逊、京东", desc:"酷猫皮特遇到各种麻烦都说It's all good，重复句式超适合英文启蒙，同时培养乐观心态。", tags:["情绪管理","英文启蒙","乐观"] },
  { title:"Brown Bear Brown Bear What Do You See", lang:"英文", author:"Bill Martin Jr.", ageMin:0, ageMax:3, themes:["自然动物","认知启蒙"], style:"简洁明快", interactive:"普通绘本", reading:["亲子共读"], awards:"American Library Classic", buy:"京东、亚马逊、当当", desc:"重复句式是英文启蒙的完美入门，读几遍孩子就会跟着说，颜色和动物认知同步进行。", tags:["英文启蒙","语言发育","认知"] },
];

const AGE_RANGES = {
  "0-1岁":[0,1], "1-2岁":[1,2], "2-3岁":[2,3],
  "3-4岁":[3,4], "4-6岁":[4,6], "6岁以上":[6,12],
};

function scoreBook(book, sel) {
  let score = 0;
  if (sel.age) {
    const [lo, hi] = AGE_RANGES[sel.age] || [0,12];
    if (Math.min(book.ageMax, hi) - Math.max(book.ageMin, lo) < 0) return -1;
    score += 10;
  }
  if (sel.concern.trim()) {
    const kws = sel.concern.split(/\s+/).filter(w => w.length >= 2);
    const hit = kws.some(kw =>
      (book.tags||[]).some(t => t.includes(kw) || kw.includes(t)) ||
      book.desc.includes(kw) || book.title.includes(kw)
    );
    if (hit) score += 25;
  }
  if (sel.themes.length) score += sel.themes.filter(t => book.themes.includes(t)).length * 8;
  if (sel.style && sel.style !== "都可以") { if (book.style === sel.style) score += 5; } else score += 2;
  if (sel.interactive && sel.interactive !== "都可以") { if (book.interactive === sel.interactive) score += 5; } else score += 2;
  if (sel.reading && sel.reading !== "两者都有") { if (book.reading.includes(sel.reading)) score += 3; } else score += 2;
  return score;
}

function recommend(sel) {
  return BOOKS
    .map(book => ({ book, score: scoreBook(book, sel) }))
    .filter(({ book, score }) => {
      if (score <= 0) return false;
      if (sel.lang === "中文" && book.lang === "英文") return false;
      if (sel.lang === "英文" && book.lang !== "英文") return false;
      if (sel.themes.length > 0 && !sel.themes.some(t => book.themes.includes(t))) return false;
      return true;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ book }) => book);
}

// ── UI helpers ──────────────────────────────────────────
function Btn({ emoji, label, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      border: `1.5px solid ${selected ? C.brown : C.border}`,
      background: selected ? C.brown : C.cream,
      borderRadius: 50, padding: "9px 17px", fontSize: 13,
      color: selected ? C.warm : C.inkL, cursor: "pointer",
      display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit",
      whiteSpace: "nowrap", boxShadow: selected ? "0 3px 10px rgba(92,61,46,0.22)" : "none",
    }}>
      {emoji && <span style={{ fontSize: 15 }}>{emoji}</span>}{label}
    </button>
  );
}

function Tag({ children, type }) {
  const s = {
    age: { background: C.peachL, color: C.rose },
    theme: { background: "#e8f0e4", color: C.sage },
    style: { background: "#f0ece4", color: C.brownL },
    award: { background: C.goldBg, color: C.gold },
  };
  return (
    <span style={{ fontSize: 11, padding: "4px 11px", borderRadius: 50, fontWeight: 500, ...(s[type]||s.theme) }}>
      {children}
    </span>
  );
}

function BookCover({ title, ageMin, ageMax }) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    fetch("https://openlibrary.org/search.json?title=" + encodeURIComponent(title) + "&limit=1&fields=cover_i")
      .then(r => r.json())
      .then(d => { const id = d?.docs?.[0]?.cover_i; if (id) setUrl("https://covers.openlibrary.org/b/id/" + id + "-M.jpg"); })
      .catch(() => {});
  }, [title]);
  return (
    <div style={{ width: 80, flexShrink: 0, height: 108, borderRadius: 10, overflow: "hidden", background: C.cream, border: "1.5px solid " + C.border, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "2px 3px 10px rgba(92,61,46,0.1)" }}>
      {url
        ? <img src={url} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setUrl(null)} />
        : <div style={{ textAlign: "center", padding: 6 }}>
            <div style={{ fontSize: 20, marginBottom: 3 }}>📚</div>
            <div style={{ fontSize: 8, color: C.brownP, lineHeight: 1.3 }}>{title.slice(0, 6)}</div>
          </div>
      }
    </div>
  );
}

function BookCard({ book, i }) {
  return (
    <div style={{ background: C.warm, borderRadius: 20, padding: 22, marginBottom: 18, border: "1.5px solid " + C.border, boxShadow: "0 4px 20px rgba(92,61,46,0.06)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "linear-gradient(180deg," + C.peach + "," + C.sageL + ")", borderRadius: "4px 0 0 4px" }} />
      <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
        <BookCover title={book.title} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ position: "absolute", top: 18, right: 18, fontSize: 26, fontFamily: "Georgia,serif", fontWeight: 700, color: C.border }}>0{i+1}</div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 700, color: C.brown, marginBottom: 3, paddingRight: 32, lineHeight: 1.3 }}>{book.title}</div>
          <div style={{ fontSize: 12, color: C.brownP, marginBottom: 10 }}>{book.author}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <Tag type="age">📅 {book.ageMin}–{book.ageMax}岁</Tag>
            {book.themes.map((t, j) => <Tag key={j} type="theme">{t}</Tag>)}
            {book.awards && <Tag type="award">🏆 {book.awards.slice(0, 10)}</Tag>}
          </div>
        </div>
      </div>
      <div style={{ fontSize: 13.5, lineHeight: 1.85, color: C.inkL, marginBottom: 16 }}>{book.desc}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, paddingTop: 14, borderTop: "1px solid " + C.border }}>
        {[["🎪","互动性",book.interactive],["📖","阅读方式",book.reading.join(" / ")],["🛒","购买渠道",book.buy],["🏆","权威背书",book.awards||"暂无"]].map(([icon,label,val]) => (
          <div key={label} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{icon}</span>
            <div>
              <div style={{ fontSize: 10, color: C.brownP, marginBottom: 1 }}>{label}</div>
              <div style={{ fontSize: 12, color: C.inkL, lineHeight: 1.4 }}>{val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 书名查询 ─────────────────────────────────────────────
function BookLookup() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState([]);
  const [searched, setSearched] = useState(false);

  function lookup() {
    if (!input.trim()) return;
    const titles = input.split(/[,,\n\u3001]+/).map(s => s.trim()).filter(Boolean);
    const found = [];
    const missing = [];
    titles.forEach(title => {
      const book = BOOKS.find(b => b.title.includes(title) || title.includes(b.title));
      if (book) {
        found.push({ title: book.title, author: book.author, age: book.ageMin + "–" + book.ageMax + "岁", theme: book.themes.join("、"), desc: book.desc, awards: book.awards, buy: book.buy });
      } else {
        missing.push(title);
      }
    });
    setResults(found);
    setNotFound(missing);
    setSearched(true);
  }

  return (
    <div style={{ background: C.warm, borderRadius: 20, padding: 26, marginTop: 32, border: "1.5px solid " + C.border, boxShadow: "0 4px 20px rgba(92,61,46,0.06)" }}>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2, color: C.brownP, marginBottom: 5 }}>新功能 ✦</div>
      <div style={{ fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 600, color: C.brown, marginBottom: 8 }}>🔍 输入书名，快速了解这本书</div>
      <p style={{ fontSize: 12, color: C.brownP, marginBottom: 16, lineHeight: 1.7 }}>在小红书看到书单？把书名输进来，一次查多本，用逗号或换行分隔</p>
      <textarea value={input} onChange={e => { setInput(e.target.value); setSearched(false); }}
        placeholder={"例如：\n好饿的毛毛虫\n野兽国\n我的情绪小怪兽"} rows={4}
        style={{ width: "100%", border: "1.5px solid " + C.border, borderRadius: 12, padding: "12px 14px", fontSize: 13, fontFamily: "inherit", color: C.ink, background: C.cream, resize: "vertical", outline: "none", lineHeight: 1.7, boxSizing: "border-box", marginBottom: 14 }} />
      <div style={{ textAlign: "center" }}>
        <button onClick={lookup} style={{ background: C.brown, color: C.warm, border: "none", borderRadius: 50, padding: "12px 36px", fontSize: 14, fontFamily: "Georgia,serif", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 16px rgba(92,61,46,0.22)" }}>
          ✦ 查一查 ✦
        </button>
      </div>
      {searched && (
        <div style={{ marginTop: 20 }}>
          {results.map((b, i) => (
            <div key={i} style={{ padding: "16px 18px", marginBottom: 12, borderRadius: 14, border: "1.5px solid " + C.border, background: C.cream, borderLeft: "4px solid " + C.sage }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 15, fontWeight: 700, color: C.brown }}>{b.title}</div>
                <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 50, fontWeight: 500, flexShrink: 0, marginLeft: 8, background: "#e8f0e4", color: C.sage }}>✓ 收录</span>
              </div>
              <div style={{ fontSize: 11, color: C.brownP, marginBottom: 8 }}>{b.author} · {b.age} · {b.theme}</div>
              <div style={{ fontSize: 13, color: C.inkL, marginBottom: 6, lineHeight: 1.7 }}>{b.desc}</div>
              {b.awards && <div style={{ fontSize: 12, color: C.brownL }}>🏆 {b.awards}</div>}
              <div style={{ fontSize: 11, color: C.brownP, marginTop: 4 }}>🛒 {b.buy}</div>
            </div>
          ))}
          {notFound.length > 0 && (
            <div style={{ padding: "14px 18px", borderRadius: 14, border: "1.5px solid " + C.border, background: C.cream, borderLeft: "4px solid " + C.brownP }}>
              <div style={{ fontSize: 13, color: C.brownL, marginBottom: 6 }}>以下书目暂未收录，后续会持续更新 📚</div>
              {notFound.map((t, i) => <div key={i} style={{ fontSize: 12, color: C.brownP, marginBottom: 2 }}>· {t}</div>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── 选项常量 ─────────────────────────────────────────────
const AGE_OPTS = [
  { emoji:"🐣", label:"0–1 岁", value:"0-1岁" }, { emoji:"🐥", label:"1–2 岁", value:"1-2岁" },
  { emoji:"🐰", label:"2–3 岁", value:"2-3岁" }, { emoji:"🦊", label:"3–4 岁", value:"3-4岁" },
  { emoji:"🦁", label:"4–6 岁", value:"4-6岁" }, { emoji:"🦉", label:"6岁以上", value:"6岁以上" },
];
const THEME_OPTS = [
  { emoji:"🚗", label:"交通工具", value:"交通工具" }, { emoji:"🐘", label:"自然动物", value:"自然动物" },
  { emoji:"🌈", label:"情绪管理", value:"情绪管理" }, { emoji:"🤝", label:"友谊社交", value:"友谊社交" },
  { emoji:"🏫", label:"入园适应", value:"入园适应" }, { emoji:"👶", label:"二胎家庭", value:"二胎家庭" },
  { emoji:"🚀", label:"想象力冒险", value:"想象力冒险" }, { emoji:"🪥", label:"生活习惯", value:"生活习惯" },
  { emoji:"🔬", label:"科学探索", value:"科学探索" }, { emoji:"🏮", label:"传统文化", value:"传统文化" },
];
const STYLE_OPTS = [
  { emoji:"◻️", label:"简洁明快", value:"简洁明快" }, { emoji:"🎨", label:"细节丰富", value:"细节丰富" },
  { emoji:"✏️", label:"手绘温暖", value:"手绘温暖" }, { emoji:"🎠", label:"都可以", value:"都可以" },
];
const INTER_OPTS = [
  { emoji:"📖", label:"普通绘本", value:"普通绘本" }, { emoji:"🎪", label:"机关互动书", value:"机关互动书" },
  { emoji:"🔍", label:"翻翻书", value:"翻翻书" }, { emoji:"🕳️", label:"洞洞书", value:"洞洞书" },
  { emoji:"✨", label:"都可以", value:"都可以" },
];
const READ_OPTS = [
  { emoji:"🫶", label:"亲子共读", value:"亲子共读" },
  { emoji:"🧒", label:"孩子自主阅读", value:"孩子自主阅读" },
  { emoji:"💫", label:"两者都有", value:"两者都有" },
];
const LANG_OPTS = [
  { emoji:"🇨🇳", label:"中文", value:"中文" },
  { emoji:"🇬🇧", label:"英文原版", value:"英文" },
  { emoji:"✨", label:"都可以", value:"全部" },
];

// ── App ──────────────────────────────────────────────────
export default function App() {
  const [age, setAge] = useState(null);
  const [themes, setThemes] = useState([]);
  const [style, setStyle] = useState(null);
  const [interactive, setInteractive] = useState(null);
  const [reading, setReading] = useState(null);
  const [lang, setLang] = useState("全部");
  const [concern, setConcern] = useState("");
  const [phase, setPhase] = useState("form");
  const [books, setBooks] = useState([]);

  const toggleTheme = v => setThemes(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  function submit() {
    if (!age) return alert("请选择宝贝的年龄 😊");
    if (!themes.length && !concern.trim()) return alert("请选择主题，或填写育儿困惑 😊");
    setBooks(recommend({ age, themes, style: style||"都可以", interactive: interactive||"都可以", reading: reading||"两者都有", lang: lang||"全部", concern }));
    setPhase("results");
  }

  function restart() {
    setAge(null); setThemes([]); setStyle(null); setInteractive(null);
    setReading(null); setLang("全部"); setConcern(""); setBooks([]); setPhase("form");
  }

  const card = { background: C.warm, borderRadius: 20, padding: "26px 26px 30px", marginBottom: 18, border: "1.5px solid " + C.border, boxShadow: "0 4px 20px rgba(92,61,46,0.06)" };
  const stepLabel = { fontSize: 11, fontWeight: 500, letterSpacing: 2, color: C.brownP, marginBottom: 5 };
  const stepQ = { fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 600, color: C.brown, marginBottom: 18 };
  const opts = { display: "flex", flexWrap: "wrap", gap: 9 };

  return (
    <div style={{ background: C.cream, minHeight: "100vh", fontFamily: "'PingFang SC','Noto Sans SC',sans-serif", color: C.ink }}>
      <div style={{ textAlign: "center", padding: "48px 24px 24px" }}>
        <div style={{ fontSize: 26, letterSpacing: 8, color: C.brownP, marginBottom: 10 }}>📖 ✦ 🌿</div>
        <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(24px,5vw,36px)", fontWeight: 700, color: C.brown, letterSpacing: 2, marginBottom: 8 }}>绘本小屋</h1>
        <p style={{ fontSize: 13, color: C.brownL, letterSpacing: 1 }}>找到最适合你家宝贝的那一本</p>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg,transparent," + C.brownP + ",transparent)", margin: "18px auto" }} />
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px 80px" }}>
        {phase === "form" && <>
          <div style={card}>
            <div style={stepLabel}>育儿困惑（选填）</div>
            <div style={{ ...stepQ, marginBottom: 10 }}>最近有什么让你头疼的育儿问题？</div>
            <p style={{ fontSize: 12, color: C.brownP, marginBottom: 12 }}>比如「孩子不爱刷牙」「老是发脾气」「不想上幼儿园」——用绘本悄悄帮你解决</p>
            <textarea value={concern} onChange={e => setConcern(e.target.value)} placeholder="直接说就好，越具体越好…" rows={3}
              style={{ width: "100%", border: "1.5px solid " + C.border, borderRadius: 12, padding: "12px 14px", fontSize: 13, fontFamily: "inherit", color: C.ink, background: C.cream, resize: "vertical", outline: "none", lineHeight: 1.7, boxSizing: "border-box" }} />
          </div>

          <div style={card}>
            <div style={stepLabel}>STEP 01</div>
            <div style={stepQ}>宝贝现在几岁？</div>
            <div style={opts}>{AGE_OPTS.map(o => <Btn key={o.value} emoji={o.emoji} label={o.label} selected={age===o.value} onClick={() => setAge(o.value)} />)}</div>
          </div>

          <div style={card}>
            <div style={stepLabel}>STEP 02</div>
            <div style={{ ...stepQ, marginBottom: 6 }}>想要什么主题？</div>
            <div style={{ fontSize: 11, color: C.brownP, marginBottom: 14 }}>可多选，也可以不选（填了困惑就够了）</div>
            <div style={opts}>{THEME_OPTS.map(o => <Btn key={o.value} emoji={o.emoji} label={o.label} selected={themes.includes(o.value)} onClick={() => toggleTheme(o.value)} />)}</div>
          </div>

          <div style={card}>
            <div style={stepLabel}>STEP 03</div>
            <div style={stepQ}>喜欢什么画风？</div>
            <div style={opts}>{STYLE_OPTS.map(o => <Btn key={o.value} emoji={o.emoji} label={o.label} selected={style===o.value} onClick={() => setStyle(o.value)} />)}</div>
          </div>

          <div style={card}>
            <div style={stepLabel}>STEP 04</div>
            <div style={stepQ}>对互动性有要求吗？</div>
            <div style={opts}>{INTER_OPTS.map(o => <Btn key={o.value} emoji={o.emoji} label={o.label} selected={interactive===o.value} onClick={() => setInteractive(o.value)} />)}</div>
          </div>

          <div style={card}>
            <div style={stepLabel}>STEP 05</div>
            <div style={stepQ}>主要的阅读方式？</div>
            <div style={opts}>{READ_OPTS.map(o => <Btn key={o.value} emoji={o.emoji} label={o.label} selected={reading===o.value} onClick={() => setReading(o.value)} />)}</div>
          </div>

          <div style={card}>
            <div style={stepLabel}>STEP 06</div>
            <div style={{ ...stepQ, marginBottom: 6 }}>中文还是英文绘本？</div>
            <div style={{ fontSize: 11, color: C.brownP, marginBottom: 14 }}>英文原版适合有英语启蒙需求的家庭</div>
            <div style={opts}>{LANG_OPTS.map(o => <Btn key={o.value} emoji={o.emoji} label={o.label} selected={lang===o.value} onClick={() => setLang(o.value)} />)}</div>
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={submit} style={{ background: C.brown, color: C.warm, border: "none", borderRadius: 50, padding: "16px 48px", fontSize: 16, fontFamily: "Georgia,serif", fontWeight: 600, letterSpacing: 2, cursor: "pointer", boxShadow: "0 6px 24px rgba(92,61,46,0.25)" }}>
              ✦ 帮我找绘本 ✦
            </button>
          </div>
        </>}

        {phase === "results" && <>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 22, color: C.brown, marginBottom: 6 }}>为你精选了这几本 📚</h2>
            <p style={{ fontSize: 13, color: C.brownL }}>少而精，踩雷风险小</p>
          </div>
          {books.length === 0 && (
            <div style={{ textAlign: "center", padding: 40, color: C.brownL, fontSize: 14 }}>
              暂时没有完全匹配的绘本，试试调整筛选条件 😊
            </div>
          )}
          {books.map((book, i) => <BookCard key={i} book={book} i={i} />)}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={restart} style={{ background: "transparent", border: "1.5px solid " + C.brownP, color: C.brownL, borderRadius: 50, padding: "12px 36px", fontSize: 14, fontFamily: "inherit", cursor: "pointer", letterSpacing: 1 }}>
              ↩ 重新选择
            </button>
          </div>
        </>}

        <BookLookup />

        <div style={{ textAlign: "center", fontSize: 11, color: C.brownP, marginTop: 48, letterSpacing: 0.5 }}>
          精选 {BOOKS.length} 本 · 有口碑有奖项 · 踩雷风险小
        </div>
      </div>
    </div>
  );
}
