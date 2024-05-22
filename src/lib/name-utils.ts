// Regex to check if the string contains Kanji, Hiragana, or Katakana characters
const kanjiRegex = /^[\u4E00-\u9FFF\s]+$/;
const hiraganaRegex = /^[\u3041-\u3096\u309D-\u309F\s]+$/;
const katakanaRegex = /^[\u30A1-\u30FA\u30FD-\u30FF\uFF66-\uFF9F\s]+$/;

export function isJapaneseName(name: string): boolean {
  return (
    kanjiRegex.test(name) ||
    hiraganaRegex.test(name) ||
    katakanaRegex.test(name)
  );
}

export function getInitials(name: string): string {
  if (isJapaneseName(name)) {
    return getJapaneseInitials(name);
  } else {
    return getEnglishInitials(name);
  }
}

function getJapaneseInitials(name: string): string {
  if (kanjiRegex.test(name)) {
    const parts = name.split(/\s/);
    if (parts.length > 1) {
      return parts[0];
    } else {
      return name.slice(0, 2);
    }
  } else if (hiraganaRegex.test(name) || katakanaRegex.test(name)) {
    const parts = name.split(/\s/);
    if (parts.length > 1) {
      return parts[0];
    } else {
      return name;
    }
  }
  return ""; // Default if name doesn't fit expected pattern
}

function getEnglishInitials(name: string): string {
  const parts = name.split(" ");
  if (parts.length === 2) {
    const [givenName, familyName] = parts;
    return `${givenName[0]}${familyName[0]}`;
  } else if (parts.length === 1) {
    // Single part name, just take the first character
    return parts[0][0];
  }
  return ""; // Default if name doesn't fit expected pattern
}
