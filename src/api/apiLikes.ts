const STORAGE_KEY = "liked_product_ids";

// Функция чтения значений из localStorage по ключу "liked_product_ids"
export function read(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    const nums = Array.isArray(arr)
      ? arr.map((x: any) => Number(x)).filter(Number.isFinite)
      : [];
    // миграция: перезапись в числовом виде
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nums));
    return nums;
  } catch (error) {
    return [];
  }
}

// Сохраняем id продукта в localStorage по ключу "liked_product_ids"
export function write(ids: number[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.map(Number)));
}

// Функция получения всех лайков из ocalStorage по ключу "liked_product_ids"
export async function getLikedIds(): Promise<number[]> {
  return Promise.resolve(read()); // [1,2,3,4..]
}

export async function setLiked(id: number, liked: boolean): Promise<number[]> {
  const current = read();
  const next = liked
    ? // если лайк стоял и пользователь поставил заново, убираем дуюликаты
      Array.from(new Set([...current, id])) // если хотим поставить лайк
    : // делаем так, чтобы этого id не было независимо от того, был он там до вызова или нет.
      current.filter((x) => x !== id); // если хотим убрать лайк

  write(next);
  return Promise.resolve(next);
}
