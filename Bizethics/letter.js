// Thảo Linh's letter to her mom: the reading text beside the letter image, in Vietnamese and English.
// Tiếng Việt giữ NGUYÊN VĂN lá thư; chỉ thay tên người trong gia đình bằng ⟦name⟧ để che đi.
// { q: `...` } là đoạn trích dẫn.
var LETTER = {
  vi: [
    `Gửi mẹ,`,
    `Nhân ngày 20 tháng 10 lần thứ mười tám mà con được viết thư tặng cho mẹ con nghĩ con nên làm gì đó đặc biệt hơn một chút. Người ta nói là ngày sinh nhật của con đáng lẽ ra nên là ngày cảm ơn ba mẹ vì đã cho con một cuộc sống nhưng con thì nghĩ là việc tách riêng biệt hai ngày này ra vẫn tốt hơn nhiều vì ngày của ai thì người đó được chúc mừng với phải.`,
    `Con nghĩ đây là một trong số lần ít thật ít mà mẹ đọc được văn của con vì dù là con được khen giỏi văn đến mấy thì con vẫn chưa viết cho mẹ đọc lần nào. Và con mong rằng mẹ cũng sẽ thấy văn của con hay dưới cương vị cũng là một học sinh chuyên Văn - Pháp. Ngày xưa có một cái mẹ nói làm con nhớ mãi chính là về việc con luôn viết về ba trong những bài văn miêu tả về ba mẹ nhưng càng lớn thì con lại càng muốn nói về mẹ nhiều hơn.`,
    `18 năm trải qua ngày này mẹ có thấy khác nhiều không mẹ? Từ hồi làm thiếu nữ được các anh trai tặng quà tặng hoa, cho tới hồi làm mẹ thì có ba ⟦name⟧ và rồi là con và ⟦name⟧. Nhiều khi ba hay nói đùa là ngày 20/11 phụ nữ đâu có cần tặng hoa và con thì luôn thấy trách lời nói đó. Người phụ nữ nào cũng xứng đáng được yêu thương và việc trở thành một người có gia đình không có nghĩa người ấy xứng đáng nhận được ít yêu thương hơn.`,
    `Dạo gần đây con có đọc nhiều bài viết về việc phụ nữ thường bị xem là “Ít đi” khi có những đứa con của mình. Ít đi nghĩa là cô ấy dần chỉ còn được coi là một người mẹ, và gia đình cô ấy cũng chỉ còn coi cô ấy là một người mẹ, cho dù cô ấy còn nhiều ước mơ y như thời cô ấy còn là con gái, và cũng còn nhiều nghĩ suy của một thiếu nữ đôi mươi. Hay như kể là cái tên của cô ấy giờ cũng gắn liền với những đứa con của mình chứ không chỉ còn là tên của cô ấy nữa. Có cả tên được đặt cho quá trình ấy, quá trình trở thành một người mẹ. Họ chỉ ra rằng khi này không những cơ thể thay đổi mà ngay cả dây thần kinh, hormones, bộ não và tất cả mọi thứ khác đều thay đổi để phát triển mối quan hệ mẹ con. Song sự thay đổi ấy không phải là một điều tất yếu mà chỉ là một tiền đề cho tình yêu cần được phát triển. Giống như người ta hay nói về “bản năng làm mẹ” nhưng bản năng ấy là tình yêu được tôi luyện chứ không phải tự nhiên mà có. Và vì vậy con muốn cảm ơn mẹ vì đã chọn chăm lo và yêu thương bọn con.`,
    `Mẹ có thấy buồn không khi từ một người con gái lại phải trở thành một người vợ, và rồi một là một người mẹ. Sự thay đổi đó con nghĩ là rất đáng kể trong một đời người và dù chẳng muốn nhưng ai cũng bị ép phải trải qua nó. Vì vậy mà con luôn lo lắng mỗi khi mẹ nói rằng mẹ đang dần hết đam mê cho một thứ gì đó và luôn mong muốn mẹ có thể được làm những gì mẹ thích mà không phải lo sợ về việc này việc kia. Con cũng mong bọn con đừng làm mẹ lo lắng quá để mẹ có thể làm được những điều mẹ thích. Có một đam mê, kể cả không phải với việc học cũng sẽ là một động lực cho cuộc sống luôn vui vẻ hơn. Có lẽ mẹ chỉ chưa tìm được đam mê do những sự hạnh phúc đó thường bị coi là “sở thích” chứ không phải là một “sự nghiệp”. Như việc viết văn thơ, việc đan thêu thùa, việc từ thiện, thời trang, bán hàng,v.v. Con nghĩ chẳng phải tự nhiên mà con với ⟦name⟧ đều có thể táy máy chân tay, chắc chắn điều đó bọn con được thừa hưởng từ mẹ, chỉ là mẹ đã bỏ qua nó để làm những việc khác nuôi sống gia đình. Nhưng nói sợ là vậy con vẫn có thể thấy được sự kiên cường ở trong mẹ, cuộc đời của mẹ là một chuỗi những sóng gió rất nhiều vậy mà mẹ vẫn luôn có thể giành tâm tư để lo lắng cho người khác. Cho công ty, cho ông bà, dì cậu và cho gia đình. Dẫu lo cho gia đình mẹ vẫn có một cuộc sống riêng, một cuộc sống thành công theo như lời mẹ nói.`,
    `Văn hóa của Việt Nam khiến cho dù người trong gia đình có quan tâm nhau tới như thế nào thì vẫn cũng sẽ khó thể hiện tình cảm của mình. Có lẽ là do trước kia nho giáo đề cao tôn ti trật tự, sự kìm nén cảm xúc cá nhân để giữ hòa khí. Phụ huynh thường tin rằng sự nghiêm khắc, chỉ ra thiếu sót hoặc đặt kỳ vọng cao là cách giúp con tiến bộ, thay vì khen ngợi trực tiếp. “Thương cho roi cho vọt, ghét cho ngọt cho bùi” và con nghĩ có lẽ câu ấy đúng đến một điểm nào đó. Vì có lẽ con và ⟦name⟧ đã trở thành một con người tử tế nhờ mẹ dạy dỗ, và cũng trở thành một người đủ yêu thương vì mẹ đã tôi luyện cho bọn con. Có một nhà văn con rất thích cũng viết về mẹ của anh ấy, Ocean Wang.`,
    { q: `“In Vietnamese, the word for missing someone and remembering them is the same: nhớ. Sometimes, when you ask me over the phone, Có nhớ mẹ không? I flinch, thinking you meant, Do you remember me?` },
    { q: `I miss you more than I remember you.”` },
    `Đoạn này dịch ra là: Trong tiếng Việt thì từ ngữ cho từ missing (nhớ nhung) và từ remembering (nhớ về một điều gì đó) đều có chung một vần là “nhớ”. Và đôi lúc khi mẹ gọi điện cho con và hỏi “Con có nhớ mẹ không” con sẽ khựng lại đôi chút vì con tưởng mẹ đang hỏi con có đang nhớ mẹ là ai không.`,
    `Vì con nhớ mẹ hơn là nhớ về mẹ”`,
    `Đây là một trong những câu kinh điển trong cuốn sách khi anh ấy nói về cách mà ngôn ngữ và sự cách biệt về thế hệ, truyền thống, môi trường khiến cho hai mẹ con dẫu thương yêu và nương tựa nhau cũng có những tách biệt thật lớn trong sự thấu hiểu. Vậy nên là đúng là trong tiếng Việt, chúng ta hiếm khi nói “I love you” (yêu), và khi nói, gần như lúc nào cũng là bằng tiếng Anh. Với chúng ta, sự quan tâm và tình yêu thường được thể hiện rõ ràng nhất qua những hành động chăm sóc, phục vụ và làm điều gì đó cho người mình yêu thương… Ngôn ngữ vì vậy mà trở nên thật phức tạp khi liên quan đến tình yêu và luôn cần có hành động để bù trừ cho sự khó hiểu đó.`,
    `Và con hay thường nói con nhớ mẹ, nhưng không phải nhớ về mẹ. Có lần mẹ hỏi con chỉ nhớ mẹ do mẹ đã cho con cái này cái kia thôi chứ gì nhưng đó là “nhớ về”. Còn con luôn nói con nhớ nhà và cảm giác được ở nhà với mẹ, có lẽ lên đại học rồi con với hiểu vì sao người ta thường nói không ai thương con được bằng mẹ thương con. Con ước gì con đã hiểu được sớm hơn điều đó và trân trọng hơn những lúc cấp 3 con còn được ở nhà. Phải lớn rồi con với hiểu sự bảo bọc của gia đình không phải là một cái lồng nhốt con lại mà trong đó với là nơi con có thể tự do bay. Con biết là ai rồi cũng sẽ phải lớn lên và như cái phim mẹ thích thì con sẽ bay đi một ngày nào đó như con vịt giời. Nhưng đó chỉ là truyền thống cũ, ngày nay nhiều người trẻ vẫn tiếp tục chăm lo cho cha mẹ được rất nhiều kể cả sau khi họ trưởng thành. Và con mong mẹ sẽ đợi con đến ngày con đền đáp được cho công ơn của mẹ, con vẫn đang cố gắng để ít nhất thành công được trong lĩnh vực nào đó. Và con mong khi đó mẹ đừng ngại ngần với con chỉ vì “con lớn rồi” và mong rằng gia đình mình vẫn sẽ như hiện tại.`,
    `Cuối cùng thì là lời chúc 20/10. Con chúc mẹ mạnh khỏe, càng nhiều sức khỏe càng tốt, xinh đẹp, nhiều năng lượng, hết mình với những thứ mà mẹ thích, bớt lo bớt suy nghĩ ưu phiền, mong mẹ được vui và luôn thấy mình được yêu thương.`,
    `Con cảm ơn mẹ.`
  ],

  // English translation of the letter, paragraph by paragraph
  en: [
    `Dear Mom,`,
    `On this 20th of October, the eighteenth time I get to write you a letter, I thought I should do something a little more special. People say my birthday should really be the day to thank my parents for giving me a life, but I think it is still much better to keep these two days apart, because each person deserves to be celebrated on their own day.`,
    `I think this is one of the very, very few times you get to read my writing, because however much I have been praised for my writing, I have never once written something for you to read. And I hope you will find my writing good too, coming from someone who was a specialised Literature and French student. One thing you said long ago that I still remember is that I always wrote about Dad in my essays describing my parents, but the older I get, the more I want to talk about you.`,
    `Eighteen years of this day, Mom, does it feel very different? From your girlhood, when young men gave you gifts and flowers, to becoming a mother, with Dad ⟦name⟧, and then me and ⟦name⟧. Dad often jokes that women don’t need flowers on 20/11, and I always disapprove of that. Every woman deserves to be loved, and having a family does not mean she deserves less love.`,
    `Lately I have read many articles about how women are often seen as “less” once they have children. “Less” means she gradually comes to be seen only as a mother, and her family, too, sees her only as a mother, even though she still has as many dreams as when she was a girl, and as many thoughts as a young woman in her twenties. Or how even her name becomes tied to her children and is no longer only her own. There is even a name for this process, the process of becoming a mother. They point out that at this time it is not only the body that changes, but the nerves, the hormones, the brain and everything else, to grow the bond between mother and child. Yet that change is not inevitable; it is only a starting point for a love that has to be grown. People often talk about a “maternal instinct”, but that instinct is a love that is forged, not something that comes by itself. And so I want to thank you for choosing to care for us and love us.`,
    `Does it make you sad, Mom, to go from being a girl to becoming a wife, and then a mother? I think that change is huge in a person’s life, and even if they don’t want to, everyone is pushed to go through it. That is why I always worry whenever you say you are slowly losing your passion for things, and I always wish you could do what you love without worrying about this or that. I also hope we don’t make you worry too much, so you can do the things you love. Having a passion, even one that has nothing to do with studying, gives life a reason to be happier. Maybe you just haven’t found your passion because that kind of happiness is often called a “hobby” rather than a “career”. Like writing prose and poetry, knitting and embroidery, charity work, fashion, selling, and so on. I don’t think it is by chance that ⟦name⟧ and I are both good with our hands; we surely got that from you, only you set it aside to do other things to support the family. But for all my worrying, I can still see the resilience in you. Your life has been a long series of storms, and yet you always find room in your heart to care for others: for the company, for our grandparents, our aunts and uncles, and for our family. And while caring for the family, you still have a life of your own, a successful life, as you say.`,
    `Vietnamese culture makes it hard for family members to show their feelings, however much they care for each other. Perhaps it is because Confucianism once valued hierarchy and holding back personal feelings to keep the peace. Parents often believe that being strict, pointing out faults or setting high expectations is how to help children improve, rather than praising them directly. “Thương cho roi cho vọt, ghét cho ngọt cho bùi” (spare the rod, spoil the child), and I think that saying may be true up to a point. Because perhaps ⟦name⟧ and I have become decent people thanks to how you raised us, and loving enough people because you shaped us. There is a writer I really like who also wrote about his mother, Ocean Wang.`,
    { q: `“In Vietnamese, the word for missing someone and remembering them is the same: nhớ. Sometimes, when you ask me over the phone, Có nhớ mẹ không? I flinch, thinking you meant, Do you remember me?` },
    { q: `I miss you more than I remember you.”` },
    `In translation: in Vietnamese, the word for missing (nhớ nhung) and the word for remembering (remembering something) share the same sound, “nhớ”. And sometimes when you call me and ask “Con có nhớ mẹ không?”, I pause for a moment, because I think you are asking whether I remember who you are.`,
    `Because I miss you more than I remember you.”`,
    `This is one of the classic lines of the book, where he talks about how language, and the gaps between generations, traditions and surroundings, mean that a mother and child, though they love and lean on each other, still have big gaps in understanding. So it is true that in Vietnamese we rarely say “I love you” (yêu), and when we do, it is almost always in English. For us, care and love are usually shown most clearly through acts of looking after, serving and doing something for the people we love… That is why language becomes so complicated when it comes to love, and always needs actions to make up for what it cannot say.`,
    `And I often say that I miss you, not that I remember you. Once you asked whether I only miss you because you gave me this and that, but that is “remembering”. I always say I miss home and the feeling of being at home with you; maybe only after going to university did I understand why people say no one can love you the way your mother does. I wish I had understood that sooner and treasured the time I still lived at home in high school more. Only now that I have grown up do I understand that my family’s protection is not a cage that locks me in, but the place where I can fly freely. I know everyone has to grow up, and like in the film you love, I will fly away one day like a wild duck. But that is only the old tradition; today many young people keep taking care of their parents long after they grow up. And I hope you will wait for me until the day I can repay everything you have given me; I am still working hard to succeed in at least one field. And I hope that then you won’t hold back with me just because “I’m grown up now”, and that our family will stay as it is now.`,
    `Finally, my wishes for 20/10. I wish you good health, as much health as possible, beauty, lots of energy, giving your all to the things you love, fewer worries and less overthinking, and I hope you are happy and always feel loved.`,
    `Thank you, Mom.`
  ]
};

(function () {
  var dlg = document.getElementById("letterViewer");
  if (!dlg) return;
  var textBox = document.getElementById("letterText"), zoom = document.getElementById("viewerZoom");

  function render(lang) {
    textBox.lang = lang;
    textBox.innerHTML = LETTER[lang].map(function (b) {
      var q = typeof b !== "string", t = Site.esc(q ? b.q : b)
        .replace(/⟦name⟧/g, '<span class="redact" title="Name hidden" aria-label="name hidden">▇▇▇</span>');
      return q ? '<blockquote>' + t + '</blockquote>' : '<p>' + t + '</p>';
    }).join("");
    dlg.querySelectorAll("[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.lang === lang); });
    textBox.scrollTop = 0;
  }

  function show(pane) {
    dlg.querySelector(".viewer-body").dataset.show = pane;
    dlg.querySelectorAll("[data-pane]").forEach(function (b) { b.setAttribute("aria-selected", b.dataset.pane === pane); });
  }

  document.getElementById("openLetter").addEventListener("click", function () {
    render("vi");
    show("img");
    dlg.showModal();
  });
  dlg.querySelectorAll("[data-lang]").forEach(function (b) { b.addEventListener("click", function () { render(b.dataset.lang); }); });
  dlg.querySelectorAll("[data-pane]").forEach(function (b) { b.addEventListener("click", function () { show(b.dataset.pane); }); });

  // Tap the letter or a clipped chat to see it full size; tap again to go back
  dlg.querySelectorAll("[data-full]").forEach(function (el) {
    el.addEventListener("click", function () {
      zoom.querySelector("img").src = el.dataset.full;
      zoom.querySelector("img").alt = el.getAttribute("aria-label") || "";
      zoom.hidden = false;
    });
  });
  zoom.addEventListener("click", function () { zoom.hidden = true; });

  dlg.addEventListener("click", function (e) {
    if (e.target === dlg || e.target.closest("[data-close]")) dlg.close();
  });
  dlg.addEventListener("cancel", function (e) {
    if (!zoom.hidden) { e.preventDefault(); zoom.hidden = true; }
  });
})();
