// =============================
// APIキー管理
// =============================
window.onload = () => {
  const saved = localStorage.getItem('gemini_api_key');
  if (saved) {
    document.getElementById('apiKeyInput').value = saved;
  }
};

function saveApiKey() {
  const key = document.getElementById('apiKeyInput').value.trim();
  if (!key) { alert('APIキーを入力してください'); return; }
  localStorage.setItem('gemini_api_key', key);
  alert('APIキーを保存しました！');
}

function clearApiKey() {
  localStorage.removeItem('gemini_api_key');
  document.getElementById('apiKeyInput').value = '';
  alert('APIキーをリセットしました');
}

function copyText(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('コピーしました！');
  });
}

// =============================
// メイン処理
// =============================
async function run() {
  const apiKey = localStorage.getItem('gemini_api_key');
  const audioFile = document.getElementById('audioFile').files[0];
  const lectureName = document.getElementById('lectureName').value.trim();

  // バリデーション
  if (!apiKey) { alert('APIキーを入力・保存してください'); return; }
  if (!audioFile) { alert('音声ファイルを選択してください'); return; }

  setStatus('⏳ 音声を読み込み中...');
  disableBtn(true);

  try {
    // 音声をBase64に変換
    const base64Audio = await toBase64(audioFile);
    const mimeType = audioFile.type || 'audio/mp4';

    // ===== STEP1: 文字起こし =====
    setStatus('⏳ 文字起こし中... (少し時間がかかります)');

    const transcriptRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                inline_data: {
                  mime_type: mimeType,
                  data: base64Audio
                }
              },
              {
                text: `この音声を日本語で文字起こししてください。話し言葉のままで構いません。講義名：${lectureName || '不明'}`
              }
            ]
          }]
        })
      }
    );

    const transcriptData = await transcriptRes.json();

    if (!transcriptRes.ok) {
      throw new Error(JSON.stringify(transcriptData));
    }

    const transcript = transcriptData.candidates[0].content.parts[0].text;

    // 文字起こし表示
    document.getElementById('transcriptResult').innerText = transcript;
    document.getElementById('transcriptCard').style.display = 'block';

    // ===== STEP2: 要約 =====
    setStatus('⏳ 要約中...');

    const summaryRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `以下の講義の文字起こしを元に、
①3行以内の要約
②要点（箇条書き3〜5個）
を日本語で作成してください。

【文字起こし】
${transcript}`
            }]
          }]
        })
      }
    );

    const summaryData = await summaryRes.json();

    if (!summaryRes.ok) {
      throw new Error(JSON.stringify(summaryData));
    }

    const summary = summaryData.candidates[0].content.parts[0].text;

    // 要約表示
    document.getElementById('summaryResult').innerText = summary;
    document.getElementById('summaryCard').style.display = 'block';

    setStatus('✅ 完了！');

  } catch (err) {
    setStatus('❌ エラーが発生しました：' + err.message);
    console.error(err);
  } finally {
    disableBtn(false);
  }
}

// =============================
// ユーティリティ
// =============================
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function setStatus(msg) {
  document.getElementById('status').innerText = msg;
}

function disableBtn(flag) {
  document.getElementById('runBtn').disabled = flag;
}