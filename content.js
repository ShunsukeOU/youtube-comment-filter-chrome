const DEFAULT_WORDS = ["ゴミ", "カス", "死ね", "クズ", "クソ", "バカ", "アホ", "低能", "無能", "キモい", "ウザい", "しね", "消えろ", "出てけ", "最低", "最悪", "ふざけんな", "ブス", "デブ","殺す", "滅べ", "腐れ", "役立たず", "ドン引き", "ありえない", "やめろ", "つまらん", "ダサい"];//デフォルトで除外するワード、必要に応じて追加可能

let state = {
  extensionEnabled: true,
  langFilterEnabled: true,
  disabledDefaultWords: [],
  customWords: []
};

//起動時に設定を読み込んでフィルタリング開始
chrome.storage.local.get(state, (res) => {
  state = res;
  reEvaluateComments();//すでに読み込まれているコメントを評価
});

//ポップアップから設定が変更されたら即座に反映する
chrome.storage.onChanged.addListener((changes) => {
  for (let key in changes) {
    state[key] = changes[key].newValue;
  }
  reEvaluateComments();//設定が変わったので全て再評価
});

function isJapanese(text) {
  return /[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FAF]/.test(text);
}

//すべてのコメントのチェック済みマークを外して最初から判定をやり直す関数
function reEvaluateComments() {
  const checkedComments = document.querySelectorAll('ytd-comment-thread-renderer.checked');
  checkedComments.forEach(comment => comment.classList.remove('checked'));
  filterComments();
}

//フィルタリング処理
function filterComments() {
  const comments = document.querySelectorAll('ytd-comment-thread-renderer:not(.checked)');

  const activeDefaultWords = DEFAULT_WORDS.filter(w => !state.disabledDefaultWords.includes(w));
  const activeFilterWords = [...activeDefaultWords, ...state.customWords];//デフォルトのキーワードにカスタムキーワードを追加

  comments.forEach(comment => {
    comment.classList.add('checked');
    const textElement = comment.querySelector('#content-text');
    
    if (textElement) {
      const text = textElement.innerText;
      let shouldHide = false;
      
      if (state.extensionEnabled) {
        if (state.langFilterEnabled && !isJapanese(text)) {
          shouldHide = true;
        }
        
        if (!shouldHide && activeFilterWords.some(word => text.includes(word))) {
          shouldHide = true;
        }
      }

      if (shouldHide) {
        comment.style.display = 'none';
      } else {
        comment.style.display = '';
      }
    }
  });
}
const observer = new MutationObserver(filterComments);
observer.observe(document.body, { childList: true, subtree: true });