export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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
- Story text matches the reading level: beginner=very simple words, elementary=simple sentences, intermediate=fuller sentences
- The story should naturally and gently address the concern
- Warm, encouraging tone

Return ONLY valid JSON, no other text:
{"title":"book title","pages":[{"scene":"illustration description 1-2 sentences","text":"story text 2-3 sentences"},{"scene":"...","text":"..."},{"scene":"...","text":"..."},{"scene":"...","text":"..."},{"scene":"...","text":"..."},{"scene":"...","text":"..."}]}`
    : `请为一个叫「${heroName}」的孩子创作一本6页原创绘本。

故事主题或育儿困惑：「${concern}」
画风：${style}
难度：${level}

要求：
- 每页有画面描述（给插画师看的）和故事文字（给孩子读的）
- 故事文字根据难度调整：0-2岁=超简单词汇、短句；2-4岁=简单句子、重复句式；4-6岁=完整句子、有逻辑
- 故事要自然温暖地帮助解决育儿困惑，不要说教
- 结局要正面积极，让孩子有成就感
- 主角名字用「${heroName}」

只返回有效JSON，不要其他任何文字：
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
          { role: 'system', content: '你是一位专业的儿童绘本作家，擅长创作温暖、有教育意义的原创绘本故事。你只返回JSON格式的内容，不返回任何其他文字。' },
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
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('返回格式异常，请重试');

    const book = JSON.parse(match[0]);
    if (!book.title || !book.pages?.length) throw new Error('绘本内容不完整，请重试');

    res.status(200).json(book);
  } catch (e) {
    res.status(500).json({ error: e.message || '生成失败，请重试' });
  }
}
