export const STORAGE_KEY='asd-progress';
export function loadProgress(){ try{const raw=localStorage.getItem(STORAGE_KEY);return raw?JSON.parse(raw):{communication:0,emotions:0,social:0};}catch{return{communication:0,emotions:0,social:0};} }
export function saveProgress(p){ try{localStorage.setItem(STORAGE_KEY,JSON.stringify(p));}catch{} }
