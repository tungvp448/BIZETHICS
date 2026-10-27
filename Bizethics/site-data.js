// ============================================================
// SITE DATA: sửa nội dung website ở đây, không cần đụng tới HTML.
// Mọi trang đều đọc từ file này. Lưu file rồi tải lại trang để xem.
// Nội dung nghiên cứu chỉ lấy từ Google Docs của nhóm (tab MINI SOCIAL PROJECT).
// ============================================================
var SITE = {

  // ===== Supabase: nơi lưu chung các lá thư trên tường Say thank you =====
  // Lấy trong Supabase: Project Settings → API (hoặc nút "Connect").
  // url: Project URL. anonKey: khoá "publishable" (hoặc "anon public"). Khoá này được phép công khai.
  // TUYỆT ĐỐI không dán khoá "secret" hay "service_role" vào đây.
  // Để trống thì thư chỉ lưu trong trình duyệt của từng người, kèm vài thư mẫu.
  supabase: { url: "https://dlzsvmfkawbsvmaioohj.supabase.co", anonKey: "sb_publishable_Le1WqQhST6MVz-G5jfxe0A_E-rKbX3V" },

  // ===== Liên hệ =====
  // email: email của nhóm, hiện trong phần "Need help?" và "Subscribe" (để trống thì chỉ hiện các kênh mạng xã hội).
  contact: { email: "" },

  // ===== Những câu chuyện cần giúp đỡ (trang Donate) =====
  // Mỗi câu chuyện chỉ mở ra khi người đọc bấm vào. Chỉ đăng khi người trong câu chuyện đã đồng ý.
  // body: các đoạn văn. photos: [{ src: "images/...", caption: "..." }]. todo: nhắc nhóm điền thêm (chỉ nhóm cần đọc).
  helpStories: [
    {
      title: "A mother caring for her severely ill daughter",
      teaser: "Her only wish is for her daughter to recover.",
      body: [
        "We met her on 17 October, near Bệnh Viện K Tân Triều, during the food distribution. She told us that her daughter was severely ill.",
        "When we gave her a flower, she started crying. It had been such a long time since someone had given her flowers.",
        "We asked what her wish was, at this moment in her life. Her only wish was for her child to recover from the sickness. Nothing else. She told us it had been a long time since she had been able to take a day for herself.",
        "We asked whether we could help her get some money through donations, even if it was just a small amount. She said yes and gave us her contact information."
      ],
      photos: [],
      todo: "Add more about her situation, what she needs, how to support her directly, and photos, only with her consent."
    }
  ],

  // ===== Thành viên nhóm =====
  team: [
    { name: "Thảo Linh", role: "Project lead, video & report editor" },
    { name: "Hà Dương", role: "Budget, logistics & website" },
    { name: "Khánh Ngọc", role: "Timeline & executive summary" },
    { name: "Quang Khánh", role: "Research & results" },
    { name: "Raine", role: "Storyteller, host & posters" }
  ],

  // ===== Mạng xã hội =====
  socials: [
    { name: "TikTok", handle: "@dearm0m___", url: "https://www.tiktok.com/@dearm0m___" },
    { name: "Instagram", handle: "@dearm0m___", url: "https://www.instagram.com/dearm0m___/" },
    { name: "Threads", handle: "@dearm0m___", url: "https://www.threads.com/@dearm0m___" }
  ],

  // ===== Số liệu =====
  // value: số hiện tại. Để null nếu chưa có số, trang sẽ hiện "Updating".
  // target: mục tiêu trong kế hoạch (Impact measures trong Docs). updated: ngày cập nhật (YYYY-MM-DD).
  // Track A: chiến dịch mạng xã hội (chính)
  socialStats: [
    { label: "Views across posts and videos", value: null, target: 3000, updated: "" },
    { label: "Dear Mom letters and posts shared", value: null, updated: "" },
    { label: "Followers on TikTok, Instagram and Threads", value: null, updated: "" },
    { label: "“Show it to your mother” reaction clips", value: null, target: 5, updated: "" }
  ],
  // Track B: hỗ trợ các mẹ ở viện K. Số tiền tự tính từ bảng sao kê (entries) ở dưới.
  hospitalStats: [
    { label: "Mothers and caregivers reached on 17 Oct", value: null, target: 15, updated: "" },
    { label: "New volunteers signed up with our partner group", value: null, target: 5, updated: "" }
  ],

  // ===== Dòng thời gian (cũ nhất ở trên) =====
  timeline: [
    { date: "2026-10-16", title: "Preparation", text: "Books printed, script written, flowers ready." },
    { date: "2026-10-17", title: "Volunteer visit", text: "We joined a local volunteer group near K Hospital Tân Triều to hand out food and give flowers to mothers." },
    { date: "2026-10-18", title: "The 20/10 campaign (18–22 Oct)", text: "Posters and short videos that put the mothers at the centre. Each post ends with one action: send a message to your own mother, or support the mothers at K Hospital." },
    { date: "2026-10-20", title: "Vietnamese Women’s Day", text: "Dear Mom: we invite everyone to say thank you to the women who have taken care of them." },
    { date: "2026-10-31", title: "Report and website", text: "We publish what we did, what we learned and every expense." }
  ],

  // ===== Ảnh "Moments from our project" =====
  // Thêm ảnh: bỏ file vào thư mục images rồi thêm một dòng { src: "images/ten-anh.jpg", caption: "..." }.
  photos: [
    { src: "images/day-crowd-overpass.jpg", caption: "The crowd near Bệnh Viện K Tân Triều" },
    { src: "images/day-volunteer-handout.jpg", caption: "Volunteers handing out food" },
    { src: "images/day-team-setting-up.jpg", caption: "Setting out the food" },
    { src: "images/day-queue-from-above.jpg", caption: "Waiting along the pavement" },
    { src: "images/day-team-handing-fruit.jpg", caption: "Sharing fruit" },
    { src: "images/day-carers-resting.jpg", caption: "A short rest on the pavement" },
    { src: "images/day-flower-gift.jpg", caption: "A flower for a mother" },
    { src: "images/day-interview.jpg", caption: "Interviews on the day" },
    { src: "images/day-listening.jpg", caption: "Listening to their stories" },
    { src: "images/day-flowers-together.jpg", caption: "Flowers for the women we met" },
    { src: "images/day-team-and-mothers.jpg", caption: "Our team with the women we met" }
  ],

  // ===== Journal: các bài report =====
  // authors: người viết. draft: true sẽ hiện nhãn "Draft".
  // body: mỗi phần tử là một khối:
  //   "chữ"                                   một đoạn văn
  //   { h: "..." }                            tiêu đề nhỏ
  //   { stat: "2,700", text: "...", source: "..." }   ô số liệu lớn
  //   { quote: "...", by: "..." }             trích dẫn
  //   { image: "images/...", caption: "..." } ảnh
  //   { video: "link YouTube", title: "..." } video (để trống link thì hiện "Coming soon")
  //   { table: { head: [...], rows: [[...], ...] } }  bảng
  //   { todo: "..." }                         khung nhắc người viết điền nội dung (chỉ nhóm cần đọc)
  //   { p: `chữ`, mark: ["cụm từ", ...] }      đoạn văn giữ nguyên chữ, tô sáng các cụm từ quan trọng (phải trùng y hệt)
  //   { person: "Tên", role: "...", title: "...", quote: "..." }   thẻ mở đầu phần viết của một người
  // audio: link file đọc bài (mp3...), hiện ở đầu bài. Để trống thì hiện "Voice reading coming soon".
  posts: [
    {
      slug: "real-reporting-at-k-hospital",
      kicker: "Report · Two perspectives",
      title: "Real reporting at Bệnh Viện K Tân Triều",
      standfirst: "On 17 October we joined a local volunteer group handing out food near the hospital. Two of us tell what we saw.",
      authors: ["Raine", "Thảo Linh"],
      date: "2026-10-17",
      image: "images/day-crowd-overpass.jpg",
      caption: "The crowd near Bệnh Viện K Tân Triều, 17 October 2026.",
      audio: "",
      draft: false,
      // Các đoạn văn dưới đây giữ NGUYÊN VĂN bài viết của Raine và Thảo Linh. Chỉ thêm tô sáng (mark), không sửa chữ.
      body: [
        { video: "", title: "Our report from the day" },

        { person: "Raine", role: "Storyteller, host & posters", title: "Raine’s View as a person from Phillipino.",
          quote: "A simple thank you to your mother would matter." },
        { p: `In Vietnamese we have a sentence: “Mẹ nuôi con biển hồ lai láng, con nuôi mẹ kể tháng kể ngày” where it is translated into “A mother raises her child with an ocean-like abundance, the child raises the mother counting months and counting days”. It is written as a custom being formed through generations of neglect and assumptions of a mother shall always give her everything to her child while receiving it back is an option for that child to make. This, even though it is normalized, clearly stated the position a woman is pushed into after entering motherhood. And we can clearly saw that on the day they we got to our destination: Bệnh Viện K Tân Triều.`,
          mark: ["receiving it back is an option for that child to make"] },
        { p: `"I will fight for my children on any level in order for them to be happy and have peace of mind and carry out their duties." A heartwarming quote from Princess Diana that conveys the essence and beauty of motherhood. On October 17th near Bệnh Viện K Tân Triều, local non-governmental organizations (NGOs) gathered near the hospital and brought different kinds of nutritious foods for the patients and the caretakers. Under the scorching heat, a group of women volunteered to help other people who can't fully support themselves - gave food to everyone that badly needs it even though those women were also going through something on their own. They chose to help the community and stand strong to become one of the pillars people could depend to even when the volunteering program happens just every week. These women shared what they have, they showed up for the people, and these actions and little gestures of help and compassion warms the people and gives hope to those who need it.`,
          mark: ["even though those women were also going through something on their own"] },
        { image: "images/day-volunteer-handout.jpg", caption: "A volunteer from the group hands out food packages." },
        { p: `Our team decided to join and volunteer with the purpose of experiencing first-hand the work they do every week to support people even in a simple way of giving foods. At the beginning, the sidewalk was filled with the crowd and the leader of the program was trying to organize the people and made announcements on how the food will be distributed so it will be fair to everyone. A bunch of people started coming to our spot and brought their own bags or plastics where they can put the foods they receive, some of them were from the hospital, some were patients, most of them were mothers. Amidst the high temperature, the power of altruism was displayed that afternoon. Our team helped in distributing the packages of food and took documentaries alongside the interviews with the mothers. During the interview, when a team member asked them questions, their eyes glistened as they were crying from answering, they look tired yet still able to bring themselves together, the exhaustion never came out to them until they were asked how they were doing.`,
          mark: ["most of them were mothers", "the exhaustion never came out to them until they were asked how they were doing"] },
        { image: "images/day-team-setting-up.jpg", caption: "Our team setting out the food." },
        { p: `The look in their eyes, the tears, the breathing, the smile that left their faces when they were given flowers by the team. It struck to me that moment, "She is a mother." We never really realize how heavy things are for them because they do it most of the time for their children and they keep themselves composed. However, during the interviews, I felt the warmth of seeing mothers doing what they can for now, even though the future is unpredictable, they fight, they choose to give hope, they choose to be hopeful, they choose to be brave, they choose to be a mother above everything else and nothing can steal that from them. They're going through a lot and it's different for everyone, however, mothers can conceal emotional, financial, physical turmoil to provide a presence they could give to their children. These attributes and a lot more proves how they should be valued more than ever. Being a woman and choosing to be a mother is a different level of commitment and compassion not everyone can provide. We know mothers are great but they should feel the words into their hearts and really embrace the value they have, not only as a human being but also by being a MOTHER.`,
          mark: ["We never really realize how heavy things are for them", "they should be valued more than ever"] },
        { p: `The current world situation focuses on who holds power over something or someone that creates a lot of conflict between people and different countries. We forget about the nurturing, pillars, and protector of children, women who chose to share and provide love to children: WOMEN. A mother. It’s not too late for everyone to start appreciating the human beings that protected a life in the womb for nine months. Give them love, the kind that warms them while they're also doing it for others, providing mothers with hope and words that will make them fight for what they need or want in this world, and appreciating them for choosing to be someone's mother even with the life-changing milestones they knew they were going to experience. A simple thank you to your mother would matter. Make everyday a mother's day!`,
          mark: ["A simple thank you to your mother would matter."] },

        { person: "Thảo Linh", role: "Project lead, video & report editor", title: "Thao Linh’s View",
          quote: "How can we make their voices be heard?" },
        { p: `As I was the one who talked to the program organizers, who were two women running this program, I learned that they came here around four to five times a week because they genuinely wanted to volunteer and help these people. I was connected to them through my mom, who had also once suffered from cancer. Because of her own experience, she wanted to spread love to people who were going through the same condition as her.`,
          mark: ["four to five times a week"] },
        { p: `Their story really touched me. These two women conducted a program where they gave out food and connected mothers who had sick children in the hospital wards. When I talked to them, they told me that the reason they did all of this was purely out of love. They wanted to create and spread love to people who were suffering. Even though they were poor themselves, they still wanted to do this. One of the women was even a street vendor, selling things on the street. Their loved ones had also suffered from cancer, and that was why they wanted to help other people going through the same thing.`,
          mark: ["Even though they were poor themselves, they still wanted to do this."] },
        { p: `I was actually driven there by a mother and her child, who were also friends of my mom. As she dropped me off, I started to realize that motherhood was right there in front of my face.`,
          mark: ["motherhood was right there in front of my face"] },
        { p: `When I arrived, I was shocked by the number of people there, especially the enormous number of women standing in rows and rows, waves and waves of people along the pavement. At that moment, my heart really sank. These women were of all ages. There was a child who was bald, holding his mother's hand. There were people around my age standing there to collect food for their loved ones. There were also mothers who were even older than my own mom, some around my grandmother's age, standing there all alone, waiting for food and someone to help them.`,
          mark: ["the enormous number of women standing in rows and rows, waves and waves of people along the pavement"] },
        { image: "images/day-queue-from-above.jpg", caption: "Waiting along the pavement near the hospital." },
        { p: `These people were connected through a Zalo group created by the two women I mentioned, who were also featured in the video clip. Our team donated food, helped prepare it, and distributed it to the people there.` },
        { image: "images/day-carers-resting.jpg", caption: "A short rest on the pavement." },
        { p: `At first, the process felt very harsh because the organizers had to determine whether the people receiving the food were actually eligible to receive it. For example, they had priorities. Mothers with children or people who had severely ill family members would receive more food than others. What surprised me was that these two women seemed to remember everyone. There were around a hundred people, yet they remembered their cases and their names. They knew who was related to whom, who was the patient, who was not, and things like that. They were especially strict about what they gave and who they gave it to. At first, I thought, "Oh my God, this is so sad," because they were refusing to serve some people. But as I talked to them, I realized that this hospital hosted so many patients that, if they did not do this, the people who needed the food the most might not have access to it. That was the reason why they had to be so strict. At the same time, when it came to people they knew were struggling, these women were extremely kind.`,
          mark: ["There were around a hundred people, yet they remembered their cases and their names.", "the people who needed the food the most might not have access to it"] },
        { p: `After the distribution session ended, we had some time to talk to the people there. I asked one of the women organizing the program about the different cases. She pointed to a circle of people and explained that they were mothers whose children were very sick and could barely walk. A large portion of the money and resources was distributed to those mothers.` },
        { p: `She then connected me to a mother who was also featured in the video. We talked about her situation, and she told me that when we gave her a flower, she started crying. It had been such a long time since someone had given her flowers.`,
          mark: ["It had been such a long time since someone had given her flowers."] },
        { image: "images/day-flower-gift.jpg", caption: "A flower for a mother. We did not show her face." },
        { p: `She told me that her daughter was severely ill. I asked her, "So, what is your wish right now, at this moment in your life?"` },
        { p: `Maybe if it were me, I would be selfish and wish for something for myself. But she was a mother, and her only wish was for her child to recover from the sickness. Nothing else. She cried as she told me that it had been a long time since she had been able to take a day for herself. She was so thankful for the flowers and everything we had done. We did not dare to point the camera to her face while she was dealing with her emotion, so it’s just her voice you can listen to here.`,
          mark: ["her only wish was for her child to recover from the sickness. Nothing else.", "it had been a long time since she had been able to take a day for herself"] },
        { video: "", title: "Her voice (audio only, we did not film her face)" },
        { p: `I asked her whether I could help her get some money through donations, even if it was just a small amount. She said yes and gave me her contact information.` },
        { p: `However, when I went back to the woman who had connected us to the program, we asked her whether we could help fund the program by sharing their bank account QR code online. She declined. The reason was that she only trusted people who genuinely wanted to help, people who knew her personally and understood her work. She called this destiny (as I understood it from our conversation). For example, even though my mom had not contributed much to the group, she still remembered her because of her donations and the connection between them. That was why she had agreed to meet our team in the first place.`,
          mark: ["she only trusted people who genuinely wanted to help"] },
        { p: `Then we talked to another woman, whose story struck me because it was completely different from the first mother's.` },
        { p: `She was an old woman from the countryside. She had been here for one or two years, all by herself, going through diagnoses, surgeries, and everything else that came with her illness. She told me that she had children and a husband, but her children lived too far away, and she did not want to become a burden to her family. So she chose to go through everything alone.`,
          mark: ["she did not want to become a burden to her family. So she chose to go through everything alone."] },
        { p: `Her eyes had been severely affected by cancer, and her face had also been affected. She was around my grandmother's age. As she cried while telling me her story, I was struck by how different her situation was from that of the mother who was doing everything she could for her child.` },
        { p: `In the first case, a mother was willing to give everything for her child. In this case, her own children had seemingly neglected her, even though she was suffering from a dangerous form of cancer.`,
          mark: ["her own children had seemingly neglected her"] },
        { p: `And that made me think about my own mom when she was trying to fight cancer. While she was going through that, I was here at university, attending my courses and not having much time to spend with her. It was almost the same situation. I had been so blind to her suffering, and now I was only able to see it through the story of another woman.`,
          mark: ["I had been so blind to her suffering, and now I was only able to see it through the story of another woman."] },
        { p: `That realization made me feel bad, but it also made me feel that I wanted to create something and contribute something meaningful to this society.` },
        { p: `And then we continued talking about more of the mothers' stories there, they showed us the pictures of the children who have recieved our gifts and it was… well, hard to watch. Not because I was scared, but the unbarable emotional waves. If that's the reaction of a stranger how would their carers face that truth that their loved one is now suffering. Why were their voices not heard, why are we now only know about these mothers here. And that could not relate more to the case that we're doing here. The only question now is: "How can we make their voices be heard?"`,
          mark: ["Why were their voices not heard", "\"How can we make their voices be heard?\""] }
      ],
      sources: []
    },
    {
      slug: "working-with-the-student-council",
      kicker: "Partnership",
      title: "Working with the VinUniversity Student Council",
      standfirst: "In collaboration with the VinUniversity Student Council, to treasure the ones who care for others.",
      authors: ["Thảo Linh"],
      date: "2026-10-27",
      image: "",
      caption: "",
      draft: true,
      body: [
        { quote: "In collaboration with the VinUniversity Student Council, to treasure the ones who care for others." },
        { h: "Why a student council" },
        "Our main track is about how young people see and treat the care work of their own mothers. A student council speaks to exactly those people, every day, on our own campus. Working together moves Care for the Carers from one team’s project to something a whole student community can take part in.",
        { h: "How it started" },
        { todo: "Thảo Linh: how you first contacted the Student Council, who you worked with, and what you proposed." },
        { h: "What we did together" },
        { todo: "What the Student Council did: sharing the campaign, events, letters to mothers, fundraising. Add numbers if you have them." },
        { h: "Proof of the collaboration" },
        { todo: "Add a screenshot of the collaboration email as { image: \"images/sc-email.jpg\", caption: \"...\" }. Hide personal email addresses and phone numbers first." },
        { h: "What comes next" },
        { todo: "How the collaboration can continue after the course, for example a yearly 20/10 or 8/3 moment on campus." }
      ],
      sources: []
    },
    {
      slug: "the-work-no-one-sees",
      kicker: "Deep research · The main problem",
      title: "The work no one sees",
      standfirst: "Caregiving is the work that holds every family together, yet it is rarely seen, paid or thanked.",
      authors: ["Hà Dương", "Thảo Linh"],
      date: "2026-10-25",
      image: "images/campaign-her-name.jpg",
      imageTall: true,
      caption: "From our campaign: “Gửi mẹ. Since when did you lose your own name?”",
      draft: true,
      body: [
        { h: "When does someone lose their identity?" },
        "This is such a weird question to ask because we only think of “losing identity” as a severe neuropsychology problem. But for many, it is a dated sentence that they have to face. Experiencing this process has been normalized to the point that we totally forgot about their existence.",
        { image: "images/campaign-who-is-your-mom.jpg", tall: true, caption: "From our campaign: “Who is your mother?”" },
        "Let us prove this in a simple question: How many times have you looked at your mother and asked yourself “What could her name tell about her besides just a mother of yours?” and “Since when did her name not belong to herself anymore?”. There is a name for this process: Matrescence, the process of becoming a mother, first proposed by medical anthropologist Dana Raphael (1970) and developed by Aurelie Athan as “a deep identity change, not just postpartum depression” (Athan & Bastidas, 2021).",
        { image: "images/campaign-matrescence.jpg", tall: true, caption: "From our campaign: what matrescence means." },
        { stat: "2 in 3", text: "of 2,000 British mothers said they felt they had lost part of their identity.", source: "PRNewswire, 2023" },
        { image: "images/campaign-2000-mothers.jpg", tall: true, caption: "From our campaign: “Becoming a mother is not only becoming a mother.”" },
        { quote: "It seems crazy, but I was not prepared for the profound journey of matrescence. This isn’t talked about enough.", by: "A mother, in a survey by PANDA" },
        "Society tends to dismiss someone’s pain just because it is a collective shift, especially when it is a woman. A woman whom every aspect of her is only split into before her child and after her child.",
        { h: "A norm passed down through generations" },
        "In Vietnamese we have a sentence: “Mẹ nuôi con biển hồ lai láng, con nuôi mẹ kể tháng kể ngày” where it is translated into “A mother raises her child with an ocean-like abundance, the child raises the mother counting months and counting days”. It is written as a custom being formed through generations of neglect and assumptions of a mother shall always give her everything to her child while receiving it back is an option for that child to make. This, even though it is normalized, clearly stated the position a woman is pushed into after entering motherhood.",
        { h: "Why it is an ethical problem" },
        "Ethics of Care. Unlike traditional ethics, this framework (Gilligan, Noddings, Tronto) grounds morality in relationships and dependency. Mothers provide relentless, unpaid care but receive none in return. This violates Eva Feder Kittay’s principle of doulia: the idea that those who care for dependents possess a fundamental right to be cared for themselves. “Care for the Carers” operationalizes this by actively noticing and supporting the caregiver.",
        "Recognition (Fraser; Honneth). Mothers are not recognized as a group with distinct needs, as all institutional empathy and resources are funneled solely toward the child.",
        "Gender. Society treats this extreme sacrifice as a mother’s “natural duty,” exploiting patriarchal norms to avoid providing systemic support.",
        { table: {
          head: ["Track", "Ethical frameworks"],
          rows: [
            ["A · Social media (main, systemic)", "Ethics of Care (caring for the carer), Recognition justice (making care work visible), Gender justice (challenging the “natural duty” norm)"],
            ["B · K Hospital funding (live proof)", "Distributive justice (redirecting resources to the most burdened carers), CSR inside-out / outside-in and Creating Shared Value"]
          ]
        } },
        "Recognition without resources is empty; resources without recognition do not change the norm.",
        { image: "images/campaign-more-than-mom.jpg", tall: true, caption: "From our campaign: “Mom is more than ‘mom’.”" },
        { todo: "Hà Dương: add evidence on unpaid care work by women and mothers in Vietnam and globally, its economic value and the recognition gap (e.g. ILO / UN Women / GSO). Verify and cite each figure." }
      ],
      sources: ["Raphael, D. (1970)", "Athan, A., & Bastidas, G. (2021)", "PRNewswire (2023)", "Kittay, E. F.", "Fraser, N.; Honneth, A.", "Gilligan, C. (1982); Noddings, N. (1984); Tronto, J."]
    },
    {
      slug: "the-most-extreme-case",
      kicker: "Deep research · Why K Hospital",
      title: "The most extreme version of a problem in every home",
      standfirst: "At K Hospital Tân Triều we saw the most extreme version of a problem that exists in almost every home. This is why the two tracks belong together.",
      authors: ["Quang Khánh", "Hà Dương"],
      date: "2026-10-25",
      image: "images/day-flowers-together.jpg",
      caption: "With women we met near K Hospital Tân Triều.",
      draft: true,
      body: [
        "We first went to K Hospital to help sick children. What we found was a bigger, quieter problem: the care work of mothers, unpaid and unseen, which is at its most extreme there but exists in every home.",
        { stat: "2,700", text: "new pediatric cancer cases are recorded in Vietnam every year.", source: "VNA, 2022" },
        { stat: "266", text: "new children a year, on average, were admitted to K Hospital’s Tân Triều campus from 2017 to 2021.", source: "Do et al., 2024" },
        { stat: "176 million VND", text: "average cancer treatment cost per patient per year at K Hospital; health insurance covered only about 29%.", source: "SGGP, 2023" },
        { stat: "40%+", text: "of cancer caregivers worldwide are affected by clinical depression and anxiety. Mothers often spend over nine hours a day caregiving.", source: "Joshi et al., 2025; Psicología y Salud, 2014" },
        "Behind every child is a primary caregiver, overwhelmingly the mother, carrying an immense unseen burden. A survey at Vietnam’s Children’s Hospital 2 echoes this, showing caregivers scoring distressingly low on freedom from hopelessness and anxiety.",
        "This emotional strain is worsened by severe financial hardship, especially for rural families. Yet, public attention and charity remain almost exclusively child-centric. Mothers forfeit their income and put their own needs last. Society normalizes this extreme sacrifice through the lens of matrescence (the transition into motherhood), treating it as a natural duty and rendering the mother’s struggle invisible.",
        { h: "Why did the problem happen?" },
        "The problem mainly comes from traditional gender expectations, financial pressure, emotional stress, and a lack of support for caregivers. In Vietnamese society, mothers are often expected to take primary responsibility for caring for their children, especially when a child is seriously ill. At the same time, most medical and social attention focuses on the children receiving treatment, while the emotional and physical needs of their mothers receive less recognition. As a result, mothers’ sacrifices are often treated as normal responsibilities rather than struggles that deserve attention and support.",
        { h: "How the two problems are connected" },
        "K Hospital is live proof. It shows people that these mothers can be supported, paid, and helped. This gives the campaign a real, visible example to promote. Social media is systemic change. It changes how people perceive caregiving, which in turn changes how the public views the work at K Hospital.",
        "Each track strengthens the other: the hospital project gives the campaign credibility, and the campaign builds the awareness that makes the hospital project matter to more people.",
        "Supporting carers also helps the children they look after: parents’ distress peaks around diagnosis and can affect how the child copes (Kearney et al., 2015). But that is a supporting reason. The main one is that their work is real, unpaid and unseen.",
        { h: "Has the problem been solved?" },
        "Not yet. Care work is still largely unpaid and unrecognised. Our K Hospital track showed, on a small scale, that carers can be supported and paid when people are given a concrete way to help. Our social media track started changing how young people see and treat the care work of their own mothers. Lasting change needs both: resources for the most burdened carers and a new social norm for everyone.",
        { todo: "Quang Khánh: review what others already do (hospital social work, volunteer groups like Ms X & Ms Y’s, charity funds, policy) and name the gap." }
      ],
      sources: ["VNA (2022)", "Do et al. (2024)", "SGGP (2023)", "Joshi et al. (2025)", "Psicología y Salud (2014)", "Kearney et al. (2015)"]
    },
    {
      slug: "what-we-learned",
      kicker: "Reflection",
      title: "What we learned",
      standfirst: "What actually shifted how people see their mothers’ care, what only got likes, and what we would do differently.",
      authors: ["Thảo Linh", "Raine"],
      date: "2026-10-28",
      image: "images/day-interview.jpg",
      caption: "Interviewing on the day.",
      draft: true,
      body: [
        { h: "From the social media track" },
        { image: "images/campaign-poster-mom.jpg", tall: true, caption: "Our campaign poster: “Ăn cơm chưa con?” means “Mẹ thương con.”" },
        { todo: "Thảo Linh: what we did, what shifted perception and what only got likes, and how audiences responded to our personal videos with our mothers." },
        { h: "From the K Hospital track" },
        { todo: "What it took to get support to the mothers, and what Ms X & Ms Y taught us." },
        { h: "An honest look at ourselves" },
        { todo: "Consent and dignity when filming mothers in distress, avoiding the saviour story, and whether our own messages slipped back into praising endless sacrifice." }
      ],
      sources: []
    },
    {
      slug: "thank-you-from-the-team",
      kicker: "Letters",
      title: "Thank you, from the five of us",
      standfirst: "Each of us wrote to the women who have taken care of us.",
      authors: ["Thảo Linh", "Hà Dương", "Khánh Ngọc", "Quang Khánh", "Raine"],
      date: "2026-10-28",
      image: "images/day-team-and-mothers.jpg",
      caption: "Our team with the women we met on 17 October.",
      draft: true,
      body: [
        { quote: "Words are not enough to describe the gratitude this world owes every mother and the womanhood that comes with it. Carrying a life for 9 months and nurturing kids to become a responsible adult is a priceless job, a paycheck of a lifetime. It’s not simple, even just deciding if you want to be a mother or not is not an easy feat. I have great respect for women who love their children and who became a mother until their death bed. For the women not only in this lifetime but also for the women who paved the way and gave birth to amazing people, THANK YOU! Women will always have a special place in my heart, especially mothers. I value you, I appreciate you, and being a woman is the greatest thing!", by: "Raine, “To My Beloved and Respected Women”" },
        { todo: "Thảo Linh, Hà Dương, Khánh Ngọc, Quang Khánh: add your letters." }
      ],
      sources: []
    }
  ],

  // ===== Quyên góp + sao kê =====
  // Thông tin ngân hàng dưới đây vẫn là DỮ LIỆU MẪU, cần thay bằng tài khoản thật.
  bank: { name: "Your Bank Name", holder: "NGUYEN VAN A", number: "0123456789" },
  goal: 5000000, // mục tiêu quyên góp (VND)
  // type: "in" = tiền nhận, "out" = tiền chi. proof: ảnh bằng chứng (ví dụ "images/proof-1.jpg"), để trống nếu chưa có.
  entries: [
    { date: "17/10/2026", text: "Contributions from team members", type: "in", amount: 2500000, proof: "" },
    { date: "17/10/2026", text: "Sent to our partner volunteer group", type: "out", amount: 2000000, proof: "" },
    { date: "17/10/2026", text: "Flowers for mothers near K Hospital", type: "out", amount: 500000, proof: "" }
  ]
};
