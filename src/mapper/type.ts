const TYPEMAP = new Map<string, string>([
    ['SOCIAL_MEDIA', "💏"],
    ['WEB_TOOL', "🦾"],
    ['BANK_APPLICATION', "🤑"],
    ['CARD', "🗃️"],
    ['SHOPPING_APPLICATION', "🛍️"],
    ['GAME', '🎮'],
    ['OTHERS', '🛸']
]);
export function typeMap(type : string | undefined) {
    if (typeof(type) == "string")
        return TYPEMAP.get(type);
    else return null;
}