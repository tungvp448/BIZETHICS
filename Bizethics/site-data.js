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
    { name: "Thảo Linh", role: "Project lead, video, research & website support" },
    { name: "Hà Dương", role: "Budget, website & logistics" },
    { name: "Khánh Ngọc", role: "Timeline & executive summary" },
    { name: "Quang Khánh", role: "Research, results & build" },
    { name: "Raine", role: "Storyteller, reporter, host & posters" }
  ],

  // ===== Mạng xã hội =====
  socials: [
    { name: "TikTok", handle: "@dearm0m___", url: "https://www.tiktok.com/@dearm0m___" },
    { name: "Instagram", handle: "@dearm0m___", url: "https://www.instagram.com/dearm0m___/" },
    { name: "Threads", handle: "@dearm0m___", url: "https://www.threads.com/@dearm0m___" }
  ],

  // ===== Số liệu =====
  // value: số (tự đếm lên khi cuộn tới), hoặc text: con số viết sẵn như "~500", "2,000+". Không có cả hai thì hiện "Updating".
  // sub: dòng chú thích nhỏ dưới con số.
  // target: mục tiêu trong kế hoạch (Impact measures trong Docs). updated: ngày cập nhật (YYYY-MM-DD).
  // Track A: chiến dịch mạng xã hội (chính)
  socialStats: [
    { label: "Views across TikTok, Instagram and Threads", text: "2,800+", sub: "as of 28 Oct 2026" },
    { label: "TikTok views", text: "2,000+", sub: "4 posts · nearly 100 interactions" },
    { label: "Instagram views", text: "~500", sub: "nearly 100 interactions" },
    { label: "Interactions across all three", text: "~220", sub: "TikTok, Instagram and Threads (5 posts on Threads)" }
  ],
  // Track B: hỗ trợ ở viện K Tân Triều ngày 17/10 (theo Executive Summary của nhóm)
  hospitalStats: [
    { label: "Contributed to the local volunteer group (VND)", value: 2000000, sub: "fresh meals and essential supplies for hospital families" },
    { label: "Spent on flowers (VND)", value: 600000, sub: "for mothers near the hospital" },
    { label: "Meal portions distributed on 17 Oct", text: "~500", sub: "with the local volunteer group" },
    { label: "Mothers who may have received support", text: "50–100", sub: "our estimate, not formally counted or verified" }
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

  // ===== Bài đăng của chiến dịch mạng xã hội (hiện ở phần Dear Mom trên trang chủ) =====
  campaignPosts: [
    { src: "images/campaign-her-name.jpg", caption: "Gửi mẹ: since when did you lose your own name?" },
    { src: "images/campaign-card-com-chua.jpg", caption: "“Ăn cơm chưa con?” means “Mẹ thương con.”" },
    { src: "images/campaign-2000-mothers.jpg", caption: "Becoming a mother is not only becoming a mother" }
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
    // Hai bài dưới đây giữ NGUYÊN VĂN nội dung nhóm cung cấp. Chỉ thêm tô sáng (mark), không sửa chữ.
    {
      slug: "executive-summary",
      kicker: "Executive summary",
      title: "Executive Summary",
      standfirst: "A summary of the whole Care for the Carers project: what we did, what we found, and what we have not yet proven.",
      authors: ["Khánh Ngọc"],
      date: "2026-10-28",
      image: "images/day-team-handing-fruit.jpg",
      caption: "Our team at the food distribution near K Hospital Tan Trieu, 17 October 2026.",
      draft: false,
      body: [
        { p: `Care for the Carers is a social impact project developed by VinUniversity students for the MANA3021 Business Ethics course. It addresses the widespread lack of recognition and support for unpaid caregiving, particularly the work performed by mothers. Although caregiving is essential to family life, it is often treated as an expected responsibility rather than meaningful work deserving recognition, shared responsibility, and fair support. The project therefore aims to address both the everyday attitudes that make care work invisible and the practical needs of caregivers experiencing particularly demanding circumstances.`,
          mark: ["It addresses the widespread lack of recognition and support for unpaid caregiving, particularly the work performed by mothers."] },
        { p: `The project draws on three ethical frameworks: Care Ethics, Justice, and Utilitarianism. Care Ethics highlights the importance of understanding and responding to caregivers’ needs; Justice raises questions about the fairness of caregiving expectations and the recognition of unpaid work; and Utilitarianism encourages consideration of how public awareness and practical assistance can contribute to overall well-being. Together, these frameworks inform an approach that combines social awareness with direct support rather than relying on a single charitable activity.`,
          mark: ["Care Ethics, Justice, and Utilitarianism", "combines social awareness with direct support"] },
        { p: `The project operates through two parallel, mutually reinforcing initiatives. The main initiative, Dear Mom, is a social media campaign aimed at children and young people. It encourages them to recognise their own mothers’ caregiving as real work, express appreciation, share household and care responsibilities, and pay attention to their mothers’ needs and personal aspirations. The supporting initiative provides practical assistance to caregivers at K Hospital Tan Trieu, where the pressures associated with caring for children undergoing cancer treatment make the need for support particularly visible. The hospital activity gives the campaign a concrete example of caregivers’ circumstances, while the campaign seeks to broaden public understanding of the issue beyond the hospital.`,
          mark: ["The main initiative, Dear Mom, is a social media campaign aimed at children and young people.", "The supporting initiative provides practical assistance to caregivers at K Hospital Tan Trieu"] },
        { p: `On 17 October 2026, the team participated in a volunteering activity at K Hospital Tan Trieu. It contributed VND 2,000,000 to a local volunteer group that prepares fresh meals and provides essential supplies for hospital families, spent VND 600,000 on flowers, and helped distribute nearly 500 meal portions that day. Based on visual observations and conversations during the visit, the team estimated that approximately 50–100 mothers may have received support; this figure was not formally counted or independently verified. The contribution supported the volunteer group’s work and did not constitute direct wage payments to mothers.`,
          mark: ["contributed VND 2,000,000", "spent VND 600,000 on flowers", "helped distribute nearly 500 meal portions", "this figure was not formally counted or independently verified"] },
        { p: `The social media campaign generated initial online reach. As of 28 October 2026, its TikTok account had published four posts with more than 2,000 views and nearly 100 interactions. Instagram recorded approximately 500 views and nearly 100 interactions, while the new Threads account had five posts with approximately 300 views and nearly 20 interactions. The project website provides information about the initiative, features communications content related to K Hospital, and allows visitors to donate directly. Posts connect the campaign’s message with the hospital initiative and direct audiences towards the website. Although donations have been invited, the amount received through the website has not been confirmed. The available figures demonstrate initial exposure and engagement, but the team has no additional confirmed evidence of changes in public attitudes or behaviour.`,
          mark: ["more than 2,000 views and nearly 100 interactions", "the amount received through the website has not been confirmed"] },
        { p: `Ethical responsibility also shaped the team’s approach to communicating the project. The team sought permission before taking or publishing photographs and videos, took steps to protect individuals’ privacy, and aimed to maintain transparency in reporting project expenditure and fundraising information. These considerations are important when communicating about people experiencing difficult circumstances: their stories should be treated with dignity, and their experiences should not be used merely to attract attention or engagement.`,
          mark: ["their stories should be treated with dignity"] },
        { p: `Looking ahead, the team plans to continue publishing social media content and maintaining the website as a channel for project information and potential contributions. The two initiatives are designed to reinforce one another: practical support demonstrates how caregivers’ needs can be addressed through concrete action, while public awareness encourages young people to reconsider how they value and share caregiving responsibilities. However, the project has not yet established a measurable link between online engagement and donations, nor demonstrated lasting changes in behaviour. Its current results should therefore be understood as an initial step towards a longer-term goal: making care work more visible, valued, and fairly supported in everyday life.`,
          mark: ["making care work more visible, valued, and fairly supported in everyday life"] }
      ],
      sources: []
    },
    {
      slug: "the-work-no-one-sees",
      kicker: "Problem statement & deep research",
      title: "The work no one sees",
      standfirst: "Caregiving is the work that holds families together, yet it is often invisible, unpaid, and insufficiently recognised.",
      authors: ["Thảo Linh", "Khánh Ngọc", "Hà Dương"],
      date: "2026-10-28",
      image: "images/day-listening.jpg",
      imageTall: true,
      caption: "Listening to the women we met near K Hospital Tân Triều.",
      draft: false,
      // Nội dung giữ NGUYÊN VĂN bài của nhóm. Chỉ thêm tiêu đề mục, tô sáng (mark), bảng và danh sách cho dễ đọc.
      body: [
        { toc: "In this article" },
        { h: "Problem Statement" },
        { p: `Caregiving is the work that holds families together, yet it is often invisible, unpaid, and insufficiently recognised. Across many households, mothers take on substantial daily responsibilities, from managing household needs to providing emotional support for family members. Because these responsibilities are often treated as a natural part of being a mother rather than meaningful work, their time, effort, and personal needs can easily be overlooked. Children and young people may benefit from their mothers’ care without fully recognising the work involved or considering how they can contribute to these responsibilities themselves.`,
          mark: ["Caregiving is the work that holds families together, yet it is often invisible, unpaid, and insufficiently recognised."] },
        { p: `This issue raises an important ethical question: why is care work essential to family life, yet so often taken for granted? When mothers are expected to prioritise others continually, their own well-being, identities, and aspirations may receive insufficient attention. From the perspective of care ethics, ethical responsibility involves recognising relationships, understanding people’s needs, and responding with care. Justice draws attention to the unequal distribution and insufficient recognition of unpaid caregiving, while utilitarianism encourages consideration of how actions can improve overall well-being. Together, these perspectives suggest that addressing the issue requires more than occasional expressions of gratitude; it requires greater recognition of care work and more equitable sharing of caregiving responsibilities.`,
          mark: ["why is care work essential to family life, yet so often taken for granted?", "it requires greater recognition of care work and more equitable sharing of caregiving responsibilities"] },
        { p: `At K Hospital Tan Trieu, the challenges faced by mothers caring for children with cancer provide a particularly visible example of this broader issue. These mothers may spend extended periods supporting their children through treatment while managing emotional strain, financial pressures, and disruptions to their own lives. Their circumstances make them a relevant group for practical support, but the underlying problem extends beyond the hospital to families and communities more broadly. Their experiences illustrate why caregivers’ needs deserve attention alongside those of the people receiving care.`,
          mark: ["a particularly visible example of this broader issue", "the underlying problem extends beyond the hospital"] },
        { p: `In response, Care for the Carers adopts two parallel and complementary approaches. The main initiative, the social media campaign Dear Mom, seeks to encourage children and young people to recognise their own mothers’ caregiving as real work, express appreciation, share household and care responsibilities, and take an interest in their mothers’ needs and aspirations. Alongside this, the project provides practical support to caregivers at K Hospital Tan Trieu through contributions to a local volunteer group, food distribution, and flowers. The hospital initiative provides a tangible example of caregivers’ circumstances, while the broader campaign seeks to challenge the attitudes that can make their work invisible in everyday life.`,
          mark: ["two parallel and complementary approaches", "the social media campaign Dear Mom"] },
        { p: `The project also recognises that raising awareness must be accompanied by responsible action. Its website provides information about the initiative and allows visitors to contribute through donations, creating a potential connection between public engagement and practical support. However, the amount received through the website has not been confirmed, and the project has not established that it has changed public attitudes or behaviour. Its activities should therefore be understood as an initial effort to promote recognition and provide assistance, rather than proof of systemic change.`,
          mark: ["raising awareness must be accompanied by responsible action", "rather than proof of systemic change"] },
        { p: `Through these two initiatives, Care for the Carers aims to move beyond one-off expressions of gratitude towards a more sustained recognition of care work. The project did not establish a wage-payment system for mothers it also seeks to draw attention to the wider question of how unpaid care work can receive greater social recognition and support.`,
          mark: ["move beyond one-off expressions of gratitude towards a more sustained recognition of care work"] },
        { h: "Deep research: how we found the problem" },
        { p: `When we looked into the ethical problems around children treated at the National Cancer Hospital (Bệnh viện K), we noticed a group that is essential but mostly overlooked: the carers of sick children, most often their mothers. They are the link that holds the whole system of care together. They stay in the ward for months, give up their income, and put their own needs last, yet public attention and charity focus almost entirely on the child and hence recognise an also vulnerable group: mothers.` },
        { p: `This is not only our impression. The Standards of Psychosocial Care for Parents of Children with Cancer make a strong recommendation that parents receive early and ongoing mental-health support. The authors reviewed 138 studies. They found that parents’ distress peaks around diagnosis, and that a distressed parent can affect how the child copes (Kearney et al., 2015). Caring for the carer is therefore not a side project. It is one of the most direct ways to care for the child.`,
          mark: ["The authors reviewed 138 studies."] },
        { p: `While contacting different stakeholders for support, we met Ms. Dung and Ms. Thanh. These two independent women started a volunteer group for patients and parents of children with cancer after a family member of their own had cancer. Having gone through the same story with them, we were delighted to work with them, gain access to the ward, and listen to what the families actually needed.` },
        { p: `After listening to the mothers’ stories (described in detail in Section 5), we kept coming back to one thought: they reminded us of our own mothers. Everything that the mothers sacrificed, our mother also sacrifices: time, youth, passion, her life. It is everywhere, in everyone, yet no one sees it.`,
          mark: ["It is everywhere, in everyone, yet no one sees it."] },
        { h: "Our core argument: why two tracks" },
        { p: `This widened our view beyond the group we first set out to help.` },
        { p: `We can either keep helping one ward at a time, or change how society treats carers everywhere. We chose to do both.`,
          mark: ["We chose to do both."] },
        { p: `We also realised that lasting change will not come from one visit or one donation, but from a shift in how everyone treats the carers in their own lives. That is why our main track is a social media campaign, Dear Mom: a small, repeatable action anyone can take, saying thank you this 20/10 to the women who have taken care of us. Alongside it runs our K Hospital track, which shows that carers can be supported when people are given a concrete way to help.`,
          mark: ["lasting change will not come from one visit or one donation", "our main track is a social media campaign, Dear Mom"] },
        { p: `In this project, we tell the stories of the mothers who most need help, through their own eyes in the hospital. We then apply what we learnt from them to design a more systematic change that encourages everyone to recognise and care for the carers in their own lives in hope of creating a domino effect to encourage everyone to care for any carers at all.`,
          mark: ["design a more systematic change"] },
        { p: `Before getting into more specific local ethical issues, let’s go through the universal collective experience that could explain the underlying psychological factors of why this issue happened in the first place:` },
        { h: `“When does someone lose their identity?”` },
        { p: `This is such a weird question to ask because we only think of "losing identity” as a severe neuropsychology problem. But for many, it is a dated sentence that they have to face. Experiencing this process has been normalized to the point that we totally forgot about their existence.` },
        { p: `Let us prove this in a simple question: How many times have you looked at your mother and asked yourself “What could her name tell about her besides just a mother of yours?” and “Since when did her name not belong to herself anymore?”. There is a name for this process: Matrescence - the process of becoming a mother, first proposed by medical anthropologist Dana Raphael (1970) and developed by Aurelie Athan as “a deep identity change, not just postpartum depression” (Athan. A., Bastidas. G., 2021).`,
          mark: ["“Since when did her name not belong to herself anymore?”"] },
        { p: `On a survey made by PANDA in 2025, a mother shared her thought: “It seems crazy, but I was not prepared for the profound journey of matrescence. This isn't talked about enough”. In a survey linked to that study, of 2,000 British mothers, two-thirds of them said they felt they have lost part of their identity (PRNewswire, 2023). Society tends to deceive someone’s pain just because it is a collective shift, especially when it is a woman. But it will haunt you one day a horrifying truth that your women have lived a life you forced them to live. A woman whom every aspect of her is only split into before her child and after her child.`,
          mark: ["two-thirds of them said they felt they have lost part of their identity"] },
        { p: `If the simple fact of hundreds of thousands women suffering from mental illnesses still doesn’t sound like an ethical problem to you simply because you too, like many people,  have confronted the patriarchy system, then let’s go through what “more ethical” problems this can raise.` },
        { h: "Layer 1: The wider problem. Care is work, but it is rarely treated as work" },
        { p: `Worldwide, about 16.4 billion hours of unpaid care work are done every day, the equivalent of 2 billion people working eight-hour days with no pay. Valued at an hourly minimum wage, this would be about 9% of global GDP (US$11 trillion) (ILO, 2018). Women perform 76.2% of these hours, more than three times as much as men, and 80% in Asia and the Pacific (ILO, 2018). The cost lands on women’s livelihoods: ILO’s 2024 estimates, drawn from 125 countries, count 708 million women, against 40 million men, who are outside the labour force because of unpaid care responsibilities (ILO, 2024). Change is slow: at the pace seen in countries with trend data, the gender gap in unpaid care would take about 210 years to close (ILO, 2018).`,
          mark: ["16.4 billion hours of unpaid care work are done every day", "Women perform 76.2% of these hours", "708 million women", "about 210 years to close"] },
        { p: `Vietnam follows the same pattern. Women spend about 15.5 hours a week on unpaid care work, almost double the 8.75 hours men spend, and the value of this work is estimated at up to 20% of GDP, yet it is largely absent from official economic measures (UN Women and Ministry of Home Affairs workshop, 8 Oct 2026). Vietnam’s first national time-use survey (World Bank with GSO, 2022; 6,000 respondents) found that women spend about three hours a day on housework against 1 hour 42 minutes for men, and that 45% of women take part in family care work versus 24% of men. The norm behind these numbers is strong: 96% of respondents in a survey presented at the workshop agreed that child care is inherently a woman’s responsibility.`,
          mark: ["Women spend about 15.5 hours a week on unpaid care work", "up to 20% of GDP", "96% of respondents"] },
        { p: `This is the recognition gap at the centre of our problem. The work is real, demanding and economically valuable, yet it is unpaid, uncounted and treated as a “natural duty”. The ILO’s own policy frame calls for recognising, reducing and redistributing unpaid care work. It also makes the “paid” angle of our funding track concrete: if care work has economic value, paying carers is not charity but payment for work that is already being done.`,
          mark: ["This is the recognition gap at the centre of our problem."] },
        { h: "Layer 2: K Hospital, the most severe case" },
        { p: `Within this picture, mothers caring for children with cancer carry some of the heaviest loads. Vietnam records around 2,700 new pediatric cancer cases a year (VNA, 2022). K Hospital’s Tan Trieu campus is the busiest cancer hospital in the country, and its pediatric admissions have risen steadily, averaging about 266 newly admitted children a year from 2017 to 2021 (Do et al., 2024).`,
          mark: ["around 2,700 new pediatric cancer cases a year", "about 266 newly admitted children a year"] },
        { image: "images/day-queue-from-above.jpg", caption: "Waiting along the pavement near K Hospital Tân Triều, 17 October 2026." },
        { p: `Behind every child is a primary caregiver, overwhelmingly the mother. International studies reveal the toll: mothers often spend more than nine hours a day on caregiving, and clinical depression and anxiety affect over 40% of cancer caregivers worldwide (Joshi et al., 2025; Psicología y Salud, 2014). A survey at Vietnam’s Children’s Hospital 2 echoes this, with caregivers scoring very low on freedom from hopelessness and anxiety. Financial hardship adds to the strain, especially for rural families. Mothers give up their income and put their own needs last, while public attention and charity stay almost entirely child-centred. Society normalises this sacrifice through the lens of matrescence (the transition into motherhood), treating it as a natural duty and making the mother’s struggle invisible.`,
          mark: ["more than nine hours a day on caregiving", "over 40% of cancer caregivers worldwide"] },
        { image: "images/day-carers-resting.jpg", caption: "A short rest on the pavement near the hospital." },
        { p: `At K Hospital, then, we see the care work described above in its most intense and least visible form, and the group with the greatest need for support. That is why these mothers are our representative group for funding. They illustrate the problem; they are not the whole of it.`,
          mark: ["They illustrate the problem; they are not the whole of it."] },
        { h: "2. What ethical issues does it touch?" },
        { p: `Our core claim is that carers deserve care and recognition for their own sake: their work is real, demanding, unpaid and unseen. The frameworks below are read through that claim.`,
          mark: ["carers deserve care and recognition for their own sake"] },
        { p: `Ethics of Care. Unlike traditional ethics, this framework (Gilligan, Noddings, Tronto) grounds morality in relationships and dependency. Its guiding questions (as framed in Team 1’s slides) are who needs to be cared for, what the relationship is, and which response nurtures it. Institutions usually answer “the child” and stop, but the mother is also in a relationship of dependency and also needs care. Mothers provide relentless, unpaid care but receive none in return, which violates Eva Feder Kittay’s principle of doulia: those who care for dependents have a fundamental right to be cared for themselves. “Care for the Carers” puts this into practice by noticing and supporting the caregiver. Kant’s humanity principle points the same way: never treat people merely as tools to achieve results, so a mother cannot matter only as a means to her child’s recovery. One caution: Ethics of Care is criticised for tying care to “feminine” traits, which can reinforce the very stereotype we want to challenge. The campaign should present care as skilled work, not as women’s nature.`,
          mark: ["Ethics of Care.", "those who care for dependents have a fundamental right to be cared for themselves"] },
        { p: `Justice. The systemic neglect of mothers shows three layers of injustice:`, mark: ["Justice."] },
        { list: [
          `Distributive: the burdens and costs of care fall disproportionately on women and on low-income, rural families.`,
          `Recognition (Fraser; Honneth): mothers are not recognised as a group with distinct needs, and their work is not counted as work. Institutional empathy and resources flow almost solely to the child.`,
          `Gender: society treats this sacrifice as a mother’s “natural duty” (see the 96% figure above), exploiting patriarchal norms to avoid providing systemic support.`
        ] },
        { p: `CSR: inside-out and outside-in (Porter & Kramer, 2006).`, mark: ["CSR: inside-out and outside-in (Porter & Kramer, 2006)."] },
        { list: [
          `Inside-out (organisations’ impact on society): the hospital’s lack of caregiver support facilities, and corporate charities’ exclusive focus on children’s medical bills, are major institutional blind spots.`,
          `Outside-in (society’s impact on organisations): the unseen burden of care returns to the corporate sector as lost female talent, since the ILO identifies care responsibilities as the main reason women are not looking or not available for employment, and as burnout and absenteeism among working carers. This gives companies a business reason to intervene.`
        ] },
        { p: `Creating Shared Value (Porter & Kramer, 2011). CSV is a corporate strategy, so we frame it as a proposition for project partners and as a supporting argument, not our main reason. Parental distress peaks around diagnosis and affects how well the child copes with treatment (Kearney et al., 2015), so supporting mothers can also help treatment run more smoothly. This creates a “Shared Value Ecosystem”: treatment runs smoother, hospital staff face less operational strain, and sponsors build genuine brand value while supporting their wider community. The business logic has precedent: Patagonia reports that its on-site childcare recoups 90-125% of its cost through lower turnover and higher engagement (company-reported). This speaks to sponsors with a narrow view of CSR (Friedman). The moral case speaks to the broad, stakeholder view (Freeman, 1984), and we lead with the second.`,
          mark: ["Creating Shared Value (Porter & Kramer, 2011)."] },
        { h: "How the frameworks map to our two tracks" },
        { table: {
          head: ["Track", "Frameworks", "What it does"],
          rows: [
            ["Social media (main, systemic)", "Ethics of Care (caring for the carer); Recognition justice (Fraser, Honneth); Gender justice", "Makes care work visible and challenges the “natural duty” norm, including how children learn to see and treat their mothers"],
            ["K Hospital funding (live proof)", "Distributive justice; CSR inside-out / outside-in; CSV", "Redirects resources to the most burdened carers (i.e., pays them) and gives hospitals and sponsors reasons to fund carers"]
          ]
        } },
        { p: `Recognition without resources is empty; resources without recognition do not change the norm.`,
          mark: ["Recognition without resources is empty; resources without recognition do not change the norm."] }
      ],
      sources: [
        { text: "ILO (2018)", url: "https://www.ilo.org/resource/news/ilo-calls-urgent-action-prevent-looming-global-care-crisis" },
        { text: "ILO (2024)", url: "https://www.ilo.org/resource/news/unpaid-care-work-prevents-708-million-women-participating-labour-market" },
        { text: "VietnamPlus (8/10/2026)", url: "https://www.vietnamplus.vn/dau-tu-vao-kinh-te-cham-soc-dong-luc-nang-quyen-nang-kinh-te-cho-phu-nu-post1140729.vnp" },
        { text: "Tuổi Trẻ (20/5/2023)", url: "https://tuoitre.vn/1-3-nu-gioi-o-viet-nam-khong-co-thoi-gian-giai-tri-trong-ngay-20230520101446874.htm" },
        { text: "World Bank, Vietnam Time Use Survey 2022", url: "https://microdata.worldbank.org/catalog/5844/related-materials" },
        { text: "TNU Journal of Science and Technology (2024)", url: "https://jst.tnu.edu.vn/jst/article/download/10431/pdf" }
      ]
    },
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

        { person: "Raine", role: "Storyteller, reporter, host & posters", title: "Raine’s View as a person from Phillipino.",
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

        { person: "Thảo Linh", role: "Project lead, video, research & website support", title: "Thao Linh’s View",
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
      slug: "thank-you-from-the-team",
      kicker: "Letters",
      title: "Thank you, from the five of us",
      standfirst: "Each of us wrote to the women who have taken care of us.",
      authors: ["Thảo Linh", "Hà Dương", "Khánh Ngọc", "Quang Khánh", "Raine"],
      date: "2026-10-28",
      image: "images/day-team-and-mothers.jpg",
      caption: "Our team with the women we met on 17 October.",
      draft: false,
      body: [
        { quote: "Words are not enough to describe the gratitude this world owes every mother and the womanhood that comes with it. Carrying a life for 9 months and nurturing kids to become a responsible adult is a priceless job, a paycheck of a lifetime. It’s not simple, even just deciding if you want to be a mother or not is not an easy feat. I have great respect for women who love their children and who became a mother until their death bed. For the women not only in this lifetime but also for the women who paved the way and gave birth to amazing people, THANK YOU! Women will always have a special place in my heart, especially mothers. I value you, I appreciate you, and being a woman is the greatest thing!", by: "Raine, “To My Beloved and Respected Women”" }
      ],
      sources: []
    }
  ],

  // Bài đang tạm ẩn khỏi Journal vì chưa có nội dung. Muốn hiện lại: chuyển bài vào "posts" ở trên.
  hiddenPosts: [
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
        { todo: "What it took to get support to the mothers, and what Ms. Dung and Ms. Thanh taught us." },
        { h: "An honest look at ourselves" },
        { todo: "Consent and dignity when filming mothers in distress, avoiding the saviour story, and whether our own messages slipped back into praising endless sacrifice." }
      ],
      sources: []
    }
  ],

  // ===== Quyên góp + sao kê =====
  // Thông tin ngân hàng dưới đây vẫn là DỮ LIỆU MẪU, cần thay bằng tài khoản thật.
  bank: { name: "Your Bank Name", holder: "NGUYEN VAN A", number: "0123456789" },
  goal: 5000000, // mục tiêu quyên góp (VND)
  // Ảnh các phần quà được trao (hiện ở dưới bảng sao kê)
  giftPhotos: [
    { src: "images/gift-smile.jpg", caption: "A gift package: a meal, milk, fruit, bread, snacks and 100,000 VND" },
    { src: "images/gift-girl.jpg", caption: "After receiving a gift package" },
    { src: "images/gift-boy.jpg", caption: "After receiving a gift package" },
    { src: "images/gift-sleeping.jpg", caption: "A gift package left beside a sleeping child" }
  ],

  // type: "in" = tiền nhận, "out" = tiền chi. proof: ảnh bằng chứng (ví dụ "images/proof-1.jpg"), để trống nếu chưa có.
  entries: [
    { date: "17/10/2026", text: "Contributions from team members", type: "in", amount: 2600000, proof: "" },
    { date: "15/10/2026", text: "Contributed to the local volunteer group (fresh meals and essential supplies for hospital families)", type: "out", amount: 2000000, proof: "images/proof-transfer-2m.jpg" },
    { date: "17/10/2026", text: "Flowers for mothers near K Hospital Tan Trieu", type: "out", amount: 600000, proof: "" }
  ]
};
