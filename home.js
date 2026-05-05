const OceanQuiz = {
    allQuestions: [
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
    ],
    selectedQuestions: [],
    currentIndex: 0,
    score: 0,
    canAnswer: true,

    init() {
        this.selectedQuestions = [...this.allQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
        this.currentIndex = 0;
        this.score = 0;
        document.getElementById('quiz-container').style.display = 'block';
        document.getElementById('quiz-summary').style.display = 'none';
        this.render();
    },

    render() {
        this.canAnswer = true;
        const container = document.getElementById('quiz-container');
        const q = this.selectedQuestions[this.currentIndex];
        
        document.getElementById('quiz-progress').innerText = `Question ${this.currentIndex + 1} / 10`;

        let optionsHtml = q.a.map((opt, i) => `
            <div class="quiz-option" onclick="OceanQuiz.check(${i}, this)">${opt}</div>
        `).join('');

        container.innerHTML = `
            <h3>${q.q}</h3>
            ${optionsHtml}
            <div id="quiz-result" class="hidden"></div>
        `;
    },

    check(idx, el) {
        if (!this.canAnswer) return;
        this.canAnswer = false;

        const correctIdx = this.selectedQuestions[this.currentIndex].correct;
        const resultDiv = document.getElementById('quiz-result');
        const options = document.querySelectorAll('.quiz-option');

        resultDiv.classList.remove('hidden');

        if (idx === correctIdx) {
            el.classList.add('correct');
            this.score += 10;
            resultDiv.innerHTML = `<span style="color:green">答對了！🎉</span>`;
        } else {
            el.classList.add('wrong');
            options[correctIdx].classList.add('correct');
            resultDiv.innerHTML = `<span style="color:red">答錯了，正確答案是：${this.selectedQuestions[this.currentIndex].a[correctIdx]}</span>`;
        }

        // 加入「跳下一題」按鈕
        const nextBtn = document.createElement('div');
        nextBtn.className = 'quiz-option next-btn-style';
        nextBtn.innerText = this.currentIndex === 9 ? '查看結果' : '下一題';
        nextBtn.onclick = () => this.next();
        resultDiv.appendChild(nextBtn);
    },

    next() {
        this.currentIndex++;
        if (this.currentIndex < 10) {
            this.render();
        } else {
            this.finish();
        }
    },

    finish() {
        document.getElementById('quiz-container').style.display = 'none';
        const summary = document.getElementById('quiz-summary');
        summary.style.display = 'block';
        document.getElementById('final-score-text').innerText = `${this.score} / 100 分`;

        let msg = "";
        if (this.score === 100) msg = "太強了！你是真正的海洋保護專家！🌊🛡️";
        else if (this.score >= 70) msg = "很棒！你對海洋環境有很深的了解喔！🐟";
        else if (this.score >= 40) msg = "做得不錯，再加把勁，一起守護海洋！🐚";
        else msg = "有待加強喔，快去看看網頁其他的海洋知識吧！🌍";
        
        document.getElementById('feedback-message').innerText = msg;
    }
};

// 全域重設函數
function resetQuiz() {
    OceanQuiz.init();
}

// 啟動測驗
OceanQuiz.init();
