export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { mode } = req.body;

  // ── 模式一：育儿困惑智能标签匹配 ──────────────────────────
  if (mode === 'match') {
    const { concern, age } = req.body;
    if (!concern) return res.status(400).json({ error: '请填写育儿困惑' });

    const ALL_TAGS = [
      "情绪管理","发脾气","入睡困难","睡前","生活习惯","入园适应","分离焦虑","独立自主",
      "二胎家庭","嫉妒","友谊","分享","社交","霸凌","专注力","认知启蒙","语言表达",
      "数学思维","创意","艺术","科学","自然","动物","交通工具","传统文化","亲子情感",
      "安全感","自信","勇气","挫折","坚持","规则","卫生","刷牙","吃饭","挑食","如厕",
      "生命教育","死亡","感恩","善意","同理心","多元","性别","身体认知","安全意识",
      "想象力","冒险","读书","英文","低幼","婴儿","男孩","女孩"
    ];

    const prompt = `你是一个绘本推荐系统的标签提取器。

用户的育儿困惑：「${concern}」
孩子年龄段：${age || '未知'}

请从以下标签库中，选出最匹配这个育儿困惑的5-10个标签，按相关度从高到低排列。
标签库：${ALL_TAGS.join('、')}

只返回JSON数组，不要任何其他文字：["标签1","标签2","标签3",...]`;

    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 200,
          temperature: 0.3
        })
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || '';
      const matchArr = text.match(/\[[\s\S]*\]/);
      if (!matchArr) throw new Error('解析失败');
      const tags = JSON.parse(matchArr[0]);
      return res.status(200).json({ tags });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // ── 模式二：AI生成专属绘本 ────────────────────────────────
  const { name, concern, style, lang, level } = req.body;
  if (!concern) return res.status(400).json({ error: '请填写育儿困惑或故事主题' });

  const heroName = name || '小宝';
  const isEn = lang === 'en';

  const prompt = isEn
    ? `Create a 6-page picture book for a child named "${heroName}". 
Story theme/concern: "${concern}"
Art style: ${style}
Reading level: ${level}

Requirements:
- Each page has a scene description (for illustration) and story text
- Story text matches the reading level
- The story should naturally and gently address the concern
- Warm, encouraging tone

Return ONLY valid JSON:
{"title":"book title","pages":[{"scene":"illustration 1-2 sentences","text":"story 2-3 sentences"},{"scene":"...","text":"..."},{"scene":"...","text":"..."},{"scene":"...","text":"..."},{"scene":"...","text":"..."},{"scene":"...","text":"..."}]}`
    : `请为一个叫「${heroName}」的孩子创作一本6页原创绘本。

故事主题或育儿困惑：「${concern}」
画风：${style}，难度：${level}

要求：故事自然温暖地帮助解决育儿困惑，不要说教，结局积极，主角用「${heroName}」。

只返回有效JSON：
{"title":"绘本标题","pages":[{"scene":"画面描述1-2句","text":"故事文字2-3句"},{"scene":"...","text":"..."},{"scene":"...","text":"..."},{"scene":"...","text":"..."},{"scene":"...","text":"..."},{"scene":"...","text":"..."}]}`;

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是一位专业的儿童绘本作家。只返回JSON格式，不返回任何其他文字。' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
        temperature: 0.85
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`DeepSeek API error: ${response.status} ${err}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    const matchObj = text.match(/\{[\s\S]*\}/);
    if (!matchObj) throw new Error('返回格式异常，请重试');

    const book = JSON.parse(matchObj[0]);
    if (!book.title || !book.pages?.length) throw new Error('绘本内容不完整，请重试');

    res.status(200).json(book);
  } catch (e) {
    res.status(500).json({ error: e.message || '生成失败，请重试' });
  }
}
