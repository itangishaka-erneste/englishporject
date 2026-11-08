import React, { useState, useEffect, useRef } from "react";
import a from "./assets/a.jpg";
import b from "./assets/b.jpg";
import c from "./assets/c.jpg";
import d from "./assets/d.jpg";
import e from "./assets/e.jpg";
import f from "./assets/f.jpg";
import g from "./assets/g.jpg";
import h from "./assets/h.jpg";

/* Images live in  src/assets/  (a.jpg ... h.jpg) and are imported above */

/* ---------- Black background, orange-red text, many-colour curves ---------- */
const BG = "#0A0A10";      // slide background (black)
const DEEP = "#000000";    // darkest edge of the start screen
const HOT = "#FF4500";     // orange-red
const GOLD = "#FF5A1F";    // orange-red for titles, bars and accents
const SOFT = "#FFB27A";    // soft orange for sub-titles
const CREAM = "#FFF1E6";   // light details
const INK = "#000000";
const RIB = ["#FF4500", "#FFB020", "#FF2E93", "#8B5CF6", "#22D3EE"]; // curve colours

const avatar = (c1, c2) => "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/></linearGradient></defs><rect width='200' height='200' fill='url(#g)'/><circle cx='100' cy='78' r='38' fill='#fff' fill-opacity='.92'/><path d='M28 200c0-46 32-74 72-74s72 28 72 74z' fill='#fff' fill-opacity='.92'/></svg>`);
const PICS = [a, b, c, d, e, f, g, h];

const uid = () => Math.random().toString(36).slice(2, 9);
const txt = (text, x, y, w, o = {}) => ({ id: uid(), type: "text", text, x, y, w, font: "Nunito Sans", size: 28, color: "#ffffff", weight: 400, italic: false, align: "left", ...o });
const img = (src, x, y, w, h, o = {}) => ({ id: uid(), type: "image", src, x, y, w, h, fit: "cover", circle: false, ...o });
const box = (x, y, w, h, color) => ({ id: uid(), type: "shape", x, y, w, h, color });

const topic = (title, para, cap, pic, flip) => {
  const x = flip ? 650 : 70;
  return {
    id: uid(), bg: { color: BG, img: pic, dim: 1, flip },
    els: [
      box(x, 70, 90, 8, GOLD),
      txt(title, x, 92, 560, { font: "Outfit", size: 36, weight: 800, color: GOLD }),
      txt(para, x, 268, 560, { size: 19 }),
      txt("Image: " + cap, flip ? 70 : 700, 655, 510, { size: 14, italic: true, color: "#ffffff", align: flip ? "left" : "right" }),
    ],
  };
};

const refsSlide = (n, text) => ({ id: uid(), bg: { color: BG, img: "", dim: 0 }, els: [
  box(70, 60, 90, 8, GOLD),
  txt("References (" + n + " of 4)", 70, 82, 900, { font: "Outfit", size: 40, weight: 800, color: GOLD }),
  txt(text, 70, 150, 1140, { size: 17 }),
] });

const members = [["Keza Nadia", "KN", "#FF4500", "#FFB020"], ["Tuyishime Esther", "TE", "#FF2E93", "#8B5CF6"], ["Itangishaka Erneste", "IE", "#22D3EE", "#8B5CF6"], ["Mutabazi Queen Peace", "MQ", "#FFB020", "#FF2E93"], ["Umumararungu Sandrine Joana", "US", "#FF4500", "#FF2E93"]];

const SLIDES = [
  { id: uid(), bg: { color: BG, img: a, dim: 0.88, full: true }, els: [
    box(520, 128, 240, 8, GOLD),
    txt("Globalization and Global Citizenship", 90, 40, 1100, { font: "Outfit", size: 56, weight: 800, align: "center", color: GOLD }),
    txt("Group 6 · MSII · S5 · English", 90, 168, 1100, { size: 28, align: "center", color: SOFT }),
    ...members.flatMap(([n, ini, c1, c2], i) => {
      const x = 59 + i * 238;
      return [img(avatar(c1, c2), x + 30, 270, 150, 150, { circle: true, label: ini }),
        txt(n, x, 440, 210, { font: "Outfit", size: 22, weight: 700, align: "center" })];
    }),
  ] },
  topic("How globalization connects Rwanda to the world",
    "Globalization means that countries are becoming more closely linked through trade, money, technology, travel and ideas (International Monetary Fund [IMF], 2002). Rwanda is small and landlocked, yet it is well connected. The Kigali Convention Centre, shown here, is a meeting place for the world. In 2025 Rwanda hosted 165 international and regional events that brought in 61,888 delegates, which is 17.3 per cent more than the year before (New Times, 2026b). Each visitor shares ideas, spends money and takes the story of Rwanda home.",
    "Kigali Convention Centre at night.", a),
  topic("People, events and sport bring the world to Kigali",
    "Connections also come through tourism and sport. Rwanda welcomed 1.49 million visitors in 2025, up from 1.36 million in 2024, and tourism earned about US$685 million (New Times, 2026a). Big events such as the 2025 UCI Road World Championships and the FIFA Series in Kigali show Rwanda to audiences far away (KT Press, 2026). For us at ASYV, globalization is not far away. It is in the songs we stream, the phones we use and the visitors we meet around Rwamagana.",
    "Kigali Convention Centre at night.", a, true),
  topic("How Rwanda takes part in global trade",
    "Trade means buying and selling goods and services across borders. Rwanda mainly sells coffee, tea and minerals, together with horticultural products such as avocados, passion fruit, flowers and vegetables. Some farm goods are processed first, for example honey, canned tomatoes, French beans and macadamia nuts (U.S. International Trade Administration [ITA], n.d.). The picture shows fresh produce and the flag of Kenya, one of our East African neighbours. Selling to many countries helps farmers earn money and lets Rwanda buy what it cannot produce itself.",
    "Fresh produce and the Kenyan flag: a regional trade partner.", c),
  topic("New trading partners in Africa and Asia",
    "Rwanda’s trading partners are changing. Exports to China almost doubled, from US$83.7 million in 2024 to US$160.8 million in 2025 (New Times, 2026c). Closer to home, exports to the East African Community rose to about US$54.6 million in the last quarter of 2025, nearly twice the figure of a year earlier (Kamanzi, 2026). Trade with neighbours is steady because it is based on daily needs. One challenge remains: Rwanda sells mostly raw products with little added value, so it earns less than it could (United Nations Development Programme [UNDP], 2026b).",
    "Fresh produce and the Kenyan flag: a regional trade partner.", c, true),
  topic("Coffee and tea: income from the farm",
    "Agriculture is a major source of foreign income. In 2025 Rwanda’s coffee sector had its best harvest in six years: exports reached 23,860 tonnes of green coffee and earned more than US$148.6 million (AllAfrica, 2026). The national accounts show that export crops grew by 32 per cent in 2025, with coffee up 60 per cent and tea up 8 per cent (National Institute of Statistics of Rwanda [NISR], 2026). Tea, like the leaves in this picture, is sold through an auction system, so the money can arrive in a later quarter (AllAfrica, 2026).",
    "Freshly picked tea leaves.", b),
  topic("Tourism, events and the trade gap",
    "Services also earn foreign money. Tourism brought in US$685 million in 2025, and meetings and conferences alone earned US$94.7 million (New Times, 2026a, 2026b). Between November 2025 and January 2026, visitors spent about US$161.5 million, most of it by people arriving by air (Radar Africa, 2026). Still, Rwanda buys more than it sells. In the last quarter of 2025, imports were about US$1.54 billion, while domestic exports were about US$375 million (UNDP, 2026a). Adding value, such as roasting coffee at home, can narrow the gap.",
    "Freshly picked tea leaves.", b, true),
  topic("Sounds in trade vocabulary",
    "Clear pronunciation helps you sound confident when you present. Break long words into syllables: glo-bal-i-za-tion has five, and the main stress falls on the fourth, glo-bal-i-ZA-tion. The ending -tion is said like ‘shun’, as in transaction and population. Some trade words change stress when they change job. The nouns IM-port and EX-port stress the first syllable, but the verbs im-PORT and ex-PORT stress the second (Cambridge University Press, n.d.). Practise these in pairs and listen for the beat in each word.",
    "Globalization vocabulary study card.", d),
  topic("Spelling patterns and key trade words",
    "Spelling follows patterns that you can learn. Words with the ‘shun’ sound are usually spelled -tion, as in globalization, transaction and migration. British English often writes -ise (globalisation) while American English writes -ize (globalization). Both are accepted, but choose one and keep it the same on every slide (Cambridge University Press, n.d.). Learn these key words: tariff (a tax on imports), deficit (spending more than you earn), revenue (income), auction (a sale to the highest bidder) and citizen (a member of a country).",
    "Globalization vocabulary study card.", d, true),
  topic("How the unit is assessed in Rwanda",
    "Since 2015 Rwanda’s schools have used a competence-based curriculum. This means learners are assessed on what they can do with knowledge, skills and attitudes, not only on what they can remember (Nsengimana, 2021). The curriculum also weaves in cross-cutting issues such as peace and values, environment and sustainability, gender, inclusive education and financial education (Nsengimana, 2021). In this unit, that means you should explain globalization with examples from Rwanda, use the vocabulary correctly and connect ideas to real life.",
    "A student writing an assessment.", e),
  topic("Ways to show what you have learned",
    "Learners can show understanding in many ways: a written test or short essay, a spoken presentation like this one, a group project and questions in class. Teacher’s guides from the Rwanda Education Board end each unit with an end-unit assessment (Rwanda Education Board [REB], n.d.). To do well, give clear definitions, support ideas with facts and examples, cite your sources and answer questions honestly. If you do not know an answer, say that you will check and report back.",
    "A student writing an assessment.", e, true),
  topic("ICT: how technology joins Rwanda to the world",
    "Information and communication technology, or ICT, lets people trade without travelling. The banner in this photo reads ‘Rwanda Coding Academy: Leading Through Digital Innovation’, showing how young Rwandans are building digital skills. The Digital Ambassadors Programme, part of the Smart Rwanda Master Plan, aims to raise the digital literacy of five million citizens (Ministry of ICT and Innovation [MINICT], n.d.). UNCTAD (2023) notes that e-commerce is growing fast in Rwanda and can open regional and global markets, create jobs and improve living standards.",
    "Rwanda Coding Academy hackathon group.", f),
  topic("Opportunities and challenges of going online",
    "ICT also brings challenges. Internet use reached 38 per cent of Rwandans by mid-2025, but the cost of devices and data keeps many people offline (AllAfrica, 2025). Rwanda’s e-commerce strategy covers online trade for small businesses, payments, delivery and customer trust (Digital Watch Observatory, n.d.). The country also hopes to be a pioneer in applying the African Continental Free Trade Area protocol on digital trade (UNCTAD, 2024). A small seller with a phone can reach more buyers, but only if payments, delivery and trust all work well.",
    "Rwanda Coding Academy hackathon group.", f, true),
  topic("What is a global citizen?",
    "A global citizen feels part of the whole human family, not only of one village or country, and acts with respect and responsibility. UNESCO (2014) describes global citizenship education as helping learners understand world problems and take action for a fairer and more peaceful world. The sculpture in the picture shows people joining hands around a globe. In Rwandan schools similar ideas appear as cross-cutting issues such as peace and values education and environment and sustainability (Nsengimana, 2021).",
    "Sculpture of people around a globe.", g),
  topic("Why global citizenship helps us",
    "Global citizenship brings real advantages. It teaches respect for people of different cultures and beliefs, which makes teamwork easier in regional bodies and international projects. It opens chances to study, work and exchange ideas abroad. It also builds responsibility: Rwanda’s tourism approach, for example, aims to protect nature while earning income (Africa Briefing, 2026). As members of ASYV, Rwanda and the world, we can start by caring for our Village, respecting classmates and sharing what we learn.",
    "Sculpture of people around a globe.", g, true),
  topic("Rwanda is a multilingual country",
    "Rwanda has four official languages: Kinyarwanda, which is also the national language, together with English, French and Kiswahili. The 2022 census shows that more than 99.7 per cent of Rwandans speak Kinyarwanda, and about 77 per cent are literate in at least one official language. Since 2021 English has been the language of instruction, while the other languages are taught as subjects (UNESCO, n.d.). That is why many of us already use two or three languages every day.",
    "A team working together.", h),
  topic("How languages help in global trade",
    "Speaking a buyer’s language builds trust and makes deals easier. English connects Rwanda to global business, Kiswahili to East African markets, and French to neighbours such as the Democratic Republic of the Congo, which remains a leading export destination (UNDP, 2026a). In upper secondary school, students can choose language combinations such as English–French–Kinyarwanda or English–Kiswahili–Kinyarwanda (UNESCO, n.d.). Being multilingual can open careers in tourism, ICT, diplomacy and trade, because every extra language is another door to a new market.",
    "A team working together.", h, true),
  refsSlide(1, [
    "Africa Briefing. (2026). Rwanda tourism revenue hits $161m in 3 months. https://africabriefing.com/rwanda-tourism-revenue-hits-161m-in-3-months/",
    "AllAfrica. (2025, June 17). Central Africa: Rwanda reaches 38 percent internet penetration but faces cost hurdles. https://allafrica.com/stories/202506170578.html",
    "AllAfrica. (2026, June 23). Rwanda: Export crop production surges in Q1. https://allafrica.com/stories/202606230367.html",
    "Cambridge University Press. (n.d.). Cambridge dictionary. https://dictionary.cambridge.org",
    "Digital Watch Observatory. (n.d.). Rwanda. https://dig.watch/countries/rwanda",
    "International Monetary Fund. (2002). Globalization: Threat or opportunity? https://www.imf.org",
    "Kamanzi, S. (2026, March 18). Rwanda sends nearly double exports to EAC neighbors, highest ever. KT Press. https://www.ktpress.rw/2026/03/rwanda-sends-nearly-double-exports-to-eac-neighbors-highest-ever/",
  ].join("\n\n")),
  refsSlide(2, [
    "KT Press. (2026, April). How Rwanda conquered European football. https://www.ktpress.rw/2026/04/how-rwanda-conquered-european-football/",
    "Ministry of ICT and Innovation. (n.d.). Digital Ambassadors Programme. https://www.minict.gov.rw/projects/digital-ambassadors-program",
    "National Institute of Statistics of Rwanda. (2026). Gross domestic product 2025 annual report. https://statistics.gov.rw/sites/default/files/documents/2026-03/GDP%202025.pdf",
    "New Times. (2026a). Rwanda’s tourism revenues hit Rwf1tn in 2025 - report. https://www.newtimes.co.rw/article/35238/news/tourism/rwandas-tourism-revenues-hit-rwf1tn-in-2025---report",
    "New Times. (2026b). Rwanda reaps nearly Rwf140bn from hosting meetings, events. https://www.newtimes.co.rw/article/35255/news/tourism/rwanda-reaps-nearly-rwf140bn-from-hosting-meetings-events",
    "New Times. (2026c). Exports to China surge 92% as demand rises. https://www.newtimes.co.rw/article/35568/news/economy/exports-to-china-surge-92-as-demand-rises",
    "Nsengimana, V. (2021). Implementation of competence-based curriculum in Rwanda: Opportunities and challenges. Rwandan Journal of Education, 5(1). https://core.ac.uk/download/478456765.pdf",
  ].join("\n\n")),
  refsSlide(3, [
    "Radar Africa. (2026). Rwanda earns $161M from tourism in 90 days [Infographic]. Source: Business Insider Africa.",
    "Rwanda Education Board. (n.d.). Creative arts teacher’s guide, Primary 3. https://elearning.reb.rw/mod/resource/view.php?id=4240",
    "United Nations Conference on Trade and Development. (2023). Towards an e-commerce strategy for Rwanda. https://unctad.org/publication/towards-e-commerce-strategy-rwanda",
    "United Nations Conference on Trade and Development. (2024). Contribution by Rwanda to the Intergovernmental Group of Experts on E-commerce and the Digital Economy. https://unctad.org/node/44818",
    "United Nations Development Programme. (2026a). Sector deep-dive note. https://www.undp.org/sites/g/files/zskgke326/files/2026-04/sector_deep_dive_note_0.pdf",
    "United Nations Development Programme. (2026b). Analytical note. https://www.undp.org/sites/g/files/zskgke326/files/2026-05/analytical_note.pdf",
  ].join("\n\n")),
  refsSlide(4, [
    "UNESCO. (2014). Global citizenship education: Preparing learners for the challenges of the 21st century. https://www.unesco.org",
    "UNESCO. (n.d.). Kinyarwanda in Rwanda. World Atlas of Languages. https://en.wal.unesco.org/countries/rwanda/languages/kinyarwanda-2",
    "U.S. International Trade Administration. (n.d.). Rwanda agriculture sector. https://trade.gov/country-commercial-guides/rwanda-agriculture-sector",
  ].join("\n\n")),
  { id: uid(), bg: { color: BG, img: a, dim: 0.72, full: true }, els: [
    txt("Thank you!", 90, 220, 1100, { font: "Outfit", size: 130, weight: 800, align: "center", color: GOLD }),
    box(540, 400, 200, 8, GOLD),
    txt("Congratulations to all of us · Group 6 · Questions are welcome", 90, 440, 1100, { size: 30, align: "center" }),
  ] },
];

/* ---------- Shared CSS ---------- */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Nunito+Sans:ital,wght@0,400;0,700;1,400&display=swap');
  @keyframes up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
  @keyframes grow{from{transform:scaleX(0);opacity:0}to{transform:none;opacity:1}}
  @keyframes float{50%{transform:translateY(-12px)}}
  @keyframes kb{from{transform:scale(1)}to{transform:scale(1.1)}}
  @keyframes fade{from{opacity:0}to{opacity:1}}
  @keyframes draw{from{stroke-dashoffset:1200}to{stroke-dashoffset:0}}
  @keyframes drift{to{transform:translate(28px,20px)}}
  @keyframes bubble{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(-480px);opacity:0}}
  @keyframes wave{to{transform:translateX(-90px)}}
  @keyframes wave2{from{transform:translateX(-90px)}to{transform:translateX(0)}}
  @keyframes glow{50%{box-shadow:0 0 22px 4px rgba(255,90,31,.85)}}
  @keyframes reveal{from{clip-path:inset(0 0 0 100%)}to{clip-path:inset(0)}}
  @keyframes revealL{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.04)}}
  @keyframes numIn{from{opacity:0;transform:scale(.3)}60%{opacity:1;transform:scale(1.15)}to{opacity:1;transform:scale(1)}}
  @keyframes ringDown{from{stroke-dashoffset:0}to{stroke-dashoffset:603}}
  @keyframes ringPop{0%{transform:scale(1)}50%{transform:scale(1.06)}100%{transform:scale(1)}}
  @keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion:reduce){*{animation-duration:.01s!important}}
`;

/* ---------- Stage: fills the whole screen, no black bars ---------- */
function Stage({ color, children }) {
  const ref = useRef(null);
  const [k, setK] = useState(0.5);
  useEffect(() => {
    const fit = () => {
      if (!ref.current) return;
      const w = ref.current.clientWidth / 1280, h = ref.current.clientHeight / 720;
      const fitK = Math.min(w, h), coverK = Math.max(w, h);
      // fill the screen; only crop when the screen is close to 16:9, otherwise fit and let the slide colour fill the rest
      setK(coverK / fitK <= 1.15 ? coverK : fitK);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{ background: color, transition: "background .4s" }}>
      <div style={{ width: 1280 * k, height: 720 * k, flexShrink: 0, position: "relative" }}>
        <div style={{ width: 1280, height: 720, transform: `scale(${k})`, transformOrigin: "top left" }}>{children}</div>
      </div>
    </div>
  );
}

/* ---------- One element ---------- */
function Elem({ el, i }) {
  const base = {
    position: "absolute", left: el.x, top: el.y, width: el.w, height: el.type === "text" ? "auto" : el.h,
    animation: el.type === "shape" ? `grow .8s ${0.1 + i * 0.12}s ease-out both, glow 2.6s ${1 + i * 0.1}s ease-in-out infinite` : el.type === "text" ? "none" : `up .7s ${0.1 + i * 0.12}s ease-out both`,
    transformOrigin: "left center",
  };
  if (el.type === "shape") return <div style={{ ...base, background: el.color, borderRadius: 6 }} />;

  if (el.type === "image") return (
    <div style={base}>
      <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: el.circle ? "50%" : 14, background: "#1A1A24", border: el.circle ? `5px solid ${GOLD}` : "none", boxSizing: "border-box", animation: el.circle ? `float 4s ${i * 0.4}s ease-in-out infinite` : "none" }}>
        {el.src
          ? <img src={el.src} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: el.fit }} />
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: CREAM, fontFamily: "Outfit", fontWeight: 800, fontSize: Math.min(el.w, el.h) / 3 }}>{el.label || "Image"}</div>}
      </div>
    </div>
  );

  return (
    <div style={base}>
      <div style={{ fontFamily: `'${el.font}', sans-serif`, fontSize: el.size, color: el.color, fontWeight: el.weight, fontStyle: el.italic ? "italic" : "normal", textAlign: el.align, lineHeight: 1.4, textShadow: el.shadow === false ? "none" : "0 1px 8px rgba(0,0,0,.7)", whiteSpace: "pre-wrap", padding: 2 }}>
        {el.text.split("\n").map((l, j) => (
          <div key={j} style={{ animation: `up .6s ${0.3 + i * 0.12 + j * 0.2}s ease-out both` }}>
            {l.length > 140
              ? l.split(/(?<=\.)\s/).map((q, n) => <span key={n} style={{ animation: `fade .8s ${0.6 + n * 0.7}s ease-out both` }}>{q} </span>)
              : l || "\u00A0"}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Black background with flowing multi-colour curves ---------- */
const BUBBLES = [[90, 600, 16, 8], [260, 640, 9, 11], [430, 620, 13, 9], [60, 330, 8, 12], [520, 470, 11, 10], [200, 220, 15, 13], [380, 120, 9, 14]];
const WAVES = [
  ["#8B5CF6", 0.75, 688, "wave 8s ease-in-out infinite alternate"],
  ["#FF2E93", 0.85, 697, "wave2 7s ease-in-out infinite alternate"],
  ["#FF4500", 0.95, 705, "wave 6s ease-in-out infinite alternate"],
  ["#FFB020", 1, 713, "wave2 9s ease-in-out infinite alternate"],
];
function Deco({ b }) {
  const split = b.img && !b.full;
  const cx = split ? 0 : 1280;
  return (
    <svg width="1280" height="720" viewBox="0 0 1280 720" style={{ position: "absolute", inset: 0, pointerEvents: "none", transform: b.flip ? "scaleX(-1)" : "none" }}>
      {/* black panel with a ribbon of colours along its curved edge */}
      {split && (<>
        <path d="M0 0 H690 C610 200 780 520 650 720 H0 Z" fill={b.color} />
        {RIB.map((col, i) => (
          <path key={col} d={`M${700 + i * 15} 0 C${620 + i * 15} 200 ${790 + i * 15} 520 ${660 + i * 15} 720`} fill="none" stroke={col} strokeWidth={i === 0 ? 9 : 5} strokeLinecap="round" style={{ strokeDasharray: 1200, animation: `draw ${1.6 + i * 0.35}s ${i * 0.15}s ease-out both` }} />
        ))}
      </>)}

      {/* soft coloured glows in the corners */}
      <g style={{ animation: "drift 9s ease-in-out infinite alternate" }}>
        <circle cx={cx} cy="0" r="250" fill="#FF4500" fillOpacity=".16" />
        <circle cx={cx} cy="0" r="165" fill="none" stroke="#FF2E93" strokeOpacity=".6" strokeWidth="3" />
        <circle cx={cx} cy="0" r="205" fill="none" stroke="#FFB020" strokeOpacity=".4" strokeWidth="2" />
        <circle cx="0" cy="720" r="130" fill="#8B5CF6" fillOpacity=".28" />
        <circle cx="0" cy="720" r="190" fill="none" stroke="#22D3EE" strokeOpacity=".4" strokeWidth="2" />
      </g>

      {/* rising bubbles in the curve colours */}
      {BUBBLES.map(([x, y, r, d], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={RIB[i % RIB.length]} fillOpacity=".4" style={{ animation: `bubble ${d}s ${i * 0.8}s ease-in infinite` }} />
      ))}

      {/* four layered waves along the bottom */}
      {WAVES.map(([col, op, y, anim]) => (
        <g key={col} style={{ animation: anim }}>
          <path d={`M-100 ${y} C100 ${y - 20} 300 ${y + 16} 500 ${y} S900 ${y - 20} 1100 ${y} S1300 ${y + 16} 1400 ${y} V740 H-100Z`} fill={col} fillOpacity={op} />
        </g>
      ))}
    </svg>
  );
}

/* ---------- One slide ---------- */
function SlideView({ slide }) {
  const b = slide.bg;
  return (
    <div style={{ width: 1280, height: 720, position: "relative", overflow: "hidden", background: b.color }}>
      {b.img && <img src={b.img} alt="" draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transformOrigin: b.flip ? "20% 50%" : "80% 50%", animation: `${b.flip ? "revealL" : "reveal"} 1.4s ease-out both, kb 18s ease-out both` }} />}
      {b.img && b.full && <div style={{ position: "absolute", inset: 0, opacity: b.dim, background: b.color }} />}
      <Deco b={b} />
      {slide.els.map((el, i) => <Elem key={el.id} el={el} i={i} />)}
    </div>
  );
}

/* ---------- Intro: loading ring, press Enter, 2-1 countdown ---------- */
const R = 96, CIRC = 2 * Math.PI * R; // ≈ 603

function Intro({ onStart }) {
  const [phase, setPhase] = useState("loading"); // loading | ready | count
  const [p, setP] = useState(0);
  const [n, setN] = useState(2);
  const loaded = useRef(0);
  const timers = useRef([]);

  // real loading: wait for the pictures, with a short minimum time so the ring is visible
  useEffect(() => {
    PICS.forEach((src) => { const im = new Image(); im.onload = im.onerror = () => { loaded.current += 1; }; im.src = src; });
    const t0 = Date.now();
    const id = setInterval(() => {
      const timeP = Math.min(100, ((Date.now() - t0) / 2400) * 100);
      const imgP = (loaded.current / PICS.length) * 100;
      const v = Math.min(timeP, imgP);
      setP(v);
      if (v >= 100) { clearInterval(id); setPhase("ready"); }
    }, 40);
    return () => { clearInterval(id); timers.current.forEach(clearTimeout); };
  }, []);

  const start = () => {
    if (phase !== "ready") return;
    document.documentElement.requestFullscreen?.().catch(() => {});
    setN(2); setPhase("count");
    timers.current = [setTimeout(() => setN(1), 1000), setTimeout(onStart, 2000)];
  };

  useEffect(() => {
    const key = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); start(); } };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  });

  const offset = phase === "loading" ? CIRC * (1 - p / 100) : 0;
  const caption = phase === "loading" ? "Loading your slides…" : phase === "ready" ? "Press Enter to start the presentation" : n === 2 ? "Get ready…" : "Here we go!";

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden text-center" style={{ background: `radial-gradient(circle at 50% 40%, #2A0F0A 0%, ${BG} 55%, ${DEEP} 100%)`, fontFamily: "'Nunito Sans', sans-serif", color: "#fff" }}>
      <style>{CSS}</style>

      {/* flowing coloured curves */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" style={{ pointerEvents: "none" }}>
        {RIB.map((col, i) => (
          <path key={"t" + col} d={`M-40 ${90 + i * 16} C300 ${-60 + i * 10} 640 ${260 + i * 14} 1320 ${40 + i * 18}`} fill="none" stroke={col} strokeOpacity=".75" strokeWidth={i === 0 ? 6 : 3} strokeLinecap="round" style={{ strokeDasharray: 1600, animation: `draw ${2 + i * 0.3}s ${i * 0.15}s ease-out both` }} />
        ))}
        {RIB.map((col, i) => (
          <path key={"b" + col} d={`M-40 ${640 - i * 16} C320 ${790 - i * 10} 700 ${470 - i * 14} 1320 ${660 - i * 18}`} fill="none" stroke={col} strokeOpacity=".75" strokeWidth={i === 0 ? 6 : 3} strokeLinecap="round" style={{ strokeDasharray: 1600, animation: `draw ${2 + i * 0.3}s ${i * 0.15}s ease-out both` }} />
        ))}
        <g style={{ animation: "drift 9s ease-in-out infinite alternate" }}>
          <circle cx="150" cy="140" r="130" fill="#8B5CF6" fillOpacity=".16" />
          <circle cx="1140" cy="580" r="190" fill="#FF2E93" fillOpacity=".14" />
          <circle cx="1120" cy="130" r="70" fill="none" stroke="#22D3EE" strokeOpacity=".5" strokeWidth="3" />
          <circle cx="130" cy="600" r="90" fill="none" stroke="#FFB020" strokeOpacity=".5" strokeWidth="3" />
        </g>
      </svg>

      <div className="relative px-6" style={{ animation: "rise .8s ease-out both" }}>
        <div className="font-bold" style={{ fontFamily: "Outfit", color: SOFT, fontSize: "clamp(14px,2vw,20px)" }}>Group 6 · MSII · S5 · English</div>
        <h1 className="font-extrabold mt-2" style={{ fontFamily: "Outfit", color: GOLD, fontSize: "clamp(28px,5vw,60px)", lineHeight: 1.1 }}>Globalization and Global Citizenship</h1>
      </div>

      {/* ring */}
      <div className="relative mt-8" style={{ width: 220, height: 220, animation: phase === "ready" ? "ringPop 1.6s ease-in-out infinite" : "none" }}>
        <svg width="220" height="220" viewBox="0 0 220 220" style={{ position: "absolute", inset: 0 }}>
          <circle cx="110" cy="110" r={R} fill="rgba(255,255,255,.04)" stroke="#fff" strokeOpacity=".18" strokeWidth="10" />
          {phase === "loading" && (
            <g style={{ transformOrigin: "110px 110px", animation: "spin 1.1s linear infinite" }}>
              <circle cx="110" cy="110" r="106" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" strokeDasharray="40 627" />
            </g>
          )}
          <g transform="rotate(-90 110 110)">
            {phase === "count"
              ? <circle key={n} cx="110" cy="110" r={R} fill="none" stroke={GOLD} strokeWidth="10" strokeLinecap="round" strokeDasharray={CIRC} style={{ animation: "ringDown 1s linear both" }} />
              : <circle cx="110" cy="110" r={R} fill="none" stroke={GOLD} strokeWidth="10" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={offset} />}
          </g>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {phase === "loading" && <span className="font-extrabold" style={{ fontFamily: "Outfit", fontSize: 44 }}>{Math.round(p)}%</span>}
          {phase === "ready" && (
            <button onClick={start} aria-label="Start presentation" className="flex items-center justify-center rounded-full" style={{ width: 120, height: 120, background: GOLD, color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 0 40px rgba(255,90,31,.7)" }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </button>
          )}
          {phase === "count" && <span key={n} className="font-extrabold" style={{ fontFamily: "Outfit", fontSize: 110, lineHeight: 1, color: GOLD, animation: "numIn .55s ease-out both" }}>{n}</span>}
        </div>
      </div>

      <div className="relative mt-8 font-bold" style={{ fontFamily: "Outfit", fontSize: "clamp(16px,2.2vw,26px)", animation: phase === "ready" ? "pulse 1.6s ease-in-out infinite" : "none" }}>{caption}</div>
      <div className="relative mt-2 text-sm" style={{ color: SOFT, minHeight: 20, opacity: phase === "ready" ? 1 : 0, transition: "opacity .4s" }}>
        Use ← → or click the sides to move · Esc to leave
      </div>
    </div>
  );
}

/* ---------- Slides only, full screen ---------- */
function Slides({ onExit }) {
  const [cur, setCur] = useState(0);
  const touch = useRef(null);
  const s = SLIDES[cur];
  const go = (dir) => setCur((x) => Math.max(0, Math.min(SLIDES.length - 1, x + dir)));

  useEffect(() => {
    const key = (e) => {
      if (["ArrowRight", " ", "PageDown", "Enter"].includes(e.key)) { e.preventDefault(); go(1); }
      if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
      if (e.key === "Home") setCur(0);
      if (e.key === "End") setCur(SLIDES.length - 1);
      if (e.key === "Escape") { document.fullscreenElement && document.exitFullscreen?.(); onExit(); }
    };
    const fs = () => { if (!document.fullscreenElement) onExit(); };
    window.addEventListener("keydown", key);
    document.addEventListener("fullscreenchange", fs);
    return () => { window.removeEventListener("keydown", key); document.removeEventListener("fullscreenchange", fs); };
  }, []);

  return (
    <div onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { if (touch.current == null) return; const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); touch.current = null; }}>
      <style>{CSS}</style>
      <Stage color={s.bg.color}>
        <div key={s.id} style={{ animation: "fade .5s both" }}><SlideView slide={s} /></div>
      </Stage>
      <div className="fixed top-0 left-0 h-1 transition-all duration-500" style={{ width: `${((cur + 1) / SLIDES.length) * 100}%`, background: GOLD }} />
      <button aria-label="Previous slide" className="fixed left-0 top-0 h-full w-1/5 opacity-0" style={{ cursor: cur === 0 ? "default" : "w-resize" }} onClick={() => go(-1)} />
      <button aria-label="Next slide" className="fixed right-0 top-0 h-full w-1/5 opacity-0" style={{ cursor: cur === SLIDES.length - 1 ? "default" : "e-resize" }} onClick={() => go(1)} />
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold opacity-0 hover:opacity-100 transition" style={{ background: "rgba(255,90,31,.9)", color: "#fff" }}>
        {cur + 1} / {SLIDES.length}
      </div>
    </div>
  );
}

/* ---------- App ---------- */
export default function English() {
  const [started, setStarted] = useState(false);
  return started
    ? <Slides onExit={() => setStarted(false)} />
    : <Intro onStart={() => setStarted(true)} />;
}