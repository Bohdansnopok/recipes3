export const addRecipe = async (formData: FormData, token: string) => {
  try {
    
    const res = await fetch('https://recipe-yt.onrender.com/api/recipes', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const responseText = await res.text();
    console.log('🔍 Відповідь від сервера:', res.status, responseText);

    if (!res.ok) throw new Error('Не получилось добавить');
    return JSON.parse(responseText);
  } catch (error) {
    console.error('ошибка:', error.message);
    throw error;
  }
}