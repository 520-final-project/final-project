const allQuestions = [
    { q: "微塑膠對海洋的主要影響是？", a: ["提升水質", "進入食物鏈", "增加氧氣", "降低鹽度"], correct: 1 },
    { q: "海洋保護區的主要目的是？", a: ["捕魚", "發展工業", "建設城市", "維護生物多樣性"], correct: 3 },
    { q: "珊瑚白化主要原因是？", a: ["海水升溫與污染", "光線不足", "水太鹹", "魚太多"], correct: 0 },
    { q: "重金屬污染會造成？", a: ["水變清", "增加氧氣", "生物中毒", "海水變甜"], correct: 2 },
    { q: "海洋食物鏈頂端生物污染較嚴重原因？", a: ["體型大", "游得快", "吃得少", "生物累積"], correct: 3 },
    { q: "海洋污染會導致什麼？", a: ["生態平衡", "生態失衡", "水增加", "陸地增加"], correct: 1 },
    { q: "海洋約佔地球表面的多少比例？", a: ["50%", "71%", "60%", "85%"], correct: 1 },
    { q: "優養化會導致什麼問題？", a: ["藻類過度繁殖", "海水變乾淨", "魚類增加", "海水透明"], correct: 0 },
    { q: "海洋垃圾中比例最高的是？", a: ["食物", "衣物", "塑膠袋", "紙張"], correct: 2 },
    { q: "微塑膠會進入人體的原因？", a: ["空氣", "光", "土壤", "食物鏈"], correct: 3 },
    { q: "海洋優養化導致缺氧的主要機制為何？", a: ["鹽度下降", "海流減慢", "藻類分解消耗溶氧", "光照減少"], correct: 2 },
    { q: "海洋酸化主要由哪種氣體增加造成？", a: ["二氧化碳", "氧氣", "氮氣", "甲烷"], correct: 0 },
    { q: "酸化對碳酸鈣結構（如珊瑚）的影響為何？", a: ["強化結構", "無影響", "增加生長速度", "溶解與鈣化率下降"], correct: 3 },
    { q: "下列何者最能解釋「生物放大作用」？", a: ["污染物沿食物鏈濃度增加", "污染物在水中稀釋", "生物數量增加", "海水溫度上升"], correct: 0 },
    { q: "重金屬（如汞）轉化為毒性更高形式的過程為？", a: ["氧化", "蒸發", "甲基化", "溶解"], correct: 2 },
    { q: "海洋熱污染通常會造成？", a: ["生物多樣性增加", "鹽度上升", "水質變清", "溶氧量下降"], correct: 3 },
    { q: "海洋污染與氣候變遷的關係為？", a: ["單向影響", "交互影響", "無關", "完全相同"], correct: 1 },
    { q: "循環經濟強調？", a: ["資源循環再利用", "丟棄產品", "增加垃圾", "一次性使用"], correct: 0 },
    { q: "過度包裝與海洋污染的關聯為？", a: ["無關", "提高效率", "增加塑膠廢棄物流入海洋", "減少垃圾"], correct: 2 },
    { q: "永續消費行為包括？", a: ["衝動購物", "浪費資源", "選擇環保產品", "使用一次性產品"], correct: 2 }
];
let selectedQuestions = [];
let currentIndex = 0;
let score = 0;
let canAnswer = true;

function initQuiz() {
    selectedQuestions = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
    showQuestion();
}

function showQuestion() {
    canAnswer = true;
    const q = selectedQuestions[currentIndex];
    document.getElementById('question-number').innerText = `第 ${currentIndex + 1} / 10 題`;
    document.getElementById('progress-bar').style.width = `${(currentIndex + 1) * 10}%`;
    document.getElementById('question-text').innerText = q.q;
    document.getElementById('feedback-area').classList.add('hidden');
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    q.a.forEach((opt, index) => {
        const div = document.createElement('div');
        div.className = 'quiz-option';
        div.innerText = opt;
        div.onclick = () => checkAnswer(index, div);
        container.appendChild(div);
    });
}

function checkAnswer(idx, element) {
    if (!canAnswer) return;
    canAnswer = false;
    
    const correctIdx = selectedQuestions[currentIndex].correct;
    const options = document.querySelectorAll('.quiz-option');
    
    if (idx === correctIdx) {
        element.classList.add('correct');
        score += 10;
        document.getElementById('feedback-text').innerText = "太棒了！答對了！✨";
    } else {
        element.classList.add('wrong');
        options[correctIdx].classList.add('correct'); 
        document.getElementById('feedback-text').innerText = `可惜答錯了，正確答案是：${selectedQuestions[currentIndex].a[correctIdx]}`;
    }
    
    document.getElementById('feedback-area').classList.remove('hidden');
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < 10) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-box').classList.add('hidden');
    document.getElementById('result-box').classList.remove('hidden');
    document.getElementById('final-score').innerText = score;
    
    let msg = "";
    if (score === 100) msg = "你是海洋守護神！太強了！🛡️🌊";
    else if (score >= 70) msg = "很棒！你對海洋環境非常了解！🐟";
    else if (score >= 40) msg = "做得好，但還有進步空間，一起守護海洋吧！🐚";
    else msg = "有待加強喔，讓我們多了解一些海洋知識！🌍";
    
    document.getElementById('suggestion-text').innerText = msg;
}

initQuiz();
