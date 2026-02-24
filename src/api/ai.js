import axios from 'axios';

const AI_API_URL = 'https://dev.wenivops.co.kr/services/openai-api';

export const generateProductInfo = async (imageDataUrl) => {
  const userContent = imageDataUrl
    ? [
        {
          type: 'text',
          text: '이 상품 이미지를 보고 감귤마켓 쇼핑몰에 올릴 상품명과 설명을 다음 형식으로만 작성해주세요:\n상품명: [2~15자]\n설명: [2~3문장]',
        },
        {
          type: 'image_url',
          image_url: { url: imageDataUrl },
        },
      ]
    : '감귤마켓 쇼핑몰에 올릴 상품명과 설명을 다음 형식으로만 작성해주세요:\n상품명: [2~15자]\n설명: [2~3문장]';

  const messages = [
    {
      role: 'system',
      content: '당신은 온라인 쇼핑몰 상품 등록 전문가입니다. 상품명은 반드시 2~15자 이내로 작성하세요.',
    },
    {
      role: 'user',
      content: userContent,
    },
  ];

  const response = await axios.post(AI_API_URL, messages);
  return response.data.choices[0].message.content;
};

export const parseProductInfo = (text) => {
  const nameMatch = text.match(/상품명\s*:\s*(.+)/);
  const descMatch = text.match(/설명\s*:\s*([\s\S]+)/);

  const rawName = nameMatch ? nameMatch[1].trim() : '';
  const description = descMatch ? descMatch[1].trim() : text.trim();

  // 15자 초과 시 15자로 잘라냄
  const itemName = rawName.length > 15 ? rawName.slice(0, 15) : rawName;

  return { itemName, description };
};
