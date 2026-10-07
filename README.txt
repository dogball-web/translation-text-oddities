《翻譯文本系怪異紀錄》｜誠海人文大學網頁解謎 v1.0

主要更新：
- 系所頁與課程頁分離；榮譽榜、英文歌唱比賽移至語言與文本文化學系。
- 結局後，系所頁新增文教樓西側三樓平面圖與教室設備檢查入口。
- Figure 4 討論中的林冠秉留言，結局前僅有一個「完整」；結局後該詞變紅，最後編輯時間改為玩家提交最終中文翻譯的當下時間。
- Figure 4 討論串移至討論區中段，並將四則日常內容排到其後。
- morphology 正常 Correct / Incorrect 解析會保留，題目列顯示最近一次作答結果；怪異答案仍永久鎖定。
- unbelievable 接受畫面可操作的 un | believ | able，解析說明 underlying base 為 believe。
- 移除首頁假瀏覽器網址列。
- 淑芬、雅婷等文字頭像統一使用暱稱第一字。
- 防右鍵 / F12 / Ctrl+U / 常見開發者工具快捷鍵保留。

測試新流程時，若瀏覽器仍保留舊版本 localStorage 狀態，建議清除該網站資料後再從頭測試。

v0.9 更新：
- 《翻譯實務》實體課程統一為星期五 09:10–12:00；遠距期間只顯示線上授課，353 在結局前不直接揭露。
- 結局後於系所空間資料與 353 設備頁揭露：《翻譯實務》平時實體教室為文教樓 353。
- 新增 Week 4 補充講義（掃描整理），以 misplace /「Can a person be misplaced?」及淡鉛筆註記引導怪異構詞。
- morphology 每題連續錯誤達 4 次後顯示教學式 Hint；mispresence 會提示 mis- / misplace 的「wrong place」語意。
- 討論區發文時間重新疏開，主要集中於星期四晚間、星期五上課前後；Figure 4 維持中段位置。

v0.9.1：
- 林冠秉正式標示為 TA；賴老師維持「教師」標籤。
- 討論區角色文風調整：一般學生少用句號；餅餅以空格代替逗號；林冠秉因禮貌習慣正常使用標點；賴老師完整使用標點。
- 新增清明連假前後「TA月報表電子簽名」討論串：林冠秉 4/2 忘記請老師簽三月份月報，賴老師 4/6 連假後才補簽，最後因逾時可能無法送件。
- 開發者工具阻擋改為兩階段：初期僅拆字根練習頁阻擋；全部怪異分析鎖定後改為全站阻擋，警告文字同步改變。

v0.9.2：
- 怪異階段的開發者工具警告改為英文：
  “Please do not access content that has not been made available to you.”
- 353 的怪談規則改以普通英文教室筆記「Room 353 — Notes for Classroom Use」呈現；不直接標示為怪談。
- 新增非標準造詞 miswhere，放在 mispresence 前；怪異接受分析為 mis | where。
- 舊構詞補充講義增加淡筆記「not missing — miswhere」，讓懂構詞學的玩家察覺這不是正常 derivation。
- 全部怪異分析完成的門檻同步由 6 題調整為 7 題。

v0.9.4：
- Week 4 構詞補充講義改用賴老師手寫筆記照片，不再使用網頁模擬的手寫字。
- 筆記呈現為老師在筆記本上畫構詞樹後直接由上往下拍攝；保留輕微手機陰影、紙張透印與拍攝感。
- 圖中以 misplace / unkind / teacher 示範 prefix、root、suffix 的拆解，讓它更像老師提供給學生的課堂參考資料。

v0.9.5：
- Microsoft Teams 全站虛構化為 Dog Ball Meet。
- Google Meet 全站虛構化為 Cookie Meet；舊會議網址一併移除真實 Google 網域。
- 重製「潘智源／普那疼」迷因素材，不再使用原先的第三方迷因圖像。

v0.9.6：
- 怪異構詞分析一旦被系統 recognized／鎖定，題目前的普通 ✓ 改為 ○。
- 一般正確答案仍維持 ✓；一般錯誤仍維持 ✕。
- ○ 不直接解釋意義，讓玩家察覺這類提交與普通「答對」不同，並嘗試其他怪異拆法。

v0.9.7：
- Room 353 頁面右下角新增「清除所有記錄」。
- 點擊後使用瀏覽器原生 confirm 視窗確認：「此按鈕為重啟遊戲的按鈕，確定要清除所有記錄嗎？」
- 取消則不做任何事；確定後清除本遊戲 localStorage / sessionStorage 狀態並回到首頁。
- 此按鈕只放在結局後可見的 353 頁面，不在遊戲前期暴露重啟功能。


=== v0.9.8 ===
- 入口頁改為「誠海人文大學｜語言文本系」系所網站；正式名稱仍為「語言與文本文化學系」。
- 《翻譯實務（108-2）》課程首頁移至 course.html，從系所頁進入。
- 系所首頁新增固定招生橫幅：SEE THE WORLD · LEARN FROM THE WORLD · CONNECT WITH THE WORLD，對應遊記中的 world ×3 描述。
- Final Translation Practice 保留原本的最短完整度檢查（少於 4 字元時顯示「請完成翻譯後再提交。」）。
- 若只輸入「翻譯」「中文翻譯」「translation」「Chinese translation」，不觸發結局，改顯示怪異英文回覆。
- v0.9.8 當時仍使用暫用 painkiller_meme.jpg；v1.0 已更換為正式版本。


v0.9.9 blind-test fixes
- Recognized/anomalous morphology answers now display ○ in the answer history instead of ordinary ✓.
- Corrected anomalous-completion state to use the current storage keys.
- The morphology exercise now explicitly shows 13 questions.
- refamiliar now visibly states that its Semantic relation must still be completed.
- After all seven anomalous analyses are recognized, a clear “補充教材已開放” panel appears and links directly to travel_notes_full.pdf, whose bottom section contains Final Translation Practice.


v0.9.10
- 新增「語言分析與文化轉譯跨領域學分學程」頁面與課程地圖。
- 將《翻譯實務》定位為跨領域選修／學程應用課程，以合理化基礎構詞、句法與翻譯並置。
- 僅在跨領域學程介紹頁的課程地圖以「賴OO」標示教師；其餘頁面維持「賴老師」。
- 課綱原排教室統一為文教樓 353。

v0.9.11
- Removed the mistakenly-added standalone interdisciplinary program page and links.
- Reframed only 翻譯實務 as a cross-disciplinary elective on the department landing page; teacher is shown as 賴老師.
- Added anomalous-analysis progress (x / 7) and unified the seven anomalous morphology feedback formats.
- Final translation shows its anomalous completion feedback for about 5 seconds, then auto-redirects to the Department Site.
- Added a post-ending equipment-record entry directly on the department landing page.
- Reworked the post-ending department floor plan so 353 appears in the same 文教樓 numbering system as the course record.

v0.9.12
- Updated both travel_notes_full and travel_notes_midterm to the revised Morgan Hale canon.
- Morgan Hale is now identified in the source metadata; the manuscript is dated c. 2012 while the scanned title page remains absent.
- Reworked the train-delay sequence so rain causes the travel disruption, while the weather clears before Morgan walks to the university.
- Removed the duplicated arrival / train-delay passage from the full version.
- Clarified that the contradictory “inside / beyond” descriptions came from Morgan's original travel notebook.
- Revised the following-morning paragraph so it no longer says the rain only stopped then.
- Standardised relevant travel prose toward British usage (e.g. travelling, town centre, towards).
- The temporary painkiller meme image remains unchanged; this is not v1.0.


v1.0
- 正式作品名：《翻譯文本系怪異紀錄》。遊戲內仍維持「誠海人文大學｜語言文本系」等校網標題。
- 正式替換「我信｜賴普那疼」迷因圖；不再使用 v0.9.x 暫用素材。
- 迷因討論串移至 Week 4 構詞練習之後（2020/03/13 課後），賴老師回覆後餅餅追加「老師我很會拆字吼」。
- discussion 角色新增低調的所屬系所標籤；林冠秉保留 TA，賴老師保留教師標籤。
- morphology 新增 displacement，安排在 miswhere 後；普通拆法 dis | place | ment，怪異拆法 dis | placement。
- 怪異分析總數由 7 增為 8；題目總數由 13 增為 14；完成門檻與 anti-devtools 階段判定同步更新。
- Final Translation Practice 正確提交後顯示完成訊息，約 2.4 秒後自動返回系所首頁；保留立即返回按鈕作為備援。
- v0.9.12 的 Morgan Hale 遊記修訂正式併入 v1.0。


=== v1.0.1 updates ===
- Anomalous analyses progress text is unchanged but larger and more visually prominent.
- Materials list is chronologically ordered; the Week 7–12 lecture file now appears at its 2020/03/30 position.
- 林冠秉 no longer appears in the early 貝卡 hamster thread; 淑芬 is 文學系.
- 「請輸入姓名」 is shown as 幼兒教育學系.
- Broken-image wording changed from 「叉燒包」 to 「我這邊也是看到叉叉。」
- REMEMBERSHIP anomalous definition now means returning to memory after having ceased to be remembered.
- PRES receives a full anomalous bound-form definition at first appearance and a shortened cross-reference later.
- Classroom inventory/floor plan room numbers are reordered coherently; 353 remains the larger language room.
- Final Translation requires at least 10 Chinese characters and uses a permissive semantic-completeness check; special meta inputs remain easter eggs and never end the game.
- Successful final translation feedback remains visible for about 5 seconds before automatic return to the department homepage.


v1.0.2
- Final Translation no longer restores or displays a previously submitted translation from localStorage.
- Removed the manual Return to Department Site button from the completed Final Translation state; first-time successful submission remains visible for about 5 seconds before automatic redirect.
- Primary button/link text remains white even after visited-state styling, preventing purple-on-blue low contrast.
- Room 353 '清除所有記錄' restart button is approximately 1.7× larger, bold, and red for visibility.
- Final Translation visited-state actions use a dark-blue background with light-blue text for readability; visited-link purple remains unchanged everywhere else.

v1.0.3
- Visited-link purple is now controlled only by the game's localStorage-backed .is-visited state.
- Browser-native :visited styling was removed, so 「清除所有記錄」 now resets purple link state along with the rest of the game.
